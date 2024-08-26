import {Card, CardBody, CardHeader} from "@nextui-org/react";
import LogIn from "./login";

export default function Page() {
    return <main className="bg-default-950 flex flex-col justify-center items-center pt-20 p-6 gap-4 min-h-screen">
        <Card className="bg-default-900 px-8 py-2">
            <CardHeader>
                <h2>Log In</h2>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
                <LogIn />
            </CardBody>
        </Card>
    </main>
}