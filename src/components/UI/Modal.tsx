import React from "react";

interface IProps {
  body: string;
  showModal: boolean;
  closeModal: () => void;
  // saveModalContent?: boolean;
  // saveModalFunction?: () => void;
}

const Modal: React.FC<IProps> = ({
  body,
  showModal,
  closeModal,
  // saveModalContent = false,
  // saveModalFunction = () => {},
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-3 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col md:min-w-[600px] min-w-full w-96 bg-white outline-none focus:outline-none'>
                {/*header*/}
                {/* <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Modal Title</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div> */}
                {/*body*/}
                <div className='min-w-full relative p-6 flex-auto'>
                  <h2 className='my-4 text-slate-700 text-lg leading-relaxed font-bold text-center'>
                    {body}
                  </h2>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='text-green-600 background-transparent font-bold uppercase px-6 py-2 text-m outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => closeModal()}
                  >
                    Close
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

export default Modal;
