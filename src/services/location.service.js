import { algoAxiosInstance } from '../common/AxiosInstance'

export const LocationService = {
  getDistricts: async () => {
    try {
      const response = await algoAxiosInstance.get('/districts') 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getDistrictById: async (id) => {
    try {
      const response = await algoAxiosInstance.get(`/districts/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getSeatsByDistrictId: async (districtId) => {
    try {
      const response = await algoAxiosInstance.get(`/seats?filters[District_Id][$eq]=${districtId}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getSeatById: async (id) => {
    try {
      const response = await algoAxiosInstance.get(`/seats/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getLocalAuthoritiesBySeatId: async (seatId) => {
    try {
      const response = await algoAxiosInstance.get(`/local-authorities?filters[Seat_Id][$eq]=${seatId}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getLocalAuthorityById: async (id) => {
    try {
      const response = await algoAxiosInstance.get(`/local-authorities/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getWardsByLocalAuthorityId: async (localAuthorityId) => {
    try {
      const response = await algoAxiosInstance.get(`/wards?filters[Local_Authority_Id][$eq]=${localAuthorityId}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getWardById: async (id) => {
    try {
      const response = await algoAxiosInstance.get(`/wards/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getGnDivisionsByWardId: async (wardId) => {
    try {
      const response = await algoAxiosInstance.get(`/gn-divisions?filters[Ward_Id][$eq]=${wardId}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  
  getGnDivisionById: async (id) => {
    try {
      const response = await algoAxiosInstance.get(`/gn-divisions/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getStreetsByGnDivisionId: async (gnDivisionId) => {
    try {
      const response = await algoAxiosInstance.get(`/village-streets?filters[GN_Division_Id][$eq]=${gnDivisionId}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  getStreetById: async (id) => {
    try {
      const response = await algoAxiosInstance.get(`/village-streets/${id}`) 
      return response.data
    } catch (error) {
      throw error
    }
  },
}
