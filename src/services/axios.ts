import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// function createConfig(token: string) {
//   return { headers: { Authorization: `Bearer ${token}` } };
// }

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
