import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import type { MouseEventHandler, VFC } from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#ddd',
    color: '#000',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
}));

type Props = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const GreyButton: VFC<Props> = (props: any) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant='contained'
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};
