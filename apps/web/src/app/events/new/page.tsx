"use client"

import { useState } from "react"
import { useRouter} from "next/navigation"

type EventForm = {
    title: string
    location: string
}

export default function NewEventPage() {
    const router = useRouter()
    const [form, setForm] = useState<EventForm>({
        title: "",
        location: "",
    })

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaving(true)
        setError(null)
        try {
            const res = await fetch("http://localhost:8080/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error("Failed to create event")
            }

            setForm({ title: "", location: ""})
            router.push("/")
            router.refresh()
        } catch(err) {
            setError(err instanceof Error ? err.message : "Somthing went wrong")
        } finally {
            setSaving(false)
        }
    }
    return (
        <main className ="min-h-screen bg-black px-6 py-10 text-white">
            <div className="mx-auto w-full max-wxl">
                <h1 className="mb-2 text-3xl font-bold">Create Event</h1>
                <p className="mb-8 text-zinc-400">
                    add new event to HYA Event Space
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 rounded-2x1 border border-zinc-800 bg-zinc-900 p-6"
                >
                    <div>
                        <label className="mb-2 block test-sm font-medium text-zinc-300">
                            Title
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus: border-white"
                            placeholder="HYA Launch Meetup"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-300">
                            location
                        </label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value})}
                            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                            placeholder="Kansas City"
                            required
                        />  
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-white px-5 py-3 font-semibold text-block transition hover:bg-zinc-200 disable:opacity-60"
                    >
                        {saving ? "Saving..." : "Create Event"}
                    </button>
                </form>
            </div>
        </main>
    )
}