import { useQuery } from "convex/react";
import { animate, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  FolderKanban,
  Globe2,
  HandHeart,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import logo from "@/assets/logo.svg";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";

/* ---------------------------------------------------------------------------
 * Motion presets
 * ------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* ---------------------------------------------------------------------------
 * Navbar
 * ------------------------------------------------------------------------- */

function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070a12]/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <img
            src={logo}
            alt="Satu Data Kolaborasi"
            width={30}
            height={30}
            className="rounded-md ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Satu Data<span className="text-primary"> Kolaborasi</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#statistik" className="transition-colors hover:text-white">
            Statistik
          </a>
          <a href="#proyek" className="transition-colors hover:text-white">
            Proyek
          </a>
          <a href="#komunitas" className="transition-colors hover:text-white">
            Komunitas
          </a>
          <a href="#kegiatan" className="transition-colors hover:text-white">
            Kegiatan
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          {!isLoading && isAuthenticated ? (
            <Button
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="bg-white text-slate-900 hover:bg-slate-200"
            >
              Buka Dashboard
              <ArrowRight className="ml-1.5 size-3.5" />
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate("/auth")}
                className="text-slate-200 hover:bg-white/10 hover:text-white"
              >
                Masuk
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/auth")}
                className="bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90"
              >
                Mulai Berkolaborasi
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

/* ---------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#070a12] pb-24 pt-36 sm:pb-32 sm:pt-44">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-[80%] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] translate-x-[10%] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-300 backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            Platform Kolaborasi Data Terbuka untuk Indonesia
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-7 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Satu Data,{" "}
          <span className="bg-gradient-to-r from-primary/80 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
            Kolaborasi Terbuka
          </span>
          , untuk Semua
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Satu Data Kolaborasi menghubungkan pemerintah, komunitas, akademisi, dan
          relawan lintas daerah — berbagi data, proyek, dan keahlian dalam satu
          ekosistem kolaborasi data terbuka.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="group w-full bg-primary px-8 text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/40 sm:w-auto"
          >
            Mulai Berkolaborasi
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="w-full border-white/15 bg-white/5 px-8 text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
          >
            Jelajahi sebagai Tamu
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-400" /> Gratis untuk semua
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe2 className="size-4 text-sky-400" /> Data terbuka lintas daerah
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-primary" /> Kolaborasi lintas sektor
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Stats band
 * ------------------------------------------------------------------------- */

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.3,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("id-ID")}
    </span>
  );
}

const STAT_ITEMS = [
  { key: "provinces", label: "Provinsi Terjangkau", icon: Landmark, color: "text-sky-400 bg-sky-500/10" },
  { key: "communities", label: "Komunitas Aktif", icon: Users, color: "text-primary bg-primary/10" },
  { key: "projects", label: "Proyek Data", icon: FolderKanban, color: "text-violet-400 bg-violet-500/10" },
  { key: "volunteers", label: "Relawan Terlibat", icon: HandHeart, color: "text-emerald-400 bg-emerald-500/10" },
  { key: "events", label: "Kegiatan", icon: CalendarDays, color: "text-amber-400 bg-amber-500/10" },
] as const;

function StatsBand() {
  const stats = useQuery(api.stats.getPlatformStats);

  return (
    <section id="statistik" className="relative -mt-10 scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/5 backdrop-blur"
        >
          <div className="grid grid-cols-2 divide-slate-100 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
            {STAT_ITEMS.map((item) => (
              <div
                key={item.key}
                className="group flex flex-col items-center gap-2 px-4 py-8 text-center transition-colors hover:bg-slate-50"
              >
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-xl ${item.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <item.icon className="size-5" />
                </span>
                <div className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {stats ? (
                    <AnimatedNumber value={stats[item.key]} />
                  ) : (
                    <Skeleton className="mx-auto h-9 w-14" />
                  )}
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Shared bits
 * ------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * How It Works
 * ------------------------------------------------------------------------- */

function HowItWorks() {
  return (
    <section className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading
          eyebrow="Cara Kerja"
          title="Mulai kolaborasi dalam tiga langkah"
          description="Dari bergabung hingga berkontribusi — semua bisa dilakukan dalam hitungan menit."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Users,
              color: "from-primary to-blue-500",
              title: "1. Bergabung",
              description: "Buat akun sebagai individu, komunitas, atau institusi. Gratis dan tanpa komitmen.",
            },
            {
              icon: FolderKanban,
              color: "from-accent to-teal-500",
              title: "2. Jelajahi & Buat",
              description: "Temukan proyek data atau buat inisiatif baru. Ajak kolaborator dari berbagai daerah.",
            },
            {
              icon: HandHeart,
              color: "from-amber-500 to-orange-500",
              title: "3. Berkontribusi",
              description: "Bagikan data, ikuti kegiatan, dan bangun dampak nyata untuk Indonesia.",
            },
          ].map((item, i) => (
            <FeatureCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Featured projects
 * ------------------------------------------------------------------------- */

function FeaturedProjects() {
  const highlights = useQuery(api.stats.getHighlights);
  const projects = highlights?.projects ?? null;

  return (
    <section id="proyek" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading
          eyebrow="Proyek Unggulan"
          title="Inisiatif data yang sedang berjalan"
          description="Proyek kolaboratif terbaru dari komunitas di seluruh Indonesia — dari data terbuka daerah hingga riset partisipatif."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!projects ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>
            ))
          ) : projects.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-12 text-center">
              <FolderKanban className="mx-auto size-8 text-slate-300" />
              <p className="mt-4 font-medium text-slate-700">
                Proyek pertama akan segera hadir
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Mulai inisiatifmu dan jadilah yang pertama berkolaborasi.
              </p>
            </div>
          ) : (
            projects.slice(0, 6).map((project) => (
              <motion.article
                key={project._id}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  >
                    <span className="mr-1.5 size-1.5 rounded-full bg-emerald-500" />
                    Aktif
                  </Badge>
                  <FolderKanban className="size-4 text-slate-300 transition-colors group-hover:text-primary" />
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description ?? "Belum ada deskripsi untuk proyek ini."}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors group-hover:bg-primary/5 group-hover:text-primary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Featured communities
 * ------------------------------------------------------------------------- */

function FeaturedCommunities() {
  const allCommunities = useQuery(api.communities.list, {});
  const communities = allCommunities
    ? [
        ...allCommunities.filter((c) => c.isFeatured),
        ...allCommunities.filter((c) => !c.isFeatured),
      ].slice(0, 4)
    : null;

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

  const avatarStyles = [
    "from-primary to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-sky-500 to-cyan-500",
"from-accent to-teal-500",
  ];

  return (
    <section id="komunitas" className="scroll-mt-24 border-y border-slate-200/70 bg-slate-50/70 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading
          eyebrow="Komunitas Unggulan"
          title="Komunitas yang menghidupkan data"
          description="Temukan komunitas data di daerahmu — saling berbagi praktik, membangun kapasitas, dan menggerakkan kolaborasi."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {!communities ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Skeleton className="size-11 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          ) : communities.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
              <Users className="mx-auto size-8 text-slate-300" />
              <p className="mt-4 font-medium text-slate-700">
                Belum ada komunitas terdaftar
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Bangun komunitasmu dan mulai kolaborasi data di daerahmu.
              </p>
            </div>
          ) : (
            communities.map((community, i) => (
              <motion.article
                key={community._id}
                variants={fadeUp}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                <div
                  className={`inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white ${avatarStyles[i % avatarStyles.length]}`}
                >
                  {initials(community.name)}
                </div>
                <h3 className="mt-4 line-clamp-1 font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
                  {community.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {community.description ?? "Komunitas kolaborasi data di Indonesia."}
                </p>
                {community.isFeatured && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                    <Sparkles className="size-3.5" />
                    Komunitas unggulan
                  </div>
                )}
              </motion.article>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Upcoming events
 * ------------------------------------------------------------------------- */

function UpcomingEvents() {
  const highlights = useQuery(api.stats.getHighlights);
  const events = highlights?.events ?? null;
  const navigate = useNavigate();

  const formatDate = (ts: number) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(ts));

  return (
    <section id="kegiatan" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-5xl"
      >
        <SectionHeading
          eyebrow="Kegiatan Mendatang"
          title="Ruang untuk belajar dan bertemu"
          description="Lokakarya, hackathon, dan data bazaar dari komunitas — jangan lewatkan kesempatan bertemu kolaborator baru."
        />

        <div className="mt-14 space-y-4">
          {!events ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Skeleton className="size-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-12 text-center">
              <CalendarDays className="mx-auto size-8 text-slate-300" />
              <p className="mt-4 font-medium text-slate-700">
                Belum ada kegiatan terjadwal
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Cek kembali nanti untuk kegiatan komunitas terbaru.
              </p>
            </div>
          ) : (
            events.slice(0, 3).map((event) => (
              <motion.div
                key={event._id}
                variants={fadeUp}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-white shadow-md shadow-primary/25">
                  <CalendarDays className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      {formatDate(event.startTime)}
                    </span>
                    {event.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="shrink-0 border-primary/30 text-primary hover:bg-primary/5"
                >
                  Ikut serta
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * CTA + Footer
 * ------------------------------------------------------------------------- */

function CtaSection() {
  const { isAuthenticated, isLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigate only once the anonymous session is actually established, so
  // RequireAuth doesn't bounce us back to /auth before auth state syncs.
  useEffect(() => {
    if (signingIn && !isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [signingIn, isLoading, isAuthenticated, navigate]);

  const handleGuest = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signIn("anonymous");
    } catch (err) {
      console.error("Guest sign-in error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal masuk sebagai tamu. Silakan coba lagi.",
      );
      setSigningIn(false);
    }
  };

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#0a0e1c] px-6 py-16 text-center shadow-2xl shadow-primary/20 sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative">
          <Badge className="border-white/10 bg-white/5 text-primary/80">
            Bergabung gratis, selamanya
          </Badge>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Siap menjadi bagian dari gerakan{" "}
            <span className="bg-gradient-to-r from-primary/80 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Satu Data
            </span>
            ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-400">
            Buat akun, bergabunglah dengan komunitas, dan mulai berkontribusi pada
            proyek data terbuka di seluruh Indonesia.
          </p>

          {error && (
            <p className="mt-5 text-sm text-red-300">{error}</p>
          )}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {!isLoading && isAuthenticated ? (
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-primary px-8 text-white shadow-xl shadow-primary/30 hover:bg-primary/90"
              >
                Buka Dashboard
                <ArrowRight className="ml-2 size-4" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-primary px-8 text-white shadow-xl shadow-primary/30 hover:bg-primary/90"
                >
                  Masuk / Daftar
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleGuest}
                  disabled={signingIn}
                  className="border-white/15 bg-white/5 px-8 text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  {signingIn ? "Menghubungkan..." : "Lanjut sebagai Tamu"}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070a12] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Satu Data Kolaborasi"
            width={26}
            height={26}
            className="rounded-md ring-1 ring-white/10"
          />
          <div className="text-sm">
            <p className="font-semibold text-white">Satu Data Kolaborasi</p>
            <p className="text-xs text-slate-500">
              Kolaborasi data terbuka untuk Indonesia.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          <a href="#statistik" className="transition-colors hover:text-white">Statistik</a>
          <a href="#proyek" className="transition-colors hover:text-white">Proyek</a>
          <a href="#komunitas" className="transition-colors hover:text-white">Komunitas</a>
          <a href="#kegiatan" className="transition-colors hover:text-white">Kegiatan</a>
        </nav>

        <p className="text-xs text-slate-600">
          © {year} Satu Data Kolaborasi
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------- */

export default function Landing() {
  return (
    <div className="scroll-smooth bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <HowItWorks />
        <FeaturedProjects />
        <FeaturedCommunities />
        <UpcomingEvents />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
