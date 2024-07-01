import { FlexGrid, Icon } from "../../atoms";
import { trimFour } from "../../../utils/functions";
import {BannerBG} from "../../../assets/images/bannerBG.png";
import { BannerText } from "./bannerText";
import { BannerCard } from "./bannerCard";



export const TransactionBanner = ({transactionsData, image} : any) => {
  return (
    <div className="bg-azule bg-no-repeat bg-right h-auto w-transitionBannerWidthMobile desktop:w-transitionBannerWidth rounded-xl relative " style={{backgroundImage: `url(${image})`, backgroundPosition: "right -35px top 50%" }}>
      <div className="flex items-start justify-between p-6 desktop:flex-row flex-col gap-5">
        <div className="items-start justify-start flex flex-col">
          <FlexGrid alignItems="center" gap="4" justify="start">
            <Icon color="white" icon="ArrowRight" />
            <h3 className="text-heading-6 desktop:text-heading-3 ml-2 text-white font-bold">
              Transaction{" "}
              {trimFour(
                "a2140ea1cd8b7706fff3c82ac9aacd972985044a00483385bc0755c2471c368b",
              )}
            </h3>
            {/* <Typography className="ml-2" color="white" fontWeight="bold" variant="h3">
              Transaction {trimFour('a2140ea1cd8b7706fff3c82ac9aacd972985044a00483385bc0755c2471c368b')}
            </Typography> */}
          </FlexGrid>
          <BannerText timestamp={1719821397} amount="136" moduleCommand="token:transfer" receiverAddress="klynd59zkd4xorumazwt9t7o2vocux9dshdk8bgfd" senderAddress="klyjedpj7nr79sz7xqs6xwb358mktxh6ptvqz7xoy" symbol="KLY" executionStatus=""/>
        </div>
        <BannerCard blockHeight={611606}  blockId="533f9c84a7d16fb00a4ee39a46feb3782b67b3d20843d78d02bc325686ec8456"/>
      </div>
    </div>
  );
};
