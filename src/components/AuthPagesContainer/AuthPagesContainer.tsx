import React, { FC, ReactNode } from 'react';

import { Container } from './styles';

type Props = { children: ReactNode };
const AuthPagesContainer: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AuthPagesContainer;
