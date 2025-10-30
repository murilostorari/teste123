import React from 'react';
import { IconProps } from './IconProps';

const BoxIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#E2F1F2"/>
    <path d="M10 12L16 8L22 12L16 16L10 12Z" fill="#3B8289"/>
    <path d="M10 12V20L16 24V16L10 12Z" fill="#3B8289"/>
    <path d="M22 12V20L16 24V16L22 12Z" fill="#3B8289"/>
  </svg>
);

export default BoxIcon;