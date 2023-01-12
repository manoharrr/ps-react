import React from "react";
const UpgradeOffer: React.FC = () => {
  return (
    <div className=' my-2 text-xl bg-gray-100 flex gap-4 font-bold p-2 md:gap-8 md:py-4 rounded secondary md:max-w-[1440px] md:w-full w-full mx-auto md:-mt-6 md:mb-12 text-center'>
      <div className=' animate-headShake text-xl font-bold text-green-600 text-center w-full'>
        Upgrade to <span className='underline text-2xl'>Premium Account</span>{" "}
        to get extra <span className='underline text-2xl'>2%</span> interest on
        savings account
      </div>
    </div>
  );
};

export default React.memo(UpgradeOffer);
