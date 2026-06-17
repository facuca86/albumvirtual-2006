// ─────────────────────────────────────────────────────────────────────────────
// Álbum Virtual Panini — FIFA World Cup Germany 2006
// Ver TEMPLATE_GUIDE.md para documentación completa
// ─────────────────────────────────────────────────────────────────────────────

// ── Tipos de equipo ──────────────────────────────────────────────────────────
// Tipo A (19 fig): figurita 1 = foto equipo, figurita 2 = escudo (brillante), 3-19 = jugadores
// Tipo B (18 fig): igual que A pero 3-18 jugadores (solo NED)
// Tipo C (10 fig): figurita 1 = escudo (brillante), figurita 2 = foto equipo, 3-10 = dobles
const _typeCTeams = ['ANG', 'GHA', 'KSA'];
const _teamStickerCounts = { NED: 18, ANG: 10, GHA: 10, KSA: 10 };
const _defaultCount = 19;

const _teamOrder = [
  'GER','CRC','POL','ECU','ENG','PAR','TRI','SWE',
  'ARG','CIV','SCG','NED','MEX','IRN','POR','ANG',
  'GHA','ITA','USA','CZE','BRA','CRO','AUS','JPN',
  'FRA','SUI','KOR','TOG','ESP','UKR','TUN','KSA',
];

// ── Sistema de numeración bidireccional ──────────────────────────────────────
export const codeToNumber = {};
export const numberToCode = {};

// Caso especial: PANINI tiene número '00' fuera del contador
codeToNumber['PANINI'] = '00';
numberToCode['00'] = 'PANINI';

// Contador correlativo del 1 al 596
let _counter = 1;

// INTRO1–INTRO4 (números 1–4)
for (let i = 1; i <= 4; i++) {
  const code = `INTRO${i}`;
  codeToNumber[code] = _counter;
  numberToCode[_counter] = code;
  _counter++;
}

// EST1–EST12 (números 5–16)
for (let i = 1; i <= 12; i++) {
  const code = `EST${i}`;
  codeToNumber[code] = _counter;
  numberToCode[_counter] = code;
  _counter++;
}

// Equipos en orden del álbum (números 17–596)
for (const team of _teamOrder) {
  const count = _teamStickerCounts[team] ?? _defaultCount;
  for (let i = 1; i <= count; i++) {
    const code = `${team}${i}`;
    codeToNumber[code] = _counter;
    numberToCode[_counter] = code;
    _counter++;
  }
}
// _counter === 597 al terminar, numberToCode[596] === 'KSA10'

// ── Figuritas brillantes (37 total) ─────────────────────────────────────────
// INTRO (5): PANINI + INTRO1-4
// Tipo A/B (29): escudo en posición 2
// Tipo C (3): escudo en posición 1
const _typeABTeams = _teamOrder.filter(t => !_typeCTeams.includes(t));
const _brillanteCodes = new Set([
  'PANINI', 'INTRO1', 'INTRO2', 'INTRO3', 'INTRO4',
  ..._typeABTeams.map(t => `${t}2`),
  ..._typeCTeams.map(t => `${t}1`),
]);

export const albumConfig = {

  // ── Identidad ────────────────────────────────────────────────────────────
  id:                 'paniniGermany2006',
  owner:              'Facundo',
  title:              'ÁLBUM VIRTUAL ALEMANIA 2006',
  subtitle:           'FIFA WORLD CUP · GERMANY',
  repetidasSubtitle:  'FIFA World Cup 2006 · Germany',
  exportFileName:     'panini2006_backup.json',

  // ── Conteo ───────────────────────────────────────────────────────────────
  teamStickerCount:   19,
  totalStickers:      597,
  promoCodePrefix:    null,

  // ── Navegación ───────────────────────────────────────────────────────────
  lastSectionCode: 'KSA',

  // ── Brillantes ───────────────────────────────────────────────────────────
  brillanteCodes: _brillanteCodes,

  // ── Equipos con recuento diferente al default ────────────────────────────
  teamStickerCounts: _teamStickerCounts,

  // ── Equipos Tipo C (escudo en posición 1) ────────────────────────────────
  typeCTeams: _typeCTeams,

  // ── Secciones especiales ─────────────────────────────────────────────────
  specialSections: {
    INTRO: {
      count: 5,
      stickers: [
        { code: 'PANINI', label: 'PANINI',              repetidasLabel: 'PANINI', type: 'panini',  horizontal: false },
        { code: 'INTRO1', label: 'Trofeo Copa del Mundo', repetidasLabel: 'INTRO1', type: 'intro',   horizontal: false },
        { code: 'INTRO2', label: 'Mascota',               repetidasLabel: 'INTRO2', type: 'intro',   horizontal: false },
        { code: 'INTRO3', label: 'Emblema Oficial',        repetidasLabel: 'INTRO3', type: 'intro',   horizontal: false },
        { code: 'INTRO4', label: 'Poster',                repetidasLabel: 'INTRO4', type: 'intro',   horizontal: false },
      ],
    },
    ESTADIOS: {
      count: 12,
      stickers: [
        { code: 'EST1',  label: 'Hamburg - FIFA WM-Stadion',          repetidasLabel: 'EST1',  type: 'estadio', horizontal: false },
        { code: 'EST2',  label: 'Hannover - FIFA WM-Stadion',         repetidasLabel: 'EST2',  type: 'estadio', horizontal: false },
        { code: 'EST3',  label: 'Berlin - Olympiastadion',            repetidasLabel: 'EST3',  type: 'estadio', horizontal: false },
        { code: 'EST4',  label: 'Gelsenkirchen - FIFA WM-Stadion',    repetidasLabel: 'EST4',  type: 'estadio', horizontal: false },
        { code: 'EST5',  label: 'Dortmund - FIFA WM-Stadion',         repetidasLabel: 'EST5',  type: 'estadio', horizontal: false },
        { code: 'EST6',  label: 'Leipzig - Zentralstadion',           repetidasLabel: 'EST6',  type: 'estadio', horizontal: false },
        { code: 'EST7',  label: 'Köln - FIFA WM-Stadion',             repetidasLabel: 'EST7',  type: 'estadio', horizontal: false },
        { code: 'EST8',  label: 'Frankfurt - FIFA WM-Stadion',        repetidasLabel: 'EST8',  type: 'estadio', horizontal: false },
        { code: 'EST9',  label: 'Kaiserslautern - Fritz-Walter-Stadion', repetidasLabel: 'EST9',  type: 'estadio', horizontal: false },
        { code: 'EST10', label: 'Nürnberg - Franken-Stadion',         repetidasLabel: 'EST10', type: 'estadio', horizontal: false },
        { code: 'EST11', label: 'Stuttgart - Gottlieb-Daimler-Stadion', repetidasLabel: 'EST11', type: 'estadio', horizontal: false },
        { code: 'EST12', label: 'München - FIFA WM-Stadion',          repetidasLabel: 'EST12', type: 'estadio', horizontal: false },
      ],
    },
  },

  // ── Temas visuales de secciones especiales ────────────────────────────────
  sectionThemes: {
    INTRO:    { themeKey: 'INTRO2006',    solidBg: null,           innerPanel: 'bg-[#03303d]' },
    ESTADIOS: { themeKey: 'ESTADIOS2006', solidBg: 'bg-[#03303d]', innerPanel: 'bg-[#03303d]' },
  },

  // ── Etiquetas en buscador ─────────────────────────────────────────────────
  searchConfig: {
    INTRO:    { teamName: 'Intro',    teamFlag: '🏆' },
    ESTADIOS: { teamName: 'Estadios', teamFlag: '🏟️' },
  },

  // ── Estadísticas ──────────────────────────────────────────────────────────
  statsConfig: [
    { key: 'PANINI',   emoji: '⭐', name: 'PANINI',   fixedCodes: ['PANINI'] },
    { key: 'INTRO',    emoji: '⭐', name: 'INTRO',    fixedCodes: ['INTRO1','INTRO2','INTRO3','INTRO4'] },
    { key: '__TEAMS__' },
    { key: 'ESTADIOS', emoji: '🏟️', name: 'ESTADIOS', fixedCodes: ['EST1','EST2','EST3','EST4','EST5','EST6','EST7','EST8','EST9','EST10','EST11','EST12'] },
  ],

  // ── Equipos competidores (en orden del álbum) ─────────────────────────────
  competingTeams: _teamOrder,

  // ── Datos de todos los equipos ────────────────────────────────────────────
  teamData: {
    INTRO:    { name: 'Intro',     federation: 'Opening Section',           flag: '🏆' },
    ESTADIOS: { name: 'Estadios',  federation: 'Estadios Germany 2006',      flag: '🏟️' },

    GER: { name: 'Alemania',           federation: 'Deutscher Fußball-Bund',                          flag: '🇩🇪' },
    CRC: { name: 'Costa Rica',         federation: 'Federación Costarricense de Fútbol',              flag: '🇨🇷' },
    POL: { name: 'Polonia',            federation: 'Polski Związek Piłki Nożnej',                     flag: '🇵🇱' },
    ECU: { name: 'Ecuador',            federation: 'Federación Ecuatoriana de Fútbol',                flag: '🇪🇨' },
    ENG: { name: 'Inglaterra',         federation: 'The Football Association',                        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    PAR: { name: 'Paraguay',           federation: 'Asociación Paraguaya de Fútbol',                  flag: '🇵🇾' },
    TRI: { name: 'Trinidad y Tobago',  federation: 'Trinidad and Tobago Football Association',        flag: '🇹🇹' },
    SWE: { name: 'Suecia',             federation: 'Svenska Fotbollförbundet',                        flag: '🇸🇪' },
    ARG: { name: 'Argentina',          federation: 'Asociación del Fútbol Argentino',                 flag: '🇦🇷' },
    CIV: { name: 'Costa de Marfil',    federation: 'Fédération Ivoirienne de Football',               flag: '🇨🇮' },
    SCG: { name: 'Serbia y Montenegro',federation: 'Fudbalski savez Srbije i Crne Gore',              flag: '🇷🇸' },
    NED: { name: 'Países Bajos',       federation: 'Koninklijke Nederlandse Voetbalbond',             flag: '🇳🇱' },
    MEX: { name: 'México',             federation: 'Federación Mexicana de Fútbol',                   flag: '🇲🇽' },
    IRN: { name: 'Irán',               federation: 'Football Federation Islamic Republic of Iran',    flag: '🇮🇷' },
    POR: { name: 'Portugal',           federation: 'Federação Portuguesa de Futebol',                 flag: '🇵🇹' },
    ANG: { name: 'Angola',             federation: 'Federação Angolana de Futebol',                   flag: '🇦🇴' },
    GHA: { name: 'Ghana',              federation: 'Ghana Football Association',                       flag: '🇬🇭' },
    ITA: { name: 'Italia',             federation: 'Federazione Italiana Giuoco Calcio',              flag: '🇮🇹' },
    USA: { name: 'Estados Unidos',     federation: 'U.S. Soccer Federation',                          flag: '🇺🇸' },
    CZE: { name: 'República Checa',    federation: 'Fotbalová asociace České republiky',              flag: '🇨🇿' },
    BRA: { name: 'Brasil',             federation: 'Confederação Brasileira de Futebol',              flag: '🇧🇷' },
    CRO: { name: 'Croacia',            federation: 'Hrvatski nogometni savez',                        flag: '🇭🇷' },
    AUS: { name: 'Australia',          federation: 'Football Australia',                               flag: '🇦🇺' },
    JPN: { name: 'Japón',              federation: 'Japan Football Association',                       flag: '🇯🇵' },
    FRA: { name: 'Francia',            federation: 'Fédération Française de Football',                flag: '🇫🇷' },
    SUI: { name: 'Suiza',              federation: 'Schweizerischer Fussballverband',                 flag: '🇨🇭' },
    KOR: { name: 'República de Corea', federation: 'Korea Football Association',                       flag: '🇰🇷' },
    TOG: { name: 'Togo',               federation: 'Fédération Togolaise de Football',                flag: '🇹🇬' },
    ESP: { name: 'España',             federation: 'Real Federación Española de Fútbol',              flag: '🇪🇸' },
    UKR: { name: 'Ucrania',            federation: 'Federación de Fútbol de Ucrania',                 flag: '🇺🇦' },
    TUN: { name: 'Túnez',              federation: 'Fédération Tunisienne de Football',               flag: '🇹🇳' },
    KSA: { name: 'Arabia Saudita',     federation: 'Saudi Arabian Football Federation',               flag: '🇸🇦' },
  },

  // ── Grupos por equipo ─────────────────────────────────────────────────────
  teamGroups: {
    GER: { group:'A', members:['Alemania','Costa Rica','Polonia','Ecuador']              },
    CRC: { group:'A', members:['Alemania','Costa Rica','Polonia','Ecuador']              },
    POL: { group:'A', members:['Alemania','Costa Rica','Polonia','Ecuador']              },
    ECU: { group:'A', members:['Alemania','Costa Rica','Polonia','Ecuador']              },
    ENG: { group:'B', members:['Inglaterra','Paraguay','Trinidad y Tobago','Suecia']     },
    PAR: { group:'B', members:['Inglaterra','Paraguay','Trinidad y Tobago','Suecia']     },
    TRI: { group:'B', members:['Inglaterra','Paraguay','Trinidad y Tobago','Suecia']     },
    SWE: { group:'B', members:['Inglaterra','Paraguay','Trinidad y Tobago','Suecia']     },
    ARG: { group:'C', members:['Argentina','Costa de Marfil','Serbia y Montenegro','Países Bajos'] },
    CIV: { group:'C', members:['Argentina','Costa de Marfil','Serbia y Montenegro','Países Bajos'] },
    SCG: { group:'C', members:['Argentina','Costa de Marfil','Serbia y Montenegro','Países Bajos'] },
    NED: { group:'C', members:['Argentina','Costa de Marfil','Serbia y Montenegro','Países Bajos'] },
    MEX: { group:'D', members:['México','Irán','Portugal','Angola']                      },
    IRN: { group:'D', members:['México','Irán','Portugal','Angola']                      },
    POR: { group:'D', members:['México','Irán','Portugal','Angola']                      },
    ANG: { group:'D', members:['México','Irán','Portugal','Angola']                      },
    ITA: { group:'E', members:['Italia','Ghana','Estados Unidos','República Checa']      },
    GHA: { group:'E', members:['Italia','Ghana','Estados Unidos','República Checa']      },
    USA: { group:'E', members:['Italia','Ghana','Estados Unidos','República Checa']      },
    CZE: { group:'E', members:['Italia','Ghana','Estados Unidos','República Checa']      },
    BRA: { group:'F', members:['Brasil','Croacia','Australia','Japón']                   },
    CRO: { group:'F', members:['Brasil','Croacia','Australia','Japón']                   },
    AUS: { group:'F', members:['Brasil','Croacia','Australia','Japón']                   },
    JPN: { group:'F', members:['Brasil','Croacia','Australia','Japón']                   },
    FRA: { group:'G', members:['Francia','Suiza','República de Corea','Togo']            },
    SUI: { group:'G', members:['Francia','Suiza','República de Corea','Togo']            },
    KOR: { group:'G', members:['Francia','Suiza','República de Corea','Togo']            },
    TOG: { group:'G', members:['Francia','Suiza','República de Corea','Togo']            },
    ESP: { group:'H', members:['España','Ucrania','Túnez','Arabia Saudita']              },
    UKR: { group:'H', members:['España','Ucrania','Túnez','Arabia Saudita']              },
    TUN: { group:'H', members:['España','Ucrania','Túnez','Arabia Saudita']              },
    KSA: { group:'H', members:['España','Ucrania','Túnez','Arabia Saudita']              },
  },

  // ── Grupos del torneo ─────────────────────────────────────────────────────
  groups: {
    A: { color: '#3B82F6', teams: ['GER','CRC','POL','ECU'] },
    B: { color: '#EF4444', teams: ['ENG','PAR','TRI','SWE'] },
    C: { color: '#8B5CF6', teams: ['ARG','CIV','SCG','NED'] },
    D: { color: '#10B981', teams: ['MEX','IRN','POR','ANG'] },
    E: { color: '#F59E0B', teams: ['ITA','GHA','USA','CZE'] },
    F: { color: '#EC4899', teams: ['BRA','CRO','AUS','JPN'] },
    G: { color: '#6366F1', teams: ['FRA','SUI','KOR','TOG'] },
    H: { color: '#F97316', teams: ['ESP','UKR','TUN','KSA'] },
  },

};

// Orden completo de navegación del álbum
albumConfig.teams = [
  'INTRO', 'ESTADIOS',
  ...albumConfig.competingTeams,
];

// ── Paleta general del álbum ─────────────────────────────────────────────────
export const albumPalette = {
  name:        'Alemania 2006',
  primary:     '#0A839C',
  secondary:   '#ffffff',
  accent:      '#066F88',
  headerBg:    '#ffffff',
  headerBgDark:'#05475a',
  darkBase:    '#03303d',
  darkCard:    '#065a70',
  text:        '#1e293b',
  textDark:    '#ffffff',
};
