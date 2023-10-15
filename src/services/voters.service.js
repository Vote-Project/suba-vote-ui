import { axiosInstance } from '../common/AxiosInstance'

export const votersService = {
  getVoters: async (page = 1, pageSize = 10) => {
    try {
      const response = await axiosInstance.get(`/voters?pagination[page]=${page}&pagination[pageSize]=${pageSize}`) 
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

  getVotersByFiltering: async (page = 1, pageSize = 10, filters) => {
    try {
      let query = ""
      filters.map((filter) => {
        query = query + `filters[${filter.key}][$containsi]=${filter.value}`
      })
      const response = await axiosInstance.get(`/voters?pagination[page]=${page}&pagination[pageSize]=${pageSize}&${query}`) 
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
