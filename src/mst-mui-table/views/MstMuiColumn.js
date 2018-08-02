import React from "react";
import { observer } from "mobx-react";
import TableCell from "@material-ui/core/TableCell";

class MstMuiColumn extends React.Component {
  render() {
    const { column, value, data, ...other } = this.props;

    return (
      <TableCell numeric={column.numeric} {...other}>
        {column.renderer(value, data)}
      </TableCell>
    );
  }
}

export default observer(MstMuiColumn);
