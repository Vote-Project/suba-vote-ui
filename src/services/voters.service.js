import { axiosInstance } from '../common/AxiosInstance'

export const votersService = {
  getVoters: async () => {
    try {
      const response = await axiosInstance.get('/voters') 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getVoter: async (id) => {
    try {
      const response = await axiosInstance.get(`/voters/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  addVoter: async (data) => {
    try {
      const response = await axiosInstance.post('/voters', data) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateVoter: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/voters/${id}`, data) 
      return response.data
    } catch (error) {
      throw error
    }
  },
}
