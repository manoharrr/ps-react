interface Prop {
  msg?: string;
}

const Notification: React.FC<Prop> = ({
  msg = "Coupon code copied to clipboard",
}) => {
  return (
    <div
      role='alert'
      aria-live='polite'
      className='absolute font-alata text-xl md:text-3xl font-bold bg-green-500 text-black p-6 px-10 rounded animate-heartBeat'
    >
      <span>{msg}</span>
    </div>
  );
};

export default Notification;
