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
        menu: ['fixed', 'inset-0', 'pt-16', 'px-0', 'gap-0'],
        menuItem: ['transition-colors', 'hover:bg-default-800', 'px-6', 'py-2'],
    }}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <a href="/" className="h-full relative font-title text-3xl">HuddleHub</a>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/"}>
                <Link href="/" className="text-default-foreground">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/create"}>
                <Link href="/create" className="text-default-foreground">
                    Create Meeting
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/availability"}>
                <Link href="/availability" className="text-default-foreground">
                    My Availability
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/meetings"}>
                <Link href="/meetings" className="text-default-foreground">
                    My Meetings
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/login"}>
                <Button as={Link} variant="light" color="primary" href="/login" className="text-md">
                    Log In
                </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/signup"}>
                <Button as={Link} color="primary" href="/signup" className="text-md">
                    Create Account
                </Button>
            </NavbarItem>
        </NavbarContent>
        <NavbarMenu motionProps={{animate: { height: isMenuOpen ? '100vh' : '0' }}}>
            <NavbarMenuItem isActive={pathname === "/"}>
                <Link
                    className="w-full text-default-foreground"
                    href="/"
                >
                    Home
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === "/create"}>
                <Link
                    className="w-full text-default-foreground"
                    href="/create"
                >
                    Create Meeting
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === "/availability"}>
                <Link
                    className="w-full text-default-foreground"
                    href="/availability"
                >
                    My Availability
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === "/meetings"}>
                <Link
                    className="w-full text-default-foreground"
                    href="/meetings"
                >
                    My Meetings
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === "/login"}>
                <Link
                    color="secondary"
                    className="w-full"
                    href="/login"
                >
                    Log In
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === "/signup"}>
                <Link
                    color="primary"
                    className="w-full"
                    href="/signup"
                >
                    Create Account
                </Link>
            </NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}