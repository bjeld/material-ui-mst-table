import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { observer } from "mobx-react";

const CheckBoxesFilter = ({ options, selections, onChange }) => {
  return (
    <React.Fragment>
      <FormGroup>
        {options.map(item => (
          <FormControlLabel
            key={`checkboxFilter_${item}`}
            control={
              <Checkbox
                checked={selections.includes(item)}
                onChange={(event, isChecked) => onChange(item, isChecked)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </React.Fragment>
  );
};

export default observer(CheckBoxesFilter);
