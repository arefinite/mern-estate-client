import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createAgent,
  createAmenity,
  createBlog,
  createDubaiArea,
  createDubaiDeveloper,
  createLog,
  createPageAbout,
  createPageDubaiFactNumbers,
  createPageGuideOnRenting,
  createPageGuideToSelling,
  createPageInvestDubaiEstate,
  createPageWhyDubai,
  createPageWhyInvestOffPlan,
  createProperty,
  createSubscriber,
  deleteAgent,
  deleteAmenity,
  deleteBlog,
  deleteDubaiArea,
  deleteDubaiDeveloper,
  deleteProperty,
  deleteSubscriber,
  updateAgent,
  updateAmenity,
  updateBlog,
  updateDubaiArea,
  updateDubaiDeveloper,
  updatePageAbout,
  updatePageDubaiFactNumbers,
  updatePageGuideOnRenting,
  updatePageGuideToSelling,
  updatePageInvestDubaiEstate,
  updatePageWhyDubai,
  updatePageWhyInvestOffPlan,
  updatePassword,
  updateProperty,
  updateSubscriber,
} from './api'
import { AmenityType, DubaiAreaType, SubscriberType } from '@/types/types'

// Amenity API
export const useCreateAmenity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AmenityType) => createAmenity(data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['amenities'] })
      }
    },
  })
}

export const useUpdateAmenity = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AmenityType) => updateAmenity(id, data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['amenities'] })
      }
    },
  })
}

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAmenity(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['amenities'] })
      }
    },
  })
}

// Dubai Developer API
export const useCreateDubaiDeveloper = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createDubaiDeveloper(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['dubai-developers'] })
      }
    },
  })
}

export const useUpdateDubaiDeveloper = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updateDubaiDeveloper(id, formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['dubai-developers'] })
      }
    },
  })
}

export const useDeleteDubaiDeveloper = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDubaiDeveloper(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['dubai-developers'] })
      }
    },
  })
}

// Dubai Area API
export const useCreateDubaiArea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: DubaiAreaType) => createDubaiArea(data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['dubai-areas'] })
      }
    },
  })
}

export const useUpdateDubaiArea = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: DubaiAreaType) => updateDubaiArea(id, data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['dubai-areas'] })
      }
    },
  })
}

export const useDeleteDubaiArea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDubaiArea(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['dubai-areas'] })
      }
    },
  })
}

// Subscriber API
export const useCreateSubscriber = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: SubscriberType) => createSubscriber(data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['subscribers'] })
      }
    },
  })
}

export const useUpdateSubscriber = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: SubscriberType) => updateSubscriber(id, data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['subscribers'] })
      }
    },
  })
}

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSubscriber(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['subscribers'] })
      }
    },
  })
}

// Agent API
export const useCreateAgent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createAgent(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['agents'] })
      }
    },
  })
}

export const useUpdateAgent = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updateAgent(id, formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['agents'] })
      }
    },
  })
}

export const useDeleteAgent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAgent(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['agents'] })
      }
    },
  })
}

// Page API (about us)
export const useCreatePageAbout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageAbout(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['about-page'] })
      }
    },
  })
}

export const useUpdatePageAbout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageAbout(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['about-page'] })
      }
    },
  })
}

// Page API (why dubai)
export const useCreatePageWhyDubai = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageWhyDubai(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['why-dubai-page'] })
      }
    },
  })
}

export const useUpdatePageWhyDubai = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageWhyDubai(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['why-dubai-page'] })
      }
    },
  })
}

// Page API (invest dubai  estate)
export const useCreatePageInvestDubaiEstate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageInvestDubaiEstate(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ['invest-dubai-estate-page'],
        })
      }
    },
  })
}

export const useUpdatePageInvestDubaiEstate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageInvestDubaiEstate(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ['invest-dubai-estate-page'],
        })
      }
    },
  })
}

// Page API (dubai fact numbers)
export const useCreatePageDubaiFactNumbers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageDubaiFactNumbers(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ['dubai-fact-numbers'],
        })
      }
    },
  })
}

export const useUpdatePageDubaiFactNumbers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageDubaiFactNumbers(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ['dubai-fact-numbers'],
        })
      }
    },
  })
}

// Page API (why invest off plan)
export const useCreatePageWhyInvestOffPlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageWhyInvestOffPlan(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ['why-invest-off-plan'],
        })
      }
    },
  })
}

export const useUpdatePageWhyInvestOffPlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageWhyInvestOffPlan(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ['why-invest-off-plan'],
        })
      }
    },
  })
}

// Page API (guide on renting)
export const useCreatePageGuideOnRenting = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageGuideOnRenting(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['guide-on-renting'] })
      }
    },
  })
}

export const useUpdatePageGuideOnRenting = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageGuideOnRenting(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['guide-on-renting'] })
      }
    },
  })
}

// Page API (guide to selling)
export const useCreatePageGuideToSelling = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createPageGuideToSelling(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['guide-to-selling'] })
      }
    },
  })
}

export const useUpdatePageGuideToSelling = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updatePageGuideToSelling(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['guide-to-selling'] })
      }
    },
  })
}

// Blog API
export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createBlog(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['blogs'] })
      }
    },
  })
}

export const useUpdateBlog = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updateBlog(id, formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['blogs'] })
      }
    },
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['blogs'] })
      }
    },
  })
}

//Setting (change password)
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ newPassword }: { newPassword: string }) =>
      updatePassword({ newPassword }),
  })
}

//create log
export const useCreateLog = () => {
  return useMutation({
    mutationFn: () => createLog(),
  })
}


//property API
export const useCreateProperty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createProperty(formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['properties'] })
      }
    },
  })
}

export const useUpdateProperty = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => updateProperty(id, formData),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['properties'] })
      }
    },
  })
}

export const useDeleteProperty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['properties'] })
      }
    },
  })
}