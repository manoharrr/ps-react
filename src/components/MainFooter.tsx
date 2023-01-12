import React from "react";
import { Link } from "react-router-dom";
import facebook from "../images/icon-facebook.svg";
import instagram from "../images/icon-instagram.svg";
import pinterest from "../images/icon-pinterest.svg";
import twitter from "../images/icon-twitter.svg";

const MainFooter: React.FunctionComponent = () => {
  return (
    <footer className='bg-black'>
      <div className='container max-w-full mx-auto py-4 px-14 text-white'>
        <div className='flex flex-col items-center mb-8 gap-10 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start'>
          <div className='flex flex-col items-center space-y-8 md:items-start md:space-y-4'>
            <div className='h-8 uppercase font-bold'>Popular products</div>
            <div className='flex flex-col items-center space-y-4 font-bold md:flex-row md:space-y-0 md:space-x-6'>
              <div className='group'>
                <Link
                  to='/'
                  className='group-hover:border-b group-hover:border-cyan-200'
                >
                  Savings Account
                </Link>
              </div>
              <div className='group'>
                <Link
                  to='/'
                  className='group-hover:border-b group-hover:border-cyan-200'
                >
                  Credit Card
                </Link>
              </div>
              <div className='group'>
                <Link
                  to='/'
                  className='group-hover:border-b group-hover:border-cyan-200'
                >
                  Personal Loan
                </Link>
              </div>
              <div className='group'>
                <Link
                  to='/'
                  className='group-hover:border-b group-hover:border-cyan-200'
                >
                  Fixed Deposit
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between space-y-4 text-gray-5 md:items-start'>
            <div className='flex items-center justify-center mx-auto space-x-4 md:justify-end md:mx-0'>
              <div className='group'>
                <Link to='/'>
                  <img src={facebook} alt='facebook icon' className='h-6' />
                </Link>
              </div>
              <div className='group'>
                <Link to='/'>
                  <img src={instagram} alt='facebook icon' className='h-6' />
                </Link>
              </div>
              <div className='group'>
                <Link to='/'>
                  <img src={pinterest} alt='facebook icon' className='h-6' />
                </Link>
              </div>
              <div className='group'>
                <Link to='/'>
                  <img src={twitter} alt='facebook icon' className='h-6' />
                </Link>
              </div>
            </div>
            <div className='font-bold'>&copy; PS Bank 2023 </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
