import React from "react";
const CreditOffer: React.FC = () => {
  const dateVal: any = new Date();
  dateVal.setDate(dateVal.getDate() + 45);
  let newDate = dateVal.toDateString();
  return (
    <div className=' my-2 text-xl bg-gray-100 flex gap-4 font-bold p-2 md:gap-8 md:py-4 rounded secondary md:max-w-[1440px] md:w-full w-full mx-auto md:mb-10 text-center'>
      <div className='text-center w-full'>
        Next credit card payment is due on{" "}
        <span className='text-lg text-red-600'>{newDate}</span>
      </div>
    </div>
  );
};

export default React.memo(CreditOffer);
