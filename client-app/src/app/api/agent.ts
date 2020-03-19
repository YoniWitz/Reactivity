import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/IAcitivity';
import { IUser, ILoginUser, IRegisterUser } from '../models/IUser';
import { history } from '../../index';
import { toast } from 'react-toastify';

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
    const { status, config, data } = error.response;
    if ([404].includes(status)) {
        history.push('/notfound');
    }
    else if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    else if (status === 500) {
        toast.error('Server error - check terminal for more ingo')
    }
    
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const activitiesUrl = '/activities';

const Activities = {
    list: (): Promise<IActivity[]> => requests.get(activitiesUrl),
    details: (id: string): Promise<IActivity> => requests.get(`${activitiesUrl}/${id}`),
    update: (id: string, activity: IActivity): Promise<IActivity> => requests.put(`${activitiesUrl}/${id}`, activity),
    create: (activity: IActivity): Promise<IActivity> => requests.post(activitiesUrl, activity),
    delete: (id: string) => axios.delete(`${activitiesUrl}/${id}`)
}

const usersUrl = '/appusers';
const Users = {
    login: (loginUser: ILoginUser): Promise<IUser> => requests.post(`${usersUrl}/login`, loginUser),
    register: (registerUser: IRegisterUser): Promise<IUser> => requests.post(`${usersUrl}/register`, registerUser)
}

export default {
    Activities,
    Users
}