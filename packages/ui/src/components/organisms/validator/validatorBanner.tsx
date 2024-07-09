import { BannerFrame } from "../../atoms";
import { ValidatorBannerText, ValidatorBannerTextProps  } from "../../molecules/validator/validatorBannerText";
import { ValidatorBannerHeader, ValidatorBannerHeaderProps  } from "../../molecules/validator/validatorBannerHeader";
import { ValidatorBannerCard, ValidatorBannerCardProps } from "../../molecules/validator/validatorBannerCard";
import { FlexGrid } from "../../atoms";
import { Icon } from "../../atoms";


interface ValidatorBannerProps extends ValidatorBannerTextProps, ValidatorBannerHeaderProps {
  image: string;
  senderName: string;
}

export const ValidatorBanner = ({
    senderAddress,
  senderName,
  image,
  stakes,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  capacitySymbol,
    online,
    notificationValue,
    imageUrl,
    name,

  
  ...props
}: ValidatorBannerProps) => {
  return (
    <BannerFrame image={image}>
    
      <FlexGrid direction="column" justify="between">
        <FlexGrid alignItems="center" gap="4" justify="start">
        
             <Icon
            color="white"
            icon="ArrowRight"
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
          />
         
         
          <ValidatorBannerHeader notificationValue={notificationValue} name={name} imageUrl={imageUrl}  senderName={senderName} senderAddress={senderAddress} online={online}/>
        </FlexGrid>
        <ValidatorBannerText
          senderName={senderName}
          stakes={stakes}
          value={value}
          valueSymbol={valueSymbol}
          selfStake={selfStake}
          selfStakeSymbol={selfStakeSymbol}
          capacity={capacity}
          capacitySymbol={capacitySymbol}
          {...props} 
        />
      </FlexGrid>
      <ValidatorBannerCard blockTime={100} />
    </BannerFrame>
  );
};
