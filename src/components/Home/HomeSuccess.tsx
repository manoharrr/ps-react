import Modal from "../UI/Modal";
import AccountDetails from "./AccountDetails";
import UpgradeAccount from "./UpgradeAccount";
import UpgradeOffer from "./UpgradeOffer";

type Props = {
  modal: boolean;
  closeModal: () => void;
  category: string;
};

const HomeSuccess: React.FC<Props> = ({ modal, closeModal, category }) => {
  return (
    <>
      <section className='container max-w-full gap-2 my-2 flex flex-col md:flex-row md:mx-2 items-center justify-center md:items-stretch text-xl md:mb-12'>
        <AccountDetails />
        <UpgradeAccount />
      </section>
      {category === "Regular" ? <UpgradeOffer /> : <></>}
      {modal && (
        <Modal
          body='Savings Account Created Successfully'
          showModal={modal}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default HomeSuccess;
