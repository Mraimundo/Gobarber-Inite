import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type InputProps = ButtonHTMLAttributes<HTMLButtonElement>;



export const Button: React.FC<InputProps> = ({ children, ...rest }) => (
  <S.Container {...rest}>
    {children}
  </S.Container>
);