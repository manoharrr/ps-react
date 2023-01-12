import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { fetchToken } from "../redux/features/loginSlice";
import LoadingSpinner from "./UI/LoadingSpinner";

type Inputs = {
  email: string;
  password: string;
};
const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });
  const { loading, error, name } = useAppSelector((state) => state.login);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    dispatch(fetchToken({ email, password }));
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }, []);

  useEffect(() => {
    if (name.length > 3) {
      navigate("/", { replace: true });
    }
  }, [navigate, name]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='h-96 mx-auto bg-gray-100 flex flex-col justify-start md:h-full md:py-10 md:max-w-xl'>
      <div className='max-w-md w-full mx-auto text-center mt-4 text-2xl font-extrabold px-2 md:pt-16'>
        Login
      </div>
      <div className='max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='text-lg font-bold text-gray-600 block'>
              Email
              <input
                type='text'
                className='w-full p-2 border border-gray-300 rounded mt-1 text-md font-normal'
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "Please enter valid email",
                  },
                })}
              />
            </label>
            {errors.email && (
              <span className='text-red-500'>Email is a required field</span>
            )}
          </div>
          <div className='mt-4'>
            <label className='text-lg font-bold text-gray-600 block'>
              Password
              <input
                type='password'
                className='w-full p-2 border border-gray-300 rounded mt-1 text-md font-normal'
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
            </label>
            {errors.password && (
              <span className='text-red-500'>Password is a required field</span>
            )}
          </div>
          {error.length > 0 ? (
            <span className='text-red-500'>
              Invalid credentials. Please try again
            </span>
          ) : (
            <></>
          )}
          <div className='mt-8'>
            <button
              aria-label='submit'
              className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-bold'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
