import React, { ReactNode } from 'react';

import { Container } from './styles';

type Props = { children: ReactNode };
export const Viewport = (props: Props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};
