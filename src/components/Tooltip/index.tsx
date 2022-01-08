import React from 'react';

import * as S from './styles';

interface TootipProps {
  title: string;
  className?: string;
}

export const Tooltip: React.FC<TootipProps> = ({ title, className = '', children }) => {
  return (
    <S.Container className={className}>
      {children}
      <span>{title}</span>
    </S.Container>
  );
}