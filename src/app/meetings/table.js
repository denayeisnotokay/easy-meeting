'use client'

import { useState, useMemo, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Select,
    SelectItem
} from "@nextui-org/react";
import { IoIosSearch, IoIosArrowDown, IoIosAdd, IoIosMore } from "react-icons/io";

// Sample data for 50 meetings
const meetings = [
    {
        id: 1,
        name: "Team Sync",
        description: "Weekly team synchronization meeting",
        dateWindow: {
            start: new Date("2024-09-10"),
            end: new Date("2024-09-10")
        },
        timeWindow: {
            start: new Date("2000-01-01T09:00:00"),
            end: new Date("2000-01-01T10:00:00")
        },
        responders: 5,
        coordinator: {name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?u=alice"},
        status: "active",
    },
    {
        id: 2,
        name: "Project Kickoff",
        description: "Initiate new project with stakeholders",
        dateWindow: {
            start: new Date("2024-09-15"),
            end: new Date("2024-09-15")
        },
        timeWindow: {
            start: new Date("2000-01-01T10:00:00"),
            end: new Date("2000-01-01T11:30:00")
        },
        responders: 8,
        coordinator: {name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=bob"},
        status: "scheduled",
    },
    {
        id: 3,
        name: "Client Presentation",
        description: "Present project progress to the client",
        dateWindow: {
            start: new Date("2024-09-20"),
            end: new Date("2024-09-20")
        },
        timeWindow: {
            start: new Date("2000-01-01T14:00:00"),
            end: new Date("2000-01-01T15:30:00")
        },
        responders: 6,
        coordinator: {name: "Carol Davis", email: "carol@example.com", avatar: "https://i.pravatar.cc/150?u=carol"},
        status: "active",
    },
];

// Generate 47 more sample meetings
for (let i = 4; i <= 50; i++) {
    const startDate = new Date(2024, 8, Math.floor(Math.random() * 30) + 1); // Random date in September 2024
    const endDate = new Date(startDate);

    const startTime = new Date(2000, 0, 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    const endTime = new Date(startTime.getTime() + (Math.random() * 2 + 0.5) * 60 * 60 * 1000); // 0.5 to 2.5 hours later

    meetings.push({
        id: i,
        name: `Meeting ${i}`,
        description: `Description for Meeting ${i}`,
        dateWindow: {
            start: startDate,
            end: endDate
        },
        timeWindow: {
            start: startTime,
            end: endTime
        },
        responders: Math.floor(Math.random() * 10) + 1, // 1 to 10 responders
        coordinator: {
            name: `Coordinator ${i}`,
            email: `coordinator${i}@example.com`,
            avatar: `https://i.pravatar.cc/150?u=coordinator${i}`
        },
        status: ['active', 'scheduled', 'past'][Math.floor(Math.random() * 3)] // Randomly assign status
    });
}

const columns = [
    {name: "NAME", uid: "name"},
    {name: "DESCRIPTION", uid: "description"},
    {name: "DATE/TIME WINDOW", uid: "dateTimeWindow"},
    {name: "RESPONDERS", uid: "responders"},
    {name: "COORDINATOR", uid: "coordinator"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
];

const statusColorMap = {
    active: "success",
    scheduled: "primary",
    past: "default",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "dateTimeWindow", "responders", "coordinator", "status", "actions"];

export default function MeetingTable() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const pages = Math.ceil(meetings.length / rowsPerPage);
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredMeetings = [...meetings];

        if (hasSearchFilter) {
            filteredMeetings = filteredMeetings.filter((meeting) =>
                meeting.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all") {
            filteredMeetings = filteredMeetings.filter((meeting) => meeting.status === statusFilter);
        }

        return filteredMeetings;
    }, [filterValue, statusFilter, hasSearchFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((meeting, columnKey) => {
        const cellValue = meeting[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{meeting.description}</p>
                    </div>
                );
            case "dateTimeWindow":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small">
                            {meeting.dateWindow.start.toLocaleDateString()} - {meeting.dateWindow.end.toLocaleDateString()}
                        </p>
                        <p className="text-bold text-tiny text-default-400">
                            {meeting.timeWindow.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {meeting.timeWindow.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                    </div>
                );
            case "responders":
                return <p className="text-bold text-small">{cellValue}</p>;
            case "coordinator":
                return (
                    <User
                        avatarProps={{radius: "full", size: "sm", src: cellValue.avatar}}
                        classNames={{
                            description: "text-default-500",
                        }}
                        description={cellValue.email}
                        name={cellValue.name}
                    >
                        {cellValue.email}
                    </User>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[meeting.status]}
                        size="sm"
                        variant="dot"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <IoIosMore className="text-default-400" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem color="danger" className="text-danger">Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(e.target.value);
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: 'max-w-lg',
                            inputWrapper: [
                                'bg-default-800', 'data-[hover=true]:bg-default-600',
                                'group-data-[focus=true]:data-[hover=true]:bg-default-600',
                                'group-data-[focus=true]:bg-default-700',
                                'group-data-[invalid=true]:!bg-danger-400'
                            ],
                            label: ['!text-foreground', 'text-medium', 'group-data-[invalid=true]:!text-danger'],
                            description: ['absolute', 'inset-x-1', 'top-1'],
                            errorMessage: ['absolute', 'inset-x-1', 'top-1'],
                            helperWrapper: ['p-0', 'h-0']
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<IoIosSearch className="text-default-300" />}
                        value={filterValue}
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<IoIosArrowDown className="text-small" />}
                                    size="sm"
                                    variant="light"
                                    color="primary"
                                >
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                <DropdownItem key="all">All</DropdownItem>
                                <DropdownItem key="active">Active</DropdownItem>
                                <DropdownItem key="scheduled">Scheduled</DropdownItem>
                                <DropdownItem key="past">Past</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<IoIosArrowDown className="text-small" />}
                                    size="sm"
                                    variant="light"
                                    color="primary"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            className="bg-primary text-primary-foreground"
                            endContent={<IoIosAdd />}
                            size="sm"
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {meetings.length} meetings</span>
                    <span className="flex flex-row gap-4">
                        <span className="text-lg min-w-max">Rows per page:</span>
                        <Select
                            classNames={{
                                base: 'text-small w-[4.5rem]',
                                trigger: [
                                    'bg-default-800',
                                    'data-[hover=true]:bg-default-600',
                                    'group-data-[focus=true]:bg-default-700',
                                    'group-data-[focus=true]:data-[hover=true]:bg-default-600',
                                ],
                            }}
                            size="sm"
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
                            allowMultipleSelection={false}
                        >
                            <SelectItem key={5} value={5}>
                                5
                            </SelectItem>
                            <SelectItem key={10} value={10}>
                                10
                            </SelectItem>
                            <SelectItem key={15} value={15}>
                                15
                            </SelectItem>
                            <SelectItem key={25} value={25}>
                                25
                            </SelectItem>
                        </Select>
                    </span>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        rowsPerPage
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-primary text-primary-foreground",
                        item: "data-[hover=true]:bg-default-700"
                    }}
                    color="primary"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="bordered"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
            </div>
        );
    }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter]);

    const classNames = useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                "group-data-[first=true]:first:before:rounded-l",
                "group-data-[first=true]:last:before:rounded-r",
                "group-data-[middle=true]:first:before:rounded-l",
                "group-data-[middle=true]:last:before:rounded-r",
                "group-data-[last=true]:first:before:rounded-l",
                "group-data-[last=true]:last:before:rounded-r",
                "group-data-[hover=true]:before:!bg-default-800",
                "group-data-[selected=true]:before:!bg-default-900",
                "before:bottom-1.5", "pb-3"
            ],
        }),
        [],
    );

    return (
        <Table
            isCompact
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "group-data-[hover=true]:before:bg-default-700 before:border-default-600 after:bg-primary after:text-primary-foreground text-primary-foreground",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No meetings yet..."} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}