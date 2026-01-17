import { ReactNode, MouseEvent } from 'react';

export interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'green';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface StatProps {
  value: string;
  label: string;
  subLabel?: string;
}