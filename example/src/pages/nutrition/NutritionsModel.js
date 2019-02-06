import React from "react";
import { types } from "mobx-state-tree";
import {
  TableModel,
  Data,
  ColumnList,
  ButtonAction,
  BulkAction,
  columnBuilder,
  CellTextEditable
} from "material-ui-mst-table";

const tableModel = TableModel.create({
  orderBy: "dessert",
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
      columnBuilder("calories", "Calories", value => value, {
        align: "right"
      }),
      columnBuilder("protein", "protein", value => value, { align: "right" }),
      columnBuilder("fat", "Fat (g)", value => value, { align: "right" }),
      columnBuilder("carbs", "Carbs (g)", value => value, {
        align: "right"
      })
    ]
  })
});

const NutritionsModel = types
  .model("NutritionsModel", {
    tableModel: types.maybe(TableModel),
    items: types.maybe(types.array(Data))
  })
  .actions(self => ({
    fetchData() {
      const dessertNames = ["Frozen yoghurt", "Cupcake", "Donut", "Eclair", "Gingerbread"];
      const numDessertNames = dessertNames.length;
      const dessert = dessertNames[Math.floor(Math.random() * numDessertNames)];
      const items = [];
      for (let index = 0; index < 100; index++) {
        items.push(
          Data.create({
            id: `${Math.ceil(Math.random() * 100000000)}`,
            fieldNames: {
              dessert: `${dessert} ${index}`,
              calories: Math.round(Math.random() * 100),
              fat: Math.round(Math.random() * 100),
              carbs: Math.round(Math.random() * 100),
              protein: Math.round(Math.random() * 100)
            }
          })
        );
      }
      self.items = items;
      console.log(self.items);
    }
  }))
  .views(self => ({}));

export default NutritionsModel;
