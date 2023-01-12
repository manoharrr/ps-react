import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { persistor } from "../redux/app/store";
import { logout } from "../redux/features/loginSlice";

const MainHeader: React.FC = () => {
  const [hamburgerIcon, setHamburgerIcon] = useState<boolean>(false);
  const { width } = useWindowSize();
  const { isLoggedIn, name } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hamburgerIcon && width > 799) {
      setHamburgerIcon((prev) => !prev);
    }
  }, [width, hamburgerIcon]);
  return (
    <header>
      <section>
        <div className='container max-w-full mx-auto px-14 py-8 bg-black text-white relative border-b-2'>
          <nav className='flex items-center justify-between font-bold'>
            <Link to='/' className='text-3xl'>
              PS Bank
            </Link>
            <div className='hidden text-xl h-10 font-alata md:flex md:space-x-8'>
              {!isLoggedIn && (
                <>
                  <div className='group'>
                    <Link
                      to='/login'
                      className='group-hover:border-b group-hover:border-cyan-200'
                      onClick={() => persistor.purge()}
                    >
                      Login
                    </Link>
                  </div>
                  <div className='group'>
                    <Link
                      to='/signup'
                      className='group-hover:border-b group-hover:border-cyan-200'
                      onClick={() => persistor.purge()}
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
              {isLoggedIn && (
                <>
                  <div className='group'>
                    <Link
                      to='/profile'
                      className='group-hover:border-b group-hover:border-cyan-200 capitalize'
                    >
                      Hi {name}
                    </Link>
                  </div>
                  <div className='group'>
                    <Link
                      to='/login'
                      className='group-hover:border-b group-hover:border-cyan-200'
                      onClick={() => {
                        persistor.purge();
                        dispatch(logout());
                      }}
                    >
                      Log Out
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className='md:hidden'>
              <button
                type='button'
                aria-label='menu'
                aria-expanded={hamburgerIcon}
                className={`${
                  hamburgerIcon ? "open" : ""
                } z40 block hamburger md:hidden focus:outline-none`}
                onClick={() => setHamburgerIcon((prev) => !prev)}
              >
                <span className='hamburger-top'></span>
                <span className='hamburger-middle'></span>
                <span className='hamburger-bottom'></span>
              </button>
            </div>
          </nav>
          <menu>
            <div
              className={`absolute top-16 bottom-0 left-0 ${
                hamburgerIcon ? "flex" : "hidden"
              } flex-col items-center w-full min-h-screen py-1 pt-40 space-y-3 text-lg text-white uppercase bg-black`}
            >
              {!isLoggedIn && (
                <>
                  <Link
                    to='/login'
                    className='hover:text-cyan-500'
                    onClick={() => {
                      persistor.purge();
                      setHamburgerIcon((prev) => !prev);
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to='/signup'
                    className='hover:text-cyan-500'
                    onClick={() => {
                      persistor.purge();
                      setHamburgerIcon((prev) => !prev);
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link
                    to='/profile'
                    className='hover:text-cyan-500'
                    onClick={() => {
                      setHamburgerIcon((prev) => !prev);
                    }}
                  >
                    {isLoggedIn}
                  </Link>
                  <Link
                    to='/login'
                    className='hover:text-cyan-500'
                    onClick={() => {
                      setHamburgerIcon((prev) => !prev);
                      persistor.purge();
                      dispatch(logout());
                    }}
                  >
                    Log Out
                  </Link>
                </>
              )}
            </div>
          </menu>
        </div>
      </section>
    </header>
  );
};

export default MainHeader;
