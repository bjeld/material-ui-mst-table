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
import Button from "@material-ui/core/Button";
const FAT_FILTER = "fatFilter";
const CALORIES_FILTER = "caloriesFilter";
const SEARCH_FILTER = "searchFilter";
const SLIDER_FILTER = "sliderFilter";

const dessertNames = ["Frozen yoghurt", "Cupcake", "Donut", "Eclair", "Gingerbread"];

const FatFilter = ({ checked, onFatFilterChange }) => {
  return (
    <div>
      <Typography>Fat below 50g</Typography>
      <Switch checked={checked} onChange={onFatFilterChange} />
    </div>
  );
};
const CaloriesFilter = ({ checked, onCaloriesFilterChange }) => {
  return (
    <div>
      <Typography>Calories below 50</Typography>
      <Switch checked={checked} onChange={onCaloriesFilterChange} />
    </div>
  );
};

class App extends React.Component {
  createFatFilter = () => {
    const fatFilter = Filter.create({ id: FAT_FILTER, value: false });
    fatFilter.setRules((data, value) => (value ? data.getFieldValue("fat") < 50 : true));
    return fatFilter;
  };

  createCaloriesFilter = () => {
    const caloriesFilter = Filter.create({ id: CALORIES_FILTER, value: false });
    caloriesFilter.setRules((data, value) => (value ? data.getFieldValue("calories") < 50 : true));
    return caloriesFilter;
  };

  createSearchFilter = () => {
    const searchFilter = Filter.create({ id: SEARCH_FILTER, value: "" });
    searchFilter.setRules((data, value) => {
      const dessert = data.getFieldValue("dessert").toLowerCase();
      return dessert.toLowerCase().indexOf(value) > -1;
    });
    return searchFilter;
  };

  createSliderFilter = () => {
    const sliderFilter = Filter.create({ id: SLIDER_FILTER, value: 100 });
    sliderFilter.setRules((data, value) => {
      const carbs = data.getFieldValue("carbs");
      return carbs <= value;
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
    this.tableModel.addFilter(this.createSliderFilter());
    this.tableModel.addFilter(this.createSearchFilter());

    for (let i = 0; i < 300; i++) {
      this.tableModel.add(this.createDummyData(`${i}`));
    }
  }

  createDummyData = id => {
    const len = dessertNames.length;
    const dessert = dessertNames[Math.floor(Math.random() * len)];
    return Data.create({
      id: `${Math.ceil(Math.random() * 100000000)}`,
      fieldNames: {
        dessert: `${dessert} ${id}`,
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
    this.tableModel.getFilter(FAT_FILTER).update(checked);
  };

  handleCaloriesFilterChange = (event, checked) => {
    this.tableModel.getFilter(CALORIES_FILTER).update(checked);
  };

  handleSeachValueChange = value => {
    this.tableModel.getFilter(SEARCH_FILTER).update(value);
  };

  handleSliderFilterChange = (event, value) => {
    this.tableModel.getFilter(SLIDER_FILTER).update(value);
  };

  handleResetAllButtonClick = event => {
    this.tableModel.getFilter(FAT_FILTER).update(false);
    this.tableModel.getFilter(CALORIES_FILTER).update(false);
    this.tableModel.getFilter(SEARCH_FILTER).update("");
    this.tableModel.getFilter(SLIDER_FILTER).update(100);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}>
        <div style={{ width: 1024 }}>
          <Typography variant="title">{`${
            this.tableModel.numRowCount
          } Nutrition items`}</Typography>

          <MstMuiTable
            tableModel={this.tableModel}
            onBulkAction={this.handleBulkAction}
            onButtonAction={this.handleButtonAction}
            slotForLeftToolbarArea={
              <Search
                value={this.tableModel.getFilter(SEARCH_FILTER).value}
                onValueChange={this.handleSeachValueChange}
              />
            }
            slotForFilterContent={
              <div style={{ padding: 24 }}>
                <SliderFilter
                  value={this.tableModel.getFilter(SLIDER_FILTER).value}
                  onChange={this.handleSliderFilterChange}
                />
                <FatFilter
                  checked={this.tableModel.getFilter(FAT_FILTER).value}
                  onFatFilterChange={this.handleFatFilterChange}
                />
                <CaloriesFilter
                  checked={this.tableModel.getFilter(CALORIES_FILTER).value}
                  onCaloriesFilterChange={this.handleCaloriesFilterChange}
                />
                <Button onClick={this.handleResetAllButtonClick}>Reset all</Button>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

export default observer(App);
