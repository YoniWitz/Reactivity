import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/IAcitivity';
import { IUser, ILoginUser, IRegisterUser } from '../models/IUser';
import { history } from '../../index';
import { toast } from 'react-toastify';

axios.defaults.baseURL = "http://localhost:5000/api";

let localStorageUser: IUser;

axios.interceptors.request.use(config => {
    localStorageUser = JSON.parse(window.localStorage.getItem('user')!);
    if (localStorageUser) {
        const token = localStorageUser.token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error))

axios.interceptors.response.use(undefined, (error) => {
    console.log(error)
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!', { autoClose: false })
    }
    else {
        const { status, config, data, statusText, headers } = error.response;

        //login errors
        if (status === 404 && !localStorageUser) {
            toast.error('Username and password not found');
        }
        else if (status === 400) {
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/notfound');
            }
            //registration errors
            else if (statusText === 'Bad Request' && config.method === "post") {
                data.map((error: string) => toast.error(error, { autoClose: false }))
            }
            //bad update request
            else if (config.method === 'put' && statusText === "Bad Request") {
                toast.error(data);
            }
        }

        else if (status === 500) {
            toast.error('Server error - check terminal for more info')
        }
        //unauthorized errors
        else if (status === 401) {
            if (headers['www-authenticate'].includes('Bearer error="invalid_token", error_description="The token expired')){
                window.localStorage.removeItem('user');
                window.location.reload();
                toast.error('Session expired, Please Login Again');
            }
        }      
    }
    throw error.response;
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