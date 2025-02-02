import { useSelector } from "react-redux"
import { AppSidebar } from "../ui/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar"

export default function Sidebar({ children }) {
  const { user } = useSelector(store => store.auth);
  const navData = user.role === "instructor" ? [
    {
      title: "Dashboard",
      url: "/instructor/dashboard",
    },
    {
      title: "Profile",
      url: "/profile/account",
      items: [
        { title: "Account Settings", url: "/profile/account" },
        { title: "Earnings & Payouts", url: "/instructor/earnings" },
      ],
    },
    {
      title: "My Courses",
      url: "/instructor/courses",
      items: [
        { title: "Manage Courses", url: "/instructor/courses/manage" },
        { title: "Create New Course", url: "/instructor/courses/create" },
      ],
    },
    {
      title: "Support",
      url: "/support",
      items: [
        { title: "FAQs", url: "/support/faqs" },
        { title: "Contact Support", url: "/support/contact" },
      ],
    },
  ] : [
    {
      title: "Dashboard",
      url: "/profile",
    },
    {
      title: "Profile",
      url: "/profile/learning",
      items: [
        { title: "My Learning", url: "/profile/learning" },
        { title: "Account Settings", url: "/profile/account" },
      ],
    },
    {
      title: "Courses",
      url: "/courses/browse",
      items: [
        { title: "Course History", url: "/courses/completed" },
        { title: "Browse Courses", url: "/courses/browse" },
      ],
    },
    {
      title: "Support",
      url: "/support/contact",
      items: [
        { title: "FAQs", url: "/support/faqs" },
        { title: "Contact Support", url: "/support/contact" },
      ],
    },
  ];


  return (
    <SidebarProvider>
      <AppSidebar navData={navData} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger></SidebarTrigger>
          <Separator orientation="vertical" className="hidden md:block h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/profile">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          {children}
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}
