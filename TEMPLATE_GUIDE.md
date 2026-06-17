# TEMPLATE GUIDE — Álbum Virtual Panini Alemania 2006

Este documento explica la arquitectura del proyecto y los pasos para crear un álbum virtual de un nuevo torneo a partir de este repositorio.

**Este repositorio es el proyecto del álbum del Mundial Alemania 2006.**
Al clonar para un nuevo torneo, trabajar siempre sobre el repositorio nuevo. Nunca modificar este.

---

## Sección 1: Estructura del proyecto

El proyecto está compuesto por 6 archivos en la raíz:

| Archivo | Rol |
|---|---|
| `albumConfig_GER2006.js` | Configuración central: id, título, equipos, secciones, grupos, estadísticas, paleta, diccionarios de numeración |
| `playerNames_GER2006.js` | Nombres de jugadores por equipo (clave de equipo → array 0-indexado de etiquetas) |
| `teamThemes_GER2006.js` | Gradientes visuales por equipo usando clases Tailwind |
| `firebase_GER2006.js` | Configuración de Firebase y funciones de lectura/escritura del progreso |
| `panini_virtual_album_ger2006_app.jsx` | Componente React principal — toda la UI y lógica del álbum |
| `index.html` | Punto de entrada HTML — carga los scripts y define el título de la página |

Los archivos con sufijo `_GER2006` son la implementación concreta del Mundial Alemania 2006.
Al clonar el repositorio para un nuevo torneo, crear equivalentes con el sufijo del nuevo torneo
(ej: `albumConfig_EURO2028.js`, `playerNames_EURO2028.js`, etc.).

---

## Sección 2: Tres tipos de equipo y recuento de figuritas

Este álbum implementa tres tipos de sección de equipo con distinta cantidad de figuritas:

### Tipo A — estándar (19 figuritas)

La gran mayoría de los 32 equipos. Posición 1 = Equipo, posición 2 = Escudo (brillante).
Labels en `playerNames_GER2006.js`: `['Equipo', 'Escudo', jugador3, jugador4, ...]` (19 elementos).

### Tipo B — reducido (18 figuritas)

Solo un equipo: **NED** (Países Bajos). Misma estructura que Tipo A pero con 18 figuritas.
Labels en `playerNames_GER2006.js`: array de 18 elementos.

### Tipo C — corto (10 figuritas)

Tres equipos: **ANG**, **GHA**, **KSA**. Posición 1 = Escudo (brillante), posición 2 = Equipo.
Labels en `playerNames_GER2006.js`: `['Escudo', 'Equipo', 'jugador1 / jugador2', ...]` (10 elementos).
Los jugadores se presentan en parejas con separador `/`.

### Resumen de recuentos

| Tipo | Equipos | Figuritas/equipo |
|---|---|---|
| A | 28 equipos (todos excepto NED, ANG, GHA, KSA) | 19 |
| B | NED | 18 |
| C | ANG, GHA, KSA | 10 |

Total de figuritas de equipos: 28×19 + 18 + 3×10 = 532 + 18 + 30 = **580**
Total del álbum: 1 (PANINI) + 4 (INTRO) + 12 (ESTADIOS) + 580 = **597**

---

## Sección 3: El sistema de numeración bidireccional

Las figuritas tienen un código interno por equipo (`GER1`, `ARG5`) pero el usuario ve
un número correlativo único en todo el álbum (del 1 al 596, más el PANINI como `00`).

Se implementa en `albumConfig_GER2006.js` con dos diccionarios bidireccionales:

```js
export const codeToNumber = { 'PANINI': '00' }; // "GER1" → 17
export const numberToCode = {};                   // 17 → "GER1"

let counter = 1;
// INTRO1-4
// EST1-12
// luego equipos en el orden del album
for (const team of albumConfig.teams) {
  const count = albumConfig.teamStickerCounts?.[team] ?? albumConfig.teamStickerCount;
  for (let i = 1; i <= count; i++) {
    const code = `${team}${i}`;
    codeToNumber[code] = counter;
    numberToCode[counter] = code;
    counter++;
  }
}
```

Puntos de control del orden del álbum:
- `PANINI` → `'00'`
- `INTRO1` → `1`, `INTRO4` → `4`
- `EST1` → `5`, `EST12` → `16`
- `GER1` → `17`, `GER19` → `35`
- `CRC1` → `36`, `CRC19` → `54`
- `ANG1` → `301`, `ANG10` → `310`
- `KSA1` → `587`, `KSA10` → `596`

### Uso en el componente `Sticker`

```jsx
// Número visible en lugar del código interno:
const visibleNum = codeToNumber[sticker.code];
// Mostrar: "#17" para GER1, "00" para PANINI
```

### Búsqueda por número

```js
// En searchResults, antes del filtro de texto:
if (query === '00') { /* buscar PANINI */ }
else if (/^\d+$/.test(query)) {
  const code = numberToCode[parseInt(query)];
  if (code) { /* buscar ese code */ }
}
```

---

## Sección 4: Pasos para clonar a un nuevo torneo

1. **Crear nuevo repositorio** en GitHub a partir de este — no modificar este repositorio.

2. **Crear los 5 archivos con el sufijo del nuevo torneo** en el nuevo repositorio
   (ej: `_EURO2028`). Copiar el contenido de los archivos `_GER2006` como punto de partida.

3. **En `albumConfig_*.js`**:
   - Actualizar `id` (debe ser único por álbum — ver Sección 5)
   - Actualizar `title`, `subtitle`, `totalStickers`, `teamStickerCount`
   - Actualizar la lista de `teams`, los grupos en `groups` y `teamGroups`
   - Actualizar `teamStickerCounts` para equipos con recuentos no estándar
   - Actualizar `typeCTeams` con los equipos de tipo C (escudo en posición 1)
   - Actualizar `brillanteCodes` con los códigos de figuritas brillantes/foil
   - Actualizar las `specialSections` para las secciones del nuevo torneo
   - Actualizar `albumPalette` con los colores del nuevo torneo (ver Sección 6)
   - Regenerar los diccionarios `codeToNumber`/`numberToCode` al final del archivo

4. **En `playerNames_*.js`**: los arrays son 0-indexados.
   - Tipo A/B: `['Equipo', 'Escudo', jugador3, ...]`
   - Tipo C: `['Escudo', 'Equipo', 'jugador1 / jugador2', ...]`
   - La longitud del array debe coincidir con el recuento de figuritas del equipo.

5. **En `teamThemes_*.js`**: definir gradientes con colores institucionales de cada equipo.
   Usar clases Tailwind `from-`, `via-`, `to-`. Agregar `dark: true` cuando el texto sobre ese
   fondo deba ser claro (blanco).

6. **En `firebase_*.js`**: actualizar `firebaseConfig` con las credenciales del nuevo proyecto
   Firebase. El nombre en `initializeApp(config, 'nombre-unico')` debe ser único entre todos los álbumes.

7. **En `panini_virtual_album_*_app.jsx`**: cambiar **solo los 5 imports** del tope del archivo
   para apuntar a los nuevos archivos con el sufijo del torneo.

8. **En `index.html`**: actualizar las referencias a los nuevos archivos, el `<title>`, y verificar
   que el preset de Babel use `[['react', { runtime: 'classic' }], 'typescript']`.

9. **Habilitar GitHub Pages** en el nuevo repositorio (Settings → Pages → rama `main`, carpeta `/`).

10. **Agregar el nuevo álbum** a la vista "Otros Proyectos" en todos los repositorios existentes
    siguiendo el procedimiento documentado en la Sección 8.

---

## Sección 5: El campo `id` y Firebase

El campo `id` dentro de `albumConfig` es **la decisión de diseño más importante** al crear un álbum.

```js
export const albumConfig = {
  id: 'paniniGermany2006',  // clave usada en localStorage y Firestore
  ...
};
```

- Es la clave con la que se escribe en Firestore: `doc(db, 'albumProgress', albumConfig.id)`
- **Debe ser único por álbum** — permite compartir el mismo proyecto Firebase entre todos los
  álbumes sin ninguna colisión de datos.
- La estructura resultante en Firestore queda así:

```
albumProgress/
  ├── paniniWorldCup2026
  ├── paniniWorldCup2022
  ├── paniniCWC2025
  └── paniniGermany2006
```

- El fallback `localStorage → Firestore` garantiza que el progreso nunca se pierde aunque
  Firebase no esté configurado todavía. Ideal para desarrollo y pruebas locales.

---

## Sección 6: Paleta general del álbum

Cada `albumConfig_*.js` exporta una constante `albumPalette` con la identidad visual del álbum:

```js
export const albumPalette = {
  name: 'Alemania 2006',
  primary:       '#0A839C',  // cyan — fondo general de la app
  secondary:     '#ffffff',  // blanco — texto y acentos
  accent:        '#066F88',  // cyan oscuro — highlights
  headerBgDark:  '#05475a',  // fondo del header en modo oscuro
  darkBase:      '#03303d',  // fondo general en modo oscuro
  darkCard:      '#065a70',  // fondo de cards en modo oscuro
};
```

- Es el **lugar canónico** donde definir la identidad visual dominante del álbum.
- Al clonar, actualizar sus valores y reemplazar los equivalentes hardcodeados en el JSX.

### Ejemplos de referencia por torneo

| Torneo | `primary` | `accent` | Notas |
|---|---|---|---|
| Alemania 2006 | `#0A839C` cyan/teal | `#066F88` cyan oscuro | Identidad FIFA Alemania 2006 |
| Qatar 2022 | `#7B1010` vinotinto | `#FFD700` dorado brillante | Identidad oficial Qatar |
| CWC 2025 | `#000000` negro | `#B8860B` dorado oscuro | Estética premium oscura |
| Mundial 2026 | multicolor | gradiente | Identidad multicolor USA-CAN-MEX |

---

## Sección 7: Decisiones de diseño a respetar

Estas decisiones no son obvias y deben mantenerse en cualquier nuevo álbum:

- **`lastSectionCode`** define qué sección cierra el álbum. El botón "siguiente" desde esa
  sección vuelve a HOME. Siempre debe apuntar a la última sección de navegación.

- **`specialSections`** permiten figuritas que no siguen el patrón estándar. En este álbum:
  - `INTRO`: 5 figuritas individuales (PANINI + INTRO1–INTRO4), `horizontal: false`
  - `ESTADIOS`: 12 figuritas individuales (EST1–EST12), `horizontal: false`, grid de 3 columnas

- **Brillante (foil)**: las figuritas brillantes se identifican por código en un `Set`.
  El total para este álbum es exactamente **37** brillantes:
  - 5 de INTRO (PANINI + INTRO1–INTRO4)
  - 29 escudos de Tipo A/B (posición 2 de cada equipo)
  - 3 escudos de Tipo C (posición 1 de ANG, GHA, KSA)

- **Babel classic runtime**: el `index.html` **debe** usar
  `presets: [['react', { runtime: 'classic' }], 'typescript']`.
  El JSX principal **debe** comenzar con `import React from 'react'`.
  Sin esto, Babel genera código que intenta importar `react/jsx-runtime` y falla en browser.

- **`promoCodePrefix: null`**: este álbum no tiene secciones promocionales. El conteo visible
  incluye todas las figuritas sin exclusión.

- Los **gradientes** en `teamThemes_*.js` usan clases Tailwind `from-`, `via-`, `to-`.
  La propiedad `dark: true` indica que el texto sobre ese fondo debe ser claro (blanco).

- El **fallback localStorage → Firestore** es intencional. No eliminar.

---

## Sección 8: Cómo agregar un nuevo álbum a la vista "Otros Proyectos"

Cada álbum tiene un menú de navegación entre proyectos que lista los demás álbumes disponibles.
Cada vez que se crea un nuevo álbum, este procedimiento debe aplicarse en **todos** los repositorios existentes.

### Estructura del array `PROYECTOS`

El array vive en el JSX principal (`panini_virtual_album_*_app.jsx`):

```js
const PROYECTOS = [
  {
    id: 'paniniWorldCup2026',
    label: 'Mundial 2026',
    url: 'https://facuca86.github.io/albumvirtual/',
    style: 'multicolor',
  },
  {
    id: 'paniniWorldCup2022',
    label: 'Mundial 2022 · Qatar',
    url: 'https://facuca86.github.io/albumvirtual-2022/',
    style: 'qatar',
  },
  {
    id: 'paniniCWC2025',
    label: 'Club World Cup 2025',
    url: 'https://facuca86.github.io/albumvirtual-cwc25/',
    style: 'cwc',
  },
  {
    id: 'paniniGermany2006',
    label: 'Mundial 2006 · Alemania',
    url: 'https://facuca86.github.io/albumvirtual-2006/',
    style: 'germany2006',
  },
];
```

### Reglas de visibilidad y estilos

- El álbum actual se detecta comparando `proyecto.id` con `albumConfig.id` — el proyecto
  actual **no se muestra** en la lista.
- Los botones navegan en la misma pestaña: `onClick={() => { window.location.href = proyecto.url; }}`

| `style` | Estilos aplicados |
|---|---|
| `multicolor` | `background: linear-gradient(135deg, #e53e3e, #dd6b20, #d69e2e, #38a169, #3182ce, #805ad5)`, texto blanco |
| `qatar` | `backgroundColor: '#6B0F1A'`, `border: '2px solid #B8860B'`, texto blanco |
| `cwc` | `backgroundColor: '#000000'`, `border: '2px solid #B8860B'`, texto dorado (`text-yellow-400`) |
| `germany2006` | `backgroundColor: '#0A839C'`, `border: '2px solid #ffffff'`, texto blanco |

### Pasos para agregar un nuevo álbum

1. Agregar una nueva entrada al array `PROYECTOS` en el JSX de **cada repositorio existente**.
2. Definir el estilo visual del nuevo álbum y agregarlo al bloque condicional de estilos del componente.
3. El nuevo repositorio ya trae el array `PROYECTOS` actualizado desde su creación (fue clonado con la versión más reciente).
4. Crear un pull request en cada repositorio con título `feat: agregar [nombre álbum] a otros proyectos`.
