'use client'

import { getDayOfWeek, parseDate, parseTime } from '@internationalized/date';
import { useEffect, useState } from 'react';

export default function Calendarr({ dates, times, zone }) {
    const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [ days, setDays ] = useState([]);
    const [ hours, setHours ] = useState([]);

    useEffect(() => {
        const d = [];
        const end = parseDate(dates.end);
        for ( let curr = parseDate(dates.start); curr.compare(end) < 0; curr = curr.add({ days: 1 }) ) {
            d.push(curr);
            console.log(curr);
        }
        setDays(d);
    }, [ dates ]);

    useEffect(() => {
        const t = [];
        const end = parseTime(times.end);
        for ( let curr = parseTime(times.start); curr.compare(end) < 0; curr = curr.add({ hours: 1 }) ) {
            t.push(curr);
            console.log(curr);
        }
        setHours(t);
    }, [ times ])

    return (
        <table className="bordered">
            <tbody>
                <tr className="h-16">
                    <th>{zone}</th>
                    {days.map(day => <th className="h-full w-16">
                        <div className="inline-flex flex-col justify-center h-full">
                            <span>{dow[getDayOfWeek(day, 'en-US')]}</span>
                            <span>{day.day}</span>
                        </div>

                    </th>)}
                </tr>
                {
                    hours.map((hour, index) => (
                        index === hours.length - 1 ? <></> :
                            <tr className={"h-16"}>
                                <td className={'flex flex-col justify-between h-16'}>
                                    <span className="relative -translate-y-1/2">{hour.toString()}</span>
                                    {
                                        (index === hours.length - 2) ?
                                            <span className="translate-y-1/2">{hours[index + 1].toString()}</span> : <></>
                                    }
                                </td>
                                {days.map(day => <td className="size-16"></td>)}
                            </tr>
                    ))
                }
            </tbody>
        </table>
    )
}