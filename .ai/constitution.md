# AI Constitution (Kontrak Kerja AI Assistant)

Dokumen ini adalah konstitusi tertinggi yang mengatur perilaku AI Assistant dalam membaca, menghasilkan, dan memodifikasi kode pada repositori ini.

---

## 📜 Prioritas Pembacaan Dokumen (Reading Hierarchy)

Sebelum menghasilkan kode, AI wajib membaca dokumen konteks di direktori `.ai/` sesuai urutan berikut:

1. `project.md`
2. `tech-stack.md`
3. `architecture.md`
4. `folder-structure.md`
5. `coding-standards.md`
6. `backend.md`
7. `frontend.md`
8. `database.md`
9. `api-rules.md`
10. `security.md`
11. `ui-guidelines.md`
12. `workflow.md`
13. `definition-of-done.md`
14. `business-rules.md`
15. `domain-*.md` (Dokumen Spesifikasi Domain Khusus jika ada, contoh: `domain-satudata-indonesia.md`)
16. `agent-memory.md`

---

## ⚖️ Aturan Resolusi Konflik Dokumen

Jika terjadi kontradiksi antar dokumen, tingkat hierarki resolusi keputusan adalah sebagai berikut:

1. `domain-*.md` & `business-rules.md` (Spesifikasi Domain & Regulasi Pemerintah)
2. `agent-memory.md` (Keputusan Arsitektur Terbaru)
3. `architecture.md` (Arsitektur Single-App + Convex)
4. `coding-standards.md` (Standar Kualitas Kode)

---

## ⛔ Larangan Keras Bagi AI Assistant

1. Dilarang menghasilkan kode parsial, potongan kode tanpa konteks, atau kode yang menyisakan `// TODO`.
2. Dilarang mengubah stack teknologi dasar (npm, React, Vite, Tailwind CSS, shadcn/ui, Convex, ConvexAuth, Zod).
3. Dilarang menghapus kolom audit trail atau mekanisme Soft Delete pada database.
