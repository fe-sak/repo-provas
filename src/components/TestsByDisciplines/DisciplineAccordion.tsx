import { FC } from 'react';

import { SmartAccordion } from '../Accordion';
import { CategoryAccordion } from './CategoryAccordion';

interface Props {
  term: {
    number: number;
    disciplines: {
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
    }[];
  };
}

export const DisciplineAccordion: FC<Props> = ({ term }) => {
  return (
    <>
      {term.disciplines.map((discipline) => (
        <SmartAccordion
          key={`${term.number} ${discipline.name}`}
          summary={discipline.name}
          details={<CategoryAccordion discipline={discipline} termNumber={term.number} />}
        />
      ))}
    </>
  );
};
