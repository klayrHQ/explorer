/** @jsxImportSource @emotion/react */

import { FlexGrid, Icon } from "../../atoms";
import { trimFour } from "../../../utils/functions";

import { BannerText } from "../../molecules/transaction/bannerText";
import { BannerCard } from "../../molecules/transaction/bannerCard";
import { css } from "@emotion/react";
import { BannerFrame } from "../../atoms/banner/bannerFrame";

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
    <BannerFrame image={image}>
          <div className="items-start justify-start flex flex-col">
          <FlexGrid alignItems="center" gap="4" justify="start">
            <Icon color="white" icon="ArrowRight" className="hover:-translate-x-0.5 cursor-pointer transition-transform"/>
  
            <h3 className="text-heading-6 desktop:text-heading-3 ml-2 text-white font-bold">
              <span className="mr-3">Transaction</span>
              {trimFour(id)}
            </h3>
          </FlexGrid>
          <BannerText
            amount={amount}
            badgeColor={badgeColor}
            executionStatus={executionStatus}
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
        <BannerCard
          blockHeight={blockHeight}
          blockId={blockId}
        />
       </BannerFrame>
  
  );
};
