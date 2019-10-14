import axios, { AxiosResponse } from 'axios';
import { IUser, IUserFormValues } from '../models/user';
import { IReminder } from '../models/reminder';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
};

const User = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user)
};

const Reminders = {
  list: (): Promise<IReminder[]> => requests.get('/reminder'),
  detail: (id: string) => requests.get(`/reminder${id}`),
  create: (reminder: IReminder) => requests.post('/reminder', reminder),
  update: (reminder: IReminder) =>
    requests.put(`/reminder/${reminder.id}`, reminder),
  delete: (id: string) => requests.del(`/reminder${id}`)
};

export default { User, Reminders };
