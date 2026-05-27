import Link from "next/link"


type Event = {
  id: number
  title: string
  location: string
}

async function getEvents(): Promise<Event[]> {
  const res = await fetch("http://127.0.0.1:8080/events", {
    cache: "no-store",
  })

  return res.json()
}

export default async function Home() {
  const events = await getEvents()

  return (
    <main className="p-8 min-h-screen bg-black text-white">
      <h1 className="mb-6 text-4xl font-bold">
        HYA Event Space
      </h1>

      <Link
        href="/events/new"
        className="mb-6 inline-block rounded-xl border border-zinc-700 px-4 py-2 text-white hove:bg-zinc-900"
      >
        New Event
      </Link>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >

            <Link
              href={`/events/${event.id}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:bg-zinc-800"
            >
              <h2 className="text-xl font-semibold hover:underline">
                {event.title}
              </h2>

              <p className="text-zinc-400">
                {event.location}
              </p>
            </Link>

            
          </div>

        ))}
        </div>
    </main>
  )
}