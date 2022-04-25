import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { getDataByTeachers, ParsedDataByTeachers } from '../../services';
import { SmartAccordion } from '../Accordion';
import { LoadingSpinner } from '../Loader/Loader';
import { StyledLink } from '../styled components/StyledLinkMUI';

export const TestsByTeachers: FC = () => {
  const { auth } = useContext(AuthContext);
  const [tests, setTests] = useState<ParsedDataByTeachers>(null);

  const fetchData = useCallback(async () => {
    const newData: ParsedDataByTeachers = await getDataByTeachers(auth);
    setTests(newData);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (tests === null) return <LoadingSpinner />;
  return (
    <>
      {tests.teachers.map((teacher) => (
        <SmartAccordion
          summary={teacher.name}
          details={teacher.categories.map((category) => (
            <List>
              <Typography variant='button'>{category.name}</Typography>
              {category.tests.map((test) => (
                <ListItem>
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
