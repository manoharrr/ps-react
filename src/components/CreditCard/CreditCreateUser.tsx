import { Props } from "../Home/HomeCreateUser";

const CreditCreateUser: React.FC<Props> = ({ createUser }) => {
  return (
    <div className='container mt-8 bg-gray-100 p-8 rounded max-w-xl mx-auto mb-12'>
      <h2 className='text-xl font-bold mb-4'>
        No Credit Card account found. Click below to create one.
      </h2>
      <button
        aria-label='Create new Credit Card account'
        className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-md font-bold'
        onClick={createUser}
      >
        Create new Credit Card account
      </button>
    </div>
  );
};

export default CreditCreateUser;
