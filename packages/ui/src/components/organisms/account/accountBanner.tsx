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
  isMobile,
  setFavorite,
  removeFavorite,
  onBack,
}: AccountBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid
        direction="col"
        gap="0"
        justify="between"
        style={{ width: '100%', maxWidth: '100%' }}
      >
        <FlexGrid
          alignItems="center"
          className={'desktop:gap-4'}
          style={{ width: '100%', maxWidth: '100%' }}
          gap="1"
          justify="start"
          mobileDirection="row"
        >
          <Icon
            onClick={onBack}
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />
          <AccountBannerHeader
            style={{ overflow: 'hidden' }}
            senderAddress={senderAddress}
            senderName={senderName}
            publicKey={publicKey}
            isMobile={isMobile}
          />
          <ValidatorBannerButtons
            className="desktop:hidden ml-auto"
            isFavorite={isFavorite}
            removeFavorite={removeFavorite}
            setFavorite={setFavorite}
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
    </BannerFrame>
  );
};
