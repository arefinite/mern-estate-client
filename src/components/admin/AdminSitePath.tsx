import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

interface SitePathProps {
  items: boolean
  prevLink?: string
  prevName?: string
  currentPage: string
}

const AdminSitePath = ({
  items,
  prevLink,
  prevName,
  currentPage,
}: SitePathProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to='/admin/dashboard'>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items && (
          <>
            <BreadcrumbItem>
              <Link to={prevLink!}>
                {prevName}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default AdminSitePath