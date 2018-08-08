import React from "react";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    width: 300,
    padding: 12
  }
};

const SliderFilter = ({ value, onChange, classes }) => {
  return (
    <div className={classes.root}>
      <Typography>{`Carbs below ${value}`}</Typography>
      <Slider min={20} max={100} step={1} value={value} onChange={onChange} />
    </div>
  );
};

export default withStyles(styles)(SliderFilter);
