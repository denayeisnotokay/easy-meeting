'use client'

import {
    Button, Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, NavbarMenu, NavbarMenuItem,
    NavbarMenuToggle
} from '@nextui-org/react'
import Link from "next/link";
import {useState} from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbarr() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const loggedIn = false;

    return <Navbar isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}  maxWidth="full" classNames={{
        base: ['fixed', 'bg-transparent', 'font-heading']
    }}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden text-primary"
            />
            <NavbarBrand>
                <a href="/" className="h-full grow relative font-title text-3xl">EasyMeet</a>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/"}>
                <Link color="primary" href="/" aria-current="page">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex" isActive={pathname === "/create"}>
                <Link color="primary" href="/create">
                    Create Meeting
                </Link>
            </NavbarItem>
            { loggedIn ? <>
                <NavbarItem className="hidden sm:flex" isActive={pathname === "/availability"}>
                    <Link color="primary" href="/availability">
                        My Availability
                    </Link>
                </NavbarItem>
                <Dropdown className={'bg-sky-800'}>
                    <NavbarItem className={'grow flex justify-end hover:bg-transparent'}>
                        <DropdownTrigger>
                            <Button
                                color="sky"
                                disableRipple
                                className="bg-transparent !inline-flex !flex-row underline h-full"
                                endContent={<IoIosArrowDown />}
                                radius="sm"
                                variant="light"
                            >
                                My Account
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="Account Options"
                        itemClasses={{
                            base: 'data-[hover=true]:bg-sky-700'
                        }}
                    >
                        <DropdownItem key="settings" href={'/settings'}>Account Settings</DropdownItem>
                        <DropdownItem key="inbox" href={'/inbox'}>Purchase History</DropdownItem>
                        <DropdownItem key="logout" onClick={() => {}} className={'text-danger'}>Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </> : <>
                <NavbarItem className="flex" isActive={pathname === "/login"}>
                    <Button as={Link} variant="light" color="primary" href="/login" className="text-md">
                        Log In
                    </Button>
                </NavbarItem>
                <NavbarItem className="flex" isActive={pathname === "/signup"}>
                    <Button as={Link} color="primary" href="/signup" className="text-md">
                        Create Account
                    </Button>
                </NavbarItem>
            </> }
        </NavbarContent>
        <NavbarMenu>
            <NavbarMenuItem isActive={pathname === "/"}>
                <Link
                    color="primary"
                    className="w-full"
                    href="/"
                >
                    Home
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === "/create"}>
                <Link
                    color="primary"
                    className="w-full"
                    href="/create"
                >
                    Create Meeting
                </Link>
            </NavbarMenuItem>
            { loggedIn ? <>
                <NavbarMenuItem isActive={pathname === "/settings"}>
                    <Link
                        color="primary"
                        className="w-full"
                        href="/settings"
                    >
                        Account Settings
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={pathname === "/inbox"}>
                    <Link
                        color="primary"
                        className="w-full"
                        href="/inbox"
                    >
                        Inbox
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button
                        color="primary"
                        className="w-full"
                        onClick={() => {}}
                    >
                        Log Out
                    </Button>
                </NavbarMenuItem>
            </> : <>
                <NavbarMenuItem isActive={pathname === "/login"}>
                    <Link
                        color="primary"
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
            </> }
        </NavbarMenu>
    </Navbar>
}