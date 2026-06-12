# SPEC — Web corporativa de Comboi Labs

## Contexto

Comboi Labs es una empresa de desarrollo de software ubicada en Benissa (Alicante, España). Tres socios. Servicios: desarrollo web a medida, apps móviles y agentes de IA. Idioma de la web: **castellano** (sin multiidioma por ahora, pero con estructura preparada para añadirlo).

**Objetivo**: web corporativa estática, rápida y optimizada para SEO, con una identidad visual "dev/friki" ya definida en un prototipo.

## ⚠️ Fuente de verdad del diseño

En la raíz del repo hay un archivo `referencia/comboi-labs-home.html`. Es el prototipo aprobado de la home con todo el diseño, animaciones y copy final. **Replícalo fielmente**: mismos colores, tipografías, espaciados, textos y animaciones. No "mejores" el diseño por tu cuenta. Las páginas nuevas deben seguir su mismo sistema visual.

## Stack

- **Astro 5** con output estático (`output: 'static'`). Nada de SSR.
- CSS vanilla con custom properties (como el prototipo). **No uses Tailwind** — queremos control total y replicar el prototipo al píxel.
- JavaScript vanilla mínimo para las animaciones (el del prototipo, adaptado a componentes).
- Integraciones Astro: `@astrojs/sitemap`.
- Blog con **Content Collections** de Astro (Markdown).
- Repo: organización `comboi-labs` en GitHub. Conventional commits.

## Sistema de diseño (extraído del prototipo)

### Tokens

```css
--bg:#F4F5F7; --surface:#FFFFFF;
--ink:#10131A; --ink-2:#5A6172; --ink-3:#9AA0AE;
--cobalt:#2B3CFF; --cobalt-soft:#E8EAFF;
--mint:#5BE0B3; --mint-deep:#0B7A52;
--line:#E2E4EA; --tile-dark:#10131A; --tile-dark-2:#1B2030;
--radius:14px;
```

### Tipografía

- **Archivo** (variable, `wdth 62..125, wght 400..700`) — titulares en mayúsculas con `font-variation-settings:'wdth' 115`, texto en width 100.
- **Space Mono** — etiquetas, eyebrows, terminal, detalles técnicos.
- Carga: Google Fonts con `preconnect`. Valora `font-display: swap`.

### Lenguaje visual "dev" (aplicar en TODAS las páginas)

- Eyebrows de sección como comentarios o comandos: `// servicios`, `$ git log --oneline`, `// proyectos --status=building`.
- Todos los `h2` llevan cursor `_` parpadeante (`h2::after`, ya en el prototipo).
- Enlaces de tarjeta con estilo función: `leer_más() →`.
- Nav con corchetes: `[SERVICIOS] [PROCESO] [PROYECTOS]`.
- Ventanas tipo terminal/editor (barra con 3 botones de semáforo) para bloques destacados.
- Barra de estado tipo VS Code en el footer de todas las páginas (`⎇ main · UTF-8 · ✓ build passing · hecho_en_benissa`).
- Easter eggs globales: ASCII art + mensaje de captación en `console.log`, y código Konami → toast `> modo_comboi activado ✓` (ya implementados en el prototipo, extráelos a un script global).
- Respeta `prefers-reduced-motion` en todas las animaciones (patrón ya presente en el prototipo).

## Estructura de páginas y URLs

| Página | Ruta | `<title>` orientativo |
|---|---|---|
| Inicio | `/` | Comboi Labs — Desarrollo de software a medida en Benissa, Alicante |
| Servicios (hub) | `/servicios/` | Servicios de desarrollo de software — Comboi Labs |
| Desarrollo web | `/servicios/desarrollo-web/` | Desarrollo web a medida — Comboi Labs |
| Apps móviles | `/servicios/apps-moviles/` | Desarrollo de apps móviles iOS y Android — Comboi Labs |
| Agentes de IA | `/servicios/automatizacion-ia/` | Agentes de IA y automatización para empresas — Comboi Labs |
| Proyectos | `/proyectos/` | Proyectos — Comboi Labs |
| Nosotros | `/nosotros/` | Quiénes somos — Comboi Labs |
| Blog | `/blog/` | Blog — Comboi Labs |
| Artículo | `/blog/[slug]/` | (título del post) |
| Contacto | `/contacto/` | Contacto — Comboi Labs |
| Aviso legal | `/aviso-legal/` | — |
| Privacidad | `/politica-privacidad/` | — |
| Cookies | `/politica-cookies/` | — |
| 404 | `/404` | ver más abajo |

## Especificación por página

### Home (`/`)

Réplica del prototipo `referencia/comboi-labs-home.html`, componentizada:

- `Header.astro`, `Footer.astro` (con statusbar), `Bento.astro`, `ServiceCard.astro`, `GitLogSteps.astro`, `ProjectPlaceholder.astro`, `CtaBand.astro`.
- Los enlaces `leer_más() →` de las tarjetas de servicio deben apuntar a sus subpáginas reales.
- El texto del H1 debe estar completo en el HTML renderizado (el efecto de tecleo lo borra y reescribe con JS en cliente — ya funciona así en el prototipo, mantenlo).

### Subpáginas de servicio (×3)

Misma plantilla (`ServiceLayout.astro`), ~900-1.200 palabras cada una, con estas secciones:

1. **Hero**: eyebrow terminal (`~/servicios $ cat desarrollo-web.md`), H1 con la keyword, subtítulo, CTA.
2. **El problema** que resuelve el servicio (2-3 párrafos orientados al cliente, no al técnico).
3. **Qué incluye**: tarjetas estilo bento con entregables concretos.
4. **Cómo lo hacemos**: versión resumida del git log de proceso, adaptada al servicio.
5. **FAQ**: 4-6 preguntas con respuestas de 2-4 frases. Marcar con schema `FAQPage`. Las preguntas deben responder a búsquedas reales (ej. "¿Cuánto cuesta una app móvil?", "¿Qué es un agente de IA?").
6. **CTA final** (componente `CtaBand` reutilizado).

Contenido de cada servicio:

- **Desarrollo web** (`/servicios/desarrollo-web/`): webapps a medida, PWAs con modo offline, paneles de administración, integraciones. Keyword principal: "desarrollo web a medida".
- **Apps móviles** (`/servicios/apps-moviles/`): apps iOS/Android con React Native, publicación en stores, notificaciones push, geolocalización. Keyword: "desarrollo de apps móviles".
- **Agentes de IA** (`/servicios/automatizacion-ia/`): agentes de WhatsApp, reserva de citas automática, automatización de procesos internos. Keywords: "agentes de IA para empresas", "automatización con IA".

Redacta el copy tú (Claude Code) siguiendo el tono del prototipo: directo, sin humo, frases cortas, tuteo. Evita jerga vacía de agencia ("soluciones 360", "partner tecnológico").

### Servicios hub (`/servicios/`)

Página corta: intro + las 3 tarjetas de servicio enlazando a las subpáginas + CTA.

### Proyectos (`/proyectos/`)

Versión extendida de la sección de la home: intro + grid de placeholders `// TODO: publicar` (los 3 del prototipo). Deja preparado un componente `CaseStudy.astro` (imagen, cliente, problema, solución, stack, resultado) aunque aún no se use, con un caso de ejemplo comentado en el código.

### Nosotros (`/nosotros/`)

- Hero: `~/comboi $ cat equipo.md` + H1 tipo "Tres informáticos de Benissa".
- Historia corta de la empresa (deja el texto con marcadores `<!-- TODO: completar -->` donde falten datos reales de los socios — NO inventes nombres ni biografías).
- Hueco para foto del equipo: usa un placeholder estilo terminal (`// TODO: hacer la foto`) con el mismo patrón del prototipo. No uses fotos de stock.
- Valores presentados como un objeto de código:

```
const comboi = {
  base: "Benissa, Alicante",
  socios: 3,
  promesa: "código que funciona, trato directo",
};
```

### Blog (`/blog/`)

- Content Collection `blog` con frontmatter: `title, description, pubDate, updatedDate, tags, draft`.
- Listado con tarjetas (fecha en mono, estilo `2026-06-12`).
- Plantilla de artículo con: breadcrumbs, schema `Article`, tabla de contenidos si hay 3+ H2, bloque autor genérico "Equipo Comboi".
- Crea **un artículo de ejemplo en draft** para validar la plantilla.

### Contacto (`/contacto/`)

- Hero terminal: `$ ./iniciar_proyecto --llamada 30min --compromiso 0`.
- Datos: email `hola@comboilabs.com` (marcador, confirmar), ubicación Benissa (Alicante).
- Formulario estático con `name, email, mensaje` apuntando a un endpoint placeholder (`<!-- TODO: conectar con backend o Formspree -->`). Honeypot anti-spam. No metas captcha de Google.
- Schema `LocalBusiness` (ver SEO).

### 404

Página friki obligatoria: `ERROR 404 — ruta no encontrada`, estilo terminal con `$ cd /home → volver al inicio`. Es la página perfecta para lucirse, pero breve.

### Legales

Plantillas estándar (LSSI/RGPD España) con marcadores `<!-- TODO -->` para: razón social (Comboi SL), CIF, domicilio social, email. No inventes esos datos.

## SEO (requisitos duros)

- Componente `Seo.astro` centralizado: title, meta description únicas por página, canonical, Open Graph + Twitter card.
- JSON-LD:
  - Global: `Organization` (con `address` en Benissa, Alicante).
  - Contacto: `LocalBusiness` (`ProfessionalService`).
  - Servicios: `Service` + `FAQPage`.
  - Blog: `Article` + `BreadcrumbList`.
- `sitemap.xml` (integración Astro) y `robots.txt`.
- Breadcrumbs visibles en subpáginas (estilo ruta de terminal: `~ / servicios / desarrollo-web`).
- Un solo `h1` por página; jerarquía de headings correcta.
- Enlazado interno: cada subpágina de servicio enlaza a las otras dos y a proyectos; la home enlaza a todo.
- Imágenes con `alt`, lazy loading fuera del viewport inicial, formatos modernos.
- Objetivo Lighthouse: ≥95 en Performance, Accessibility, Best Practices y SEO en móvil. Sin layout shift en el hero (reserva el alto de las líneas tecleadas).

## Despliegue

- Build estático (`astro build` → `dist/`).
- Servido con **Caddy** en VPS Hetzner (Ubuntu). Genera un `Caddyfile` de ejemplo para `comboilabs.com` y `www` → redirección a apex, con compresión y headers de caché para assets.
- Añade un script `deploy.sh` de ejemplo (build + rsync a `/var/www/comboilabs.com`) con variables comentadas.
- README con instrucciones de desarrollo y despliegue.

## Criterios de aceptación

1. `npm run build` sin errores ni warnings de Astro.
2. La home renderizada es visualmente equivalente al prototipo (desktop y móvil).
3. Todas las rutas de la tabla existen y navegan entre sí; cero enlaces rotos.
4. Animaciones desactivadas correctamente con `prefers-reduced-motion`.
5. Schema validado (sin errores en el validador de schema.org).
6. Ningún dato inventado: los huecos de información real llevan `<!-- TODO -->`.

## Orden de trabajo sugerido

1. Scaffold Astro + tokens + componentes globales (Header, Footer, Seo, CtaBand).
2. Home (migrar prototipo a componentes).
3. Plantilla de servicio + las 3 subpáginas con su copy.
4. Resto de páginas (proyectos, nosotros, contacto, 404, legales).
5. Blog + artículo de ejemplo.
6. SEO técnico (schema, sitemap, robots) + Caddyfile + README.

Ve enseñando el resultado por fases y pregunta antes de tomar decisiones que contradigan este documento.
