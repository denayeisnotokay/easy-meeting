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
import {useState} from "react";
import { usePathname } from "next/navigation";
import {IoIosArrowDown, IoMdPerson} from "react-icons/io";

export default function Navbarr() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();

    const loggedIn = false;

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
                <a href="/" className="h-full grow relative font-title text-3xl">HuddleHub</a>
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
            { loggedIn ? <>
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
                <Dropdown onOpenChange={setIsDropdownOpen}>
                    <NavbarItem className={'flex justify-end hover:bg-transparent'}>
                        <DropdownTrigger>
                            <Button
                                color="sky"
                                disableRipple
                                className="bg-transparent !inline-flex !flex-row h-full text-md"
                                startContent={<IoMdPerson />}
                                endContent={<IoIosArrowDown className={'transition-transform' + (isDropdownOpen ? ' rotate-180' : '')} />}
                                radius="sm"
                                variant="light"
                            >
                                My Account
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        color="default"
                        aria-label="Account Options"
                    >
                        <DropdownItem key="settings" href={'/settings'}>Account Settings</DropdownItem>
                        <DropdownItem key="inbox" href={'/inbox'}>Inbox</DropdownItem>
                        <DropdownItem color="danger" key="logout" onClick={() => {}} className={'text-danger'}>Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </> : <>
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
            </> }
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
            { loggedIn ? <>
                <NavbarMenuItem isActive={pathname === "/settings"}>
                    <Link
                        className="w-full text-default-foreground"
                        href="/settings"
                    >
                        Account Settings
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={pathname === "/inbox"}>
                    <Link
                        className="w-full text-default-foreground"
                        href="/inbox"
                    >
                        Inbox
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link
                        color="danger"
                        className="w-full"
                        onClick={() => {}}
                    >
                        Log Out
                    </Link>
                </NavbarMenuItem>
            </> : <>
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
            </> }
        </NavbarMenu>
    </Navbar>
}