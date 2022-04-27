import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tests } from '../../components/Tests';
import { ToggleView } from '../../components/TogglePage';
import { TopMenu } from '../../components/TopMenu';
import { SearchBarContext } from '../../contexts/SearchBarContext';

export type toggles = 'DISCIPLINA' | 'PESSOA INSTRUTORA' | 'ADICIONAR';

export const Home: FC = () => {
  const [toggle, setToggle] = useState<toggles>('PESSOA INSTRUTORA');
  const { search, setSearch } = useContext(SearchBarContext);
  const auth = localStorage.getItem('auth');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  });

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: toggles
  ) => {
    if (newValue !== null) {
      setSearch('');
      setToggle(newValue);
      console.log('handlechange');
      console.log(search);
    }
  };

  return (
    <>
      <TopMenu toggle={toggle} />
      <ToggleView toggle={toggle} handleChange={handleChange} />
      <Tests toggle={toggle} />
    </>
  );
};
