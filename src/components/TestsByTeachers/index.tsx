import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { SearchBarContext } from '../../contexts/SearchBarContext';
import { getDataByTeachers, ParsedDataByTeachers } from '../../services';
import { filterByTeacher } from '../../utils/searchFilters';
import { SmartAccordion } from '../Accordion';
import { LoadingSpinner } from '../Loader/Loader';
import { StyledLink } from '../styled components/StyledLinkMUI';

export const TestsByTeachers: FC = () => {
  const { auth } = useContext(AuthContext);
  const { search, setSearchArray } = useContext(SearchBarContext);

  const [tests, setTests] = useState<ParsedDataByTeachers>(null);
  const [filteredTests, setFilteredTests] =
    useState<ParsedDataByTeachers>(null);

  useEffect(() => {
    setFilteredTests(filterByTeacher(tests, search));
  }, [search]);

  const fetchData = useCallback(async () => {
    const newData: ParsedDataByTeachers = await getDataByTeachers(auth);
    if (newData) setSearchArray(newData.teachersSearch);
    setTests(newData);
    setFilteredTests(newData);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  if (filteredTests === null) return <LoadingSpinner />;

  return (
    <>
      {filteredTests.teachers.map((teacher) => (
        <SmartAccordion
          key={teacher.name}
          summary={teacher.name}
          details={teacher.categories.map((category) => (
            <List key={category.name}>
              <Typography variant='button'>{category.name}</Typography>
              {category.tests.map((test) => (
                <ListItem key={`${category.name} ${test.name}`}>
                  <StyledLink
                    href={test.pdfUrl}
                    key={test.name}
                    target='_blank'
                  >
                    {test.name}
                    <Typography variant='caption' color='gray'>
                      {`  (${test.disciplineTeacher.discipline.name})`}
                    </Typography>
                  </StyledLink>
                </ListItem>
              ))}
            </List>
          ))}
        />
      ))}
    </>
  );
};
