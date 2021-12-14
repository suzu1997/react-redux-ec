import { makeStyles } from '@material-ui/core';
import { VFC } from 'react';

type Props = {
  label: string;
  value: string;
};

const useStyles = makeStyles({
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginBottom: 16,
  },
  label: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  value: {
    fontWeight: 600,
    marginRight: 0,
    marginLeft: 'auto',
  },
});

export const TextDetail: VFC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.label}>{props.label}</div>
      <div className={classes.value}>{props.value}</div>
    </div>
  );
};
