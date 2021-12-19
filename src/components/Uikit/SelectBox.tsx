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
  const { label, required, value, select, options } = props;

  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          required={required}
          value={value}
          onChange={(e) => select(e.target.value)}
        >
          {options.map((option) => {
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
