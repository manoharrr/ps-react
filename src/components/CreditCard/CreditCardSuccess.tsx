import ErrorBoundary from "../ErrorBoundary";
import Modal from "../UI/Modal";
import CreditAccountDetails from "./CreditAccountDetails";
import CreditOffer from "./CreditOffer";
import CreditUpgradeAccount from "./CreditUpgradeAccount";
import CreditUpgradeOffer from "./CreditUpgradeOffer";

type Props = {
  modal: boolean;
  usedBalance: number;
  cardType: string;
  closeModal: () => void;
};

const CreditCardSuccess: React.FC<Props> = ({
  modal,
  closeModal,
  usedBalance,
  cardType,
}) => {
  return (
    <ErrorBoundary>
      <section className='container max-w-full gap-2 my-2 flex flex-col md:flex-row md:mx-2 items-center justify-center md:items-stretch text-xl md:mb-10'>
        <CreditAccountDetails />
        <CreditUpgradeAccount />
      </section>
      {usedBalance > 0 ? <CreditOffer /> : <></>}
      {cardType === "Gold" ? <CreditUpgradeOffer /> : <></>}
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
