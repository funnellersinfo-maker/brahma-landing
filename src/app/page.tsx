"use client";

/* =====================================================================
   BRAHMA — Landing Premium · Página principal
   13 secciones · HTML semántico · JS vanilla en hooks · CRO-first
   ===================================================================== */

import { useEffect, useRef, useState, useCallback } from "react";
import "./landing.css";

/* ------------------------------------------------------------------ */
/*  DATOS                                                              */
/* ------------------------------------------------------------------ */

type Colorway = { id: string; label: string; img: string; swatch: string };

const COLORWAYS: Colorway[] = [
  { id: "beige", label: "Arena", img: "/images/combo-beige.jpg", swatch: "beige" },
  { id: "brown", label: "Café", img: "/images/combo-brown.jpg", swatch: "brown" },
  { id: "olive", label: "Oliva", img: "/images/combo-olive.jpg", swatch: "olive" },
  { id: "blue", label: "Azul Noche", img: "/images/combo-blue.jpg", swatch: "blue" },
  { id: "black", label: "Negro", img: "/images/combo-black.jpg", swatch: "black" },
];

const PRICE_OLD = 219000;
const PRICE_NOW = 119900;

const BENEFITS = [
  {
    title: "Pago Contra Entrega",
    desc: "Paga solo cuando recibas tu combo en la puerta de tu casa. Cero riesgo, cero fraude.",
    icon: "cash",
  },
  {
    title: "Envío Gratis a Todo Colombia",
    desc: "Despacho en 24h y entrega en 2 a 4 días hábiles. Sin costos ocultos, sin sorpresas.",
    icon: "truck",
  },
  {
    title: "Garantía de 30 Días",
    desc: "¿No te convence? Te devolvemos tu dinero. Tu satisfacción es la única condición.",
    icon: "shield",
  },
  {
    title: "Materiales Premium",
    desc: "Cuero sintético de alta densidad, interior acolchado y costuras reforzadas.",
    icon: "gem",
  },
  {
    title: "Suela Antideslizante",
    desc: "Goma de alta fricción con amortiguación. Estabilidad real en cada pisada.",
    icon: "layers",
  },
  {
    title: "Gorra Bordada Premium",
    desc: "Bordado 3D con hilo resistente, visera curva pre-moldeada y cierre ajustable.",
    icon: "crown",
  },
];

const GALLERY = COLORWAYS.map((c) => ({ src: c.img, alt: `Combo BRAHMA color ${c.label}` }));

const LIFE_TILES = [
  { src: "/images/combo-brown.jpg", cap: "Daily Ready", sub: "Look urbano", cls: "a" },
  { src: "/images/combo-black.jpg", cap: "After Dark", sub: "Edición nocturna", cls: "b" },
  { src: "/images/combo-blue.jpg", cap: "City Walk", sub: "Comfort +", cls: "c" },
  { src: "/images/combo-olive.jpg", cap: "Off Duty", sub: "Estilo libre", cls: "d" },
];

const COMPARE_US = [
  "Pago Contra Entrega — pagas al recibir",
  "Envío gratis a todo el país",
  "Gorra bordada incluida en el combo",
  "Garantía de devolución de 30 días",
  "Materiales premium verificados",
  "Atención por WhatsApp 7 días/semana",
];
const COMPARE_THEM = [
  "Pago anticipado con tarjeta",
  "Envío con costo adicional",
  "Gorra vendida por separado",
  "Sin garantía o solo 7 días",
  "Materiales genéricos",
  "Soporte solo por correo",
];

const TESTIMONIALS = [
  { name: "Andrés Gómez", city: "Bogotá", initials: "AG", color: "#1a1a1c", stars: 5,
    quote: "Llegó en 3 días y pagué cuando lo tuve en la mano. Los tenis se sienten caros, la gorra es una belleza. Repetiré sin dudar." },
  { name: "Valentina Ríos", city: "Medellín", initials: "VR", color: "#3a4a63", stars: 5,
    quote: "Pensé que era estafa por el precio pero la calidad me sorprendió. El combo completo por menos de lo que vale un par solo en centros comerciales." },
  { name: "Sebastián Marín", city: "Cali", initials: "SM", color: "#6b4a2e", stars: 5,
    quote: "La contra entrega me dio toda la confianza. Producto tal cual las fotos, bien empacado. 10/10." },
  { name: "Camila Torres", city: "Barranquilla", initials: "CT", color: "#5a5a32", stars: 4,
    quote: "Compré para mi novio y le encantó. Talla perfecta gracias a la guía. La gorra bordada se ve premium de verdad." },
  { name: "David Ruiz", city: "Bucaramanga", initials: "DR", color: "#b87a1e", stars: 5,
    quote: "Llevo 2 semanas usándolos a diario y están intactos. La suela agarra súper bien. Mejor compra del año." },
  { name: "Mariana López", city: "Pereira", initials: "ML", color: "#1a1a1c", stars: 5,
    quote: "El servicio al cliente respondió en 2 minutos por WhatsApp. Pedí 2 combos para mi hermano y yo. Llegaron impecables." },
];

const FAQS = [
  { q: "¿Cómo funciona el Pago Contra Entrega?", a: "Es simple: dejas tus datos en el formulario, nosotros confirmamos tu pedido por WhatsApp y lo despachamos. Pagas en efectivo al mensajero cuando recibas el combo en tu puerta. No pagas nada por adelantado." },
  { q: "¿Cuánto tarda en llegar mi pedido?", a: "Despachamos en 24 horas hábiles. La entrega tarda de 2 a 4 días hábiles según tu ciudad. Bogotá, Medellín y Cali suelen recibir en 2 días; ciudades intermedias en 3-4 días." },
  { q: "¿El envío tiene costo adicional?", a: "No. El envío es 100% gratis a todo Colombia. El precio que ves es el precio que pagas, sin sorpresas." },
  { q: "¿Cómo elijo mi talla correcta?", a: "Nuestros tenis tallan igual que tu talla habitual. Si dudas entre dos tallas, te recomendamos la más grande. Después de tu pedido te contactamos por WhatsApp para confirmar talla y color antes de despachar." },
  { q: "¿Qué pasa si no me gusta o no sirve?", a: "Tienes 30 días de garantía. Si el producto no te convence, te devolvemos tu dinero o lo cambiamos por otra talla/color. Sin preguntas difíciles." },
  { q: "¿El combo incluye gorra y tenis?", a: "Sí. El combo incluye un par de tenis urbanos BRAHMA + una gorra premium bordada, en el color que elijas. Todo por el precio promocional." },
  { q: "¿Puedo pagar con tarjeta o transferencia?", a: "El método principal es Contra Entrega en efectivo. Si prefieres tarjeta o transferencia (con descuento adicional), escríbenos por WhatsApp y te ayudamos." },
];

const CITIES = [
  "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
  "Bucaramanga", "Pereira", "Manizales", "Cúcuta", "Santa Marta",
  "Ibagué", "Villavicencio", "Armenia", "Neiva", "Pasto", "Valledupar",
];

/* ------------------------------------------------------------------ */
/*  ICONOS SVG                                                         */
/* ------------------------------------------------------------------ */

const Icon = ({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) => {
  const paths: Record<string, React.ReactNode> = {
    cash: <path d="M2 7h20v10H2V7zm10 2a3 3 0 100 4 3 3 0 000-4z" />,
    truck: <path d="M3 6h11v9H3V6zm11 3h4l3 3v3h-7V9zM7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />,
    shield: <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3zm-1 13l5-5-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z" />,
    gem: <path d="M6 3h12l3 5-9 13L3 8l3-5zm1.5 2L6 7.5h12L16.5 5h-9zM7.2 9.5L12 16l4.8-6.5H7.2z" />,
    layers: <path d="M12 2l10 5-10 5L2 7l10-5zm10 9l-10 5-10-5 2-1 8 4 8-4 2 1zm-10 7l-8-4-2 1 10 5 10-5-2-1-8 4z" />,
    crown: <path d="M2 18h20l-1-11-6 4-3-7-3 7-6-4-1 11zm0 2h20v2H2v-2z" />,
    check: <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />,
    x: <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3 1.4 1.4z" />,
    play: <path d="M8 5v14l11-7L8 5z" />,
    chevL: <path d="M15 6l-6 6 6 6V6z" />,
    chevR: <path d="M9 6l6 6-6 6V6z" />,
    chevD: <path d="M6 9l6 6 6-6H6z" />,
    plus: <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z" />,
    minus: <path d="M5 11h14v2H5v-2z" />,
    zoom: <path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 10-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />,
    lock: <path d="M6 10V8a6 6 0 1112 0v2h1a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1h1zm2 0h8V8a4 4 0 10-8 0v2z" />,
    star: <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2 2 9.4l7-.9L12 2z" />,
    location: <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />,
    whatsapp: <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.3-.1.6.2.3.8 1.2 1.7 2 .9.7 1.6.9 1.9 1 .2 0 .4 0 .5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.5.3 0 .2 0 .7-.3 1.2z" />,
    bolt: <path d="M11 21l8-12h-5l2-8-8 12h5l-2 8z" />,
    arrowD: <path d="M11 4h2v12.2l4.6-4.6L19 13l-7 7-7-7 1.4-1.4L11 16.2V4z" />,
    refresh: <path d="M12 5V2L7 7l5 5V8a5 5 0 11-5 5H5a7 7 0 107-8z" />,
    heart: <path d="M12 21l-1.5-1.4C5 14.8 2 12 2 8.5A4.5 4.5 0 016.5 4c1.5 0 3 .7 4 2 1-1.3 2.5-2 4-2A4.5 4.5 0 0119 8.5c0 3.5-3 6.3-8.5 11.1L12 21z" />,
    sparkle: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
};

const formatCOP = (n: number) =>
  "$" + n.toLocaleString("es-CO");

/* ------------------------------------------------------------------ */
/*  COMPONENTE PRINCIPAL                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [colorway, setColorway] = useState<Colorway>(COLORWAYS[0]);
  const [qty, setQty] = useState(1);
  const [heroImg, setHeroImg] = useState(COLORWAYS[0].img);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", qty: 1, color: "beige" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [tall, setTall] = useState("38");

  const rootRef = useRef<HTMLDivElement>(null);
  const galleryStageRef = useRef<HTMLImageElement>(null);
  const cinemaIdxRef = useRef(0);
  const galleryIdxRef = useRef(0);
  const lightboxIdxRef = useRef(0);

  /* ---------------- TOAST helper ---------------- */
  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    window.setTimeout(() => setToast(null), 4200);
  }, []);

  /* ---------------- Colorway change ---------------- */
  const selectColorway = (cw: Colorway) => {
    setColorway(cw);
    setHeroImg(cw.img);
    setForm((f) => ({ ...f, color: cw.id }));
    // sync gallery to this colorway
    const gi = COLORWAYS.findIndex((c) => c.id === cw.id);
    if (gi >= 0) setGalleryIdx(gi);
  };

  /* ---------------- Gallery navigation ---------------- */
  const goGallery = (dir: number) => {
    setGalleryIdx((prev) => {
      const n = (prev + dir + GALLERY.length) % GALLERY.length;
      galleryIdxRef.current = n;
      return n;
    });
  };
  const openLightbox = (i: number) => {
    setLightboxIdx(i);
    lightboxIdxRef.current = i;
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const goLightbox = (dir: number) => {
    setLightboxIdx((prev) => {
      const n = (prev + dir + GALLERY.length) % GALLERY.length;
      lightboxIdxRef.current = n;
      return n;
    });
  };

  /* ---------------- FAQ toggle ---------------- */
  const toggleFaq = (i: number) => setFaqOpen((p) => (p === i ? null : i));

  /* ---------------- Quantity ---------------- */
  const incQty = () => setQty((q) => Math.min(9, q + 1));
  const decQty = () => setQty((q) => Math.max(1, q - 1));

  /* ---------------- Form validation + submit ---------------- */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Escribe tu nombre completo";
    if (!/^3\d{8,9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Celular inválido (ej: 3001234567)";
    if (!form.city.trim()) e.city = "Selecciona tu ciudad";
    if (!form.address.trim() || form.address.trim().length < 6) e.address = "Escribe una dirección completa";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      showToast("Revisa los campos marcados", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          tall,
          qty: form.qty,
          color: form.color,
          unitPrice: PRICE_NOW,
          total: PRICE_NOW * form.qty,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error");
      showToast("¡Pedido registrado! Te contactaremos por WhatsApp en minutos.", "success");
      setForm({ name: "", phone: "", city: "", address: "", qty: 1, color: colorway.id });
      setQty(1);
    } catch {
      showToast("No pudimos registrar tu pedido. Intenta de nuevo.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================================================================ */
  /*  EFECTOS — Lógica vanilla JS                                     */
  /* ================================================================ */

  // 1. Header scroll + sticky CTAs visibility + smooth scroll + reveal + ripple + magnetic + cursor + counters + parallax
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* --- Header blur on scroll --- */
    const header = root.querySelector<HTMLElement>(".lp-header");
    const stickyCta = root.querySelector<HTMLElement>(".lp-sticky-cta");
    const buyBar = root.querySelector<HTMLElement>(".lp-buy-bar");
    const formSec = root.querySelector<HTMLElement>("#formulario");

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      header?.classList.toggle("is-scrolled", y > 24);
      // sticky mobile CTA: aparece tras pasar ~85% del primer viewport (robusto a imágenes)
      if (stickyCta) {
        stickyCta.classList.toggle("is-visible", y > vh * 0.85);
      }
      // desktop buy bar: aparece tras 1 viewport y se oculta cerca del formulario
      if (buyBar && formSec) {
        const formTop = formSec.offsetTop;
        const show = y > vh * 0.9 && (formTop < 1000 || y < formTop - vh * 0.8);
        buyBar.classList.toggle("is-visible", show);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    onScroll();
    // recálculo tras posible carga tardía de imágenes
    const recalcTimer = window.setTimeout(onScroll, 700);

    /* --- Smooth scroll for anchor links --- */
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = root.querySelector(id) as HTMLElement | null;
      if (el) {
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: "smooth" });
        // close mobile menu
        root.querySelector(".lp-mobile-menu")?.classList.remove("is-open");
        root.querySelector(".lp-menu-btn")?.classList.remove("is-open");
      }
    };
    root.addEventListener("click", onClick);

    /* --- IntersectionObserver reveal --- */
    const reveals = root.querySelectorAll<HTMLElement>(".lp-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    /* --- Animated counters --- */
    const counters = root.querySelectorAll<HTMLElement>("[data-count]");
    const ioCount = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          const dur = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          ioCount.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => ioCount.observe(el));

    /* --- Ripple on .lp-btn --- */
    const onRipple = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(".lp-btn") as HTMLElement | null;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "lp-ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    };
    root.addEventListener("mousedown", onRipple);

    /* --- Magnetic hover on .lp-btn--primary --- */
    const magnets: HTMLElement[] = [];
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) {
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        magnets.push(el);
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const mx = e.clientX - r.left - r.width / 2;
          const my = e.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "";
        });
      });
    }

    /* --- Custom cursor --- */
    let cursor: HTMLElement | null = null;
    let ring: HTMLElement | null = null;
    if (finePointer) {
      cursor = document.createElement("div");
      ring = document.createElement("div");
      cursor.className = "lp-cursor";
      ring.className = "lp-cursor-ring";
      document.body.appendChild(cursor);
      document.body.appendChild(ring);
      const move = (e: MouseEvent) => {
        if (cursor) { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; }
      };
      const moveRing = (e: MouseEvent) => {
        if (ring) { ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px"; }
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mousemove", moveRing);
      const hoverTargets = root.querySelectorAll("a, button, .lp-cinema, .lp-gallery__stage, .lp-thumb, .lp-swatch, .lp-life__tile");
      hoverTargets.forEach((t) => {
        t.addEventListener("mouseenter", () => { cursor?.classList.add("is-hover"); ring?.classList.add("is-hover"); });
        t.addEventListener("mouseleave", () => { cursor?.classList.remove("is-hover"); ring?.classList.remove("is-hover"); });
      });
    }

    /* --- Light parallax on hero visual & life tiles --- */
    let ticking = false;
    const onParallax = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const heroVis = root.querySelector<HTMLElement>(".lp-hero__visual img");
        if (heroVis && y < 900) heroVis.style.transform = `translateY(${y * 0.06}px) scale(1.02)`;
        ticking = false;
      });
    };
    if (finePointer) window.addEventListener("scroll", onParallax, { passive: true });

    /* --- Escape closes lightbox --- */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      window.removeEventListener("scroll", onParallax);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("click", onClick);
      root.removeEventListener("mousedown", onRipple);
      window.clearTimeout(recalcTimer);
      io.disconnect();
      ioCount.disconnect();
      cursor?.remove();
      ring?.remove();
      magnets.forEach((el) => (el.style.transform = ""));
    };
  }, []);

  // 2. Cinema autoplay (cross-fade Ken Burns)
  useEffect(() => {
    const slides = document.querySelectorAll<HTMLElement>(".lp-cinema__slide");
    if (!slides.length) return;
    const interval = window.setInterval(() => {
      cinemaIdxRef.current = (cinemaIdxRef.current + 1) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === cinemaIdxRef.current));
    }, 3800);
    return () => window.clearInterval(interval);
  }, []);

  // 3. Countdown timer (resets daily to end of day in Bogota)
  useEffect(() => {
    const units = document.querySelectorAll<HTMLElement>("[data-cd]");
    if (!units.length) return;
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999); // end of today
      let diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      const vals = [String(h).padStart(2, "0"), String(m).padStart(2, "0"), String(s).padStart(2, "0")];
      units.forEach((u, i) => { if (vals[i] != null) u.textContent = vals[i]; });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // 4. Stock bar animate on view + subtle live countdown
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".lp-stock__fill");
    const numEl = document.querySelector<HTMLElement>("[data-stock]");
    if (!bar || !numEl) return;
    let stock = 37;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          bar.style.width = "22%";
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(bar);
    // occasionally decrement stock for scarcity feel
    const id = window.setInterval(() => {
      if (stock <= 9) { window.clearInterval(id); return; }
      if (Math.random() > 0.7) {
        stock -= 1;
        numEl.textContent = String(stock);
      }
    }, 14000);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, []);

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  const total = PRICE_NOW * qty;

  return (
    <div className="lp-root" ref={rootRef}>
      {/* ============ HEADER ============ */}
      <header className="lp-header">
        <div className="lp-header__inner">
          <a href="#top" className="lp-brand" aria-label="BRAHMA inicio">
            <span className="lp-brand__mark">B</span>
            <span>BRAHMA</span>
          </a>
          <nav className="lp-nav" aria-label="Principal">
            <a href="#beneficios">Beneficios</a>
            <a href="#galeria">Galería</a>
            <a href="#comparativa">Comparativa</a>
            <a href="#opiniones">Opiniones</a>
            <a href="#faq">Preguntas</a>
          </nav>
          <div className="lp-header__cta">
            <a href="#formulario" className="lp-btn lp-btn--primary" data-magnetic>
              <Icon name="bolt" style={{ width: 16, height: 16 }} /> Comprar ahora
            </a>
          </div>
          <button className="lp-menu-btn" aria-label="Menú" onClick={(e) => {
            const b = e.currentTarget;
            const m = document.querySelector(".lp-mobile-menu");
            b.classList.toggle("is-open");
            m?.classList.toggle("is-open");
          }}>
            <span />
          </button>
        </div>
      </header>
      <div className="lp-mobile-menu">
        <a href="#beneficios">Beneficios</a>
        <a href="#galeria">Galería</a>
        <a href="#comparativa">Comparativa</a>
        <a href="#opiniones">Opiniones</a>
        <a href="#faq">Preguntas</a>
        <a href="#formulario" className="lp-btn lp-btn--primary lp-btn--block">Comprar ahora</a>
      </div>

      <main className="lp-main" id="top">
        {/* ============ 1. HERO ============ */}
        <section className="lp-hero" id="hero">
          <div className="lp-hero__bg" />
          <div className="lp-hero__grain" />
          <div className="lp-container lp-hero__grid">
            <div className="lp-hero__copy">
              <div className="lp-hero__badges lp-reveal">
                <span className="lp-pill lp-pill--amber"><Icon name="cash" /> Pago Contra Entrega</span>
                <span className="lp-pill"><Icon name="truck" /> Envío Gratis</span>
                <span className="lp-pill lp-pill--success"><Icon name="shield" /> Garantía 30 días</span>
              </div>

              <h1 className="lp-reveal" data-delay="1">
                El combo que <span className="lp-grad">eleva</span> tu estilo urbano.
              </h1>

              <p className="lp-hero__sub lp-reveal" data-delay="2">
                Tenis urbanos de materiales premium + gorra bordada. Diseñados para quienes
                no se conforman. Págalo cuando lo tengas en tus manos.
              </p>

              {/* Colorway selector */}
              <div className="lp-colorways lp-reveal" data-delay="2" role="group" aria-label="Color">
                <span className="lp-colorways__label">{colorway.label}</span>
                {COLORWAYS.map((c) => (
                  <button
                    key={c.id}
                    className={`lp-swatch lp-swatch--${c.swatch} ${colorway.id === c.id ? "is-active" : ""}`}
                    aria-label={`Color ${c.label}`}
                    aria-pressed={colorway.id === c.id}
                    onClick={() => selectColorway(c)}
                  />
                ))}
              </div>

              <div className="lp-price lp-reveal" data-delay="3">
                <span className="lp-price__old">{formatCOP(PRICE_OLD)}</span>
                <span className="lp-price__now">{formatCOP(PRICE_NOW)}</span>
                <span className="lp-price__save">Ahorra 45%</span>
              </div>

              <div className="lp-hero__actions lp-reveal" data-delay="3">
                <a href="#formulario" className="lp-btn lp-btn--primary lp-btn--lg" data-magnetic>
                  <Icon name="bolt" style={{ width: 18, height: 18 }} /> Quiero el combo
                </a>
                <a href="#galeria" className="lp-btn lp-btn--ghost lp-btn--lg">
                  Ver galería
                </a>
              </div>

              <div className="lp-hero__trust lp-reveal" data-delay="4">
                <span><Icon name="check" /> +12.000 clientes felices</span>
                <span><Icon name="star" /> 4.9/5 valoración</span>
                <span><Icon name="check" /> Despacho en 24h</span>
              </div>
            </div>

            <div className="lp-hero__visual lp-reveal lp-reveal--scale" data-delay="2">
              <img src={heroImg} alt="Combo BRAHMA: tenis urbanos y gorra bordada" fetchPriority="high" />
              <div className="lp-hero__rating-card">
                <span className="lp-stars">★★★★★</span>
                <small>4.9 · 2.480 reseñas</small>
              </div>
              <div className="lp-hero__float-card">
                <span className="lp-dot" />
                <div>
                  <b>Pago al recibir</b>
                  <small>Cero riesgo · Cero fraude</small>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-scroll-indicator" aria-hidden="true">
            <span>Scroll</span>
            <span className="lp-scroll-indicator__mouse" />
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="lp-marquee" aria-hidden="true">
          <div className="lp-marquee__track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} style={{ display: "inline-flex", gap: "56px" }}>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Bogotá</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Medellín</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Cali</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Barranquilla</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Cartagena</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Bucaramanga</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Pereira</span>
                <span className="lp-marquee__item"><span className="lp-star">★</span> Manizales</span>
              </span>
            ))}
          </div>
        </div>

        {/* ============ 3. BENEFICIOS ============ */}
        <section className="lp-section" id="beneficios">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">Por qué BRAHMA</span>
              <h2>Diseñado para sentirse tan bien como se ve</h2>
              <p>Cada detalle del combo está pensado para que no tengas que elegir entre estilo, comodidad y confianza.</p>
            </div>
            <div className="lp-benefits">
              {BENEFITS.map((b, i) => (
                <article key={b.title} className="lp-benefit lp-reveal" data-delay={(i % 3) + 1}>
                  <div className="lp-benefit__icon"><Icon name={b.icon} /></div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 2. VIDEO CINEMÁTICO ============ */}
        <section className="lp-section lp-section--paper lp-section--tight">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">En movimiento</span>
              <h2>Míralo en detalle</h2>
              <p>Cada textura, cada costura, cada ángulo. Así se ve el combo en la vida real.</p>
            </div>
            <div
              className="lp-cinema lp-reveal lp-reveal--scale"
              onClick={() => openLightbox(cinemaIdxRef.current)}
              role="button"
              aria-label="Reproducir video del producto"
            >
              {GALLERY.map((g, i) => (
                <div key={i} className={`lp-cinema__slide ${i === 0 ? "is-active" : ""}`}>
                  <img src={g.src} alt={g.alt} loading="lazy" />
                </div>
              ))}
              <div className="lp-cinema__overlay">
                <div className="lp-cinema__play"><Icon name="play" /></div>
                <div>
                  <div className="lp-cinema__label">Ver en pantalla completa</div>
                  <div className="lp-cinema__sub">Experiencia cinemática · 5 tomas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4. GALERÍA ============ */}
        <section className="lp-section" id="galeria">
          <div className="lp-container">
            <div className="lp-section-head lp-reveal">
              <span className="lp-eyebrow">Galería</span>
              <h2>Cinco colorways. Una sola promesa de calidad.</h2>
              <p>Explora cada ángulo. Haz clic para ampliar y ver los detalles de cerca.</p>
            </div>
            <div className="lp-gallery lp-reveal">
              <div className="lp-gallery__stage" onClick={() => openLightbox(galleryIdx)}>
                <img ref={galleryStageRef} src={GALLERY[galleryIdx].src} alt={GALLERY[galleryIdx].alt} />
                <span className="lp-gallery__zoom-hint"><Icon name="zoom" /> Ampliar</span>
                <span className="lp-gallery__counter">{galleryIdx + 1} / {GALLERY.length}</span>
                <button className="lp-gallery__nav lp-gallery__nav--prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); goGallery(-1); }}><Icon name="chevL" /></button>
                <button className="lp-gallery__nav lp-gallery__nav--next" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); goGallery(1); }}><Icon name="chevR" /></button>
              </div>
              <div className="lp-thumbs">
                {GALLERY.map((g, i) => (
                  <button key={i} className={`lp-thumb ${i === galleryIdx ? "is-active" : ""}`} aria-label={`Vista ${i + 1}`} onClick={() => setGalleryIdx(i)}>
                    <img src={g.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. QUÉ INCLUYE ============ */}
        <section className="lp-section lp-section--paper">
          <div className="lp-container">
            <div className="lp-includes">
              <div className="lp-includes__visual lp-reveal lp-reveal--left">
                <img src={colorway.img} alt="Combo BRAHMA completo" loading="lazy" />
                <span className="lp-includes__badge"><Icon name="sparkle" style={{ width: 14, height: 14 }} /> Combo completo</span>
              </div>
              <div className="lp-includes__list lp-reveal lp-reveal--right">
                <div className="lp-section-head" style={{ marginBottom: 28 }}>
                  <span className="lp-eyebrow">Qué incluye</span>
                  <h2>Todo lo que llega a tu puerta</h2>
                  <p>Un solo pedido. Dos piezas premium. Cero sorpresas.</p>
                </div>
                <div className="lp-include">
                  <span className="lp-include__check"><Icon name="check" /></span>
                  <div>
                    <b>1 Par de Tenis Urbanos BRAHMA</b>
                    <p>Material premium, suela antideslizante y plantilla acolchada. Talla del 36 al 43.</p>
                  </div>
                  <span className="lp-include__val">$94.000</span>
                </div>
                <div className="lp-include">
                  <span className="lp-include__check"><Icon name="check" /></span>
                  <div>
                    <b>1 Gorra Premium Bordada</b>
                    <p>Bordado 3D, visera curva pre-moldeada y cierre ajustable. Color a juego.</p>
                  </div>
                  <span className="lp-include__val">$45.000</span>
                </div>
                <div className="lp-include">
                  <span className="lp-include__check"><Icon name="check" /></span>
                  <div>
                    <b>Envío Gratis a todo Colombia</b>
                    <p>Despacho en 24h, entrega en 2 a 4 días hábiles con seguimiento.</p>
                  </div>
                  <span className="lp-include__val">$0</span>
                </div>
                <div className="lp-include">
                  <span className="lp-include__check"><Icon name="check" /></span>
                  <div>
                    <b>Garantía de 30 días</b>
                    <p>Devolución sin preguntas si no te convence. Tu riesgo es cero.</p>
                  </div>
                  <span className="lp-include__val">Incluido</span>
                </div>
                <div style={{ marginTop: 24 }}>
                  <a href="#formulario" className="lp-btn lp-btn--primary lp-btn--lg lp-btn--block" data-magnetic>
                    <Icon name="bolt" style={{ width: 18, height: 18 }} /> Llevar combo por {formatCOP(PRICE_NOW)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 6. LIFESTYLE ============ */}
        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-section-head lp-reveal">
              <span className="lp-eyebrow">Lifestyle</span>
              <h2>Hecho para tu día a día</h2>
              <p>No es un par de tenis para ocasiones especiales. Es tu compañero de todos los días.</p>
            </div>
            <div className="lp-life">
              {LIFE_TILES.map((t, i) => (
                <figure key={i} className={`lp-life__tile lp-life__tile--${t.cls} lp-reveal`} data-delay={(i % 2) + 1}>
                  <img src={t.src} alt={t.cap} loading="lazy" />
                  <figcaption className="lp-life__cap"><small>{t.sub}</small>{t.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7. COMPARATIVA ============ */}
        <section className="lp-section lp-section--paper" id="comparativa">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">La diferencia</span>
              <h2>BRAHMA vs. lo demás</h2>
              <p>Compara antes de decidir. La diferencia habla por sí sola.</p>
            </div>
            <div className="lp-compare">
              <div className="lp-compare__col lp-compare__col--us lp-reveal lp-reveal--left">
                <span className="lp-compare__tag"><Icon name="sparkle" style={{ width: 12, height: 12 }} /> BRAHMA</span>
                <h3>La experiencia completa</h3>
                <ul className="lp-compare__list">
                  {COMPARE_US.map((c) => (
                    <li key={c} className="lp-compare__row"><Icon name="check" /> <span>{c}</span></li>
                  ))}
                </ul>
              </div>
              <div className="lp-compare__col lp-compare__col--them lp-reveal lp-reveal--right" data-delay="1">
                <span className="lp-compare__tag">Otras marcas</span>
                <h3>Lo de siempre</h3>
                <ul className="lp-compare__list">
                  {COMPARE_THEM.map((c) => (
                    <li key={c} className="lp-compare__row"><Icon name="x" /> <span>{c}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 8. TESTIMONIOS ============ */}
        <section className="lp-section" id="opiniones">
          <div className="lp-container">
            <div className="lp-section-head lp-reveal">
              <span className="lp-eyebrow">Opiniones reales</span>
              <h2>Miles de colombianos ya lo viven</h2>
              <p>Reseñas verificadas de clientes que pagaron contra entrega y volverían a comprar.</p>
            </div>
            <div className="lp-stats lp-reveal" style={{ marginBottom: 48 }}>
              <div><div className="lp-stat__num"><span data-count="12480" data-suffix="+">0</span></div><div className="lp-stat__label">Clientes felices</div></div>
              <div><div className="lp-stat__num"><span data-count="4.9" data-suffix="/5">0</span></div><div className="lp-stat__label">Valoración media</div></div>
              <div><div className="lp-stat__num"><span data-count="98" data-suffix="%">0</span></div><div className="lp-stat__label">Recomendaría</div></div>
              <div><div className="lp-stat__num"><span data-count="24" data-suffix="h">0</span></div><div className="lp-stat__label">Despacho</div></div>
            </div>
            <div className="lp-testi-rail lp-reveal">
              {TESTIMONIALS.map((t) => (
                <article key={t.name} className="lp-testi">
                  <span className="lp-testi__verified"><Icon name="check" /> Compra verificada</span>
                  <div className="lp-testi__stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                  <p className="lp-testi__quote">“{t.quote}”</p>
                  <div className="lp-testi__author">
                    <span className="lp-testi__avatar" style={{ background: t.color }}>{t.initials}</span>
                    <div>
                      <div className="lp-testi__name">{t.name}</div>
                      <div className="lp-testi__meta"><Icon name="location" /> {t.city}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 9. OFERTA ============ */}
        <section className="lp-section lp-section--paper" id="oferta">
          <div className="lp-container">
            <div className="lp-offer lp-reveal lp-reveal--scale">
              <div className="lp-offer__bg" />
              <div className="lp-offer__inner">
                <div>
                  <span className="lp-eyebrow" style={{ color: "var(--lp-amber)" }}>Oferta de lanzamiento</span>
                  <h2>El precio sube cuando el reloj llegue a cero</h2>
                  <p className="lp-offer__sub">Precio de introducción por tiempo limitado. Una vez terminado, regresa a su valor normal de {formatCOP(PRICE_OLD)}.</p>

                  <div className="lp-countdown" role="timer" aria-label="Cuenta regresiva">
                    {[
                      { label: "Horas", key: "h" },
                      { label: "Min", key: "m" },
                      { label: "Seg", key: "s" },
                    ].map((u) => (
                      <div className="lp-countdown__unit" key={u.key}>
                        <span className="lp-countdown__num" data-cd={u.key}>00</span>
                        <span className="lp-countdown__label">{u.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="lp-stock">
                    <div className="lp-stock__head">
                      <span>Stock disponible</span>
                      <b>Quedan <span data-stock>37</span> unidades</b>
                    </div>
                    <div className="lp-stock__bar"><div className="lp-stock__fill" style={{ width: "0%" }} /></div>
                  </div>

                  <div className="lp-offer__price">
                    <span className="lp-price__old">{formatCOP(PRICE_OLD)}</span>
                    <span className="lp-price__now">{formatCOP(PRICE_NOW)}</span>
                    <span className="lp-price__save">-45% hoy</span>
                  </div>

                  <a href="#formulario" className="lp-btn lp-btn--light lp-btn--lg lp-btn--block" data-magnetic>
                    <Icon name="bolt" style={{ width: 18, height: 18 }} /> Reservar mi combo ahora
                  </a>
                </div>
                <div className="lp-offer__visual">
                  <img src={colorway.img} alt="Combo BRAHMA en oferta" loading="lazy" />
                  <div className="lp-offer__seal">
                    <div>
                      AHORRA<br />
                      <small>45%</small>
                      HOY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 10. GARANTÍA ============ */}
        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-guarantee lp-reveal">
              <div className="lp-guarantee__seal"><Icon name="shield" /></div>
              <div>
                <span className="lp-eyebrow">Riesgo cero</span>
                <h3>Garantía de satisfacción de 30 días</h3>
                <p>Pides, recibes, examinas. Si por cualquier razón el combo no cumple tus expectativas, te devolvemos el 100% de tu dinero. Sin letra pequeña, sin interrogatorios. Así de simple.</p>
                <div className="lp-guarantee__points">
                  <span><Icon name="check" /> Devolución total</span>
                  <span><Icon name="check" /> Sin preguntas</span>
                  <span><Icon name="check" /> Cambio de talla gratis</span>
                  <span><Icon name="check" /> Pago Contra Entrega</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 11. FAQ ============ */}
        <section className="lp-section lp-section--paper" id="faq">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">Preguntas frecuentes</span>
              <h2>Resolvemos tus dudas</h2>
              <p>Y si queda alguna, escríbenos por WhatsApp. Respondemos en minutos.</p>
            </div>
            <div className="lp-faq lp-reveal">
              {FAQS.map((f, i) => (
                <div key={i} className={`lp-faq__item ${faqOpen === i ? "is-open" : ""}`}>
                  <button className="lp-faq__q" onClick={() => toggleFaq(i)} aria-expanded={faqOpen === i}>
                    <span>{f.q}</span>
                    <span className="lp-faq__icon" aria-hidden="true" />
                  </button>
                  <div className="lp-faq__a" style={{ maxHeight: faqOpen === i ? 320 : 0 }}>
                    <div className="lp-faq__a-inner">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 12. FORMULARIO ============ */}
        <section className="lp-section" id="formulario">
          <div className="lp-container">
            <div className="lp-form-wrap">
              <div className="lp-form-summary lp-reveal lp-reveal--left">
                <span className="lp-eyebrow">Finaliza tu pedido</span>
                <h2>Pídelo hoy. Págalo al recibir.</h2>
                <p>Deja tus datos y nuestro equipo confirma tu pedido por WhatsApp en minutos. No pagas nada hasta tener el combo en tus manos.</p>
                <ul className="lp-form-summary__list">
                  <li><Icon name="cash" /> Pago Contra Entrega en efectivo</li>
                  <li><Icon name="truck" /> Envío gratis a todo Colombia</li>
                  <li><Icon name="shield" /> Garantía de 30 días incluida</li>
                  <li><Icon name="whatsapp" /> Confirmación por WhatsApp</li>
                </ul>
                <div className="lp-form-summary__price">
                  <div className="lp-row"><span>Combo BRAHMA ({colorway.label})</span><span>{formatCOP(PRICE_NOW)}</span></div>
                  <div className="lp-row"><span>Envío</span><span>Gratis</span></div>
                  <div className="lp-row"><span>Cantidad</span><span>{qty}</span></div>
                  <div className="lp-row lp-row--total"><span>Total a pagar</span><span>{formatCOP(total)}</span></div>
                </div>
              </div>

              <form className="lp-form lp-reveal lp-reveal--right" onSubmit={handleSubmit} noValidate>
                <h3 className="lp-form__title">Datos de entrega</h3>
                <p className="lp-form__sub"><Icon name="lock" /> Tus datos están seguros · Cero pago anticipado</p>

                <div className={`lp-field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="f-name">Nombre completo <span className="lp-req">*</span></label>
                  <input id="f-name" className={`lp-input ${errors.name ? "is-error" : ""}`} type="text" placeholder="Ej: Juan Pérez" autoComplete="name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <span className="lp-field__error">{errors.name}</span>
                </div>

                <div className={`lp-field ${errors.phone ? "has-error" : ""}`}>
                  <label htmlFor="f-phone">Celular (WhatsApp) <span className="lp-req">*</span></label>
                  <input id="f-phone" className={`lp-input ${errors.phone ? "is-error" : ""}`} type="tel" inputMode="numeric" placeholder="300 123 4567" autoComplete="tel"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <span className="lp-field__error">{errors.phone}</span>
                </div>

                <div className={`lp-field ${errors.city ? "has-error" : ""}`}>
                  <label htmlFor="f-city">Ciudad <span className="lp-req">*</span></label>
                  <select id="f-city" className={`lp-select ${errors.city ? "is-error" : ""}`} value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}>
                    <option value="">Selecciona tu ciudad</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="lp-field__error">{errors.city}</span>
                </div>

                <div className={`lp-field ${errors.address ? "has-error" : ""}`}>
                  <label htmlFor="f-addr">Dirección de entrega <span className="lp-req">*</span></label>
                  <input id="f-addr" className={`lp-input ${errors.address ? "is-error" : ""}`} type="text" placeholder="Calle 123 #45-67, Apto 301" autoComplete="street-address"
                    value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  <span className="lp-field__error">{errors.address}</span>
                </div>

                <div className="lp-field">
                  <label>Talla de tenis</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["36","37","38","39","40","41","42","43"].map((t) => (
                      <button type="button" key={t} onClick={() => setTall(t)}
                        className={`lp-btn ${tall === t ? "lp-btn--primary" : "lp-btn--ghost"}`}
                        style={{ padding: "10px 16px", fontSize: "0.85rem", borderRadius: 10 }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lp-field">
                  <label>Color seleccionado</label>
                  <div className="lp-colorways">
                    {COLORWAYS.map((c) => (
                      <button key={c.id} type="button"
                        className={`lp-swatch lp-swatch--${c.swatch} ${colorway.id === c.id ? "is-active" : ""}`}
                        aria-label={c.label} onClick={() => selectColorway(c)} />
                    ))}
                    <span style={{ fontSize: "0.875rem", color: "var(--lp-stone)", alignSelf: "center", marginLeft: 6 }}>{colorway.label}</span>
                  </div>
                </div>

                <div className="lp-field">
                  <label>Cantidad</label>
                  <div className="lp-qty">
                    <button type="button" onClick={decQty} aria-label="Restar"><Icon name="minus" style={{ width: 16, height: 16 }} /></button>
                    <input type="text" readOnly value={qty} aria-label="Cantidad" />
                    <button type="button" onClick={incQty} aria-label="Sumar"><Icon name="plus" style={{ width: 16, height: 16 }} /></button>
                  </div>
                </div>

                <button type="submit" className="lp-btn lp-btn--primary lp-btn--lg lp-btn--block" data-magnetic disabled={submitting}
                  style={{ marginTop: 8, opacity: submitting ? 0.7 : 1 }}>
                  <Icon name="bolt" style={{ width: 18, height: 18 }} />
                  {submitting ? "Procesando…" : `Confirmar pedido · ${formatCOP(total)}`}
                </button>

                <div className="lp-form__note">
                  <Icon name="cash" />
                  <span>No pagas nada ahora. Pagas en efectivo al recibir tu combo.</span>
                </div>
                <div className="lp-form__secure">
                  <Icon name="lock" /> Datos protegidos · Solo los usamos para tu entrega
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ============ 13. FOOTER ============ */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer__top">
            <div className="lp-footer__brand">
              <a href="#top" className="lp-brand"><span className="lp-brand__mark">B</span><span>BRAHMA</span></a>
              <p>Combo urbano premium para Colombia. Pago Contra Entrega, envío gratis y garantía real.</p>
            </div>
            <div className="lp-footer__col">
              <h4>Producto</h4>
              <a href="#beneficios">Beneficios</a>
              <a href="#galeria">Galería</a>
              <a href="#comparativa">Comparativa</a>
              <a href="#faq">Preguntas</a>
            </div>
            <div className="lp-footer__col">
              <h4>Compra</h4>
              <a href="#formulario">Hacer pedido</a>
              <a href="#oferta">Oferta actual</a>
              <a href="#opiniones">Opiniones</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Escríbenos al 300 000 0000", "info"); }}>WhatsApp</a>
            </div>
            <div className="lp-footer__col">
              <h4>Confianza</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Garantía de 30 días activa", "info"); }}>Garantía 30 días</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Pago Contra Entrega disponible", "info"); }}>Pago Contra Entrega</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Envío gratis a todo Colombia", "info"); }}>Envío gratis</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Términos disponibles bajo solicitud", "info"); }}>Términos</a>
            </div>
          </div>
          <div className="lp-footer__bottom">
            <span>© {new Date().getFullYear()} BRAHMA. Hecho en Colombia.</span>
            <div className="lp-footer__pay">
              <span>CONTRA ENTREGA</span>
              <span>EFECTIVO</span>
              <span>WHATSAPP</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ STICKY CTA MOBILE ============ */}
      <div className="lp-sticky-cta" role="region" aria-label="Comprar">
        <div className="lp-sticky-cta__info">
          <div className="lp-sticky-cta__price">{formatCOP(PRICE_NOW)} <small>{formatCOP(PRICE_OLD)}</small></div>
          <div className="lp-sticky-cta__sub">Pago al recibir · Envío gratis</div>
        </div>
        <a href="#formulario" className="lp-btn lp-btn--primary" data-magnetic>
          <Icon name="bolt" style={{ width: 16, height: 16 }} /> Comprar
        </a>
      </div>

      {/* ============ DESKTOP BUY BAR ============ */}
      <div className="lp-buy-bar">
        <div className="lp-buy-bar__price">
          {formatCOP(PRICE_NOW)}
          <small>{formatCOP(PRICE_OLD)}</small>
        </div>
        <a href="#formulario" className="lp-btn lp-btn--light" data-magnetic>
          <Icon name="bolt" style={{ width: 16, height: 16 }} /> Comprar ahora
        </a>
      </div>

      {/* ============ LIGHTBOX ============ */}
      <div className={`lp-lightbox ${lightboxOpen ? "is-open" : ""}`} onClick={closeLightbox}>
        <button className="lp-lightbox__close" aria-label="Cerrar" onClick={closeLightbox}><Icon name="x" /></button>
        <img className="lp-lightbox__img" src={GALLERY[lightboxIdx].src} alt={GALLERY[lightboxIdx].alt} onClick={(e) => e.stopPropagation()} />
        <button className="lp-lightbox__nav lp-lightbox__nav--prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); goLightbox(-1); }}><Icon name="chevL" /></button>
        <button className="lp-lightbox__nav lp-lightbox__nav--next" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); goLightbox(1); }}><Icon name="chevR" /></button>
      </div>

      {/* ============ TOAST ============ */}
      {toast && (
        <div className={`lp-toast lp-toast--${toast.type} is-visible`} role="status">
          <Icon name={toast.type === "success" ? "check" : toast.type === "error" ? "x" : "sparkle"} />
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
