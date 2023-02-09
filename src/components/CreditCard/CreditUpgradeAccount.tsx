import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  resetSuccess,
  upgradeDowngradeCCAccount,
} from "../../redux/features/creditSlice";
import bookMyShow from "../../images/bookmyshow-coupon.jpeg";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";

const CreditUpgradeAccount: React.FC = () => {
  const { cardType, usedBalance, success, loading } = useAppSelector(
    (state) => state.creditCard
  );
  const goldCardType: boolean = cardType === "Gold" ? true : false;
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<boolean>(false);
  useEffect(() => {
    let Timer: ReturnType<typeof setTimeout>;
    if (success.length > 0) {
      Timer = setTimeout(() => {
        dispatch(resetSuccess());
      }, 2000);
    }
    return () => {
      clearTimeout(Timer);
    };
  }, [success, dispatch]);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    let Timer: ReturnType<typeof setTimeout>;
    if (coupon) {
      Timer = setTimeout(() => {
        setCoupon(false);
      }, 2000);
    }
    return () => {
      clearTimeout(Timer);
    };
  }, [coupon]);
  return (
    <>
      <div className='container m-2 mr-4 ml-4 bg-gray-100 p-3 max-w-full md:max-w-2xl rounded-xl'>
        <h2 className='text-xl md:text-2xl fond-bold font-extrabold mb-3 text-center font-alata underline underline-offset-4'>
          {goldCardType ? "Upgrade Credit Card" : "Downgrade Credit Card"}
        </h2>
        <div className='flex max-w-full w-full text-[18px] md:text-[20px] flex-col gap-2 lg:text-start lg:flex-row p-2'>
          {goldCardType ? (
            <>
              <div className='max-w-full w-full mt-2 md:ml-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to upgrade:</span>
                </p>
                <p>
                  To upgrade to <span className='font-bold'>Platinum Card</span>
                  , please click the button
                </p>
              </div>
              <div className='max-w-full w-full mt-2 flex justify-center items-center text-l'>
                <button
                  aria-label='Upgrade Credit Card'
                  className='w-full py-2 font-alata px-4 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:pointer-events-none rounded-md text-white text-md font-bold disabled:opacity-50'
                  //   disabled={availableBalance < 10000}
                  onClick={() => {
                    dispatch(upgradeDowngradeCCAccount("upgrade"));
                  }}
                >
                  Upgrade Credit Card
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='max-w-full w-full mt-2 md:ml-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to downgrade:</span>
                </p>
                <p>To downgrade, please click the button</p>
              </div>
              <div className='max-w-full w-full mt-2 flex justify-center items-center text-l'>
                <button
                  aria-label='Downgrade Credit Card'
                  disabled={usedBalance > 50000}
                  onClick={() => {
                    dispatch(upgradeDowngradeCCAccount("downgrade"));
                  }}
                  className='w-full font-alata py-2 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:pointer-events-none rounded-md text-white text-md font-bold disabled:opacity-50'
                >
                  Downgrade Credit Card
                </button>
              </div>
            </>
          )}
        </div>
        {goldCardType ? (
          <></>
        ) : (
          <div className='mt-8 flex gap-2 text-[18px] md:text-[20px] max-w-full w-full items-center '>
            <div className='ml-2'>
              <p>Click the coupon to get the coupon code.</p>
            </div>
            <div
              onClick={async () =>
                await navigator.clipboard
                  .writeText("ORDER_150")
                  .then(() => setCoupon(true))
              }
            >
              <img
                src={bookMyShow}
                alt='bookmyshow coupon'
                className='max-w-full h-[60px] md:h-[70px] lg:h-[80px] cursor-pointer'
              />
            </div>
          </div>
        )}
      </div>
      {load && <LoadingSpinner />}
      {success.length > 0 ? <Notification msg={success} /> : null}
      {coupon ? <Notification /> : null}
    </>
  );
};

export default React.memo(CreditUpgradeAccount);
