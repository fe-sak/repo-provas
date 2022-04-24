import React, { FC } from 'react';

import logoSource from '../../assets/logo.svg';
import { StyledImg } from './styles';

export const Logo: FC = () => <StyledImg src={logoSource} />;
