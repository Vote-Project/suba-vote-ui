import { axiosInstance } from '../common/AxiosInstance'

export const OrganizersService = {
  getOrganizers: async (page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getOrganizersByBirthday: async (birthday) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Date_of_Birth][$eq]=${birthday}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getOrganizersByOrganizerCategory: async (OrganizerCategory) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Organizer_Category][$eq]=${OrganizerCategory}&sort[0]=createdAt:desc`)
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
        query = query + `filters[${filter.key}][$containsi]=${filter.value}&`
      })
      const response = await axiosInstance.get(`/organizers?pagination[page]=${page}&pagination[pageSize]=${pageSize}&${query}sort[0]=createdAt:desc`)
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

  getOrganizersByDistrictId: async (districtId) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[District][$eq]=${districtId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersBySeatId: async (seatId) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Seat][$eq]=${seatId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByGnDivisionId: async (gnId) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[GN_Division][$eq]=${gnId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByLocalAuthorityId: async (localAuthId) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Local_Authority][$eq]=${localAuthId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByWardId: async (wardId) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Ward][$eq]=${wardId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByStreetId: async (streetId) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Street_Village][$eq]=${streetId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
