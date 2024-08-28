'use client'

import { produce } from 'immer';
import { getLocalTimeZone, parseAbsolute, parseZonedDateTime, today } from '@internationalized/date';
import { DateRangePicker, TimeInput, useDisclosure } from '@nextui-org/react';
import { useReducer } from 'react';

const SET_DATES = 0;
const SET_TIME_START = 1;
const SET_TIME_END = 2;

const reducer = (state, action) => {
    switch (action.type) {
        case SET_DATES:
            state.dates = action.value;
            break;
        case SET_TIME_START:
            state.times.start = action.value;
            break;
        case SET_TIME_END:
            state.times.end = action.value;
    }
}

export default function Create() {
    const [ state, dispatch ] = useReducer(produce(reducer), {
        dates: {
            start: today(getLocalTimeZone()),
            end: today(getLocalTimeZone())
        },
        times: {
            start: parseZonedDateTime(`2000-01-01T09:00[${getLocalTimeZone()}]`),
            end: parseZonedDateTime(`2000-01-01T17:00[${getLocalTimeZone()}]`),
        },
        invalid: {
            dates: false,
            times: false
        }
    });

    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    const inputClasses = {
        inputWrapper: [
            'bg-default-800', 'hover:bg-default-600',
            'focus-within:hover:bg-default-600',
            'focus-within:bg-default-700',
            'group-data-[invalid=true]:!bg-danger-400'
        ],
        label: ['!text-default-400', 'group-data-[focus=true]:!text-default-200', 'group-data-[invalid=true]:!text-danger'],
        description: ['absolute', 'inset-x-1', 'top-1'],
        errorMessage: ['absolute', 'inset-x-1', 'top-1'],
        helperWrapper: ['p-0', 'h-0']
    }

    return (
        <form className="max-w-md w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <p>When will this meeting happen?</p>
                <DateRangePicker
                    label="Date window"
                    value={state.dates}
                    onChange={(value) => dispatch({ type: SET_DATES, value })}
                    classNames={inputClasses}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onFocus={onOpen}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p>Time window</p>
                <div className="flex flex-row items-center gap-4">
                    <TimeInput
                        label="from" classNames={inputClasses} granularity="hour" value={state.times.start}
                        onChange={(value) => dispatch({type: SET_TIME_START, value})}
                    />
                    &mdash;
                    <TimeInput
                        label="to" classNames={inputClasses} granularity="hour" value={state.times.end}
                        onChange={(value) => dispatch({type: SET_TIME_END, value})}
                    />
                </div>
            </div>

        </form>
    )
}