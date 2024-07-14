
export type AmenityType = {
  _id?: string
  title: string
  status: boolean
}

export type DubaiDeveloperType = {
  _id?: string
  title: string
  status: boolean
  image: string | File | null
}

export type DubaiAreaType = {
  _id?: string
  title: string
  status: boolean
}

export type SubscriberType = {
  _id?: string
  email: string
  name: string
  status: boolean
}

export type AgentType = {
  _id?: string
  email: string
  name: string
  status: boolean
  image: string | File | null
  phone: string
  biography: string
  designation: string
  languages: string
}

export type PageType = {
  _id?: string
  title: string
  description: string
  meta: string
  image: string | File | null
}

export type BlogType = {
  _id?: string
  title: string
  description: string
  meta: string
  image: string | File | null
  createdAt?: string
}

export type AdminLogType = {
  _id?: string
  email: string
  createdAt?: string
}

export type PropertyType = {
  _id?: string
  type: string
  title: string
  propertyType: string
  googleMap: string
  price: number
  beds: number
  baths: number
  size: number
  furnishedType: string
  propertyAgent: string
  bannerImage: string | File | null
  thumbnailImages: string[] | File[] | null
  videoUrl: string
  featured: string
  status: boolean
  meta: string
  description: string
  createdAt?: string
}