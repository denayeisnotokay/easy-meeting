'use client'

import { getDayOfWeek, parseDate, parseTime } from '@internationalized/date';
import { useEffect, useReducer } from 'react';
import { produce } from "immer";
import { Button } from "@nextui-org/react";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline, IoMdContrast } from "react-icons/io";

const SET_DAYS = 0;
const SET_HOURS = 1;
const SET_PRESSED = 2;
const SET_SELECTED = 3;
const SET_MODE = 4;
const SET_START = 5;
const SET_END = 6;

const formatTime = (time) => {
    if (time.hour === 0) {
        return '12 AM';
    }
    if (time.hour < 12) {
        return time.hour.toString() + ' AM';
    }
    if (time.hour === 12) {
        return '12 PM';
    }
    return (time.hour - 12).toString() + ' PM';
};

const fillRow = (arr, target) => {
    if (arr.length < target) {
        arr.push(...Array.from({length: target - arr.length}, () => false));
    }
    if (arr.length > target) {
        arr.splice(target, arr.length - target);
    }
}

const fillRows = (arr, target, cols) => {
    if (arr.length < target) {
        arr.push(...Array.from({length: 4 * (target - arr.length)}, () => Array(cols).fill(false)))
    }
    if (arr.length > target) {
        arr.splice(4 * target, 4 * (arr.length - target));
    }
}

const isWithin = (pos, start, end) => (
    (pos.row >= start.row && pos.row <= end.row || pos.row >= end.row && pos.row <= start.row) &&
    (pos.col >= start.col && pos.col <= end.col || pos.col >= end.col && pos.col <= start.col)
);

const parseDataset = (dataset) => ({ row: parseInt(dataset.row), col: parseInt(dataset.col) });

const reducer = (state, action) => {
    switch (action.type) {
        case SET_DAYS:
            state.days = action.value;
            state.filled.forEach(row => fillRow(row, state.days.length));
            break;
        case SET_HOURS:
            state.hours = action.value;
            fillRows(state.filled, state.hours.length, state.days.length);
            break;
        case SET_PRESSED:
            state.pressed = action.value;
            if (!action.value) {
                const start = {
                    row: Math.min(state.start.row, state.end.row),
                    col: Math.min(state.start.col, state.end.col)
                }
                const end = {
                    row: Math.max(state.start.row, state.end.row),
                    col: Math.max(state.start.col, state.end.col)
                }
                for (let i = start.row; i <= end.row; i++) {
                    for (let j = start.col; j <= end.col; j++) {
                        state.filled[i][j] = state.mode;
                    }
                }
            }
            break;
        case SET_SELECTED:
            state.selected = action.value;
            break;
        case SET_MODE:
            state.mode = action.value;
            break;
        case SET_START:
            state.start = action.value;
            break;
        case SET_END:
            state.end = action.value;
            break;
    }
};

export default function Calendarr({ dates, times, zone }) {
    const [ state, dispatch ] = useReducer(produce(reducer), {
        days: [],
        hours: [],
        pressed: false,
        selected: 0,
        mode: true,
        start: {},
        end: {},
        filled: [],
    })

    const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        const d = [];
        const end = parseDate(dates.end);
        for ( let curr = parseDate(dates.start); curr.compare(end) <= 0; curr = curr.add({ days: 1 }) ) {
            d.push(curr);
            console.log(curr);
        }
        dispatch({ type: SET_DAYS, value: d });
    }, [ dates ]);

    useEffect(() => {
        const t = [];
        const end = parseTime(times.end);
        for ( let curr = parseTime(times.start); curr.compare(end) <= 0; curr = curr.add({ hours: 1 }) ) {
            t.push(curr);
            console.log(curr);
        }
        dispatch({ type: SET_HOURS, value: t });
    }, [ times ]);

    const draw = (event) => {
        if (state.pressed) {
            const pos = parseDataset(event.target.dataset);
            dispatch({ type: SET_END, value: pos });
        }
    }

    const start = (event) => {
        event.preventDefault();
        const pos = parseDataset(event.target.dataset);
        dispatch({ type: SET_MODE, value: ([false, !state.filled[pos.row][pos.col], true])[state.selected + 1] })
        dispatch({ type: SET_START, value: pos });
        dispatch({ type: SET_END, value: pos });
    }

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            Make selections:
            <ul className="flex flex-row gap-2">
                <Button className="gap-2 pl-5" size="lg" color="success" variant={state.selected === 1 ? 'solid' : 'light'} onClick={() => dispatch({type: SET_SELECTED, value: 1})} startContent={<IoMdCheckmarkCircleOutline size={24} />}><span className={'h-[1.625rem]'}>Available</span></Button>
                <Button className="gap-2 pl-5" size="lg" color="danger" variant={state.selected === -1 ? 'solid' : 'light'} onClick={() => dispatch({type: SET_SELECTED, value: -1})} startContent={<IoMdCloseCircleOutline size={24} />}><span className={'h-[1.625rem]'}>Unavailable</span></Button>
                <Button className="gap-2 pl-5" size="lg" color="primary" variant={state.selected === 0 ? 'solid' : 'light'} onClick={() => dispatch({type: SET_SELECTED, value: 0})} startContent={<IoMdContrast size={24} />}><span className={'h-[1.625rem]'}>Auto</span></Button>
            </ul>
            <div
                className="grid items-start justify-center text-center w-full max-w-screen-lg"
                style={{
                    gridTemplateColumns: `max-content repeat(${state.days.length}, 1fr)`,
                    gridTemplateRows: `max-content repeat(${state.hours.length - 1}, 4rem)`
                }}
                onMouseDown={() => dispatch({type: SET_PRESSED, value: true})}
                onMouseUp={() => dispatch({type: SET_PRESSED, value: false})}
                onMouseLeave={() => dispatch({type: SET_PRESSED, value: false})}
                draggable="false"
            >
                <span className="row-start-1 col-start-1 row-span-1 col-span-1 self-center" draggable="false">{zone}</span>
                {
                    state.days.map((day, index) => (
                        <div
                            className="inline-flex flex-col justify-center row-start-1 row-span-1 col-span-1 p-2"
                            style={{gridColumnStart: index + 2}} key={day.day} draggable="false"
                        >
                            <span>{dow[getDayOfWeek(day, 'en-US')]}</span>
                            <span>{day.day}</span>
                        </div>
                    ))
                }
                {
                    state.hours.map((hour, index) => (
                        index === state.hours.length - 1 ?
                            <span
                                className="row-span-1 col-start-1 col-span-1 self-end translate-y-1/2 px-2"
                                style={{gridRowStart: index + 1}} key={hour.toString()} draggable="false"
                            >{formatTime(hour)}</span> :
                            <span
                                className="row-span-1 col-start-1 col-span-1 -translate-y-1/2"
                                style={{gridRowStart: index + 2}} key={hour.toString()} draggable="false"
                            >{formatTime(hour)}</span>
                    ))
                }
                {
                    Array.from({length: state.days.length * (state.hours.length - 1)}, (_, index) => {
                        const row = Math.floor(index / state.days.length) * 4;
                        const col = index % state.days.length;
                        return (
                            <div key={index} draggable="false" className={
                                'self-stretch border-default-950 flex flex-col items-stretch border-l-3 border-t-3' +
                                ((row === state.hours.length * 4 - 8) ? ' border-b-3' : '') +
                                ((col === state.days.length - 1) ? ' border-r-3' : '')
                            }>
                                {Array.from({length: 4}, (_, i) => (
                                    <span
                                        className={
                                            'grow' +
                                            (
                                                state.pressed && isWithin({row: row + i, col}, state.start, state.end) ?
                                                    (state.mode ? ' bg-success' : ' bg-danger') :
                                                    ((state.filled[row] ? state.filled[row + i][col] : false) ? ' bg-primary' : ' bg-default-800')
                                            )
                                        }
                                        onMouseOver={draw} onMouseDown={start}
                                        data-row={(row + i).toString()}
                                        data-col={col.toString()}
                                        draggable="false"
                                    ></span>
                                ))}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}