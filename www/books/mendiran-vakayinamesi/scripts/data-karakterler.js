/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — KARAKTER DOSYALARI
 *  Sekiz ana karakter; her birinin travması, çelişkisi, gizli korkusu,
 *  arzusu, ahlâkî zaafı ve çatışan sadakatleri.
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_KARAKTERLER = {

  baslik: "Sekiz Sessiz Yemin",
  altBaslik: "Bu Hikâyeyi Taşıyacak Olanlar",

  acilis: `
    Bu hikâyenin merkezinde sekiz kişi vardır. Hiçbiri saf değildir, hiçbiri
    arınmak istemez; çoğu kendi çelişkisiyle yaşamayı öğrenmiş ya da öğrenmek
    üzeredir. Aşağıda her birinin dosyası — geçmişi, korkusu, arzusu,
    ahlâkî kırılma noktası ve çatışan sadakatleri — verilmiştir.
  `,

  karakterler: [
    {
      id: "ardenya",
      ad: "Ardenya Korsend",
      sifat: "Sürgün Külbağcı, Hâfıza Camı Taşıyıcısı",
      yas: 27,
      koken: "Korsend / Saraab-ı Vehd / Hâne Korsend (alt kol)",
      gorunum: `
        Uzun boylu, kemikli; saçları kül grisi (genetik değil, mesleği gereği —
        Külbağcılar yıllar içinde böyle ağarır). Sol kolunun bileğinde, yedi
        ölünün her birinin adının yazılı olduğu yedi ince çizgi var; yedinci
        çizgi yeni, kabuk bağlamamış. Sesi kalın değil, ama uzaktan duyulur —
        Külbağcı eğitiminde ‘karanlığa konuşma’ teknikleri öğretilmiştir.
      `,
      gecmis: `
        Hâne Korsend’in dışlanmış bir kolundan; babası Külbağcı, annesi Sahesh.
        Bu, Korsend’in resmî soyu için bir skandaldır — Sahesh halkı yedi
        nesildir hâne tarafından tanınmamaktaydı. Ardenya, çocukluğunda her iki
        tarafın da reddettiği bir yer arasında büyüdü; babası onu Külbağcılık
        okuluna gizlice yazdırdı, annesi ölmeden önce ona Sahesh’in ‘ezbersiz
        ezberleme’ tekniğini öğretti.

        On dokuz yaşında, Saraab-ı Vehd’de yapılan bir törene babasıyla birlikte
        çağrıldı. Bu törende ilk kez yedi büyük Külbağcı’nın önünde bir ölünün
        külünden anısını okudu. Tören başarılıydı; ama Ardenya, kendi
        annesinin kül adını da gizlice oraya katmıştı. Yakalandı; babası
        idam edildi, kendisi sürgüne yollandı.

        Bugün VS 1247. Ardenya üç yıldır sürgünde; yedinci hâfıza camını
        taşıyor ve bu camda kim olduğu bilinmeyen ama yedinci adıyla bir
        kadın var. Bu yedinci, son And-Söyleyici’nin kızıdır — Ardenya
        henüz bunu bilmez. Yalnızca onunla rüyalarında konuştuğunu, bu
        kadının “çatlak büyüyor” dediğini bilir.
      `,
      travma: `
        Babasının infazı. Babasının son sözü Ardenya’ya değil, küle söylenmişti:
        ‘Söylediğim ölmüştür; ölmemiş olan, söylenmez.’ Ardenya bu cümleyi
        her gün ezberden tekrar eder; çünkü cümlenin anlamını çözmeye
        cesaret edemez.
      `,
      celiski: `
        Külbağcılığı meslek olarak sürdürür; ama hâfızanın kutsal olduğuna
        artık inanmıyor. Yine de hâfızayı taşımaktan vazgeçemez. Çünkü
        vazgeçerse, taşıdığı yedi ölü ‘yeniden ölmüş’ olur ve buna karar
        verme hakkı onda değildir.
      `,
      korku: "Kendi adının da bir gün ezberlenmediğinde silineceği. Sahesh halkı için bu en derin korkudur.",
      arzu: "Sürgünden geri dönmek değil; sürgünü gönüllü hale getirmek. Hâne tarafından çağrılmak değil, hâneyi yargılayabilecek hale gelmek.",
      ahlakiZaaf: "Söz vermeyi reddedemez. Bir Külbağcı için söz vermek bir hayatı taahhüt etmektir; Ardenya bu yükü her seferinde alır ve her seferinde altında kalmasından korkar.",
      catisanSadakatler: [
        "Babasının hâtırasına — onu mahkûm eden hâneye karşı.",
        "Annesinin Sahesh halkına — onu reddeden babanın halkına karşı.",
        "Yedi hâfıza camındaki ölülere — diri olan herkese karşı."
      ],
      sesi: "Konuşurken kelimelerin ortasında küçük duraksamalar yapar; bunlar, içinden geçirdiği ölü adlarını saymak içindir. Çoğu kişi bu duraksamalardan rahatsız olur."
    },

    {
      id: "vellan",
      ad: "Vellan ehl-i Naerath",
      sifat: "Manastır Vârisi, Belki Son İmparator",
      yas: 19,
      koken: "Asfârend / Sâkin Vadi / Hâne Naerath (gizli kol)",
      gorunum: `
        İnce, solgun, on dokuzdan büyük gösterir. Saçları kahverengiye çalan
        siyah, kısa kesik (manastır kuralı). Sol kaşının üzerinde küçük bir
        yara izi — beş yaşında, Vâris Sarayı’ndan kaçırıldığı gece. Manastır
        gri-kahve cüppesini çıkarırsa, sırtında Naerath hâne mührünün
        doğum izi olduğu söylenir; Vellan bu mührü hiç kimseye göstermedi.
        Konuşurken kelimeleri ölçer; manastırda yedi yıl boyunca sessizlik
        eğitimi almıştır.
      `,
      gecmis: `
        Resvan Naerath’ın zehirlendiği Kanlı Düğün’den (VS 920) çok sonra,
        Hâne Naerath’ın ‘Kaynaksız Klik’ üyelerinden bazıları, son
        imparatorun gizli bir kolundan bir çocuk üretmek için çalıştı.
        Bu çocuk, üç farklı annenin yedi nesildir gizli tutulan, kuzen-kuzen
        seçimleriyle hazırlanan bir soydu. Vellan, bu projenin son
        ürünüdür.

        Beş yaşında, Vâris Sarayı’nda yaşıyordu — ama varlığı saraydaki
        ‘Soluk Klik’ tarafından henüz fark edilmemişti. Bir gece, doğum
        izini gören dadısı durumu kavradı; çocuk, geçirildiği bir saray
        kavgasında yaralanıp Sâkin Vadi’ye, Suskun Vasıl’ın gözetimine
        kaçırıldı. Suskun Vasıl onu manastıra kapadı ve on dört yıldır
        bekletmektedir.

        Vellan, kim olduğunu yalnızca beş yıl önce, on dört yaşındayken,
        Suskun Vasıl’dan tek bir cümleyle öğrendi: ‘Sen, yedi mumdan
        sönmemiş olansın.’ O günden beri konuşmuyor; ama her geceyi
        bir Naerath imparatorunun hayatını okuyarak geçiriyor.
      `,
      travma: `
        Beş yaşındayken sarayda gördüğü bir şey: dadısı, kendisini
        kaçırırken, bir başka çocuğu (gerçek bir Naerath değil) tahtın
        merdiveninde bırakmıştı ve o çocuk Vellan’ın yerine öldürüldü.
        Vellan bunu unutmuş gibi görünür; ama uyumadan önce o çocuğun
        adını arar, bulamaz, ve sabaha doğru yine uyuyamadan dua eder.
      `,
      celiski: `
        Bir imparatordur — kendisine söylendiği için; bir manastır
        çocuğudur — yetiştirildiği için. Bu iki kimlik birbirini
        reddeder. Vellan kendisinden nefret etmenin tek yolunu
        bulmuştur: ikisine de gerçekten inanmamak. Bu inanmamak
        onu çok yalnız kılar.
      `,
      korku: "Bir gün konuşmak zorunda kalmak ve o ses çıkmadığında, ne olduğunun anlaşılması. Vellan kendi sesini iki yıldır duymadı.",
      arzu: "Hiç tanımadığı annesinin gerçek adını öğrenmek. Bu adı bilen tek kişi Suskun Vasıl’dır; Suskun Vasıl bunu söylemez.",
      ahlakiZaaf: "Suskun Vasıl’a inanmaktan vazgeçememek. Onun ‘baba’ değil ‘bekçi’ olduğunu bilir; ama başka hiç kimse onunla bu kadar uzun konuşmadı.",
      catisanSadakatler: [
        "Hâne Naerath’a — onun ne olduğunu bilmediği için.",
        "Sâkin Vasıl tarîkâtına — onu büyüten kuruma karşı.",
        "Beş yaşında öldürülen o ‘sahte’ çocuğa — adını bile bilmediği biri."
      ],
      sesi: "Manastırda yıllarca sessiz kaldığı için, konuştuğunda sesi neredeyse fısıltı. Bunu kasten değil, kasları unutulmuş olduğu için yapar."
    },

    {
      id: "brennar",
      ad: "Brennar Asmeyra",
      sifat: "Yeşil Andlıların Bey’i, İki Çocuk Kaybetmiş Adam",
      yas: 51,
      koken: "Veyrahal / Asmeyra-Vehd / Hâne Asmeyra (asıl kol)",
      gorunum: `
        Orta boylu, ağaç gibi sert; sakalı kısa ve gri. Sol elinin üç
        parmağında, çocuklarının doğdukları yıl törenle takılmış yapraktan
        yüzükler — yapraklar artık kahverengi. Yeşil mantosu yıpranmış;
        yeni yapılmasına izin vermez. Yüzünde, çocuklar öldükten sonra
        oluşmuş bir asabiyet vardır — gözleri uzağa bakar, ama kulakları
        her sesi yakalar. Iramenî dilini saf konuşur; yabancı dilleri,
        siyasî olarak gerekli olduğu kadar bilir.
      `,
      gecmis: `
        Hâne Asmeyra bey’i olarak doğdu; otuz yaşında bey oldu (babası
        VS 1226’da öldü). On yedi yaşında evlendiği eşi Sehna ile iki
        çocukları oldu: Vehna (kız) ve Ardan (oğlan). Veyrahal’ın
        zenginlik altındaki sessiz çağında, bu aile mutluluğun şehir
        içindeki resmî yüzüydü.

        VS 1142’de, Vehna sekiz, Ardan altı yaşındayken, ormanın derinliğinde
        kayboldular. Üç hafta sonra geri döndüklerinde başka çocuklardı —
        gözleri hâlâ kendi gözleri, ama içlerinde bir şey eksilmişti.
        Yeşil And’ın hatipleri, ‘ad kazımayı’ önerdi; Brennar reddetti.
        Üç ay sonra çocuklar uyurken nefesleri yavaş yavaş kesildi; doktorlar
        hiçbir hastalık bulamadı. Çocuklar öldü. Adları taşa kazınmadı —
        Brennar, ‘adlarını ezberden silmeyeceği için’ kazımayı reddetti.
        Bu, Yeşil And’a karşı küçük ama derin bir ihanetti.

        Eşi Sehna iki yıl sonra şehri terk etti; geri dönmedi. Brennar
        bey olmaya devam ediyor; ama hâne içinde gittikçe yalnızlaşıyor.
        Onun ‘çürümeyi’ Yedinci And ile ilişkilendirme tezi Iramen
        tarihçileri için bir küfür; ama Brennar tezinden vazgeçmiyor.
      `,
      travma: `
        Çocuklarını kaybediş şekli. Onların ölümünden çok, ‘geri dönmüş
        ama içleri eksilmiş’ olarak yaşadıkları üç ay. O üç ayda Brennar
        kendi kızını bir kez tanımadı — çocuk ona bakıp ‘sen Brennar mısın?’
        diye sordu. Brennar bunu yıllarca kimseye anlatmadı.
      `,
      celiski: `
        Yeşil And’a inanır; ama Yeşil And’ın ona verdiği tek aracı —
        ad kazımayı — kendi çocuklarına uygulamadı. Kendisini Yeşil And’ın
        içinde tutan ne onun kuralları, ne dini; sadece bey’lik makamı.
        Bey olmaktan vazgeçerse, çocuklarının adlarını ezberden
        silmek zorunda kalır — ki ölmek bundan iyidir.
      `,
      korku: "Bir gün adlarını unutacağı. Brennar her sabah, kalktığında ilk iş olarak Vehna ve Ardan’ın adlarını içinden tekrar eder.",
      arzu: "Çürümeyi bir ad kazıyabileceği bir şey olarak adlandırmak. Brennar’ın bütün siyasi varlığı bu arzunun etrafında dönüyor.",
      ahlakiZaaf: "Yeşil And’ı, başkalarına uyguladığında titizdir; kendisine uygulamaktan vazgeçmiştir. Bu çift standardı hâne hatipleri sezmektedir.",
      catisanSadakatler: [
        "Hâne Asmeyra’ya — kendisini onun bey’i bildiği için.",
        "Yeşil And’a — onu büyüten anlaşmaya karşı.",
        "Çocuklarına — Yeşil And’ı kıran sebepleri olduğu için."
      ],
      sesi: "Yavaş, ölçülü konuşur; cümleleri arasında ağaç dalı gibi dallanan duraksamalar olur. Iramen edebiyatında bu konuşma biçimine ‘bey-sessizliği’ denir."
    },

    {
      id: "imira",
      ad: "Imira Velivar",
      sifat: "Rehine Prenses, Anhura’nın Gizli Casusu",
      yas: 23,
      koken: "Velemâr / İncî Tahtı / Hâne Velivar",
      gorunum: `
        Orta boylu, esmer; saçları siyaha çalan koyu kahverengi, denizden
        gelen rüzgârla yıllardır boğuştuğu için dalgalı. Sağ kulağında, hâne
        rengi koyu mercanın küçük bir küpesi — bu küpe yedi nesildir
        Velivar prenseslerinin omuzdaşı sayılır. Velivar resmî kıyafetlerini
        Vâris Sarayı’nda taşır; ama özel odasında çıplak ayakla yürür.
        Dört dil konuşur (Velivarca, Naerathça, Velivar pidgin’i, biraz
        Korsendî); beşinci bir dilin (Iramenî) yarısını yıllar içinde
        edinmiştir.
      `,
      gecmis: `
        Anhura Velivar’ın küçük kız kardeşi. Anhura tahta çıkmadan önce
        Velemâr’da iki kız kardeş birbirini severdi; Anhura tahta çıktığında
        Imira on yedi yaşındaydı. Anhura’nın hâne içi tasfiyelerini Imira
        yakından gördü; iki yakın kuzen ve bir amca öldürüldü, biri Imira’nın
        gözleri önünde. Imira o günden sonra Anhura’ya değiştiremeyeceği
        bir mesafeden baktı.

        VS 1244’te Anhura, Imira’yı Vâris Sarayı’na ‘rehine-elçi’ olarak
        gönderdi. Resmî gerekçe: Velemâr-Naerath barışını pekiştirmek.
        Gerçek gerekçe: Hâne Naerath’ın iç siyasetini birinci elden okumak.
        Imira, üç yıldır Vâris’te; her ay bir mektup yollamaktadır.

        Geçen yıl, Imira’nın mektupları değişmeye başladı. Anhura’ya
        eskisinden daha az bilgi veriyor; eskisinden daha çok şey
        gizliyor. Kendisi bile farkında değil bu değişimin sebebinin —
        Vellan’ı bir kez gördüğü, isimsiz bir törende, ve onun kim
        olduğunu adlandırılmamış bir şekilde sezdiği o tek bir anda
        olduğunun.
      `,
      travma: `
        Anhura’nın tahta çıkışındaki tasfiyelerde, en sevdiği kuzeni
        Tehran’ın boğdurulduğu odada bulunmuştu; on yedi yaşındaydı.
        Tehran ölmeden önce ona ‘abla seni de seçecek’ dedi. Imira bu
        cümlenin ne anlama geldiğini hâlâ tam çözmüş değil; ama
        bu cümle her gece uyumadan önce dönüp dolaşır.
      `,
      celiski: `
        Hâne Velivar’ın çıkarlarına çalıştığını söyler; ama her ay,
        ablasına yolladığı bilgilerin bir kısmını eksik tutar. Bunu
        kim için yaptığını henüz bilmiyor — belki kendisi için.
        Bu belirsizlik onu hem tehlikeli, hem savunmasız kılar.
      `,
      korku: "Anhura’nın bir gün onu da seçeceği. Tehran’ın sözünün gerçek olması.",
      arzu: "Tarafsız olmak. Mendîran’da bir tane bile gerçekten tarafsız insan yoktur; ama Imira her sabah denemekte ısrar eder.",
      ahlakiZaaf: "Kendi kalbini takip etmekten korkar. Bu yüzden hiç kimseye gerçek bir şey söylemez; söylediği her şey, yarı yarıya başkası için tasarlanır.",
      catisanSadakatler: [
        "Anhura’ya — abla olarak.",
        "Hâne Velivar’a — prenses olarak.",
        "Vellan’a — bir kez gördüğü ve adlandıramadığı bir şey için."
      ],
      sesi: "Yumuşak, çok dilli; cümleler arasında dört dilde küçük geçişler yapar (çoğu zaman farkında bile olmaz). Velemâr saray ağzı sayılan ‘nazik mesafeyi’ ustaca kullanır."
    },

    {
      id: "hossen",
      ad: "Hossen Brennvar",
      sifat: "Hâne Bey’i, Bin Yedi Yüz Adın Bekçisi",
      yas: 44,
      koken: "Tâhgâr / Brennvar-Hân / Hâne Brennvar",
      gorunum: `
        Geniş omuzlu, ortadan biraz fazla iri; siyah saçlarına demir grisi
        karışmış. Sakal kısa, tıraşlı kalıp süslenmemiş. Sol gözünün yanında
        bir yara izi — Velemâr çıkartmasından. Sırtında dövülmüş demirden bir
        zırh; göğsünün ortasında, kemerinin üzerine takılmış küçük bir kapakçık
        — içinde bin yedi yüz ad ezberden silinmesin diye yedi gece üst üste
        yazılmış kurşun kalem yazısı. Sesi derin, vurucu; ama kısa konuşur.
        Brennvarca dışında hiçbir dile yetkin değildir.
      `,
      gecmis: `
        Brennvar bey’i olarak otuz iki yaşında seçildi (VS 1235); seçimi,
        babasının ölümünden iki yıl sonra, Brennvar boyları arasında uzun
        bir tartışma sonrasında geldi. Hossen seçim zamanında ‘ölçülü, az
        konuşan, fazla acelesi olmayan’ bir adamdı.

        VS 1232’de — bey olmadan önce — Velemâr adalarına yapılan başarısız
        çıkartmaya komuta etmişti. Çıkartma Brennvar boyları için bir paralı
        asker görevi; ödülü büyük, kaybı ölçülmemişti. Hossen, yanlış sahile
        çıkardı: harita Velivar casusları tarafından gizlice değiştirilmişti.
        Bin yedi yüz savaşçı, kayalık bir adada açlıktan ve tuzlu sudan öldü.
        Hossen, kıyıya tek başına yüzerek döndü.

        Bunu hâne örtbas etti; çünkü Brennvar boylarının bey’inin böyle bir
        kayıp vermesi seçimini imkânsız kılardı. Hossen bey oldu; ama her
        gece, bin yedi yüz adı ezberden saymaktadır. Liste, uyumadan önce
        bitmez; bu yüzden Hossen yedi yıldır tam uyumadı.
      `,
      travma: `
        Bin yedi yüz savaşçının üzerine binip eve dönmüş olmak. Harita
        değişikliğini fark eden adamlardan biri ona ‘Hossen, bu sahil
        değil’ demişti — Hossen ‘ileri’ demişti. Bu söz, hâlâ kulağında
        çınlıyor; her gece ilk uykuda Hossen bu sesi duyup uyanıyor.
      `,
      celiski: `
        Demirin Ağzı’na inanır; söz değil demir konuşur. Ama her gece
        bin yedi yüz adı sözle saymaktadır. Bu sözler demire dönüşmeyecek;
        ve Hossen bunu çoktan kabul etti — ama hâneye söyleyemiyor.
      `,
      korku: "Brennvar-Hân’ın buz gölünde, yarılan buzun altında görülen ‘şeyin,’ bin yedi yüz adın peşinden gelmek istediği. Bu, Hossen’in tek mistik korkusudur ve kimseye söylemez.",
      arzu: "Bey’liği teslim etmek. Bey olmamak. Sıradan bir Brennvar savaşçısı olarak ölmek. Bunu sözle ifade edemez; çünkü demir gibi gerçek değildir.",
      ahlakiZaaf: "Hâne yalanına ortak olmuştur. Çıkartmadaki sayıyı hâne ‘yedi yüz’ olarak ilan etti; gerçek bin yedi yüz. Hossen bu yalanın iki katı ağırlığını taşıyor.",
      catisanSadakatler: [
        "Brennvar boylarına — bey olarak.",
        "Bin yedi yüz ölüye — komutan olarak.",
        "Kendi sözüne — bir adam olarak."
      ],
      sesi: "Kısa cümleler. Her cümle dövülmüş demir gibi düz. Hossen’in konuşması Brennvar şarkıcılarının ‘ağır-vuruş’ tekniğinin örneklerinden sayılır."
    },

    {
      id: "suskun-vasil",
      ad: "Suskun Vasıl",
      sifat: "Sâkin Vasıl Tarîkâtının Başı, Konuşmayı Yasaklayan Adam",
      yas: 67,
      koken: "Asfârend / Sâkin Vadi (manastır doğumlu, hâne kökeni belirsiz)",
      gorunum: `
        İri yapılı değil; ama dikilirken etrafındaki herkes ondan biraz daha
        küçük durur. Saçları yıllar önce dökülmüş; başı kısa beyaz kıllarla
        kaplı. Sâkin Vasıl tarîkâtının resmî cüppesi — koyu kül grisi, yıpranmış
        — onda yeni gibi durur, çünkü her yıl baştan diktirir. Sol elinde,
        küçük bir kül kâsesi taşır; içinde ne olduğunu kimse bilmez. Yüzü
        ifadesiz; bu kasıtlıdır. Suskun Vasıl, VS 1224’ten sonra yüksek sesle
        konuşmadı; emirleri ‘okutarak’ verir — bir adam metni yüksek sesle
        okur, Vasıl başını ‘evet/hayır’ olarak hareket ettirir.
      `,
      gecmis: `
        Doğumunun gerçek tarihi ve yeri Sâkin Vadi kayıtlarında muğlaktır;
        bazıları onun Hâne Naerath’ın bir alt kolundan olduğunu söyler,
        bazıları Velivar tüccar evlerinden bir kaçaktan. Manastıra
        çocuk yaşta getirilmiş; sessizlik eğitimine yedi yaşında başlamış.
        VS 1180’de, kırk yaşında, Sâkin Vasıl tarîkâtının başına geçti.
        Bu yükseliş hızlı ve sessiz oldu; rakipler birer birer manastırlara
        dağıtıldı.

        VS 1224’te, sesini kesti — yedi gün boyunca yüksek sesle dua ettikten
        sonra. Niye sustuğunu bilen yok; en yakın iki manastır piskoposu da
        konuşmaktan kaçınır. Suskun Vasıl o günden bu yana bilgi
        toplamaktadır. Mendîran’ın altı büyük hânesinden her birinde en az
        bir muhbiri var. Hisn-i Sevra’nın çatlağını ilk fark eden o oldu;
        bu bilgiyi henüz ne paylaşmıştır, ne tamamen saklamıştır.

        Vellan’ı VS 1245’te manastıra kapattığında, onu ne bir oğul olarak
        yetiştirdi, ne bir tutsak olarak. ‘Hazırlık’ olarak yetiştirdi;
        ama ne için olduğunu Vellan’a hâlâ söylemedi.
      `,
      travma: `
        Sustuğu gece yaşadığı şey, kayıtlarda yok. Manastır rivayetlerine
        göre o gece bir ses duydu — kendi sesi değil, ama kendi ağzından
        çıkan bir ses. Bu sesi sustuğu için duydu mu, yoksa bu sesi duyduğu
        için mi sustu — açık değildir. Suskun Vasıl bu konuda yazıyla bile
        yorum yapmamaktadır.
      `,
      celiski: `
        Bütün hayatını ‘konuşmamayı’ öğrenmeye adadı; ama tarihin en
        kritik anında, konuşması gerekecek olabilir. Bu kararı verecek
        zaman yaklaşıyor ve Suskun Vasıl bunu biliyor.
      `,
      korku: "Konuştuğunda, o eski sesin yeniden çıkması. Bu sesin Sönmeyenler’den birine ait olduğunu sezdi VS 1224’te; ama bunu da paylaşmadı.",
      arzu: "Yedinci And’ı yeniden imzalatmak. Bunu yapabilmek için doğru iki kişiye ihtiyacı var: bir And-Söyleyici torunu (Ardenya) ve bir Naerath kanı (Vellan). Bu yüzden ikisini birden ‘hazır tutuyor.’",
      ahlakiZaaf: "İnsanları piyon olarak kullanmaya, kendisini buna mecbur hissetmesinden çok daha uzun süredir alışmıştır.",
      catisanSadakatler: [
        "Sâkin Vasıl tarîkâtına — kurum olarak.",
        "Sessiz Tek-Tanrı’ya — inanç olarak.",
        "Mendîran’ın ‘ayakta kalmasına’ — devlet adamı olarak."
      ],
      sesi: "Yok. Her şeyi başkası okur."
    },

    {
      id: "lethe",
      ad: "Lethe",
      sifat: "Sahesh Hâfıza Tutucusu, Ezbersiz Ezberleyen",
      yas: 30,
      koken: "Korsend göçebe / Sahesh Mecmûası",
      gorunum: `
        Orta boylu, kemikli; cildi çölün bütün renklerinden hatıra taşır.
        Saçları siyah ama uçları beyaz. Sol gözünde, doğuştan, küçük bir
        çatlak gibi göz bebeği şekli — Sahesh’ler bunu ‘ezbersiz işareti’
        sayar; ‘Yedinci And’ı taşıma yeteneği bulunduğunu söylerler.
        Kıyafetleri kervan tozuyla kaplanmış, ama desenleri ince bir
        Sahesh dokuma. Hiçbir Korsendî öğretim okuluna gitmedi; ama
        Korsendî ve Naerathça akıcı konuşur. Adı sadece Lethe; soyadı
        yok.
      `,
      gecmis: `
        Sahesh halkı, ezbersiz ezberleme tekniğini bilen tek halktır.
        Külbağcılar küle bağlanır; Sahesh ezberleyenleri ‘doğrudan’
        hâfızayı taşır, hiçbir nesne aracı olmaz. Bu teknik tehlikelidir
        — taşıyıcı çoğu zaman delirir.

        Lethe, beş yaşında bu yeteneği gösterdi; kız kardeşinin ölümünü
        ezberden tutmadı, kız kardeşinin yedi yıllık hayatını ezberden
        tuttu. On iki yaşında, çadırlarda Sahesh büyüklerinin uyarıları
        arasında bir önceki kuşağın üç hâfızasını taşır olmuştu.
        VS 1228’de, Saraab-ı Vehd çarşısında bir Korsend ölüsünü Külbağcı
        olmadan ezberden okudu; bu, hâne tarafından bir provokasyon
        sayıldı, ‘hânesizler’ derhâl şehirden uzaklaştırıldı.

        O günden bu yana Lethe, kıtanın bir kervan yolundan diğerine
        geçer. Külbağcılar onu arar — bazıları yardım, bazıları susturma
        için. Lethe hangisinin önce bulacağını bilmez. Yanındaki tek
        gerçek arkadaşı, üç yıllık bir Korsend deve cinsi olan
        ‘Nehr.’
      `,
      travma: `
        Beş yaşında kız kardeşi öldüğünde, annesi onun yedi yıllık
        ezberini Lethe’ye yüklemişti. Bu, Sahesh törenidir; ama bu
        kadar küçük yaşta yapılmaz. Lethe o günden beri kız kardeşinin
        beş yaşına kadarki hâtırasını ‘kendi gibi’ taşır. Ne kadarı
        kendisi, ne kadarı kız kardeşi olduğunu net ayıramaz.
      `,
      celiski: `
        Sahesh halkından, ama Sahesh’in resmî büyükleri onu ‘fazla
        konuşkan’ buluyor. Külbağcılardan değil, ama onlar onu Külbağcılığa
        zorlamak istiyor. Kendisini tanımlayabileceği bir yer yok;
        bu yüzden hep yolda.
      `,
      korku: "Ezberindeki hâfızaların birinin uyanması ve onu içine çekmesi. Lethe, bir Sahesh’in bu şekilde delirdiğini gördü; o günden beri uyumaktan korkar, ama uyumak zorundadır.",
      arzu: "Yedinci And’ı taşımak — yani kendisinde, hânesiz bir şekilde, And’ın yeniden imzalanmasına yardım etmek. Bu Sahesh’ler arasında bir mit; Lethe bunun yalnız mit olmadığını sezer.",
      ahlakiZaaf: "Hiçbir kervan reisini, hiçbir hâneyi, hiçbir piskoposu ciddiye almaz. Bu özgürlüktür; ama aynı zamanda dünyaya karşı bir kibirdir.",
      catisanSadakatler: [
        "Sahesh halkına — onu hiç çağırmayan ailesine karşı.",
        "Ezbersizdeki ölülere — diri olan herkese karşı.",
        "Ardenya’ya — henüz tanımadığı, ama rüyalarında defalarca gördüğü birine."
      ],
      sesi: "Yumuşak, biraz çocuksu kalan bir vurguyla; ama söylediği her şeyde, başka birinin söylediği bir cümlenin yankısı var gibidir. Sahesh’ler bunu ‘çift sesli konuşma’ olarak bilir."
    },

    {
      id: "khovan",
      ad: "Khovan ehl-i Vehdârin",
      sifat: "Hâne Vehdârin’in Bey’i, Çıplak Kapıların Bekçisi",
      yas: 58,
      koken: "Vehdâr / Kûz-i Vehd / Hâne Vehdârin",
      gorunum: `
        Solgun; yer altında doğmuş ve yer altında yaşamış birinin solgunluğu.
        Saçları beyaz ama hâlâ gür. Sol elinin parmaklarında, kum saati
        sembolünün yedi farklı oyma versiyonu — Vehdârî bey’inin işareti.
        Kıyafetleri kömür siyahıyla mum sarısı arasında değişir; çünkü
        Vehdârî dilinin bir kuralı vardır: ‘bey’ olduğunu söylemeden
        ‘bey’ olduğun anlaşılsın.’ Karanlığa konuşur; yabancılara konuşurken
        rahatsız olur, başka yöne bakar. Naerathça akıcı; Korsendî zayıf,
        Velivarca yok.
      `,
      gecmis: `
        Hâne Vehdârin’de bey, soya değil seçime göre belirlenir. Khovan,
        on yedi yaşında ‘Çıplak Kapılar Bekçisi’ olarak bir saat süresince
        kapı önünde durduğunda, geleceğin bey’i olduğu Sahesh kâhinleri
        tarafından söylenmişti. Otuz yaşında bey oldu; o günden bu yana
        Hâne Vehdârin’i en uzun süre yönetmiş bey’dir.

        Yirmi sekiz yıl boyunca, Khovan’ın siyaseti tek bir ilke üzerine
        kuruluydu: ‘Yüzeyle temas etme.’ Bu siyaset, hânenin bin yıllık
        geleneği. Khovan bunu bozan ilk bey değildi (bunu hiç kimse bozmadı);
        ama bozmaya karar verecek ilk bey olabilirdi.

        VS 1239’da, Hisn-i Sevra’nın ilk çatlağı haberi Vehdâr’a Khovan’a
        özel olarak ulaştı (Suskun Vasıl’ın kuryesi sayesinde). Khovan
        bunu hâne meclisine değil, yalnız bir kişiye — kız kardeşi Vehna’ya —
        anlattı. Vehna bunun ne anlama geldiğini anladı ve Khovan’a
        ‘karar zamanın geldi, kardeşim’ dedi.

        Khovan henüz karar vermedi.
      `,
      travma: `
        Otuz yıl önce, Çıplak Kapılar’ın önünde bir saat duruşunda, kapıdan
        bir ses duydu. Ne diğer Vehdârî’ler, ne Sahesh kâhinleri o sesi
        duymadı. Khovan bu sesi otuz yıldır kimseye anlatmadı. Sesin söylediği
        tek cümle: ‘Ben unutuldum mu?’
      `,
      celiski: `
        Bin yıllık politikadan vazgeçmek demek, hânenin kimliğinden
        vazgeçmek demek. Vazgeçmemek demek, Sönmeyenler’in uyanmasına
        seyirci kalmak. Khovan iki seçeneğin de yanlış olduğunu biliyor;
        seçenek üçten henüz haber yok.
      `,
      korku: "Sesin yeniden konuşması. Çıplak Kapılar’ın kendiliğinden açılması.",
      arzu: "Vehdârî halkının yüzeye çıkmadan kurtulması. Bu, mümkün değil — Khovan bunu da sezmektedir.",
      ahlakiZaaf: "Karar vermeyi yıllarca erteledi. Bu erteleme, halkın yıkıma daha hazırlıksız yakalanmasına sebep olabilir; Khovan bunu çok iyi biliyor ve bu yüzden her gece daha az uyuyor.",
      catisanSadakatler: [
        "Hâne Vehdârin geleneğine — bin yıllık politika.",
        "Vehdâr halkına — yaşayan nüfus.",
        "Otuz yıl önce kapıda duyduğu sese — adı bilinmeyen bir varlık."
      ],
      sesi: "Yer altı vurgusu — derinden, kelimelerin sonundaki ünsüzleri çıkartmadan tüten gibi konuşur. Karanlığa konuşurken sesi daha rahat çıkar."
    }
  ],

  yanKarakterler: [
    {
      ad: "Anhura Velivar",
      rol: "Velemâr kraliçesi, Imira’nın ablası",
      ozet: "Yirmi sekiz yaşında, hâne içi tasfiyelerle tahta gelmiş; soğukkanlı, hesapçı, sevgi gösterilerini bir araç olarak kullanan. Imira’nın değişen mektuplarından şüphelenmeye başlamış."
    },
    {
      ad: "Sehna ehl-i Asmeyra",
      rol: "Brennar’ın eski eşi, ortadan kaybolan",
      ozet: "Vehna ve Ardan’ın ölümünden iki yıl sonra şehri terk etti. Bazılarına göre yaşıyor, Veyrahal’ın güneyinde, bir Sahesh kervanına katıldı; bazılarına göre öldü. Brennar gerçeği bilmek istemiyor."
    },
    {
      ad: "Tehran Velivar",
      rol: "Imira’nın boğulan kuzeni",
      ozet: "Anhura’nın tasfiyesinde öldürüldü; Imira onun son anlarını gördü. Onun son cümlesi (‘abla seni de seçecek’) hikâyeyi etkilemeye devam ediyor."
    },
    {
      ad: "Vehna ehl-i Vehdârin",
      rol: "Khovan’ın kız kardeşi",
      ozet: "Vehdâr meclisinde radikal kanat; Çıplak Kapılar’ın açılmasını ve yüzeyle ittifak yapmayı savunan en sesli ses. Khovan’ı yıllardır karar vermeye zorluyor."
    },
    {
      ad: "Naib Sâdir-ı Hâli",
      rol: "Vâris Sarayı’nın nominal naibi",
      ozet: "Hâne Naerath’ın resmî temsilcisi; kuzen evliliklerinden gelen zayıf kan, kendisi bunu bilir ama kabullenir. Saray içi politikayı eski Soluk Klik’le yürütür."
    },
    {
      ad: "Mevhûr Tasrîd",
      rol: "Tasrîd Dukalığı’nın yeni dükü",
      ozet: "Asfârend’in kuzey dukalıklarından birinin yeni varisi; otuz iki yaşında, Vâris Sarayı’na karşı bağımsızlık peşinde, Brennvar ile gizli temas kurmuş."
    }
  ]

};
