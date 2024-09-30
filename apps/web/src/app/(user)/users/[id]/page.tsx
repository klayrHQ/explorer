import { AccountDetails } from '../../../../components/clientPages/accountDetails.tsx';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <AccountDetails paramAccount={params.id} />
    </div>
  );
}
