import MeetingTable from "@/app/meetings/table";

export default function Page() {
    return <main className="bg-default-950 flex flex-col pt-20 p-8 gap-8 min-h-screen justify-start items-center">
        <h2>My Meetings</h2>
        <MeetingTable />
    </main>
}