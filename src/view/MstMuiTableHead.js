import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { observer } from "mobx-react";

const MstMuiTableHead = ({
  columnList,
  numSelected,
  rowCount,
  rowActions,
  onSelectAllClick,
  onRequestSort,
  order,
  orderBy
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnList.showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {columnList.visibleColumns.map((column, i) => (
          <TableCell
            key={`MstMuiTableHead_${column.fieldName}`}
            align={column.align}
            padding={columnList.showCheckbox && i === 0 ? "none" : "default"}
            sortDirection={orderBy === column.fieldName ? order : false}
          >
            <Tooltip title="Sort" enterDelay={300}>
              <TableSortLabel
                active={orderBy === column.fieldName}
                direction={order}
                onClick={createSortHandler(column.fieldName)}
              >
                {column.fieldLabel}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}

        {rowActions.length > 0 && <TableCell align="right">Actions</TableCell>}
      </TableRow>
    </TableHead>
  );
};

export default observer(MstMuiTableHead);
