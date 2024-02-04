import { axiosInstance } from 'src/common/AxiosInstance'

export const TasksService = {
  getMainTasks: async (page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(
        `/main-tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  getMainTask: async (id) => {
    try {
      const response = await axiosInstance.get(`/main-tasks/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  addMainTask: async (data) => {
    try {
      const response = await axiosInstance.post(`/main-tasks`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
  UpdateMainTask: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/main-tasks/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
  removeMainTasks: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/main-tasks/${id}`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  getSubTasks: async (page = 1, pageSize = 10000000) => {
    try {
      const response = await axiosInstance.get(
        `/organizers-tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  getSubTask: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/organizers-tasks/${id}`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  updateSubTask: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/organizers-tasks/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getSubTasksByMainID: async (mainTaskID) => {
    try {
      const response = await axiosInstance.get(`/organizers-tasks?filters[Task][$eq]=${mainTaskID}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getSubTasksByOrgID: async (orgId) => {
    try {
      const response = await axiosInstance.get(`/organizers-tasks?filters[orId][$eq]=${orgId}&sort[0]=createdAt:desc`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  addSubTask: async (data) => {
    try {
      const response = await axiosInstance.post(`/organizers-tasks`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
  removeSubTasks: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/organizers-tasks/${id}`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}
