import { useTimeTrackContext } from "../../context/TimeTrackerContext";

const InvoiceTable = () => {
  const { invoices } = useTimeTrackContext();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={4}>Invoices</th>
          </tr>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Due date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((voice: any) => (
            <tr key={voice.id}>
              <td>{voice.customer_name}</td>
              <td>{voice.status}</td>
              <td>{voice.due_date}</td>
              <td>
                <i>{voice.amount}</i> SEK
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
