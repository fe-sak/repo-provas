import React, { FC } from 'react';

import { Container } from './styles';

type Props = { name: string };
export const PageName: FC<Props> = ({ name }) => {
  return <Container>{name}</Container>;
};
