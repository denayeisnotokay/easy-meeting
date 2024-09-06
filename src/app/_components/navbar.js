'use client'

import {
    Button,
    Link,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
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
import {IoIosArrowDown, IoMdPerson} from "react-icons/io";

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
                <a href={`${process.env.GIT_REPO_NAME}/`} className="h-full relative font-title text-3xl">HuddleHub</a>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex" isActive={pathname === "/"}>
                <Link href={`${process.env.GIT_REPO_NAME}/`} className="text-default-foreground">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.GIT_REPO_NAME}/create`}>
                <Link href={`${process.env.GIT_REPO_NAME}/create`} className="text-default-foreground">
                    Create Meeting
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.GIT_REPO_NAME}/availability`}>
                <Link href={`${process.env.GIT_REPO_NAME}/availability`} className="text-default-foreground">
                    My Availability
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.GIT_REPO_NAME}/meetings`}>
                <Link href={`${process.env.GIT_REPO_NAME}/meetings`} className="text-default-foreground">
                    My Meetings
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.GIT_REPO_NAME}/login`}>
                <Button as={Link} variant="light" color="primary" href={`${process.env.GIT_REPO_NAME}/login`} className="text-md">
                    Log In
                </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.GIT_REPO_NAME}/signup`}>
                <Button as={Link} color="primary" href={`${process.env.GIT_REPO_NAME}/signup`} className="text-md">
                    Create Account
                </Button>
            </NavbarItem>
        </NavbarContent>
        <NavbarMenu motionProps={{animate: { height: isMenuOpen ? '100vh' : '0' }}}>
            <NavbarMenuItem isActive={pathname === `${process.env.GIT_REPO_NAME}/`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.GIT_REPO_NAME}/`}
                >
                    Home
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.GIT_REPO_NAME}/create`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.GIT_REPO_NAME}/create`}
                >
                    Create Meeting
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.GIT_REPO_NAME}/availability`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.GIT_REPO_NAME}/availability`}
                >
                    My Availability
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.GIT_REPO_NAME}/meetings`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.GIT_REPO_NAME}/availability`}
                >
                    My Meetings
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.GIT_REPO_NAME}/login`}>
                <Link
                    color="secondary"
                    className="w-full"
                    href={`${process.env.GIT_REPO_NAME}/login`}
                >
                    Log In
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.GIT_REPO_NAME}/signup`}>
                <Link
                    color="primary"
                    className="w-full"
                    href={`${process.env.GIT_REPO_NAME}/signup`}
                >
                    Create Account
                </Link>
            </NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}