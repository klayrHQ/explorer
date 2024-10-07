import { ChainDetails } from '../../../../../components/clientPages/chainDetails';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <ChainDetails params={{ id: params.id }} />
    </div>
  );
}
