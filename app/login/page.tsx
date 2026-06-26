"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: implementasi API login
    console.log({ phone, password, remember });

    setIsLoading(false);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side: Visual Brand Area */}
      <section className="relative w-full md:w-1/2 min-h-[300px] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="People connecting"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-a-woman-is-holding-phone-and-looking-at-the-screen-png-image_12503070.png"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 p-margin-base text-center max-w-lg">
          <div className="mb-gutter flex justify-center">
            <MaterialIcon
              name="chat"
              filled
              className="text-on-primary text-[100px]"
            />
          </div>

          <h1 className="text-4xl italic text-on-primary mb-4">
            Simple, Fast & Secure
          </h1>

          <p className="text-primary-fixed opacity-90">
            Manage your business communication more easily with a modern,
            stable, and trusted Wa One Gateway system.
          </p>
        </div>
      </section>

      {/* Right Side: Login Form Area */}
      <section className="flex-1 flex items-center justify-center min-h-screen bg-surface-container-lowest">
        <div className="w-full max-w-[400px] p-6">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-12 text-center">
            <img
              src="logo.jpg"
              alt="Wa One Logo"
              className="h-12 w-auto object-contain mb-1"
            />
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Welcome back
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sign in to continue your conversations
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nomor WhatsApp */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="font-label-md text-label-md text-on-surface-variant block ml-1"
              >
                Nomor WhatsApp
              </label>
              <div className="relative">
                <MaterialIcon
                  name="phone"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                />
                <input
                  id="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-container-low border-transparent focus:border-primary focus:ring-0 transition-all font-body-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1 font-label-md text-label-md text-on-surface-variant">
                <label htmlFor="password">Password</label>
                <Link href="#" className="text-primary font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <MaterialIcon
                  name="lock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-surface-container-low border-transparent focus:border-primary focus:ring-0 transition-all font-body-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  <MaterialIcon
                    name={showPassword ? "visibility_off" : "visibility"}
                    className="text-2xl"
                  />
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 ml-1">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-outline text-primary focus:ring-primary cursor-pointer"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="font-label-md text-label-md text-on-surface-variant cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}