import removeDuplicates from './removeDuplicates';

export default function extractDisciplines(data: {
  terms: {
    number: number;
    disciplines: {
      name: string;
      categories: {
        name: string;
        tests: { name: string; pdfUrl: string; teacher: string }[];
      }[];
    }[];
  }[];
}) {
  const disciplinesRaw: string[] = [];
  data.terms.forEach((term) =>
    term.disciplines.forEach((discipline) =>
      disciplinesRaw.push(discipline.name)
    )
  );

  const disciplines = removeDuplicates(disciplinesRaw);

  return disciplines;
}
