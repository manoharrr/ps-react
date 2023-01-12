import { useAppSelector } from "../redux/app/hooks";

const Profile: React.FC = () => {
  const { name, email, pan, phone, city, occupation, income } = useAppSelector(
    (state) => state.login
  );
  return (
    <>
      {" "}
      <section className='container max-w-full gap-2 my-2 text-xl md:mb-12'>
        <div className='container bg-gray-100 p-3 max-w-[700px] mx-auto w-full rounded-xl'>
          <h2 className='mx-2 text-2xl fond-bold font-extrabold mb-3 text-center'>
            Profile Details
          </h2>
          <div className='flex max-w-full w-full flex-col gap-2 lg:text-start lg:flex-row  md:ml-4 lg:ml-8 mb-4'>
            <div className='max-w-full w-full mt-2 mx-2 lg:text-left'>
              <p className='mb-2'>
                Name: <span className='font-bold'>{name}</span>
              </p>
              <p className='mb-2'>
                Email: <span className='font-bold'>{email}</span>
              </p>
              <p className='mb-2'>
                PAN: <span className='font-bold'>{pan}</span>
              </p>
              <p className='mb-2'>
                Phone Number: <span className='font-bold'>{phone}</span>
              </p>
              <p className='mb-2'>
                City: <span className='font-bold'>{city}</span>
              </p>
              <p className='mb-2'>
                Occupation: <span className='font-bold'>{occupation}</span>
              </p>
              <p className='mb-2'>
                Income: <span className='font-bold'>Rs.{income}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
