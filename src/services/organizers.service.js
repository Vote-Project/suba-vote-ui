import { axiosInstance } from '../common/AxiosInstance'

export const OrganizersService = {
  getOrganizers: async () => {
    try {
      const response = await axiosInstance.get('/organizers') 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizer: async (id) => {
    try {
      const response = await axiosInstance.get(`/organizers${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  addOrganizer: async (data) => {
    try {
      const response = await axiosInstance.post('/organizers', data) 
      return response.data
    } catch (error) {
      throw error
    }
  },
  updateOrganizer: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/organizers/${id}`, data) 
      return response.data
    } catch (error) {
      throw error
    }
  },
}
