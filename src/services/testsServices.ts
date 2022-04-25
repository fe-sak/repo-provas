import * as api from '../api/api';
import { errorHandler } from '../utils/errorHandler';

export type IParsedData = {
  terms: {
    number: number;
    disciplines: {
      name: string;
      tests: {
        name: string;
        pdfUrl: string;
        category: string;
        teacher: string;
      }[];
    }[];
  }[];
} | null;

export async function getTestsData(token: string) {
  try {
    const { data }: { data: api.ITestsData } = await api.getTests(token);
    if (data === null) return null;

    const parsedData: IParsedData = {
      terms: data?.terms
        .map((term) => ({
          number: term.number,
          disciplines: term.disciplines.map((discipline) => ({
            name: discipline.name,
            tests: discipline.disciplinesTeachers
              .map(
                (disciplineTeacher) =>
                  disciplineTeacher.tests.map((test) => ({
                    name: test.name,
                    pdfUrl: test.pdfUrl,
                    category: test.category.name,
                    teacher: disciplineTeacher.teacher.name,
                  }))[0]
              )
              .filter((test) => test !== undefined),
          })),
        }))
        .filter((term) => term.disciplines.length !== 0),
    };

    return parsedData;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}
