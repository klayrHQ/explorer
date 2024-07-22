import { BlockDetails } from '../../../../components/clientPages/blockDetails';
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <BlockDetails params={{ id: params.id }} />
    </div>
  );
}
