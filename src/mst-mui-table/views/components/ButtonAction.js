import React from "react";
import { Button } from "@material-ui/core";

const ButtonAction = ({ buttonAction, onButtonAction }) => {
  const handleClick = e => onButtonAction(buttonAction);

  return (
    <Button
      color={buttonAction.color}
      variant={buttonAction.variant}
      onClick={handleClick}
    >
      {buttonAction.type}
    </Button>
  );
};

export default ButtonAction;
