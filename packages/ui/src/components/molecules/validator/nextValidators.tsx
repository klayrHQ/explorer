import { FlexGrid, Typography } from '../../atoms';
import { UserAccountCard } from '../../atoms';
import { Link } from 'web/src/components/link';
import { NextValidatorType } from '@repo/ui/types';

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
          <Link href={`/validators/${validator.address}`} key={index}>
            <UserAccountCard
              address={validator.address}
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
