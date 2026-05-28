/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — DÜNYA KİTABI
 *  Bu dosya, Mendîran evreninin coğrafyasını, ilk çağlarını,
 *  inançlarını ve siyasi dokusunu tanımlar.
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_DUNYA = {

  evrenAdi: "Mendîran",
  altBaslik: "Yedinci And’ın Çatladığı Diyar",

  acilisMetni: `
    Mendîran adı verilen kara, gökyüzü iki kez boğulmuş, üç kez
    yanmış, yedi kez kendi adını unutmuş bir yerdir. Burada tarih
    bir çizgi değil, üst üste binmiş kül tabakalarıdır. Her tabaka
    bir yeminin bozulmasıyla başlar; her yemin, bir hanedanın
    çöküşüyle kapanır.

    Bu kitabe, sekizinci tabakanın çatlamaya başladığı yıllarda
    yazılmıştır. Çatlağın dibinde uyuyanları kimse adlandırmaz;
    onları yalnız Külbağcıların ezbere bildiği tek bir sözcükle
    anarlar: <em>Sönmeyenler</em>.
  `,

  kitaplarKurali: [
    "İlk kitap, henüz adı olmayan tanrıların kitabıdır; kimse okuyamaz.",
    "İkinci kitap, denizlerin altında kalmıştır; sular her yüzyılda bir sayfa söyler.",
    "Üçüncü kitap, Naerath İmparatorluğu’nun yıkılışında yakılmıştır.",
    "Dördüncü kitap, Külbağcıların hâfızasındadır; her ölümle bir bölümü kaybolur.",
    "Beşinci kitap, hâlâ yazılmaktadır. Sayfaları kıtaların kanıyla doludur."
  ],

  kitalar: [
    {
      id: "asfarend",
      ad: "Asfârend",
      lakap: "Solmuş İmparatorluğun Kıtası",
      konum: "Doğu",
      iklim: "Kışları sert; yazları bozkır kuruluğu; iç bölgeler küle bulanmış.",
      ozellik: `
        Asfârend, bir zamanlar Naerath İmparatorluğu’nun yedi taç
        eyaletini barındırmış olan kıtadır. Bugün, imparatorluğun
        çöküşünden geriye kalan şey; mermerden tapınakların yarısı
        toprağa gömülmüş, yarısı eski ay ışığını yansıtan o sessiz
        siluetlerdir. Hisn-i Sevra’nın bulunduğu kıtadır; ve
        Yedinci And’ın çatladığı yer de orasıdır.
      `,
      onemliYerler: [
        {
          ad: "Hisn-i Sevra",
          tur: "Çapa Hisarı",
          aciklama: "Sönmeyenler’den birinin üzerine kurulmuş altı kuleli kale. Kuzey Asfârend’in dağ omurgasında, kırk yıldır donmuş bir gölün ortasında yükselir."
        },
        {
          ad: "Vâris Şehri",
          tur: "Naerath’ın eski başkenti",
          aciklama: "Hâlâ ayakta, ama nüfusunun üçte ikisi yalnızca hizmetkâr ve hayalet ailelerden ibarettir. Saray, bir tahtın değil, bir boşluğun etrafında dönüyor."
        },
        {
          ad: "Sâkin Vadi",
          tur: "Manastır vadisi",
          aciklama: "Suskun Vasıl’ın doğduğu, sesin yasak olduğu yedi manastırın bulunduğu vadi. Burada konuşmak bir günahtır; düşünmek dahi denetlenir."
        }
      ]
    },
    {
      id: "veyrahal",
      ad: "Veyrahal",
      lakap: "Yeşil Andlıların Kıtası",
      konum: "Batı",
      iklim: "Yıl boyunca yağışlı; sisin orman zeminine yapıştığı, ışığın yaprak yaprak süzüldüğü bir kuşak.",
      ozellik: `
        Veyrahal, Iramen halkının binlerce yıldır yaşadığı katedral-
        ağaçların kıtasıdır. Burada şehirler kurulmaz; ağaçların
        içine yontulur. Hane Asmeyra’nın koruyuculuğunda gelişen
        bu medeniyet, çürümeyi bir suç sayar — fakat ironik biçimde,
        son yıllarda ormanın kalbinde bir çürüme belirmiştir ve
        kimse buna isim vermeye cesaret edemez.
      `,
      onemliYerler: [
        {
          ad: "Asmeyra-Vehd",
          tur: "Iramen başşehri",
          aciklama: "Otuz bin yıllık bir kara kavak ağacının içine yontulmuş; on iki katlı, basamakları bin yıllık kabuktan yapılma. Şehir nefes alır; bazıları gece duyduğunu söyler."
        },
        {
          ad: "Susuz Çayır",
          tur: "Lanetli düzlük",
          aciklama: "Asmeyra-Vehd’in doğusunda, yağmurun düşmediği üç günlük yürüyüş mesafesi. Burada beş yıl önce bir çocuk ordusu öldürülmüştü; o günden beri toprak suyu reddediyor."
        }
      ]
    },
    {
      id: "korsend",
      ad: "Korsend",
      lakap: "Külbağcıların Kıtası",
      konum: "Güney",
      iklim: "Kavurucu yaz, soğuk ve berrak gece; çöl rüzgârı ‘sevr’ adı verilen, ses çıkaran rüzgârdır.",
      ozellik: `
        Korsend, çölün altında bir başka medeniyetin uyuduğu kıtadır.
        Yüzeyde göçebe boylar, kervan şehirleri, tuz havuzları; altta
        ise, hiç güneş görmemiş Sahesh kütüphaneleri, küllerin sözleri,
        ölülerin sayfa sayfa istiflendiği Cam Mahzeni. Külbağ büyüsü
        burada doğmuştur; ve burada her şehrin bir <em>küllükçü</em>’sü,
        her küllükçünün bir karanlığı vardır.
      `,
      onemliYerler: [
        {
          ad: "Saraab-ı Vehd",
          tur: "Çöl başşehri",
          aciklama: "Tuzun altın gibi alındığı, kervanların yılda iki kez geldiği bir vaha-şehir. Surları yoktur; korunması Külbağcıların ezberindeki ölülere bağlıdır."
        },
        {
          ad: "Cam Mahzeni",
          tur: "Yer altı kütüphanesi",
          aciklama: "Yedi yüz yıllık ölü külünün biriktirildiği, içerisinde ‘hâfıza camı’ adı verilen iri amber gibi nesnelerin saklandığı mahzen. Cam, dokunulduğunda fısıldar."
        }
      ]
    },
    {
      id: "tahgar",
      ad: "Tâhgâr",
      lakap: "Demirkanlıların Kıtası",
      konum: "Kuzey",
      iklim: "Sekiz ay kış; iki ay sis; iki ay yarım yaz. Gece, yılın yarısı sürer.",
      ozellik: `
        Tâhgâr, bir kıta değil, bir saplantıdır. Burada hayatta kalan
        her şey ya buza ya da kendisine düşman olmuştur. Brennvar boyları
        kayalara oyulmuş kale-köylerde yaşar; her boy, kendi ölüsüne
        kendi şarkısını ezbere bilir. Külden çok demire, dahi denirse
        kana yakın bir kıtadır. Demirkanlılar adı buradan gelir.
      `,
      onemliYerler: [
        {
          ad: "Brennvar-Hân",
          tur: "Boylar Meclisi’nin kalesi",
          aciklama: "Yirmi yedi Brennvar boyunun yılda bir toplandığı kale. Toplantı odası bir buzul gölünün üzerine kurulmuş, zemin saydam. Altta donmuş bir devin sureti var; kimsenin bilmediği bir şey."
        },
        {
          ad: "Soğuk Ağız",
          tur: "Geçit",
          aciklama: "Tâhgâr’ı Asfârend’e bağlayan, dünyanın her insanına aynı şeyi söyleyen bir geçit: ‘Geri dön.’"
        }
      ]
    },
    {
      id: "velemar",
      ad: "Velemâr",
      lakap: "Tuzlu Tahtlar Denizi",
      konum: "Orta-Güney Sahili",
      iklim: "Ilıman; tuzun rüzgârı yıl boyu kıyıyı yalar; gemiler için ölümcül üç fırtına dönemi.",
      ozellik: `
        Velemâr, bir kıta olmaktan çok bir takımada koleksiyonudur.
        Hane Velivar’ın hükmettiği yedi büyük ada ve onlarca daha
        küçük kayalık ada üzerinde kurulu deniz krallığıdır. Burada
        ticaret bir dindir; ihanet bir mevsim. Velivar kraliçeleri,
        denizle evli sayılır — törende parmaklarına bir damla deniz
        suyu, bir damla kendi kanları akıtılır.
      `,
      onemliYerler: [
        {
          ad: "İncî Tahtı (Saray-ı Velivar)",
          tur: "Başşehir sarayı",
          aciklama: "Yedi yüz yıl boyunca yedi nesil mercanın üzerine inşa edilmiş; med-cezir zamanlarında alt katları sular altında kalır. Salonlar arasında geçişlerde bazen denizyıldızı görülür."
        },
        {
          ad: "Mahn-ı Sevda",
          tur: "Tüccar adası",
          aciklama: "Mendîran’ın en geniş limanı; gemilerin direklerinden duvar yapılır. Her direk bir hâne, her hâne bir borç."
        }
      ]
    },
    {
      id: "vehdar",
      ad: "Vehdâr",
      lakap: "Yer Altı Mirası",
      konum: "Yer altı (Mendîran’ın tamamına yayılmış)",
      iklim: "Sabit ve serin; karanlık.",
      ozellik: `
        Vehdâr, bir kıta değil bir kıtaltıdır. Sönmeyenler’in son
        kez tutsak edildiği günlerde, eski bir halkın — Vasrim — yer
        altına çekilip kayaya oyduğu şehirler ağı. Bugün onların
        torunları, Hane Vehdârin’in çatısı altında yedi yer altı
        şehrini yönetir. Yüzeyle ilişkileri kısıtlıdır; ama Yedinci
        And’ın çatlağına en yakın olanlar onlardır.
      `,
      onemliYerler: [
        {
          ad: "Kûz-i Vehd",
          tur: "Vasrim başşehri",
          aciklama: "Yer altında bir kum saatinin içinde gibi inşa edilmiş şehir; üst ve alt iki yarım küre, ortada yüksek tavanlı meydan. Her yüzyılda bir, yüzeydeki dünya kum saatini ‘çevirir’."
        },
        {
          ad: "Çıplak Kapılar",
          tur: "Yer altı geçidi",
          aciklama: "Vehdâr’ı Hisn-i Sevra’nın bodrum katlarına bağladığı söylenen efsanevi geçit. Yedi yüz yıldır kimse açamamıştır."
        }
      ]
    }
  ],

  inanclar: [
    {
      ad: "Sessiz Tek-Tanrı (Sâkin-i Vâhid)",
      yayilim: "Asfârend, Velemâr",
      ozet: `
        Naerath İmparatorluğu çağında resmî din. Tek bir tanrıya inanır;
        ama bu tanrı konuşmaz, ad almaz, suret kabul etmez. Tapınmak,
        susmaktır. Naerath’ın yıkılışından sonra inanç bölünmüş; Sâkin
        Vasıl tarîkâtı bunun en katı kolu olarak ortaya çıkmıştır.
      `
    },
    {
      ad: "Yeşil And",
      yayilim: "Veyrahal, Iramen halkı",
      ozet: `
        Tanrılara değil, anlaşmalara tapan bir inanç. Asıl kutsal, Iramen
        halkının ormanla yaptığı ilk yemindir — kesilen her ağacın, ölen
        her hayvanın adı bir taşa kazınır. Anlaşmayı bozanın adı silinir.
      `
    },
    {
      ad: "Yedi Kül Sözü",
      yayilim: "Korsend",
      ozet: `
        Külbağcıların felsefe-dini. Tanrılar yoktur; yalnızca biriken
        ölü hâfızası vardır. Ölülerin sözünü tutmak ahlâkın temelidir.
        Yedi söz: anmak, korumak, yakmak, taşımak, susmak, devretmek,
        bırakmak.
      `
    },
    {
      ad: "Demirin Ağzı",
      yayilim: "Tâhgâr",
      ozet: `
        Brennvar boylarının savaşçı inancı. Yalnızca demirin gerçek
        olduğunu söyler — geri kalanı (söz, hâtıra, hatta tanrı) demire
        verilen bir biçimdir. Cenazelerde ölünün elinden son demir
        parçası alınır; o parça, hânenin yeni miras objesi olur.
      `
    },
    {
      ad: "Çevrilmemiş Kum",
      yayilim: "Vehdâr, Vasrim",
      ozet: `
        Vasrim’in yer altı inancı. Dünyanın bir kum saati olduğunu, her
        yüzyılda bir çevrilmesi gerektiğini, çevrilmediğinde Sönmeyenler’in
        uyandığını söyler. Bu inancı ciddiye alan başka kimse kalmamıştır.
      `
    }
  ],

  diller: [
    {
      ad: "Naerathça",
      ozet: "Eski imparatorluğun yüksek dili. Bugün yalnız tören ve hukuki metinlerde kullanılır; konuşan azdır."
    },
    {
      ad: "Iramenî",
      ozet: "Yeşil Andlıların dili; cümleleri ağaç dallanması gibi bölünür. Çevrilmesi zor, şiire elverişlidir."
    },
    {
      ad: "Korsendî",
      ozet: "Çölün dili; çok sayıda boğaz sesi, ‘sevr rüzgârı’nı taklit eden bir tonlama. Yazısı sağdan sola, alttan üste okunur."
    },
    {
      ad: "Brennvarca",
      ozet: "Sert ünsüzlerle yüklü, demir gibi çınlayan bir dil. Yazısı yoktur; her şey ezbere taşınır."
    },
    {
      ad: "Vehdârî",
      ozet: "Vasrim’in yer altı dili. Konuşulurken karanlığa söylenir, asla yüze doğru söylenmez. Yüze söylendiğinde hakaret sayılır."
    },
    {
      ad: "Velivarca",
      ozet: "Deniz tüccarlarının dili. Çoğu kelime borç, faiz, fırtına ve emanet kavramları üzerinden türetilmiştir."
    }
  ],

  kozmoloji: `
    Mendîran’da gök sabit değildir. Geceleri görünen üç ay aslında dönüşümlü
    olarak farklı çağlarda doğmuş, farklı kozmik felâketlerin kalıntısıdır:

    <ul>
      <li><strong>Mahn</strong> — en büyük ay; rivayete göre eski bir kıtanın kalıntısı.</li>
      <li><strong>Sevra</strong> — soluk ay; Sönmeyenler’in son tutsak edildiği gece doğmuştur.</li>
      <li><strong>Veh</strong> — küçük ay; Vasrim’in inancına göre kum saatinin ortasıdır.</li>
    </ul>

    Güneş, “Tek Göz” olarak anılır ve bilinçli olarak adlandırılmaz. Naerath
    çağında ona “Vâhid” (Bir) denilirdi; bu ad bugün küfür sayılır.
  `,

  kuresellGerilim: `
    Mendîran’ın siyasi haritası beş büyük kuvvet ve onlarca uydu hâne
    üzerine kuruludur. Naerath’ın çöküşünden sonra hiçbir hâne tek
    başına kıtaları yönetememiştir. Yedinci And’ın çatlağı haberi,
    bu kırılgan dengeyi tek bir gecede dağıtacak güçtedir — ve hâneler
    bunu sezmektedir.

    Asfârend zayıf ama eskidir; Veyrahal zengin ama içeride çürümeye
    başlamıştır; Korsend, Külbağcıların gücüyle siyasette beklenenden
    daha ağır bir koz tutar; Tâhgâr, savaşa hep hazırdır ama yalnız
    savaşır; Velemâr, ticareti dindir ama her dinin bir kâfiri vardır.
    Vehdâr ise ne ittifak yapar ne yapılır.

    Bu dengenin tek gerçek koruyucusu, kimsenin bilmediği bir yemindir.
    Ve o yemin çatlamıştır.
  `

};
