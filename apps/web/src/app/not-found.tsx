import { FlexGrid, Grid, Link, Typography } from '@repo/ui/atoms';

const NotFound = () => {
  return (
    <FlexGrid
      alignItems={'center'}
      className={'w-full h-full'}
      justify={'center'}
      direction={'col'}
      gap={'4xl'}
    >
      <FlexGrid
        className={'max-w-notFoundContentWidth'}
        justify={'center'}
        direction={'col'}
        gap={'3xl'}
      >
        <Typography
          className={'w-full'}
          align={'center'}
          component={'h1'}
          variant={'h3'}
          bold
          color={'onBackgroundHigh'}
        >
          {'Lost in the blockchain!'}
        </Typography>
        <Typography
          className={'w-full'}
          align={'center'}
          variant={'paragraph-md'}
          color={'onBackgroundLow'}
        >
          {
            "Oops! The chain you're looking for doesn't exist... yet. Maybe it’s still in development, or perhaps it’s just a figment of your imagination!\" 🚀"
          }
        </Typography>
      </FlexGrid>
      <FlexGrid className={'mt-3xl'} direction={'col'} gap={'3xl'}>
        <Typography
          className={'desktop:w-full'}
          align={'center'}
          component={'h3'}
          variant={'subheading'}
          fontWeight={'semibold'}
          color={'onBackgroundHigh'}
        >
          {'Here are a few things you can try:'}
        </Typography>
        <Grid columns={'1'} desktopCols={'3'} gap={'2xl'} desktopGap={'4xl'}>
          {/* Col 1 */}
          <FlexGrid className={'rounded p-xl bg-backgroundSecondary'} mobileDirection={'row'}>
            <span className={'desktop:hidden'}>{'🔍  '}</span>
            <FlexGrid className={'w-full'} direction={'col'} gap={'2xs'}>
              <Typography
                className={'w-full inline-flex gap-md desktop:justify-center'}
                variant={'paragraph-sm'}
                fontWeight={'semibold'}
                color={'onBackgroundHigh'}
              >
                <span className={'hidden desktop:inline'}>{'🔍  '}</span>
                {'Double-check your URL:'}
              </Typography>
              <Typography
                className={'w-full desktop:text-center'}
                variant={'paragraph-sm'}
                color={'onBackgroundHigh'}
              >
                {'Typos happen, even in the blockchain universe!'}
              </Typography>
            </FlexGrid>
          </FlexGrid>
          {/* Col 2 */}
          <FlexGrid className={'rounded p-xl bg-backgroundSecondary'} mobileDirection={'row'}>
            <span className={'desktop:hidden'}>{'🌐  '}</span>
            <FlexGrid className={'w-full'} direction={'col'} gap={'2xs'}>
              <Typography
                className={'w-full inline-flex gap-md desktop:justify-center'}
                variant={'paragraph-sm'}
                fontWeight={'semibold'}
                color={'onBackgroundHigh'}
              >
                <span className={'hidden desktop:inline'}>{'🌐 '}</span>
                <span>
                  {'Go back to the '}
                  <Link className={'underline'} href={'/'}>
                    {'Explorer Home:'}
                  </Link>
                </span>
              </Typography>
              <Typography
                className={'w-full desktop:text-center'}
                variant={'paragraph-sm'}
                color={'onBackgroundHigh'}
              >
                {'Start fresh and find your way.'}
              </Typography>
            </FlexGrid>
          </FlexGrid>
          {/* Col 3 */}
          <FlexGrid className={'rounded p-xl bg-backgroundSecondary'} mobileDirection={'row'}>
            <span className={'desktop:hidden'}>{'🛠  '}</span>
            <FlexGrid className={'w-full'} direction={'col'} gap={'2xs'}>
              <Typography
                className={'w-full inline-flex gap-md desktop:justify-center'}
                variant={'paragraph-sm'}
                fontWeight={'semibold'}
                color={'onBackgroundHigh'}
              >
                <span className={'hidden desktop:inline'}>{'🛠️ '}</span>
                <span>
                  {'Visit our '}
                  <Link className={'underline'} href={'https://klayr.xyz/contact'} outgoing>
                    {'Support Page: '}
                  </Link>
                </span>
              </Typography>
              <Typography
                className={'w-full desktop:text-center'}
                variant={'paragraph-sm'}
                color={'onBackgroundHigh'}
              >
                {'We’ll help you hunt down that elusive chain'}
              </Typography>
            </FlexGrid>
          </FlexGrid>
        </Grid>
      </FlexGrid>
    </FlexGrid>
  );
};

export default NotFound;
