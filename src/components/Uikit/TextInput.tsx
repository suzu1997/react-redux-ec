import { ChangeEventHandler, VFC } from 'react';
import { TextField } from '@material-ui/core';

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

// 使い回しできるtextboxのコンポーネント
export const TextInput: VFC<Props> = (props) => {
  const { fullWidth, label, multiline, required, rows, value, type, onChange } =
    props;

  return (
    <TextField
      fullWidth={fullWidth} // trueなら全幅
      label={label} // ラベル
      margin='dense'
      multiline={multiline} // 複数行か
      required={required} // 必須か
      rows={rows} // 複数行の場合の行数
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};
