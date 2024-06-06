import React from 'react';
import {ColorType, IconComponent} from '../../../types/types';
import { icons } from '../../../assets/icons';

interface ButtonProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  icon: IconComponent;
  color?: ColorType;
}

export const Icon = ({
  className = "",
  size = 'medium',
  color = 'gray-1',
  icon,
}: ButtonProps) => {
  const Component = icons[icon];

  return (
    <Component />
  );
};
