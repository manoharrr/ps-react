import React from "react";
const UpgradeOffer: React.FC = () => {
  return (
    <div className=' text-xl bg-gray-100 flex font-bold p-3 rounded-xl secondary md:max-w-[1440px] md:w-full w-full mx-auto md:-mt-3 md:mb-12 text-center'>
      <div className=' animate-headShake text-xl font-bold text-green-600 text-center w-full'>
        Upgrade to <span className='underline text-2xl'>Premium Account</span>{" "}
        to get extra <span className='underline text-2xl'>2%</span> interest on
        savings account
      </div>
    </div>
  );
};

export default React.memo(UpgradeOffer);
