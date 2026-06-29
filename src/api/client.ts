import axios from 'axios'
import { API_BASE_URL, AUTH_TOKEN_KEY } from '../utils/constants'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
    const message = error.response?.data?.message ?? error.message ?? 'Erro inesperado'
    return Promise.reject(new Error(message))
  },
)

export default apiClient
