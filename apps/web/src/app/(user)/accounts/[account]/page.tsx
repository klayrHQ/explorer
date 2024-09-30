import { AccountDetails } from '../../../../components/clientPages/accountDetails.tsx';

export default function Page({ params }: { params: { account: string } }) {
  return (
    <div>
      <AccountDetails paramAccount={params.account} />
    </div>
  );
}
