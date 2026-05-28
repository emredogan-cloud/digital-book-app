/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — HARİTA
 *  Aydınlatılmış el yazması atlası. SVG, koleksiyonluk hissi.
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_HARITA = {

  baslik: "Mendîran Atlası",
  altBaslik: "Beş Kıta, Altı Çapa Hisarı, Bir Söylenmemiş Ad",

  acilis: `
    Mendîran’ın bilinen yüzeyinin bir kayıtıdır bu sayfa. Bilinmeyen
    iki şey, kasten dışarıda bırakıldı: Sahesh kervan yolları
    (yazılmayan yollar, Sahesh’in kuralıdır) ve Hisn-i Sahr’ın
    bugünkü hâli (söylenmemiş bir ad, çizilmeyen bir yer).
  `,

  // SVG embedded inline — illuminated manuscript style
  svg: `
<svg viewBox="0 0 1000 720" xmlns="http://www.w3.org/2000/svg" aria-labelledby="map-title" role="img" class="harita__svg">
  <title id="map-title">Mendîran Diyarının Aydınlatılmış Atlası</title>

  <defs>
    <radialGradient id="parchment" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#f0e1ba"/>
      <stop offset="70%" stop-color="#dcc89a"/>
      <stop offset="100%" stop-color="#9c8358"/>
    </radialGradient>
    <radialGradient id="sea" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a3a55" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0e1a30" stop-opacity="0.95"/>
    </radialGradient>
    <linearGradient id="goldInk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c69a40"/>
      <stop offset="100%" stop-color="#7a5a18"/>
    </linearGradient>
    <linearGradient id="seaBorder" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5a4a28" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#8a6f2c" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#5a4a28" stop-opacity="0.3"/>
    </linearGradient>
    <pattern id="stipple" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.4" fill="#7a5a18" opacity="0.35"/>
      <circle cx="5" cy="4" r="0.3" fill="#7a5a18" opacity="0.25"/>
    </pattern>
    <pattern id="waves" x="0" y="0" width="40" height="14" patternUnits="userSpaceOnUse">
      <path d="M0 7 q10 -5 20 0 t20 0" fill="none" stroke="#8aa5c5" stroke-width="0.5" opacity="0.35"/>
    </pattern>
    <pattern id="forest" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
      <path d="M7 11 l3 -5 l-6 0 z" fill="#3a5a3c" opacity="0.4"/>
      <circle cx="7" cy="6" r="1.2" fill="#3a5a3c" opacity="0.45"/>
    </pattern>
    <pattern id="desert" x="0" y="0" width="22" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 10 q5 -4 11 0 t11 0" fill="none" stroke="#9c7a3a" stroke-width="0.5" opacity="0.55"/>
    </pattern>
    <pattern id="mountain" x="0" y="0" width="22" height="14" patternUnits="userSpaceOnUse">
      <path d="M2 12 l6 -10 l4 6 l4 -4 l4 8 z" fill="#6a5230" stroke="#5a4220" stroke-width="0.4" opacity="0.55"/>
    </pattern>
    <pattern id="cracked" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M0 50 q25 -10 50 0 t50 0" fill="none" stroke="#7a5a18" stroke-width="0.3" opacity="0.18"/>
      <path d="M50 0 q-10 25 0 50 t0 50" fill="none" stroke="#7a5a18" stroke-width="0.3" opacity="0.15"/>
    </pattern>
  </defs>

  <!-- Parşömen arkaplanı -->
  <rect width="1000" height="720" fill="url(#parchment)"/>
  <rect width="1000" height="720" fill="url(#cracked)"/>

  <!-- Eski-yazma kenar lekeleri -->
  <ellipse cx="50" cy="60" rx="40" ry="22" fill="#6a4f24" opacity="0.13"/>
  <ellipse cx="950" cy="680" rx="60" ry="28" fill="#6a4f24" opacity="0.13"/>
  <ellipse cx="900" cy="50" rx="25" ry="18" fill="#6a4f24" opacity="0.09"/>
  <ellipse cx="80" cy="660" rx="35" ry="20" fill="#6a4f24" opacity="0.10"/>

  <!-- ─── DIŞ DENİZ ─── -->
  <rect x="40" y="40" width="920" height="640" fill="url(#sea)" rx="3"/>
  <rect x="40" y="40" width="920" height="640" fill="url(#waves)" rx="3"/>

  <!-- Dış kenar çerçevesi (illuminated manuscript) -->
  <rect x="20" y="20" width="960" height="680" fill="none" stroke="url(#goldInk)" stroke-width="1.2" rx="2"/>
  <rect x="28" y="28" width="944" height="664" fill="none" stroke="#7a5a18" stroke-width="0.5" opacity="0.6" rx="1"/>

  <!-- ─── ASFÂREND (doğu) ─── -->
  <path d="M 540 130
           Q 660 110, 760 150
           Q 870 200, 880 320
           Q 890 440, 800 510
           Q 700 580, 600 560
           Q 520 540, 510 460
           Q 500 350, 510 250
           Q 520 170, 540 130 Z"
        fill="url(#parchment)" stroke="#5a3a18" stroke-width="1.6" opacity="0.95"/>
  <path d="M 540 130 Q 660 110, 760 150 Q 870 200, 880 320 Q 890 440, 800 510 Q 700 580, 600 560 Q 520 540, 510 460 Q 500 350, 510 250 Q 520 170, 540 130 Z" fill="url(#stipple)" opacity="0.4"/>

  <!-- Dağ omurgası (Asfârend kuzeyi) -->
  <rect x="600" y="140" width="200" height="50" fill="url(#mountain)" opacity="0.7"/>

  <!-- ─── VEYRAHAL (batı) ─── -->
  <path d="M 100 200
           Q 80 150, 130 130
           Q 200 120, 270 150
           Q 340 180, 350 270
           Q 360 360, 320 430
           Q 250 480, 170 470
           Q 100 450, 90 360
           Q 80 270, 100 200 Z"
        fill="url(#parchment)" stroke="#5a3a18" stroke-width="1.6"/>
  <path d="M 100 200 Q 80 150, 130 130 Q 200 120, 270 150 Q 340 180, 350 270 Q 360 360, 320 430 Q 250 480, 170 470 Q 100 450, 90 360 Q 80 270, 100 200 Z" fill="url(#forest)" opacity="0.75"/>

  <!-- ─── KORSEND (güney çöl) ─── -->
  <path d="M 280 540
           Q 250 510, 280 480
           Q 380 470, 480 480
           Q 580 490, 620 540
           Q 640 600, 570 630
           Q 460 640, 360 630
           Q 280 620, 280 540 Z"
        fill="url(#parchment)" stroke="#5a3a18" stroke-width="1.6"/>
  <path d="M 280 540 Q 250 510, 280 480 Q 380 470, 480 480 Q 580 490, 620 540 Q 640 600, 570 630 Q 460 640, 360 630 Q 280 620, 280 540 Z" fill="url(#desert)" opacity="0.8"/>

  <!-- ─── TÂHGÂR (kuzey buz) ─── -->
  <path d="M 250 80
           Q 350 60, 480 70
           Q 590 80, 580 130
           Q 570 175, 470 180
           Q 360 185, 270 170
           Q 220 155, 230 110
           Q 240 85, 250 80 Z"
        fill="#dadfe5" stroke="#5a6878" stroke-width="1.6"/>
  <path d="M 250 80 Q 350 60, 480 70 Q 590 80, 580 130 Q 570 175, 470 180 Q 360 185, 270 170 Q 220 155, 230 110 Q 240 85, 250 80 Z" fill="url(#mountain)" opacity="0.45"/>

  <!-- ─── VELEMÂR (deniz krallığı — adalar) ─── -->
  <g stroke="#5a3a18" stroke-width="1.2" fill="url(#parchment)">
    <ellipse cx="755" cy="600" rx="38" ry="18"/>
    <ellipse cx="830" cy="565" rx="22" ry="13"/>
    <ellipse cx="700" cy="640" rx="25" ry="11"/>
    <ellipse cx="880" cy="600" rx="18" ry="10"/>
    <ellipse cx="820" cy="640" rx="14" ry="8"/>
    <ellipse cx="770" cy="660" rx="12" ry="6"/>
    <ellipse cx="735" cy="555" rx="15" ry="8"/>
  </g>

  <!-- ─── VEHDÂR (yer altı — kesik çizgili) ─── -->
  <g fill="none" stroke="#5a3a18" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.55">
    <path d="M 400 300 Q 470 380, 540 380 Q 600 380, 660 360 Q 720 320, 740 280"/>
    <ellipse cx="540" cy="380" rx="38" ry="14"/>
  </g>
  <text x="540" y="395" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#5a3a18" font-style="italic" opacity="0.7">— yer altı —</text>

  <!-- ─── ÇAPA HİSARLARI ─── -->
  <!-- Hisn-i Sevra (kuzey Asfârend; aktif çatlak) -->
  <g transform="translate(680 215)">
    <circle r="9" fill="#7a1f1f" stroke="#3a0808" stroke-width="0.8"/>
    <path d="M 0 -9 L 2 -3 L 8 -3 L 3 1 L 5 7 L 0 4 L -5 7 L -3 1 L -8 -3 L -2 -3 Z" fill="#c69a40"/>
    <text x="0" y="22" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#3a0808" font-weight="600">HİSN-İ SEVRA</text>
    <text x="0" y="32" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8" fill="#5a1818" font-style="italic">çatlak</text>
  </g>

  <!-- Hisn-i Vehd -->
  <g transform="translate(560 380)">
    <circle r="6" fill="none" stroke="#7a5a18" stroke-width="1.1"/>
    <circle r="2" fill="#7a5a18"/>
    <text x="0" y="-12" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#3a2a08">HİSN-İ VEHD</text>
  </g>

  <!-- Hisn-i Mahn -->
  <g transform="translate(165 350)">
    <circle r="6" fill="none" stroke="#7a5a18" stroke-width="1.1"/>
    <circle r="2" fill="#7a5a18"/>
    <text x="0" y="-12" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#3a2a08">HİSN-İ MAHN</text>
  </g>

  <!-- Hisn-i Tahg -->
  <g transform="translate(400 125)">
    <circle r="6" fill="none" stroke="#7a5a18" stroke-width="1.1"/>
    <circle r="2" fill="#7a5a18"/>
    <text x="0" y="-12" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#3a2a08">HİSN-İ TAHG</text>
  </g>

  <!-- Hisn-i Velm -->
  <g transform="translate(810 580)">
    <circle r="6" fill="none" stroke="#7a5a18" stroke-width="1.1"/>
    <circle r="2" fill="#7a5a18"/>
    <text x="0" y="-12" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#3a2a08">HİSN-İ VELM</text>
  </g>

  <!-- Hisn-i Sahr (kayıp — sadece taslak, eksik bir çember) -->
  <g transform="translate(440 560)">
    <path d="M -7 0 a 7 7 0 1 1 14 0" fill="none" stroke="#7a5a18" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>
    <text x="0" y="-14" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#5a4220" font-style="italic" opacity="0.7">— hisn-i sahr —</text>
    <text x="0" y="20" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="7" fill="#5a4220" font-style="italic" opacity="0.65">VS 901: boş</text>
  </g>

  <!-- ─── BAŞKENTLER ─── -->
  <!-- Vâris -->
  <g transform="translate(640 340)">
    <rect x="-3" y="-3" width="6" height="6" fill="#3a0a0a" stroke="#c69a40" stroke-width="0.8"/>
    <text x="0" y="-9" text-anchor="middle" font-family="Cinzel, serif" font-size="11" fill="#1c1410" font-weight="600">VÂRİS</text>
    <text x="0" y="13" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8" fill="#3a2a1d" font-style="italic">naerath başkenti</text>
  </g>

  <!-- Asmeyra-Vehd (Veyrahal başkenti) -->
  <g transform="translate(210 310)">
    <rect x="-3" y="-3" width="6" height="6" fill="#2a4a32" stroke="#c69a40" stroke-width="0.8"/>
    <text x="0" y="-9" text-anchor="middle" font-family="Cinzel, serif" font-size="10" fill="#1c1410" font-weight="600">ASMEYRA-VEHD</text>
  </g>

  <!-- Saraab-ı Vehd (Korsend başkenti) -->
  <g transform="translate(440 555)">
    <rect x="-3" y="-3" width="6" height="6" fill="#8a4a1f" stroke="#c69a40" stroke-width="0.8"/>
    <text x="0" y="-25" text-anchor="middle" font-family="Cinzel, serif" font-size="10" fill="#1c1410" font-weight="600">SARAAB-I VEHD</text>
  </g>

  <!-- Brennvar-Hân -->
  <g transform="translate(415 130)">
    <rect x="-3" y="-3" width="6" height="6" fill="#3a4a5a" stroke="#c69a40" stroke-width="0.8"/>
    <text x="0" y="-9" text-anchor="middle" font-family="Cinzel, serif" font-size="10" fill="#1c1410" font-weight="600">BRENNVAR-HÂN</text>
  </g>

  <!-- İncî Tahtı (Velemâr başkenti) -->
  <g transform="translate(755 600)">
    <rect x="-3" y="-3" width="6" height="6" fill="#1c3a5c" stroke="#c69a40" stroke-width="0.8"/>
    <text x="0" y="-9" text-anchor="middle" font-family="Cinzel, serif" font-size="10" fill="#1c1410" font-weight="600">İNCÎ TAHTI</text>
  </g>

  <!-- Kûz-i Vehd (yer altı) -->
  <g transform="translate(540 380)">
    <rect x="-3" y="-3" width="6" height="6" fill="#3a2a3a" stroke="#c69a40" stroke-width="0.8" opacity="0.85"/>
    <text x="0" y="-25" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#1c1410" font-weight="600" opacity="0.85">KÛZ-İ VEHD</text>
    <text x="0" y="-15" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="7" fill="#3a2a1d" font-style="italic" opacity="0.7">(yer altı)</text>
  </g>

  <!-- ─── KÜLTÜREL/COĞRAFI YERLER ─── -->
  <!-- Susuz Çayır -->
  <g transform="translate(280 380)">
    <circle r="3" fill="none" stroke="#6a4f24" stroke-width="0.7" stroke-dasharray="1 2"/>
    <text x="0" y="-7" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8" fill="#5a4220" font-style="italic">susuz çayır</text>
  </g>

  <!-- Sâkin Vadi -->
  <g transform="translate(610 240)">
    <circle r="2.5" fill="#6a4f24"/>
    <text x="0" y="-6" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="7" fill="#5a4220" font-style="italic">sâkin vadi</text>
  </g>

  <!-- Cam Mahzeni (Saraab altında) -->
  <g transform="translate(430 575)">
    <text x="0" y="0" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="6" fill="#5a4220" font-style="italic" opacity="0.7">cam mahzeni ↓</text>
  </g>

  <!-- ─── KIT'A ETİKETLERİ ─── -->
  <text x="690" y="345" text-anchor="middle" font-family="UnifrakturMaguntia, Cinzel, serif" font-size="32" fill="#5a3a10" opacity="0.55" letter-spacing="6">ASFÂREND</text>
  <text x="220" y="285" text-anchor="middle" font-family="UnifrakturMaguntia, Cinzel, serif" font-size="26" fill="#2a4a2a" opacity="0.55" letter-spacing="4">VEYRAHAL</text>
  <text x="450" y="585" text-anchor="middle" font-family="UnifrakturMaguntia, Cinzel, serif" font-size="24" fill="#7a4218" opacity="0.5" letter-spacing="4">KORSEND</text>
  <text x="410" y="118" text-anchor="middle" font-family="UnifrakturMaguntia, Cinzel, serif" font-size="22" fill="#3a4858" opacity="0.55" letter-spacing="4">TÂHGÂR</text>
  <text x="780" y="525" text-anchor="middle" font-family="UnifrakturMaguntia, Cinzel, serif" font-size="20" fill="#1c3a5c" opacity="0.6" letter-spacing="4">VELEMÂR</text>

  <!-- ─── KERVAN / DENİZ YOLLARI ─── -->
  <!-- Korsend → Vâris (Ardenya'nın yolu) -->
  <path d="M 440 555 Q 540 470, 640 340" fill="none" stroke="#8a4a1f" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.55"/>
  <!-- Sâkin Vadi → Vâris (Vellan) -->
  <path d="M 610 240 Q 625 285, 640 340" fill="none" stroke="#6a4f24" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5"/>
  <!-- Asmeyra-Vehd → Vâris (Brennar) -->
  <path d="M 210 310 Q 410 290, 640 340" fill="none" stroke="#2a4a32" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5"/>
  <!-- Brennvar-Hân → Vâris (Hossen) -->
  <path d="M 415 130 Q 540 230, 640 340" fill="none" stroke="#3a4a5a" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5"/>
  <!-- İncî Tahtı → Vâris (Velemâr ticaret yolu) -->
  <path d="M 755 600 Q 700 470, 640 340" fill="none" stroke="#1c3a5c" stroke-width="0.8" stroke-dasharray="2 4" opacity="0.45"/>
  <!-- Vâris → Hisn-i Sevra (Perde III yolculuğu) -->
  <path d="M 640 340 Q 660 280, 680 215" fill="none" stroke="#7a1f1f" stroke-width="1.2" opacity="0.7"/>

  <!-- ─── PUSULA ─── -->
  <g transform="translate(75 110)">
    <circle r="32" fill="none" stroke="#7a5a18" stroke-width="0.7"/>
    <circle r="26" fill="none" stroke="#7a5a18" stroke-width="0.4"/>
    <path d="M 0 -28 L 4 -6 L 0 0 L -4 -6 Z" fill="#5a3a10"/>
    <path d="M 0 28 L 4 6 L 0 0 L -4 6 Z" fill="#7a5a18"/>
    <path d="M -28 0 L -6 4 L 0 0 L -6 -4 Z" fill="#8a6f2c" opacity="0.7"/>
    <path d="M 28 0 L 6 4 L 0 0 L 6 -4 Z" fill="#8a6f2c" opacity="0.7"/>
    <circle r="2.5" fill="#5a3a10"/>
    <text y="-36" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#3a2a08">K</text>
    <text y="44" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#3a2a08">G</text>
    <text x="-38" y="3" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#3a2a08">B</text>
    <text x="38" y="3" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#3a2a08">D</text>
  </g>

  <!-- ─── ÖLÇEK ÇUBUĞU ─── -->
  <g transform="translate(820 100)">
    <line x1="0" y1="0" x2="80" y2="0" stroke="#5a3a10" stroke-width="1"/>
    <line x1="0" y1="-3" x2="0" y2="3" stroke="#5a3a10" stroke-width="1"/>
    <line x1="40" y1="-2" x2="40" y2="2" stroke="#5a3a10" stroke-width="1"/>
    <line x1="80" y1="-3" x2="80" y2="3" stroke="#5a3a10" stroke-width="1"/>
    <text x="40" y="-7" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#3a2a08">300 sevr</text>
    <text x="40" y="14" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="7" fill="#5a4220" font-style="italic">(yaklaşık on günlük kervan yolu)</text>
  </g>

  <!-- ─── EFSANE / LEGEND ─── -->
  <g transform="translate(50 580)">
    <rect x="0" y="0" width="240" height="115" fill="#e8d4a8" stroke="#7a5a18" stroke-width="0.6" opacity="0.92" rx="2"/>
    <text x="120" y="14" text-anchor="middle" font-family="Cinzel, serif" font-size="9" fill="#3a2a08" font-weight="600" letter-spacing="2">EFSÂNE</text>

    <rect x="14" y="22" width="6" height="6" fill="#3a0a0a" stroke="#c69a40" stroke-width="0.5"/>
    <text x="28" y="28" font-family="Cormorant Garamond, serif" font-size="9" fill="#3a2a08">başkent</text>

    <circle cx="17" cy="40" r="5" fill="#7a1f1f" stroke="#3a0808" stroke-width="0.5"/>
    <text x="28" y="44" font-family="Cormorant Garamond, serif" font-size="9" fill="#3a2a08">çapa hisarı — aktif</text>

    <circle cx="17" cy="56" r="5" fill="none" stroke="#7a5a18" stroke-width="0.8"/>
    <text x="28" y="60" font-family="Cormorant Garamond, serif" font-size="9" fill="#3a2a08">çapa hisarı — bağlı</text>

    <path d="M 12 71 a 5 5 0 1 1 10 0" fill="none" stroke="#7a5a18" stroke-width="0.8" stroke-dasharray="1.5 2"/>
    <text x="28" y="76" font-family="Cormorant Garamond, serif" font-size="9" fill="#3a2a08" font-style="italic">çapa hisarı — kayıp</text>

    <line x1="12" y1="89" x2="22" y2="89" stroke="#5a3a10" stroke-width="0.8" stroke-dasharray="3 3"/>
    <text x="28" y="92" font-family="Cormorant Garamond, serif" font-size="9" fill="#3a2a08">kervan / yolculuk</text>

    <line x1="12" y1="103" x2="22" y2="103" stroke="#7a1f1f" stroke-width="1.2"/>
    <text x="28" y="106" font-family="Cormorant Garamond, serif" font-size="9" fill="#3a2a08">vakâyiî yolu</text>
  </g>

  <!-- ─── BAŞLIK KARTUŞ ─── -->
  <g transform="translate(500 50)">
    <rect x="-185" y="-22" width="370" height="36" fill="#f3e6c8" stroke="#7a5a18" stroke-width="0.9" rx="2"/>
    <text x="0" y="4" text-anchor="middle" font-family="UnifrakturMaguntia, Cinzel, serif" font-size="22" fill="#5a3a10" letter-spacing="3">M E N D Î R A N</text>
  </g>

  <!-- Kuzey kıyısı kenar yazısı -->
  <text x="500" y="690" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="10" fill="#5a4220" letter-spacing="2" opacity="0.85">— altı kıta · altı çapa · bir söylenmemiş ad —</text>

</svg>
  `,

  notlar: [
    {
      ad: "Çizilmemiş Olanlar",
      metin: "Sahesh kervan yolları haritada yoktur. Sahesh dilinin kuralı: bir yol çizilince, o yolun ezberi başkasında kalır. Bu yüzden Sahesh büyükleri yol çizmez; yolları, yolculuğu yapanın ezberinde taşır. Cam Mahzeni’nin yedinci rafı da çizilmedi; bilen taşır, bilmeyen aramaz."
    },
    {
      ad: "Hisn-i Sahr",
      metin: "Beşinci çapa hisarı, VS 901’den beri boş. Konumu hâlâ bilinen, ama içeride neyin olduğu bilinmeyen tek hisardır. Bu sayfada eksik bir çember olarak gösterildi; çünkü bir çapa hisarının altında bir Sönmeyen yoksa, çember tamamlanmamalıdır."
    },
    {
      ad: "Vâris’ten Hisn-i Sevra’ya Çizilen Çizgi",
      metin: "Bu haritadaki tek kalın kırmızı çizgi, VS 1247 on ikinci ayında yedi kişinin yürüdüğü yolu gösterir. Çizgi yolun fiziksel rotasını değil, *anlamını* yansıtır: kuzeye doğru, altı günlük bir at yolu, son gece donmuş gölün üzerinde tamamlanmıştır."
    },
    {
      ad: "Sınırlar",
      metin: "Mendîran’da resmî sınırlar yoktur. Hâneler kervan yolları üzerinden konuşur, denizler üzerinden anlaşır, dağlar üzerinden ihtilaf eder. Bu haritadaki çizgiler, bir hânenin diğerine olan uzaklığını değil, bir ezberin bir başkasıyla karşılaşma mesafesini gösterir."
    }
  ]
};
