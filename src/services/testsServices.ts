import * as api from '../api/api';
import { errorHandler } from '../utils/errorHandler';

export type IParsedData = {
  terms: {
    number: number;
    disciplines: {
      name: string;
      categories: {
        name: string;
        tests: {
          name: string;
          pdfUrl: string;
          teacher: string;
        }[];
      }[];
    }[];
  }[];
} | null;

type tests = {
  name: string;
  tests: {
    name: string;
    pdfUrl: string;
    teacher: string;
  }[];
};

export async function getTestsData(token: string) {
  try {
    const { data }: { data: api.ITestsData } = await api.getTests(token);
    console.log({ data });

    if (data === null) return null;

    const parsedData = {
      terms: data?.terms
        .map((term) => ({
          number: term.number,
          disciplines: term.disciplines.map((discipline) => ({
            name: discipline.name,
            categories: discipline.disciplinesTeachers.map(
              (disciplineTeacher) =>
                disciplineTeacher.tests
                  .map((test) => ({
                    name: test.category.name,
                    tests: disciplineTeacher.tests
                      .filter(
                        (innerTest) => innerTest.category === test.category
                      )
                      .map((test) => ({
                        name: test.name,
                        pdfUrl: test.pdfUrl,
                        teacher: disciplineTeacher.teacher.name,
                      })),
                  }))
                  .reduce(
                    (acc, current) => {
                      acc.tests.push(current.tests[0]);
                      return {
                        name: current.name,
                        tests: acc.tests,
                      };
                    },
                    { tests: [{}] } as tests
                  )
            ),
          })),
        }))
        .filter((term) => term.disciplines.length !== 0),
    };

    console.log({ parsedData });

    return parsedData;
  } catch (error) {
    console.log(error);

    errorHandler(error);
    return null;
  }
}
