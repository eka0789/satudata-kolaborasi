# Project Overview

## 🏛️ Enterprise Government Starter Kit (`my-starter-kit-gov`)

Starter Kit ini dirancang khusus untuk membangun aplikasi instansi pemerintah (Kementerian, Lembaga, Pemerintah Daerah) yang siap pakai, aman, dan mematuhi arsitektur SPBE (Sistem Pemerintahan Berbasis Elektronik).

---

## 🎯 Purpose

Membangun aplikasi tingkat enterprise yang terukur dan aman menggunakan teknologi modern terkini, namun tetap mempertahankan kesederhanaan arsitektur sehingga mudah dikembangkan dan dipelihara baik oleh tim maupun pengembang mandiri (solo developer).

---

## 💡 Core Principles

1. **Simplicity Over Complexity**: Arsitektur yang jelas tanpa tingkat abstraksi yang berlebihan.
2. **Convention Over Configuration**: Mematuhi struktur folder dan penamaan baku yang konsisten.
3. **AI-Friendly Architecture**: Struktur berkas dan instruksi `.ai` dirancang khusus agar AI Coding Assistant dapat bekerja dengan presisi tinggi.
4. **Feature-First / Vertical Slice**: Setiap fitur bersifat otonom dan mengemas UI, API, Schema, Hooks, serta Logic sendiri.
5. **Production Ready**: Memenuhi standar keamanan BSSN/OWASP, audit trail BPK, dan performa tinggi secara default.
6. **Maintainable**: Kode dapat dipahami oleh pengembang baru dalam waktu satu hari.
7. **Strong Type Safety**: Tidak ada `any`, validasi penuh dari database hingga komponen UI.
8. **Fast Development**: Siklus iterasi cepat menggunakan Turborepo, Vite, Hono, dan Drizzle ORM.

---

## 📜 Guiding Rule

Setiap kode yang dihasilkan oleh AI maupun pengembang manusia harus berpegang teguh pada filosofi di atas. Jangan pernah memasukkan abstraksi atau dependensi yang tidak diperlukan.