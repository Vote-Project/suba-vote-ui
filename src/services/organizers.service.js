import { axiosInstance } from '../common/AxiosInstance'

export const OrganizersService = {
  getOrganizers: async (page = 1, pageSize = 10) => {
    try {
      const response = await axiosInstance.get(`/organizers?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizer: async (id) => {
    try {
      const response = await axiosInstance.get(`/organizers/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getOrganizersByFiltering: async (page = 1, pageSize = 10, filters) => {
    try {
      let query = ''
      filters.map((filter) => {
        query = query + `filters[${filter.key}][$containsi]=${filter.value}`
      })
      const response = await axiosInstance.get(`/organizers?pagination[page]=${page}&pagination[pageSize]=${pageSize}&${query}`)
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
