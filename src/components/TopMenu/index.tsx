import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Autocomplete, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FC, useContext } from 'react';

import { SearchBarContext } from '../../contexts/SearchBarContext';
import { toggles } from '../../pages/Home';
import { Logo } from '../Logo';
import { LogOutButton } from '../LogOutButton';
import { Container, TopBar } from './styles';

interface Toggles {
  toggle: toggles;
}

export const TopMenu: FC<Toggles> = ({ toggle }) => {
  const placeholder = `Pesquise por ${toggle.toLowerCase()}`;
  const { searchInput, searchOptions, setSearchInput } = useContext(SearchBarContext);

  const InputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const AutocompleteHandleChange = (_e: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value === null) setSearchInput('');
    else setSearchInput(value);
  };
  return (
    <Container>
      <TopBar>
        <Logo />
        <LogOutButton />
      </TopBar>
      <Autocomplete
        id='search-bar'
        freeSolo
        sx={{ width: 0.7 }}
        value={searchInput}
        inputValue={searchInput}
        onChange={AutocompleteHandleChange}
        options={searchOptions.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchInput}
            onChange={InputHandleChange}
            placeholder={placeholder}
            variant='standard'
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchSharpIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Container>
  );
};
