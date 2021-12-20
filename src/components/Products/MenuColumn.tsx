import { useCallback, useEffect, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  Divider,
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
import PersonIcon from '@mui/icons-material/Person';

import { TextInput } from '../Uikit/TextInput';
import { signOut } from '../../reducks/users/operations';
import { db } from '../../firebase';
import { RootState } from '../../reducks/store/store';
import { getIsSignedIn, getRole } from '../../reducks/users/selectors';

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

type Props = {
  onClose?: (e: any) => void;
};

export const MenuColumn: VFC<Props> = (props) => {
  const { onClose } = props;

  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const classes = useStyles();

  const isSignedIn = getIsSignedIn(selector);
  const role = getRole(selector);

  // 検索キーワード
  const [keyword, setKeyword] = useState<string>('');

  /**
   * 入力値を検索キーワードに設定.
   *
   * @param e - event
   */
  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  /**
   * 選択したメニュー先に遷移.
   *
   * @param e - event
   * @param path - 遷移先のパス
   */
  const selectMenu = (e: any, path: string) => {
    dispatch(push(path));

    // ドロワーメニューなら、閉じる
    if (onClose) {
      onClose(e);
    }
  };

  /**
   * 商品を検索する.
   *
   * @param e - event
   */
  const searchProducts = (e: any) => {
    dispatch(push(`/?q=${keyword}`));
    setKeyword('');

    // ドロワーメニューなら、閉じる
    if (onClose) {
      onClose(e);
    }
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

  // メニューリスト
  let menus: Array<any> = [];
  if (isSignedIn && role === 'customer') {
    menus = [
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
  }
  if (isSignedIn && role === 'admin') {
    menus = [
      {
        func: selectMenu,
        label: '商品登録',
        icon: <AddCircleIcon />,
        id: 'register',
        value: '/product/edit', // 遷移先のパス
      },
    ];
  }
  if (!isSignedIn) {
    menus = [
      {
        func: selectMenu,
        label: '会員登録',
        icon: <PersonIcon />,
        id: 'signup',
        value: '/signup', // 遷移先のパス
      },
      {
        func: selectMenu,
        label: 'login',
        icon: <PersonIcon />,
        id: 'login',
        value: '/signin', // 遷移先のパス
      },
    ];
  }

  // マウント時にフィルターメニューを取得
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
    <div>
      {onClose && (
        <button
          onClick={(e) => {
            if (onClose) {
              onClose(e);
            }
          }}
          className='mt-3 ml-3 text-blue-900  rounded-md p-1'
        >
          閉じる
        </button>
      )}
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
        <IconButton onClick={searchProducts}>
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
        {isSignedIn && (
          <ListItem
            button
            key='logout'
            onClick={(e) => {
              dispatch(signOut());
              if (onClose) {
                onClose(e);
              }
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        )}
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
  );
};
