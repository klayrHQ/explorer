'use client';
import {
  FlexGrid,
  // Icon,
  IconButton,
  KeyValueComponent,
  Logo,
  MenuItemProps,
  Popover,
  // MenuItemProps,
  NotificationIcon,
  Link,
} from '../../atoms';
import { Search } from '../search/search.tsx';
import React, { ReactNode, useState } from 'react';
import {
  ChainNetworkPicker,
  ChainNetworkPickerProps,
  MobileMenu,
  // OptionsMenu,
} from '../../molecules';
import { cls } from '../../../utils/functions.ts';
import { Modal, Slide } from '@mui/material';

//import {ClickAwayListener} from "@mui/base";

interface TopbarProps {
  logo: {
    logoSrc: string;
    altText: string;
  };
  kpis: {
    keyValue: string | ReactNode;
    contentValue: string | ReactNode;
  }[];
  chainNetworkData: ChainNetworkPickerProps;
  mobileMenuItems: Omit<MenuItemProps, 'subMenu'>[];
  searchResults?: any;
  setSearchResults?: any;
  callSearch?: any;
  newFavourite?: boolean;
  basePath?: string;
  // optionsMenuItems: MenuItemProps[]
}

export const Topbar = ({
  kpis,
  chainNetworkData,
  mobileMenuItems,
  newFavourite,
  // optionsMenuItems,
  logo,
  searchResults,
  setSearchResults,
  callSearch,
  basePath,
}: TopbarProps) => {
  // const [openOptionsMenu, setOpenOptionsMenu] = useState(false)
  const [mobileSearchAnchor, setMobileSearchAnchor] = useState<HTMLElement | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <FlexGrid
      alignItems={'center'}
      className={cls([
        'w-full h-topbarMobileHeight desktop:h-topbarHeight bg-gray-8 p-3xl desktop:pl-0 dekstop:py-0 pr-3xl',
        'gap-4 desktop:gap-8 relative',
      ])}
      component={'header'}
      justify={'between'}
      mobileDirection={'row'}
      ref={setMobileSearchAnchor}
    >
      <Search
        callSearch={callSearch}
        className="hidden desktop:block"
        searchResult={searchResults}
        setSearchResults={setSearchResults}
      />
      <FlexGrid
        alignItems={'center'}
        className={'desktop:hidden '}
        gap={'3xl'}
        mobileDirection="row"
      >
        <Logo altText={logo.altText} className={'shrink-0'} logoSrc={logo.logoSrc} />
        <Popover
          button={
            <IconButton
              active={showSearch}
              align={'none'}
              className={'shrink-0'}
              icon={'SearchLg'}
              onClick={() => setShowSearch(!showSearch)}
              variant={'bordered'}
            />
          }
          customAnchor={mobileSearchAnchor}
          isOpen={showSearch}
          placement={'bottom-start'}
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 4],
                },
              },
            ],
          }}
          setIsOpen={setShowSearch}
        >
          <Search
            callSearch={callSearch}
            className="absolute left-0 top-0 w-screen h-full z-20"
            searchResult={searchResults}
            setSearchResults={setSearchResults}
          />
        </Popover>
      </FlexGrid>

      <FlexGrid
        alignItems={'center'}
        className={'desktop:hidden whitespace-nowrap'}
        gap={'md'}
        mobileDirection={'row'}
      >
        {kpis.map((item, index) => (
          <KeyValueComponent key={`key-value-${index + 1}`} {...item} />
        ))}
        <div className={'relative'}>
          <IconButton
            active={openMobileMenu}
            align={'none'}
            icon={'Menu'}
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            variant={'bordered'}
          />
          <Modal hideBackdrop open={openMobileMenu} style={{ pointerEvents: 'none' }}>
            <Slide direction={'left'} in={openMobileMenu} mountOnEnter unmountOnExit>
              <div style={{ pointerEvents: 'all' }}>
                <MobileMenu
                  basePath={basePath}
                  chainNetworkData={chainNetworkData}
                  className={'absolute top-topbarMobileHeight left-0'}
                  menuItems={mobileMenuItems}
                  onClose={() => setOpenMobileMenu(false)}
                />
              </div>
            </Slide>
          </Modal>
        </div>
      </FlexGrid>

      <FlexGrid
        alignItems={'center'}
        className={'w-full hidden desktop:flex whitespace-nowrap'}
        gap={'1.5xl'}
        justify={'end'}
      >
        {kpis.map((item, index) => (
          <KeyValueComponent key={`key-value-${index + 1}`} {...item} />
        ))}
        <ChainNetworkPicker {...chainNetworkData} />
        <FlexGrid gap={'md'}>
          <Link href={'/favourites'}>
            <div className={'relative'}>
              <IconButton align={'none'} icon={'Heart'} title={'favourites'} variant={'iconOnly'} />
              {newFavourite && (
                <NotificationIcon
                  className={'absolute top-0 right-0 pointer-events-none'}
                  notificationValue={'!'}
                />
              )}
            </div>
          </Link>
          {/* todo uncomment when adding lightmode or currency settings */}
          {/*<ClickAwayListener onClickAway={() => setOpenOptionsMenu(false)}>
            <div ref={setAnchorElement}>
              <IconButton
                align={"none"}
                icon={"Settings"}
                onClick={() => setOpenOptionsMenu(!openOptionsMenu)}
                variant={"iconOnly"}
              />
              <OptionsMenu
                anchorElement={anchorElement}
                menuItems={optionsMenuItems}
                open={openOptionsMenu}
              />
            </div>
          </ClickAwayListener>*/}
        </FlexGrid>
      </FlexGrid>
    </FlexGrid>
  );
};
