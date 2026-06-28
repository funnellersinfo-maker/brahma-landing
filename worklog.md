# Worklog — BRAHMA Landing Premium

---
Task ID: 1
Agent: orchestrator (main)
Task: Crear landing page premium de altísima conversión para combo BRAHMA (tenis urbanos + gorra bordada) con Pago Contra Entrega en Colombia.

Work Log:
- Análisis de las 6 imágenes del producto (5 únicas — imageProduct.jpg == 835a3dc3) con VLM. Marca BRAHMA, 4 colorways (beige/café/oliva/azul/negro) + gorra negra bordada, estética de taller industrial.
- Copia de imágenes a /public/images/ con nombres limpios (combo-beige/brown/olive/blue/black.jpg).
- Diseño del sistema visual: paleta monocromo cálido (hueso #f5f2ec + carboncillo #0b0b0c) + acento ámbar solo para escasez; tipografías Sora (display) + Inter (body) vía next/font.
- Escritura de src/app/landing.css (~1900 líneas): tokens, base, layout, botones, badges, header blur, hero, marquee, cinema Ken Burns, beneficios, galería + lightbox, qué incluye, lifestyle asimétrico, comparativa, testimonios, oferta con countdown + stock, garantía, FAQ acordeón, formulario, footer, sticky CTA móvil, buy-bar desktop, cursor elegante, toast, scroll reveal, stats, responsive, reduced-motion.
- Escritura de src/app/page.tsx: 13 secciones con HTML semántico, iconos SVG inline, selector de colorways interactivo, galería con navegación y lightbox, FAQ acordeón, formulario con validación y envío a /api/order. Lógica vanilla JS en useEffect: header scroll blur, smooth scroll, IntersectionObserver reveal, contadores animados, ripple en botones, hover magnético, cursor custom, parallax ligero, cinema autoplay, countdown diario, stock dinámico, sticky CTA/buy-bar.
- Actualización de layout.tsx: lang="es", metadata SEO completa (title, description, keywords, OpenGraph, Twitter), fuentes Inter + Sora, script inline para progressive enhancement (clase lp-js).
- Schema Prisma: modelo Order (name, phone, city, address, tall, qty, color, unitPrice, total, status). db:push aplicado.
- API route POST /api/order: validación servidor + inserción en BD.
- Fix de bug: sticky CTA aparecía al inicio por medición prematura del hero antes de cargar imagen → cambiado a umbral basado en viewport (vh*0.85) + listeners load/resize + timer recálculo. Sticky-cta oculto en desktop (display:flex solo ≤768px).
- Fix de robustez: scroll reveal con progressive enhancement (`.lp-js .lp-reveal` oculta; sin JS, visible).
- Verificación E2E con Agent Browser: render OK (0 errores consola), selector de color cambia imagen, galería navega + lightbox abre/cierra con Escape, FAQ acordeón, validación formulario (errores + toast), envío exitoso (POST 200, pedido guardado en BD, toast éxito), móvil responsive, sticky CTA móvil, menú móvil, buy-bar desktop.
- Lint: 0 errores, 0 warnings. Dev.log limpio.

Stage Summary:
- Landing premium completa y funcional en la ruta / (única ruta visible).
- 13 secciones CRO: Hero, Video cinemático, Beneficios, Galería+lightbox, Qué incluye, Lifestyle, Comparativa, Testimonios, Oferta+countdown+stock, Garantía, FAQ, Formulario, Footer.
- Estética Apple/Linear/Represent: mucho aire, contraste alto, microanimaciones, cursor elegante, glassmorphism sutil, sin colores chillones.
- Conversión: Pago Contra Entrega destacado, anchoring de precio, escasez (stock dinámico), urgencia (countdown), prueba social (6 testimonios + stats), reversión de riesgo (garantía 30 días), eliminación de objeciones (FAQ).
- Backend: /api/order + Prisma Order model operativos. Pedido de prueba guardado en BD.
- Archivos clave: src/app/page.tsx, src/app/landing.css, src/app/layout.tsx, src/app/api/order/route.ts, prisma/schema.prisma, public/images/combo-*.jpg.

---
Task ID: 2
Agent: orchestrator (main)
Task: Fix botón "Comprar ahora" del header con texto invisible (negro sobre negro).

Work Log:
- Diagnóstico con Agent Browser: el botón header CTA tenía color=rgb(11,11,12) (negro) y background=rgb(11,11,12) (negro) → texto invisible.
- Causa raíz: en landing.css línea 112, la regla `.lp-root a { color: inherit }` tiene especificidad (0,1,1), que GANA sobre `.lp-btn--primary { color: var(--lp-bone) }` con especificidad (0,1,0). Como el botón del header es un <a> (no un <button>), heredaba el color del padre → negro.
- Fix: añadí reglas con especificidad elevada (0,2,1) en landing.css para los <a> que son botones:
  - `.lp-root a.lp-btn--primary { background: var(--lp-ink); color: var(--lp-bone); ... }`
  - `.lp-root a.lp-btn--ghost { ... color: var(--lp-ink); ... }`
  - `.lp-root a.lp-btn--light { ... color: var(--lp-ink); ... }`
  - `.lp-root a.lp-btn--ghost:hover { color: var(--lp-bone); background: var(--lp-ink); ... }`
- Verificación: recargué y revisé los 8 CTAs tipo <a> de la página. Todos ahora tienen texto legible (blanco sobre negro, o negro sobre blanco/transparente según la variante).
- Lint: 0 errores, 0 warnings.
- VLM confirmó: "Comprar ahora" del header ahora tiene texto blanco sobre fondo negro, alta legibilidad.

Stage Summary:
- Bug de contraste resuelto. Todos los CTAs (header, hero, qué incluye, oferta, sticky móvil, buy-bar desktop, menú móvil) ahora muestran su texto correctamente.
- El problema afectaba solo a los <a> con clase lp-btn--primary/ghost/light; los <button> (como el submit del form) no se veían afectados porque la regla `.lp-root a` no les aplica.
