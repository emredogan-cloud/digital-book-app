/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — İÇERİK ADAPTÖRÜ
 *
 *  Mendîran’ın hiyerarşik ham verisini (data-*.js) okur, onları
 *  GERÇEK BİR ROMAN YAPISINA dönüştürür:
 *
 *      8 cilt / kısım  →  16 akıcı bölüm
 *
 *  Önceki sürümde her küçük girdi (her kıta, her hâne, her sîmâ,
 *  her sahne) ayrı bir "story" idi → 78 bölüm. Bu, motora her
 *  bölümün başına ayrı bir tam-sayfa ornament koymasını ve sağ-
 *  sayfa hizalaması için boş sol sayfalar eklemesini söyletiyordu.
 *  Sonuç: kopuk, fragmental okuma.
 *
 *  Yeni yapı: her kısım = tek bir bölüm, içinde alt-başlıklarla
 *  akar; ana hikâye = perde başına bir bölüm, perde içindeki
 *  sahneler scene-break ile ayrılır. Toplam 16 bölüm, gerçek bir
 *  fantazi romanın boyutunda.
 *
 *  Üretilen sözleşme:
 *    window.MENDIRAN.book                = { title, … }
 *    window.MENDIRAN.civilizations       = [{ id, name, full, … }]
 *    window.MENDIRAN.stories             = [{ id, title, subtitle,
 *                                              civilization, themes,
 *                                              content: [paragraf…] }]
 *    window.MENDIRAN.civilizationById    = (id) => kısım
 *
 *  Paragraf çeşitleri (book.js uzantısıyla):
 *    "düz metin"
 *    { style: "quote",   text }
 *    { style: "hr" }
 *    { style: "heading", text }                    ← küçük alt-başlık
 *    { style: "section", title, eyebrow? }         ← BÜYÜK kesim
 *    { style: "scene",   title, place?, time? }    ← sahne kırılması
 *    { style: "list",    items }
 *    { style: "raw",     html }
 * ════════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = (window.MENDIRAN = window.MENDIRAN || {});

    /* ────── küçük yapıcılar ────── */
    const P  = (text) => String(text);
    const H  = (text) => ({ style: "heading", text: String(text) });
    const Q  = (text) => ({ style: "quote",   text: String(text) });
    const HR = ()     => ({ style: "hr" });
    const L  = (items)=> ({ style: "list",    items: items.map(String) });
    const R  = (html) => ({ style: "raw",     html: String(html) });

    /* Büyük kesim — kıta/hâne/sîmâ gibi alt yapıların başlangıcı */
    const SECTION = (title, eyebrow) => ({
        style: "section",
        title: String(title),
        eyebrow: eyebrow ? String(eyebrow) : null
    });

    /* Sahne kırılması — anlatı bölümlerinde sahneler arasında */
    const SCENE = (title, place, time) => ({
        style: "scene",
        title: String(title),
        place: place ? String(place) : "",
        time: time ? String(time) : ""
    });

    function build(...parts) { return parts.flat().filter(x => x !== null && x !== undefined); }

    /* HTML markup içeren metni paragraflara böler. Boş satırlarla
       bölünmüş bloklar; içlerinde <em>/<strong>/<ul> olanlar raw
       paragraf olur, plain olanlar düz string kalır. */
    function paraOrRaw(text) {
        if (text == null) return null;
        const s = String(text).trim();
        if (!s) return null;
        const hasMarkup = /<\/?(em|strong|br|ul|ol|li)\b/i.test(s);
        if (hasMarkup) return R(`<p>${s}</p>`);
        return P(s);
    }

    function splitParas(rawText) {
        if (!rawText) return [];
        const text = String(rawText).replace(/\r\n/g, "\n");
        const out = [];
        const ULRE = /<ul[^>]*>[\s\S]*?<\/ul>/gi;
        let lastIdx = 0;
        let m;
        while ((m = ULRE.exec(text)) !== null) {
            const before = text.slice(lastIdx, m.index).trim();
            if (before) {
                before.split(/\n\s*\n/).forEach(chunk => {
                    const c = chunk.trim().replace(/\s+/g, " ");
                    const p = paraOrRaw(c);
                    if (p) out.push(p);
                });
            }
            out.push(R(m[0]));
            lastIdx = m.index + m[0].length;
        }
        const rest = text.slice(lastIdx).trim();
        if (rest) {
            rest.split(/\n\s*\n/).forEach(chunk => {
                const c = chunk.trim().replace(/\s+/g, " ");
                const p = paraOrRaw(c);
                if (p) out.push(p);
            });
        }
        return out;
    }

    /* ════════════════════════════════════════════════════════════════
       KİTAP META + KISIMLAR
       Kısımlar artık bölüm sayısı eşit değil — bazı kısımlar 1 bölüm,
       Vakâyiî 9 bölüm. Bu, gerçek roman yapısının doğal sonucu.
       ════════════════════════════════════════════════════════════════ */

    NS.book = {
        title:    "Mendîran Vakayinâmesi",
        subtitle: "Yedinci And’ın Çatladığı Diyarın Kitabesi",
        series:   "Cilt I",
        edition:  "VS 1247 Folyo Tâbı",
        epigraph: "“Mendîran iyileşmedi. Ama Mendîran’ın iyileşmemesi, çürümeden farklıdır. İyileşmemek, bir biçim gerektirir.”",
        epilogueText: "Bu kitabe burada bitmez. Burada başlar. Yedinci mum, And-Taşıyıcı’nın hayatı boyunca yanmaya devam eder; ve yandığı süre boyunca, sekizinci tabakanın yazılması sürer. Vakâyiî kâtibi bir cilt daha bağlamak için — okurun döneceği geceyi — bekliyor."
    };

    NS.civilizations = [
        {
            id: "hakkinda", name: "Kitabe",
            full: "Kitabe Hakkında — Okur Rehberi",
            epoch: "VS 1247 Folyo Tâbı", sigil: "❦", accent: "var(--hane-naerath)",
            description: "Bu cilt, Mendîran Vakayinâmesi’nin birinci cildidir. Okur burada bir başlangıç bulur."
        },
        {
            id: "kapak", name: "Kapak",
            full: "Cilt Kapakları ve Arşiv Damgaları",
            epoch: "Koleksiyon", sigil: "✦", accent: "var(--hane-naerath)",
            description: "Tam kapak, kare paylaşım kartı, dikey poster, mum mührü, arşiv klasifikasyonu."
        },
        {
            id: "harita", name: "Atlas",
            full: "Mendîran Atlası — Beş Kıta",
            epoch: "Coğrafya", sigil: "✦", accent: "var(--hane-velivar)",
            description: "Aydınlatılmış el yazması haritası ve coğrafi notlar."
        },
        {
            id: "folyolar", name: "Folyolar",
            full: "Vitrin Folyoları — Karakter & Dünya Kartları",
            epoch: "Sergi", sigil: "✶", accent: "var(--hane-asmeyra)",
            description: "Paylaşılabilir alıntılar, sekiz karakter folyosu, altı dünya vitrin sayfası."
        },
        {
            id: "dunya", name: "Diyar",
            full: "Cilt I — Mendîran Diyarı",
            epoch: "İlk Çağ", sigil: "❖", accent: "var(--hane-naerath)",
            description: "Altı kıta, beş inanç, altı dil, üç ay’lık bir kozmoloji."
        },
        {
            id: "zaman", name: "Zaman",
            full: "Cilt II — Yedi Tabakalı Çağ",
            epoch: "VS 0 – 1247", sigil: "✦", accent: "var(--hane-vehdar)",
            description: "Vahdân’ın imzalanmasından sekizinci tabakanın doğumuna."
        },
        {
            id: "haneler", name: "Hâneler",
            full: "Cilt III — Hâneler Kodeksi",
            epoch: "VS 932 –", sigil: "⚜", accent: "var(--hane-velivar)",
            description: "Altı büyük hâne, küçük hâneler, ittifaklar."
        },
        {
            id: "karakterler", name: "Sîmâlar",
            full: "Cilt IV — Sekiz Sessiz Yemin",
            epoch: "VS 1247", sigil: "✶", accent: "var(--hane-asmeyra)",
            description: "Bu vakâyiî’yi omuzlarında taşıyan sekiz kişi."
        },
        {
            id: "buyu", name: "Külbağ",
            full: "Cilt V — Külbağ",
            epoch: "VS 298 –", sigil: "☉", accent: "var(--hane-korsend)",
            description: "Ölülerin sözüne bağlanma sanatı; yedi söz, dört kademe, üç gizem."
        },
        {
            id: "hikaye", name: "Vakâyiî",
            full: "Cilt VI — Ana Vakâyiî",
            epoch: "VS 1247 – 1262", sigil: "❦", accent: "var(--hane-naerath)",
            description: "Hisn-i Sevra’nın ikinci çatlağıyla başlayan ana anlatı."
        },
        {
            id: "aralar", name: "Aralar",
            full: "Cilt VII — Vakâyiî’nin Sayfaları Arasından",
            epoch: "Muhtelif", sigil: "❀", accent: "var(--hane-asmeyra)",
            description: "Şiirler, mektuplar, arşiv parçaları, ezbersizler."
        },
        {
            id: "ekler", name: "Ekler",
            full: "Cilt VIII — Vakâyiî’nin Arka Sayfaları",
            epoch: "—", sigil: "✧", accent: "var(--hane-brennvar)",
            description: "Sözlük, takvim, ölçü-tartı, alıntılar, dipnotlar."
        }
    ];

    NS.civilizationById = function (id) {
        return NS.civilizations.find(c => c.id === id);
    };

    /* ════════════════════════════════════════════════════════════════
       STORIES — 16 AKICI BÖLÜM
       ════════════════════════════════════════════════════════════════ */

    NS.stories = [];

    function pushStoryEarly(s) {
        s.content = (s.content || []).filter(x => x !== null && x !== undefined);
        if (!s.content.length) s.content = [P("—")];
        NS.stories.push(s);
    }

    /* ─── 0a: KİTABE HAKKINDA (premium giriş) ─── */
    {
        pushStoryEarly({
            id: "kitabe-hakkinda",
            title: "Kitabe Hakkında",
            subtitle: "VS 1247 Folyo Tâbı · Birinci Cilt · Okur Rehberi",
            civilization: "hakkinda",
            themes: ["Giriş", "Edition", "Okur"],
            content: [
                Q("Bir cilt, kendini açtığı sayfayla okuruna borçlu olur."),
                P("Bu cilt, Mendîran Vakayinâmesi’nin birinci cildidir. İçinde sekiz kısım, on sekiz bölüm, üç ek belge ve bir aydınlatılmış atlas bulunur. Yedi yüz yıllık bir yeminin çatladığı VS 1247 yılında geçer; geriye doğru bin yedi yüz yıllık bir tarihe yaslanır, ileriye doğru bir başka cildin uğultusunu taşır."),

                SECTION("Nasıl Okunur"),
                P("Cildi düz okumak isteyenler, Kitabe Hakkında’dan sonra Atlas’a uğrayıp Cilt VI Ana Vakâyiî’ye geçebilir. Önsöz oradadır; üç perde, finâl ve altı sonsöz onun ardından akar."),
                P("Dünyayı önce öğrenmek isteyenler Cilt I’den (Diyar) başlayıp Cilt V’e (Külbağ) kadar bir codex olarak okuyabilir; ardından Vakâyiî’ye girince hâne, sîmâ ve ritüel adları çoktan tanıdık olur."),
                P("Bir başvuru cildi olarak kullanmak isteyenler Ekler kısmındaki sözlük, takvim ve dipnotlardan istedikleri yerden başlayabilir; Aralar kısmındaki kurtarılmış belgeler — saray defteri, tuz tablosu, yanık dualar — kendi başına okunabilir parçalardır."),

                SECTION("Edition Bilgisi"),
                R(`<p><strong>Cilt I</strong> — Yedinci And’ın Çatladığı Diyar · VS 1247 Folyo Tâbı.</p>`),
                R(`<p><strong>Toplam:</strong> 18 bölüm, ~31.000 sözcük, 28 sözlük girişi, 13 ay’lık takvim, 20 kurtarılmış belge, bir aydınlatılmış atlas.</p>`),
                R(`<p><strong>Tipografi:</strong> Cinzel (başlık), Cormorant Garamond (gövde), EB Garamond (dipnot), Maguntia Fraktur (illuminated).</p>`),
                R(`<p><strong>Aydınlatma:</strong> kül, mum, ay ışığı, ıslak taş ve paslı sıva. Bu cilt, basılı bir el yazmasının ekran kopyası olarak tasarlandı.</p>`),

                SECTION("Cildin Esas Hâli"),
                P("Mendîran’da kayıt bir bilgi değil, bir borçtur. Bir adı yazmak, onun ezberini taşımayı kabul etmektir. Bu cildi okumak da bir borçtur: okur, son sayfadan sonra, taşıdığı adları kendisi seçecektir. Kimini ezberinde tutacak, kimini bırakacaktır. İkisi de Sahesh tekniğinin bir uygulamasıdır."),
                Q("“Söylediğim ölmüştür; ölmemiş olan, söylenmez.”")
            ]
        });
    }

    /* ─── 0a-bis: KAPAK & ARŞİV DAMGALARI ─── */
    {
        const k = window.MENDIRAN_KAPAK;
        if (k) {
            pushStoryEarly({
                id: "kapaklar",
                title: k.baslik,
                subtitle: k.altBaslik,
                civilization: "kapak",
                themes: ["Kapak", "Koleksiyon", "Damga"],
                content: [
                    ...splitParas(k.acilis),

                    SECTION("Cilt Kapağı — Tam"),
                    R(`<figure class="kapak-figure kapak-figure--tam">${k.kapakTam}<figcaption>Cilt I · Tam Kapak (2:3, basılı cilt için)</figcaption></figure>`),

                    SECTION("Kare Paylaşım Kartı"),
                    R(`<figure class="kapak-figure kapak-figure--kare">${k.kapakKare}<figcaption>1080×1080 · sosyal medya paylaşımı için</figcaption></figure>`),

                    SECTION("Dikey Poster"),
                    R(`<figure class="kapak-figure kapak-figure--dikey">${k.kapakDikey}<figcaption>9:16 · poster ve story formatı için</figcaption></figure>`),

                    SECTION("Mum Mührü"),
                    R(`<figure class="damga-figure">${k.mumMuhru}<figcaption>VS 1247 mum mührü · Sâkin Vasıl tarîkâtı imzası</figcaption></figure>`),

                    SECTION("Arşiv Klasifikasyon Damgası"),
                    R(`<figure class="damga-figure">${k.arsivDamgasi}<figcaption>Mendîran Arşivi · Cilt I · F-1247</figcaption></figure>`),

                    SECTION("Yasaklı Arşiv Uyarısı"),
                    R(`<figure class="damga-figure">${k.yasakUyarisi}<figcaption>Altıncı defter parçalarına dair okur uyarısı</figcaption></figure>`),

                    SECTION("Üretim Notları"),
                    L(k.notlar)
                ]
            });
        }
    }

    /* ─── 0b: HARİTA — Mendîran Atlası ─── */
    {
        const m = window.MENDIRAN_HARITA;
        if (m) {
            pushStoryEarly({
                id: "harita-mendiran",
                title: m.baslik,
                subtitle: m.altBaslik,
                civilization: "harita",
                themes: ["Coğrafya", "Atlas", "Aydınlatma"],
                content: [
                    ...splitParas(m.acilis),
                    R(`<figure class="atlas-figure">${m.svg}<figcaption>Mendîran Atlası — VS 1247 derlemesi.</figcaption></figure>`),
                    SECTION("Atlas Notları"),
                    ...m.notlar.flatMap(n => [
                        H(n.ad),
                        ...splitParas(n.metin)
                    ])
                ]
            });
        }
    }

    /* ─── 0c: FOLYOLAR — Karakter & Dünya Vitrini ─── */
    {
        const f = window.MENDIRAN_FOLYOLAR;
        if (f) {
            // 22 Alıntı kartı + 8 karakter folyo + 6 dünya folyo
            const content = [];
            splitParas(f.acilis).forEach(p => content.push(p));

            content.push(SECTION("Taşınabilir Alıntılar", "Vakâyiî’den paylaşılabilir cümleler"));
            f.alintilar.forEach(a => {
                content.push(R(`
                    <blockquote class="alintı-karti">
                      <p class="alintı-karti__soz">“${a.soz}”</p>
                      <footer class="alintı-karti__kaynak">— ${a.kaynak}</footer>
                      <div class="alintı-karti__etiket">${a.etiket.map(e => `<span>${e}</span>`).join('')}</div>
                    </blockquote>
                `));
            });

            content.push(SECTION("Karakter Folyoları", "Sekiz sîmâ · arşiv-folyo formatı"));
            f.karakterFolyolari.forEach(k => {
                content.push(R(`
                    <article class="folyo folyo--karakter folyo--${k.tematikRenk}">
                      <header class="folyo__head">
                        <div class="folyo__sigil">${k.sigilSimgesi}</div>
                        <div class="folyo__title-block">
                          <h3 class="folyo__ad">${k.ad}</h3>
                          <p class="folyo__sifat">${k.sifat}</p>
                          <p class="folyo__meta">${k.hane} · ${k.yedinciYas} yaşında (VS 1247) · motif: <em>${k.motif}</em></p>
                        </div>
                      </header>
                      <blockquote class="folyo__alinti">“${k.taşıyanAlıntı}”</blockquote>
                      <div class="folyo__bio">${k.biyografi.trim().split(/\n\s*\n/).map(p => `<p>${p.trim().replace(/\s+/g, ' ')}</p>`).join('')}</div>
                    </article>
                `));
            });

            content.push(SECTION("Dünya Vitrin Sayfaları", "Altı lokasyon · kısa atmosferik poster"));
            f.dunyaFolyolari.forEach(d => {
                content.push(R(`
                    <article class="folyo folyo--dunya">
                      <div class="folyo__ikon">${d.ikon}</div>
                      <h3 class="folyo__ad">${d.ad}</h3>
                      <p class="folyo__meta">${d.yer}</p>
                      <p class="folyo__bio-text">${d.kisaTanim}</p>
                      <blockquote class="folyo__alinti">${d.atmosferik}</blockquote>
                    </article>
                `));
            });

            pushStoryEarly({
                id: "folyolar",
                title: f.baslik,
                subtitle: f.altBaslik,
                civilization: "folyolar",
                themes: ["Folyo", "Vitrin", "Karakter", "Atmosfer"],
                content: content
            });
        }
    }

    function pushStory(s) {
        s.content = (s.content || []).filter(x => x !== null && x !== undefined);
        if (!s.content.length) s.content = [P("—")];
        NS.stories.push(s);
    }

    /* ─── 1: DİYAR ─── */
    {
        const d = window.MENDIRAN_DUNYA;
        pushStory({
            id: "diyar",
            title: "Mendîran’ın Çehresi",
            subtitle: "Yedinci And’ın Çatladığı Diyarın Coğrafyası",
            civilization: "dunya",
            themes: ["Coğrafya", "İlk Çağ", "Söz"],
            content: build(
                splitParas(d.acilisMetni),
                HR(),
                H("Mendîran’ın Beş Kitabı"),
                L(d.kitaplarKurali),

                SECTION("Altı Kıta", "Mendîran’ın gövdesini oluşturan altı topraktır"),
                d.kitalar.flatMap(k => build(
                    SECTION(k.ad, k.lakap),
                    Q(`${k.konum} · ${k.iklim}`),
                    splitParas(k.ozellik),
                    H("Önemli Yerler"),
                    k.onemliYerler.map(y => R(
                        `<p><strong>${y.ad}</strong> <em>· ${y.tur}</em>. ${y.aciklama}</p>`
                    ))
                )),

                SECTION("Beş İnanç", "Mendîran’da tanrı, anlaşma, demir, kül ve kum"),
                d.inanclar.flatMap(i => build(
                    H(i.ad),
                    P(`Yayılım: ${i.yayilim}.`),
                    splitParas(i.ozet)
                )),

                SECTION("Altı Dil", "Mendîran’da nasıl konuşulur"),
                d.diller.flatMap(dil => build(
                    H(dil.ad),
                    splitParas(dil.ozet)
                )),

                SECTION("Kozmoloji"),
                splitParas(d.kozmoloji),

                SECTION("Küresel Gerilim"),
                splitParas(d.kuresellGerilim)
            )
        });
    }

    /* ─── 2: ZAMAN ─── */
    {
        const z = window.MENDIRAN_ZAMAN;
        pushStory({
            id: "zaman",
            title: "Yedi Tabakalı Çağ",
            subtitle: "VS 0 — 1247 · Vahdân’dan Sekizinci Tabakaya",
            civilization: "zaman",
            themes: ["Tarih", "Tabaka", "Naerath"],
            content: build(
                splitParas(z.giris),
                HR(),
                z.tabakalar.flatMap(tabaka => build(
                    SECTION(tabaka.ad, `${tabaka.donem} · Tema: ${tabaka.tema}`),
                    tabaka.olaylar.flatMap(o => build(
                        H(`${o.tarih} — ${o.ad}`),
                        splitParas(o.aciklama)
                    ))
                )),
                HR(),
                SECTION("Hâne Cetvelleri Üzerine"),
                L(z.notlar)
            )
        });
    }

    /* ─── 3: HÂNELER ─── */
    {
        const h = window.MENDIRAN_HIZIPLER;
        pushStory({
            id: "haneler",
            title: "Hâneler Kodeksi",
            subtitle: "Yedinci And’ı Hâlâ Taşıyan Altı Omuz",
            civilization: "haneler",
            themes: ["Hâne", "Siyaset", "Naerath Sonrası"],
            content: build(
                splitParas(h.acilis),
                HR(),

                h.haneler.flatMap(han => build(
                    SECTION(han.ad, han.lakap),
                    Q(`${han.konum} · ${han.sloganHal.replace(/<[^>]+>/g, "")}`),
                    H("Arma"),
                    splitParas(han.arma),
                    H("Değerler"),
                    L(han.degerler),
                    H("Mimari"),
                    splitParas(han.mimari),
                    H("Ritüeller"),
                    L(han.ritueller),
                    H("Askerî Yapı"),
                    splitParas(han.askerYapisi),
                    H("Din"),
                    splitParas(han.din),
                    H("İç Çatışma"),
                    splitParas(han.icCatisma),
                    H("Ekonomi"),
                    splitParas(han.ekonomi)
                )),

                SECTION("Küçük Hâneler", "Altı büyüğün yörüngesinde dönenler"),
                h.kucukHaneler.map(kh => R(
                    `<p><strong>${kh.ad}</strong> <em>· ${kh.konum}</em>. ${kh.ozet}</p>`
                )),

                SECTION("İttifaklar"),
                h.ittifaklar.flatMap(it => build(
                    H(it.isim),
                    P(`Taraflar: ${it.taraflar.join(' · ')}.`),
                    splitParas(it.ozet)
                ))
            )
        });
    }

    /* ─── 4: SÎMÂLAR ─── */
    {
        const k = window.MENDIRAN_KARAKTERLER;
        pushStory({
            id: "simalar",
            title: "Sekiz Sessiz Yemin",
            subtitle: "Bu Vakâyiî’yi Omuzlarında Taşıyacak Sîmâlar",
            civilization: "karakterler",
            themes: ["Sîmâ", "Travma", "Sadakat"],
            content: build(
                splitParas(k.acilis),
                HR(),

                k.karakterler.flatMap(c => build(
                    SECTION(c.ad, c.sifat),
                    Q(`${c.yas} yaş · ${c.koken}`),
                    H("Görünüm"),
                    splitParas(c.gorunum),
                    H("Geçmiş"),
                    splitParas(c.gecmis),
                    H("Travma"),
                    splitParas(c.travma),
                    H("Çelişki"),
                    splitParas(c.celiski),
                    H("Korku"),
                    splitParas(c.korku),
                    H("Arzu"),
                    splitParas(c.arzu),
                    H("Ahlâkî Zaaf"),
                    splitParas(c.ahlakiZaaf),
                    H("Çatışan Sadakatler"),
                    L(c.catisanSadakatler),
                    H("Sesi"),
                    Q(c.sesi)
                )),

                SECTION("Yan Sîmâlar"),
                k.yanKarakterler.flatMap(y => build(
                    H(y.ad),
                    P(y.rol + "."),
                    splitParas(y.ozet)
                ))
            )
        });
    }

    /* ─── 5: KÜLBAĞ ─── */
    {
        const b = window.MENDIRAN_BUYU;
        pushStory({
            id: "kulbag",
            title: "Külbağ",
            subtitle: "Ölülerin Sözüne Bağlanma Sanatı",
            civilization: "buyu",
            themes: ["Külbağ", "Kül", "Söz", "Bağlanma"],
            content: build(
                splitParas(b.acilis),

                SECTION("Yedi Kül Sözü", b.yedi_soz.baslik),
                splitParas(b.yedi_soz.aciklama),
                b.yedi_soz.sozler.map((s, i) => R(
                    `<p><strong>${i + 1}. ${s.soz}.</strong> ${s.aciklama}</p>`
                )),

                SECTION("Hâfıza Camı"),
                splitParas(b.hafiza_cami.aciklama),

                SECTION("Bedel"),
                splitParas(b.bedel.aciklama),
                b.bedel.kademeler.map(kd => R(
                    `<p><strong>${kd.ad}.</strong> ${kd.bedel}</p>`
                )),

                SECTION("Toplumsal Etki"),
                splitParas(b.toplumsalEtki.aciklama),
                b.toplumsalEtki.etkiler.flatMap(e => build(
                    H(e.ad),
                    splitParas(e.aciklama)
                )),

                SECTION("Yedi Sınır"),
                splitParas(b.sinirlar.aciklama),
                L(b.sinirlar.siralama),

                SECTION("Henüz Anlaşılmayan"),
                splitParas(b.gizem.aciklama),
                b.gizem.gizemler.flatMap(g => build(
                    H(g.ad),
                    splitParas(g.ozet)
                )),

                SECTION("Sahesh Yolu"),
                splitParas(b.saheshFarki.aciklama)
            )
        });
    }

    /* ════════════════════════════════════════════════════════════════
       ANA VAKÂYİÎ — 9 BÖLÜM
       Önsöz · 3 Perde · Finâl · 4 Sonsöz.
       Perdelerin içindeki bölümler artık SAHNE olarak akar (scene
       break), her sahne kendi yer + zaman + başlığını taşır.
       ════════════════════════════════════════════════════════════════ */

    /* ─── 6: Önsöz ─── */
    {
        const h = window.MENDIRAN_HIKAYE;
        pushStory({
            id: "onsoz",
            title: h.onsoz.baslik,
            subtitle: `${h.onsoz.yer} · ${h.onsoz.zaman}`,
            civilization: "hikaye",
            themes: ["Önsöz", "Vâris", "Kül"],
            content: build(
                splitParas(h.onsoz.metin)
            )
        });
    }

    /* ─── 7-9: Üç Perde (her perde bir bölüm; sahneler içinde akar) ─── */
    {
        const h = window.MENDIRAN_HIKAYE;
        const perdeler = [h.perdeBir, h.perdeIki, h.perdeUc];

        perdeler.forEach((perde, pi) => {
            const content = [];
            perde.bolumler.forEach((bl, bi) => {
                // İlk sahne için scene-break atlanır (chapter-head zaten açar);
                // diğerleri ✦ ✦ ✦ ile.
                if (bi === 0) {
                    // İlk sahne: yalnız küçük başlık ve meta
                    content.push({
                        style: "scene",
                        title: bl.ad,
                        place: bl.yer,
                        time: bl.zaman,
                        opening: true   // chapter-head'in hemen ardına geliyor
                    });
                } else {
                    content.push(SCENE(bl.ad, bl.yer, bl.zaman));
                }
                content.push(...splitParas(bl.metin));
            });
            // Perde sonu notu — kısa, italik, kapanış vurusu
            content.push(HR());
            content.push(Q(perde.perdeNotu));

            pushStory({
                id: `perde-${pi + 1}`,
                title: perde.baslik,
                subtitle: perde.altBaslik,
                civilization: "hikaye",
                themes: ["Perde", "Vakâyiî", perde.altBaslik.split(",")[0]],
                content: content
            });
        });
    }

    /* ─── 10: Finâl ─── */
    {
        const h = window.MENDIRAN_HIKAYE;
        pushStory({
            id: "final",
            title: h.final.baslik,
            subtitle: h.final.yer,
            civilization: "hikaye",
            themes: ["Finâl", "Mum", "And"],
            content: build(
                splitParas(h.final.metin)
            )
        });
    }

    /* ─── 11-14: Dört Sonsöz ─── */
    {
        const h = window.MENDIRAN_HIKAYE;
        h.sonsozler.forEach((s, i) => {
            pushStory({
                id: `sonsoz-${i + 1}`,
                title: s.ad,
                subtitle: `${s.yer} · ${s.zaman}`,
                civilization: "hikaye",
                themes: ["Sonsöz", s.yer.split(",")[0]],
                content: build(
                    splitParas(s.metin)
                )
            });
        });
    }

    /* ─── 15: Aralar ─── */
    {
        const a = window.MENDIRAN_ARALAR;
        pushStory({
            id: "aralar",
            title: "Aralar",
            subtitle: "Vakâyiî’nin Sayfaları Arasından",
            civilization: "aralar",
            themes: ["Şiir", "Mektup", "Arşiv"],
            content: build(
                splitParas(a.acilis),
                HR(),

                a.parçalar.flatMap(parca => build(
                    SECTION(parca.ad, `${parca.tip} · ${parca.kaynak.split(",")[0]}`),
                    Q(parca.kaynak),
                    splitParas(parca.metin)
                ))
            )
        });
    }

    /* ─── 16: Ekler ─── */
    {
        const e = window.MENDIRAN_EKLER;
        const sortedSozluk = [...e.sozluk.girisler].sort(
            (a, b) => a.ad.localeCompare(b.ad, "tr")
        );

        pushStory({
            id: "ekler",
            title: "Ekler",
            subtitle: "Vakâyiî’nin Arka Sayfaları",
            civilization: "ekler",
            themes: ["Sözlük", "Takvim", "Dipnot"],
            content: build(
                SECTION("Mendîran Sözlüğü", "Vakâyiî’de geçen terim, isim ve deyiş"),
                splitParas(e.sozluk.aciklama),
                sortedSozluk.map(g => R(
                    `<p><strong>${g.ad}.</strong> ${g.aciklama}</p>`
                )),

                SECTION("Mendîran Takvimi", "On üç ay, üç ay, bir yıl"),
                splitParas(e.takvim.aciklama),
                H("Aylar"),
                e.takvim.aylar.map((ay, i) => R(
                    `<p><strong>${i + 1}. ${ay.ad}</strong> <em>· ${ay.uzunluk} gün</em>. ${ay.ozellik}</p>`
                )),
                H("Takvim Notları"),
                L(e.takvim.notlar),

                SECTION("Ölçü, Tartı, Para"),
                splitParas(e.olcuTarti.aciklama),
                H("Ölçüler"),
                e.olcuTarti.olcular.map(o => R(
                    `<p><strong>${o.ad}</strong> <em>· ${o.tur}</em>. ${o.aciklama}</p>`
                )),
                H("Hâne Paraları"),
                e.olcuTarti.para.map(p => R(
                    `<p><strong>${p.ad}</strong> <em>· Hâne ${p.hane}</em>. ${p.deger}</p>`
                )),

                SECTION("Mendîran’dan Alıntılar"),
                splitParas(e.alintilar.aciklama),
                e.alintilar.girisler.flatMap(al => build(
                    Q(al.soz),
                    R(`<p style="text-align:right; font-size:0.92em; color:var(--c-ink-quote);">${al.kaynak}</p>`)
                )),

                SECTION("Vakâyiî’nin Dipnotları"),
                splitParas(e.dipnotlar.aciklama),
                e.dipnotlar.notlar.flatMap(n => build(
                    H(n.kaynak),
                    splitParas(n.not)
                ))
            )
        });
    }

    /* Toplam = 16 bölüm */
    NS.totalStories = NS.stories.length;
})();
