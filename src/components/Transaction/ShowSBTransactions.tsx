import React, { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { fetchSBTransactions } from "../../redux/features/transactionSlice";
import LoadingSpinner from "../UI/LoadingSpinner";

interface Props {
  type: string;
}
const ShowSBTransactions: React.FC<Props> = ({ type }) => {
  const { loading, showTransactions } = useAppSelector(
    (state) => state.transaction
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSBTransactions());
  }, [dispatch]);

  let data: ReactNode = (
    <tr>
      <td
        colSpan={4}
        className='border-b text-xl border-slate-100 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-400 text-center'
      >
        No data found
      </td>
    </tr>
  );

  if (loading) return <LoadingSpinner />;
  if (showTransactions.length > 0) {
    const typedTransaction = showTransactions.filter(
      (transaction) => transaction?.accountType === type
    );
    if (typedTransaction.length > 0)
      data = typedTransaction.map((transaction, i) => {
        return (
          <tr
            key={i}
            className={`${
              transaction?.transactionType === "debit"
                ? " text-red-800"
                : "text-green-800"
            } text-xl bg-grey-100`}
          >
            <td
              className={`border-b border-slate-100 dark:border-slate-700 uppercase p-4 pl-8  dark:text-slate-400`}
            >
              {transaction?.transactionType}
            </td>
            <td className='border-b border-slate-100 dark:border-slate-700 p-4'>
              {transaction?.accountType === "savings_account"
                ? "Savings Account"
                : "Credit Card"}
            </td>
            <td className='border-b border-slate-100 dark:border-slate-700 p-4 pr-8'>
              Rs.{transaction?.amount}
            </td>
            <td className='border-b border-slate-100 dark:border-slate-700 p-4 pr-8'>
              {new Date(Number(transaction?.createdAt)).toDateString()}
            </td>
          </tr>
        );
      });
  }
  return (
    <>
      <div className='container max-w-full md:max-w-[1440px] md:mx-auto max-h-[500px] relative rounded-xl overflow-auto bg-gray-100 mt-4 mb-8 md:max-h-[650px]'>
        <div className='shadow-sm overflow-hidden my-4 mx-2'>
          <table className='border-collapse table-auto w-full text-l text-center'>
            <thead>
              <tr>
                <th className='border-b dark:border-slate-600 font-bold text-xl p-4 pl-8 pt-0 pb-3 text-black dark:text-slate-200'>
                  Transaction
                </th>
                <th className='border-b dark:border-slate-600 font-bold text-xl p-4 pt-0 pb-3 text-black dark:text-slate-200'>
                  Account
                </th>
                <th className='border-b dark:border-slate-600 font-bold text-xl p-4 pr-8 pt-0 pb-3 text-black dark:text-slate-200'>
                  Amount
                </th>
                <th className='border-b dark:border-slate-600 font-bold text-xl p-4 pr-8 pt-0 pb-3 text-black dark:text-slate-200'>
                  Transaction Date
                </th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-slate-800'>{data}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default React.memo(ShowSBTransactions);
