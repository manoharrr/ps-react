import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  resetSuccess,
  upgradeDowngradeSBAccount,
} from "../../redux/features/savingSlice";

const UpgradeAccount: React.FC = () => {
  const { category, accBalance, success } = useAppSelector(
    (state) => state.savingAcc
  );
  const regularType: boolean = category === "Regular" ? true : false;
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
        <h2 className='mx-2 text-2xl fond-bold font-extrabold text-center mb-3 font-alata'>
          {regularType ? "Upgrade Account" : "Downgrade Account"}
        </h2>
        <div className='flex max-w-full w-full flex-col gap-2 lg:text-start lg:flex-row'>
          {regularType ? (
            <>
              <div className='max-w-full w-full mt-2 mx-2'>
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
              <div className='max-w-full w-full mt-2 mx-2 flex justify-center items-center text-l'>
                <button
                  className='w-full font-alata py-2 px-4 bg-blue-600 hover:bg-green-600 rounded-md text-white text-md font-bold disabled:opacity-50'
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
              <div className='max-w-full w-full mt-2 mx-2'>
                <p className='mb-2'>
                  <span className='font-bold'>Conditions to downgrade:</span>
                </p>
                <p>To downgrade, please click the button</p>
              </div>
              <div className='max-w-full w-full mt-2 mx-2 flex justify-center items-center text-l'>
                <button
                  onClick={() => {
                    dispatch(upgradeDowngradeSBAccount("downgrade"));
                  }}
                  aria-label='Downgrade Account'
                  className='w-full font-alata py-2 px-4 bg-blue-600 hover:bg-red-600 rounded-md text-white text-md font-bold disabled:opacity-50'
                >
                  Downgrade Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {success.length > 0 ? (
        <div className='absolute text-3xl font-bold text-yellow-600 bg-black p-6 px-10 rounded'>
          <span>{success}</span>
        </div>
      ) : null}
    </>
  );
};

export default UpgradeAccount;
