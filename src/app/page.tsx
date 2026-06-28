"use client";

/* =====================================================================
   BRAHMA — Landing Premium v2 (PDP-style + 3 testimonios WhatsApp)
   Orden CRO: Hero PDP → 3 Pasos → Beneficios → Testimonios WhatsApp
              → Oferta → Garantía → FAQ → Formulario
   ===================================================================== */

import { useEffect, useRef, useState, useCallback } from "react";
import "./landing.css";

/* ------------------------------------------------------------------ */
/*  DATOS                                                              */
/* ------------------------------------------------------------------ */

type Colorway = { id: string; label: string; img: string; swatch: string; hex: string };

const COLORWAYS: Colorway[] = [
  { id: "beige", label: "Arena", img: "/images/combo-beige.jpg", swatch: "beige", hex: "#cdb89a" },
  { id: "brown", label: "Café", img: "/images/combo-brown.jpg", swatch: "brown", hex: "#6b4a2e" },
  { id: "olive", label: "Oliva", img: "/images/combo-olive.jpg", swatch: "olive", hex: "#5a5a32" },
  { id: "blue", label: "Azul Noche", img: "/images/combo-blue.jpg", swatch: "blue", hex: "#3a4a63" },
  { id: "black", label: "Negro", img: "/images/combo-black.jpg", swatch: "black", hex: "#1a1a1c" },
];

const PRICE_OLD = 169900;
const PRICE_NOW = 149900;
const SAVED = PRICE_OLD - PRICE_NOW; // $20.000
const TALLAS = ["35", "36", "37", "38", "39", "40", "41", "42", "43"];

const BENEFITS = [
  { title: "Material durable", desc: "Sintético de alta calidad que resiste el uso diario sin desgaste.", icon: "gem" },
  { title: "Suela con agarre", desc: "Suela robusta tipo trekking, ideal para caminar todo el día.", icon: "layers" },
  { title: "Detalles en contraste", desc: "Costuras y acabados que elevan el diseño al siguiente nivel.", icon: "sparkle" },
  { title: "Confort todo el día", desc: "Plantilla acolchada para uso prolongado sin molestias.", icon: "heart" },
  { title: "Gorra bordada de regalo", desc: "Gorra BRAHMA en drill bordada, incluida sin costo extra.", icon: "crown" },
  { title: "Estilo versátil", desc: "Combina con cualquier outfit urbano o casual.", icon: "bolt" },
];

const STEPS = [
  { num: "1", title: "Elige color y talla", desc: "Selecciona la combinación que más te guste entre 5 colores disponibles." },
  { num: "2", title: "Confirma tu pedido", desc: "Llena tus datos y paga contraentrega cuando recibas tu combo en la puerta de tu casa." },
  { num: "3", title: "Disfruta tu combo", desc: "Recibe tu calzado BRAHMA junto con tu gorra bordada, lista para usar." },
];

const WA_TESTIMONIALS = [
  {
    name: "Juliana P.",
    initials: "JP",
    photo: "/images/wa-juliana.png",
    photoCaption: "Combo Azul Noche",
    message: "Le regalé las Brahma a mi novio y casi llora de la emoción jaja 😂🎁 Dice que son las zapatillas más cómodas que ha tenido. La suela gruesa le da altura y el azul marino combina con todo. ¡Qué buena compra, gracias!! 💙👟",
    time: "5:30 PM",
    stars: 5,
    city: "Bogotá",
  },
  {
    name: "Nicolás R.",
    initials: "NR",
    photo: "/images/wa-nicolas.png",
    photoCaption: "Combo Negro",
    message: "Parcero el combo negro es una OBRA DE ARTE ❤️🔥 Todo negro con el acabado en blanco del bordado es un detalle de lujo. Las zapatillas se sienten sólidas y livianas al mismo tiempo, y la gorra es de muy buena tela. No esperaba que la gorra viniera incluida 💙💯",
    time: "5:10 PM",
    stars: 5,
    city: "Medellín",
  },
  {
    name: "Mauricio V.",
    initials: "MV",
    photo: "/images/wa-mauricio.png",
    photoCaption: "Combo Azul",
    message: "Llevo 3 meses usándolas para trabajar y están como nuevas 🤔🔥 No se ha gastado la suela, no se han destenido y la tela sigue intacta. Eso es calidad real, no porquerías. Ya voy a pedir otro par de respaldo 💪",
    time: "9:15 PM",
    stars: 5,
    city: "Cali",
  },
];

const FAQS = [
  { q: "¿La gorra realmente es gratis?", a: "Sí, la gorra BRAHMA en drill bordada va incluida sin costo adicional con la compra de tu combo. No es un complemento aparte, viene en la misma caja." },
  { q: "¿Cómo funciona el Pago Contra Entrega?", a: "Es simple: dejas tus datos en el formulario, confirmamos tu pedido por WhatsApp y lo despachamos. Pagas en efectivo al mensajero cuando recibas el combo en tu puerta. Cero pago anticipado, cero riesgo." },
  { q: "¿Qué tallas manejan?", a: "Manejamos tallas desde la 35 hasta la 43. Si tienes dudas sobre cuál elegir, escríbenos por WhatsApp antes de confirmar tu pedido y te asesoramos." },
  { q: "¿Hacen envíos a toda Colombia?", a: "Sí, realizamos envíos a nivel nacional a través de transportadoras certificadas. El envío es 100% gratis, sin costos ocultos." },
  { q: "¿Cuánto tarda en llegar mi pedido?", a: "Despachamos en 24 horas hábiles. La entrega tarda de 1 a 5 días hábiles según tu ciudad. Bogotá, Medellín y Cali suelen recibir en 1-2 días." },
  { q: "¿Qué pasa si la talla no me queda bien?", a: "Tienes derecho a cambio de talla siguiendo nuestra política. Contáctanos apenas recibas tu pedido y lo solucionamos. Tu satisfacción es la única condición." },
  { q: "¿Puedo pagar con tarjeta o transferencia?", a: "El método principal es Contra Entrega en efectivo. Si prefieres tarjeta o transferencia (con descuento adicional), escríbenos por WhatsApp." },
  { q: "¿El combo incluye tenis y gorra?", a: "Sí. El combo incluye un par de tenis urbanos BRAHMA + una gorra premium bordada, en el color que elijas. Todo por el precio promocional." },
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
    plus: <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z" />,
    minus: <path d="M5 11h14v2H5v-2z" />,
    lock: <path d="M6 10V8a6 6 0 1112 0v2h1a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1h1zm2 0h8V8a4 4 0 10-8 0v2z" />,
    star: <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2 2 9.4l7-.9L12 2z" />,
    location: <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />,
    whatsapp: <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.3-.1.6.2.3.8 1.2 1.7 2 .9.7 1.6.9 1.9 1 .2 0 .4 0 .5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.5.3 0 .2 0 .7-.3 1.2z" />,
    bolt: <path d="M11 21l8-12h-5l2-8-8 12h5l-2 8z" />,
    arrowR: <path d="M4 11h12.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2z" />,
    sparkle: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />,
    heart: <path d="M12 21l-1.5-1.4C5 14.8 2 12 2 8.5A4.5 4.5 0 016.5 4c1.5 0 3 .7 4 2 1-1.3 2.5-2 4-2A4.5 4.5 0 0119 8.5c0 3.5-3 6.3-8.5 11.1L12 21z" />,
    refresh: <path d="M12 5V2L7 7l5 5V8a5 5 0 11-5 5H5a7 7 0 107-8z" />,
    clock: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.6l4 2.3-1 1.7-5-2.9V6h2v6.6z" />,
    checkDouble: <path d="M18 7l-9 9-4-4-1.4 1.4L9 19l10.4-10.6L18 7zm-3.6 0L9 12.4 7.6 11 6.2 12.4l2.8 2.8 7.8-7.8L14.4 7z" />,
    fire: <path d="M13 1c1 3-1 5-2.5 6.5C9 9 8 10.5 8 13a4 4 0 008 0c0-2-1-3.5-2-5 .5 2-.5 3-1.5 3 1.5-3-.5-7-3-10 .5 4-3 5-3 9a6 6 0 0012 0c0-4-2-7-5-9z" />,
    bag: <path d="M6 8h12l1 13H5L6 8zm3-2a3 3 0 016 0v2h-2V6a1 1 0 10-2 0v2H9V6z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
};

const formatCOP = (n: number) => "$" + n.toLocaleString("es-CO");

/* ------------------------------------------------------------------ */
/*  COMPONENTE PRINCIPAL                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [colorway, setColorway] = useState<Colorway>(COLORWAYS[0]);
  const [qty, setQty] = useState(1);
  const [tall, setTall] = useState("40");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const cinemaIdxRef = useRef(0);

  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    window.setTimeout(() => setToast(null), 4500);
  }, []);

  const selectColorway = (cw: Colorway) => {
    setColorway(cw);
    setForm((f) => ({ ...f }));
  };

  const toggleFaq = (i: number) => setFaqOpen((p) => (p === i ? null : i));

  const incQty = () => setQty((q) => Math.min(9, q + 1));
  const decQty = () => setQty((q) => Math.max(1, q - 1));

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
          qty,
          color: colorway.id,
          unitPrice: PRICE_NOW,
          total: PRICE_NOW * qty,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error");
      showToast("¡Pedido registrado! Te contactaremos por WhatsApp en minutos.", "success");
      setForm({ name: "", phone: "", city: "", address: "" });
      setQty(1);
    } catch {
      showToast("No pudimos registrar tu pedido. Intenta de nuevo.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("formulario");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /* ================================================================ */
  /*  EFECTOS — Lógica vanilla JS                                     */
  /* ================================================================ */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const header = root.querySelector<HTMLElement>(".lp-header");
    const stickyCta = root.querySelector<HTMLElement>(".lp-sticky-cta");
    const buyBar = root.querySelector<HTMLElement>(".lp-buy-bar");
    const formSec = root.querySelector<HTMLElement>("#formulario");

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      header?.classList.toggle("is-scrolled", y > 24);
      if (stickyCta) stickyCta.classList.toggle("is-visible", y > vh * 0.85);
      if (buyBar && formSec) {
        const show = y > vh * 0.9 && y < formSec.offsetTop - vh * 0.8;
        buyBar.classList.toggle("is-visible", show);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    onScroll();
    const recalcTimer = window.setTimeout(onScroll, 700);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = root.querySelector(id) as HTMLElement | null;
      if (el) {
        e.preventDefault();
        // Cerrar menú móvil y restaurar scroll ANTES de animar (overflow:hidden bloquea scrollTo)
        root.querySelector(".lp-mobile-menu")?.classList.remove("is-open");
        root.querySelector(".lp-mobile-scrim")?.classList.remove("is-open");
        root.querySelector(".lp-menu-btn")?.classList.remove("is-open");
        document.body.style.overflow = "";
        const top = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };
    root.addEventListener("click", onClick);

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

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const magnets: HTMLElement[] = [];
    if (finePointer) {
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        magnets.push(el);
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const mx = e.clientX - r.left - r.width / 2;
          const my = e.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
        });
        el.addEventListener("mouseleave", () => { el.style.transform = ""; });
      });
    }

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
        if (ring) { ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px"; }
      };
      window.addEventListener("mousemove", move);
      const hoverTargets = root.querySelectorAll("a, button, .lp-pdp__stage, .lp-pdp__thumb, .lp-color-btn, .lp-talla, .lp-wa");
      hoverTargets.forEach((t) => {
        t.addEventListener("mouseenter", () => { cursor?.classList.add("is-hover"); ring?.classList.add("is-hover"); });
        t.addEventListener("mouseleave", () => { cursor?.classList.remove("is-hover"); ring?.classList.remove("is-hover"); });
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      root.removeEventListener("click", onClick);
      root.removeEventListener("mousedown", onRipple);
      window.clearTimeout(recalcTimer);
      io.disconnect();
      ioCount.disconnect();
      cursor?.remove();
      ring?.remove();
    };
  }, []);

  // Countdown timer (end of day)
  useEffect(() => {
    const units = document.querySelectorAll<HTMLElement>("[data-cd]");
    if (!units.length) return;
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
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

  // Stock bar animate on view
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".lp-pdp__stock-fill");
    if (!bar) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { bar.style.width = "22%"; io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  const total = PRICE_NOW * qty;

  return (
    <div className="lp-root" ref={rootRef}>
      {/* ============ HEADER ============ */}
      <header className="lp-header">
        <div className="lp-header__inner">
          <a href="#top" className="lp-brand" aria-label="BRAHMA inicio">
            <img src="/images/logo-brahma.png" alt="BRAHMA" className="lp-brand__logo" />
          </a>
          <nav className="lp-nav" aria-label="Principal">
            <a href="#beneficios">Beneficios</a>
            <a href="#opiniones">Opiniones</a>
            <a href="#faq">Preguntas</a>
            <a href="#oferta">Oferta</a>
          </nav>
          <div className="lp-header__cta">
            <a href="#formulario" className="lp-btn lp-btn--primary" data-magnetic>
              <Icon name="bolt" style={{ width: 16, height: 16 }} /> Comprar ahora
            </a>
          </div>
          <button className="lp-menu-btn" aria-label="Menú" onClick={(e) => {
            const b = e.currentTarget;
            const m = document.querySelector(".lp-mobile-menu");
            const s = document.querySelector(".lp-mobile-scrim");
            const willOpen = !b.classList.contains("is-open");
            b.classList.toggle("is-open", willOpen);
            m?.classList.toggle("is-open", willOpen);
            s?.classList.toggle("is-open", willOpen);
            document.body.style.overflow = willOpen ? "hidden" : "";
          }}><span /></button>
        </div>
      </header>
      <div className="lp-mobile-scrim" onClick={() => {
        const b = document.querySelector(".lp-menu-btn");
        const m = document.querySelector(".lp-mobile-menu");
        const s = document.querySelector(".lp-mobile-scrim");
        b?.classList.remove("is-open");
        m?.classList.remove("is-open");
        s?.classList.remove("is-open");
        document.body.style.overflow = "";
      }} aria-hidden="true" />
      <div className="lp-mobile-menu">
        <a href="#beneficios">Beneficios</a>
        <a href="#opiniones">Opiniones</a>
        <a href="#faq">Preguntas</a>
        <a href="#oferta">Oferta</a>
        <a href="#formulario" className="lp-btn lp-btn--primary lp-btn--block">Comprar ahora</a>
      </div>

      <main className="lp-main" id="top">

        {/* ============ URGENCY STRIP ============ */}
        <div className="lp-urgency">
          <span className="lp-pulse-dot" />
          <span><b>OFERTA TERMINA HOY</b> · Pago Contra Entrega · Envío Gratis · 🎁 Gorra bordada incluida</span>
        </div>

        {/* ============ HERO PDP ============ */}
        <section className="lp-pdp" id="hero">
          <div className="lp-pdp__bg" />
          <div className="lp-container lp-pdp__grid">

            {/* Gallery (left) */}
            <div className="lp-pdp__gallery lp-reveal lp-reveal--scale">
              <div className="lp-pdp__stage">
                <img src={colorway.img} alt={`Combo BRAHMA color ${colorway.label}`} fetchPriority="high" />
                <div className="lp-pdp__badge-discount">
                  <small>Ahorra</small> {formatCOP(SAVED)} HOY
                </div>
                <div className="lp-pdp__views">
                  <span className="lp-dot" /> 38 personas viendo esto
                </div>
              </div>
              <div className="lp-pdp__thumbs">
                {COLORWAYS.map((c) => (
                  <button key={c.id} className={`lp-pdp__thumb ${colorway.id === c.id ? "is-active" : ""}`}
                    aria-label={`Color ${c.label}`} onClick={() => selectColorway(c)}>
                    <img src={c.img} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info (right) */}
            <div className="lp-pdp__info lp-reveal" data-delay="1">
              <div className="lp-pdp__crumb">
                <b>COMBO BRAHMA</b> · Monster Edition
              </div>
              <h1 className="lp-pdp__title">
                Combo Brahma <em>Monster</em> Zapatos + Gorra
              </h1>
              <p className="lp-pdp__subtitle">
                Estilo urbano, comodidad garantizada. Resistencia, confort y diseño moderno para cualquier ocasión.
              </p>

              <div className="lp-pdp__rating">
                <span className="lp-pdp__stars">★★★★★</span>
                <span className="lp-pdp__rating-num">4.9</span>
                <span className="lp-pdp__rating-count">(2.480 reseñas)</span>
                <span className="lp-pdp__rating-verified"><Icon name="check" /> Verificadas</span>
              </div>

              <div className="lp-pdp__price">
                <span className="lp-pdp__price-now">{formatCOP(PRICE_NOW)}</span>
                <span className="lp-pdp__price-old">{formatCOP(PRICE_OLD)}</span>
                <span className="lp-pdp__price-save">Ahorras {formatCOP(SAVED)}</span>
              </div>
              <p className="lp-pdp__tax">Incluye envío gratis · <b>Pago contra entrega</b> · Impuestos incluidos</p>

              {/* Color selector */}
              <div className="lp-variant">
                <div className="lp-variant__label">
                  <b>Color</b>
                  <span>{colorway.label}</span>
                </div>
                <div className="lp-pdp__colors">
                  {COLORWAYS.map((c) => (
                    <button key={c.id} className={`lp-color-btn ${colorway.id === c.id ? "is-active" : ""}`}
                      aria-label={`Color ${c.label}`} onClick={() => selectColorway(c)}>
                      <span className="lp-color-btn__swatch" style={{ background: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Talla selector */}
              <div className="lp-variant">
                <div className="lp-variant__label">
                  <b>Talla</b>
                  <span className="lp-talla-guide">Guía de tallas</span>
                </div>
                <div className="lp-tallas">
                  {TALLAS.map((t) => (
                    <button key={t} className={`lp-talla ${tall === t ? "is-active" : ""}`}
                      onClick={() => setTall(t)}>{t}</button>
                  ))}
                </div>
              </div>

              {/* Stock bar */}
              <div className="lp-pdp__stock">
                <div className="lp-pdp__stock-row">
                  <span>🔥 En oferta · Stock limitado</span>
                  <b>Quedan 37</b>
                </div>
                <div className="lp-pdp__stock-bar"><div className="lp-pdp__stock-fill" style={{ width: "0%" }} /></div>
              </div>

              {/* CTA */}
              <div className="lp-pdp__cta">
                <div className="lp-pdp__cta-row">
                  <div className="lp-pdp__qty">
                    <button type="button" onClick={decQty} aria-label="Restar"><Icon name="minus" style={{ width: 16, height: 16 }} /></button>
                    <input type="text" readOnly value={qty} aria-label="Cantidad" />
                    <button type="button" onClick={incQty} aria-label="Sumar"><Icon name="plus" style={{ width: 16, height: 16 }} /></button>
                  </div>
                  <a href="#formulario" className="lp-btn lp-btn--primary lp-btn--lg" data-magnetic onClick={scrollToForm}>
                    <Icon name="bag" style={{ width: 18, height: 18 }} /> Pedir ahora · {formatCOP(total)}
                  </a>
                </div>
                <a href="#formulario" className="lp-btn lp-btn--ghost lp-btn--block" onClick={scrollToForm}>
                  <Icon name="whatsapp" style={{ width: 18, height: 18 }} /> Comprar por WhatsApp
                </a>
              </div>

              {/* Trust mini */}
              <div className="lp-pdp__trust">
                <div className="lp-pdp__trust-item">
                  <Icon name="cash" />
                  <b>Pago entrega</b>
                  <small>Pagas al recibir</small>
                </div>
                <div className="lp-pdp__trust-item">
                  <Icon name="truck" />
                  <b>Envío gratis</b>
                  <small>A toda Colombia</small>
                </div>
                <div className="lp-pdp__trust-item">
                  <Icon name="shield" />
                  <b>Garantía 30d</b>
                  <small>Devolución total</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3 PASOS ============ */}
        <section className="lp-section lp-section--paper lp-section--tight">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">Así de fácil</span>
              <h2>Tener tu Brahma Monster</h2>
              <p>No necesitas complicarte. Solo elige, confirma y disfruta.</p>
            </div>
            <div className="lp-steps">
              {STEPS.map((s, i) => (
                <div key={s.num} className="lp-step lp-reveal" data-delay={i + 1}>
                  <div className="lp-step__num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ BENEFICIOS ============ */}
        <section className="lp-section" id="beneficios">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">Por qué elegirlo</span>
              <h2>Diseñado para el hombre que no se detiene</h2>
              <p>Este calzado casual combina resistencia, confort y un diseño moderno ideal para cualquier ocasión.</p>
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

        {/* ============ TESTIMONIOS WHATSAPP ============ */}
        <section className="lp-section lp-section--paper" id="opiniones">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">Mensajes reales</span>
              <h2>Lo que dicen nuestros clientes</h2>
              <p>Conversaciones reales de WhatsApp de clientes que ya tienen su combo. Sin filtros, sin guion.</p>
            </div>

            {/* Stats */}
            <div className="lp-stats lp-reveal" style={{ marginBottom: 48 }}>
              <div><div className="lp-stat__num"><span data-count="12480" data-suffix="+">0</span></div><div className="lp-stat__label">Clientes felices</div></div>
              <div><div className="lp-stat__num"><span data-count="4.9" data-suffix="/5">0</span></div><div className="lp-stat__label">Valoración media</div></div>
              <div><div className="lp-stat__num"><span data-count="98" data-suffix="%">0</span></div><div className="lp-stat__label">Recomendaría</div></div>
              <div><div className="lp-stat__num"><span data-count="24" data-suffix="h">0</span></div><div className="lp-stat__label">Despacho</div></div>
            </div>

            <div className="lp-wa-testis">
              {WA_TESTIMONIALS.map((t, i) => (
                <article key={t.name} className="lp-wa lp-reveal" data-delay={(i % 3) + 1}>
                  <div className="lp-wa__header">
                    <div className="lp-wa__avatar">{t.initials}</div>
                    <div>
                      <div className="lp-wa__name">{t.name}</div>
                      <div className="lp-wa__status">en línea · {t.city}</div>
                    </div>
                    <Icon name="whatsapp" style={{ width: 20, height: 20, marginLeft: "auto", opacity: 0.8 }} />
                  </div>
                  <div className="lp-wa__body">
                    <div className="lp-wa__photo">
                      <img src={t.photo} alt={`Mensaje de WhatsApp de ${t.name}`} loading="lazy" />
                      <span className="lp-wa__photo-caption">{t.photoCaption}</span>
                    </div>
                    <div className="lp-wa__bubble">{t.message}</div>
                    <div className="lp-wa__time">{t.time} <Icon name="checkDouble" /></div>
                  </div>
                  <div className="lp-wa__stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                  <div className="lp-wa__verified"><Icon name="check" /> Compra verificada · {t.city}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ OFERTA ============ */}
        <section className="lp-section lp-section--ink" id="oferta">
          <div className="lp-container">
            <div className="lp-offer lp-reveal lp-reveal--scale">
              <div className="lp-offer__bg" />
              <div className="lp-offer__inner">
                <div>
                  <span className="lp-eyebrow" style={{ color: "var(--lp-amber)" }}>Oferta de lanzamiento</span>
                  <h2>Llévate tu Combo Brahma Monster hoy</h2>
                  <p className="lp-offer__sub">Incluye gorra BRAHMA en drill bordada de regalo · Pago contra entrega · Envío a toda Colombia. El precio sube cuando el reloj llegue a cero.</p>

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

                  <div className="lp-offer__price">
                    <span className="lp-price__old">{formatCOP(PRICE_OLD)}</span>
                    <span className="lp-price__now">{formatCOP(PRICE_NOW)}</span>
                    <span className="lp-price__save">Ahorras {formatCOP(SAVED)}</span>
                  </div>

                  <a href="#formulario" className="lp-btn lp-btn--light lp-btn--lg lp-btn--block" data-magnetic onClick={scrollToForm}>
                    <Icon name="bolt" style={{ width: 18, height: 18 }} /> QUIERO MI COMBO →
                  </a>
                  <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 16, flexWrap: "wrap", fontSize: "0.8rem", color: "var(--lp-stone-2)" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="check" style={{ width: 14, height: 14, color: "var(--lp-success)" }} /> Pago contraentrega</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="check" style={{ width: 14, height: 14, color: "var(--lp-success)" }} /> Envío nacional</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="check" style={{ width: 14, height: 14, color: "var(--lp-success)" }} /> 🎁 Gorra gratis</span>
                  </div>
                </div>
                <div className="lp-offer__visual">
                  <img src={colorway.img} alt="Combo BRAHMA en oferta" loading="lazy" />
                  <div className="lp-offer__seal">
                    <div>AHORRA<br /><small>{formatCOP(SAVED)}</small>HOY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GARANTÍA ============ */}
        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-guarantee lp-reveal">
              <div className="lp-guarantee__seal"><Icon name="shield" /></div>
              <div>
                <span className="lp-eyebrow">Nuestra promesa</span>
                <h3>Compra 100% segura y verificada</h3>
                <p>Pides, recibes, examinas. Si por cualquier razón el combo no cumple tus expectativas, te devolvemos el 100% de tu dinero. Sin letra pequeña, sin interrogatorios.</p>
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

        {/* ============ FAQ ============ */}
        <section className="lp-section lp-section--paper" id="faq">
          <div className="lp-container">
            <div className="lp-section-head lp-section-head--center lp-reveal">
              <span className="lp-eyebrow">Preguntas frecuentes</span>
              <h2>Todo lo que necesitas saber antes de comprar</h2>
              <p>Y si queda alguna duda, escríbenos por WhatsApp. Respondemos en minutos.</p>
            </div>
            <div className="lp-faq lp-reveal">
              {FAQS.map((f, i) => (
                <div key={i} className={`lp-faq__item ${faqOpen === i ? "is-open" : ""}`}>
                  <button className="lp-faq__q" onClick={() => toggleFaq(i)} aria-expanded={faqOpen === i}>
                    <span>{f.q}</span>
                    <span className="lp-faq__icon" aria-hidden="true" />
                  </button>
                  <div className="lp-faq__a" style={{ maxHeight: faqOpen === i ? 360 : 0 }}>
                    <div className="lp-faq__a-inner">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FORMULARIO ============ */}
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
                  <div className="lp-row"><span>Combo BRAHMA ({colorway.label}, Talla {tall})</span><span>{formatCOP(PRICE_NOW)}</span></div>
                  <div className="lp-row"><span>Gorra bordada de regalo</span><span>$0</span></div>
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
                  <label>Color: <b style={{ color: "var(--lp-amber-deep)" }}>{colorway.label}</b> · Talla: <b style={{ color: "var(--lp-amber-deep)" }}>{tall}</b> · Cantidad: <b style={{ color: "var(--lp-amber-deep)" }}>{qty}</b></label>
                  <div className="lp-pdp__colors" style={{ gap: 8 }}>
                    {COLORWAYS.map((c) => (
                      <button key={c.id} type="button" className={`lp-color-btn ${colorway.id === c.id ? "is-active" : ""}`}
                        style={{ width: 40, height: 40, padding: 3 }} aria-label={c.label} onClick={() => selectColorway(c)}>
                        <span className="lp-color-btn__swatch" style={{ background: c.hex }} />
                      </button>
                    ))}
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

      {/* ============ FOOTER ============ */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer__top">
            <div className="lp-footer__brand">
              <a href="#top" className="lp-brand lp-brand--footer"><img src="/images/logo-brahma.png" alt="BRAHMA" className="lp-brand__logo" /></a>
              <p>Combo urbano premium para Colombia. Pago Contra Entrega, envío gratis y garantía real.</p>
            </div>
            <div className="lp-footer__col">
              <h4>Producto</h4>
              <a href="#beneficios">Beneficios</a>
              <a href="#opiniones">Opiniones</a>
              <a href="#faq">Preguntas</a>
              <a href="#oferta">Oferta</a>
            </div>
            <div className="lp-footer__col">
              <h4>Compra</h4>
              <a href="#formulario">Hacer pedido</a>
              <a href="#formulario">Pago contra entrega</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Escríbenos al 300 000 0000", "info"); }}>WhatsApp</a>
            </div>
            <div className="lp-footer__col">
              <h4>Confianza</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Garantía de 30 días activa", "info"); }}>Garantía 30 días</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Envío gratis a todo Colombia", "info"); }}>Envío gratis</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Términos disponibles bajo solicitud", "info"); }}>Términos</a>
            </div>
          </div>
          <div className="lp-footer__bottom">
            <span>© {new Date().getFullYear()} BRAHMA Monster · Hecho en Colombia.</span>
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
        <a href="#formulario" className="lp-btn lp-btn--primary" data-magnetic onClick={scrollToForm}>
          <Icon name="bolt" style={{ width: 16, height: 16 }} /> Comprar
        </a>
      </div>

      {/* ============ DESKTOP BUY BAR ============ */}
      <div className="lp-buy-bar">
        <div className="lp-buy-bar__price">
          {formatCOP(PRICE_NOW)}
          <small>{formatCOP(PRICE_OLD)}</small>
        </div>
        <a href="#formulario" className="lp-btn lp-btn--light" data-magnetic onClick={scrollToForm}>
          <Icon name="bolt" style={{ width: 16, height: 16 }} /> Comprar ahora
        </a>
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
