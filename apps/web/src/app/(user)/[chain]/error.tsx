'use client';
import { FlexGrid, Grid, Link, Typography } from '@repo/ui/atoms';
import { useMemo, useState } from 'react';

interface ErrorPageProps {
  error: Error;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const timestamp = useMemo(() => new Date().toISOString(), []);

  const onRetry = async () => {
    window.location.reload();
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(
          {
            message: error?.message,
            stack: error?.stack,
            timestamp,
          },
          null,
          2,
        ),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

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
          {'Oops, The rocket has crashed 💥!'}
        </Typography>
        <Typography
          className={'w-full'}
          align={'center'}
          variant={'paragraph-md'}
          color={'onBackgroundLow'}
        >
          {
            'Looks like our explorer took a wrong turn in the blockchain galaxy. Don’t worry, our astronauts are on their way to bring it back to orbit 🧑‍🚀'
          }
        </Typography>
      </FlexGrid>
      <div
        className="w-full max-w-notFoundContentWidth"
        style={{
          borderRadius: '20px',
          borderColor: 'var(--color-backgroundSecondary)',
          borderWidth: '1px',
          padding: '20px',
        }}
      >
        <FlexGrid
          direction={'row'}
          mobileDirection={'row'}
          justify={'between'}
          alignItems={'center'}
        >
          <Typography
            component={'h3'}
            variant={'subheading'}
            fontWeight={'semibold'}
            color={'onBackgroundHigh'}
          >
            {'Error details'}
          </Typography>

          <div className="inline-flex gap-md">
            <button
              onClick={() => setDetailsOpen((s) => !s)}
              aria-expanded={detailsOpen}
              className="inline-flex items-center px-3 py-1 rounded text-sm focus:outline-none"
            >
              {detailsOpen ? 'Hide details' : 'Show details'}
            </button>

            <button
              onClick={onCopy}
              className="inline-flex items-center px-3 py-1 rounded text-sm focus:outline-none"
              aria-label="Copy error details"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </FlexGrid>

        {detailsOpen && (
          <pre
            tabIndex={0}
            aria-live="polite"
            className="mt-3 p-md rounded bg-backgroundTertiary overflow-auto text-xs"
            style={{ whiteSpace: 'pre-wrap', maxHeight: 320 }}
          >
            <code>
              {`Message: ${error?.message ?? '—'}\nTime: ${timestamp}\nStack:\n${error?.stack ?? '—'}`}
            </code>
          </pre>
        )}
      </div>
      <FlexGrid direction={'col'} gap={'3xl'}>
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
                <span className={'hidden desktop:inline'}>{'🔄  '}</span>
                <Link className={'underline'} onClick={onRetry} href={''}>
                  {'Reload'}
                </Link>
                {' page:'}
              </Typography>
              <Typography
                className={'w-full desktop:text-center'}
                variant={'paragraph-sm'}
                color={'onBackgroundHigh'}
              >
                {'Launch the mission again and see where it lands this time!'}
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

export default ErrorPage;
