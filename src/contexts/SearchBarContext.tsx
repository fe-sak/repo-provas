import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

export const SearchBarContext = createContext<ISearchProps>({
  search: '',
  searchArray: [],
  setSearch: (): void => undefined,
  setSearchArray: (): void => undefined,
});
interface ISearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchArray: string[];
  setSearchArray: React.Dispatch<React.SetStateAction<string[]>>;
}

type Props = { children: ReactNode };

export const SearchProvider: FC<Props> = ({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [searchArray, setSearchArray] = useState<string[]>([]);

  const memoizedValues = useMemo(() => {
    return {
      search,
      setSearch,
      searchArray,
      setSearchArray,
    };
  }, [search, setSearch, searchArray, setSearchArray]);

  return (
    <SearchBarContext.Provider value={memoizedValues}>
      {children}
    </SearchBarContext.Provider>
  );
};
