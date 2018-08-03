import React from "react";

import { BulkAction } from "./mst-mui-table/models/BulkAction";
import { ButtonAction } from "./mst-mui-table/models/ButtonAction";
import { columnBuilder } from "./mst-mui-table/models/Column";
import { ColumnList } from "./mst-mui-table/models/ColumnList";
import { Filter } from "./mst-mui-table/models/Filter";
import { Data } from "./mst-mui-table/models/Data";
import { decorate, observable, action } from "mobx";
import { observer } from "mobx-react";
import { TableModel } from "./mst-mui-table/models/TableModel";
import { Typography } from "@material-ui/core";
import MstMuiTable from "./mst-mui-table/views/MstMuiTable";
import Search from "./mst-mui-table/views/components/Search";
import Switch from "@material-ui/core/Switch";
import TextEditing from "./mst-mui-table/inline/text-editing/TextEditing";

const FatFilter = ({ checked, onFatFilterChange }) => {
  return (
    <div style={{ padding: 12 }}>
      <Typography>Show low fat only (below 50g)</Typography>
      <Switch checked={checked} onChange={onFatFilterChange} />
    </div>
  );
};
const CaloriesFilter = ({ checked, onCaloriesFilterChange }) => {
  return (
    <div style={{ padding: 12 }}>
      <Typography>Show low calories only (below 50)</Typography>
      <Switch checked={checked} onChange={onCaloriesFilterChange} />
    </div>
  );
};

class App extends React.Component {
  fatFilterChecked = true;
  fatFilterCheckedUpdate = value => (this.fatFilterChecked = value);

  caloriesFilterChecked = true;
  caloriesFilterCheckedUpdate = value => (this.caloriesFilterChecked = value);

  createFatFilter = () => {
    const fatFilter = Filter.create({ id: "fatFilter" });
    fatFilter.setRules(data => data.getFieldValue("fat") < 50);
    return fatFilter;
  };

  createCaloriesFilter = () => {
    const caloriesFilter = Filter.create({ id: "caloriesFilter" });
    caloriesFilter.setRules(data => data.getFieldValue("calories") < 50);
    return caloriesFilter;
  };

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

    this.tableModel.addFilter(this.createFatFilter());
    this.tableModel.addFilter(this.createCaloriesFilter());

    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push(this.createDummyData(`${i}`));
    }

    this.tableModel.updateDataProvider(data);
  }

  createDummyData = id => {
    return Data.create({
      id: `${Math.ceil(Math.random() * 100000000)}`,
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

  handleFatFilterChange = (event, checked) => {
    this.fatFilterCheckedUpdate(checked);
    if (checked) {
      this.tableModel.addFilter(this.createFatFilter());
    } else {
      this.tableModel.removeFilter("fatFilter");
    }
  };
  handleCaloriesFilterChange = (event, checked) => {
    this.caloriesFilterCheckedUpdate(checked);
    if (checked) {
      this.tableModel.addFilter(this.createCaloriesFilter());
    } else {
      this.tableModel.removeFilter("caloriesFilter");
    }
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="title">{`${this.tableModel.numRowCount} Nutrition items`}</Typography>
        <MstMuiTable
          tableModel={this.tableModel}
          onBulkAction={this.handleBulkAction}
          onButtonAction={this.handleButtonAction}
          slotForLeftToolbarArea={<Search />}
          slotForFilterContent={
            <React.Fragment>
              <FatFilter
                checked={this.fatFilterChecked}
                onFatFilterChange={this.handleFatFilterChange}
              />
              <CaloriesFilter
                checked={this.caloriesFilterChecked}
                onCaloriesFilterChange={this.handleCaloriesFilterChange}
              />
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

decorate(App, {
  fatFilterChecked: observable,
  fatFilterCheckedUpdate: action
});

export default observer(App);
