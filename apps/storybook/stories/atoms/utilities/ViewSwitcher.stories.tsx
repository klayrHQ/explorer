import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Currency, ImageContainer, StatusBadge, Typography, ViewSwitcher } from '@repo/ui/atoms';
import {NftCard, Table} from '@repo/ui/molecules';
import React, {useState} from 'react';

const meta = {
  title: 'Atoms/Utilities/ViewSwitcher',
  component: ViewSwitcher,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const nfts = [
  {
    name: 'Orange F',
    collection: 'CyberPunk AI',
    price: '145500000000',
    status: 'active',
    rarityRank: '213',
    chain: 'Klayr-main',
    image:
      'https://img.freepik.com/free-photo/international-day-education-futuristic-style_23-2150998750.jpg?t=st=1727856493~exp=1727860093~hmac=1cdc94549100461630c13ee835dd86c2e12449c334338d0508f6babf639c368c?uid=R97798057&ga=GA1.1.203049697.1727194306://placehold.co/600x400',
    chainImage:
      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  },
  {
    name: 'White Ki',
    collection: 'CyberPunk AI',
    price: '93500000000',
    status: 'active',
    rarityRank: '24',
    chain: 'Klayr-main',
    image:
      'https://img.freepik.com/free-photo/cyberpunk-woman-warrior-portrait_23-2150712276.jpg?t=st=1727857940~exp=1727861540~hmac=1b8c47b6d615671e2baf5e0516ca4ee240ebbae5b563b2fb6ba065610767186d?uid=R97798057&ga=GA1.1.203049697.1727194306',
    chainImage:
      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  },
  {
    name: 'Pink B',
    collection: 'CyberPunk AI',
    price: '1345500000000',
    status: 'active',
    rarityRank: '43',
    chain: 'Klayr-main',
    image:
      'https://img.freepik.com/free-photo/cyberpunk-woman-warrior-portrait_23-2150712588.jpg?t=st=1727857940~exp=1727861540~hmac=227d6f34d4ac97f5fa3af8e423563556cfcf11734d2e3d3956e12dc05f875650?uid=R97798057&ga=GA1.1.203049697.1727194306',
    chainImage:
      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  },
  {
    name: 'Sobaka Laika',
    collection: 'Lika Laka',
    price: '4550000000',
    status: 'active',
    rarityRank: '34',
    chain: 'Klayr-main',
    image:
      'https://img.freepik.com/premium-photo/dog-painting-portrait-doberman_53876-523706.jpg?w=1060',
    chainImage:
      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  },
  {
    name: 'Pesik Laika',
    collection: 'Lika Laka',
    price: '7785400000000',
    status: 'active',
    rarityRank: '325',
    chain: 'Klayr-main',
    image:
      'https://img.freepik.com/premium-photo/bulldog-costuming-wearing-halloween-surrealism-portrait-animal-human_53876-521385.jpg?w=996',
    chainImage:
      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  },
  {
    name: 'Kobel Samka',
    collection: 'Lika Laka',
    price: '7785400000000',
    status: 'active',
    rarityRank: '325',
    chain: 'Klayr-main',
    image:
      'https://img.freepik.com/premium-photo/regal-husky-vintage-attire_53876-305029.jpg?w=1480',
    chainImage:
      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  },
];

const headColumns = [
  {
    children: 'NFT',
  },
  {
    children: 'Collection Name',
  },
  {
    children: 'Status',
  },
  {
    children: 'Price',
  },
  {
    children: 'Chain',
  },
];

const rows = nfts.map((nft) => {
  return {
    cells: [
      {
        children: (
          <div className="flex gap-2 items-center">
            <ImageContainer alt={'kly'} src={nft.image ?? ''} variant={'avatar'} />
            <Typography color="onBackgroundMedium" fontWeight="semibold">
              {nft.name}
            </Typography>
          </div>
        ),
      },
      {
        children: <Typography>{nft.collection}</Typography>,
      },
      {
        children: <StatusBadge status={nft.status || ''} />,
      },
      {
        children: (
          <div className="flex flex-col">
            {/* <Currency amount={nft.price ?? 0} decimals={3} symbol={'KLY'} /> */}
            <Currency
              amount={Number(nft.price) * 0.7}
              color="onBackgroundLow"
              decimals={2}
              sign={'$'}
            />
          </div>
        ),
      },
      {
        children: (
          <div className="flex gap-2 items-center">
            <ImageContainer alt={'kly'} src={nft.chainImage ?? ''} variant={'avatar'} />
            <Typography color="onBackgroundMedium" fontWeight="semibold">
              {nft.chain ?? ''}
            </Typography>
          </div>
        ),
      },
    ],
  };
});

const Template: Template = {
  render: (args) => {
    const [currentView, setCurrentView] = useState(args.views[0].name);

    return (
      <ViewSwitcher
        {...args}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    );
  }
};

export const Default: Story = {
  ...Template,
  args: {
    currentView: 'View1',
    setCurrentView: (view: string) => console.log(view),
    views: [
      {
        name: 'View1',
        icon: 'GridOne',
        view: (
          <div
            className={'w-full grid relative mb-10 gap-6 p-3xl'}
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            }}
          >
            {nfts.map((nft) => (
              <NftCard
                chain={nft.chain}
                chainImage={nft.chainImage}
                collection={nft.collection}
                image={nft.image}
                key={nft.name}
                price={nft.price}
                title={nft.name}
              />
            ))}
          </div>
        ),
      },
      {
        name: 'View2',
        icon: 'LayoutAlt',
        view: <Table headCols={headColumns} keyPrefix={'nftsTable'} rows={rows} />,
      },
    ],
  },
};
