import { Typography } from "../../atoms";


export interface ValidatorBannerCardProps {
    blockTime: number;
    }

export const ValidatorBannerCard = ({blockTime,}: ValidatorBannerCardProps) => {
  return (
    <div className="border border-onBackground rounded-xl z-20  w-transitionBannerContainerWidthMobile desktop:w-auto">
      <div className="p-6 flex flex-1 items-start flex-col gap-6 ">
        <Typography
          color="onBackground"
          fontWeight="semibold"
          variant="paragraph-md"
        >
          Next block in
        </Typography>
        
        <Typography
    
            color="onBackground"
            fontWeight="bold"
            variant="h3"
        >
            #{blockTime}
         </Typography>
       
        </div>
      </div>
  );
};
