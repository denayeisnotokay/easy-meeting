import Create from '@/app/create/create';

export default function Page() {
    return <main className="bg-default-950 flex flex-col pt-20 p-6 gap-8 min-h-screen justify-center items-center">
        <h2>Create Meeting</h2>
        <Create />
    </main>
}