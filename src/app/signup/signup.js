'use client'

import {useReducer, useState} from "react";
import {produce} from "immer";
import {
    Button,
    Input, Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const SET_FIRST_NAME = 0;
const SET_LAST_NAME = 1;
const SET_EMAIL = 2;
const SET_PASSWORD = 3;
const SET_CONFIRM = 4;
const CLEAR = 5;
const UPDATE_INVALID = 6;

const reducer = ( state, action ) => {
    switch (action.type) {
        case SET_FIRST_NAME:
            state.name.first = action.value;
            state.invalid.name.first = action.value.length === 0;
            break;
        case SET_LAST_NAME:
            state.name.last = action.value;
            state.invalid.name.last = action.value.length === 0;
            break;
        case SET_EMAIL:
            state.email = action.value;
            state.invalid.email = !action.value.match('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
            break;
        case SET_PASSWORD:
            state.password = action.value;
            state.invalid.password.length = action.value.length < 12;
            state.invalid.password.upper = !action.value.match('.*[A-Z].*');
            state.invalid.password.lower = !action.value.match('.*[a-z].*');
            state.invalid.password.number = !action.value.match('.*[0-9].*')
            state.invalid.password.special = !action.value.match(/.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~].*/);
            state.invalid.password.only = !action.value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~A-Za-z0-9]+/);
            state.invalid.password.all = false;
            state.invalid.password.all = Object.values(state.invalid.password).some(Boolean);
            if (!state.invalid.confirm) {
                state.invalid.confirm = action.value !== state.password;
            }
            break;
        case SET_CONFIRM:
            state.confirm = action.value;
            state.invalid.confirm = action.value !== state.password;
            break;
        case CLEAR:
            state.name = {
                first: '',
                last: ''
            };
            state.email = '';
            state.password = '';
            state.confirm = '';
            break;
        case UPDATE_INVALID:
            state.invalid = action.value;
    }
}

export default function SignUp() {
    const [ state, dispatch ] = useReducer(produce(reducer), {
        name: {
            first: '',
            last: ''
        },
        email: '',
        password: '',
        confirm: '',
        invalid: {
            name: {
                first: false,
                last: false
            },
            email: false,
            password: {
                length: true,
                upper: true,
                lower: true,
                number: true,
                special: true,
                only: true,
                all: false,
            },
            confirm: false
        }
    });

    const [ show, setShow ] = useState([false, false]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted.")
        const invalid = {
            name: {
                first: state.name.first.length === 0,
                last: state.name.last.length === 0
            },
            email: !state.email.match('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'),
            password: { ...state.invalid.password, all: state.invalid.password.length || state.invalid.password.upper || state.invalid.password.lower || state.invalid.password.number || state.invalid.password.special || state.invalid.password.only },
            confirm: state.confirm !== state.password
        };
        dispatch({type: UPDATE_INVALID, value: invalid});
        if (!state.invalid.name.first && !state.invalid.name.last && !state.invalid.email && !state.invalid.password.all && !state.invalid.confirm) {
            console.log("Valid");

        }
    }

    const inputClasses = {
        inputWrapper: [
            'bg-default-700', 'data-[hover=true]:bg-default-500',
            'group-data-[focus=true]:bg-default-600',
            'group-data-[invalid=true]:!bg-danger-300'
        ],
        label: ['!text-default-400', 'group-data-[focus=true]:!text-default-200', 'group-data-[invalid=true]:!text-danger'],
        description: ['absolute', 'inset-x-1', 'top-1'],
        errorMessage: ['absolute', 'inset-x-1', 'top-1'],
        helperWrapper: ['p-0', 'h-0']
    }

    return <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-md">
            <div className="w-full flex flex-col sm:flex-row md:flex-col lg:flex-row xl:flex-col 2xl:flex-row gap-6">
                <Input
                    type="text" label="First Name:" name="first"
                    value={state.name.first} isInvalid={state.invalid.name.first}
                    onValueChange={(value) => dispatch({ type: SET_FIRST_NAME, value })}
                    errorMessage="Please enter a first name." classNames={inputClasses}
                />
                <Input
                    type="text" label="Last Name:" name="last"
                    value={state.name.last} isInvalid={state.invalid.name.last}
                    onValueChange={(value) => dispatch({ type: SET_LAST_NAME, value })}
                    errorMessage="Please enter a first name." classNames={inputClasses}
                />
            </div>
            <Input type="text" label="Email:" name="email"
                   value={state.email} isInvalid={state.invalid.email}
                   onValueChange={(value) => dispatch({ type: SET_EMAIL, value })}
                   errorMessage="Please enter a valid email address." classNames={inputClasses}
            />
            <Input
                type={show[0] ? 'text' : 'password'} autoComplete="off" label="Password:" name="password"
                value={state.password} isInvalid={state.invalid.password.all}
                onValueChange={(value) => dispatch({ type: SET_PASSWORD, value })}
                errorMessage="Password must meet all criteria below."
                classNames={inputClasses} endContent={
                <Button className="min-w-0 px-2 max-h-full" variant="light" onClick={() => setShow([!show[0], show[1]])}>
                    {show[0] ?
                        <IoMdEyeOff size={28} /> :
                        <IoMdEye size={28} />
                    }
                </Button>
            }
            />
            <Input
                type={show[1] ? 'text' : 'password'} autoComplete="off" label="Confrim Password:" name="confirmPassword"
                errorMessage="Passwords must match." value={state.confirm} isInvalid={state.invalid.confirm}
                onValueChange={(value) => dispatch({ type: SET_CONFIRM, value })}
                classNames={inputClasses} endContent={
                <Button className="min-w-0 px-2 max-h-full" variant="light" onClick={() => setShow([show[0], !show[1]])}>
                    {show[1] ?
                        <IoMdEyeOff size={28} /> :
                        <IoMdEye size={28} />
                    }
                </Button>
            }
            />
            <small className="w-full text-white">
                Your password must
                <ul>
                    <li className={'flex flex-row items-center gap-2' + (state.invalid.password.length ? ' text-danger' : ' text-success')}>
                        <i>{state.invalid.password.length ? <IoMdClose size={14}/> : <IoMdCheckmark size={14}/>}</i>
                        Be at least 12 characters long
                    </li>
                    <li className={'flex flex-row items-center gap-2' + (state.invalid.password.upper || state.invalid.password.lower ? ' text-danger' : ' text-success')}>
                        <i>{state.invalid.password.upper || state.invalid.password.lower ? <IoMdClose size={14}/> :
                            <IoMdCheckmark size={14}/>}</i>
                        Contain least one uppercase and one lowercase letter
                    </li>
                    <li className={'flex flex-row items-center gap-2' + (state.invalid.password.number ? ' text-danger' : ' text-success')}>
                        <i>{state.invalid.password.number ? <IoMdClose size={14}/> : <IoMdCheckmark size={14}/>}</i>
                        Contain at least one digit
                    </li>
                    <li className={'flex flex-row items-center gap-2' + (state.invalid.password.special ? ' text-danger' : ' text-success')}>
                        <i>{state.invalid.password.special ? <IoMdClose size={14}/> : <IoMdCheckmark size={14}/>}</i>
                        Contain at least one special character
                    </li>
                    <li className={'flex flex-row items-center gap-2' + (state.invalid.password.only ? ' text-danger' : ' text-success')}>
                        <i>{state.invalid.password.only ? <IoMdClose size={14}/> : <IoMdCheckmark size={14}/>}</i>
                        Be made up of only such characters listed above
                    </li>
                </ul>
            </small>
            <div className="flex flex-col items-center gap-2">
                <Link href="/easy-meeting/login" color="primary" className="underline">Already have an account</Link>
                <Button type="submit" color="primary" variant="ghost" className="w-min data-[hover=true]:opacity-100" disableRipple>Sign Up</Button>
            </div>
        </form>
    </>;
}