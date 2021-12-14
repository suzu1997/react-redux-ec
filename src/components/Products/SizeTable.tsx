import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import type { VFC } from 'react';
import { Size } from '../../reducks/products/types';

type Props = {
  sizes: Array<Size>;
  addProduct: (size: string) => void;
};

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
    padding: 0,
  },
});

export const SizeTable: VFC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell component='th' scope='row'>
                    {item.size}
                  </TableCell>
                  <TableCell>残り{item.quantity}点</TableCell>
                  <TableCell className={classes.iconCell}>
                    {Number(item.quantity) > 0 ? (
                      <IconButton onClick={() => props.addProduct(item.size)}>
                        <ShoppingCartIcon />
                      </IconButton>
                    ) : (
                      <div>売切れ</div>
                    )}
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton
                    // onClick={}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
