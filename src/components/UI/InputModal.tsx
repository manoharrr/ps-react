import { useRef } from "react";

interface IProps {
  label: string;
  showModal: boolean;
  closeModal: () => void;
  getAmount: (amount: number) => void;
}

const InputModal: React.FC<IProps> = ({
  label,
  showModal,
  closeModal,
  getAmount,
}) => {
  const inp = useRef<HTMLInputElement>(null);
  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-3 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col md:min-w-[600px] min-w-full w-96 bg-white outline-none focus:outline-none'>
                <div className='min-w-full relative p-6 flex-auto'>
                  <div>
                    <label
                      htmlFor=''
                      className='text-xl font-bold text-gray-800 block mb-2'
                    >
                      {label}
                    </label>
                    <input
                      type='number'
                      className='w-full p-2 border border-gray-300 rounded mt-1'
                      ref={inp}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='w-full text-green-600 background-transparent rounded font-bold uppercase px-6 py-2 text-m hover:bg-color hover:bg-green-600 hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => getAmount(Number(inp.current?.value))}
                  >
                    Confirm
                  </button>
                  <button
                    className='w-full text-red-600 background-transparent rounded font-bold uppercase px-6 py-2 text-m hover:bg-color hover:bg-red-600 hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
};

export default InputModal;
