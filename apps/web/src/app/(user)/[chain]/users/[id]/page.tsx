import { UserDetails } from '../../../../../components/clientPages/userDetails';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <UserDetails params={{ id: params.id }} />
    </div>
  );
}
