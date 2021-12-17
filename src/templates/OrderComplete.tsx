import { VFC } from 'react';

const OrderComplete: VFC = () => {
  return (
    <div className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <div className='text-left max-w-md mx-auto'>
        <h1 className='font-bold text-2xl mt-8'>注文の完了</h1>
        <p className='mt-8'>ご購入ありがとうございます。</p>
        <p>ご注文を承りました。</p>
      </div>
    </div>
  );
};

export default OrderComplete;
