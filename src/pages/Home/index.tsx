import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tests } from '../../components/Tests';
import { ToggleView } from '../../components/TogglePage';
import { TopMenu } from '../../components/TopMenu';

export type toggles = 'DISCIPLINA' | 'PESSOA INSTRUTORA' | 'ADICIONAR' | null;

export const Home: FC = () => {
  const [toggle, setToggle] = useState<toggles>('PESSOA INSTRUTORA');
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
    if (newValue !== null) setToggle(newValue);
  };

  return (
    <>
      <TopMenu toggle={toggle} />
      <ToggleView toggle={toggle} handleChange={handleChange} />
      <Tests toggle={toggle} />
    </>
  );
};
