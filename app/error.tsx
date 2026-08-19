"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string};
    reset: () => void;
}) {
    console.error(error);
    return (
        <main className="flex min-h-screen items-center justify-ceter bg-black px-6 text-white">
            <section className="max-w-md rounded-xl border border-white/20 bg-black/70 p-6 shadow-[0_0_24px_rgba(255,255,255,0.10)]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Olympus route error
                </p>

                <h1 className="mt-3 text-2xl font-semibold">
                    Argamemnon lost the interface
                </h1>

                <p className="mt-3 text-sm leading-6 text-white/60">
                    Something failed while rendering this screen. Try reloading the route.
                </p>

                <button
                    type="button"
                    onClick={reset}
                    className="mt-5 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10">
                        Try again
                    </button>
            </section>
        </main>
    );
}
