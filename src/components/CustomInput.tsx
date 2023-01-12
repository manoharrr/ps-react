import React, { forwardRef } from "react";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email" | "password" | "number";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
};

const CustomInput: React.FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className='mt-2 md:mt-4' aria-live='polite'>
        <label
          htmlFor=''
          className='text-md font-bold text-gray-600 block capitalize'
        >
          {label} <span className='text-red-500'>*</span>
          <input
            id={id}
            ref={ref}
            name={name}
            type={type}
            aria-label={label}
            className={`w-full p-2 border border-gray-300 rounded mt-1 text-md font-normal ${className}`}
            {...props}
          />
        </label>
      </div>
    );
  }
);

export default CustomInput;
