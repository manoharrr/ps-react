import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  closeModal,
  createSBBalanceAcc,
  fetchSBBalance,
} from "../../redux/features/savingSlice";
import LoadingSpinner from "../UI/LoadingSpinner";
import HomeCreateUser from "./HomeCreateUser";
import HomeSuccess from "./HomeSuccess";

const HomeComponent: React.FC = () => {
  const { loading, error, category, modal } = useAppSelector(
    (state) => state.savingAcc
  );
  const dispatch = useAppDispatch();

  const createUser = useCallback(
    () => dispatch(createSBBalanceAcc()),
    [dispatch]
  );

  const closeModalCallBack = useCallback(
    () => dispatch(dispatch(closeModal())),
    [dispatch]
  );

  useEffect(() => {
    if (category.length === 0) dispatch(fetchSBBalance());
  }, [dispatch, category]);

  if (loading && category.length === 0) return <LoadingSpinner />;
  if (error === "No savings") return <HomeCreateUser createUser={createUser} />;
  if (category.length > 0) {
    return (
      <>
        <HomeSuccess
          category={category}
          modal={modal}
          closeModal={closeModalCallBack}
        />
      </>
    );
  }
  return (
    <h3 className='text-xl font-bold'>
      Something went wrong please try again later.
    </h3>
  );
};

export default HomeComponent;
