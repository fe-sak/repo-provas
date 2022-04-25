import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { getTestsData, IParsedData } from '../../services/testsServices';
import { SmartAccordion } from '../Accordion';
import { LoadingSpinner } from '../Loader/Loader';
import { StyledLink } from '../styled components/StyledLinkMUI';

export const TestsByDisciplines: FC = () => {
  const { auth } = useContext(AuthContext);
  const [testsData, setTestsData] = useState<IParsedData>(null);

  const fetchData = useCallback(async () => {
    const newData: IParsedData = await getTestsData(auth);
    setTestsData(newData);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (testsData === null) return <LoadingSpinner />;
  return (
    <>
      {testsData.terms.map((term) => (
        <SmartAccordion
          key={term.number}
          summary={`${term.number}° período`}
          details={term.disciplines.map((discipline) => (
            <SmartAccordion
              key={discipline.name}
              summary={discipline.name}
              details={
                discipline.categories.filter((category) => category.name)
                  .length === 0 ? (
                  <Typography variant='caption' color='gray'>
                    Esta disciplina não possui provas
                  </Typography>
                ) : (
                  discipline.categories.map((category) => (
                    <List>
                      <ListItem>
                        <Typography variant='button'>
                          {category.name}
                        </Typography>
                        <List>
                          {category.tests
                            .filter((test) => test.pdfUrl !== undefined)
                            .map((test) => (
                              <ListItem>
                                <StyledLink
                                  href={test.pdfUrl}
                                  key={test.name}
                                  target='_blank'
                                >
                                  {test.name}
                                  <Typography variant='caption' color='gray'>
                                    {`  (${test.teacher})`}
                                  </Typography>
                                </StyledLink>
                              </ListItem>
                            ))}
                        </List>
                      </ListItem>
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
