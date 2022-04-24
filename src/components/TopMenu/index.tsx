import TextField from '@mui/material/TextField';
import { FC } from 'react';

import { toggles } from '../../pages/Home';
import { Logo } from '../Logo';
import { LogOutButton } from '../LogOutButton';
import { Container, TopBar } from './styles';

interface IToggles {
  toggle: toggles;
}

export const TopMenu: FC<IToggles> = ({ toggle }) => {
  let searchString;
  if (typeof toggle === 'string')
    searchString = `Pesquise por ${toggle.toLowerCase()}`;
  else searchString = ``;

  return (
    <Container>
      <TopBar>
        <Logo />
        <LogOutButton />
      </TopBar>
      <TextField
        id='outlined-basic'
        label={searchString}
        variant='outlined'
        sx={{ width: 0.7 }}
      />
    </Container>
  );
};
