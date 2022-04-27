import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Autocomplete, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FC, useContext, useRef } from 'react';

import { SearchBarContext } from '../../contexts/SearchBarContext';
import { toggles } from '../../pages/Home';
import { Logo } from '../Logo';
import { LogOutButton } from '../LogOutButton';
import { Container, TopBar } from './styles';

interface IToggles {
  toggle: toggles;
}

export const TopMenu: FC<IToggles> = ({ toggle }) => {
  const placeholder = `Pesquise por ${toggle.toLowerCase()}`;
  const { search, searchArray, setSearch } = useContext(SearchBarContext);
  const inputRef = useRef(null);
  console.log(inputRef);

  const InputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const AutocompleteHandleChange = (
    _e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) setSearch('');
    else setSearch(value);
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
        value={search}
        inputValue={search}
        onChange={AutocompleteHandleChange}
        options={searchArray.map((option) => option)}
        renderInput={(params) => (
          <TextField
            ref={inputRef}
            {...params}
            value={search}
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
