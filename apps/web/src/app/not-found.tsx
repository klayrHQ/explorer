import { FlexGrid, Grid, Typography } from '@repo/ui/atoms';

const NotFound = () => {
  return (
    <FlexGrid
      alignItems={'center'}
      className={'w-full h-full text-center'}
      justify={'center'}
      direction={'col'}
      gap={'4xl'}
    >
      <FlexGrid className={'max-w-96'} justify={'center'} direction={'col'} gap={'2xl'}>
        <Typography variant={'h1'} color={'onBackgroundHigh'}>
          {'Lost in the blockchain!'}
        </Typography>
        <Typography variant={'paragraph-md'} color={'onBackgroundLow'}>
          {
            "Oops! The chain you're looking for doesn't exist... yet. Maybe it’s still in development, or perhaps it’s just a figment of your imagination!\" 🚀"
          }
        </Typography>
      </FlexGrid>
      <FlexGrid className={'text-center'} direction={'col'}>
        <Typography variant={'h5'} color={'onBackgroundHigh'}>
          {'Here are a few things you can try:'}
        </Typography>
        <Grid columns={'3'} gap={'4xl'}>
          {/* Col 1 */}
          <FlexGrid className={'text-center'} direction={'col'} gap={'md'}>
            <Typography variant={'paragraph-sm'} fontWeight={'semibold'} color={'onBackgroundHigh'}>
              {'🔍 Double-check your URL:'}
            </Typography>
            <Typography variant={'paragraph-sm'} color={'onBackgroundHigh'}>
              {'Typos happen, even in the blockchain universe!'}
            </Typography>
          </FlexGrid>
          {/* Col 2 */}
          <FlexGrid className={'text-center'} direction={'col'} gap={'md'}>
            <Typography variant={'paragraph-sm'} fontWeight={'semibold'} color={'onBackgroundHigh'}>
              {'🌐 Go back to the Explorer Home:'}
            </Typography>
            <Typography variant={'paragraph-sm'} color={'onBackgroundHigh'}>
              {'Start fresh and find your way.'}
            </Typography>
          </FlexGrid>
          {/* Col 3 */}
          <FlexGrid className={'text-center'} direction={'col'} gap={'md'}>
            <Typography variant={'paragraph-sm'} fontWeight={'semibold'} color={'onBackgroundHigh'}>
              {'🛠️ Visit our Support Page: '}
            </Typography>
            <Typography variant={'paragraph-sm'} color={'onBackgroundHigh'}>
              {'We’ll help you hunt down that elusive chain'}
            </Typography>
          </FlexGrid>
        </Grid>
      </FlexGrid>
    </FlexGrid>
  );
};

export default NotFound;