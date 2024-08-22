import { FlexGrid, Typography } from '../../atoms';
import { UserAccountCard } from '../../atoms/account/userAccountCard';
import Link from 'next/link';

interface NextValidatorType {
  address: string;
  name: string;
  publicKey: string;
  nextAllocatedTime: number;
  status: string;
}

type NextValidatorsProps = {
  validators: NextValidatorType[];
};

export const NextValidators = ({ validators }: NextValidatorsProps) => {
  return (
    <FlexGrid
      className="border-borderLow border-1 rounded-lg p-6 shadow-sm overflow-hidden w-96"
      direction="col"
      gap="4"
    >
      <Typography fontWeight="semibold" variant="paragraph-md">
        {' Next Validators'}
      </Typography>
      <div className="flex gap-4">
        {validators.map((validator, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Link href={`/validators/${validator.address}`} key={index}>
            <UserAccountCard
              address={validator.address}
              // eslint-disable-next-line react/no-array-index-key
              name={validator.name}
              nameColor="onBackgroundMedium"
              nameFontWeight="semibold"
              nameOnly
              nameVariant="paragraph-sm"
              truncateName
            />
          </Link>
        ))}
      </div>
    </FlexGrid>
  );
};
