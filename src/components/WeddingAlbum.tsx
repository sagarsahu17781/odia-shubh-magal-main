import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Calendar,
  Clock,
  Navigation,
} from "lucide-react";
import { chapters, WEDDING_DATE, WEDDING_VENUE, type Chapter } from "@/lib/wedding-data";
import { Countdown } from "@/components/Countdown";
import { Petals } from "@/components/Petals";
import { Ornament, Lotus } from "@/components/Ornament";
import jagannath from "@/assets/jagannath.jpg";

const VENUE_MAP = "https://www.google.com/maps?q=20.19680475,83.9150519&output=embed";

const DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=20.19680475,83.9150519";
export function WeddingAlbum() {
  const [index, setIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const chapter = chapters[index];

  const go = (next: number) => {
    if (next < 0 || next >= chapters.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    setNavOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full">
      <Petals />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => go(0)}
            className="flex min-w-0 items-center gap-2 text-left"
            aria-label="Home"
          >
            <Lotus className="h-7 w-7 shrink-0 text-accent" />
            <div className="min-w-0">
              <div className="font-script text-xl text-primary leading-none">Sahil & Payal</div>
              <div className="text-xs uppercase text-muted-foreground text-center">
                A Celebration of Love & Togetherness
              </div>
            </div>
          </button>
          <button
            onClick={() => setNavOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-accent/40 px-3 py-2 text-xs uppercase tracking-widest text-primary hover:bg-accent/10"
            aria-label="Open chapters"
          >
            {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">Chapters</span>
          </button>
        </div>
      </header>

      {/* Slide-in chapters menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 top-14.25 z-30 mx-auto max-w-md px-4"
          >
            <div className="chapter-card mt-3 p-4">
              <div className="mb-3 text-center">
                <p className="gold-divider font-script text-xl text-accent">Chapters</p>
              </div>
              <ul className="grid grid-cols-1 gap-1">
                {chapters.map((c, i) => (
                  <li key={c.id}>
                    <button
                      onClick={() => go(i)}
                      className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition ${
                        i === index
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent/10 text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${
                            i === index
                              ? "border-primary-foreground/60"
                              : "border-accent/60 text-accent"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg">{c.title}</span>
                      </span>
                      {c.subtitle && (
                        <span className="font-script text-sm opacity-70">{c.subtitle}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Chapter stage */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-32 pt-6 sm:px-6 sm:pt-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={chapter.id}
            custom={direction}
            initial={{ opacity: 0, x: 40 * direction, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40 * direction, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderChapter(chapter, index)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Prev / Next */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border/40 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-2 text-sm text-primary transition hover:bg-accent/10 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <div className="flex min-w-0 flex-col items-center text-center">
            <span className="font-script text-base text-accent">{chapter.subtitle ?? "·"}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>
          <button
            onClick={() => go(index + 1)}
            disabled={index === chapters.length - 1}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90 disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <JagannathFooter />
    </div>
  );
}

function ChapterShell({ chapter, children }: { chapter: Chapter; children: React.ReactNode }) {
  return (
    <article className="chapter-card overflow-hidden">
      <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-96">
        <img
          src={chapter.image}
          alt={chapter.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center text-ivory">
          <p className="font-script text-2xl text-accent drop-shadow">{chapter.subtitle}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-wide drop-shadow">
            {chapter.title}
          </h1>
        </div>
      </div>
      <div className="px-5 py-8 sm:px-10 sm:py-12">
        <Ornament className="mx-auto h-6 w-48 text-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg italic leading-relaxed text-foreground/85 sm:text-xl">
          “{chapter.quote}”
        </p>
        <div className="mt-8">{children}</div>
      </div>
    </article>
  );
}

function DetailGrid({ chapter }: { chapter: Chapter }) {
  const d = chapter.details;
  if (!d) return null;
  const items = [
    d.date && { icon: Calendar, label: "Date", value: d.date },
    d.time && { icon: Clock, label: "Time", value: d.time },
    d.venue && { icon: MapPin, label: "Venue", value: d.venue },
    d.startingLocation && { icon: Navigation, label: "Starting From", value: d.startingLocation },
  ].filter(Boolean) as { icon: typeof Calendar; label: string; value: string }[];
  return (
    <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="ornate-frame rounded-lg bg-secondary/60 p-5 text-center">
          <Icon className="mx-auto h-5 w-5 text-accent" />
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 font-display text-lg text-primary">{value}</p>
        </div>
      ))}
    </div>
  );
}

function renderChapter(chapter: Chapter, index: number) {
  if (chapter.id === "welcome") return <Welcome />;
  if (chapter.id === "gallery") return <Gallery chapter={chapter} />;
  if (chapter.id === "venue") return <Venue chapter={chapter} />;
  if (chapter.id === "blessings") return <Blessings chapter={chapter} />;
  return (
    <ChapterShell chapter={chapter} key={index}>
      <DetailGrid chapter={chapter} />
    </ChapterShell>
  );
}

function Welcome() {
  return (
    <section className="chapter-card overflow-hidden">
      <div className="relative px-6 pt-10 pb-12 sm:px-12 sm:pt-16 text-center ornate-frame">
        <p className="font-deva text-sm tracking-widest text-accent">॥ ॐ श्री जगन्नाथाय नमः ॥</p>
        <p className="mx-auto mt-6 max-w-2xl text-base italic text-foreground/80 sm:text-lg">
          With the blessings of <span className="text-primary">Lord Jagannath</span> and our beloved
          families, we cordially invite you to celebrate the wedding of
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
          <h1 className="font-script text-6xl text-primary sm:text-7xl">Sahil</h1>
          <div className="flex flex-col items-center text-accent">
            <Lotus className="h-10 w-10 animate-shimmer" />
            <span className="font-script text-xl">weds</span>
          </div>
          <h1 className="font-script text-6xl text-primary sm:text-7xl">Payal</h1>
        </div>

        <div className="mt-8">
          <Ornament className="mx-auto h-6 w-56 text-accent" />
          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-muted-foreground whitespace-pre">
            {"\nSave the Date\n"}
          </p>
          <p className="mt-2 font-display text-2xl text-primary sm:text-3xl">
            Sunday, 12 July 2026
          </p>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" /> {WEDDING_VENUE}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <Countdown target={WEDDING_DATE} />
        </div>

        <div className="mt-12 rounded-lg border border-accent/30 bg-secondary/50 px-6 py-8 text-left sm:px-10">
          <p className="text-center font-script text-2xl text-accent">A note from our families</p>
          <p className="mt-4 text-center italic text-foreground/80">
            With great joy and happiness, the Sahu Family cordially invites you to grace the
            auspicious wedding ceremony of our beloved children. We would be honored by your
            presence and blessings as we celebrate this special occasion together.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Groom's Family
              </p>
              <p className="mt-1 font-display text-lg text-primary">Mr. & Mrs. Sahu</p>
              <p className="text-sm text-muted-foreground">Parents of Sahil</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Bride's Family
              </p>
              <p className="mt-1 font-display text-lg text-primary">Mr. & Mrs. Sahu</p>
              <p className="text-sm text-muted-foreground">Parents of Payal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ chapter }: { chapter: Chapter }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <ChapterShell chapter={chapter}>
      <GalleryGrid onOpen={setActive} active={active} onClose={() => setActive(null)} />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Family · Engagement · Pre-wedding moments
      </p>
    </ChapterShell>
  );
}

function GalleryGrid({
  active,
  onOpen,
  onClose,
}: {
  active: string | null;
  onOpen: (src: string) => void;
  onClose: () => void;
}) {
  // Pull all chapter images
  const imgs = chapters.map((c) => ({ src: c.image, alt: c.title }));
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {imgs.map((img, i) => (
          <button
            key={i}
            onClick={() => onOpen(img.src)}
            className="ornate-frame group relative aspect-square overflow-hidden rounded-lg"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-2 left-2 right-2 truncate text-left font-script text-lg text-ivory opacity-0 transition group-hover:opacity-100">
              {img.alt}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4"
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={active}
              alt=""
              className="max-h-[85vh] max-w-full rounded-lg border border-accent/40"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-background/90 p-2 text-primary"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Venue({ chapter }: { chapter: Chapter }) {
  return (
    <ChapterShell chapter={chapter}>
      <div className="ornate-frame overflow-hidden rounded-lg">
        <iframe
          title="Venue map"
          src={VENUE_MAP}
          className="h-72 w-full sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-accent/30 bg-secondary/50 p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Address</p>
          <p className="mt-1 font-display text-lg text-primary">
            Maa Patakhanda kalyani mandap, Main Road, Balliguda, Odisha 762103
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Landmark</p>
          <p className="mt-1 text-foreground/80">
            Maa Patakhandha temple is located on the main road of Balliguda, near the Balliguda bus
            stand. It is a well-known landmark in the area and can be easily found by locals and
            visitors alike. The temple is a popular destination for devotees and tourists, and its
            proximity to the bus stand makes it convenient for those traveling to the area.
          </p>
        </div>
        <div className="rounded-lg border border-accent/30 bg-secondary/50 p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <p className="mt-1 font-display text-lg text-primary">Mr. Sagar Sahu </p>
          <p className="text-foreground/80">+91 9692876830</p>
          <p className="mt-3 font-display text-lg text-primary">Mrs. Prakash Chandra sahu</p>
          <p className="text-foreground/80">+91 8895480118</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          <Navigation className="h-4 w-4" /> Get Directions
        </a>
      </div>
    </ChapterShell>
  );
}

interface Blessing {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function Blessings({ chapter }: { chapter: Chapter }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<Blessing[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("blessings")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) toast.error("Could not load blessings");
        else setList((data ?? []) as Blessing[]);
        setLoading(false);
      });

    const channel = supabase
      .channel("blessings-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "blessings" },
        (payload) => {
          const b = payload.new as Blessing;
          setList((l) => (l.some((x) => x.id === b.id) ? l : [b, ...l]));
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("blessings")
      .insert({ name: n, message: m })
      .select("id, name, message, created_at")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Could not send blessing. Please try again.");
      return;
    }
    if (data) {
      setList((l) => (l.some((x) => x.id === data.id) ? l : [data as Blessing, ...l]));
    }
    setName("");
    setMessage("");
    toast.success("Your blessing has been received 🌸");
  };

  return (
    <ChapterShell chapter={chapter}>
      <form
        onSubmit={submit}
        className="mx-auto max-w-xl rounded-lg border border-accent/30 bg-secondary/50 p-5"
      >
        <p className="text-center font-script text-2xl text-accent">Leave your blessing</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={80}
          className="mt-4 w-full rounded-md border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your wishes & blessings…"
          rows={3}
          maxLength={500}
          className="mt-3 w-full rounded-md border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full rounded-full bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send Blessing"}
        </button>
      </form>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {loading && list.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">Gathering blessings…</p>
        ) : list.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            Be the first to bless Sahil & Payal.
          </p>
        ) : (
          list.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="ornate-frame relative rounded-lg bg-card p-5"
            >
              <Lotus className="absolute right-3 top-3 h-5 w-5 text-accent/60" />
              <p className="italic text-foreground/80">"{b.message}"</p>
              <p className="mt-3 font-script text-xl text-primary">— {b.name}</p>
            </motion.div>
          ))
        )}
      </div>
    </ChapterShell>
  );
}

function JagannathFooter() {
  return (
    <footer className="relative z-10 mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6">
      <div className="chapter-card overflow-hidden">
        <div className="grid items-center md:grid-cols-2">
          <div className="relative h-72 md:h-full">
            <img
              src={jagannath}
              alt="Lord Jagannath"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-6 py-10 text-center sm:px-10">
            <p className="font-deva text-sm tracking-widest text-accent">॥ जय जगन्नाथ ॥</p>
            <Ornament className="mx-auto mt-4 h-6 w-48 text-accent" />
            <p className="mt-6 font-display text-xl italic leading-relaxed text-primary sm:text-2xl">
              "May Lord Jagannath bless this sacred union with happiness,prosperity,harmony,love,
              and lifelong companionship."
            </p>
            <Ornament className="mx-auto mt-6 h-6 w-48 text-accent" />
            <p className="mt-8 text-foreground/80">
              Thank you for being a part of our special day and blessing our new journey together.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{/*  */}</p>
                <p className="font-display text-primary"></p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{/*  */}</p>
                <p className="font-display text-primary"></p>
              </div>
            </div>
            <p className="mt-6 font-script text-2xl text-accent">— Sahil & Payal —</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
