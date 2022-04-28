import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function createConfig(token: string) {
  return { headers: { Authorization: `${token}` } };
}

interface ISignup {
  name: string;
  email: string;
  password: string;
}

export function signUp(body: ISignup) {
  return axios.post(`${BASE_URL}/signup`, body);
}

type ILogin = Omit<ISignup, 'name'>;
export function logIn(body: ILogin) {
  return axios.post(`${BASE_URL}/login`, body);
}

interface IDataByDisciplines {
  terms: {
    number: number;
    disciplines: {
      name: string;
      disciplinesTeachers: {
        teacher: {
          name: string;
        };
        tests: {
          id: number;
          name: string;
          pdfUrl: string;
          teacher: string;
          views: number;
          category: {
            name: string;
          };
        }[];
      }[];
    }[];
  }[];
}

export type DataByDisciplines = IDataByDisciplines | null;

export function getTestsByDisciplines(token: string) {
  const config = createConfig(token);

  return axios.get<DataByDisciplines>(`${BASE_URL}/tests`, config);
}

interface IDataByTeachers {
  tests: {
    id: number;
    name: string;
    pdfUrl: string;
    views: number;
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
}

export type DataByTeachers = IDataByTeachers | null;
export function getTestsByTeachers(token: string) {
  const config = createConfig(token);

  return axios.get<DataByTeachers>(
    `${BASE_URL}/tests/?byTeachers=true`,
    config
  );
}

export function addView(testId: number, token: string) {
  const config = createConfig(token);

  return axios.post(`${BASE_URL}/tests/${testId}`, {}, config);
}
