type Event = {
    id: number
    title: string
    location: string
}


async function getEvent(id: string): Promise<Event> {
    const res = await fetch(`http://127.0.0.1:8080/events/${id}`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed to load event")
    }

    return res.json()

}

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const event = await getEvent(id)

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h1 className="mb-3 text-3xl font-bold">{event.title}</h1>
                <p className="text-zinc-400">{event.location}</p>
            </div>
        </main>
    )
}