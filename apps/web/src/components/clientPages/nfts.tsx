'use client';

import { FlexGrid, IconButton } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { nftsPageTableHead } from '../../utils/helpers/tableHeaders';
import { createNftsPageRows } from '../../utils/helpers/helper';
import { useState } from 'react';
import { NftCard } from '@repo/ui/molecules';

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

export default function NFTS() {
  const [loading, setLoading] = useState(false);
  const rows = createNftsPageRows(nfts, loading);

  const [isGridView, setIsGridView] = useState(false);

  return (
    <FlexGrid className={'w-full relative'} direction={'col'} gap={'4.5xl'}>
      <SectionHeader count={nfts.length} subTitle={'Overview of all NFTs'} title={'NFTs'} />
      <IconButton
        className="absolute top-0 right-0"
        icon={isGridView ? 'LayoutAlt' : 'GridOne'}
        onClick={() => setIsGridView(!isGridView)}
        variant="tertiary"
      />
      {isGridView ? (
        <div className="flex flex-wrap gap-6 justify-center desktop:justify-start">
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
      ) : (
        <TableContainer headCols={nftsPageTableHead} keyPrefix={'NFTs'} rows={rows} />
      )}
    </FlexGrid>
  );
}
