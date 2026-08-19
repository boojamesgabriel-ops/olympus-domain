"use client";
import { FormEvent, useState } from "react";

import { useChat } from "@ai-sdk/react";

import HephaestusStatusCard from "./HephaestusStatusCard";
import {
  isHephaestusStatusInput,
  isHephaestusStatusOutput,
} from "@/lib/ai/tool-types";

export default function ArgamemnonChat(){
    const { messages, sendMessage, stop, status, error, regenerate } = useChat();

    const isStreaming = status === "streaming" || status === "submitted";
    const isWaitingForFirstToken = status === "submitted";

    const [input, setInput] = useState("");
    const [hideError, setHideError] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!input.trim()) return;

        setHideError(true);
        sendMessage({ text: input });
        setInput("");
    };

    return (
        <section
            className="
                fixed left-1/2 top-[56%] z-40
                flex h-[560px] w-[min(860px,calc(100vw-2rem))]
                -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden
                rounded-xl border border-white/20 bg-black/65 text-white
                backdrop-blur-xl
                shadow-[0_0_24px_rgba(255,255,255,0.10),inset_0_1px_0_rgba(255,255,255,0.30)]
            "
        >
            <header className="border-b border-white/10 px-6 py-4">
                <h2 className="text-lg font-medium tracking-[0.18em]">Argamemnon</h2>
                <p className="mt-1 text-sm text-white/60">AI System Manager</p>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                {messages.length === 0 && (
                    <p className="max-w-sm text-sm leading-6 text-white/45">
                        Tell Argamemnon what to coordinate next.
                    </p>
                )}

                {messages.length === 0 ? (
                    <div className="flex flex-col gap-3 text-sm text-white/70">
                        <p className="text-white/50">No messages yet. Try one of these prompts.</p>
                        <ul className="flex flex-col gap-2">
                            <li onClick={() => setInput("Check Hephaestus Status")}
                            className="cursor-pointer rounded-md bg-white/10 px-3 py-2 hover:bg-white/20">
                                Check Hephaestus Status
                            </li>
                            <li onClick={() => setInput("What can Olympus Domain do?")} 
                            className="cursor-pointer rounded-md bg-white/10 px-3 py-2 hover:bg-white/20">
                                What can Olympus Domain do?
                            </li>
                            <li  onClick={() => setInput("Summarize today's agent activity")} 
                            className="cursor-pointer rounded-md bg-white/10 px-3 py-2 hover:bg-white/20">
                                Summarize today&apos;s agent activity
                            </li>
                        </ul>
                    </div>
                ) : (
                    messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                        <article
                            key={message.id}
                            className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
                        >
                            <strong className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                                {isUser ? "You" : "Argamemnon"}
                            </strong>

                            {message.parts.map((part, index) => {
                                if (part.type === "text"){
                                    return (
                                        <p
                                            key={index}
                                            className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-6 ${
                                                isUser
                                                    ? "bg-white text-black"
                                                    : "border border-white/10 bg-white/10 text-white"
                                            }`}
                                        >
                                            {part.text}
                                        </p>
                                    );
                                }

                                if (part.type === "tool-getHephaestusStatus") {
                                    if (part.state === "input-streaming") {
                                        return (
                                            <div
                                                key={index}
                                                className="max-w-[80%] rounded-lg border border-blue-300/20 bg-blue-300/10 px-4 py-3 text-sm text-blue-100"
                                            >
                                                Preparing Hephaestus status check...
                                            </div>
                                        );
                                    }

                                    if (part.state === "input-available") {
                                        const input = isHephaestusStatusInput(part.input)
                                            ? part.input
                                            : undefined;

                                        return (
                                            <div
                                                key={index}
                                                className="max-w-[80%] rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/70"
                                            >
                                                Checking {input?.projectName ?? "Hephaestus"}...
                                            </div>
                                        );
                                    }

                                    if (part.state === "output-available") {
                                        if (!isHephaestusStatusOutput(part.output)) {
                                            return null;
                                        }

                                        return <HephaestusStatusCard key={index} status={part.output} />;
                                    }

                                    if (part.state === "output-error") {
                                        return (
                                            <div
                                                key={index}
                                                className="max-w-[80%] rounded-lg border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm text-red-100"
                                            >
                                                Hephaestus check failed: {part.errorText}
                                            </div>
                                        );
                                    }
                                }

                                return null;
                            })}
                        </article>
                    );
                })
            )}

                {isWaitingForFirstToken && (
                    <article className="flex flex-col items-start gap-2">
                        <strong className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                            Argamemnon
                        </strong>
                        <p className="max-w-[80%] rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm leading-6 text-white/70">
                            Argamemnon is thinking...
                        </p>
                    </article>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-white/10 p-4">
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Tell Argamemnon what to do next..."
                    className="
                        min-w-0 flex-1 rounded-full border border-white/15 bg-white/10
                        px-4 py-3 text-sm text-white outline-none
                        placeholder:text-white/40 focus:border-white/40
                    "
                />

                <button
                    type="submit"
                    disabled={isStreaming || !input.trim()}
                    className="
                        rounded-full border border-white/20 px-4 py-3 text-sm text-white
                        disabled:cursor-not-allowed disabled:opacity-40
                    "
                >
                    Send
                </button>

                {isStreaming && (
                    <button
                        type="button"
                        onClick={stop}
                        className="rounded-full border border-red-300/30 px-4 py-3 text-sm text-red-100"
                    >
                        Stop
                    </button>
                )}
            </form>

            {error && !hideError && (
                <div className="mx-4 mb-4 rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    <p className="font-medium">Argamemnon lost connection</p>
                    <p className="mt-1 text-red-100/70">The last response failed. You can retry the last message.</p>

                    <button
                        type="button"
                        onClick={() => {
                            setHideError(false);
                            regenerate();
                        }}
                        className="mt-3 rounded-full border border-red-200/30 px-3 py-2 text-xs text-red-50 hover:bg-red-200/10"
                    >
                        Retry last message
                    </button> 
                </div>
            )}
        </section>
    );
}
