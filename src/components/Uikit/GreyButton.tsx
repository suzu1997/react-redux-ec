import type { MouseEventHandler, VFC } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

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
  const { label, onClick } = props;

  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant='contained'
      onClick={() => onClick()}
    >
      {label}
    </Button>
  );
};
