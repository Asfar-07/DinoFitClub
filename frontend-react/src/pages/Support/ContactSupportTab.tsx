/* Contact Support tab  */

import { Card } from "@/components/ui/card";
import { Check, Clock, Mail, MessageCircle, Send } from "lucide-react";
import { useState, type ReactElement } from "react";
import { supportLightInputClass as lightInputClass} from "./SupportCenter";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emptyContactForm: ContactFormData = { name: "", email: "", subject: "", message: "" };



export default function ContactSupportTab(): ReactElement {
  const [form, setForm] = useState<ContactFormData>(emptyContactForm);
  const [sent, setSent] = useState<boolean>(false);

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (): void => {
    console.log("Contact support form:", form);
    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:px-10 lg:grid-cols-[1fr_320px]">
      <Card className="bg-(--primary-bg-color) border-0">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary-text-color) text-[#0d9488]">
            <MessageCircle size={20} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-(--primary-text-color)">Contact Support</h2>
            <p className="mt-1 text-sm text-(--secondary-text-color)">Send us a message and our team will get back to you.</p>
          </div>
        </div>

        {sent ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6faf7] text-[#0d9488]">
              <Check size={22} />
            </span>
            <p className="text-sm font-bold text-(--primary-text-color)">Message sent</p>
            <p className="max-w-xs text-xs text-(--secondary-text-color)">
              Thanks for reaching out — our team will reply to your email shortly.
            </p>
            <button
              onClick={() => {
                setForm(emptyContactForm);
                setSent(false);
              }}
              className="mt-2 text-xs font-bold text-[#0d9488] hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-(--primary-text-color)">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  className={lightInputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-(--primary-text-color)">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={lightInputClass}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-(--primary-text-color)">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="What's this about?"
                className={lightInputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-(--primary-text-color)">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us how we can help..."
                rows={5}
                className={`${lightInputClass} resize-y`}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#0d9488] px-6 py-3 text-sm font-bold text-white transition hover:brightness-105"
            >
              <Send size={15} />
              Send Message
            </button>
          </div>
        )}
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-(--secondary-bg-color) border-0 p-5">
          <p className="text-sm font-bold text-(--primary-text-color)">Other ways to reach us</p>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--primary-text-color) text-[#0d9488]">
                <Mail size={15} />
              </span>
              <div>
                <p className="text-sm font-semibold text-(--primary-text-color)">support@dinoclub.app</p>
                <p className="text-xs text-(--secondary-text-color)">Best for detailed issues</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--primary-text-color) text-[#0d9488]">
                <Clock size={15} />
              </span>
              <div>
                <p className="text-sm font-semibold text-(--primary-text-color)">Typical response time</p>
                <p className="text-xs text-(--secondary-text-color)">Within 24 hours, Mon–Fri</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}