import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background p-6"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
        <SearchX className="size-8 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Halaman tidak ditemukan</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Halaman yang kamu cari mungkin telah dipindahkan atau dihapus.
      </p>
      <Button
        className="mt-8 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="mr-2 size-4" />
        Kembali ke Dashboard
      </Button>
    </motion.div>
  );
}