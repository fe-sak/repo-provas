import * as api from '../api/api';
import { errorHandler } from '../utils/errorHandler';

export type ParsedDataByDisciplines = {
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

function removeDuplicates(arr: string[]) {
  const unique = arr.reduce((acc, curr) => {
    if (!acc.includes(curr)) acc.push(curr);
    return acc;
  }, [] as string[]);
  return unique;
}

export async function getDataByDiscipline(token: string) {
  type tests = {
    name: string;
    tests: {
      name: string;
      pdfUrl: string;
      teacher: string;
    }[];
  };

  try {
    const { data }: { data: api.DataByDisciplines } =
      await api.getTestsByDisciplines(token);

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

    return parsedData;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}
export type ParsedDataByTeachers = {
  teachersSearch: string[];
  teachers: {
    name: string;
    categories: {
      name: string;
      tests: {
        name: string;
        pdfUrl: string;
        category: {
          name: string;
        };
        disciplineTeacher: {
          teacher: {
            name: string;
          };
          discipline: {
            name: string;
          };
        };
      }[];
    }[];
  }[];
} | null;
export async function getDataByTeachers(token: string) {
  try {
    const { data }: { data: api.DataByTeachers } = await api.getTestsByTeachers(
      token
    );

    if (data === null) return null;

    const teachersDuplicated = data.tests.map(
      (test) => test.disciplineTeacher.teacher.name
    );
    const teachers = removeDuplicates(teachersDuplicated);

    const parsedData: ParsedDataByTeachers = {
      teachersSearch: teachers,
      teachers: teachers.map((teacher) => ({
        name: teacher,
        categories: removeDuplicates(
          data.tests
            .filter((test) => test.disciplineTeacher.teacher.name === teacher)
            .map((test) => test.category.name)
            .sort()
        ).map((category) => ({
          name: category,
          tests: data.tests
            .map((test) => test)
            .filter(
              (test) =>
                test.category.name === category &&
                test.disciplineTeacher.teacher.name === teacher
            ),
        })),
      })),
    };

    return parsedData;
  } catch (error) {
    console.log(error);

    errorHandler(error);
    return null;
  }
}
