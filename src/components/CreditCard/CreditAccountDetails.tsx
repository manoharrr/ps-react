import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  addRemoveMoneyToCCAcc,
  closeModal as mainCloseModal,
} from "../../redux/features/creditSlice";

import InputModal from "../UI/InputModal";
import LoadingSpinner from "../UI/LoadingSpinner";

const CreditAccountDetails: React.FC = () => {
  const { name } = useAppSelector((state) => state.login);
  const {
    cardType,
    annualCharges,
    totalBalance,
    usedBalance,
    availableBalance,
    error,
    loading,
  } = useAppSelector((state) => state.creditCard);

  const [modal, setModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [addBal, setAddBal] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setModal(false);
  };

  const getAmount = (val: number) => {
    setAmount(val);
    setModal(false);
    if (addBal === "add") {
      setValid(true);
    } else {
      if (availableBalance < amount) setValid(false);
    }
  };

  useEffect(() => {
    if (amount > 0) {
      dispatch(
        addRemoveMoneyToCCAcc({
          amount,
          transactionType: addBal,
        })
      );
      setAmount(0);
    }
  }, [amount, dispatch, addBal, valid]);

  useEffect(() => {
    let Timer: ReturnType<typeof setTimeout>;
    if (error.length > 0 && !valid) {
      Timer = setTimeout(() => {
        dispatch(mainCloseModal());
      }, 2000);
    }
    return () => {
      clearTimeout(Timer);
    };
  }, [error, valid, dispatch]);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  return (
    <>
      <div
        className={`container m-2 bg-gray-100 p-3 max-w-full md:max-w-2xl rounded-xl md:mr-12 md:ml-0`}
      >
        <h2 className='mx-2 text-xl md:text-2xl fond-bold font-extrabold mb-3 text-center font-alata'>
          Credit Account Details
        </h2>
        <div className='flex max-w-full text-[18px] md:text-[20px] w-full flex-col gap-2 lg:text-start lg:flex-row p-2'>
          <div className='max-w-full w-full mt-2 md:ml-2'>
            <p className='mb-1 '>
              Account name: <span className='font-bold'>{name}</span>
            </p>
            <p className='mb-1'>
              Account type:{" "}
              {cardType === "Gold" ? (
                <span className='font-bold'>{cardType}</span>
              ) : (
                <span className='font-bold text-red-500'>Platinum</span>
              )}
            </p>
            <p className='mb-1'>
              Total Credit Account Balance:
              <span className='font-bold'> Rs. {totalBalance}</span>
            </p>
            <p className='mb-1'>
              Available Balance:{" "}
              <span className='font-bold'>Rs. {availableBalance}</span>
            </p>
            <p className='mb-1'>
              Used Balance: <span className='font-bold'>Rs. {usedBalance}</span>
            </p>
            <p className='mb-1'>
              Annual Charges:{" "}
              <span className='font-bold'>Rs. {annualCharges}</span>
            </p>
          </div>
          <div className='max-w-full lg:max-w-3/4 w-full lg:w-3/4 mt-2 text-l flex lg:block'>
            <div className='max-w-full w-full mt-2 mx-0 mr-2 lg:mr-0 lg:mb-2 '>
              <button
                aria-label='Spend Funds'
                className='w-full font-alata py-2 px-4 bg-blue-600 hover:bg-red-600 rounded-md text-white text-md font-bold disabled:opacity-50'
                onClick={() => {
                  setModal(true);
                  setAddBal("remove");
                }}
              >
                Spend Funds
              </button>
            </div>
            <div className='max-w-full w-full mt-2 mx-0 lg:mt-4'>
              <button
                className='w-full font-alata py-2 px-4 bg-blue-600 hover:bg-green-600 rounded-md text-white text-md font-bold disabled:opacity-50'
                disabled={usedBalance === 0}
                aria-label='Pay Bill'
                onClick={() => {
                  setModal(true);
                  setAddBal("add");
                }}
              >
                Pay Bill
              </button>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <InputModal
          showModal={modal}
          closeModal={closeModal}
          getAmount={getAmount}
          label={"Amount"}
        />
      )}
      {load && <LoadingSpinner />}
      {error.length > 0 && !valid ? (
        <div className='absolute text-3xl font-bold text-yellow-600 bg-black p-6 px-10 rounded'>
          <span>Insufficient Balance</span>
        </div>
      ) : null}
    </>
  );
};

export default CreditAccountDetails;
