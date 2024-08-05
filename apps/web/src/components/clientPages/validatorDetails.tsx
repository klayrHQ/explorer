'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';

export const ValidatorDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <ValidatorBanner
        senderAddress="dfdfsdf"
        imageUrl={''}
        notificationValue={''}
        image={BannerBG.src}
        senderName="Leo"
        stakes={100}
        value={300}
        valueSymbol="KLY"
        selfStake={200}
        selfStakeSymbol="KLY"
        capacity={234}
        online={true}
      />
    </div>
  );
};
