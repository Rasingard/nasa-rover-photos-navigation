import axios, { AxiosRequestConfig } from 'axios';

const api_key = 'hYrwyVc4WLWyREksdqTAg11gdbYa4c52XpVSubLP';

export const HTTP = axios.create({
  baseURL: `https://api.nasa.gov/mars-photos/api/v1/`,
  params: {api_key}
});

export const API = {
  getManifest: (roverName:string, params?:AxiosRequestConfig) => {
    return HTTP.get(`manifests/${roverName}`, params).then(({data}) => data);
  },

  getRoverPhotos: (roverName:string, params?:any) => {
    return HTTP.get(`rovers/${roverName}/photos`, {params}).then(({data}) => data);
  }
}