import React from "react";

import MstMuiTable from "./mst-mui-table/views/MstMuiTable";
import Search from "./mst-mui-table/views/components/Search";
import SliderFilter from "./mst-mui-table/views/components/SliderFilter";
import Switch from "@material-ui/core/Switch";
import TextEditing from "./mst-mui-table/inline/text-editing/TextEditing";
import { BulkAction } from "./mst-mui-table/models/BulkAction";
import { ButtonAction } from "./mst-mui-table/models/ButtonAction";
import { ColumnList } from "./mst-mui-table/models/ColumnList";
import { Data } from "./mst-mui-table/models/Data";
import { Filter } from "./mst-mui-table/models/Filter";
import { TableModel } from "./mst-mui-table/models/TableModel";
import { Typography } from "@material-ui/core";
import { columnBuilder } from "./mst-mui-table/models/Column";
import { observer } from "mobx-react";

const FatFilter = ({ checked, onFatFilterChange }) => {
  return (
    <div style={{ padding: 12 }}>
      <Typography>Fat below 50g</Typography>
      <Switch checked={checked} onChange={onFatFilterChange} />
    </div>
  );
};
const CaloriesFilter = ({ checked, onCaloriesFilterChange }) => {
  return (
    <div style={{ padding: 12 }}>
      <Typography>Calories below 50</Typography>
      <Switch checked={checked} onChange={onCaloriesFilterChange} />
    </div>
  );
};

class App extends React.Component {
  createFatFilter = () => {
    const fatFilter = Filter.create({ id: "fatFilter", value: true });
    fatFilter.setRules((data, value) => (value ? data.getFieldValue("fat") < 50 : true));
    return fatFilter;
  };

  createCaloriesFilter = () => {
    const caloriesFilter = Filter.create({ id: "caloriesFilter", value: false });
    caloriesFilter.setRules((data, value) => (value ? data.getFieldValue("calories") < 50 : true));
    return caloriesFilter;
  };

  createSearchFilter = () => {
    const searchFilter = Filter.create({ id: "searchFilter", value: "" });
    searchFilter.setRules((data, value) => {
      const dessert = data.getFieldValue("dessert").toLowerCase();
      return dessert.toLowerCase().indexOf(value) > -1;
    });
    return searchFilter;
  };

  createSliderFilter = () => {
    const sliderFilter = Filter.create({ id: "sliderFilter", value: 100 });
    sliderFilter.setRules((data, value) => {
      const carbs = data.getFieldValue("carbs");
      return carbs < value;
    });
    return sliderFilter;
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
    this.tableModel.addFilter(this.createSearchFilter());
    this.tableModel.addFilter(this.createSliderFilter());

    for (let i = 0; i < 30; i++) {
      this.tableModel.add(this.createDummyData(`${i}`));
    }
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
    this.tableModel.getFilter("fatFilter").update(checked);
  };

  handleCaloriesFilterChange = (event, checked) => {
    this.tableModel.getFilter("caloriesFilter").update(checked);
  };

  handleSeachValueChange = value => {
    this.tableModel.getFilter("searchFilter").update(value);
  };

  handleSliderFilterChange = (event, value) => {
    this.tableModel.getFilter("sliderFilter").update(value);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}>
        <div style={{ width: "100%" }}>
          <Typography variant="title">{`${
            this.tableModel.numRowCount
          } Nutrition items`}</Typography>

          <MstMuiTable
            tableModel={this.tableModel}
            onBulkAction={this.handleBulkAction}
            onButtonAction={this.handleButtonAction}
            slotForLeftToolbarArea={
              <Search
                value={this.tableModel.getFilter("searchFilter").value}
                onValueChange={this.handleSeachValueChange}
              />
            }
            slotForFilterContent={
              <div style={{ width: 400 }}>
                <SliderFilter
                  value={this.tableModel.getFilter("sliderFilter").value}
                  onChange={this.handleSliderFilterChange}
                />
                <FatFilter
                  checked={this.tableModel.getFilter("fatFilter").value}
                  onFatFilterChange={this.handleFatFilterChange}
                />
                <CaloriesFilter
                  checked={this.tableModel.getFilter("caloriesFilter").value}
                  onCaloriesFilterChange={this.handleCaloriesFilterChange}
                />
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

export default observer(App);
