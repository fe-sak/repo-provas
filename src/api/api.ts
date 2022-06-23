import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function createConfig(token: string) {
  return { headers: { Authorization: `${token}` } };
}

interface Signup {
  name: string;
  email: string;
  password: string;
}

export function signUp(body: Signup) {
  return axios.post(`${BASE_URL}/signup`, body);
}

type ILogin = Omit<Signup, 'name'>;

export function logIn(body: ILogin) {
  return axios.post(`${BASE_URL}/login`, body);
}

export type DataByDisciplines = {
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
} | null;

export function getTestsByDisciplines(token: string) {
  const config = createConfig(token);

  return axios.get<DataByDisciplines>(`${BASE_URL}/tests`, config);
}

export type DataByTeachers = {
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
} | null;

export function getTestsByTeachers(token: string) {
  const config = createConfig(token);

  return axios.get<DataByTeachers>(`${BASE_URL}/tests/?byTeachers=true`, config);
}

export async function addView(testId: number, token: string) {
  const config = createConfig(token);

  return axios.post(`${BASE_URL}/tests/${testId}`, {}, config);
}

export type categories = {
  id: number;
  name: string;
}[];

export async function getCategories(token: string) {
  const config = createConfig(token);

  return axios.get(`${BASE_URL}/categories`, config);
}

export type disciplines = {
  id: number;
  name: string;
}[];

export async function getDisciplines(token: string) {
  const config = createConfig(token);

  return axios.get(`${BASE_URL}/disciplines`, config);
}

export type teachers = {
  name: string;
  disciplinesTeachers: {
    id: number;
    discipline: {
      name: string;
    };
  }[];
}[];

export async function getTeachers(token: string) {
  const config = createConfig(token);

  return axios.get(`${BASE_URL}/teachers`, config);
}

export type testTypes = {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineTeacherId: number;
};

export async function createTest(token: string, test: testTypes) {
  const config = createConfig(token);

  return axios.post(`${BASE_URL}/tests`, test, config);
}
