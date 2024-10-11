import { StatusBadge, Typography } from '../../atoms';
import { Badge } from '../../atoms';
import { Currency } from '../../atoms';
import { UserAccountCard } from '../../atoms';
import { dayjs, fromNowFormatter, replaceColonWithSpace } from '../../../utils/functions';
import { Link } from '../../atoms';

interface TransactionBannerProps {
  amount?: string | number;
  symbol?: string;
  senderName?: string;
  senderAddress: string;
  senderImageUrl?: string | null;
  receiverName?: string;
  receiverAddress?: string;
  receiverImageUrl?: string | null;
  moduleCommand?: string;
  executionStatus: string; // Make executionStatus a required string
  timestamp?: number;
  badgeColor?: string;
  basePath?: string;
}

export const BannerText = ({
  amount,
  symbol,
  senderName,
  senderAddress,
  receiverName,
  receiverAddress,
  moduleCommand,
  executionStatus,
  timestamp = 1,
  badgeColor,
  basePath,
}: TransactionBannerProps) => {
  const date = dayjs(timestamp * 1000);

  const fromNowPrefix = dayjs().diff(date, 'hour') >= 1 ? 'on' : 'over';

  return (
    <div className="transitionBannerContainerWidthMobile desktop:w-transitionBannerContainerWidth max-w-full flex flex-wrap items-center gap-1.5 mt-5">
      {/* SENDER */}
      <Link basePath={basePath} href={`/account/${senderName ?? senderAddress}`}>
        <UserAccountCard
          address={senderAddress}
          addressColor="onBackground"
          addressVariant={'paragraph-md'}
          fontWeight="semibold"
          name={senderName}
          nameColor="onBackground"
          nameOnly
          nameVariant={'paragraph-md'}
          size={24}
          width="auto"
        />
      </Link>

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'sent'}
      </Typography>

      {/* RECEIVER */}
      {receiverAddress && (
        <Link basePath={basePath} href={`/account/${receiverName ?? receiverAddress}`}>
          <UserAccountCard
            address={receiverAddress}
            addressColor="onBackground"
            addressVariant={'paragraph-md'}
            fontWeight="semibold"
            name={receiverName}
            nameColor="onBackground"
            nameOnly
            size={24}
            width="auto"
          />
        </Link>
      )}

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'the amount of'}
      </Typography>

      {/* AMOUNT */}
      <Currency amount={amount ?? 0} decimals={2} fontWeight="semibold" symbol={symbol} />

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'in type'}
      </Typography>

      {/* MODULE COMMAND */}
      <Badge
        borderColor="gray-1"
        className="flex-grow-0 capitalize max-w-full truncate"
        colorVariant={badgeColor || 'green'}
        label={replaceColonWithSpace(moduleCommand ?? '')}
      />

      {/* TIMESTAMP */}
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {fromNowPrefix}
      </Typography>
      <Typography fontWeight="semibold" variant="paragraph-md">
        {fromNowFormatter(timestamp * 1000)}
      </Typography>

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'and is'}
      </Typography>

      {/* EXECUTION STATUS */}
      <StatusBadge status={executionStatus} />
    </div>
  );
};
