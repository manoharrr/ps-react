import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  resetSuccess,
  upgradeDowngradeSBAccount,
} from "../../redux/features/savingSlice";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";

const UpgradeAccount: React.FC = () => {
  const { category, accBalance, success, loading } = useAppSelector(
    (state) => state.savingAcc
  );
  const regularType: boolean = category === "Regular" ? true : false;
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState<boolean>(false);

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

  return (
    <>
      <div className='container m-2 mr-4 ml-4 bg-gray-100 p-3 max-w-full md:max-w-2xl rounded-xl'>
        <h2 className='mx-2 text-xl md:text-2xl fond-bold font-extrabold text-center mb-3 font-alata underline underline-offset-4'>
          {regularType ? "Upgrade Account" : "Downgrade Account"}
        </h2>
        <div className='flex max-w-full text-[18px] md:text-[20px] w-full flex-col gap-2 lg:text-start lg:flex-row p-2'>
          {regularType ? (
            <>
              <div className='max-w-full w-full mt-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to upgrade:</span>
                </p>
                <p>
                  To upgrade to{" "}
                  <span className='font-bold'>Premium Account </span>please
                  maintain the minimum account balance of
                  <span className='font-bold'> Rs.10000</span>
                </p>
              </div>
              <div className='max-w-full w-full mt-2 flex justify-center items-center text-l'>
                <button
                  className='w-full font-alata py-2 px-4 bg-green-600 hover:bg-green-700 disabled:pointer-events-none active:bg-green-800 rounded-md text-white text-md font-bold disabled:opacity-50'
                  disabled={accBalance < 10000}
                  onClick={() => {
                    dispatch(upgradeDowngradeSBAccount("upgrade"));
                  }}
                  aria-label='Upgrade Account'
                >
                  Upgrade Account
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='max-w-full w-full mt-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to downgrade:</span>
                </p>
                <p>To downgrade, please click the button</p>
              </div>
              <div className='max-w-full w-full mt-2 flex justify-center items-center text-l'>
                <button
                  onClick={() => {
                    dispatch(upgradeDowngradeSBAccount("downgrade"));
                  }}
                  aria-label='Downgrade Account'
                  className='w-full font-alata py-2 px-4 bg-red-600 hover:bg-red-700 disabled:pointer-events-none active:bg-red-800 rounded-md text-white text-md font-bold disabled:opacity-50'
                >
                  Downgrade Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {load && <LoadingSpinner />}
      {success.length > 0 ? <Notification msg={success} /> : null}
    </>
  );
};

export default UpgradeAccount;
