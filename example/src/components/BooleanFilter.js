import React from "react";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

const BooleanFilter = ({ title, ...other }) => {
  return (
    <div>
      <Typography>{title}</Typography>
      <Switch {...other} />
    </div>
  );
};

export default BooleanFilter;
