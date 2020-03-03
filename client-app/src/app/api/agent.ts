import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/acitivity';

axios.defaults.baseURL = "http://localhost:5002/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: IActivity) => axios.post(url, body).then(responseBody),
    put: (url: string, body: IActivity) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const activitiesUrl = '/activities';

const Activities = {
    list: () => requests.get(activitiesUrl),
    details: (id: string) => requests.get(`${activitiesUrl}/${id}`),
    update: (id: string, activity: IActivity) => requests.put(`${activitiesUrl}/${id}`, activity),
    create: (activity: IActivity) => requests.post(activitiesUrl, activity),
    delete: (id: string) => axios.delete('${activitiesUrl}/${id}')
}
