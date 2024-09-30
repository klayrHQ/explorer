import { AccountDetails } from '../../../../components/clientPages/accountDetails';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <AccountDetails params={{ id: params.id }} />
    </div>
  );
}
