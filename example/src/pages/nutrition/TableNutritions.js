import React from "react";

// Components
import Search from "../../components/Search";
import SliderFilter from "../../components/SliderFilter";
import BooleanFilter from "../../components/BooleanFilter";

// Material-ui
import { Typography, Button } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
// material-ui-mst-table
import {
  MstMuiTable,
  TableModel,
  columnBuilder,
  CellTextEditable,
  BulkAction,
  ButtonAction,
  ColumnList,
  Data,
  Filter
} from "material-ui-mst-table";

// MobX
import { observer } from "mobx-react";

// Filter id constants
const FAT_FILTER = "fatFilter";
const CALORIES_FILTER = "caloriesFilter";
const SEARCH_FILTER = "searchFilter";
const SLIDER_FILTER = "sliderFilter";
const dessertNames = ["Frozen yoghurt", "Cupcake", "Donut", "Eclair", "Gingerbread"];
const statusList = ["error", "info", "warn", "success"];

class Table_Nutritions extends React.Component {
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
      return dessert.toLowerCase().indexOf(value.toLowerCase()) > -1;
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
      orderBy: "status",
      order: "desc",
      rowsPerPage: 30,
      rowsPerPageOptions: [10, 30, 50, 100, 500],
      bulkActions: [BulkAction.create({ type: "delete", multiple: true })],
      buttonActions: [
        ButtonAction.create({
          type: "create",
          variant: "outlined",
          color: "primary"
        })
      ],
      columnList: ColumnList.create({
        showCheckbox: true,
        columns: [
          columnBuilder("dessert", "Name", (value, data) => {
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
          columnBuilder("calories", "Calories", value => value, { align: "right" }),
          columnBuilder("protein", "protein", value => value, { align: "right" }),
          columnBuilder("fat", "Fat (g)", value => value, { align: "right" }),
          columnBuilder("carbs", "Carbs (g)", value => value, {
            align: "right"
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
          <Typography variant="subheading">{`${
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
                <FormGroup>
                  <SliderFilter
                    value={this.tableModel.getFilter(SLIDER_FILTER).value}
                    onChange={this.handleSliderFilterChange}
                  />
                  <div style={{ height: 24 }} />

                  <FormControlLabel
                    control={
                      <BooleanFilter
                        checked={this.tableModel.getFilter(FAT_FILTER).value}
                        onChange={this.handleFatFilterChange}
                        color="primary"
                      />
                    }
                    label="Low fat"
                  />
                  <FormHelperText>* Low fat = less than 50</FormHelperText>
                  <div style={{ height: 24 }} />
                  <FormControlLabel
                    control={
                      <BooleanFilter
                        checked={this.tableModel.getFilter(CALORIES_FILTER).value}
                        onChange={this.handleCaloriesFilterChange}
                        color="primary"
                      />
                    }
                    label="Low calories"
                  />
                  <FormHelperText>* Low calories = less than 50</FormHelperText>

                  <div style={{ height: 48 }} />
                  <Button variant="outlined" onClick={this.handleResetAllButtonClick}>
                    Reset filters
                  </Button>
                </FormGroup>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

export default observer(Table_Nutritions);
