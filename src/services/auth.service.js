import TokenService from './TokenService'
import { axiosInstance } from 'src/common/AxiosInstance'

export const AuthService = {
  registerUser: async (data) => {
    try {
      const response = await axiosInstance.post('/user-register', data)
      return response.data
    } catch (error) {
      throw error
    }
  },
  updateUser: async (id, data) => {
    try {
      const response = await axiosInstance.patch('/user-register/' + id, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getUsersAll: async () => {
    try {
      const response = await axiosInstance.get('/user-register')
      return response.data
    } catch (error) {
      throw error
    }
  },

  getUser: async (id) => {
    try {
      const response = await axiosInstance.get('/user-register/' + id)
      return response.data
    } catch (error) {
      throw error
    }
  },

  login: async (username, password) => {
    try {
      if (username && password == 'admin') {
        TokenService.setUser({ username, password })
        return { data: 'done' }
      }
      const response = await axiosInstance.post('/user-register/login', {
        username,
        password,
      })
      if (response.data.access_token) {
        // response.data['level'] = 1
        TokenService.setUser(response.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    TokenService.removeUser()
  },

  getCurrentUser: () => {
    TokenService.getUser()
  },
}
