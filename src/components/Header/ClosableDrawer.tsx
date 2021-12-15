import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/History';
import { useCallback, useEffect, useState, VFC } from 'react';

import { TextInput } from '../Uikit/TextInput';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducks/users/operations';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
  // container: any;
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
  const dispatch = useDispatch();
  const classes = useStyles();
  // const { container } = props;

  const [keyword, setKeyword] = useState<string>('');

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (e: any, path: string) => {
    dispatch(push(path));
    props.onClose(e);
  };
  // 検索フィルター
  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: 'すべて',
      id: 'all',
      value: '/', // 遷移先のパス
    },
    {
      func: selectMenu,
      label: 'メンズ',
      id: 'men',
      value: '/?gender=men', // 遷移先のパス
    },
    {
      func: selectMenu,
      label: 'レディース',
      id: 'women',
      value: '/?gender=women', // 遷移先のパス
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: '商品登録',
      icon: <AddCircleIcon />,
      id: 'register',
      value: '/product/edit', // 遷移先のパス
    },
    {
      func: selectMenu,
      label: '注文履歴',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/order/history', // 遷移先のパス
    },
    {
      func: selectMenu,
      label: 'プロフィール',
      icon: <PersonIcon />,
      id: 'profile',
      value: '/user/myPage', // 遷移先のパス
    },
  ];

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    getDocs(q).then((snapshots) => {
      const list: Array<any> = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push({
          func: selectMenu,
          label: data.name,
          id: data.id,
          value: `/?category=${data.id}`,
        });
      });
      setFilters((prevState) => [...prevState, ...list]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant='temporary'
        anchor='right' // どちらから出るか
        open={props.open}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }} // スマホの時、開いた時のパフォーマンス上がる
        onClose={(e) => props.onClose(e)}
      >
        <div
          onKeyDown={(e) => {
            props.onClose(e);
          }}
          onClick={(e) => {
            props.onClose(e);
          }}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={'キーワードを入力'}
              multiline={false}
              required={false}
              rows={1}
              value={keyword}
              type={'text'}
              onChange={inputKeyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem
              button
              key='logout'
              onClick={(e) => {
                dispatch(signOut());
                props.onClose(e);
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};
