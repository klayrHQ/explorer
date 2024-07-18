import { KeyValueComponent } from './keyValueComponent.tsx';
import { ImageContainer } from '../images/imageContainer.tsx';
import { DefaultImageComponent } from 'storybook/stories/utils/constants.tsx';
import { Typography } from '../base/typography.tsx';
import { Icon } from '../images/icon.tsx';
import { FlexGrid } from '../base/flexGrid.tsx';
import { ReactElement } from 'react';

interface ChainToChainProps {
  from: {
    logo: string;
    name: string;
  };
  to: {
    logo: string;
    name: string;
  };
  imageComponent: ReactElement;
}

export const ChainToChainComponent = ({ from, to, imageComponent, }: ChainToChainProps) => {
  return (
    <FlexGrid className={'tablet:items-center tablet:flex-row'}>
      <KeyValueComponent
        contentValue={<Typography variant={'paragraph-lg'}>{from.name}</Typography>}
        keyValue={
          <ImageContainer
            alt={'from chain logo'}
            component={imageComponent}
            src={from.logo}
            variant={'chainLogo'}
          />
        }
      />
      <Icon className={'mx-auto rotate-90 tablet:rotate-0'} icon={'ArrowRight'} size={'small'} />
      <KeyValueComponent
        contentValue={<Typography variant={'paragraph-lg'}>{to.name}</Typography>}
        keyValue={
          <ImageContainer
            alt={'to chain logo'}
            component={imageComponent}
            src={to.logo}
            variant={'chainLogo'}
          />
        }
      />
    </FlexGrid>
  );
};
