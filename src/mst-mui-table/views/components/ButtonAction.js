import React from "react";
import { Button } from "@material-ui/core";

const ButtonAction = ({ buttonAction }) => {
  return (
    <Button color={buttonAction.color} variant={buttonAction.variant}>
      {buttonAction.type}
    </Button>
  );
};

export default ButtonAction;
