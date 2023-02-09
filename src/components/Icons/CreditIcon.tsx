import React from "react";

const IconCardFill: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      height='1em'
      width='1em'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M22 10v10a1 1 0 01-1 1H3a1 1 0 01-1-1V10h20zm0-2H2V4a1 1 0 011-1h18a1 1 0 011 1v4zm-7 8v2h4v-2h-4z' />
    </svg>
  );
};

export default IconCardFill;
