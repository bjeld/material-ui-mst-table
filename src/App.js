import React, { Component, Fragment } from "react";
import MstMuiTable from "./mst-mui-table/views/MstMuiTable";
import { BulkAction } from "./mst-mui-table/models/BulkAction";
import { ButtonAction } from "./mst-mui-table/models/ButtonAction";
import { ColumnList } from "./mst-mui-table/models/ColumnList";
import { Data } from "./mst-mui-table/models/Data";
import { TableModel } from "./mst-mui-table/models/TableModel";
import { columnBuilder } from "./mst-mui-table/models/Column";

import TextEditing from "./mst-mui-table/inline/text-editing/TextEditing";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import Search from "./mst-mui-table/views/components/Search";

class App extends Component {
  constructor(props) {
    super(props);

    this.tableModel = TableModel.create({
      orderBy: "fat",
      order: "desc",
      bulkActions: [BulkAction.create({ type: "delete", multiple: true })],
      buttonActions: [
        ButtonAction.create({
          type: "create",
          variant: "outlined"
        })
      ],
      columnList: ColumnList.create({
        showCheckbox: true,
        columns: [
          columnBuilder("dessert", "Dessert (100g serving)", (value, data) => {
            return (
              <TextEditing
                value={value}
                onValueChanged={newValue => {
                  // optimistic update
                  data.setFieldValue("dessert", newValue);
                }}
              />
            );
          }),
          columnBuilder("calories", "Calories", value => value, {
            numeric: true
          }),
          columnBuilder("fat", "Fat (g)", value => value, { numeric: true }),
          columnBuilder("carbs", "Carbs (g)", value => value, {
            numeric: true
          }),
          columnBuilder("protein", "Protein (g)", value => value, {
            numeric: true
          })
        ]
      })
    });

    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push(this.createDummyData(`${i}`));
    }

    this.tableModel.updateDataProvider(data);
  }

  createDummyData = id => {
    return Data.create({
      id,
      fieldNames: {
        dessert: `Frozen yoghurt ${id}`,
        calories: Math.round(Math.random() * 100),
        fat: Math.round(Math.random() * 100),
        carbs: Math.round(Math.random() * 100),
        protein: Math.round(Math.random() * 100)
      }
    });
  };

  handleBulkAction = bulkAction => {
    switch (bulkAction.type) {
      case "delete":
        this.tableModel.destroyItems(this.tableModel.selected);
        break;

      default:
        break;
    }
  };

  handleButtonAction = buttonAction => {
    switch (buttonAction.type) {
      case "create":
        this.tableModel.add(this.createDummyData(`${this.tableModel.numRowCount}`));
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <Fragment>
        <Typography variant="title">{`${this.tableModel.numRowCount} Nutrition items`}</Typography>
        <MstMuiTable
          tableModel={this.tableModel}
          onBulkAction={this.handleBulkAction}
          onButtonAction={this.handleButtonAction}
          slotForLeftToolbarArea={<Search />}
        />
      </Fragment>
    );
  }
}

export default observer(App);
