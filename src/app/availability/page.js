import Calendarr from '@/app/_components/calendar';
import { CalendarDate, Time } from '@internationalized/date';
import {Button} from "@nextui-org/react";

export default function Page() {
    return <main className="bg-default-950 flex flex-col justify-center items-center min-h-screen py-20 gap-6">
        <h2>My Availability</h2>
        <Calendarr dates={{
            start: new CalendarDate(2024, 8, 26).toString(),
            end: new CalendarDate(2024, 9, 1).toString()
        }} times={{
            start: new Time(8).toString(),
            end: new Time(22).toString()
        }} zone={'EST'} />
        <Button color="primary">Save</Button>
    </main>
}