import { FC } from 'react';

import LogoSource from '../../assets/logo.svg';
import { Container, Logo } from './styles';

export const SignUp: FC = () => {
  return (
    <Container>
      <Logo src={LogoSource} />
    </Container>
  );
};
