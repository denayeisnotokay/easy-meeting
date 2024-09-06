'use client'

import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from '@nextui-org/react'
import { useState } from "react";
import { usePathname } from "next/navigation";

const gitRepo = '/easy-meeting'

export default function Navbarr() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();

    return <Navbar isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}  maxWidth="full" classNames={{
        base: ['fixed', 'bg-transparent', 'font-heading'],
        menu: ['fixed', 'inset-x-0', 'top-0', 'pt-16', 'px-0', 'gap-0'],
        menuItem: ['transition-colors', 'hover:bg-default-800', 'px-6', 'py-2'],
    }}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden"
            />
            <NavbarBrand>
                <a href={`${gitRepo}/`} className="h-full relative font-title text-3xl">HuddleHub</a>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex" isActive={pathname === "/"}>
                <Link href={`${gitRepo}/`} className="text-default-foreground">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${gitRepo}/create`}>
                <Link href={`${gitRepo}/create`} className="text-default-foreground">
                    Create Meeting
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${gitRepo}/availability`}>
                <Link href={`${gitRepo}/availability`} className="text-default-foreground">
                    My Availability
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${gitRepo}/meetings`}>
                <Link href={`${gitRepo}/meetings`} className="text-default-foreground">
                    My Meetings
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${gitRepo}/login`}>
                <Button as={Link} variant="light" color="primary" href={`${gitRepo}/login`} className="text-md">
                    Log In
                </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${gitRepo}/signup`}>
                <Button as={Link} color="primary" href={`${gitRepo}/signup`} className="text-md">
                    Create Account
                </Button>
            </NavbarItem>
        </NavbarContent>
        <NavbarMenu motionProps={{animate: { height: isMenuOpen ? '100vh' : '0' }}}>
            <NavbarMenuItem isActive={pathname === `${gitRepo}/`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${gitRepo}/`}
                >
                    Home
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${gitRepo}/create`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${gitRepo}/create`}
                >
                    Create Meeting
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${gitRepo}/availability`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${gitRepo}/availability`}
                >
                    My Availability
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${gitRepo}/meetings`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${gitRepo}/availability`}
                >
                    My Meetings
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${gitRepo}/login`}>
                <Link
                    color="secondary"
                    className="w-full"
                    href={`${gitRepo}/login`}
                >
                    Log In
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${gitRepo}/signup`}>
                <Link
                    color="primary"
                    className="w-full"
                    href={`${gitRepo}/signup`}
                >
                    Create Account
                </Link>
            </NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}