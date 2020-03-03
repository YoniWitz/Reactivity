import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/acitivity';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const activitiesUrl = '/activities'

const Activities = {
    list: (): Promise<IActivity[]> => requests.get(activitiesUrl),
    details: (id: string): Promise<IActivity> => requests.get(`${activitiesUrl}/${id}`),
    update: (id: string, activity: IActivity): Promise<IActivity> => requests.put(`${activitiesUrl}/${id}`, activity),
    create: (activity: IActivity): Promise<IActivity> => requests.post(activitiesUrl, activity),
    delete: (id: string) => axios.delete(`${activitiesUrl}/${id}`)
}

export default { Activities };