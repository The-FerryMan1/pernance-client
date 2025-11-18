import axios from 'axios'

export const useAxios = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
})
