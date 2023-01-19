import React, { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  fetchSBTransactions,
  CommonFields,
} from "../../redux/features/transactionSlice";
import Chart from "../UI/Charts";
import LoadingSpinner from "../UI/LoadingSpinner";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";

interface Props {
  type: string;
}
const ShowSBTransactions: React.FC<Props> = ({ type }) => {
  const { loading, showTransactions } = useAppSelector(
    (state) => state.transaction
  );
  const { accBalance } = useAppSelector((state) => state.savingAcc);
  const { usedBalance } = useAppSelector((state) => state.creditCard);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionPerPage] = useState<number>(8);
  const indexOfLastTransaction = currentPage * transactionPerPage;
  const indexOfFirstPost = indexOfLastTransaction - transactionPerPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchSBTransactions());
  }, [accBalance, dispatch, usedBalance]);

  let data: ReactNode;

  let typedTransaction: any = [];
  if (loading) return <LoadingSpinner />;
  if (showTransactions.length > 0) {
    typedTransaction = showTransactions.filter(
      (transaction?: CommonFields) => transaction?.accountType === type
    );
    if (typedTransaction.length > 0) {
      const currentPageTransaction = typedTransaction.slice(
        indexOfFirstPost,
        indexOfLastTransaction
      );
      data = currentPageTransaction.map((transaction?: CommonFields) => {
        return (
          <tr
            key={transaction?._id}
            className={`${
              transaction?.transactionType === "debit"
                ? " text-red-800"
                : "text-green-800"
            } text-l md:text-xl bg-grey-100`}
          >
            <td className={`border-b border-slate-100 uppercase p-4 pl-8`}>
              {transaction?.transactionType}
            </td>
            <td className='border-b border-slate-100 p-4 hidden md:block'>
              {transaction?.accountType === "savings_account"
                ? "Savings Account"
                : "Credit Card"}
            </td>
            <td className='border-b border-slate-100 p-4 pr-8'>
              Rs.{transaction?.amount}
            </td>
            <td className='border-b border-slate-100 p-4 pr-8'>
              {new Date(Number(transaction?.createdAt)).toDateString()}
            </td>
          </tr>
        );
      });
    }
  }

  return (
    <>
      {typedTransaction?.length > 0 ? (
        <>
          <Chart typedTransaction={typedTransaction} />
          <Pagination
            transactionPerPage={transactionPerPage}
            totalPosts={typedTransaction.length}
            paginate={paginate}
            currentPage={currentPage}
            indexOfLastTransaction={indexOfLastTransaction}
            indexOfFirstPost={indexOfFirstPost}
          />
        </>
      ) : (
        <></>
      )}
      <TableHeader data={data} />
    </>
  );
};

export default React.memo(ShowSBTransactions);
