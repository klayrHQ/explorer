import { TransactionDetails } from '../../../../components/clientPages/transactionDetails';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <TransactionDetails params={{ id: params.id }} />
    </div>
  );
}
