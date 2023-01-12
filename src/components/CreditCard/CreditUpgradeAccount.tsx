import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  resetSuccess,
  upgradeDowngradeCCAccount,
} from "../../redux/features/creditSlice";
import bookMyShow from "../../images/bookmyshow-coupon.jpeg";

const CreditUpgradeAccount: React.FC = () => {
  const { cardType, usedBalance, success } = useAppSelector(
    (state) => state.creditCard
  );
  const goldCardType: boolean = cardType === "Gold" ? true : false;
  const dispatch = useAppDispatch();

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

  return (
    <>
      <div className='container m-2 mr-4 ml-4 bg-gray-100 p-3 max-w-full md:max-w-2xl rounded-xl'>
        <h2 className='mx-2 text-2xl fond-bold font-extrabold mb-3 text-center font-alata'>
          {goldCardType ? "Upgrade Credit Card" : "Downgrade Credit Card"}
        </h2>
        <div className='flex max-w-full w-full flex-col gap-2 lg:text-start lg:flex-row '>
          {goldCardType ? (
            <>
              <div className='max-w-full w-full mt-2 mx-2 ml-8 md:ml-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to upgrade:</span>
                </p>
                <p>
                  To upgrade to <span className='font-bold'>Platinum Card</span>
                  , please click the button
                </p>
              </div>
              <div className='max-w-full w-full mt-2 mx-2 flex justify-center items-center text-l'>
                <button
                  aria-label='Upgrade Credit Card'
                  className='w-full py-2 font-alata px-4 bg-blue-600 hover:bg-green-600 rounded-md text-white text-md font-bold disabled:opacity-50'
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
              <div className='max-w-full w-full mt-2 mx-2 ml-8 md:ml-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to downgrade:</span>
                </p>
                <p>To downgrade, please click the button</p>
              </div>
              <div className='max-w-full w-full mt-2 mx-2 flex justify-center items-center text-l'>
                <button
                  aria-label='Downgrade Credit Card'
                  disabled={usedBalance > 50000}
                  onClick={() => {
                    dispatch(upgradeDowngradeCCAccount("downgrade"));
                  }}
                  className='w-full font-alata py-2 px-4 bg-blue-600 hover:bg-red-600 rounded-md text-white text-md font-bold disabled:opacity-50'
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
          <div className='mt-8 flex gap-2 max-w-full w-full items-center '>
            <div className='ml-2'>
              <p>Click the coupon to get the coupon code.</p>
            </div>
            <div className=''>
              <img
                src={bookMyShow}
                alt='bookmyshow coupon'
                className='max-w-full h-[60px] md:h-[70px] lg:h-[80px] cursor-pointer'
              />
            </div>
          </div>
        )}
      </div>
      {success.length > 0 ? (
        <div className='absolute font-alata text-3xl font-bold bg-green-400 text-black p-6 px-10 rounded animate-heartBeat'>
          <span>{success}</span>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(CreditUpgradeAccount);
