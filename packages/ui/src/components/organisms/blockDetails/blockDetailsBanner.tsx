import { BannerFrame } from '../../atoms';
import { ValidatorBannerText } from '../../molecules/validator/validatorBannerText';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import {
  BlockDetailsBannerText,
  BlockDetailsBannerTextProps,
} from '../../molecules/blockDetails/blockDetailsBannerText'; // Adjust the import path

interface BlockDetailsBannerProps extends BlockDetailsBannerTextProps {
  image: string;
  block: string | number;
}

export const BlockDetailsBanner = ({
  senderName,
  image,
  amount,
  symbol,
  senderAddress,
  senderImageUrl,
  executionStatus,
  transactions,
  block,
}: BlockDetailsBannerProps) => {
  return (
    <BannerFrame image={image}>
      <div className="items-start justify-start flex flex-col">
        <FlexGrid alignItems="center" gap="4" justify="start">
          <Icon
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />
          <h3 className="text-heading-4 desktop:text-heading-3 ml-2 text-white font-bold">
            <span className="mr-2">Block</span>
            {block}
          </h3>
        </FlexGrid>
        <BlockDetailsBannerText
          amount={amount}
          executionStatus={executionStatus}
          senderAddress={senderAddress}
          senderImageUrl={senderImageUrl}
          senderName={senderName}
          symbol={symbol}
          transactions={transactions}
        />
      </div>
    </BannerFrame>
  );
};
