import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
  closeSuccessModal,
  createUserAccount,
} from "../redux/features/createUserSlice";
import CustomInput from "./CustomInput";
import LoadingSpinner from "./UI/LoadingSpinner";
import Modal from "./UI/Modal";
type Inputs = {
  name: string;
  email: string;
  phone: number;
  city: string;
  occupation: string;
  income: number;
  pan: string;
  password: string;
};

const SignUpComponent: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const { loading, error, success } = useAppSelector(
    (state) => state.createUser
  );
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(createUserAccount(data));
  };

  useEffect(() => {
    if (success === "Success") setModal(true);
  }, [success]);

  const closeModal = () => {
    setModal(false);
    dispatch(closeSuccessModal());
    navigate("/login", { replace: true });
  };

  if (loading) return <LoadingSpinner />;
  if (error.length > 0)
    return (
      <div>
        {error === "User exists already.:"
          ? "User exists already."
          : "Something went wrong.Please try again later."}
      </div>
    );
  return (
    <>
      <div className='h-full mb-8 mx-auto bg-gray-100 flex flex-col justify-start md:h-full md:max-w-xl'>
        <div className='max-w-md w-full mx-auto text-center mt-4 text-2xl px-2 font-bold md:pt-2'>
          Sign Up
        </div>
        <div className='max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <CustomInput
                id={"name"}
                label={"name"}
                type='text'
                className={`${errors.name && "border-red-500"}`}
                {...register("name", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors.name && (
                <span className='text-red-500'>Name is a required field</span>
              )}
            </>
            <>
              <CustomInput
                id={"email"}
                label={"email"}
                type='text'
                className={`${errors.email && "border-red-500"}`}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
              )}
            </>
            <>
              <CustomInput
                id={"phone"}
                label={"phone number"}
                type='number'
                className={`${errors.phone && "border-red-500"}`}
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter valid 10 digit number",
                  },
                })}
              />
              {errors.phone && (
                <span className='text-red-500'>{errors.phone.message}</span>
              )}
            </>
            <>
              <CustomInput
                id={"city"}
                label={"city"}
                type='text'
                className={`${errors.city && "border-red-500"}`}
                {...register("city", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors.city && (
                <span className='text-red-500'>City is a required field</span>
              )}
            </>
            <>
              <CustomInput
                id={"occupation"}
                label={"occupation"}
                type='text'
                className={`${errors.occupation && "border-red-500"}`}
                {...register("occupation", {
                  required: true,
                  minLength: 2,
                })}
              />
              {errors.occupation && (
                <span className='text-red-500'>
                  Occupation is a required field
                </span>
              )}
            </>
            <>
              <CustomInput
                id={"income"}
                label={"income"}
                type='number'
                className={`${errors.income && "border-red-500"}`}
                {...register("income", {
                  required: true,
                  min: {
                    value: 1000,
                    message: "Income should be atleast 1000",
                  },
                  max: 10000000,
                })}
              />
              {errors.income && (
                <span className='text-red-500'>
                  Income is a required field. {errors.income.message}
                </span>
              )}
            </>
            <>
              <CustomInput
                id={"pan"}
                label={"PAN number"}
                type='text'
                className={`${errors.email && "border-red-500"}`}
                {...register("pan", {
                  required: true,
                  pattern: {
                    value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                    message: "Please enter valid pan",
                  },
                })}
              />
              {errors.pan && (
                <span className='text-red-500'>PAN is a required field</span>
              )}
            </>
            <>
              <CustomInput
                id={"password"}
                label={"password"}
                type='password'
                className={`${errors.email && "border-red-500"}`}
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    message:
                      "Minimum eight characters or longer, at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character and at least one special character (?=.*[!@#$%^&*])",
                  },
                })}
              />
              {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
              )}
            </>
            <div className='mt-8'>
              <button
                aria-label='Submit'
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-bold'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {modal && (
        <Modal
          body='Signed up Successfully. Please login to create account.'
          showModal={modal}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default SignUpComponent;
