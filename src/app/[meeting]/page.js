export default function Page({ params }) {
    return <main className="bg-default-950 flex flex-col justify-center items-center min-h-screen">
        <p>Meeting: {params.meeting}</p>
    </main>
}