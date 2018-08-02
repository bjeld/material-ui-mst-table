import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import BulkActionsView from "./components/BulkActionsView";
import ButtonActionsView from "./components/ButtonActionsView";
import Divider from "@material-ui/core/Divider";
import PopoverFilter from "./components/PopoverFilter";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    backgroundColor: "#F5F5F5"
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
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    flex: "1 0 auto",
    marginRight: 48
  }
});

const MstMuiTableToolbar = ({
  classes,
  numSelected,
  bulkActions,
  buttonActions,
  onBulkAction,
  onButtonAction,
  slotForLeftToolbarArea,
  slotForFilterContent
}) => (
  <React.Fragment>
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <React.Fragment>
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
            <BulkActionsView bulkActions={bulkActions} onBulkAction={onBulkAction} />
          </React.Fragment>
        ) : (
          slotForLeftToolbarArea
        )}
      </div>

      <div className={classes.actions}>
        {numSelected > 0 ? null : (
          <React.Fragment>
            <ButtonActionsView buttonActions={buttonActions} onButtonAction={onButtonAction} />
            <div style={{ width: 12 }} />
            {slotForFilterContent && <PopoverFilter>{slotForFilterContent}</PopoverFilter>}
          </React.Fragment>
        )}
      </div>
    </Toolbar>
    <Divider />
  </React.Fragment>
);

export default withStyles(styles)(observer(MstMuiTableToolbar));
