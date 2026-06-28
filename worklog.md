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

---
Task ID: 3
Agent: orchestrator (main)
Task: Rediseñar landing con hero estilo Shopify PDP + selector de color que cambia imagen + 3 testimonios WhatsApp reales + orden de alta conversión tipo páginas americanas.

Work Log:
- Scraping de https://clicmarketstore.com/products/combo-brahma-moster con web-reader (page_reader). Extracción de: estructura de secciones, copy de beneficios, 4 testimonios, 6 FAQs, psicología de conversión (3 pasos, urgencia, contraentrega, gorra gratis).
- Análisis de 3 capturas de WhatsApp reales (Juliana P. Bogotá, Nicolás R. Medellín, Mauricio V. Cali) con mensajes auténticos de clientes BRAHMA. Copia de las 3 imágenes a public/images/wa-*.png.
- Añadido ~480 líneas de CSS nuevo en landing.css (sección v2):
  - Hero PDP: grid 2 columnas (galería izq + info der), stage cuadrado con badge descuento, "X personas viendo", thumbnails, color buttons circulares 56px con estado activo, selector de talla, stock bar, qty selector, trust mini badges.
  - 3 Pasos "Así de fácil": grid 3 columnas con línea punteada conectora, números circulares.
  - Testimonios WhatsApp: cards con header verde #075e54, avatar con iniciales, foto del producto, bubble de chat blanco, timestamp con check azul doble, estrellas, badge "Compra verificada".
  - Urgency strip: barra negra con dot pulsante + oferta/contraentrega/gorra.
  - Responsive: móvil single-column, swatches más pequeños, CTA full-width.
- Reescrito page.tsx completamente con nuevo orden CRO:
  1. Urgency strip (negro, oferta termina hoy)
  2. Hero PDP (imagen izq + info der con color/talla/stock/qty/CTA)
  3. 3 Pasos (Elige → Confirma → Disfruta)
  4. Beneficios (6 cards)
  5. Testimonios WhatsApp (3 cards con Juliana/Nicolás/Mauricio + stats)
  6. Oferta (countdown + precio anclado + CTA + checkmarks)
  7. Garantía (Compra 100% segura)
  8. FAQ (8 preguntas)
  9. Formulario (con resumen de pedido dinámico)
- Funcionalidad JS: selector de color cambia imagen del stage + actualiza nombre del color visible + sincroniza con formulario; selector de talla con estado activo; qty selector; countdown; stock bar animada on-view; scroll reveal; ripple; magnetic hover; cursor custom.
- Verificación E2E con Agent Browser:
  - Desktop 1440px: hero PDP renderiza con imagen izq, 5 swatches con estado activo, nombre color "Arena" visible, 8 tallas con 40 seleccionada, precio $119.900/$219.000/-45%, CTA "Pedir ahora" legible. Click en cada color (Café/Negro/Azul) cambia la imagen instantáneamente. ✅
  - Testimonios WhatsApp: 3 cards con header verde, fotos reales, mensajes auténticos, nombres y ciudades. ✅
  - Formulario: llenado + submit → POST /api/order 200 → pedido guardado en BD (María González, Cali, blue, 40, 119900) → toast de éxito. ✅
  - Móvil 390px: hero single-column, swatches y tallas visibles y tappables, CTA full-width, sticky CTA móvil funcional. ✅
- Lint: 0 errores, 0 warnings. Dev.log limpio (solo Fast Refresh/HMR, sin errores).

Stage Summary:
- Landing rediseñada al estilo PDP Shopify de alta conversión (clicmarketstore + páginas americanas).
- Selector de color prominente (5 círculos grandes) que cambia la imagen del producto al instante, con nombre del color visible.
- 3 testimonios grandes estilo WhatsApp con fotos reales del producto y mensajes auténticos (Juliana/Nicolás/Mauricio) — prueba social maximizada.
- Orden claro: Urgencia → Hero PDP → 3 Pasos → Beneficios → Testimonios WA → Oferta → Garantía → FAQ → Form.
- Psicología aplicada: anchoring (precio tachado), escasez (stock 37 + bar), urgencia (countdown + strip), prueba social (3 WA + stats), reversión de riesgo (garantía), compromiso (3 pasos), eliminación de objeciones (8 FAQs).
- Funcional: pedidos contra entrega se guardan en BD vía /api/order.

---
Task ID: 4
Agent: orchestrator (main)
Task: Fix solapamiento en móvil entre el banner "OFERTA TERMINA HOY" y el menú desplegable del header.

Work Log:
- Diagnóstico con Agent Browser (390px): el banner de urgencia tenía position:static y top:0, quedando DETRÁS del header fixed transparente. El menú móvil desplegable (translúcido rgba 0.92, z-index 99) dejaba ver el banner negro a través de él → conflicto visual.
- Causa raíz: el <main> no tenía padding-top para compensar el header fixed, así que el banner de urgencia (primer hijo del main) se renderizaba en top:0, detrás del header.
- Fix 1: padding-top en .lp-root .lp-main = var(--lp-header-h) para que todo el contenido empiece debajo del header. Ajustado .lp-pdp padding-top para evitar duplicación.
- Fix 2: menú móvil ahora opaco (background: var(--lp-bone) sólido, no translúcido) + z-index 110 (mayor que header 100) + box-shadow-lg para separación clara.
- Fix 3: añadido .lp-mobile-scrim (overlay oscuro rgba 0.45, z-index 105) que cubre el resto de la página cuando el menú está abierto. Click en el scrim cierra el menú.
- Fix 4: lógica del botón hamburguesa actualizada para togglear menú + scrim + body.overflow=hidden (bloquea scroll de fondo).
- Fix 5: orden del handler de smooth-scroll corregido — ahora cierra el menú y restaura overflow ANTES de hacer scrollTo (overflow:hidden bloqueaba el scroll suave).
- Verificación E2E móvil:
  - Banner de urgencia visible DEBAJO del header (no detrás). ✅
  - Menú abierto: fondo opaco beige, links legibles, overlay oscuro cubre el resto (incluido el banner). ✅
  - Click en scrim cierra el menú. ✅
  - Click en enlace del menú (Beneficios): cierra menú + scrim + restaura overflow + scroll suave a la sección (scrollY=2612). ✅
  - Desktop 1440px sin regresiones. ✅
- Lint: 0 errores. Dev.log limpio.

Stage Summary:
- Conflicto visual resuelto: el banner "OFERTA TERMINA HOY" ya no se interpone con el menú móvil desplegable.
- El menú móvil ahora es opaco, tiene un overlay/scrim que oscurece el resto de la página, y se cierra correctamente al hacer click en un enlace o en el área oscura.
- El banner de urgencia se renderiza debajo del header (no detrás), mejorando la jerarquía visual en móvil y desktop.
