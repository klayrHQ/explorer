import { TransactionDetails } from "../../../../../components/clientPages/transactionDetails.tsx";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <TransactionDetails params={{ id: params.id }} />
    </div>
  );
}