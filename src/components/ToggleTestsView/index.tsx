import React, { FC } from 'react';

import { toggles } from '../../pages/Home';
import { LoadingSpinner } from '../Loader/Loader';
import { TestsByDisciplines } from '../TestsByDisciplines';
import { TestsByTeachers } from '../TestsByTeachers';

interface IProps {
  toggle: toggles;
}
export const ToggleTestsView: FC<IProps> = ({ toggle }) => {
  if (toggle === 'DISCIPLINA') return <TestsByDisciplines />;
  if (toggle === 'PESSOA INSTRUTORA') return <TestsByTeachers />;

  return <LoadingSpinner />;
};
