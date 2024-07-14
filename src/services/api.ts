


import { AdminLogType, AgentType, AmenityType, BlogType, DubaiAreaType, DubaiDeveloperType, PropertyType, SubscriberType } from '@/types/types'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

export const apiClient = axios.create({ baseURL })

// Amenity API
export const getAmenities = async () => {
  return (await axios.get<AmenityType[]>(`${baseURL}/amenities/get-amenities`)).data
}

export const getAmenity = async (id: string) => {
  return (await axios.get<AmenityType>(`${baseURL}/amenities/${id}`)).data
}

export const createAmenity = async (data: AmenityType) => {
  return (await axios.post<AmenityType>(`${baseURL}/amenities/create-amenity`, data))
}

export const updateAmenity = async (id: string, data: AmenityType) => {
  return (await axios.patch<AmenityType>(`${baseURL}/amenities/${id}`, data))
}

export const deleteAmenity = async (id: string) => {
  return (await axios.delete(`${baseURL}/amenities/${id}`))
}

// Dubai Developer API

export const getDubaiDevelopers = async () => {
  return (await axios.get<DubaiDeveloperType[]>(`${baseURL}/dubai-developers/get-dubai-developers`)).data
}

export const getDubaiDeveloper = async (id: string) => {
  return (await axios.get<DubaiDeveloperType>(`${baseURL}/dubai-developers/${id}`)).data
}

export const createDubaiDeveloper = async (formData: FormData) => {
  return (await axios.post(`${baseURL}/dubai-developers/create-dubai-developer`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const updateDubaiDeveloper = async (id: string, formData: FormData) => {
  return (await axios.patch(`${baseURL}/dubai-developers/${id}`, formData), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  
  })
}

export const deleteDubaiDeveloper = async (id: string) => {
  return (await axios.delete(`${baseURL}/dubai-developers/${id}`))
}

// Dubai Area API
export const getDubaiAreas = async () => {
  return (await axios.get<DubaiAreaType[]>(`${baseURL}/dubai-areas/get-dubai-areas`)).data
}

export const getDubaiArea = async (id: string) => {
  return (await axios.get<DubaiAreaType>(`${baseURL}/dubai-areas/${id}`)).data
}

export const createDubaiArea = async (data: DubaiAreaType) => {
  return (await axios.post<DubaiAreaType>(`${baseURL}/dubai-areas/create-dubai-area`, data))
}

export const updateDubaiArea = async (id: string, data: DubaiAreaType) => {
  return (await axios.patch<DubaiAreaType>(`${baseURL}/dubai-areas/${id}`, data))
}

export const deleteDubaiArea = async (id: string) => {
  return (await axios.delete(`${baseURL}/dubai-areas/${id}`))
}

// Subscriber API
export const getSubscribers = async () => {
  return (await axios.get<SubscriberType[]>(`${baseURL}/subscribers/get-subscribers`)).data
}

export const getSubscriber = async (id: string) => {
  return (await axios.get<SubscriberType>(`${baseURL}/subscribers/${id}`)).data
}

export const createSubscriber = async (data: SubscriberType) => {
  return (await axios.post<SubscriberType>(`${baseURL}/subscribers/create-subscriber`, data))
}

export const deleteSubscriber = async (id: string) => {
  return (await axios.delete(`${baseURL}/subscribers/${id}`))
}

export const updateSubscriber = async (id: string, data: SubscriberType) => {
  return (await axios.patch<SubscriberType>(`${baseURL}/subscribers/${id}`, data))
}

// Agent API
export const getAgents = async () => {
  return (await axios.get<AgentType[]>(`${baseURL}/agents/get-agents`)).data
}

export const getAgent = async (id: string) => {
  return (await axios.get<AgentType>(`${baseURL}/agents/${id}`)).data
}

export const createAgent = async (formData: FormData) => {
  return (await axios.post(`${baseURL}/agents/create-agent`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const updateAgent = async (id: string, formData: FormData) => {
  return (await axios.patch(`${baseURL}/agents/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const deleteAgent = async (id: string) => {
  return (await axios.delete(`${baseURL}/agents/${id}`))
}

// Page API (about us)
export const getPageAbout = async () => {
  return (await axios.get(`${baseURL}/pages/about-page`)).data
}

export const createPageAbout = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/about-page`, formData))
}

export const updatePageAbout = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/about-page`, formData))
}

// Page API (about us)
export const getPageWhyDubai = async () => {
  return (await axios.get(`${baseURL}/pages/why-dubai-page`)).data
}

export const createPageWhyDubai = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/why-dubai-page`, formData))
}

export const updatePageWhyDubai = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/why-dubai-page`, formData))
}

// Page API (invest dubai  estate)
export const getPageInvestDubaiEstate= async () => {
  return (await axios.get(`${baseURL}/pages/invest-dubai-estate`)).data
}

export const createPageInvestDubaiEstate = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/invest-dubai-estate`, formData))
}

export const updatePageInvestDubaiEstate = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/invest-dubai-estate`, formData))
}

// Page API (dubai fact numbers)
export const getPageDubaiFactNumbers = async () => {
  return (await axios.get(`${baseURL}/pages/dubai-fact-numbers`)).data
}

export const createPageDubaiFactNumbers = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/dubai-fact-numbers`, formData))
}

export const updatePageDubaiFactNumbers = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/dubai-fact-numbers`, formData))
}

// Page API (why invest off plan)
export const getPageWhyInvestOffPlan = async () => {
  return (await axios.get(`${baseURL}/pages/why-invest-off-plan`)).data
}

export const createPageWhyInvestOffPlan = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/why-invest-off-plan`, formData))
}

export const updatePageWhyInvestOffPlan = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/why-invest-off-plan`, formData))
}

// Page API (guide on renting)
export const getPageGuideOnRenting = async () => {
  return (await axios.get(`${baseURL}/pages/guide-on-renting`)).data
}

export const createPageGuideOnRenting = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/guide-on-renting`, formData))
}

export const updatePageGuideOnRenting = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/guide-on-renting`, formData))
}

// Page API (guide to selling)
export const getPageGuideToSelling = async () => {
  return (await axios.get(`${baseURL}/pages/guide-to-selling`)).data
}

export const createPageGuideToSelling = async (formData:FormData) => {
  return (await axios.post(`${baseURL}/pages/guide-to-selling`, formData))
}

export const updatePageGuideToSelling = async (formData: FormData) => {
  return (await axios.patch(`${baseURL}/pages/guide-to-selling`, formData))
}

// Blog API
export const getBlogs = async () => {
  return (await axios.get<BlogType[]>(`${baseURL}/blogs/get-blogs`)).data
}

export const getBlog = async (id: string) => {
  return (await axios.get<BlogType>(`${baseURL}/blogs/${id}`)).data
}

export const createBlog = async (formData: FormData) => {
  return (await axios.post(`${baseURL}/blogs/create-blog`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const updateBlog = async (id: string, formData: FormData) => {
  return (await axios.patch(`${baseURL}/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const deleteBlog = async (id: string) => {
  return (await axios.delete(`${baseURL}/blogs/${id}`))
}

// Settings (update password)
export const updatePassword = async ( {newPassword}:{newPassword: string} ) => {
  return (await axios.patch(`${baseURL}/settings/update-password`, {newPassword}))
}

// admin logs
export const createLog = async () => {
  return (await axios.post(`${baseURL}/logs/create-log`))
}

export const getLogs = async () => {
  return (await axios.get<AdminLogType[]>(`${baseURL}/logs/get-logs`)).data
}

// Property API
export const createProperty = async (formData: FormData) => {
  return (await axios.post(`${baseURL}/properties/create-property`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const getProperties = async () => {
  return (await axios.get<PropertyType[]>(`${baseURL}/properties/get-properties`)).data
}

export const getProperty = async (id: string) => {
  return (await axios.get<PropertyType>(`${baseURL}/properties/${id}`)).data
}

export const updateProperty = async (id: string, formData: FormData) => {
  return (await axios.patch(`${baseURL}/properties/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}

export const deleteProperty = async (id: string) => {
  return (await axios.delete(`${baseURL}/properties/${id}`))
}