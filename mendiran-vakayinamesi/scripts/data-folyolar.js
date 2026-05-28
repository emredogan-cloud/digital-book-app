/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — FOLYOLAR
 *  Vitrin folyoları, paylaşılabilir alıntı kartları, karakter
 *  arşiv folyoları, dünya vitrin sayfaları.
 *
 *  Faz 5: cinematic / showcase / brand presentation
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_FOLYOLAR = {

  baslik: "Folyolar",
  altBaslik: "Mendîran Vakayinâmesi · Vitrin Sayfaları",

  acilis: `
    Folyolar, Mendîran Vakayinâmesi’nin çekirdek metnine ek olarak
    derlenmiş vitrin sayfalarıdır. Bir cilt, ana metninden farklı bir
    sesle de konuşabilir: bir paylaşılabilir alıntıyla, bir karakterin
    tek-folyo portresiyle, bir şehrin küçük bir görselleştirilmiş
    haritasıyla. Bu kısımdaki her sayfa, ana metnin bir yansımasıdır;
    onun yerini almaz, onu *paylaşılabilir* hâle getirir.
  `,

  /* ═══════════════════════════════════════════════════════════════════
     TEASER ALINTILAR · paylaşılabilir, 22 adet
     Bir alıntı kartı = (söz + kaynak + tematik etiket + paylaşma izni).
     ═══════════════════════════════════════════════════════════════════ */
  alintilar: [
    {
      soz: "Söylediğim ölmüştür; ölmemiş olan, söylenmez.",
      kaynak: "Babasının infazından önceki son sözü, Ardenya tarafından ezbere alındı.",
      etiket: ["ölüm", "söz", "Külbağ"]
    },
    {
      soz: "Demir konuşur, eti susarız.",
      kaynak: "Brennvar boylar meclisi sloganı, yedi yüz yıllık.",
      etiket: ["Brennvar", "savaşçı", "demir"]
    },
    {
      soz: "Karanlığa söylenen ad ezberlenir; yüze söylenen ad unutulur.",
      kaynak: "Vehdârî dilinin temel selamlaşma kuralı.",
      etiket: ["Vehdârî", "dil", "yer altı"]
    },
    {
      soz: "Kapıyı kapadım, ama içerdeki ağladı.",
      kaynak: "Mehra-vehn-Sevr’in ezbersizden Lethe’ye geçen son cümlesi.",
      etiket: ["Sönmeyenler", "kayıp", "Yedinci And"]
    },
    {
      soz: "Sessizlik dahi bir yemindir.",
      kaynak: "Hâne Naerath sloganı (Naerathça orijinal: Sevr-i nâ-medûd, hâlâ andır).",
      etiket: ["Naerath", "yemin", "sessizlik"]
    },
    {
      soz: "Bir adın iki sahibi olmaz; üç sahibi vardır.",
      kaynak: "Külbağcı çıraklık duvarına yazılı paradoks, Saraab-ı Vehd.",
      etiket: ["Külbağ", "ad", "paradoks"]
    },
    {
      soz: "Kesilen her ad bir yara, taşına bir yemindir.",
      kaynak: "Iramen Asmeyra-Vehd taş kâtibesi şarkısından bir mısra.",
      etiket: ["Iramen", "yas", "Yeşil And"]
    },
    {
      soz: "İyileşmemek, bir biçim gerektirir.",
      kaynak: "Vellan ehl-i Naerath, And-Taşıyıcı, VS 1250 konuşmasından.",
      etiket: ["Vellan", "And-Taşıyıcı", "biçim"]
    },
    {
      soz: "Ben otuz yıldır seni duyuyorum, ve duymak unutmamaktır.",
      kaynak: "Khovan ehl-i Vehdârin, Çıplak Kapılar önünde ilk cevabı (Sonsöz VI).",
      etiket: ["Khovan", "Vehdâr", "Sönmeyenler"]
    },
    {
      soz: "İki çocuğum öldü. Adları taşa kazılıdır. Adlarını ezberden de tutuyorum.",
      kaynak: "Brennar Asmeyra’nın Asmeyra-Vehd taşına kazıttırdığı son cümle.",
      etiket: ["Brennar", "yas", "Yeşil And"]
    },
    {
      soz: "Sen yedi yüzü taşıdığını sanmıyordun, sen yedi yüzü taşıdığını biliyordun. O farkı kaybettin.",
      kaynak: "Bir han avlusunda Hossen’e konuşan eski bir Velemâr çıkartması gazisi.",
      etiket: ["Hossen", "Brennvar", "kayıp"]
    },
    {
      soz: "Sen kendi ezberini sahiplen.",
      kaynak: "Vey’in beş yaşındaki kız kardeşine son cümlesi, Sahesh çadırında.",
      etiket: ["Lethe", "Sahesh", "ezber"]
    },
    {
      soz: "Anlamsız geçit, ama bir geçit.",
      kaynak: "Vellan ehl-i Naerath, Vâris doğu bahçesinde, Velivar damlasının ardından.",
      etiket: ["Vellan", "Imira", "Velivar"]
    },
    {
      soz: "Ben senin yanında değildim çünkü Anhura bana bir şey öğretti — bir abla, küçük kardeşinin kendini seçmesine izin vermez.",
      kaynak: "Imira Velivar, Sonsöz IV, And-Taşıyıcı’ya yedi yıl sonra.",
      etiket: ["Imira", "abla", "seçim"]
    },
    {
      soz: "Yedinci mum söndüğünde, sekizinci bir başkası yakacak.",
      kaynak: "Sâkin Vasıl, yedinci defterinin yedinci cümlesi (postuma).",
      etiket: ["Suskun Vasıl", "yedi mum", "geçiş"]
    },
    {
      soz: "Mendîran’ı kapatmıyorum. Sönmeyenler’i dışarıda bırakmıyorum. Bir kapı açıyorum — kendi içime.",
      kaynak: "Vellan’ın Yedinci And’ı yenilerken söylediği imza-cümlesi, Hisn-i Sevra.",
      etiket: ["Vellan", "Yedinci And", "ritüel"]
    },
    {
      soz: "Bir göz kapanırken bir başka göz açılır.",
      kaynak: "Sahesh kuşak geçiş atasözü, Lethe’nin Vehd’e devretmek töreni.",
      etiket: ["Sahesh", "kuşak", "ezber"]
    },
    {
      soz: "Sen Sahesh değilsin artık.",
      kaynak: "Sahesh büyüklerinin Lethe’ye yolladığı üç kelimelik mektup.",
      etiket: ["Sahesh", "Lethe", "kimlik"]
    },
    {
      soz: "Tarih, kendini tekrarladığında, bir tek değişiklikle tekrarlar.",
      kaynak: "Sâdir-i Lâ’is, Vâris Sarayı yedi kâtibesinin sonuncusu, VS 920 saray kayıtları.",
      etiket: ["tarih", "Naerath", "Kanlı Düğün"]
    },
    {
      soz: "Söylediğin söz, bir kapıyı hem kapatabilir hem açabilir; kapanacak ya da açılacak kapıyı seçen, sen değil, sözün yankısıdır.",
      kaynak: "Sâkin Vasıl tarîkâtı manastır ezberi, çocuklara ilk öğretilen kural.",
      etiket: ["manastır", "söz", "yankı"]
    },
    {
      soz: "Sen ölmedin, Sehrad-Velrhin Demirsen. Ama ölmediğin için bir ad olarak da geçemem ezberime. Sen bir başka şeysin: uyutulan.",
      kaynak: "Hossen’in yatakta uyumayan muhafızı geride bırakmadan önceki fısıltısı.",
      etiket: ["Sönmeyenler", "Hossen", "uyutulan"]
    },
    {
      soz: "Bir cilt, kendini açtığı sayfayla okuruna borçlu olur.",
      kaynak: "Kitabe Hakkında, Faz 4 imza alıntısı.",
      etiket: ["okur", "cilt", "borç"]
    }
  ],

  /* ═══════════════════════════════════════════════════════════════════
     KARAKTER FOLYOLARI · 8 ana karakter, arşiv-folyo formatı
     Her folyo: sigil + alıntı + sıfat + hâne + sembolik motif +
     atmosferik biyografi. RPG stat kart değil — bir saray kâtibesinin
     yedi cümlede yazabileceği özet.
     ═══════════════════════════════════════════════════════════════════ */
  karakterFolyolari: [
    {
      id: "vellan",
      ad: "Vellan ehl-i Naerath",
      sifat: "And-Taşıyıcı · Yedinci Mumun Fitili",
      hane: "Hâne Naerath",
      yedinciYas: 19,
      sigilSimgesi: "❦",
      motif: "Bir kapının her iki tarafı",
      tematikRenk: "naerath",
      taşıyanAlıntı: "İyileşmemek, bir biçim gerektirir.",
      biyografi: `
        Beş yaşında Vâris Sarayı’ndan çıkarıldı, yerine bir başka çocuk
        — Sevran — öldürüldü; on dört yıl Sâkin Vadi manastırının yedi
        salonunda sessizliği öğrendi. Yedi yaşında, Suskun Vasıl ona
        yerine ölen çocuğun adını verdi: ‘adı taşı; karar verme; şimdi
        karar verme.’ Vellan, yıllarca o adı kendi adının olması
        gereken yere yerleştirdi.

        VS 1247’de manastır kapısı açıldığında konuşmayı yeniden
        öğrenmek zorunda kaldı. On dokuz yaşında Hisn-i Sevra’nın
        donmuş gölünde Yedinci And’ı yenileyen sözü söyledi. O
        günden sonra içinde bir başka nefes, bir başka söz, bir
        başka çocuğun yorgunluğu durmaya başladı.

        İçindeki uyuyana yedi yıl sonra bir ad verdi. Adı kabul etti.
        Adı yüksek sesle henüz söylemedi.
      `
    },
    {
      id: "imira",
      ad: "Imira Velivar",
      sifat: "Vâris’te Üç Yıl Susan, Sonra Bir Avlu Tuzu Sayan",
      hane: "Hâne Velivar",
      yedinciYas: 23,
      sigilSimgesi: "✶",
      motif: "Avlu taşındaki tuz tortusu",
      tematikRenk: "velivar",
      taşıyanAlıntı: "Bugün, ilk kez, kendi seçimimi yapıyorum.",
      biyografi: `
        Anhura Velivar’ın küçük kız kardeşi; on yedi yaşında kuzeni
        Tehran’ın boğdurulduğu odada bulundu; o günden sonra ablasını
        bir mesafenin arkasından izledi. Yirmi yaşında Vâris’e
        rehine-prenses olarak gönderildi; üç yıl boyunca Anhura’ya
        mektuplar yolladı, ama mektupların yarısı bir başka karara
        yaslanmaya başladı.

        VS 1247’de Korsend’ten getirttiği Tehran’ın küllüğünü konak
        avlusunun gizli bir oyuğuna gömdü. Aynı gece bir Velivar tuz
        hesabıyla — ne fazla ne az on altı taneyle — Hossen Brennvar’a
        ablasının yedi yüzünden çıkardığı on altı kişinin borcunu
        verdi.

        Yedi yıl sonra Vellan’ın yanında, Velivar soyadını bıraktığını
        söyledi. Yeni adını henüz seçmedi.
      `
    },
    {
      id: "ardenya",
      ad: "Ardenya Korsend",
      sifat: "Yedi Hâfıza Camı Taşıyıcısı · Sürgün Külbağcı · Bey",
      hane: "Hâne Korsend",
      yedinciYas: 27,
      sigilSimgesi: "☉",
      motif: "Yedinci camda söylenmemiş bir ad",
      tematikRenk: "korsend",
      taşıyanAlıntı: "Söylediğim ölmüştür; ölmemiş olan, söylenmez.",
      biyografi: `
        Babası Külbağcı, annesi Sahesh; iki halk arasında hiç tam
        evi olmayan bir kız. Babası VS 1244’te bir hâne kararıyla
        Saraab-ı Vehd’in kuyu çukurunun başında infaz edildi; üç
        yaşındaydı değil, on dokuzunda. Üç gün boyunca bir mağarada
        babasının adını yüksek sesle söylemeden ezbere taşıdı.

        Üç yıl sürgün, yedi hâfıza camı, ve bir gece — Sevr Rüzgârının
        içinde — Mehra-vehn-Sevr’in adını söyledi. O söyleyiş Külbağ’ın
        yedinci bağlanmasıydı; çıkamaması gereken kademeden sağ
        çıktı.

        Bedelini yedi yıl içinde annesinin yüzünü unutarak ödedi.
        VS 1259’da Hâne Korsend’in bey’i seçildi; ilk işi yedi yüz
        yıldır tanınmayan Sahesh’i Korsend arşivine yazdırmak oldu.
      `
    },
    {
      id: "brennar",
      ad: "Brennar Asmeyra",
      sifat: "Iramen Bey’i · İki Çocuk Kaybetmiş Adam · Geç Kazıyan",
      hane: "Hâne Asmeyra",
      yedinciYas: 51,
      sigilSimgesi: "❋",
      motif: "Yedi yıl gözenekte çürüyen bir kavak yaprağı",
      tematikRenk: "asmeyra",
      taşıyanAlıntı: "Adlarını ezberden de tutuyorum. İkisi birbiriyle çelişmez.",
      biyografi: `
        Otuzunda Iramen bey’i oldu. Üç yıl sonra iki çocuğu — Vehna
        sekiz, Ardan altı — Veyrahal ormanının derinliğinde kayboldu;
        üç hafta sonra geri döndüklerinde başka çocuklardı. Üç ay
        sonra uyumadan öldüler. Brennar beş yıl boyunca adlarını
        taşa kazıttırmayı reddetti.

        VS 1247’de Hisn-i Sevra’nın donmuş gölünde, Hossen’in atamadığı
        bir demiri Brennar attı. Sonra geri döndü, ad-kazıma kararını
        verdi. Yedi yıllık emekliliğinin üçüncü yılında bir kuru
        kavak yaprağı kabuk-evinin kapısına düştü — Sehna’nın
        yaşadığını adresleyen tek belge.

        Asmeyra-Vehd tarihinde ölmeden bey’likten inen ilk Iramen
        bey’i oldu. Son sözü yazılı, taşa kazılı.
      `
    },
    {
      id: "hossen",
      ad: "Hossen Brennvar",
      sifat: "Bin Yedi Yüz Adın Bekçisi · Hâne Bey’i",
      hane: "Hâne Brennvar",
      yedinciYas: 44,
      sigilSimgesi: "⚔",
      motif: "Donmuş gölde batmayan bir demir",
      tematikRenk: "brennvar",
      taşıyanAlıntı: "Demir, demire dokunmayan elden çıkmaz.",
      biyografi: `
        Velemâr çıkartmasına bin yedi yüz savaşçıyla gitti; hâne
        kaydı yedi yüz olarak yazdı. On beş yıl boyunca her gece
        gece yarısı bin yedi yüzüncü adı söyleyip ‘ölülerin nefesi’
        süresince susmaya başladı.

        VS 1247’de Brennvar-Hân’ın donmuş gölünden ‘dev’ konuştu;
        aynı gece muhafızı Sehrad-Velrhin Demirsen yatağında
        uyanmaz oldu. Hossen onu geride bıraktı, Vâris’e yola çıktı.
        Yolda bir ihtiyar gazi ona söyledi: ‘Sen taşımıyorsun, sen
        onların kendisi olarak yaşıyorsun.’

        Hisn-i Sevra’da yedi demirin birini atamadı; Brennar yerine
        attı. Sonsöz II’de buz gölünün altındaki devin diliyle bin
        yedi yüz adı yeniden okudu, sonra öldü. Demiri bir yeğenin
        bileğinde, hâne duvarında değil.
      `
    },
    {
      id: "lethe",
      ad: "Lethe",
      sifat: "Sahesh Hâfıza Tutucusu · Ezbersiz · Sonra Ezbersiz Değil",
      hane: "Sahesh Mecmûası",
      yedinciYas: 30,
      sigilSimgesi: "❀",
      motif: "Sol gözde kapanan bir çatlak",
      tematikRenk: "sahesh",
      taşıyanAlıntı: "Otuz yaşındayım, ve ilk kez ezberim boş.",
      biyografi: `
        Beş yaşında, ölüm yatağında kız kardeşi Vey’in yedi yıllık
        ezberini aldı; annesinin izniyle, ama kendi rızası
        sorulmadan. Yirmi beş yıl boyunca o ezberi taşıdı; sol
        gözündeki çatlak büyürken delirmeyen az sayıdaki üçüncü
        kuşak Sahesh’ten biri oldu.

        VS 1247’de Sevr Rüzgârının içinde Mendîran’a yürüdü. Vâris’te
        Yedinci And’ı imzalayan üçlünün Sahesh tarafı oldu. Hisn-i
        Sevra’da ezberinin üçte birini Ardenya’ya, üçte birini
        Vellan’a devretti.

        VS 1258’de bir yedi yaşındaki çocuğa — Vehd — Vey’in son
        cümlesini aktardı; ertesi sabah sol gözündeki çatlak ilk
        kez kapandı. Sahesh büyükleri ona üç kelimelik bir mektup
        yolladı: <em>Sen Sahesh değilsin artık.</em> Yırtmadı.
      `
    },
    {
      id: "khovan",
      ad: "Khovan ehl-i Vehdârin",
      sifat: "Çıplak Kapılar’ın Bekçisi · Bey’likten İnen İlk Vehdârî",
      hane: "Hâne Vehdârin",
      yedinciYas: 58,
      sigilSimgesi: "⌛",
      motif: "Bir kapının önünde duran küçük ev",
      tematikRenk: "vehdar",
      taşıyanAlıntı: "Ben otuz yıldır seni duyuyorum, ve duymak unutmamaktır.",
      biyografi: `
        Yedi yaşında Çıplak Kapılar önünde bir saat dururken bir ses
        duydu: ‘Ben unutuldum mu?’ Otuz yıl boyunca cevap veremedi.
        Otuz yaşında bey oldu; bin yıllık ‘yüzeyle temas etme’
        politikasını sürdürdü.

        VS 1247’de Yedinci And imzalanırken Hisn-i Sevra’ya yer altı
        geçidinden ilk yüzeye çıkan kız kardeşi Vehna ile geldi. Üç
        yıl sonra bey’liği Vehna’ya bıraktı; Vehdâr’dan ayrılmadan
        Çıplak Kapılar önünde yarı-toprak yarı-yüzey bir eve geçti.

        Bir gece sonra ses geri geldi. Khovan ilk kez karanlığa
        cevap verdi. Otuz yıllık bir bekleyiş, bir cümle ile kapandı —
        ama açık kaldı. Vehna ayda bir kez ona yüze konuşmaya gelir.
      `
    },
    {
      id: "vehna",
      ad: "Vehna ehl-i Vehdârin",
      sifat: "Yüzeye Çıkan İlk Vehdârî Bey · Khovan’ın Kız Kardeşi",
      hane: "Hâne Vehdârin",
      yedinciYas: 49,
      sigilSimgesi: "❖",
      motif: "Yüze söylenen bir ‘Vehna’",
      tematikRenk: "vehdar",
      taşıyanAlıntı: "Otuz yıldır seni bey olmaya zorluyorum.",
      biyografi: `
        Yer altında doğdu, yer altında büyüdü; Vehdârî olmayan tek
        özelliği, bir karar verene karar veren ölçüsü oldu. Üç yıl
        boyunca kardeşi Khovan’ı And’ın imzalanışı sırasında yüzeye
        çıkmaya zorladı; karar gelmeyince kendisi çıktı.

        Hisn-i Sevra’nın donmuş gölünde, Lethe’nin gözüne ilk
        bakarken Vehdârî tabuyu kasten çiğnedi: yüze, karanlığa
        değil. Bu, Vehdâr halkının yüzyıl içinde değişeceğinin ilk
        somut sahnesiydi.

        VS 1255’te kardeşinden bey’liği aldı. Vehdâr halkına bey’in
        yüzeye değil eşiğe geçtiğini söylediğinde, halk kuralın
        dışında olmadıklarını, kuralın altında bir başka kural
        bulduklarını öğrendi.
      `
    }
  ],

  /* ═══════════════════════════════════════════════════════════════════
     DÜNYA VİTRİN SAYFALARI · 6 lokasyon
     Her biri kısa atmosferik bir poster.
     ═══════════════════════════════════════════════════════════════════ */
  dunyaFolyolari: [
    {
      ad: "Vâris Şehri",
      yer: "Asfârend, Naerath’ın eski başkenti",
      ikon: "❦",
      kisaTanim: "Yedi yüz yıllık bir imparatorluğun gölgesi — Naerath sarayı hâlâ ayakta, ama nüfusunun üçte ikisi hizmetkâr ve hayalet aileler. Mum dumanının tavanın paslı sıvası altında dağıldığı bir kent.",
      atmosferik: "“Sessizlik dahi bir yemindir. Vâris’in her duvarı bu cümleyi taş gibi taşır.”"
    },
    {
      ad: "Brennvar-Hân",
      yer: "Tâhgâr, donmuş gölün üstünde",
      ikon: "⚔",
      kisaTanim: "Kale duvarlarına serpilmiş demir kırıntıları ve donmuş gölün altında yedi yüz yıldır kıpırdamayan bir devin sureti. Brennvar boylarının yirmi yedi salonu, kanın sayıldığı yer.",
      atmosferik: "“Buz çatlamadan önce, sayılan yalnızca demir tozudur.”"
    },
    {
      ad: "Saraab-ı Vehd",
      yer: "Korsend çölü, Külbağcıların evi",
      ikon: "☉",
      kisaTanim: "Surları olmayan bir vâha-şehir; rüzgâr, Külbağcıların ezberindeki ölülerin nefesiyle yatışır. Altında, Sevr Rüzgârında fısıldayan Cam Mahzeni uzanır.",
      atmosferik: "“Kül kıymetlidir burada, çünkü kül adlandırılırsa kayıt olur, adlandırılmazsa kaybolur.”"
    },
    {
      ad: "Asmeyra-Vehd",
      yer: "Veyrahal, otuz bin yıllık kara kavağın içinde",
      ikon: "❋",
      kisaTanim: "On iki katlı, dalları kabuklarıyla yontulmuş bir kent; duvarları canlıdır, yaz sonunda yeşilden bal sarısına döner. Yeşil And’ın taşı, üç asırdır kazınan binlerce adı taşır.",
      atmosferik: "“Adı kazınmayan bir ölü, silinmeye razıdır.”"
    },
    {
      ad: "İncî Tahtı",
      yer: "Velemâr, yedi nesil mercanın üzerinde",
      ikon: "✶",
      kisaTanim: "Tuzlu rüzgârda büyümüş bir saray. Avlu taşları yıllar içinde Velemâr tuzunu emer, köşelerde ince bir beyaz tortu bırakır; süpürdükçe iz daha derine işler. Velivar kraliçeleri denizle evli sayılır.",
      atmosferik: "“Tuz, denizin ezberidir. Tuzu sayan kraliçe, denizi sayıyor sanır.”"
    },
    {
      ad: "Kûz-i Vehd",
      yer: "Vehdâr, bir kum saatinin içinde",
      ikon: "⌛",
      kisaTanim: "Yer altı kayasından bir kum saati hâlinde yontulmuş şehir. Tavanlarda ıslak taşın alçakgönüllü pası; lambalar, kum tanesinin akrabası. Selâm karanlığa yapılır, yüze değil.",
      atmosferik: "“Bir gün kapı açılırsa, açılan biz değiliz; kapı bizi tutar.”"
    }
  ]
};
