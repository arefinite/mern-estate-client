import { useQuery } from "@tanstack/react-query"
import {  getAgent, getAgents, getAmenities, getAmenity, getBlog, getBlogs, getDubaiArea, getDubaiAreas, getDubaiDeveloper, getDubaiDevelopers, getLogs, getPageAbout, getPageDubaiFactNumbers, getPageGuideOnRenting, getPageGuideToSelling, getPageInvestDubaiEstate, getPageWhyDubai, getPageWhyInvestOffPlan, getProperties, getProperty, getSubscriber, getSubscribers } from "./api"

// Amenities API
export const useGetAmenities = () => { 
  return useQuery({
    queryKey: ['amenities'],
    queryFn: getAmenities
  })
}

export const useGetAmenity = (id: string) => {
  return useQuery({
    queryKey: ['amenity', id],
    queryFn: () => getAmenity(id)
  })
}

// Dubai Developer API
export const useGetDubaiDevelopers = () => { 
  return useQuery({
    queryKey: ['dubai-developers'],
    queryFn: getDubaiDevelopers
  })
}

export const useGetDubaiDeveloper = (id: string) => {
  return useQuery({
    queryKey: ['dubai-developer', id],
    queryFn: () => getDubaiDeveloper(id)
  })
}

// Dubai Area API
export const useGetDubaiAreas = () => {
  return useQuery({
    queryKey: ['dubai-areas'],
    queryFn: getDubaiAreas
  })
}

export const useGetDubaiArea = (id: string) => {
  return useQuery({
    queryKey: ['dubai-area', id],
    queryFn: () => getDubaiArea(id)
  })
}

// Subscribers API
export const useGetSubscribers = () => {
  return useQuery({
    queryKey: ['subscribers'],
    queryFn: getSubscribers
  })
}

export const useGetSubscriber = (id: string) => {
  return useQuery({
    queryKey: ['subscriber', id],
    queryFn: () => getSubscriber(id)
  })
}

// Agents API
export const useGetAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: getAgents
  })
}

export const useGetAgent = (id: string) => {
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => getAgent(id)
  })
}

// Page API (about us)
export const useGetPageAbout = () => {
  return useQuery({
    queryKey: ['about-page'],
    queryFn: getPageAbout
  })
}

// Page API (why dubai)
export const useGetPageWhyDubai = () => {
  return useQuery({
    queryKey: ['why-dubai-page'],
    queryFn: getPageWhyDubai
  })
}

// Page API (invest dubai estate)
export const useGetPageInvestDubaiEstate = () => {
  return useQuery({
    queryKey: ['invest-dubai-estate-page'],
    queryFn: getPageInvestDubaiEstate
  })
}

// Page API (dubai fact numbers)
export const useGetPageDubaiFactNumbers = () => {
  return useQuery({
    queryKey: ['dubai-fact-numbers-page'],
    queryFn: getPageDubaiFactNumbers
  })
}

// Page API (why invest off plan)
export const useGetPageWhyInvestOffPlan = () => {
  return useQuery({
    queryKey: ['why-invest-off-plan-page'],
    queryFn: getPageWhyInvestOffPlan
  })
}

// Page API (guide on renting)
export const useGetPageGuideOnRenting = () => {
  return useQuery({
    queryKey: ['guide-on-renting-page'],
    queryFn: getPageGuideOnRenting
  })
}

// Page API (guide to selling)
export const useGetPageGuideToSelling = () => {
  return useQuery({
    queryKey: ['guide-to-selling-page'],
    queryFn: getPageGuideToSelling
  })
}

// Blog API
export const useGetBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })
}

export const useGetBlog = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id)
  })
}

// Admin Logs
export const useGetAdminLogs = () => {
  return useQuery({
    queryKey: ['admin-logs'],
    queryFn: getLogs
  })
}

// Property API
export const useGetProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: getProperties
  })
}

export const useGetProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id)
  })
}