"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.contactEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            request,
            _subject: `${siteConfig.name} — new inquiry`,
            _template: "table",
          }),
        },
      );

      const data = (await response.json()) as { success?: string; message?: string };

      if (!response.ok || data.success !== "true") {
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setRequest("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Could not send your message. Try again later.",
      );
    }
  }

  const inputClass =
    "w-full rounded-lg border border-surface-800 bg-surface-900 px-4 py-2.5 text-sm text-white placeholder:text-surface-200/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-8"
        role="status"
      >
        <p className="font-semibold text-emerald-200">Message sent</p>
        <p className="mt-2 text-sm text-emerald-100/80">
          Thanks for reaching out. We will reply to your email when we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-brand-400 hover:text-brand-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-surface-200">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1.5 ${inputClass}`}
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-surface-200">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1.5 ${inputClass}`}
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="contact-request" className="block text-sm font-medium text-surface-200">
          Request
        </label>
        <textarea
          id="contact-request"
          name="request"
          required
          rows={6}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Describe your question, correction, or partnership idea…"
          className={`mt-1.5 resize-y min-h-[8rem] ${inputClass}`}
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
