import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  closeModal,
  createCCAcc,
  fetchCCBalance,
} from "../../redux/features/creditSlice";
import LoadingSpinner from "../UI/LoadingSpinner";
import CreditCardSuccess from "./CreditCardSuccess";
import CreditCreateUser from "./CreditCreateUser";

const CreditCard: React.FC = () => {
  const { loading, error, cardType, modal, usedBalance } = useAppSelector(
    (state) => state.creditCard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardType.length === 0) {
      dispatch(fetchCCBalance());
    }
  }, [dispatch, cardType]);

  const createUser = useCallback(
    () => dispatch(createCCAcc("Gold")),
    [dispatch]
  );

  const closeModalCallBack = useCallback(
    () => dispatch(dispatch(closeModal())),
    [dispatch]
  );
  if (loading && cardType.length === 0) return <LoadingSpinner />;
  if (error === "No Credit")
    return (
      <>
        <CreditCreateUser createUser={createUser} />
      </>
    );
  if (cardType.length > 0) {
    return (
      <>
        <CreditCardSuccess
          usedBalance={usedBalance}
          modal={modal}
          cardType={cardType}
          closeModal={closeModalCallBack}
        />
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
