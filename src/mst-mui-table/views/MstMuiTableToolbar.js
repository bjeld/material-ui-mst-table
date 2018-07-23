import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import BulkActionsView from "./components/BulkActionsView";
import ButtonActionsView from "./components/ButtonActionsView";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

const MstMuiTableToolbar = ({
  classes,
  numSelected,
  bulkActions,
  buttonActions,
  onBulkAction,
  onButtonAction
}) => (
  <Toolbar
    className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0
    })}
  >
    <div className={classes.title}>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subheading">
          {numSelected} selected
        </Typography>
      ) : (
        <ButtonActionsView
          buttonActions={buttonActions}
          onButtonAction={onButtonAction}
        />
      )}
    </div>
    <div className={classes.spacer} />

    <div className={classes.actions}>
      {numSelected > 0 ? (
        <BulkActionsView
          bulkActions={bulkActions}
          onBulkAction={onBulkAction}
        />
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  </Toolbar>
);

export default withStyles(styles)(observer(MstMuiTableToolbar));
