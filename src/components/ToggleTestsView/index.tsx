import React, { FC } from 'react';

import { toggles } from '../../pages/Home';
import AddTest from '../AddTest';
import { LoadingSpinner } from '../Loader/Loader';
import { TestsByDisciplines } from '../TestsByDisciplines';
import { TestsByTeachers } from '../TestsByTeachers';

interface Props {
  toggle: toggles;
}

export const ToggleTestsView: FC<Props> = ({ toggle }) => {
  if (toggle === 'DISCIPLINA') return <TestsByDisciplines />;
  if (toggle === 'PESSOA INSTRUTORA') return <TestsByTeachers />;
  if (toggle === 'ADICIONAR') return <AddTest />;

  return <LoadingSpinner />;
};
