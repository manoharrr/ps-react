import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  addRemoveMoneyToSBAcc,
  closeModal as mainCloseModal,
} from "../../redux/features/savingSlice";
import InputModal from "../UI/InputModal";

const AccountDetails: React.FC = () => {
  const { name } = useAppSelector((state) => state.login);
  const { category, accBalance, minBalance, error } = useAppSelector(
    (state) => state.savingAcc
  );

  const [modal, setModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [addBal, setAddBal] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
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
      if (accBalance < amount) setValid(false);
    }
  };

  useEffect(() => {
    if (amount > 0) {
      dispatch(
        addRemoveMoneyToSBAcc({
          amount,
          transactionType: addBal,
        })
      );
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

  return (
    <>
      <div
        className={`container m-2 mr-4 ml-4 bg-gray-100 p-3 max-w-full md:max-w-2xl rounded-xl md:mr-12 md:ml-0`}
      >
        <h2 className='mx-2 text-2xl fond-bold font-extrabold mb-3 text-center'>
          Account Details
        </h2>
        <div className='flex max-w-full w-full flex-col gap-2 lg:text-start lg:flex-row'>
          <div className='max-w-full w-full mt-2 mx-2 lg:text-left'>
            <p className='mb-1'>
              Account name: <span className='font-bold'>{name}</span>
            </p>
            <p className='mb-1'>
              Account type:{" "}
              {category === "Regular" ? (
                <span className='font-bold'>{category}</span>
              ) : (
                <span className='font-bold text-red-500'>Premium</span>
              )}
            </p>
            <p className='mb-1'>
              Account balance:{" "}
              <span className='font-bold'>Rs. {accBalance}</span>
            </p>
            <p className='mb-1'>
              Min account balance:{" "}
              <span className='font-bold'>Rs. {minBalance}</span>
            </p>
          </div>
          <div className='max-w-full w-full mt-2 mx-2 text-l'>
            <div className='max-w-full w-full mt-2 mx-0 md:mb-2'>
              <button
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-md font-bold disabled:opacity-50'
                onClick={() => {
                  setModal(true);
                  setAddBal("add");
                }}
                aria-label='Add Funds'
              >
                Add Funds
              </button>
            </div>
            <div className='max-w-full w-full mt-2 mx-0 md:mt-4'>
              <button
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-md font-bold disabled:opacity-50'
                onClick={() => {
                  setModal(true);
                  setAddBal("remove");
                }}
                aria-label='Remove Funds'
              >
                Remove Funds
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
      {error.length > 0 && !valid ? (
        <div className='absolute text-3xl font-bold text-yellow-600 bg-black p-6 px-10 rounded'>
          <span>Insufficient Balance</span>
        </div>
      ) : null}
    </>
  );
};

export default AccountDetails;
