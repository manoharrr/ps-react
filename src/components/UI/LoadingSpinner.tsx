const LoadingSpinner: React.FC = () => {
  return (
    <div
      role='alert'
      aria-live='polite'
      aria-busy='true'
      className='spinner-container'
    >
      <div className='loading-spinner'></div>
    </div>
  );
};

export default LoadingSpinner;
