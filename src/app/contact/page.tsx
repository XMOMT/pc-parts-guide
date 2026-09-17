import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with PC Parts Guide — questions, corrections, and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="section-container py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-surface-200">Contact</span>
      </nav>

      <h1 className="section-title">Contact</h1>
      <p className="mt-4 max-w-2xl text-surface-200/70">
        Questions, corrections, or partnership inquiries — fill out the form and we will get back
        to you by email.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
