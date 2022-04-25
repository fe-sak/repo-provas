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

interface ITests {
  terms: {
    number: number;
    disciplines: {
      name: string;
      disciplinesTeachers: {
        teacher: {
          name: string;
        };
        tests: {
          name: string;
          pdfUrl: string;
          category: {
            name: string;
          };
        }[];
      }[];
    }[];
  }[];
}
export type ITestsData = ITests | null;
export function getTests(token: string) {
  const config = createConfig(token);
  return axios.get<ITestsData>(`${BASE_URL}/tests`, config);
}
