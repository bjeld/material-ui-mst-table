import React from "react";
import MstMuiTableHead from "./MstMuiTableHead";
import MstMuiTableRow from "./MstMuiTableRow";
import MstMuiTableToolbar from "./MstMuiTableToolbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const MstMuiTable = ({
  classes,
  tableModel,
  onBulkAction,
  onButtonAction,
  slotForLeftToolbarArea,
  slotForFilterContent
}) => {
  const handleRequestSort = (event, property) => {
    tableModel.updateOrderBy(property);
  };

  const handleSelectAllClick = (event, checked) => {
    if (checked) {
      tableModel.selectAll();
    } else {
      tableModel.deselectAll();
    }
  };

  const handleChangePage = (event, page) => {
    tableModel.updatePage(page);
  };

  const handleChangeRowsPerPage = event => {
    tableModel.updateRowsPerPage(event.target.value);
  };

  if (!tableModel.rowsPerPageOptions.includes(tableModel.rowsPerPage)) {
    throw new Error(
      `rowsPerPage value of ${
        tableModel.rowsPerPage
      } does not match one of the values in rowsPerPageOptions ${tableModel.rowsPerPageOptions}`
    );
  }

  return (
    <Paper className={classes.root}>
      <MstMuiTableToolbar
        numSelected={tableModel.numSelected}
        bulkActions={tableModel.bulkActions}
        buttonActions={tableModel.buttonActions}
        hasFilter={tableModel.hasFilter}
        onBulkAction={onBulkAction}
        onButtonAction={onButtonAction}
        slotForLeftToolbarArea={slotForLeftToolbarArea}
        slotForFilterContent={slotForFilterContent}
      />
      <Table className={classes.table}>
        <MstMuiTableHead
          rowCount={tableModel.numRowCount}
          numSelected={tableModel.numSelected}
          columnList={tableModel.columnList}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          order={tableModel.order}
          orderBy={tableModel.orderBy}
        />
        <TableBody>
          {tableModel.sorted.map(data => (
            <MstMuiTableRow
              data={data}
              key={`MstMuiTableRow_${data.id}`}
              columnList={tableModel.columnList}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={tableModel.numRowCount}
        rowsPerPage={tableModel.rowsPerPage}
        rowsPerPageOptions={tableModel.rowsPerPageOptions}
        page={tableModel.page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default withStyles(styles)(observer(MstMuiTable));
