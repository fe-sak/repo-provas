import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToggleView } from '../../components/TogglePage';
import { ToggleTestsView } from '../../components/ToggleTestsView';
import { TopMenu } from '../../components/TopMenu';
import { SearchBarContext } from '../../contexts/SearchBarContext';

export type toggles = 'DISCIPLINA' | 'PESSOA INSTRUTORA' | 'ADICIONAR';

export const Home: FC = () => {
  const [toggle, setToggle] = useState<toggles>('ADICIONAR');
  const { setSearch } = useContext(SearchBarContext);
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
    }
  };

  return (
    <>
      <TopMenu toggle={toggle} />
      <ToggleView toggle={toggle} handleChange={handleChange} />
      <ToggleTestsView toggle={toggle} />
    </>
  );
};
