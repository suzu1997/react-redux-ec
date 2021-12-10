import type { VFC } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
});

type Props = {
  label: string;
  required: boolean;
  value: string;
  select: (value: any) => void;
  options: Array<{ [key: string]: string }>;
};

export const SelectBox: VFC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          required={props.required}
          value={props.value}
          onChange={(e) => props.select(e.target.value)}
        >
          {props.options.map((option) => {
            return (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
