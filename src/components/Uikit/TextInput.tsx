import { TextField } from '@material-ui/core';
import { ChangeEventHandler, VFC } from 'react';

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
  return (
    <TextField
      fullWidth={props.fullWidth} // trueなら全幅
      label={props.label} // ラベル
      margin='dense'
      multiline={props.multiline} // 複数行か
      required={props.required} // 必須か
      rows={props.rows} // 複数行の場合の行数
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};
