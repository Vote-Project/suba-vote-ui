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
      const response = await axiosInstance.get(`/organizers?filters[Date_of_Birth][$containsi]=${birthday}&sort[0]=createdAt:desc`)
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

  getOrganizersByDistrictId: async (districtId, page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[District][$eq]=${districtId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersBySeatId: async (seatId, page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Seat][$eq]=${seatId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByGnDivisionId: async (gnId, page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[GN_Division][$eq]=${gnId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByLocalAuthorityId: async (localAuthId, page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Local_Authority][$eq]=${localAuthId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByWardId: async (wardId, page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Ward][$eq]=${wardId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrganizersByStreetId: async (streetId, page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(`/organizers?filters[Street_Village][$eq]=${streetId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
