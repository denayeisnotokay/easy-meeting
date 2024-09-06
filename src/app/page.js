'use client'

import { Controller, Scene } from "react-scrollmagic-r18";
import { Element, scroller } from "react-scroll";
import { useEffect } from "react";
import {IoMdArrowDown, IoMdCalendar, IoMdGlobe, IoMdLink, IoMdPerson, IoMdRocket, IoMdTime} from "react-icons/io";
import {Button, Card, CardBody, CardHeader, Link, Spacer} from "@nextui-org/react";
import Scrollerr from "@/app/_components/scroll";

const sine = (x) => (1 - Math.cos((x * Math.PI) / 2))
const quad = (x) => x ** 2;
const circ = (x) => (1 - Math.sqrt(1 - x ** 2));
const exp = (x) => Math.pow(2, 10 * x - 10);

const constrain = (n, min, max) => {
    if (n < min) {
        return 0;
    }
    if (n > max) {
        return 1;
    }
    return exp((n - min) / (max - min));
};

export default function Home() {
    const delays = Array.from({length: 7}, () => (-Math.random() * 12))

    const scrollToTop = () => {
        window.scrollTo({top: 0});
    }

    useEffect(() => {
        window.addEventListener('resize', scrollToTop);
        return () => window.removeEventListener('resize', scrollToTop);
    })

    return (
        <Controller>
            <main className="bg-default-950 flex flex-col items-center">
                <Scene
                    duration={1200}
                    pin={{pushFollowers: false}}
                    triggerHook={0}
                    offset={1}
                >
                    {
                        (progress) => (
                            <div className="spacer flex flex-col justify-center w-full h-screen overflow-clip relative z-10">
                                <span className="px-16 md:px-24 lg:px-48 z-10">
                                    <h1>The Easiest Way to Schedule Group Meetings</h1>
                                </span>
                                <button
                                    className="absolute text-center z-10 flex flex-col gap-1.5 items-center self-center justify-self-end bottom-4"
                                    onClick={() => scroller.scrollTo('content', {
                                        duration: 4000,
                                        smooth: true,
                                        containerId: 'body',
                                    })}
                                >
                                    scroll
                                    <IoMdArrowDown size={20} className="animate-bounce" />
                                </button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="450 200 1900 1100"
                                     className="absolute -inset-full w-[1920px] h-[1080px] m-auto design self-center">
                                    <defs>
                                        <linearGradient x1="0" y1="0" x2="0%" y2="100%" id="design-1">
                                            <stop offset="0%" className="design-1-s"/>
                                            <stop offset="100%" className="design-1-e"/>
                                        </linearGradient>
                                        <linearGradient x1="0" y1="0" x2="%" y2="100%" id="design-2">
                                            <stop offset="0%" className="design-2-s"/>
                                            <stop offset="100%" className="design-2-e"/>
                                        </linearGradient>
                                        <linearGradient x1="0" y1="0" x2="0%" y2="100%" id="design-3">
                                            <stop offset="0%" className="design-3-s"/>
                                            <stop offset="100%" className="design-3-e"/>
                                        </linearGradient>
                                        <linearGradient x1="0" y1="0" x2="0%" y2="100%" id="design-4">
                                            <stop offset="0%" className="design-4-s"/>
                                            <stop offset="100%" className="design-4-e"/>
                                        </linearGradient>
                                    </defs>
                                    <g transform={`translate(-${constrain(progress, 0.45, 0.85) * 1500} 0)`}>
                                        <path className="design-1 glow-right floating"
                                              style={{animationDelay: `${delays[0]}s`}}
                                              d="M1224.611,94.907c48,29,90.057,66.706,111.076,139.131,31.64,119.773,17.498,277.531-112.155,365.477-15.638,10.951-30.492,21.705-44.363,35.26-17.633,16.449-35.381,39.373-43.961,59.056-22.444,49.298-12.704,91.561-5.965,138.613,8.612,70.855,9.842,177.13-84.19,274.299-66.252,62.173-127.547,132.802-128.63,221.383-2.431,60.788,18.187,99.781,60.187,142.781,195,161-656.611,121.625-656.611,121.625L0,58.907s974.611-154,1224.611,36Z"/>
                                    </g>
                                    <g transform={`translate(-${constrain(progress, 0.35, 0.75) * 1500} 0)`}>
                                        <path className="design-2 glow-right floating"
                                              style={{animationDelay: `${delays[1]}s`}}
                                              d="M838.611,1528.907c-231.512-138.913-218.419-388.355-68.13-530.012,9.049-9.26,18.146-18.478,26.864-28.15,13.964-15.469,26.999-31.968,37.498-50.721,18.053-30.504,25.269-69.06,25.885-106.336,2.512-114.637,29.756-188.807,98.138-258.229,6.456-7.535,12.462-15.389,17.891-23.655,89.145-142.958,30.905-345.268-116.146-472.897L83.611,137.907l304,1403,451-12Z"/>
                                    </g>
                                    <g transform={`translate(-${constrain(progress, 0.2, 0.6) * 1500} 0)`}>
                                        <path className="design-3 glow-right floating"
                                              style={{animationDelay: `${delays[2]}s`}}
                                              d="M375.611,1035.907c58.467-31.589,103.778-58.361,152.655-96.024,132.817-98.028,150.722-201.158,152.318-274.35.519-7.708,1.1-15.93,2.31-23.935,4.035-31.978,20.339-61.114,40.247-86.637,28.078-36.303,61.65-73.042,76.529-119.643,9.081-27.414,12.44-58.118,10.536-86.354-7.114-125.268-119.396-189.182-264.595-180.057l-352,37,182,830Z"/>
                                    </g>
                                    <g transform={`translate(-${constrain(progress, 0, 0.4) * 1500} 0)`}>
                                        <path className="design-4 glow-right floating"
                                              style={{animationDelay: `${delays[3]}s`}}
                                              d="M403.611,760.907c9.545-38.843,19.698-77.964,34.833-115.168,9.32-22.791,21.541-44.551,38.248-62.716,28.157-30.475,91.176-65.808,100.048-72.962s18.776-18.772,25.127-29.799c36.438-62.647,1.725-145.007-69.093-163.967-63.331-11.656-125.85-18.701-190.325-14.663-18.24,1.065-36.526,2.68-54.837,4.274l116,455Z"/>
                                    </g>
                                    <g transform={`translate(${constrain(progress, 0.4, 0.85) * 1100} 0)`}>
                                        <path className="design-1 glow-left floating"
                                              style={{animationDelay: `${delays[4]}s`}}
                                              d="M2365.611,268.907c-37,31-73.958,84.797-98.427,136.125-40.561,85.5-33.377,188.914-83.929,270.601-14.65,24.182-33.474,45.762-55.414,63.664-38.957,32.167-88.067,53.307-133.374,76.358-45.341,22.786-88.002,50.862-127.141,83.43-50.321,41.679-95.884,87.274-133.039,141.425-22.076,31.816-41.694,65.309-59.304,99.933-41.822,81.617-63.37,102.463-81.37,252.463-34,319,1114,160,1114,160,0,0,30-1440-342-1284Z"/>
                                    </g>
                                    <g transform={`translate(${constrain(progress, 0.25, 0.7) * 1100} 0)`}>
                                        <path className="design-2 glow-left floating"
                                              style={{animationDelay: `${delays[5]}s`}}
                                              d="M1907.959,1356.278c-73.171-156.291,8.291-299.762,119.149-318.527,6.909-1.126,15.912-1.889,23.559-2.75,62.825-4.843,120.059-39.602,146.375-95.087,5.872-11.921,9.652-23.938,13.174-36.287,30.957-124.693,139.998-133.361,260.809-112.971,10.112,1.948,20.605,4.212,31.38,7.043,4.754,1.232,9.61,2.566,14.339,3.954,47.102,14.105,69.39,29.026,77.002,34.442,1.002.869,1.077,1.389,1.231,2.821.142,1.559.35,4.314.668,8.239,9.983,148.125,54.381,636.465,51.458,664.928-1.865.099-5.799.274-11.59.505-180.942,1.933-633.193,15.723-727.472-156.13l-.084-.181Z"/>
                                    </g>
                                    <g transform={`translate(${constrain(progress, 0, 0.45) * 1100} 0)`}>
                                        <path className="design-3 glow-left floating"
                                              style={{animationDelay: `${delays[6]}s`}}
                                              d="M2184.889,1392.907c-71.278-170,45.833-263.012,193.778-245.006s175.944,268.006,175.944,268.006l-369.722-23Z"/>
                                    </g>
                                </svg>
                            </div>
                        )
                    }
                </Scene>
                <Element name="content" className="w-full p-8 max-w-screen-xl flex flex-col mt-[-1200px] z-0">
                    <section className="min-h-screen flex flex-col justify-center py-16">
                        <Scrollerr>
                            <h2 className="text-6xl font-bold text-center text-foreground mb-6">Welcome to HuddleHub</h2>
                        </Scrollerr>
                        <Scrollerr>
                            <h3 className="text-3xl text-center text-default-400 mb-16">
                                Effortless Group Scheduling, Massive Time Savings
                            </h3>
                        </Scrollerr>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <Scrollerr>
                                <Card className="bg-default-900">
                                    <CardBody className="p-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row lg:items-center gap-6">
                                            <IoMdTime className="text-primary text-6xl"/>
                                            <div>
                                                <h4 className="text-2xl font-semibold text-foreground mb-2">Save Precious
                                                    Time</h4>
                                                <p className="text-default-400 text-lg">No more back-and-forth emails.
                                                    Schedule meetings in minutes, not days.</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Scrollerr>

                            <Scrollerr>
                                <Card className="bg-default-900">
                                    <CardBody className="p-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row lg:items-center gap-6">
                                            <IoMdCalendar className="text-primary text-6xl"/>
                                            <div>
                                                <h4 className="text-2xl font-semibold text-foreground mb-2">Recurring
                                                    Meetings Made Easy</h4>
                                                <p className="text-default-400 text-lg">Set up recurring schedules once and
                                                    forget about it. We&apos;ll handle the rest.</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Scrollerr>
                        </div>

                        <Spacer y={16} />

                        <Scrollerr>
                            <h3 className="text-4xl font-semibold text-center text-foreground mb-12">
                                Features That Make Life Easier
                            </h3>
                        </Scrollerr>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <Scrollerr>
                                <Card className="bg-default-800">
                                    <CardHeader className="pb-0 pt-6 px-6 flex-col items-start">
                                        <IoMdPerson className="text-primary text-5xl mb-4"/>
                                        <h4 className="font-bold text-2xl text-foreground">Smart Availability</h4>
                                        <p className="text-default-400 mt-1">Save your regular schedule</p>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-6 px-6">
                                        <p className="text-default-300 text-lg">Input your typical weekly availability once
                                            and use it as a starting point for future meetings.</p>
                                    </CardBody>
                                </Card>
                            </Scrollerr>

                            <Scrollerr>
                                <Card className="bg-default-800">
                                    <CardHeader className="pb-0 pt-6 px-6 flex-col items-start">
                                        <IoMdGlobe className="text-primary text-5xl mb-4"/>
                                        <h4 className="font-bold text-2xl text-foreground">Time Zone Magic</h4>
                                        <p className="text-default-400 mt-1">No more confusion</p>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-6 px-6">
                                        <p className="text-default-300 text-lg">Automatically detect and adjust for
                                            different time zones. Schedule across the globe with ease.</p>
                                    </CardBody>
                                </Card>
                            </Scrollerr>

                            <Scrollerr>
                                <Card className="bg-default-800">
                                    <CardHeader className="pb-0 pt-6 px-6 flex-col items-start">
                                        <IoMdLink className="text-primary text-5xl mb-4"/>
                                        <h4 className="font-bold text-2xl text-foreground">Integration Heaven</h4>
                                        <p className="text-default-400 mt-1">Works with your tools</p>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-6 px-6">
                                        <p className="text-default-300 text-lg">Seamlessly integrate with popular calendar
                                            apps and video conferencing tools.</p>
                                    </CardBody>
                                </Card>
                            </Scrollerr>
                        </div>
                    </section>
                    <section className="min-h-screen flex flex-col justify-center items-center py-16">
                        <Scrollerr>
                            <h3 className="text-4xl font-semibold text-foreground">
                                Ready to Revolutionize Your Scheduling?
                            </h3>
                        </Scrollerr>

                        <Spacer y={12}/>

                        <Scrollerr>
                            <Button as={Link} color="primary" size="lg" className="text-2xl px-12 py-8"
                                endContent={<IoMdRocket className="text-3xl"/>} href={'/signup'}
                            >
                                Get Started for Free
                            </Button>
                        </Scrollerr>

                        <Spacer y={12}/>

                        <Scrollerr>
                            <Card className="bg-default-800 w-full max-w-4xl">
                                <CardBody className="p-12">
                                    <div className="flex flex-col md:flex-row items-center justify-between">
                                        <div className="mb-8 md:mb-0 md:mr-8">
                                            <h4 className="text-3xl font-semibold mb-4 text-foreground">Boost Your
                                                Productivity</h4>
                                            <p className="text-default-400 text-xl">Join thousands of teams saving time and
                                                increasing efficiency with ScheduleSync.</p>
                                        </div>
                                        <IoMdRocket className="text-primary text-8xl"/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Scrollerr>
                    </section>
                </Element>
            </main>
        </Controller>
    );
}
