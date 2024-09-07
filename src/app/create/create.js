'use client'

import { produce } from 'immer';
import { getLocalTimeZone, parseZonedDateTime, today, isAfter } from '@internationalized/date';
import {DateRangePicker, TimeInput, useDisclosure, Input, Textarea, Button} from '@nextui-org/react';
import { useReducer } from 'react';

const SET_DATES = 0;
const SET_TIME_START = 1;
const SET_TIME_END = 2;
const SET_NAME = 3;
const SET_DESCRIPTION = 4;
const UPDATE_INVALID = 5;

const reducer = (state, action) => {
    switch (action.type) {
        case SET_DATES:
            state.dates = action.value;
            break;
        case SET_TIME_START:
            state.times.start = action.value;
            state.invalid.times = state.times.start >= state.times.end;
            break;
        case SET_TIME_END:
            state.times.end = action.value;
            state.invalid.times = state.times.start >= state.times.end;
            break;
        case SET_NAME:
            state.name = action.value;
            state.invalid.name = action.value.length === 0;
            break;
        case SET_DESCRIPTION:
            state.description = action.value;
            break;
        case UPDATE_INVALID:
            state.invalid = action.value;
            break;
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
        name: '',
        description: '',
        invalid: {
            times: false,
            name: false
        }
    });

    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted.");
        const invalid = {
            name: state.name.length === 0,
            times: state.times.start.compare(state.times.end) > 0
        };
        dispatch({type: UPDATE_INVALID, value: invalid});
        if (!invalid.name && !invalid.times) {
            console.log("Valid");
            // TODO: Implement actual submission logic here
        }
    }

    const inputClasses = {
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
    }

    const dateTimeInputClasses = {
        inputWrapper: [
            'bg-default-800', 'hover:bg-default-600',
            'focus-within:hover:bg-default-600',
            'focus-within:bg-default-700',
            'group-data-[invalid=true]:!bg-danger-400'
        ],
        label: ['!text-default-400', 'group-data-[invalid=true]:!text-danger'],
        description: ['absolute', 'inset-x-1', 'top-1'],
        errorMessage: ['absolute', 'inset-x-1', 'top-1'],
        helperWrapper: ['p-0', 'h-0']
    }

    return (
        <form className="max-w-md w-full flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
                label="Meeting Name"
                labelPlacement="outside"
                placeholder="Give this meeting a name..."
                value={state.name}
                onValueChange={(value) => dispatch({ type: SET_NAME, value })}
                classNames={inputClasses}
                isRequired
                isInvalid={state.invalid.name}
                errorMessage={"Please enter a meeting name"}
            />
            <Textarea
                label="Meeting Description"
                labelPlacement="outside"
                placeholder="What will this meeting be about?"
                value={state.description}
                onValueChange={(value) => dispatch({ type: SET_DESCRIPTION, value})}
                classNames={inputClasses}
            />
            <div className="flex flex-col gap-2">
                <p>When can this meeting be scheduled?</p>
                <DateRangePicker
                    label="Date window"
                    value={state.dates}
                    onChange={(value) => dispatch({ type: SET_DATES, value })}
                    classNames={dateTimeInputClasses}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onFocus={onOpen}
                    isRequired
                    minValue={today(getLocalTimeZone())}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                    <TimeInput
                        label="from" classNames={dateTimeInputClasses} granularity="hour" value={state.times.start}
                        onChange={(value) => dispatch({type: SET_TIME_START, value})}
                        isInvalid={state.invalid.times} isRequired
                    />
                    &mdash;
                    <TimeInput
                        label="to" classNames={dateTimeInputClasses} granularity="hour" value={state.times.end}
                        onChange={(value) => dispatch({type: SET_TIME_END, value})}
                        isInvalid={state.invalid.times} isRequired
                    />
                </div>
                {state.invalid.times && <p className="text-danger text-sm mt-1">End time must be after start time</p>}
            </div>
            <Button type="submit" color="primary">Create Meeting</Button>
        </form>
    )
}