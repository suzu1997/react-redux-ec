import type { MouseEventHandler, VFC } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    backgroundColor: 'skyblue',
    opacity: 0.9,
    color: '#000',
    fontSize: 16,
    height: 32,
    marginBottom: 16,
    width: 128,
    '&:hover': {
      backgroundColor: 'skyblue',
      opacity: 1.0,
    },
  },
});

type Props = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const SmallButton: VFC<Props> = (props: any) => {
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
