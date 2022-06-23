import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

interface SearchProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchOptions: string[];
  setSearchOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchBarContext = createContext<SearchProps>({
  searchInput: '',
  setSearchInput: (): void => undefined,
  searchOptions: [],
  setSearchOptions: (): void => undefined,
});

type Props = { children: ReactNode };

export const SearchProvider: FC<Props> = ({ children }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchOptions, setSearchOptions] = useState<string[]>([]);

  const memoizedValues = useMemo(() => {
    return {
      searchInput,
      setSearchInput,
      searchOptions,
      setSearchOptions,
    };
  }, [searchInput, setSearchInput, searchOptions, setSearchOptions]);

  return <SearchBarContext.Provider value={memoizedValues}>{children}</SearchBarContext.Provider>;
};
