import { ParsedDataByDisciplines, ParsedDataByTeachers } from '../services';

export function filterByTeacher(
  tests: ParsedDataByTeachers,
  search: string
): ParsedDataByTeachers {
  if (!tests) return tests;

  const filteredTests = {
    ...tests,
    teachers: tests.teachers.filter(
      (teacher) =>
        teacher.name.toLocaleLowerCase().search(search.toLocaleLowerCase()) !==
          -1 || search === ''
    ),
  };
  return filteredTests;
}

export function filterByDiscipline(
  tests: ParsedDataByDisciplines,
  search: string
) {
  if (!tests) return tests;

  const filteredTerms = tests.terms.filter((term) =>
    term.disciplines.find(
      (discipline) =>
        discipline.name
          .toLocaleLowerCase()
          .search(search.toLocaleLowerCase()) !== -1 || search === ''
    )
  );

  const filteredTermsDisciplines = filteredTerms.map((term) => ({
    number: term.number,
    disciplines: term.disciplines.filter(
      (discipline) =>
        discipline.name
          .toLocaleLowerCase()
          .search(search.toLocaleLowerCase()) !== -1 || search === ''
    ),
  }));
  const filteredTests = {
    ...tests,
    terms: filteredTermsDisciplines,
  };
  return filteredTests;
}
