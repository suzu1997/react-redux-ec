import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/styles';

import { TextInput } from '../Uikit/TextInput';
import { Size } from '../../reducks/products/types';

type Props = {
  sizes: Array<Size>;
  setSizes: Dispatch<SetStateAction<Array<Size>>>;
};

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});

export const SetSizeArea: VFC<Props> = (props) => {
  const { sizes, setSizes } = props;

  const classes = useStyles();
  // indexで新規or編集を管理する
  const [index, setIndex] = useState<number>(0);
  // サイズ名
  const [size, setSize] = useState<string>('');
  // 個数
  const [quantity, setQuantity] = useState<string>('0');

  /**
   * 入力されたサイズ名をセット.
   */
  const inputSize = useCallback((e) => {
    setSize(e.target.value);
  }, []);

  /**
   * 入力された個数をセット.
   */
  const inputQuantity = useCallback((e) => {
    setQuantity(e.target.value);
  }, []);

  /**
   * サイズを追加または編集する.
   * 
   * @param index - 操作するサイズのindex
   * @param size - 入力値のサイズ名
   * @param quantity - 入力値の個数
   */
  const addSize = (index: number, size: string, quantity: string) => {
    if (size === '' || quantity === '') {
      alert('入力欄に値がありません');
    } else {
      if (index === sizes.length) {
        // 新しいサイズの追加
        setSizes((prevState) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize('');
        setQuantity('0');
      } else {
        // 既存のサイズの変更
        const newSizes = sizes;
        newSizes[index] = { size: size, quantity: quantity };
        setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity('0');
      }
    }
  };

  /**
   * サイズを編集する.
   * 
   * @remarks
   * 編集するサイズのindexを取得し、編集用の入力欄に値をセットする。
   * 
   * @param index - 編集するサイズのindex
   * @param size - サイズ
   * @param quantity - 個数
   */
  const editSize = (index: number, size: string, quantity: string) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  /**
   * サイズを削除する.
   * 
   * @param index - 削除するサイズのindex
   */
  const deleteSize = (index: number) => {
    const newSizes = sizes;
    newSizes.splice(index, 1);
    setSizes(newSizes);
    setIndex(newSizes.length);
  };

  // sizes.lengthが変わったときにindexを変更
  // 新規追加の際は0、既存商品追加の際はサイズの要素数
  useEffect(() => {
    setIndex(sizes.length);
  }, [sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => editSize(i, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteSize(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className='flex mx-auto my-0 text-center py-4 pl-1'>
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            rows={1}
            value={size}
            type={'text'}
            onChange={inputSize}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            rows={1}
            value={quantity}
            type={'number'}
            onChange={inputQuantity}
          />
          <IconButton
            className={classes.checkIcon}
            onClick={() => addSize(index, size, quantity)}
          >
            <CheckCircleIcon />
          </IconButton>
        </div>
      </TableContainer>
    </div>
  );
};
