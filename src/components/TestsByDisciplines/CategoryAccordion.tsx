/* eslint-disable @typescript-eslint/no-empty-function */
import { Typography, List } from '@mui/material';
import _ from 'lodash';
import { FC } from 'react';

import { TestByDiscipline } from '../TestBydiscipline';

type categories = {
  name: string;
  tests: {
    id: number;
    name: string;
    pdfUrl: string;
    teacher: string;
    views: number;
  }[];
}[];

interface Props {
  discipline: {
    name: string;
    categories: categories;
  };
  termNumber: number;
}

export const CategoryAccordion: FC<Props> = ({ discipline, termNumber }) => {
  const parsedCategories: categories = [];

  discipline.categories.forEach((category) => {
    const parsedCategory = parsedCategories.find((parsedCategory) => parsedCategory.name === category.name);

    if (parsedCategory !== undefined) {
      category.tests.forEach((test) => {
        const testCopy = _.cloneDeep(test);

        parsedCategory.tests.push(testCopy);
      });
    } else {
      const categoryCopy = _.cloneDeep(category);

      if (categoryCopy.name !== undefined) parsedCategories.push(categoryCopy);
    }
  });

  parsedCategories.sort((a, b) => (a.name < b.name ? -1 : 1));

  if (parsedCategories.length === 0)
    return (
      <Typography variant='caption' color='gray'>
        Esta disciplina não possui provas
      </Typography>
    );

  return (
    <>
      {parsedCategories.map((category) => (
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
