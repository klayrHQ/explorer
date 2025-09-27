import { BannerFrame } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import { Link } from '../../atoms';
import { AccountBannerText } from '../../molecules/account/accountBannerText';
import { AccountBannerHeader } from '../../molecules/account/accountBannerHeader';
import { AccountBannerProps } from '../../../types/types';
import { AccountBannerButtons } from '../../molecules/account/accountBannerButton';
import { ValidatorBannerButtons } from '../../molecules';

export const AccountBanner = ({
  senderAddress,
  senderName,
  publicKey,
  transactions,
  coinRate,
  balance,
  balanceSymbol,
  image,
  basePath,
  isFavorite,
  setFavorite,
  removeFavorite,
  onBack,
}: AccountBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid direction="col" gap="0" justify="between">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Icon
            onClick={onBack}
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />
          <AccountBannerHeader
            senderAddress={senderAddress}
            senderName={senderName}
            publicKey={publicKey}
          />
        </FlexGrid>
        <div className="hidden desktop:block">
          <AccountBannerText
            coinRate={coinRate}
            transactions={transactions}
            balance={balance}
            balanceSymbol={balanceSymbol}
          />
        </div>
      </FlexGrid>
      <AccountBannerButtons
        className="hidden desktop:flex"
        isFavorite={isFavorite}
        removeFavorite={removeFavorite}
        setFavorite={setFavorite}
        validatorAddress={senderAddress || ''}
      />
      <ValidatorBannerButtons
        className="desktop:hidden absolute top-6 right-6"
        isFavorite={isFavorite}
        removeFavorite={removeFavorite}
        setFavorite={setFavorite}
      />
    </BannerFrame>
  );
};
