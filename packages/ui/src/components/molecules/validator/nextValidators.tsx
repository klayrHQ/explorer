import { FlexGrid, Typography } from '../../atoms';
import { UserAccountCard } from '../../atoms/account/userAccountCard';

export interface ValidatorType {
  account: any;
  address: string;
  totalStake: string;
  selfStake: string;
  validatorWeight: string;
  generatedBlocks: number;
  rank: number;
  blsKey: string;
  proofOfPossession: string;
  generatorKey: string;
  lastGeneratedHeight: number;
  isBanned: boolean;
  status: string;
  reportMisbehaviorHeights: string[];
  punishmentPeriods: string;
  consecutiveMissedBlocks: number;
  commission: number;
  lastCommissionIncreaseHeight: number;
}

type NextValidatorsProps = {
  validators: ValidatorType[];
};

export const NextValidators = ({ validators }: NextValidatorsProps) => {
  return (
    <FlexGrid
      className="border-borderLow border-1 rounded-lg p-6 shadow-sm overflow-hidden"
      direction="col"
      gap="4"
    >
      <Typography fontWeight="semibold" variant="paragraph-md">
        {' Next Validators'}
      </Typography>
      <div className="flex gap-4">
        {validators.slice(0, 3).map((validator, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <UserAccountCard
            address={validator.account.address}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            name={validator.account.name}
            nameColor="onBackgroundMedium"
            nameFontWeight="semibold"
            nameOnly
            nameVariant="paragraph-sm"
          />
        ))}
      </div>
    </FlexGrid>
  );
};
