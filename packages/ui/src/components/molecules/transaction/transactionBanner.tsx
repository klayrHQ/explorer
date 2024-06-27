import { FlexGrid, Icon, Typography } from "../../atoms";
import { trimFour, trimSix } from "../../../utils/functions";
import { Badge } from "../../atoms";
import { ImageName } from "./imageName";




export const TransactionBanner = (transactionsData: any) => {


  return (
    <div className="bg-azule h-auto w-transitionBannerWidth rounded-xl">
      <FlexGrid alignItems="start" className="p-6" justify="between">
        <div className=" items-start justify-start flex flex-col">
          <FlexGrid alignItems="center" gap="4" justify="start">
            <Icon color="white" icon="ArrowRight" />
            <Typography className="ml-2" color="white" fontWeight="bold" variant="h3">
              Transaction {trimFour('a2140ea1cd8b7706fff3c82ac9aacd972985044a00483385bc0755c2471c368b')}
            </Typography>
          </FlexGrid>
          <div className="w-transitionBannerContainerWidth ">
          <ImageName imageUrl="https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg" name="Oliver" />send Panzer the amount of 342 KLY in type <Badge borderColor="gray-1" className="flex-grow-0" colorVariant="green" label="Token Transfer"/> over 36 min ago and was  <Badge backgroundColor="green" borderColor="green" className=" " colorVariant="lobster" opacity="40"  label="Successful" /></div> 
        </div>
       
        <div className="border border-onBackground rounded-xl"  >
            <div className="p-6 flex items-start flex-col gap-4" >
            <Typography className="text-right" color="white" fontWeight="semibold" variant="paragraph-md">
               Block height
            </Typography>
            <div className="flex flex-col justify-center">
                <Typography className="text-right" color="white" fontWeight='bold' variant="h3">
            #{'102437'}
            </Typography>
            <Typography className="text-right" color="white" variant="caption">
               {trimSix('7b5318b644e4a971feeda50acc29a5e21c1978f57b556ced1bd14b744e568e7d')}
            </Typography>
            </div>
            </div>
        </div>
      </FlexGrid>
    </div>
  );
};