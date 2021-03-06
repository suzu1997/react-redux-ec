import { Drawer, makeStyles } from '@material-ui/core';
import { VFC } from 'react';

import { MenuColumn } from '../Products/MenuColumn';

type Props = {
  open: boolean;
  onClose: (e: any) => void;
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}));

export const ClosableDrawer: VFC<Props> = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant='temporary'
        anchor='right' // どちらから出るか
        open={open}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }} // スマホの時、開いた時のパフォーマンス上がる
        onClose={(e) => onClose(e)}
      >
        <div>
          <MenuColumn onClose={(e) => onClose(e)} />
        </div>
      </Drawer>
    </nav>
  );
};
