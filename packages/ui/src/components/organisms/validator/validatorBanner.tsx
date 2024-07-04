import { BannerFrame } from "../../atoms";
import { ValidatorBannerText } from "../../molecules/validator/validatorBannerText";
import { FlexGrid } from "../../atoms";
import { Icon } from "../../atoms";
import { ValidatorBannerTextProps } from "../../molecules/validator/validatorBannerText"; // Adjust the import path

interface ValidatorBannerProps extends ValidatorBannerTextProps {
  image: string;
}

export const ValidatorBanner = ({
  senderName,
  image,
  stakes,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  capacitySymbol,
  ...props
}: ValidatorBannerProps) => {
  return (
    <BannerFrame image={image}>
      <div className="items-start justify-start flex flex-col">
        <FlexGrid alignItems="center" gap="4" justify="start">
          <Icon
            color="white"
            icon="ArrowRight"
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
          />
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
          {...props} // Spread the remaining props to pass them down
        />
      </div>
    </BannerFrame>
  );
};
