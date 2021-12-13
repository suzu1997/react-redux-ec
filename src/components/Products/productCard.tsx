import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { VFC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

type Props = {
  product: any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 8px',
    textAlign: 'left',
    '&:lastchild': {
      paddingBottom: 16,
    },
  },
  media: {
    height: '0',
    paddingTop: '100%',
  },
  price: {
    color: 'brown',
    fontSize: 16,
  },
}));

export const ProductCard: VFC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const price = props.product.price.toLocaleString();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.product.images[0].path}
        onClick={() => dispatch(push('/product/' + props.product.id))}
      />
      <CardContent className={classes.content}>
        <Typography color='textSecondary' component='p'>
          {props.product.name}
        </Typography>
        <Typography className={classes.price} component='p'>
          ¥{price}
        </Typography>
      </CardContent>
    </Card>
  );
};
