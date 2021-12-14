import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useCallback, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/img/header_logo.png';
import { RootState } from '../../reducks/store/store';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { ClosableDrawer } from './ClosableDrawer';
import { HeaderMenus } from './HeaderMenus';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
});

export const Header: VFC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  // ログイン状態を取得
  const isSignedIn = getIsSignedIn(selector);
  // ドロワーの開閉状態
  const [open, setopen] = useState<boolean>(false);

  // ドロワーメニューを開閉する
  const handleDrawerToggle = useCallback((e) => {
    // TabかShiftを押しても閉じないように
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setopen(!open);
  }, [open, setopen]);

  return (
    <header className={classes.root}>
      <AppBar position='fixed' className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo}
            alt='logo'
            width='150px'
            onClick={() => dispatch(push('/'))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
            </div>
          )}
        </Toolbar>
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      </AppBar>
    </header>
  );
};
