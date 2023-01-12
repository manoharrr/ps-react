import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  closeModal,
  createCCAcc,
  fetchCCBalance,
} from "../../redux/features/creditSlice";
import ShowSBTransactions from "../Transaction/ShowSBTransactions";
import LoadingSpinner from "../UI/LoadingSpinner";
import CreditCardSuccess from "./CreditCardSuccess";

const CreditCard: React.FC = () => {
  const { loading, error, cardType, modal, usedBalance } = useAppSelector(
    (state) => state.creditCard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCCBalance());
  }, [dispatch]);
  if (loading) return <LoadingSpinner />;
  if (error === "No Credit")
    return (
      <>
        <div className='container mt-8 bg-gray-100 p-8 rounded max-w-xl mx-auto'>
          <h2 className='text-xl font-bold mb-4'>
            No Credit Card account found. Click below to create one.
          </h2>
          <button
            aria-label='Create new Credit Card account'
            className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-md font-bold'
            onClick={() => dispatch(createCCAcc("Gold"))}
          >
            Create new Credit Card account
          </button>
        </div>
      </>
    );
  if (cardType.length > 0) {
    return (
      <>
        <CreditCardSuccess
          usedBalance={usedBalance}
          modal={modal}
          cardType={cardType}
          closeModal={() => dispatch(closeModal())}
        />
        <ShowSBTransactions type='credit_card' />
      </>
    );
  }
  return (
    <h3 className='text-xl font-bold'>
      Something went wrong please try again later.
    </h3>
  );
};

export default CreditCard;
