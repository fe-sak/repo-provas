import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { getTestsData, IParsedData } from '../../services/testsServices';
import { SmartAccordion } from '../Accordion';
import { LoadingSpinner } from '../Loader/Loader';
import { Test } from '../Test';

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
                discipline.tests.length === 0
                  ? 'Esta disciplina não possui provas'
                  : discipline.tests.map((test) => (
                      <Test key={test.name} test={test} />
                    ))
              }
            />
          ))}
        />
      ))}
    </>
  );
};
