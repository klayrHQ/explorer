import { UserDetails } from '../../../../components/clientPages/userDetails';

export default function Page({ params }: { params: { account: string } }) {
  return (
    <div>
      <UserDetails params={{ id: params.account }} />
    </div>
  );
}
