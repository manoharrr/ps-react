import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
export type Props = {
  children?: React.ReactNode;
};

const RequireAuth: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAppSelector((state) => state.login);
  if (!isLoggedIn) return <Navigate to='/login' />;
  return <>{children}</>;
};

export default RequireAuth;
