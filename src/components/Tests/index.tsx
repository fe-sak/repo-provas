import React, { FC } from 'react';

import { toggles } from '../../pages/Home';
import { LoadingSpinner } from '../Loader/Loader';
import { TestsByDisciplines } from '../TestsByDisciplines';

interface IProps {
  toggle: toggles;
}
export const Tests: FC<IProps> = ({ toggle }) => {
  if (toggle === 'DISCIPLINA') return <TestsByDisciplines />;
  if (toggle === 'PESSOA INSTRUTORA') return <h1>PESSOA INSTRUTORA</h1>;

  return <LoadingSpinner />;
};
