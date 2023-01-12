import Profile from "../components/Profile";
import { TitleChange } from "../utils/titleChange";

const Dashboard: React.FunctionComponent = () => {
  TitleChange("Profile");
  return (
    <>
      <Profile />
    </>
  );
};
export default Dashboard;
