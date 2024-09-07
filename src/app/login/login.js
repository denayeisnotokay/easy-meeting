'use client'

import { useReducer, useState } from "react";
import { produce } from "immer";
import { Button, Input, Link } from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SET_EMAIL = 0;
const SET_PASSWORD = 1;
const UPDATE_INVALID = 2;

const reducer = ( state, action ) => {
    switch (action.type) {
        case SET_EMAIL:
            state.email = action.value;
            state.invalid.email = !action.value.match('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
            break;
        case SET_PASSWORD:
            state.password = action.value;
            state.invalid.password = action.value.length === 0;
            break;
        case UPDATE_INVALID:
            state.invalid = action.value;
    }
}

export default function LogIn() {
    const [ state, dispatch ] = useReducer(produce(reducer), {
        email: '',
        password: '',
        invalid: {
            email: false,
            password: false
        }
    });

    const [ show, setShow ] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const invalid = {
            email: !state.email.match('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'),
            password: state.password.length === 0
        }
        dispatch({ type: UPDATE_INVALID, value: invalid });
        if (!invalid.email && !invalid.password) {

        }
    };

    const inputClasses = {
        inputWrapper: [
            'bg-default-700', 'data-[hover=true]:bg-default-500',
            'group-data-[focus=true]:bg-default-600'
        ],
        label: ['!text-default-400', 'group-data-[focus=true]:!text-default-200'],
        description: ['absolute', 'inset-x-1', 'top-1'],
        errorMessage: ['absolute', 'inset-x-1', 'top-1'],
        helperWrapper: ['p-0', 'h-0']
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 pulse-trigger w-full max-w-md">
            <Input
                type="text" label="Email:" name="email" classNames={inputClasses}
                value={state.email} isInvalid={state.invalid.email} errorMessage="Please enter a valid email address."
                onValueChange={(value) => dispatch({ type: SET_EMAIL, value })}
            />
            <Input
                type={ show ? 'text' : 'password' } label="Password:" name="password"
                classNames={inputClasses} endContent={
                <Button className="min-w-0 px-2 max-h-full" variant="light" onClick={() => setShow(!show)}>
                    {show ?
                        <IoMdEyeOff size={28}/> :
                        <IoMdEye size={28} />
                    }
                </Button>
            } value={state.password} isInvalid={state.invalid.password} errorMessage="Please enter your password."
                onValueChange={(value) => dispatch({ type: SET_PASSWORD, value })}
            />
            <div className="flex flex-col gap-6 items-center">
                <div className="flex flex-col items-center">
                    <Link href="/easy-meeting/login" underline="always">Don&apos;t have an account</Link>
                    <Link href="/easy-meeting/recover" underline="always">Forgot password</Link>
                </div>
                <Button type="submit" color="primary" variant="ghost" className="w-min data-[hover=true]:opacity-100">Log In</Button>
            </div>
        </form>
    )
}