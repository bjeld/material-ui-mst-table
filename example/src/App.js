import React from "react";

// Components
import Search from "./components/Search";
import SliderFilter from "./components/SliderFilter";
import BooleanFilter from "./components/BooleanFilter";
import CheckBoxesFilter from "./components/CheckBoxesFilter";

// Mst-mui-table
import { MstMuiTable } from "material-ui-mst-table";


import { CellStatusRenderer } from "material-ui-mst-table";
import { CellTextEditable } from "material-ui-mst-table";
import { CellAvatarRenderer } from "material-ui-mst-table";
import { BulkAction } from "material-ui-mst-table";
import { ButtonAction } from "material-ui-mst-table";
import { ColumnList } from "material-ui-mst-table";
import { Data } from "material-ui-mst-table";
import { Filter } from "material-ui-mst-table";
import { TableModel } from "material-ui-mst-table";
import { columnBuilder } from "material-ui-mst-table";

// Material-ui
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// MobX
import { observer } from "mobx-react";

// Filter id constants
const FAT_FILTER = "fatFilter";
const CALORIES_FILTER = "caloriesFilter";
const SEARCH_FILTER = "searchFilter";
const SLIDER_FILTER = "sliderFilter";
const STATUS_FILTER = "statusFilter";

const dessertNames = ["Frozen yoghurt", "Cupcake", "Donut", "Eclair", "Gingerbread"];

const statusList = ["error", "info", "warn", "success"];
const statusLabels = {
  error: "Error",
  info: "Awaiting Approval",
  warn: "Invalid",
  success: "Approved"
};

class App extends React.Component {
  // Create filters with default values
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

  createStatusFilter = () => {
    const statusFilter = Filter.create({ id: STATUS_FILTER, value: [...statusList] });
    statusFilter.setRules((data, value) => {
      // console.log("value", value);
      return true;
    });
    return statusFilter;
  };

  constructor(props) {
    super(props);

    this.tableModel = TableModel.create({
      orderBy: "fat",
      order: "desc",
      rowsPerPageOptions: [10, 30, 50, 100, 500],
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
          columnBuilder("dessert", "Name", (value, data) => {
            /*
            return (
              <CellAvatarRenderer
                initials="mb"
                primaryLabel="Martin Bjeld"
                secondaryLabel="Head of heads"
              />
            );
            */
            return (
              <CellTextEditable
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
          columnBuilder("protein", "protein", value => value, { numeric: true }),
          columnBuilder("fat", "Fat (g)", value => value, { numeric: true }),
          columnBuilder("carbs", "Carbs (g)", value => value, {
            numeric: true
          }),
          columnBuilder(
            "status",
            "Status",
            value => {
              return (
                <CellStatusRenderer success={false} status={value} label={statusLabels[value]} />
              );
            },
            {
              numeric: false
            }
          )
        ]
      })
    });

    this.tableModel.addFilter(this.createFatFilter());
    this.tableModel.addFilter(this.createCaloriesFilter());
    this.tableModel.addFilter(this.createSliderFilter());
    this.tableModel.addFilter(this.createSearchFilter());
    // this.tableModel.addFilter(this.createStatusFilter());

    for (let i = 0; i < 300; i++) {
      this.tableModel.add(this.createDummyData(`${i}`));
    }
  }

  createDummyData = id => {
    const len = dessertNames.length;
    const dessert = dessertNames[Math.floor(Math.random() * len)];

    const statusRandom = Math.floor(Math.random() * 4);
    return Data.create({
      id: `${Math.ceil(Math.random() * 100000000)}`,
      fieldNames: {
        dessert: `${dessert} ${id}`,
        status: statusList[statusRandom],
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

  handleRowAction = (data, rowAction) => {
    if (rowAction.type === "delete") {
      this.tableModel.destroyItems([data]);
    }
  };

  handleFatFilterChange = (event, checked) => {
    this.tableModel.getFilter(FAT_FILTER).update(checked);
  };

  handleCaloriesFilterChange = (event, checked) => {
    this.tableModel.getFilter(CALORIES_FILTER).update(checked);
  };

  handleCheckBoxesChange = (option, checked) => {
    const tempArr = [...this.tableModel.getFilter(STATUS_FILTER).value];
    if (checked) {
      tempArr.push(option);
    } else {
      const removeIndex = tempArr.indexOf(option);
      tempArr.splice(removeIndex, 1);
    }
    const filter = this.tableModel.getFilter(STATUS_FILTER);
    // console.log(filter);
    filter.update(tempArr);
  };

  handleSearchValueChange = value => {
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
            onRowAction={this.handleRowAction}
            slotForLeftToolbarArea={
              <Search
                value={this.tableModel.getFilter(SEARCH_FILTER).value}
                onValueChange={this.handleSearchValueChange}
              />
            }
            slotForFilterContent={
              <div style={{ padding: 24 }}>
                <SliderFilter
                  value={this.tableModel.getFilter(SLIDER_FILTER).value}
                  onChange={this.handleSliderFilterChange}
                />
                <BooleanFilter
                  title="Fat < 50g"
                  checked={this.tableModel.getFilter(FAT_FILTER).value}
                  onChange={this.handleFatFilterChange}
                />

                <BooleanFilter
                  title="Calories < 50g"
                  checked={this.tableModel.getFilter(CALORIES_FILTER).value}
                  onChange={this.handleCaloriesFilterChange}
                />
                {/* 
                <CheckBoxesFilter
                  options={statusList}
                  selections={this.tableModel.getFilter(STATUS_FILTER).value}
                  onChange={this.handleCheckBoxesChange}
                /> */}
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
