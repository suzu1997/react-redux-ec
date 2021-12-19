import { Fragment, VFC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from './PrimaryButton';
import { GreyButton } from './GreyButton';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeModal: VoidFunction;
  openModal: VoidFunction;
  text: string;
};

export const Modal: VFC<Props> = (props) => {
  const { isOpen, closeModal, text } = props;

  const dispatch = useDispatch();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-16 my-8 overflow-hidden  align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <button
                  onClick={closeModal}
                  className='text-blue-900 rounded-md absolute top-3 right-3 cursor-pointer'
                >
                  閉じる
                </button>
                <div>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {text}
                  </Dialog.Title>

                  <div className='mt-4'>
                    <GreyButton
                      label={'新規会員登録'}
                      onClick={() => {
                        dispatch(push('/signup'));
                        closeModal();
                      }}
                    />
                    <PrimaryButton
                      label={'ログイン'}
                      onClick={() => {
                        dispatch(push('/signin'));
                        closeModal();
                      }}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
