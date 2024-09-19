import { FlexGrid, Icon } from '../../atoms';
import { trimFour } from '../../../utils/functions';
import { BannerText } from '../../molecules';
import { BannerCard } from '../../molecules';
import { BannerFrame } from '../../atoms';
import { Link } from 'web/src/components/link';

interface TransactionBannerProps {
  id: string;
  amount: string | number;
  symbol: string;
  senderName?: string;
  senderAddress: string;
  senderImageUrl?: string | null;
  receiverName?: string;
  receiverAddress?: string | undefined;
  receiverImageUrl?: string | null;
  moduleCommand: string;
  executionStatus?: string;
  timestamp: number;
  badgeColor?: string;
  blockHeight: number;
  blockId: string;
  image: string;
}

export const TransactionBanner = ({
  id,
  blockHeight,
  blockId,
  amount,
  symbol,
  senderName,
  senderAddress,
  senderImageUrl,
  receiverAddress,
  receiverImageUrl,
  receiverName,
  moduleCommand,
  executionStatus,
  timestamp,
  badgeColor,
  image,
}: TransactionBannerProps) => {
  return (
    <BannerFrame image={image}>
      <div className="items-start justify-start w-full flex flex-col">
        <FlexGrid alignItems="center" direction="row" gap="4" justify="start" mobileDirection="row">
          <Link href="/transactions">
            {' '}
            <Icon
              className="hover:-translate-x-0.5 cursor-pointer transition-transform"
              color="white"
              icon="ArrowLeft"
            />
          </Link>

          <h3 className="text-heading-6 desktop:text-heading-3 text-white font-bold">
            <span className="mr-2">Transaction</span>
            {trimFour(id)}
          </h3>
        </FlexGrid>
        <BannerText
          amount={amount}
          badgeColor={badgeColor}
          executionStatus={executionStatus || ''}
          moduleCommand={moduleCommand}
          receiverAddress={receiverAddress}
          receiverImageUrl={receiverImageUrl}
          receiverName={receiverName}
          senderAddress={senderAddress}
          senderImageUrl={senderImageUrl}
          senderName={senderName}
          symbol={symbol}
          timestamp={timestamp}
        />
      </div>
      <BannerCard blockHeight={blockHeight} blockId={blockId} />
    </BannerFrame>
  );
};
