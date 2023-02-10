type Props = {
  data?: React.ReactNode;
};

const defaultData = (
  <tr>
    <td
      colSpan={4}
      className='border-b text-xl border-slate-100 p-4 text-slate-700text-center'
    >
      No data found
    </td>
  </tr>
);
const TableHeader: React.FC<Props> = ({ data = defaultData }) => {
  return (
    <div className='container max-w-full md:max-w-[1440px] md:mx-auto max-h-[500px] rounded-xl rounded-t-none border border-t-white overflow-auto bg-gray-100 mb-8 md:max-h-[650px]'>
      <div className='shadow-sm my-4 mx-2'>
        <table className='border-collapse table-auto w-full text-l text-center'>
          <thead>
            <tr>
              <th className='border-b font-bold text-l md:text-xl p-4 pl-8 pt-0 pb-3 text-black '>
                Transaction
              </th>
              <th className='border-b font-bold text-l md:text-xl p-4 pt-0 pb-3 text-black hidden md:block'>
                Account
              </th>
              <th className='border-b font-bold text-l md:text-xl p-4 pr-8 pt-0 pb-3 text-black'>
                Amount
              </th>
              <th className='border-b font-bold text-l md:text-xl p-4 pr-8 pt-0 pb-3 text-black'>
                Transaction Date
              </th>
            </tr>
          </thead>
          <tbody className='bg-white'>{data}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TableHeader;
