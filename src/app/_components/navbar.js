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
                <a href={`${process.env.PATH}/`} className="h-full relative font-title text-3xl">HuddleHub</a>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex" isActive={pathname === "/"}>
                <Link href={`${process.env.PATH}/`} className="text-default-foreground">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.PATH}/create`}>
                <Link href={`${process.env.PATH}/create`} className="text-default-foreground">
                    Create Meeting
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.PATH}/availability`}>
                <Link href={`${process.env.PATH}/availability`} className="text-default-foreground">
                    My Availability
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.PATH}/meetings`}>
                <Link href={`${process.env.PATH}/meetings`} className="text-default-foreground">
                    My Meetings
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.PATH}/login`}>
                <Button as={Link} variant="light" color="primary" href={`${process.env.PATH}/login`} className="text-md">
                    Log In
                </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === `${process.env.PATH}/signup`}>
                <Button as={Link} color="primary" href={`${process.env.PATH}/signup`} className="text-md">
                    Create Account
                </Button>
            </NavbarItem>
        </NavbarContent>
        <NavbarMenu motionProps={{animate: { height: isMenuOpen ? '100vh' : '0' }}}>
            <NavbarMenuItem isActive={pathname === `${process.env.PATH}/`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.PATH}/`}
                >
                    Home
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.PATH}/create`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.PATH}/create`}
                >
                    Create Meeting
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.PATH}/availability`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.PATH}/availability`}
                >
                    My Availability
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.PATH}/meetings`}>
                <Link
                    className="w-full text-default-foreground"
                    href={`${process.env.PATH}/availability`}
                >
                    My Meetings
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.PATH}/login`}>
                <Link
                    color="secondary"
                    className="w-full"
                    href={`${process.env.PATH}/login`}
                >
                    Log In
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === `${process.env.PATH}/signup`}>
                <Link
                    color="primary"
                    className="w-full"
                    href={`${process.env.PATH}/signup`}
                >
                    Create Account
                </Link>
            </NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}