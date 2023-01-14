import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";

const SubHeader: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.login);
  return (
    <>
      {isLoggedIn && (
        <nav className='font-alata my-2 text-xl md:text-2xl bg-gray-200 flex gap-4 font-bold p-2 md:gap-8 md:py-4 rounded secondary md:max-w-[1440px] w-full mx-auto justify-center md:justify-start md:pl-12'>
          <NavLink to='/' className='mx-2'>
            Home
          </NavLink>
          <NavLink to='/profile' className='mx-2'>
            Profile
          </NavLink>
          <NavLink to='/creditcard' className='mx-2'>
            Credit Card
          </NavLink>
        </nav>
      )}
      {!isLoggedIn && (
        <>
          <br />
        </>
      )}
    </>
  );
};

export default SubHeader;
