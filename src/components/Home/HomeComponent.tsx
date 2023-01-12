import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  closeModal,
  createSBBalanceAcc,
  fetchSBBalance,
} from "../../redux/features/savingSlice";
import ShowSBTransactions from "../Transaction/ShowSBTransactions";
import LoadingSpinner from "../UI/LoadingSpinner";
import HomeSuccess from "./HomeSuccess";

const HomeComponent: React.FC = () => {
  const { loading, error, category, modal } = useAppSelector(
    (state) => state.savingAcc
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSBBalance());
  }, [dispatch]);
  if (loading) return <LoadingSpinner />;
  if (error === "No savings")
    return (
      <>
        <div className='container mt-8 bg-gray-100 p-8 rounded max-w-xl mx-auto'>
          <h2 className='text-xl font-bold mb-4'>
            No savings account found. Click below to create one.
          </h2>
          <button
            className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-md font-bold'
            onClick={() => dispatch(createSBBalanceAcc())}
            aria-label='Create new Savings Account'
          >
            Create new Savings Account
          </button>
        </div>
      </>
    );
  if (category.length > 0) {
    return (
      <>
        <HomeSuccess
          category={category}
          modal={modal}
          closeModal={() => dispatch(closeModal())}
        />
        <ShowSBTransactions type='savings_account' />
      </>
    );
  }
  return (
    <h3 className='text-xl font-bold'>
      Something went wrong please try again later.
    </h3>
  );
};

export default HomeComponent;
