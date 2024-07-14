import AdminLayout from '@/layouts/AdminLayout'
import RootLayout from '@/layouts/RootLayout'
import {
  AdminHome,
  AdminLogin,
  AdminLogs,
  CreateAgent,
  CreateAmenity,
  CreateBlog,
  CreateDubaiArea,
  CreateDubaiDeveloper,
  CreateProperty,
  CreateSubscriber,
  DetailsAgent,
  Error,
  Home,
  ManageAgents,
  ManageAmenities,
  ManageBlogs,
  ManageDubaiAreas,
  ManageDubaiDevelopers,
  ManageOffPlanProjects,
  ManageProperties,
  ManageSubscribers,
  PageAboutUs,
  PageDubaiFactNumbers,
  PageGuideOnRenting,
  PageGuideToSelling,
  PageInvestDubaiRealEstate,
  PagePrivacyPolicy,
  PageWhyDubaI,
  PageWhyInvestInOffPlan,
  Settings,
  UpdateAgent,
  UpdateAmenity,
  UpdateBlog,
  UpdateDubaiArea,
  UpdateDubaiDeveloper,
  UpdateProperty,
  UpdateSubscriber,
} from '@/pages'
import {
  getAgent,
  getAmenity,
  getBlog,
  getDubaiArea,
  getDubaiDeveloper,
  getProperty,
  getSubscriber,
} from '@/services/api'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: 'dashboard',
        element: <AdminHome />,
      },
      {
        path: 'manage-properties',
        element: <ManageProperties />,
      },
      {
        path: 'create-property',
        element: <CreateProperty />,
      },
      {
        path: 'update-property/:id',
        element: <UpdateProperty />,
        loader: ({ params }) => getProperty(params.id!),
      },
      {
        path: 'manage-blogs',
        element: <ManageBlogs />,
      },
      {
        path: 'create-blog',
        element: <CreateBlog />,
      },
      {
        path: 'update-blog/:id',
        element: <UpdateBlog />,
        loader: ({ params }) => getBlog(params.id!),
      },
      {
        path: 'manage-amenities',
        element: <ManageAmenities />,
      },
      {
        path: 'create-amenity',
        element: <CreateAmenity />,
      },
      {
        path: 'update-amenity/:id',
        element: <UpdateAmenity />,
        loader: ({ params }) => getAmenity(params.id!),
      },
      {
        path: 'manage-off-plan-projects',
        element: <ManageOffPlanProjects />,
      },
      {
        path: 'manage-subscribers',
        element: <ManageSubscribers />,
      },
      {
        path: 'manage-dubai-developers',
        element: <ManageDubaiDevelopers />,
      },
      {
        path: 'create-dubai-developer',
        element: <CreateDubaiDeveloper />,
      },
      {
        path: 'update-dubai-developer/:id',
        element: <UpdateDubaiDeveloper />,
        loader: ({ params }) => getDubaiDeveloper(params.id!),
      },
      {
        path: 'manage-dubai-areas',
        element: <ManageDubaiAreas />,
      },
      {
        path: 'create-dubai-area',
        element: <CreateDubaiArea />,
      },
      {
        path: 'update-dubai-area/:id',
        element: <UpdateDubaiArea />,
        loader: ({ params }) => getDubaiArea(params.id!),
      },
      {
        path: 'page-about-us',
        element: <PageAboutUs />,
      },
      {
        path: 'page-dubai-fact-numbers',
        element: <PageDubaiFactNumbers />,
      },
      {
        path: 'page-privacy-policy',
        element: <PagePrivacyPolicy />,
      },
      {
        path: 'page-guide-on-renting',
        element: <PageGuideOnRenting />,
      },

      {
        path: 'page-guide-to-selling',
        element: <PageGuideToSelling />,
      },
      {
        path: 'page-invest-dubai-real-estate',
        element: <PageInvestDubaiRealEstate />,
      },
      {
        path: 'page-why-dubai',
        element: <PageWhyDubaI />,
      },
      {
        path: 'page-why-invest-in-off-plan',
        element: <PageWhyInvestInOffPlan />,
      },
      {
        path: 'manage-agents',
        element: <ManageAgents />,
      },
      {
        path: 'create-agent',
        element: <CreateAgent />,
      },
      {
        path: 'update-agent/:id',
        element: <UpdateAgent />,
        loader: ({ params }) => getAgent(params.id!),
      },
      {
        path: 'details-agent/:id',
        element: <DetailsAgent />,
        loader: ({ params }) => getAgent(params.id!),
      },
      {
        path: 'manage-subscribers',
        element: <ManageSubscribers />,
      },
      {
        path: 'create-subscriber',
        element: <CreateSubscriber />,
      },
      {
        path: 'update-subscriber/:id',
        element: <UpdateSubscriber />,
        loader: ({ params }) => getSubscriber(params.id!),
      },
      {
        path: 'admin-logs',
        element: <AdminLogs />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: 'admin/login',
    element: <AdminLogin />,
  }
])
