import { Badge } from '@material-ui/core';
import { IconButton } from '@mui/material';
import { VFC } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  handleDrawerToggle: (e: any) => void;
};

export const HeaderMenus: VFC<Props> = (props) => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
