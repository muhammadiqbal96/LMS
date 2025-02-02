import * as React from "react"
import { NavUser } from "./nav-user"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function AppSidebar({ navData, ...props }) {
    const { user } = useSelector(store => store.auth);
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/" className="flex items-center gap-2">
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 group"
                                    onClick={() => setActiveLink("/")}
                                >
                                    <img
                                        src="/flow.png"
                                        alt="EduFlow Logo"
                                        className="h-9 w-11 transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="flex flex-col leading-none">
                                        <span className="text-xl font-bold bg-gradient-to-r from-[#395972] to-[#2a4357] bg-clip-text text-transparent">
                                            EduFlow
                                        </span>
                                        <span className="text-xs text-gray-400">Learn, Grow, Succeed</span>
                                    </div>
                                </Link>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navData.map((section) => (
                            <SidebarMenuItem key={section.title}>
                                <SidebarMenuButton asChild>
                                    <Link to={section.url} className="font-medium">
                                        {section.title}
                                    </Link>
                                </SidebarMenuButton>
                                {section.items?.length > 0 && (
                                    <SidebarMenuSub>
                                        {section.items.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                                    <Link to={subItem.url}>{subItem.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
