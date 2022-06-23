import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToggleView } from '../../components/TogglePage';
import { ToggleTestsView } from '../../components/ToggleTestsView';
import { TopBar } from '../../components/TopMenu';
import { SearchBarContext } from '../../contexts/SearchBarContext';

export type toggles = 'DISCIPLINA' | 'PESSOA INSTRUTORA' | 'ADICIONAR';

export const Home: FC = () => {
  const [toggle, setToggle] = useState<toggles>('ADICIONAR');
  const { setSearchInput } = useContext(SearchBarContext);
  const auth = localStorage.getItem('auth');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  });

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: toggles) => {
    if (newValue !== null) {
      setSearchInput('');
      setToggle(newValue);
    }
  };

  return (
    <>
      <TopBar toggle={toggle} />
      <ToggleView toggle={toggle} handleChange={handleChange} />
      <ToggleTestsView toggle={toggle} />
    </>
  );
};
