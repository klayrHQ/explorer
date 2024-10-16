/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface BannerFrameProps {
  children?: React.ReactNode;
  image: any;
}

export const BannerFrame = ({ children, image }: BannerFrameProps) => {
  return (
    <div
      className="bg-azule bg-no-repeat bg-right h-auto w-full desktop:min-w-full rounded-xl relative "
      css={css`
        background-image: url(${image});
        background-position: right -105px top -45px;
        background-size: 80%;
        @media (min-width: 1024px) {
          background-position: right -50px top 35%;
          background-size: 50%;
      `}
    >
      <div className="flex items-start desktop:items-center justify-between px-6 py-3 desktop:p-6 desktop:flex-row flex-col gap-5">
        {children}
      </div>
    </div>
  );
};
