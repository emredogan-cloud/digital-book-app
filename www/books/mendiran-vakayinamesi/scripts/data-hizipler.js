/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — HÂNELER KODEKSİ
 *  Altı büyük hâne; her biri için değerler, mimari, ritüel, askerî
 *  yapı, din, iç çatışma ve ekonomik düzen.
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_HIZIPLER = {

  baslik: "Hâneler Kodeksi",
  altBaslik: "Yedinci And’ı Hâlâ Taşıyan Altı Omuz",

  acilis: `
    Mendîran’da “hâne” sözcüğü hânedan, ev, sülale ve sığınak anlamlarını
    aynı anda taşır. Bir hânenin gücü, taşıdığı kanın yaşıyla değil; ne
    kadar süredir başka bir hâneye sığınmadığıyla ölçülür. Altı büyük
    hâne, Naerath’ın çöküşünden bu yana birbirini ne tam tanır, ne tam
    devirmeyi göze alır.
  `,

  haneler: [
    {
      id: "naerath",
      ad: "Hâne Naerath",
      lakap: "Söylenmemiş İmparatorların Hânesi",
      konum: "Asfârend / Vâris Şehri",
      arma: "Yedi yıldızlı sönmüş bir taç; arkasında kırılmış bir kılıç. Renkler: kararmış altın, soluk eflatun.",
      sloganHal: "‘Sessizlik dahi bir yemindir.’ Naerathça orijinal: <em>Sevr-i nâ-medûd, hâlâ andır.</em>",
      degerler: [
        "Suskun otorite — emir vermek yerine, emrin verilmiş olduğunu hissettirmek.",
        "Saf kan kavramı; ama bu kavram artık bir özlem, bir korkudur, gerçek değildir.",
        "Geleneğin korunması; çünkü gelenek olmadan hânenin elinde başka hiçbir şey yoktur."
      ],
      mimari: `
        Vâris Şehri’nin sarayları, hep aynı kuralla inşa edilmiştir: her oda
        bir önceki odadan biraz daha karanlık olmalı. Tahta yaklaştıkça
        ışık azalır; tahtın üzerinde tek bir mum vardır ve onu yakma hakkı
        yalnızca tahtta oturanındır. Saray dışındaki Naerath malikâneleri
        ise zarif fakat dökülmektedir; örtüler eski ipekten, kapı kolları
        oyma fildişinden, ama her şey bir yüzyıllık tozun altındadır.
      `,
      ritueller: [
        "Taç Susuşu — yeni imparator (ya da artık dük) taç gününde bir tam gün konuşmaz; konuşursa makamı reddetmiş sayılır.",
        "Yedi Mum Anısı — her yıl yedinci ayın yedinci gecesi, kayıp imparatorlar için yedi mum yakılır; her mum bir ay yanar. Sönerse büyük uğursuzluktur.",
        "Vasf Töreni — saray hizmetkârları yıllık törende, imparatorun adını ezberlemediklerine dair yemin eder. Bu, devlet sırrını korumanın eski bir simgesidir."
      ],
      askerYapisi: `
        Hâne Naerath’ın doğrudan askeri yoktur. Bunun yerine yedi dukalığa
        ‘taç hakkı’ adı altında bağışlar dağıtır; bu bağışlar karşılığında
        her dukalık belirli sayıda asker tutmakla yükümlüdür. Pratikte
        dukaların yalnızca üçü bu yükümlülüğü gerçekten yerine getirir.
        Saray, kişisel olarak yalnızca ‘Gri Muhafız’ adı verilen üç yüz
        kişilik bir birliğe sahiptir; bunlar, konuşmadan dövüşen sessiz
        savaşçılardır.
      `,
      din: "Sessiz Tek-Tanrı, fakat saray içinde mistik bir versiyonu: tanrının ‘çekildiği’ inancı. Tanrı çekilmiştir, geri dönmeyecektir; ama saray, sanki dönecekmiş gibi davranmaya devam eder.",
      icCatisma: `
        Hâne Naerath’ın resmî soy hattı VS 920’de Kanlı Düğün’de kesilmiştir.
        Bugün ‘imparator naibi’ unvanını taşıyan kişi, kuzen-kuzen evliliklerle
        sürdürülmüş zayıf bir koldur. Sarayda her şey bir gerçeği gizler:
        meşru vâris yoktur. Hâne içinde üç klik vardır:

        <ul>
          <li><strong>Soluk Klik</strong> — naibe sadakatte ısrar eden, çürümeyi gizleyen yaşlı saraylılar.</li>
          <li><strong>Kaynaksız Klik</strong> — yeni bir vâris arayan, gizli ajanlar göndermeye başlamış olan orta kuşak.</li>
          <li><strong>Çıplak Klik</strong> — saray çevresinde dolaşan, hânenin tasfiyesini ve bir cumhuriyet türü kurmayı isteyen az sayıdaki radikal aydın.</li>
        </ul>

        Vellan’ın varlığının ortaya çıkması, üç klikten ikisine umut, birine
        ölüm fermanı demektir.
      `,
      ekonomi: "Tarım ve dukalık vergileri. Saray hızla yoksullaşıyor; son üç yılda Vâris’in mücevher koleksiyonunun beşte biri Velemâr’a borçlanma karşılığı yollanmıştır."
    },

    {
      id: "asmeyra",
      ad: "Hâne Asmeyra",
      lakap: "Yeşil Andlıların Hânesi",
      konum: "Veyrahal / Asmeyra-Vehd",
      arma: "Yedi yapraklı bir kavak yaprağı, ortasında bir göz. Renkler: koyu yeşil, kemik beyazı, ağaç kabuğu kahvesi.",
      sloganHal: "‘Kesilen her ad bir yara, taşına bir yemindir.’ Iramenî orijinal: <em>Nehd-asmaya, gehd-asmî.</em>",
      degerler: [
        "Ölünün adının ezberden silinmemesi. Bir Iramen için adın unutulması, ölümden ağırdır.",
        "Ormanın bir taraf olduğu fikri. Hane Asmeyra, ormanı bir kaynak değil bir antlaşmalı eş olarak görür.",
        "Çürümenin yasaklığı. Çürüyenle barışmak değil, çürüyeni adlandırıp ayırmak gerekir."
      ],
      mimari: `
        Asmeyra-Vehd’in tamamı, otuz bin yıllık tek bir kara kavağın içine
        oyulmuştur. Şehirde sokak yoktur; köprüler, dallar, yontulmuş iç
        koridorlar vardır. Hâne malikânelerinin duvarları canlıdır — yaz
        sonunda yeşilden bal sarısına döner. Her duvara, üç asırdır
        kazınmış binlerce ad işlenmiştir; bunlar Yeşil And’ın kâtipleri
        tarafından her yıl gözden geçirilir.
      `,
      ritueller: [
        "Adın Taşa Geçirilmesi — ölen herkesin adı, ölümünden bir yıl sonra şehir taşlarından birine kazınır. Sonsuz mermer kütüğü, her ölüm için yeni bir taş kabul eder.",
        "Yaprağın Bağışı — yeni doğan her çocuğa, ailesinin Asmeyra ağaç-evi içinden bir yaprak armağan edilir. Yaprak kuruyana kadar saklanır; kuruyunca çocuk reşit sayılır.",
        "Susuz Çayır Yası — VS 1142’den beri her yıl, kaybolan çocuklar için Susuz Çayır’a yedi gün gidilir. Bu süre içinde su içmek yasaktır."
      ],
      askerYapisi: `
        Yeşil Mızraklar adı verilen iki bin kişilik daimi muhafız; ormanı
        bildikleri kadar başka kimsenin bilmediği bir savaşçı sınıf. Tamamen
        ok ve mızrak kullanır; hiçbir Iramen Yeşil And’a göre ‘kılıçla’
        öldürmez (kılıç, Naerath’ın silahıdır ve yabancıdır). Komutanlık,
        Hane Asmeyra bey’ine bağlıdır; bey, savaşa giderse onsekiz iz
        sürücü ile yola çıkar.
      `,
      din: "Yeşil And. Tanrı yok; antlaşma var. Bir ağaç kesilirken adı söylenir; söylenmeden kesilirse o ağacı kesen üç ay konuşmaz.",
      icCatisma: `
        Hâne Asmeyra’nın bey’i Brennar, beş yıl önce iki çocuğunu çürümeye
        kaptırmıştır. O günden bu yana, ‘çürümeyi adlandırma’ konusunda
        diğer büyüklerle anlaşamamaktadır. Brennar, çürümenin Yedinci
        And’la ilgili olduğunu sezmektedir; ama Yeşil And’ın hatipleri
        bunu reddeder, çünkü Yedinci And’ı bilmek Iramen için bir ihanet
        olur — onlar yalnız kendi andlarına inanır. Brennar bu yüzden
        gittikçe yalnızlaşmaktadır.
      `,
      ekonomi: "Ağaç-ev ürünleri, baharat, nadir reçineler, ‘yaşayan ipek’ adı verilen bir tür kumaş. Velemâr ile sıkı ticari ilişki; Asfârend ile mesafeli ve ihtiyatlı."
    },

    {
      id: "korsend",
      ad: "Hâne Korsend",
      lakap: "Külbağcıların Hânesi",
      konum: "Korsend / Saraab-ı Vehd",
      arma: "Beyaz bir küle bürünmüş bir göz; etrafında yedi nokta. Renkler: kül grisi, çöl bakırı, kan kırmızı.",
      sloganHal: "‘Söylediğimiz, ölmüştür; ölmemiş olan, söylenmez.’ Korsendî orijinal: <em>Saht-vehd, vehd-saht.</em>",
      degerler: [
        "Hâfıza ahlâkın temelidir. Söz veren ölü, sözünü tutar; söz veren diri, çoğu zaman tutmaz.",
        "Külün bir kayıt değil, yaşayan bir varlık olduğu inancı.",
        "Saray-mistik dengesi: hâne bey’i hem siyasi liderdir, hem külbağcıdır. Bu, başka hiçbir hânede yoktur."
      ],
      mimari: `
        Saraab-ı Vehd, kalın taş duvarları olmayan, ama içine girildiğinde
        rüzgârın aniden kesildiği bir şehirdir. Bunun sebebi, şehrin altında
        gömülü olduğu söylenen Cam Mahzeni’nin ‘ses yutması’dır. Şehrin
        sokakları kavisli; çünkü bir Külbağcı’ya göre doğru çizgi, ölünün
        çekildiği yöndür ve ölü asla düz çekilmez. Hâne sarayı, içinde
        yedi avlu olan bir labirenttir; her avluya farklı bir küllükçü
        soyu kaydolur.
      `,
      ritueller: [
        "Külün Devredilmesi — Külbağcı öldüğünde, ezberindeki bütün ölülerin külleri başka bir Külbağcı’ya devredilir. Devralan, üç ay içinde adları öğrenmediyse, küller ‘kayıp’ ilan edilir.",
        "Yedi Söz Yemini — Külbağcı çıraklığı yedi söz üzerine kuruludur: anmak, korumak, yakmak, taşımak, susmak, devretmek, bırakmak. Çırak, her söz için bir yıl bir tek küle hizmet eder.",
        "Sevr Rüzgârı Töreni — yılda bir kez, çöl rüzgârı geldiğinde, hâne bey’i çıplak ayakla rüzgârın içine yürür; ölülerin çağırdığını söylediği şeyi yedi gün boyunca tek bir cümleyle özetler."
      ],
      askerYapisi: `
        Asker değil, ‘kervan koruyucusu’ vardır. Üç bin kişilik küçük ama
        son derece etkili göçebe süvari sınıfı; çölü harita yerine kül
        kokusuyla okur. Bunun ötesinde Külbağcıların kendisi ‘gizli silah’
        sayılır: birkaç Külbağcı, savaş alanına ezberindeki ölülerin
        anılarını taşır ve bunlar düşmana panik, kararsızlık, hatta
        kendi geçmişlerinin sahte hatırlanışı olarak yansır.
      `,
      din: "Yedi Kül Sözü. Tanrılar yoktur; ölüler vardır, ölüler tanrı yerine geçer ama kutsal değildir, sadece sözlüdür.",
      icCatisma: `
        Hâne Korsend’in iç yarası, ‘Sahesh’ sorunudur. Sahesh halkı bir
        zamanlar Korsend’in göçebe kollarındandı; ama VS 1003’teki ikinci
        külbağcı tasfiyesinde, hânenin onları ‘kayıt-dışı’ ilan edip yalnız
        bırakmasıyla küstüler. Bugün Sahesh memurları yedi nesildir hâne
        ile resmî ilişki kurmaz. Ardenya, hâne içinde Sahesh’le yeniden
        yakınlaşmayı isteyen tek kişidir; bu yüzden sürgün edilmiştir.
        Hâne’nin yaşlı yedi bey’i, Sahesh’i affetmek için ‘kıyamete kadar’
        bekleyeceklerini söylemektedir.
      `,
      ekonomi: "Tuz, baharat, ‘hâfıza camı,’ ölü tezkiyesi (vasiyetli ölülere bedel karşılığı ezber hizmeti). Velemâr ile karmaşık ilişki; Brennvar ile neredeyse hiçbir ticaret yok."
    },

    {
      id: "brennvar",
      ad: "Hâne Brennvar",
      lakap: "Demirkanlıların Hânesi",
      konum: "Tâhgâr / Brennvar-Hân",
      arma: "Buzdan bir kalkan, üzerinde dövülmüş bir el. Renkler: demir grisi, kar beyazı, eski kan koyusu.",
      sloganHal: "‘Demir konuşur, eti susarız.’ Brennvarca orijinal: <em>Çar-rhend, et-vahn.</em>",
      degerler: [
        "Demirin gerçekliği. Söz, kanun, hatta yemin; hepsi demire dönüştürülmedikçe gerçek değildir.",
        "Hâne içi dayanışma; ama hâne dışı kimseye merhamet yoktur.",
        "Ölünün son demirinin hânede kalması. Bu, hânenin ruhudur."
      ],
      mimari: `
        Brennvar-Hân, dağa oyulmuş yirmi yedi salonun toplamıdır. Her
        salon, yirmi yedi Brennvar boyundan birine ait. Salonlar yedi
        ayrı seviyede; en alttaki salon, hânenin ataları için. Mimari
        süslemesi yok denecek kadar azdır; süs, ölünün demirinin duvara
        gömülmesiyle yapılır. Bir Brennvar salonunun duvarındaki demir
        miktarı, o boyun yaşıdır.
      `,
      ritueller: [
        "Demirin Alınması — ölen savaşçının elinden son demir parçası (genelde bıçak, bilezik ya da nal) alınır; ailesinin salonuna gömülür.",
        "Buzun Yarılması Töreni — her yıl sekizinci ayın sonunda Brennvar-Hân’ın altındaki buz gölü ritüel olarak yarılır. Yarılan buzun altında ‘bir şey’ vardır ve görüldükten sonra herkes susar.",
        "Kanın Sayılması — Bey’in cülusunda, hânenin yaşayan tüm savaşçıları sırayla bir damla kanı buz gölüne damlatır. Damla donduğunda Bey ‘kabul’ edilmiş sayılır."
      ],
      askerYapisi: `
        Tüm Brennvar nüfusu, savaşçı olarak doğar. Daimî ordu yoktur;
        ama bir günde otuz bin savaşçı toplanabilir. Komutanlık parçalıdır:
        boylar kendi savaş şefini seçer; hâne bey’i ortak komutadır.
        Disiplin sıkıdır; ama emirler yazılı değil, demirden işaretlerle
        verilir. Brennvar süvarisi kısıtlıdır (Tâhgâr at için kötü bir
        kıtadır); piyade ise dünya çapında saygın.
      `,
      din: "Demirin Ağzı. Tanrı yoktur; demir vardır. Söz, demir bulamayan ruhun çığlığıdır.",
      icCatisma: `
        Hâne bey’i Hossen Brennvar, son Brennvar seferinde (VS 1232, Velemâr
        adalarına yapılan başarısız çıkartma) emir altındaki bin yedi yüz
        savaşçıyı kaybetmiştir. Kayıpların büyük kısmı çıkartmanın yanlış
        sahile yapılması yüzündendir. Hossen bunu bilir, hâne bunu örtbas
        etmiştir; ama her gece, ölen savaşçıların adlarını ezbere
        sayar ve bu liste uyumadan biter bilmez. Hâne içinde Hossen’i
        ‘zayıf’ ilan edip yerini almak isteyen iki rakip vardır; ama
        bunu açıkça söyleyecek demir hâlâ kimsenin elinde değildir.
      `,
      ekonomi: "Demir, kürk, ölü hayvan kemiği, savaş paralı askerliği. Korsend ile ticari ilişki neredeyse yok; Vehdâr ile tek kanal: yeraltı demir ticareti."
    },

    {
      id: "velivar",
      ad: "Hâne Velivar",
      lakap: "Tuzlu Tahtların Hânesi",
      konum: "Velemâr / İncî Tahtı",
      arma: "Bir mercanın etrafına dolanmış bir denizyıldızı; arkasında yedi tuz tanesi. Renkler: koyu mercan, deniz mavisi, soluk tuz beyazı.",
      sloganHal: "‘Borçsuz deniz yoktur; ödenmedik gemi de.’ Velivarca orijinal: <em>Ven-velîd, ven-vahd.</em>",
      degerler: [
        "Ticaret bir dindir; her borç bir yemindir; her yemin bir tuzdur.",
        "Kraliçenin denizle evli olduğu inancı; bu, hâne içi tüm kararların üzerinde tek bir otoriteyi tutar.",
        "İhanetin bir mevsim olduğu kabulü. Velivar saraylarında ihanetin yıllık ortalaması yedidir."
      ],
      mimari: `
        İncî Tahtı, yedi nesil mercanın üzerine, mercanın üst tabakası
        ölmedikçe inşaat yapılmadan, yavaş yavaş yükselmiştir. Her oda
        deniz havasına açıktır; tuz yıllar içinde duvarlara kristal
        biçiminde tutunur ve bu kristaller değerli sayılır. Med-cezir
        zamanlarında alt salonlar sular altında kalır; kraliçeler
        toplantıları üst salonlara taşır. Bu, hâne içi statü için
        kullanılır: ‘suya gömülen koltuk’ alt unvanlıdır.
      `,
      ritueller: [
        "Tuzlu And — yeni kraliçe tahta çıkarken parmağına bir damla deniz suyu, bir damla kendi kanı akıtılır. Bu damla yedi gün boyunca yara olarak tutulur.",
        "Borcun İlanı — Velemâr’da resmî bir borç, mum eridiği gibi okunan tuz tabağında onaylanır. Tuzun deseni, borç süresinin bittiği günü gösterir.",
        "Direklerin Sayımı — Yılda bir kez, Mahn-ı Sevda limanındaki tüm gemi direkleri sayılır; bu sayım her hânenin Velemâr içindeki ağırlığını belirler."
      ],
      askerYapisi: `
        Asker değil, donanma. Yedi bin denizci, üç yüz savaş gemisi.
        Kara ordusu yoktur — kara savaşı, paralı askerle (genelde
        Brennvar) yürütülür. Donanma komutası ‘Tuz Yedisi’ adı verilen,
        kraliçeye doğrudan bağlı yedi amiraldedir. Velemâr deniz savaşında
        Mendîran’ın en güçlü gücüdür ama tek başına bir kıtayı işgal
        edemez.
      `,
      din: "Sessiz Tek-Tanrı’nın deniz versiyonu; ama gerçekte din ticaret etrafında döner. Kraliçenin deniz kocası, gerçek bir varlık değil siyasî bir kurgudur — ama kimse bunu açıkça söylemez.",
      icCatisma: `
        Kraliçe Anhura Velivar, tahta çıkışında altı rakibini ortadan
        kaldırarak Velemâr’ı tek elde toplamıştır. Ama bu çok hızlıydı
        ve eski tüccar prensliklerinden bazıları, dış destek arıyor.
        Velemâr’da iki klik vardır:

        <ul>
          <li><strong>Anhura’nın Tuzu</strong> — kraliçeye sadık tüccar evleri.</li>
          <li><strong>Eski Mercan</strong> — Anhura’dan önce çok kazanan, şimdi vergi altında ezilen eski aileler.</li>
        </ul>

        Imira, Velivar prensesi olarak Naerath sarayına ‘rehine-elçi’
        olarak gönderilmiş; ama gerçekte Anhura’nın casusudur.
        Bunun ötesinde, Imira’nın kendi sadakatleri başka yerlere
        kaymaya başlamıştır.
      `,
      ekonomi: "Deniz ticareti, baharat, gemi inşası, faiz, sigorta (Velemâr sigortayı icat etmiştir), tuz tekeli. Mendîran’ın hâlâ en zengin hânesi."
    },

    {
      id: "vehdarin",
      ad: "Hâne Vehdârin",
      lakap: "Yer Altı Mirasının Hânesi",
      konum: "Vehdâr / Kûz-i Vehd",
      arma: "İçinde yarısı boş bir kum saati; çevresinde yedi nokta. Renkler: kömür siyahı, mum sarısı, yeraltı suyu yeşilimsi.",
      sloganHal: "‘Saat çevrilmek üzere; üst dünya bunu bilmez.’ Vehdârî orijinal — yazılırken sayfanın arkasına yazılır: <em>vehd-saat saht.</em>",
      degerler: [
        "Hâfızanın yeraltında saklanması. Vehdâr, Mendîran’ın gerçek arşividir.",
        "Yüzeyle teması en aza indirme. Yüzey, ‘unutkan’ bir dünyadır.",
        "Kum saati inancı: Sönmeyenler yüzyılda bir uyanmaya çalışır; Vehdârî, onları geri uyutan halktır."
      ],
      mimari: `
        Kûz-i Vehd, bir kum saatinin içinde yaşıyormuşçasına yontulmuştur.
        Üst yarım küre ve alt yarım küre, ortada yüksek tavanlı bir
        meydanda buluşur. Bütün şehir lamba ışığıyla aydınlanır;
        mum, ‘kum tanesinin akrabası’ sayılır. Mimari süsleme yoktur,
        yalnızca tavanlara oyulmuş binlerce kum-saati simgesi.
      `,
      ritueller: [
        "Kum Sayfası Töreni — yedi yılda bir, her vatandaş kendi adını ince bir cam tabağa yazılmış kuma kazır. Tabaklar Kûz’un merkezinde toplanır.",
        "Çıplak Kapılar Bekçiliği — Vehdâr halkı, Çıplak Kapılar’ın açılma günü için sürekli bir bekçilik düzenler. Bir bekçi, hayatta bir kez bir saat süresince kapının önünde durur.",
        "Karanlığa Selâm — Vehdârî dili, asla yüze doğru konuşulmaz. Selâmlaşırken iki kişi de karanlığa doğru başını çevirir."
      ],
      askerYapisi: `
        Vehdâr’ın savaş gücü vardır; ama bilinen değildir. Yeraltı geçitlerinden
        biri açıldığında, içeriden çıkıp dövüşen Vehdârî muhafızlar Mendîran
        tarihinde birkaç kez görünmüştür ve her seferinde galip gelmişlerdir.
        Sayıları kesin değildir; tahminler bin ile on bin arasında değişir.
        Asıl gücü, bilinmeyen tek bir silah türünde yatmaktadır: ‘kum-sözü.’
        Kimse ne olduğunu bilmez.
      `,
      din: "Çevrilmemiş Kum. Dünya bir kum saatidir; çevrilmediğinde uyuyanlar uyanır. Bu inancı kimse ciddiye almaz, fakat tarih bir kez daha bu inancı haklı çıkarmak üzeredir.",
      icCatisma: `
        Hâne Vehdârin bin yıldır yüzeyden uzak durmak üzerine kuruluydu.
        Ama Hisn-i Sevra’nın çatlağı, Çıplak Kapılar’a doğrudan açıldığı
        için, Vehdârî bey Khovan iki çağrılı düşmanla aynı anda yüzleşmek
        zorundadır: yüzeydeki hâneler ve aşağıdaki ses. Hâne içinde iki
        klik vardır:

        <ul>
          <li><strong>Kapıların Açılmasını İsteyenler</strong> — yüzeyle ittifak yapıp Sönmeyenler’i birlikte durdurmayı önerenler.</li>
          <li><strong>Kapıların Kapalı Kalmasını İsteyenler</strong> — bin yıllık politikadan vazgeçmenin kıyamete denk olduğunu söyleyenler.</li>
        </ul>

        Khovan’ın kendisi karar veremiyor. Bu, hânenin tarihindeki en
        ağır karar değil; en ağır karara hazırlık.
      `,
      ekonomi: "Yeraltı suyu satışı (sınırlı), nadir kristaller, demir (Brennvar ile gizli ticaret), arşiv hizmeti (büyük hâneler eski belgelerini Vehdâr’da saklatır). Sembolik bir vergi, ‘kum-payı,’ büyük hânelerden alınır; ödeyen birkaç hâne yalnızca."
    }
  ],

  kucukHaneler: [
    {
      ad: "Hâne Tasrîd",
      konum: "Asfârend, kuzey dukalığı",
      ozet: "Naerath taç hakkını en katı uygulayan dukalık; saraya borçlu ama bağımsızlık peşinde."
    },
    {
      ad: "Hâne Velvarin",
      konum: "Velemâr, Mahn-ı Sevda",
      ozet: "Velivar’ın yakın kuzeni; ama Anhura’nın iktidarına karşı en açık muhalefet bu hâneden çıkmıştır."
    },
    {
      ad: "Hâne Iramden",
      konum: "Veyrahal’ın güneyi",
      ozet: "Iramen değil ama Veyrahal’da yerleşik; ticaret yoluyla Asmeyra’ya bağımlı, Yeşil And’a yarı-tâbi."
    },
    {
      ad: "Sahesh Mecmûası",
      konum: "Korsend, göçebe",
      ozet: "Resmî hâne sayılmaz; ama Sahesh boyları kendi içlerinde bir konsey gibi davranır. Lethe bunlardan biridir."
    },
    {
      ad: "Hâne Brennsahr",
      konum: "Tâhgâr, doğu boyları",
      ozet: "Brennvar’ın hizipçi alt kolu; demir ticareti üzerinden Vehdâr ile en yakın temasta olan grup."
    }
  ],

  ittifaklar: [
    {
      isim: "Tuz-Yeşil İttifakı",
      taraflar: ["Velivar", "Asmeyra"],
      ozet: "Velemâr ipek alır, Veyrahal tuz alır; resmî değil ama yüzyıllık ticari müttefik. Hâne Naerath’a karşı zımnî bir denge."
    },
    {
      isim: "Vâris–Demir Borcu",
      taraflar: ["Naerath", "Brennvar"],
      ozet: "Naerath’ın Brennvar’a olan eski borcu, Brennvar’ın Tâhgâr seferi tazminatı olarak hâlâ ödenmektedir. Bu borç Brennvar’ı saraya bağımlı tutmaz; tersine, sarayın Brennvar’a olan boyun eğmesini kalıcılaştırmıştır."
    },
    {
      isim: "Kül-Kum Sessizliği",
      taraflar: ["Korsend", "Vehdârin"],
      ozet: "Resmî bir ittifak yok; ama Külbağcılar ve Vasrim arşivcileri yüzyıllardır karşılıklı bilgi alışverişi yapmaktadır. Her iki taraf da bunu reddeder."
    }
  ]

};
