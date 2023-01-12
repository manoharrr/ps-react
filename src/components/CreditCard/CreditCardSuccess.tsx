import ErrorBoundary from "../ErrorBoundary";
import Modal from "../UI/Modal";
import CreditAccountDetails from "./CreditAccountDetails";
import CreditUpgradeAccount from "./CreditUpgradeAccount";

type Props = {
  modal: boolean;
  closeModal: () => void;
};

const CreditCardSuccess: React.FC<Props> = ({ modal, closeModal }) => {
  return (
    <ErrorBoundary>
      <section className='container max-w-full gap-2 my-2 flex flex-col md:flex-row md:mx-2 items-center justify-center md:items-stretch text-xl md:mb-12'>
        <CreditAccountDetails />
        <CreditUpgradeAccount />
      </section>
      {modal && (
        <Modal
          body='Credit Card Account Created Successfully'
          showModal={modal}
          closeModal={closeModal}
        />
      )}
    </ErrorBoundary>
  );
};

export default CreditCardSuccess;
