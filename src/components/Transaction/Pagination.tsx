interface Props {
  transactionPerPage: number;
  totalPosts: number;
  currentPage: number;
  indexOfLastTransaction: number;
  indexOfFirstPost: number;
  paginate: (val: number) => void;
}
const Pagination: React.FC<Props> = ({
  transactionPerPage,
  totalPosts,
  currentPage,
  indexOfLastTransaction,
  indexOfFirstPost,
  paginate,
}) => {
  return (
    <>
      <div className='container max-w-full md:max-w-[1440px] md:mx-auto bg-gray-100 flex flex-col md:flex-row md:justify-between md:items-center rounded-xl rounded-b-none border border-t-gray-100 p-2'>
        <h2 className='mx-2 text-xl md:text-2xl fond-bold font-extrabold text-center font-alata md:ml-4'>
          Recent Transactions
        </h2>
        <div className=' flex flex-row justify-center md:justify-end items-center text-l md:text-xl md:mr-4'>
          <span className=' text-black '>
            Showing{" "}
            <span className='font-semibold text-gray-900 '>
              {indexOfFirstPost + 1}
            </span>{" "}
            to{" "}
            <span className='font-semibold text-gray-900 '>
              {indexOfLastTransaction > totalPosts
                ? totalPosts
                : indexOfLastTransaction}
            </span>
            {totalPosts < 8 ? (
              <></>
            ) : (
              <>
                {" "}
                of{" "}
                <span className='font-semibold text-gray-900 '>
                  {totalPosts}
                </span>{" "}
                Entries
              </>
            )}
          </span>
          <div className='inline-flex xs:mt-0'>
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className='inline-flex items-center px-4 py-2 ml-3 font-medium text-white bg-blue-600 rounded-l hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
              Prev
            </button>
            <button
              disabled={totalPosts <= indexOfLastTransaction}
              onClick={() => paginate(currentPage + 1)}
              className='inline-flex items-center px-4 py-2 font-medium text-white bg-blue-600 border-0 border-l  active:bg-blue-800 border-blue-700 rounded-r hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
            >
              Next
              <svg
                aria-hidden='true'
                className='w-5 h-5 ml-2'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
