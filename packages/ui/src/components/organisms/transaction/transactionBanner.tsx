/** @jsxImportSource @emotion/react */

import { FlexGrid, Icon } from "../../atoms";
import { trimFour } from "../../../utils/functions";

import { BannerText } from "../../molecules/transaction/bannerText";
import { BannerCard } from "../../molecules/transaction/bannerCard";
import { css } from "@emotion/react";

interface TransactionBannerProps {
  id: string;
  amount: string | number;
  symbol: string;
  senderName?: string | null;
  senderAddress: string;
  senderImageUrl?: string | null;
  receiverName?: string | null;
  receiverAddress?: string | undefined; 
  receiverImageUrl?: string | null;
  moduleCommand: string;
  executionStatus?: string;
  timestamp: number;
  badgeColor?: string;
  blockHeight: number;
  blockId: string;
  image: string
}

export const TransactionBanner = ({ id, blockHeight, blockId, amount, symbol, senderName, senderAddress, senderImageUrl, receiverAddress, receiverImageUrl, receiverName, moduleCommand, executionStatus, timestamp, badgeColor, image  }: TransactionBannerProps) => {
  return (
    <div
      className="bg-azule bg-no-repeat bg-right h-auto w-transitionBannerWidthMobile desktop:w-transitionBannerWidth rounded-xl relative "
      css={css`
      background-image: url(${image});
      background-position: right -105px top -45px;
      background-size: 80%;
       @media (min-width: 1024px) {
        background-position: right -50px top 35%;
        background-size: 50%;
    `}
    >
      <div className="flex items-start justify-between p-6 desktop:flex-row flex-col gap-5">
        <div className="items-start justify-start flex flex-col">
          <FlexGrid alignItems="center" gap="4" justify="start">
            <Icon color="white" icon="ArrowRight" />
            <h3 className="text-heading-6 desktop:text-heading-3 ml-2 text-white font-bold">
              <span className="mr-3">Transaction</span>
              {trimFour(id)}
            </h3>
          </FlexGrid>
          <BannerText
            timestamp={timestamp}
            amount={amount}
            moduleCommand={moduleCommand}
            receiverAddress={receiverAddress}
            receiverImageUrl={receiverImageUrl}
            receiverName={receiverName}
            senderAddress={senderAddress}
            senderImageUrl={senderImageUrl}
            senderName={senderName}
            badgeColor={badgeColor}
            symbol={symbol}
            executionStatus={executionStatus}
          />
        </div>
        <BannerCard
          blockHeight={blockHeight}
          blockId={blockId}
        />
      </div>
    </div>
  );
};