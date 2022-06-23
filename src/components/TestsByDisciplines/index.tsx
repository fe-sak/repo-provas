import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { SearchBarContext } from '../../contexts/SearchBarContext';
import { getDataByDiscipline, ParsedDataByDisciplines } from '../../services';
import extractDisciplines from '../../utils/extractDisciplines';
import { filterByDiscipline } from '../../utils/searchFilters';
import { SmartAccordion } from '../Accordion';
import { LoadingSpinner } from '../Loader/Loader';
import { TestByDiscipline } from '../TestBydiscipline';

export const TestsByDisciplines: FC = () => {
  const { auth } = useContext(AuthContext);
  const { searchInput, setSearchOptions } = useContext(SearchBarContext);

  const [tests, setTests] = useState<ParsedDataByDisciplines>(null);

  const [filteredTests, setFilteredTests] = useState<ParsedDataByDisciplines>(null);

  useEffect(() => {
    setFilteredTests(filterByDiscipline(tests, searchInput));
  }, [searchInput]);

  const fetchData = useCallback(async () => {
    const newData: ParsedDataByDisciplines = await getDataByDiscipline(auth);
    if (newData) {
      const disciplines = extractDisciplines(newData);
      setSearchOptions(disciplines);
      setTests(newData);
      setFilteredTests(newData);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (filteredTests === null) return <LoadingSpinner />;
  return (
    <>
      {filteredTests.terms.map((term) => (
        <SmartAccordion
          key={term.number}
          summary={`${term.number}° período`}
          details={term.disciplines.map((discipline) => (
            <SmartAccordion
              key={`${term.number} ${discipline.name}`}
              summary={discipline.name}
              details={
                discipline.categories.filter((category) => category.name).length === 0 ? (
                  <Typography variant='caption' color='gray'>
                    Esta disciplina não possui provas
                  </Typography>
                ) : (
                  discipline.categories.map((category) => (
                    <List key={`${discipline.name} ${category.name} ${term.number}`}>
                      <Typography variant='button'>{category.name}</Typography>
                      {category.tests
                        .filter((test) => test.pdfUrl !== undefined)
                        .map((test) => (
                          <TestByDiscipline test={test} />
                        ))}
                    </List>
                  ))
                )
              }
            />
          ))}
        />
      ))}
    </>
  );
};
