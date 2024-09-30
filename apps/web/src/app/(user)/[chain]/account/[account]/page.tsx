import { AccountDetails } from '../../../../../components/clientPages/accountDetails';

export default function Page({ params }: { params: { account: string } }) {
  return (
    <div>
      <AccountDetails params={{ id: params.account }} />
    </div>
  );
}
