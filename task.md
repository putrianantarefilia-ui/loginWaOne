# Task: Setup Next.js + Tailwind CSS & Implementasi Halaman Auth (Wa One)

> **Ditujukan untuk:** Junior Developer / Model AI yang akan mengerjakan task ini  
> **Tujuan:** Setup project Next.js dengan Tailwind CSS custom config, lalu implementasikan halaman Login dan Register berdasarkan file HTML referensi yang sudah disediakan.

---

## 📁 Struktur Folder Target

```
project-root/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── components/
│   └── MaterialIcon.tsx
├── public/
├── styles/
│   └── globals.css
├── login.html          ← referensi desain RESMI (jangan ubah file ini)
├── register.html       ← referensi desain RESMI (jangan ubah file ini)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## ✅ Langkah 1 — Inisialisasi Project Next.js

Jalankan perintah berikut di terminal, di dalam folder project ini:

```bash
npx create-next-app@latest . --typescript --eslint --app --src-dir no --import-alias "@/*"
```

> ⚠️ **Jangan gunakan flag `--tailwind`** — kita akan mengkonfigurasi Tailwind secara manual agar bisa memasukkan custom color token dari file HTML referensi.

Jika diminta konfirmasi overwrite file yang sudah ada, ketik `y` lalu Enter.

---

## ✅ Langkah 2 — Install Tailwind CSS + Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/forms
npx tailwindcss init -p
```

> `@tailwindcss/forms` dibutuhkan karena file HTML referensi menggunakan `?plugins=forms` pada Tailwind CDN.

---

## ✅ Langkah 3 — Konfigurasi Tailwind CSS

Ganti seluruh isi `tailwind.config.ts` dengan konfigurasi berikut.  
**Ini adalah custom design token yang diambil langsung dari `login.html` dan `register.html`:**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#226e63",
        "background": "#f7f9fc",
        "on-tertiary-container": "#005249",
        "secondary-fixed-dim": "#8cd4c7",
        "tertiary-fixed": "#8ff4e3",
        "surface-container-high": "#e6e8eb",
        "on-tertiary-fixed-variant": "#005047",
        "on-primary-fixed-variant": "#005322",
        "outline-variant": "#bbcbb9",
        "error": "#ba1a1a",
        "surface-container": "#eceef1",
        "tertiary-fixed-dim": "#72d8c8",
        "tertiary-container": "#63c9b9",
        "on-tertiary": "#ffffff",
        "on-secondary-fixed-variant": "#005047",
        "primary-fixed": "#66ff8e",
        "surface-container-low": "#f2f4f7",
        "on-background": "#191c1e",
        "on-tertiary-fixed": "#00201c",
        "primary-container": "#25d366",
        "on-primary": "#ffffff",
        "surface": "#f7f9fc",
        "surface-tint": "#006d2f",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        "on-surface-variant": "#3c4a3d",
        "surface-dim": "#d8dadd",
        "surface-container-highest": "#e0e3e6",
        "secondary": "#1c695f",
        "error-container": "#ffdad6",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#191c1e",
        "secondary-fixed": "#a8f0e3",
        "primary-fixed-dim": "#3de273",
        "surface-bright": "#f7f9fc",
        "inverse-on-surface": "#eff1f4",
        "outline": "#6c7b6b",
        "tertiary": "#006b5f",
        "primary": "#006d2f",
        "on-error": "#ffffff",
        "on-primary-fixed": "#002109",
        "secondary-container": "#a5ede0",
        "inverse-surface": "#2d3133",
        "inverse-primary": "#3de273",
        "surface-variant": "#e0e3e6",
        "on-primary-container": "#005523",
        "on-secondary-fixed": "#00201c",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "content-min-width": "400px",
        "stack-xs": "0.25rem",
        "sidebar-width": "30%",
        "margin-base": "1.5rem",
        "stack-sm": "0.5rem",
        "gutter": "1rem",
        "stack-md": "1rem",
      },
      fontFamily: {
        "headline-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
      },
      fontSize: {
        "headline-lg": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-sm": ["11px", { lineHeight: "14px", fontWeight: "400" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
```

---

## ✅ Langkah 4 — Setup Global CSS & Font

**`styles/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Diambil dari register.html — gradient overlay kiri */
.whatsapp-overlay {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.9) 0%, rgba(7, 94, 84, 0.9) 100%);
}

/* Konfigurasi default Material Symbols */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

**`app/layout.tsx`:**
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wa One",
  description: "Simple. Reliable. Secure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Material Symbols — digunakan di login.html dan register.html untuk ikon */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className={`${inter.className} bg-background text-on-background min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
```

---

## ✅ Langkah 5 — Buat Helper: MaterialIcon Component

Ikon di file HTML referensi menggunakan Material Symbols dengan custom `font-variation-settings`. Buat komponen ini agar mudah dipakai:

**`components/MaterialIcon.tsx`:**
```tsx
interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function MaterialIcon({ name, className = "", filled = false }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}
```

Contoh penggunaan (sesuai login.html):
```tsx
// Ikon filled (seperti di sisi kiri login.html)
<MaterialIcon name="chat" filled className="text-on-primary text-[80px]" />

// Ikon outline biasa (seperti di form register.html)
<MaterialIcon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
```

---

## ✅ Langkah 6 — Implementasi Halaman Login

Buat file: `app/login/page.tsx`

**Referensi:** Buka `login.html` di folder ini dan ikuti strukturnya dengan tepat.

**Ringkasan layout login.html:**
- Wrapper: `<main className="flex flex-col md:flex-row min-h-screen">`
- **Section Kiri** (`hidden md:flex md:w-1/2`) — background `bg-primary`, foto dengan overlay gradient, teks branding, ikon `chat` (filled)
- **Section Kanan** (`flex-1`) — logo "Wa One" + ikon `forum`, form login, divider "OR SIGN IN WITH", tombol Google & Apple ID, link register, footer

**Struktur komponen:**
```tsx
"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      {/* ===== SECTION KIRI: Branding ===== */}
      {/* Salin <section class="hidden md:flex md:w-1/2 ..."> dari login.html */}
      {/* Ganti semua class="..." → className="..." */}
      {/* Ganti <span class="material-symbols-outlined" data-icon="chat"> → <MaterialIcon name="chat" filled ... /> */}
      {/* Tag <img> harus self-closing: <img ... /> */}

      {/* ===== SECTION KANAN: Form Login ===== */}
      {/* Salin <section class="flex-1 ..."> dari login.html */}
      {/* Pada <form>: tambahkan onSubmit={handleSubmit} */}
      {/* Pada input email: tambahkan value={email} onChange={(e) => setEmail(e.target.value)} */}
      {/* Pada input password: tambahkan value={password} onChange={(e) => setPassword(e.target.value)} */}
      {/* Pada checkbox: tambahkan checked={remember} onChange={(e) => setRemember(e.target.checked)} */}
      {/* Pada <label for="...">: ganti → htmlFor="..." */}

    </main>
  );
}
```

---

## ✅ Langkah 7 — Implementasi Halaman Register

Buat file: `app/register/page.tsx`

**Referensi:** Buka `register.html` di folder ini dan ikuti strukturnya dengan tepat.

**Ringkasan layout register.html:**
- Wrapper: `<div className="bg-background ... min-h-screen flex flex-col">`
- **Section Kiri** (`md:w-1/2`) — foto background + div `whatsapp-overlay` (gradient), logo `chat_bubble`, teks "Welcome to Wa One"
- **Section Kanan** (`md:w-1/2`) — form dengan 4 field (nama, email, password, konfirmasi password), masing-masing dengan ikon Material Symbols di kiri input
- **Footer** — terpisah di luar `<main>`, berisi nama brand + link + copyright

**Struktur komponen:**
```tsx
"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    // TODO: implementasi API call register
    console.log(form);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">

      <main className="flex-grow flex flex-col md:flex-row">

        {/* ===== SECTION KIRI: Branding ===== */}
        {/* Salin <section class="relative w-full md:w-1/2 ..."> dari register.html */}
        {/* Class "whatsapp-overlay" sudah didefinisikan di globals.css — tinggal pakai */}
        {/* Ganti <span class="material-symbols-outlined"> → <MaterialIcon name="chat_bubble" filled ... /> */}

        {/* ===== SECTION KANAN: Form Register ===== */}
        {/* Salin <section class="w-full md:w-1/2 ..."> dari register.html */}
        {/* Pada <form>: tambahkan onSubmit={handleSubmit} */}
        {/* Setiap <input>: tambahkan name="..." value={form.name} onChange={handleChange} */}
        {/* Contoh untuk field name: */}
        {/*   <input name="name" value={form.name} onChange={handleChange} ... /> */}
        {/* Ganti <label for="..."> → htmlFor="..." */}
        {/* Ikon di dalam input: pakai <MaterialIcon name="person" className="absolute left-3 ..." /> */}

      </main>

      {/* ===== FOOTER ===== */}
      {/* Salin <footer ...> dari register.html — letakkan di luar <main> */}

    </div>
  );
}
```

---

## ✅ Langkah 8 — Jalankan & Verifikasi

```bash
npm run dev
```

Buka di browser:
- `http://localhost:3000/login` → harus tampil identik dengan `login.html`
- `http://localhost:3000/register` → harus tampil identik dengan `register.html`

---

## ✅ Checklist Sebelum Selesai

- [ ] `npm run dev` berjalan tanpa error di terminal
- [ ] Halaman `/login` tampil identik dengan `login.html`:
  - [ ] Layout 2 kolom (kiri hijau, kanan putih) pada layar ≥ md
  - [ ] Ikon Material Symbols muncul (chat, forum, laptop_mac)
  - [ ] Tombol Login berwarna hijau (`#25d366`) dengan sudut penuh (`rounded-full`)
  - [ ] Tombol Google & Apple ID tampil di bawah divider
- [ ] Halaman `/register` tampil identik dengan `register.html`:
  - [ ] Gradient overlay hijau di sisi kiri
  - [ ] 4 field input dengan ikon di kiri (person, mail, lock, lock_reset)
  - [ ] Tombol Register dengan ikon `arrow_forward`
  - [ ] Footer terpisah di bawah halaman
- [ ] Semua input bisa diketik (controlled component)
- [ ] `npm run build` berhasil tanpa TypeScript error
- [ ] Tidak ada console error di browser DevTools

---

## ⚠️ Tabel Konversi HTML → TSX (Referensi Cepat)

| ❌ HTML | ✅ TSX |
|--------|-------|
| `class="..."` | `className="..."` |
| `for="id"` pada `<label>` | `htmlFor="id"` |
| `<input type="text">` | `<input type="text" />` |
| `<img src="" alt="">` | `<img src="" alt="" />` |
| `style="font-variation-settings: 'FILL' 1"` | `style={{ fontVariationSettings: "'FILL' 1" }}` |
| `<span class="material-symbols-outlined" data-icon="chat">chat</span>` | `<MaterialIcon name="chat" filled />` |
| `onclick="fn()"` | `onClick={fn}` |
| Lupa `"use client"` | Tambahkan di baris **pertama** file |

---

## 📌 Catatan Penting

- **Jangan ubah desain** — tugasnya hanya mengkonversi, bukan redesign
- **`login.html` dan `register.html`** adalah referensi FINAL — ikuti tepat
- URL gambar background (`lh3.googleusercontent.com/...`) bisa dipakai langsung, tidak perlu download
- Class `.whatsapp-overlay` dan `.material-symbols-outlined` sudah didefinisikan di `globals.css`
- Jika ada class Tailwind yang tidak render, pastikan class tersebut ada di custom config `tailwind.config.ts` di atas

---

*Task dibuat oleh: Senior Developer / Claude Sonnet*  
*Dikerjakan oleh: Junior Developer / Model AI*