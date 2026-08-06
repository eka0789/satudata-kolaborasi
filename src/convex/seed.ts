import { internal } from "./_generated/api";
import { action } from "./_generated/server";

/** Indonesian provinces used by the Satu Data collaboration platform. */
const PROVINCES = [
  { code: "11", name: "Aceh", region: "Sumatera" },
  { code: "12", name: "Sumatera Utara", region: "Sumatera" },
  { code: "13", name: "Sumatera Barat", region: "Sumatera" },
  { code: "14", name: "Riau", region: "Sumatera" },
  { code: "15", name: "Jambi", region: "Sumatera" },
  { code: "16", name: "Sumatera Selatan", region: "Sumatera" },
  { code: "17", name: "Bengkulu", region: "Sumatera" },
  { code: "18", name: "Lampung", region: "Sumatera" },
  { code: "19", name: "Kepulauan Bangka Belitung", region: "Sumatera" },
  { code: "21", name: "Kepulauan Riau", region: "Sumatera" },
  { code: "31", name: "DKI Jakarta", region: "Jawa" },
  { code: "32", name: "Jawa Barat", region: "Jawa" },
  { code: "33", name: "Jawa Tengah", region: "Jawa" },
  { code: "34", name: "DI Yogyakarta", region: "Jawa" },
  { code: "35", name: "Jawa Timur", region: "Jawa" },
  { code: "36", name: "Banten", region: "Jawa" },
  { code: "51", name: "Bali", region: "Bali & Nusa Tenggara" },
  { code: "52", name: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara" },
  { code: "53", name: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara" },
  { code: "61", name: "Kalimantan Barat", region: "Kalimantan" },
  { code: "62", name: "Kalimantan Tengah", region: "Kalimantan" },
  { code: "63", name: "Kalimantan Selatan", region: "Kalimantan" },
  { code: "64", name: "Kalimantan Timur", region: "Kalimantan" },
  { code: "65", name: "Kalimantan Utara", region: "Kalimantan" },
  { code: "71", name: "Sulawesi Utara", region: "Sulawesi" },
  { code: "72", name: "Sulawesi Tengah", region: "Sulawesi" },
  { code: "73", name: "Sulawesi Selatan", region: "Sulawesi" },
  { code: "74", name: "Sulawesi Tenggara", region: "Sulawesi" },
  { code: "75", name: "Gorontalo", region: "Sulawesi" },
  { code: "76", name: "Sulawesi Barat", region: "Sulawesi" },
  { code: "81", name: "Maluku", region: "Maluku & Papua" },
  { code: "82", name: "Maluku Utara", region: "Maluku & Papua" },
  { code: "91", name: "Papua", region: "Maluku & Papua" },
  { code: "92", name: "Papua Barat", region: "Maluku & Papua" },
] as const;

const CATEGORIES = [
  {
    name: "Open Data",
    slug: "open-data",
    description: "Membuka dan mengelola data publik",
  },
  {
    name: "Kesehatan",
    slug: "kesehatan",
    description: "Data dan program di bidang kesehatan",
  },
  {
    name: "Pendidikan",
    slug: "pendidikan",
    description: "Data dan program di bidang pendidikan",
  },
  {
    name: "Lingkungan",
    slug: "lingkungan",
    description: "Data dan aksi untuk lingkungan",
  },
  {
    name: "Ekonomi",
    slug: "ekonomi",
    description: "Data dan program ekonomi & UMKM",
  },
  {
    name: "Teknologi",
    slug: "teknologi",
    description: "Pengembangan teknologi dan digitalisasi",
  },
  {
    name: "Sosial",
    slug: "sosial",
    description: "Program dan data sosial kemasyarakatan",
  },
] as const;

/**
 * Seeds reference data. Run with `npx convex run seed:seedReferenceData`.
 * Idempotent: skips provinces/categories that already exist.
 */
export const seedReferenceData = action({
  args: {},
  handler: async (ctx) => {
    for (const province of PROVINCES) {
      const existing = await ctx.runQuery(internal.provinces.getByCode, {
        code: province.code,
      });
      if (existing === null) {
        await ctx.runMutation(internal.provinces.seedInsert, {
          ...province,
        });
      }
    }
    for (const category of CATEGORIES) {
      const existing = await ctx.runQuery(internal.categories.getBySlug, {
        slug: category.slug,
      });
      if (existing === null) {
        await ctx.runMutation(internal.categories.seedInsert, category);
      }
    }
  },
});
