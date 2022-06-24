import { Typography, List } from '@mui/material';
import { FC } from 'react';

import { TestByDiscipline } from '../TestBydiscipline';

interface Props {
  discipline: {
    name: string;
    categories: {
      name: string;
      tests: {
        id: number;
        name: string;
        pdfUrl: string;
        teacher: string;
        views: number;
      }[];
    }[];
  };
  termNumber: number;
}

export const CategoryAccordion: FC<Props> = ({ discipline, termNumber }) => {
  if (discipline.categories.filter((category) => category.name).length === 0)
    return (
      <Typography variant='caption' color='gray'>
        Esta disciplina não possui provas
      </Typography>
    );

  return (
    <>
      {discipline.categories.map((category) => (
        <List key={`${discipline.name} ${category.name} ${termNumber}`}>
          <Typography variant='button'>{category.name}</Typography>
          {category.tests
            .filter((test) => test.pdfUrl !== undefined)
            .map((test) => (
              <TestByDiscipline test={test} />
            ))}
        </List>
      ))}
    </>
  );
};
