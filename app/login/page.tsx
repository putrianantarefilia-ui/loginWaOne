"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: implementasi API call login
    console.log({ email, password, remember });
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side: Branding & Illustration */}
      <section className="relative w-full md:w-1/2 min-h-[300px] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            alt="People connecting"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            src="https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-a-woman-is-holding-phone-and-looking-at-the-screen-png-image_12503070.png"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary mix-blend-multiply"></div>
        </div>
        {/* Foreground Content */}
        <div className="relative z-10 p-margin-base text-center max-w-lg">
          <div className="mb-gutter flex justify-center">
            <MaterialIcon
              name="chat"
              filled
              className="text-on-primary text-[80px]"
            />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-primary mb-stack-md text-4xl italic">
            Simple, Fast & Secure
          </h1>
          <p className="font-body-lg text-body-lg text-primary-fixed">
            Manage your business communication more easily with a modern, stable, and trusted Wa One Gateway system.
          </p>
          {/* Abstract Connectivity Graphic */}
          <div className="mt-12 flex justify-center gap-4 opacity-50">
            <div className="w-2 h-2 rounded-full bg-on-primary"></div>
            <div className="w-2 h-2 rounded-full bg-on-primary"></div>
            <div className="w-2 h-2 rounded-full bg-on-primary"></div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="flex-1 flex items-center justify-center min-h-screen bg-surface-container-lowest">
        <div className="w-full max-w-[400px]">
          {/* Header / Logo */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="logo.jpg" // Ganti dengan nama file logomu di folder public
                alt="Wa One Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Welcome back
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Sign in to continue your conversations
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative group">
                <input
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border-transparent focus:border-primary-container focus:ring-0 transition-all font-body-md text-body-md"
                  id="email"
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-stack-sm">
              <div className="flex justify-between items-center px-1">
                <label
                  className="font-label-md text-label-md text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="font-label-md text-label-md text-primary hover:underline transition-all"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Container Input dibuat relative untuk menempatkan ikon */}
              <div className="relative group">
                <input
                  className="w-full px-4 py-3 pr-12 bg-surface-container rounded-lg border-transparent focus:border-primary-container focus:ring-0 transition-all font-body-md text-body-md"
                  id="password"
                  placeholder="password"
                  // Ubah type secara dinamis
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Tombol Ikon Mata */}
                <button
                  type="button" // HARUS type="button" agar tidak men-submit form
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                >
                  <MaterialIcon
                    // Nama ikon berubah sesuai state
                    name={showPassword ? "visibility_off" : "visibility"}
                    className="text-2xl"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <input
                className="w-4 h-4 rounded border-outline text-primary focus:ring-primary-container"
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                className="font-label-md text-label-md text-on-surface-variant"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <button
              className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{" "}
            <Link
              className="text-primary font-bold hover:underline"
              href="/register"
            >
              Sign up
            </Link>
          </p>
        </div>


      </section>
    </main>
  );
}
