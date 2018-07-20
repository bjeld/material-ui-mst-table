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

class App extends Component {
  constructor(props) {
    super(props);

    this.tableModel = TableModel.create({
      orderBy: "fat",
      order: "desc",
      bulkActions: [BulkAction.create({ type: "Delete", multiple: true })],
      buttonActions: [ButtonAction.create({ type: "Create", color: "primary", variant: "outlined" })],
      rowsPerPageOptions: [10, 20, 30, 40, 50, 60],
      rowsPerPage: 20,
      columnList: ColumnList.create({
        showCheckbox: true,
        columns: [
          columnBuilder("dessert", "Dessert (100g serving)", (value, data) => {
            return (
              <TextEditing
                value={value}
                onValueChanged={newValue => {
                  data.setFieldValue("dessert", newValue);
                }}
              />
            );
          }),
          columnBuilder("calories", "Calories", value => value, { numeric: true }),
          columnBuilder("fat", "Fat (g)", value => value, { numeric: true }),
          columnBuilder("carbs", "Carbs (g)", value => value, { numeric: true }),
          columnBuilder("protein", "Protein (g)", value => value, { numeric: true })
        ]
      })
    });

    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push(
        Data.create({
          id: `${i}`,
          fieldNames: {
            dessert: `Frozen yoghurt ${i}`,
            calories: Math.round(Math.random() * 100),
            fat: Math.round(Math.random() * 100),
            carbs: Math.round(Math.random() * 100),
            protein: Math.round(Math.random() * 100)
          }
        })
      );
    }

    this.tableModel.updateDataProvider(data);
  }

  handleBulkAction = bulkAction => {
    switch (bulkAction.type) {
      case "Delete":
        this.tableModel.destroyItems(this.tableModel.selected);
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <Fragment>
        <Typography variant="title">Nutrition</Typography>
        <MstMuiTable tableModel={this.tableModel} onBulkAction={this.handleBulkAction} />
      </Fragment>
    );
  }
}

export default observer(App);
