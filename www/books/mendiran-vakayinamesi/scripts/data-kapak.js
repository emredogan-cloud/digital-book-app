/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — KAPAK & KOLEKSİYON DAMGA SİSTEMİ
 *  Premium SVG kapak sürümleri (tam, kare, dikey poster) + arşiv
 *  damgaları (mum mührü, koleksiyon işareti).
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_KAPAK = {

  baslik: "Cilt Kapakları ve Arşiv Damgaları",
  altBaslik: "Mendîran Vakayinâmesi · Koleksiyon Folyoları",

  acilis: `
    Bir cilt, kapağıyla okuruna ilk sözünü söyler. Bu sayfalarda Cilt I’in
    aydınlatılmış kapak sürümleri, koleksiyonluk damgaları ve cilt
    sırtının ön yüzü bulunur. Aşağıdaki dört kapak, aynı eserin dört
    farklı yüzüdür: bir kütüphane rafında, bir kervan sandığında, bir
    saraylı mektup zarfının üstünde, bir ilan tahtasında.
  `,

  /* ═══════════════════════════════════════════════════════════════════
     TAM KAPAK · 2:3 oran, basılı cilt için
     ═══════════════════════════════════════════════════════════════════ */
  kapakTam: `
<svg viewBox="0 0 700 1050" xmlns="http://www.w3.org/2000/svg" class="kapak kapak--tam" aria-label="Mendîran Vakayinâmesi Cilt I — tam kapak">
  <defs>
    <radialGradient id="kpk-parch" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1c1218"/>
      <stop offset="50%" stop-color="#100a10"/>
      <stop offset="100%" stop-color="#040206"/>
    </radialGradient>
    <radialGradient id="kpk-gold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e8c170"/>
      <stop offset="50%" stop-color="#a8842c"/>
      <stop offset="100%" stop-color="#5a3a10"/>
    </radialGradient>
    <linearGradient id="kpk-gold-line" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d4a85a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#5a3a10" stop-opacity="0.9"/>
    </linearGradient>
    <radialGradient id="kpk-glow" cx="50%" cy="40%" r="40%">
      <stop offset="0%" stop-color="#a8842c" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#a8842c" stop-opacity="0"/>
    </radialGradient>
    <pattern id="kpk-grain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.25" fill="#3a2418" opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="700" height="1050" fill="url(#kpk-parch)"/>
  <rect width="700" height="1050" fill="url(#kpk-grain)" opacity="0.18"/>
  <rect width="700" height="1050" fill="url(#kpk-glow)"/>

  <!-- İllüminasyonlu dış çerçeve -->
  <rect x="35" y="35" width="630" height="980" fill="none" stroke="url(#kpk-gold-line)" stroke-width="1.5"/>
  <rect x="48" y="48" width="604" height="954" fill="none" stroke="#a8842c" stroke-width="0.5" opacity="0.65"/>
  <rect x="58" y="58" width="584" height="934" fill="none" stroke="#5a3a10" stroke-width="0.3" opacity="0.5"/>

  <!-- Köşe motifleri (illuminated) -->
  <g stroke="url(#kpk-gold-line)" stroke-width="0.8" fill="none" opacity="0.85">
    <path d="M 48 58 q 18 -10 36 -10 m -36 10 q -10 18 -10 36"/>
    <path d="M 652 58 q -18 -10 -36 -10 m 36 10 q 10 18 10 36"/>
    <path d="M 48 992 q 18 10 36 10 m -36 -10 q -10 -18 -10 -36"/>
    <path d="M 652 992 q -18 10 -36 10 m 36 -10 q 10 -18 10 -36"/>
  </g>

  <!-- Üst seri etiketi -->
  <g transform="translate(350 105)">
    <line x1="-120" y1="0" x2="-30" y2="0" stroke="#a8842c" stroke-width="0.6" opacity="0.65"/>
    <line x1="120" y1="0" x2="30" y2="0" stroke="#a8842c" stroke-width="0.6" opacity="0.65"/>
    <text text-anchor="middle" y="5" font-family="Cinzel, serif" font-size="10" letter-spacing="0.55em" fill="#c69a40">CİLT I</text>
  </g>

  <!-- Yedi noktalı yıldız sigil — kapağın kalbi -->
  <g transform="translate(350 320)">
    <!-- dış ışıma -->
    <circle r="135" fill="url(#kpk-glow)"/>
    <circle r="115" fill="none" stroke="#a8842c" stroke-width="0.4" opacity="0.45"/>
    <circle r="98" fill="none" stroke="#a8842c" stroke-width="0.3" opacity="0.4"/>

    <!-- yedi noktalı yıldız -->
    <g stroke="url(#kpk-gold-line)" stroke-width="1.1" fill="url(#kpk-gold)" opacity="0.95">
      <path d="M 0 -90 L 20 -28 L 84 -28 L 32 11 L 52 73 L 0 34 L -52 73 L -32 11 L -84 -28 L -20 -28 Z"/>
    </g>
    <circle r="12" fill="#0a0608"/>
    <circle r="6" fill="url(#kpk-gold)"/>
    <circle r="1.6" fill="#0a0608"/>

    <!-- yıldız çevresine yedi mum noktası -->
    <g fill="#c69a40" opacity="0.85">
      <circle cx="0" cy="-118" r="2.2"/>
      <circle cx="92" cy="-72" r="2"/>
      <circle cx="113" cy="34" r="1.8"/>
      <circle cx="65" cy="105" r="1.8"/>
      <circle cx="-65" cy="105" r="1.8"/>
      <circle cx="-113" cy="34" r="1.8"/>
      <circle cx="-92" cy="-72" r="2"/>
    </g>
  </g>

  <!-- Ana başlık -->
  <g transform="translate(350 560)">
    <text text-anchor="middle" y="0" font-family="UnifrakturMaguntia, 'Cinzel', serif" font-size="72" fill="#e8c170" letter-spacing="0.04em">
      <tspan x="0" dy="0">Mendîran</tspan>
      <tspan x="0" dy="84">Vakayinâmesi</tspan>
    </text>
  </g>

  <!-- Süs ayraç -->
  <g transform="translate(350 745)">
    <line x1="-150" y1="0" x2="-18" y2="0" stroke="url(#kpk-gold-line)" stroke-width="0.8"/>
    <line x1="150" y1="0" x2="18" y2="0" stroke="url(#kpk-gold-line)" stroke-width="0.8"/>
    <text text-anchor="middle" y="4" font-family="Cinzel, serif" font-size="16" fill="#c69a40">✦</text>
  </g>

  <!-- Altyazı -->
  <g transform="translate(350 800)">
    <text text-anchor="middle" y="0" font-family="Cormorant Garamond, serif" font-style="italic" font-size="22" fill="#d4a85a" letter-spacing="0.08em">
      <tspan x="0" dy="0">Yedinci And’ın Çatladığı</tspan>
      <tspan x="0" dy="32">Diyarın Kitabesi</tspan>
    </text>
  </g>

  <!-- Atmosferik alıntı -->
  <g transform="translate(350 920)">
    <text text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="14" fill="#8a6f2c" opacity="0.78" letter-spacing="0.04em">
      <tspan x="0" dy="0">“İyileşmemek,</tspan>
      <tspan x="0" dy="20">bir biçim gerektirir.”</tspan>
    </text>
  </g>

  <!-- Edition damgası -->
  <g transform="translate(350 1000)">
    <text text-anchor="middle" y="0" font-family="Cinzel, serif" font-size="9" letter-spacing="0.45em" fill="#7a5a18" opacity="0.85">VS 1247 FOLYO TÂBI</text>
  </g>
</svg>
  `,

  /* ═══════════════════════════════════════════════════════════════════
     KARE SOSYAL MEDYA · 1080x1080
     ═══════════════════════════════════════════════════════════════════ */
  kapakKare: `
<svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" class="kapak kapak--kare" aria-label="Mendîran Vakayinâmesi — kare paylaşım kartı">
  <defs>
    <radialGradient id="kpkkr-bg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1a1018"/>
      <stop offset="60%" stop-color="#0a0610"/>
      <stop offset="100%" stop-color="#020104"/>
    </radialGradient>
    <radialGradient id="kpkkr-gold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e8c170"/>
      <stop offset="50%" stop-color="#a8842c"/>
      <stop offset="100%" stop-color="#5a3a10"/>
    </radialGradient>
    <radialGradient id="kpkkr-glow" cx="50%" cy="40%" r="38%">
      <stop offset="0%" stop-color="#a8842c" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#a8842c" stop-opacity="0"/>
    </radialGradient>
    <pattern id="kpkkr-grain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.3" fill="#3a2418" opacity="0.4"/>
    </pattern>
  </defs>

  <rect width="1080" height="1080" fill="url(#kpkkr-bg)"/>
  <rect width="1080" height="1080" fill="url(#kpkkr-grain)" opacity="0.16"/>
  <rect width="1080" height="1080" fill="url(#kpkkr-glow)"/>

  <!-- Çift çerçeve -->
  <rect x="48" y="48" width="984" height="984" fill="none" stroke="#a8842c" stroke-width="1.2" opacity="0.85"/>
  <rect x="62" y="62" width="956" height="956" fill="none" stroke="#7a5a18" stroke-width="0.4" opacity="0.55"/>

  <!-- Üst başlık -->
  <g transform="translate(540 168)">
    <line x1="-200" y1="0" x2="-50" y2="0" stroke="#a8842c" stroke-width="0.6" opacity="0.6"/>
    <line x1="200" y1="0" x2="50" y2="0" stroke="#a8842c" stroke-width="0.6" opacity="0.6"/>
    <text text-anchor="middle" y="6" font-family="Cinzel, serif" font-size="13" letter-spacing="0.55em" fill="#c69a40">MENDÎRAN VAKAYİNÂMESİ</text>
  </g>

  <!-- Yedi noktalı yıldız -->
  <g transform="translate(540 450)">
    <circle r="180" fill="url(#kpkkr-glow)"/>
    <circle r="150" fill="none" stroke="#a8842c" stroke-width="0.5" opacity="0.4"/>
    <g stroke="#5a3a10" stroke-width="1.4" fill="url(#kpkkr-gold)">
      <path d="M 0 -120 L 26 -38 L 112 -38 L 42 14 L 70 96 L 0 46 L -70 96 L -42 14 L -112 -38 L -26 -38 Z"/>
    </g>
    <circle r="16" fill="#0a0608"/>
    <circle r="7" fill="url(#kpkkr-gold)"/>
    <circle r="2" fill="#0a0608"/>
  </g>

  <!-- Ana başlık -->
  <g transform="translate(540 760)">
    <text text-anchor="middle" font-family="UnifrakturMaguntia, 'Cinzel', serif" font-size="68" fill="#e8c170" letter-spacing="0.04em">Cilt I</text>
  </g>

  <g transform="translate(540 830)">
    <line x1="-170" y1="0" x2="-22" y2="0" stroke="#a8842c" stroke-width="0.7"/>
    <line x1="170" y1="0" x2="22" y2="0" stroke="#a8842c" stroke-width="0.7"/>
    <text text-anchor="middle" y="5" font-family="Cinzel, serif" font-size="18" fill="#c69a40">✦</text>
  </g>

  <g transform="translate(540 890)">
    <text text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="28" fill="#d4a85a" letter-spacing="0.08em">Yedinci And’ın Çatladığı Diyar</text>
  </g>

  <!-- Edition altta -->
  <g transform="translate(540 1000)">
    <text text-anchor="middle" font-family="Cinzel, serif" font-size="11" letter-spacing="0.5em" fill="#7a5a18">VS 1247 FOLYO TÂBI</text>
  </g>
</svg>
  `,

  /* ═══════════════════════════════════════════════════════════════════
     DİKEY POSTER · 9:16
     ═══════════════════════════════════════════════════════════════════ */
  kapakDikey: `
<svg viewBox="0 0 540 960" xmlns="http://www.w3.org/2000/svg" class="kapak kapak--dikey" aria-label="Mendîran Vakayinâmesi — dikey poster">
  <defs>
    <radialGradient id="kpkd-bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1a1018"/>
      <stop offset="55%" stop-color="#0a0610"/>
      <stop offset="100%" stop-color="#020104"/>
    </radialGradient>
    <radialGradient id="kpkd-gold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e8c170"/>
      <stop offset="100%" stop-color="#5a3a10"/>
    </radialGradient>
    <linearGradient id="kpkd-shaft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a8842c" stop-opacity="0"/>
      <stop offset="20%" stop-color="#a8842c" stop-opacity="0.55"/>
      <stop offset="80%" stop-color="#a8842c" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#a8842c" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="540" height="960" fill="url(#kpkd-bg)"/>

  <!-- Üstte ince altın işaretler -->
  <g opacity="0.85">
    <line x1="270" y1="60" x2="270" y2="200" stroke="url(#kpkd-shaft)" stroke-width="0.8"/>
  </g>

  <!-- Yedi noktalı yıldız ortada -->
  <g transform="translate(270 360)">
    <g stroke="#a8842c" stroke-width="1.1" fill="url(#kpkd-gold)" opacity="0.92">
      <path d="M 0 -85 L 18 -25 L 78 -25 L 30 12 L 50 68 L 0 32 L -50 68 L -30 12 L -78 -25 L -18 -25 Z"/>
    </g>
    <circle r="12" fill="#0a0608"/>
    <circle r="5" fill="url(#kpkd-gold)"/>
  </g>

  <!-- Mendîran başlık -->
  <g transform="translate(270 580)">
    <text text-anchor="middle" font-family="UnifrakturMaguntia, 'Cinzel', serif" font-size="52" fill="#e8c170" letter-spacing="0.04em">Mendîran</text>
  </g>
  <g transform="translate(270 638)">
    <text text-anchor="middle" font-family="UnifrakturMaguntia, 'Cinzel', serif" font-size="36" fill="#d4a85a" letter-spacing="0.04em" opacity="0.92">Vakayinâmesi</text>
  </g>

  <!-- Süs ayraç -->
  <g transform="translate(270 700)">
    <line x1="-110" y1="0" x2="-15" y2="0" stroke="#a8842c" stroke-width="0.7"/>
    <line x1="110" y1="0" x2="15" y2="0" stroke="#a8842c" stroke-width="0.7"/>
    <text text-anchor="middle" y="4" font-family="Cinzel, serif" font-size="14" fill="#c69a40">✦</text>
  </g>

  <!-- Altyazı -->
  <g transform="translate(270 760)">
    <text text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="20" fill="#c8a868" letter-spacing="0.06em">
      <tspan x="0" dy="0">Yedinci And’ın Çatladığı</tspan>
      <tspan x="0" dy="28">Diyarın Kitabesi</tspan>
    </text>
  </g>

  <!-- Altta ince altın işaretler -->
  <g opacity="0.85">
    <line x1="270" y1="860" x2="270" y2="900" stroke="url(#kpkd-shaft)" stroke-width="0.6"/>
  </g>

  <g transform="translate(270 920)">
    <text text-anchor="middle" font-family="Cinzel, serif" font-size="9" letter-spacing="0.45em" fill="#7a5a18">CİLT I · VS 1247</text>
  </g>
</svg>
  `,

  /* ═══════════════════════════════════════════════════════════════════
     MUM MÜHRÜ DAMGASI · 200x200, koleksiyon için
     ═══════════════════════════════════════════════════════════════════ */
  mumMuhru: `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="damga damga--muhur" aria-label="Mendîran cilt mum mührü">
  <defs>
    <radialGradient id="muh-wax" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#a82828"/>
      <stop offset="55%" stop-color="#7a1f1f"/>
      <stop offset="100%" stop-color="#3a0a0a"/>
    </radialGradient>
    <radialGradient id="muh-highlight" cx="40%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#d44848" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#a82828" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Düzensiz erimiş mum kenarları -->
  <path d="M 100 16
           C 138 14, 178 38, 184 76
           C 188 110, 178 156, 138 178
           C 110 192, 78 188, 50 174
           C 18 156, 8 122, 14 88
           C 22 50, 56 22, 100 16 Z"
        fill="url(#muh-wax)" stroke="#3a0808" stroke-width="0.6"/>
  <path d="M 100 16 C 138 14, 178 38, 184 76 C 188 110, 178 156, 138 178" fill="url(#muh-highlight)"/>

  <!-- Yedi noktalı yıldız mührü -->
  <g transform="translate(100 100)" fill="#3a0a0a" stroke="#1c0404" stroke-width="0.7">
    <path d="M 0 -52 L 12 -16 L 48 -16 L 18 6 L 30 42 L 0 20 L -30 42 L -18 6 L -48 -16 L -12 -16 Z"/>
  </g>
  <circle cx="100" cy="100" r="7" fill="#1c0404"/>
  <circle cx="100" cy="100" r="3" fill="#5a1818"/>

  <!-- Çevre yazısı (Latin/Naerathça karışımı) -->
  <g fill="#3a0a0a" font-family="Cinzel, serif" font-size="6" letter-spacing="0.3em" opacity="0.8">
    <text x="100" y="38" text-anchor="middle">· VS 1247 ·</text>
    <text x="100" y="172" text-anchor="middle">SAKIN VASIL</text>
  </g>
</svg>
  `,

  /* ═══════════════════════════════════════════════════════════════════
     ARŞİV DAMGASI · klasifikasyon işareti
     ═══════════════════════════════════════════════════════════════════ */
  arsivDamgasi: `
<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" class="damga damga--arsiv" aria-label="Mendîran arşiv klasifikasyon damgası">
  <rect x="2" y="2" width="316" height="96" fill="none" stroke="#5a3a10" stroke-width="1.4" rx="2"/>
  <rect x="8" y="8" width="304" height="84" fill="none" stroke="#5a3a10" stroke-width="0.4" rx="1" opacity="0.65"/>
  <g font-family="Cinzel, serif" fill="#5a3a10">
    <text x="160" y="32" text-anchor="middle" font-size="11" letter-spacing="0.45em">— MENDÎRAN ARŞİVİ —</text>
    <text x="160" y="56" text-anchor="middle" font-size="14" font-weight="600" letter-spacing="0.2em">CİLT I / F-1247</text>
    <text x="160" y="76" text-anchor="middle" font-size="8" letter-spacing="0.3em" font-style="italic">sınıflandırma: folyo · tâb: birinci · taşıyıcı: kayıtlı okur</text>
  </g>
  <!-- köşe işaretleri -->
  <g stroke="#5a3a10" stroke-width="0.6" fill="none">
    <path d="M 8 8 L 8 20 M 8 8 L 20 8"/>
    <path d="M 312 8 L 312 20 M 312 8 L 300 8"/>
    <path d="M 8 92 L 8 80 M 8 92 L 20 92"/>
    <path d="M 312 92 L 312 80 M 312 92 L 300 92"/>
  </g>
</svg>
  `,

  /* ═══════════════════════════════════════════════════════════════════
     YASAKLI ARŞİV UYARISI · forbidden notice
     ═══════════════════════════════════════════════════════════════════ */
  yasakUyarisi: `
<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" class="damga damga--yasak" aria-label="Yasaklı arşiv uyarısı">
  <rect x="2" y="2" width="316" height="96" fill="none" stroke="#5c1e15" stroke-width="1.4" rx="2"/>
  <g font-family="Cinzel, serif" fill="#5c1e15">
    <text x="160" y="34" text-anchor="middle" font-size="11" letter-spacing="0.5em" font-weight="600">— UYARI —</text>
    <text x="160" y="58" text-anchor="middle" font-size="9" letter-spacing="0.15em">Bu cildin bazı sayfaları, Sâkin Vasıl tarîkâtının</text>
    <text x="160" y="74" text-anchor="middle" font-size="9" letter-spacing="0.15em">altıncı defterinde yazılmaması gerektiği söylenenleri içerir.</text>
    <text x="160" y="90" text-anchor="middle" font-size="8" letter-spacing="0.25em" font-style="italic" opacity="0.8">— okur kendi taşıma kararını verir —</text>
  </g>
</svg>
  `,

  notlar: [
    "Tüm kapak SVG’leri saf XML; harici görsel/font dosyası gerektirmez.",
    "Tipografi: UnifrakturMaguntia (başlık), Cinzel (etiket), Cormorant Garamond (altyazı). Üçü de fontstack içinde tanımlı.",
    "Mum mührü VS 1247 tarihli olup, Sâkin Vasıl tarîkâtının imzasıdır.",
    "Arşiv klasifikasyon damgası bir okurun cildi *taşıma kararını* tanır; sahip değil, taşıyıcı kabul eder.",
    "Yasaklı uyarı, okuyucunun altıncı defter parçalarına gözünü kapatmasının kayda alınmamasını sağlar."
  ]
};
