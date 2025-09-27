/* eslint-disable react/jsx-no-literals */
import { BannerFrame } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import { Link } from '../../atoms';
import {
  BlockDetailsBannerText,
  BlockDetailsBannerTextProps,
} from '../../molecules/blockDetails/blockDetailsBannerText'; // Adjust the import path

interface BlockDetailsBannerProps extends BlockDetailsBannerTextProps {
  image: string;
  height: number;
  basePath?: string;
  onBack: () => void;
}

export const BlockDetailsBanner = ({
  generatorName,
  image,
  symbol,
  isFinal,
  height,
  reward,
  generatorAddress,
  numberOfTransactions,
  basePath,
  onBack,
}: BlockDetailsBannerProps) => {
  return (
    <BannerFrame image={image}>
      <div className="items-start justify-start flex flex-col">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Icon
            onClick={onBack}
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />

          <h3 className="text-heading-4 desktop:text-heading-3 text-white font-bold">
            <span className="mr-2">Block</span>
            {height}
          </h3>
        </FlexGrid>
        <BlockDetailsBannerText
          generatorAddress={generatorAddress}
          generatorName={generatorName}
          isFinal={isFinal}
          numberOfTransactions={numberOfTransactions}
          reward={reward}
          symbol={symbol}
          basePath={basePath}
        />
      </div>
    </BannerFrame>
  );
};
