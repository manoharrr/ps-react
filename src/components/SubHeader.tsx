import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import IconBankFill from "./Icons/BankIcon";
import IconCardFill from "./Icons/CreditIcon";
import IconProfile from "./Icons/ProfileIcon";

const SubHeader: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.login);
  return (
    <>
      {isLoggedIn && (
        <nav className='font-alata my-2 text-xl md:text-2xl bg-gray-200 flex gap-4 font-bold p-2 md:gap-8 md:py-4 rounded secondary md:max-w-[1440px] w-full mx-auto justify-center md:justify-start md:pl-12'>
          <NavLink to='/' className='mx-2 flex justify-center items-center'>
            <IconBankFill /> <span className='pl-1'>Home</span>
          </NavLink>
          <NavLink
            to='/creditcard'
            className='mx-2 flex justify-center items-center'
          >
            <IconCardFill />
            <span className='pl-1'>Credit Card</span>
          </NavLink>{" "}
          <NavLink
            to='/profile'
            className='mx-2 flex justify-center items-center'
          >
            <IconProfile />
            <span className='pl-1'>Profile</span>
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
