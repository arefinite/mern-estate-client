import {
  Building2,
  CircleUser,
  FileClock,
  Gauge,
  Landmark,
  LandPlot,
  Layers2,
  Lock,
  Menu,
  Rss,
  // School,
  Settings,
  ShieldCheck,
  StickyNote,
  Users,
  WashingMachine,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {  NavLink, Outlet, useNavigate } from 'react-router-dom'
import useDateTime from '@/hooks/useDateTime'

const AdminLayout = () => {
  const navigate = useNavigate()
  const { date, time } = useDateTime()
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <NavLink
              to='/admin/dashboard'
              className='flex items-center gap-2 font-semibold'
            >
              <Lock className='h-6 w-6' />
              <h1 className='font-bold'>Admin Dashboard</h1>
            </NavLink>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <NavLink
                to='/admin/dashboard'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Gauge className='h-4 w-4' />
                Dashboard
              </NavLink>
              <NavLink
                to='manage-properties'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Landmark className='h-4 w-4' />
                Properties
              </NavLink>
              {/* <NavLink
                to='manage-off-plan-projects'
                className='flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <School className='h-4 w-4' />
                Off Plan Projects
              </NavLink> */}
              <NavLink
                to='manage-dubai-areas'
                className='flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <LandPlot className='h-4 w-4' />
                Dubai Areas
              </NavLink>
              <NavLink
                to='manage-amenities'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <WashingMachine className='h-4 w-4' />
                Amenities
              </NavLink>
              <NavLink
                to='manage-agents'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Users className='h-4 w-4' />
                Agents
              </NavLink>
              <NavLink
                to='manage-subscribers'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <ShieldCheck className='h-4 w-4' />
                Subscribers
              </NavLink>
              <NavLink
                to='manage-dubai-developers'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Building2 className='h-4 w-4' />
                Dubai Developers
              </NavLink>
              <NavLink
                to='manage-blogs'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Rss className='h-4 w-4' />
                Blogs
              </NavLink>
              {/* page management starts */}
              <Accordion type='single' collapsible className='space-y-4'>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>
                    <li className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                      <StickyNote className='h-4 w-4' />
                      Page Management
                    </li>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className='ml-2'>
                      <li>
                        <NavLink to='page-about-us'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            About Us
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='page-why-dubai'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            Why Dubai
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='page-invest-dubai-real-estate'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            Invest in Dubai Real-Estate
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='page-dubai-fact-numbers'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            Dubai Fact Numbers
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='page-why-invest-in-off-plan'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            Why Invest in Off Plan
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='page-guide-on-renting'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            Guide on Renting
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='page-guide-to-selling'>
                          <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                            <Layers2 className='h-4 w-4' />
                            Guide to Selling
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* page management ends */}
              <NavLink
                to='admin-logs'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <FileClock className='h-4 w-4' />
                Admin Logs
              </NavLink>
              <NavLink
                to='settings'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Settings className='h-4 w-4' />
                Settings
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <div className='text-sm'>
                  <SheetClose asChild>
                    <NavLink
                      to='/admin/dashboard'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Gauge className='h-4 w-4' />
                      Dashboard
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='manage-properties'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Landmark className='h-4 w-4' />
                      Properties
                    </NavLink>
                  </SheetClose>
                  {/* <SheetClose asChild>
                    <NavLink
                      to='manage-off-plan-projects'
                      className='flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <School className='h-4 w-4' />
                      Off Plan Projects
                    </NavLink>
                  </SheetClose> */}
                  <SheetClose asChild>
                    <NavLink
                      to='manage-dubai-areas'
                      className='flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <LandPlot className='h-4 w-4' />
                      Dubai Areas
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='manage-amenities'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <WashingMachine className='h-4 w-4' />
                      Amenities
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='manage-agents'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Users className='h-4 w-4' />
                      Agents
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='manage-subscribers'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <ShieldCheck className='h-4 w-4' />
                      Subscribers
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='manage-dubai-developers'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Building2 className='h-4 w-4' />
                      Dubai Developers
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='manage-blogs'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Rss className='h-4 w-4' />
                      Blogs
                    </NavLink>
                  </SheetClose>
                  {/* page management starts */}
                  <Accordion type='single' collapsible className='space-y-4'>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>
                        <li className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                          <StickyNote className='h-4 w-4' />
                          Page Management
                        </li>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className='ml-2'>
                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-about-us'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  About Us
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-why-dubai'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  Why Dubai
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-invest-dubai-real-estate'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  Invest in Dubai Real-Estate
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-dubai-fact-numbers'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  Dubai Fact Numbers
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-why-invest-in-off-plan'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  Why Invest in Off Plan
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-guide-on-renting'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  Guide on Renting
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <NavLink to='page-guide-to-selling'>
                                <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                                  <Layers2 className='h-4 w-4' />
                                  Guide to Selling
                                </span>
                              </NavLink>
                            </SheetClose>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* page management ends */}
                  <SheetClose asChild>
                    <NavLink
                      to='admin-logs'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <FileClock className='h-4 w-4' />
                      Admin Logs
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      to='settings'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Settings className='h-4 w-4' />
                      Settings
                    </NavLink>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className='w-full flex-1'>
            {date} | {time}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
             

           
              <DropdownMenuItem onClick={()=>navigate('/admin/login')}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Outlet />
        <div className='text-center mb-4'>
          <p className='text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} by Real-Estate | All Rights Reserved
          </p>
        </div>
        
        
      </div>
      
    </div>
    
  )
}
export default AdminLayout
