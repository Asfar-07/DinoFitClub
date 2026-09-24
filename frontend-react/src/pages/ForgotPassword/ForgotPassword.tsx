import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, ShieldCheck, Clock, MailOpen } from "lucide-react";
import { authHandle } from "../../features/auth/authService";

const google_captcha_key = import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT_KEY;

const securityPoints = [
  {
    icon: ShieldCheck,
    content: (
      <>
        We use Google reCAPTCHA to protect your account from automated
        abuse.
      </>
    ),
  },
  {
    icon: Clock,
    content: (
      <>
        If the email exists, a reset link will be sent and will expire in{" "}
        <span className="font-bold text-[#f0f4f8]">3 minutes</span>.
      </>
    ),
  },
  {
    icon: MailOpen,
    content: <>Please check your spam folder if needed.</>,
  },
];

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!captchaToken) {
      setError("Please verify that you are not a robot");
      return;
    }

    setLoading(true);
    authHandle
      .forgotPasswordService(email, captchaToken)
      .then(() => {
        setMessage(
          "If the email exists, we have sent a password reset link. The link will expire in 3 minutes."
        );
      })
      .catch((err: unknown) => {
        console.log(err);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0f22] text-[#f0f4f8]">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/10 blur-[120px]"
      />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#7be6df]/15 blur-[140px]"></div>
      <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#7be6df]/15 blur-[160px]"></div>

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 py-6 md:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d2233] ring-1 ring-[#56b2bb]/30">
            <img src="/android-chrome-192x192.png" alt="logo" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Dino<span className="text-[#56b2bb]">FitClub</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-full bg-[#1d2233] px-4 py-2 text-sm font-medium text-[#f0f4f8] ring-1 ring-white/10 transition-colors hover:bg-[#1d2233]/70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </button>
      </header>

      {/* Content */}
      <main className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 md:px-10 lg:flex-row lg:py-24">
        {/* Forgot password card */}
        <div className="w-full max-w-xl rounded-3xl glass-strong-nav p-8 ring-1 ring-white/5  sm:p-10">
          <div className="flex items-center gap-4">
            <img
              src="/images/DinoHome.webp"
              alt="DinoFitClub mascot"
              className="h-16 w-auto shrink-0 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
            <div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Forgot <span className="text-[#56b2bb]">Password</span>
              </h1>
              <p className="mt-1 text-sm text-[#bac7cc]">
                Enter your email and verify the captcha.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bac7cc]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-white/10 bg-[#1a2136] pl-11 text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
                />
              </div>
            </div>

            {/* Google reCAPTCHA */}
            <div className="captcha-box flex justify-center rounded-xl bg-[#1a2136] p-4 ring-1 ring-white/10 [&_iframe]:mx-auto">
              <ReCAPTCHA
                sitekey={google_captcha_key} // site key of client
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 ring-1 ring-red-500/20">
                {error}
              </p>
            )}
            {message && (
              <p className="rounded-lg bg-[#56b2bb]/10 px-4 py-2.5 text-sm font-medium text-[#56b2bb] ring-1 ring-[#56b2bb]/20">
                {message}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-full cursor-pointer bg-gradient-to-r from-[#56b2bb] to-[#7fd7e0] font-semibold text-[#0a0f22] shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="mx-auto text-sm font-semibold text-[#56b2bb] underline underline-offset-2 hover:text-[#56b2bb]/80"
            >
              ← Back to Login
            </button>
          </form>
        </div>

        {/* Security information card */}
        <div className="w-full max-w-xl rounded-3xl glass-strong-nav p-8 ring-1 ring-white/5 sm:p-10">
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Security Information
          </h2>

          <ul className="mt-6 flex flex-col gap-6">
            {securityPoints.map(({ icon: Icon, content }, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/15 text-[#56b2bb]">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-sm leading-relaxed text-[#bac7cc] ">
                  {content}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}