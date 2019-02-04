import React from "react";
import TableBody from "@material-ui/core/TableBody";
import MstMuiTableRow from "./MstMuiTableRow";

import { observer } from "mobx-react";

const MstMuiTableBody = ({ columnList, dataProvider }) => {
  return (
    <TableBody>
      {dataProvider.map(data => {
        return <MstMuiTableRow data={data} columnList={columnList} />;
      })}
    </TableBody>
  );
};

export default observer(MstMuiTableBody);
