/* ════════════════════════════════════════════════════════════════
   fable-03.js — Düğümü Çözmeyen Denizci
   Küme: Yapmak ve Bırakmak. Tek eylem: her düğümü çözen denizci,
   çözemediği bir düğümle karşılaşır; kesmeyi de reddeder; düğümün
   etrafından geçecek şekilde yeniden donanır. Gözlem: ustalık, kimi
   düğümü olduğu gibi bırakmayı bilmektir.
   ════════════════════════════════════════════════════════════════ */

window.FABL = window.FABL || {};
window.FABL.entries = window.FABL.entries || [];

window.FABL.entries.push({
    id: "fabl-dugumcu",
    title: "Düğümü Çözmeyen Denizci",
    subtitle: "Çözülemeyen bir düğümün hikâyesi",
    category: "yapmak",
    themes: ["Ustalık", "Kabul", "Vazgeçiş"],
    content: [
        "Limanda, her düğümü çözen bir denizci vardı. Adı Yusuf'tu, ama kimse öyle çağırmazdı; ona yalnızca «Düğümcü» derlerdi. Ağlar dolaşırsa, makaralar sıkışırsa, halatlar yıllarca birbirine geçip taşlaşmışsa, onu çağırırlardı. Vapurun kör olmuş demir halatını o açmıştı; bir denizcinin sarhoşken atıp bir yıl uğraştığı düğümü bir öğleden sonrada çözmüştü. Hep parmaklarıyla çalışırdı, bıçak kullanmadan — çünkü halat kesmek ona göre çözmek değil, yenilmekti. Bununla övünürdü; haklı olarak.",

        "Yanında genç bir çırak vardı; her işine gölge gibi takılır, parmaklarının nasıl konuştuğunu öğrenmeye çalışırdı. «Bir düğüm,» derdi Yusuf ona, «kötü bağlanmış bir niyettir. Sabırla bakarsan, niyetin nerede şaştığını görürsün.»",

        { style: "hr" },

        "Bir gün, batık bir teknenin demir halatı çıkarıldı sudan. Üstünde bir düğüm vardı; tuz ve yıllar onu taş gibi sertleştirmişti. Kimse böylesini görmemişti. «Bu Düğümcü'ye göre,» dediler ve halatı Yusuf'a getirdiler.",

        "Yusuf düğüme baktı ve gülümsedi; her zaman gülümserdi başlarken. Oturdu, parmaklarını aralara geçirdi, çekti, gevşetmeye çalıştı. Düğüm kımıldamadı. Ertesi gün yine denedi. Üçüncü gün, tuz tırnaklarının altında çatlayana, parmakları kanayana kadar uğraştı. Düğüm, sanki onunla alay edercesine, olduğu gibi durdu.",

        "Günler geçti. Düğümcü yemekten kesildi. Çırak, ustasının ilk kez bir işin önünde küçüldüğünü gördü. Limanda kimi balıkçı başını uzatıp bakar, kimi «Bırak şu inadı, kes gitsin,» derdi; Yusuf duymazdan gelirdi. Bu düğüm onun adını taşıyordu; çözemezse, adı ne olacaktı? Geceleri halat kucağında uyuyakaldı. Düğüm büyümüyordu; ama Yusuf'un içinde büyüyordu. Çırak bir akşam yardım etmek için elini uzattı; Yusuf, sert olmadan ama kesin, elini geri çekti — bu, kendisinin vermesi gereken bir cevaptı.",

        { style: "hr" },

        "Derken liman reisi geldi. «Yusuf,» dedi, «o halata yarın ihtiyacımız var. Yelkenli sefere çıkacak. Çözemediysen, keselim; yenisini bağlarız.»",

        "«Kesmeyeceğiz,» dedi Yusuf. «Ama çözemiyorum da.» İki cümlenin arasında, bir adamın bütün inadı vardı.",

        "O gece Yusuf halatı eline aldı ve ilk kez düğüme değil, halatın tamamına baktı. Düğüm, halatın bir ucuna yakındı. Geri kalan halat sağlamdı, uzundu, işe yarardı. Yusuf yavaşça düşündü: belki de mesele bu düğümü açmak değildi. Belki mesele, bu halatla yine de yelken açmaktı. İnadı, gece boyunca, sessizce yer değiştirdi.",

        "Sabah, düğümün hemen üstünden halatı bağladı. Düğümlü ucu hiç kullanmadı; halatı biraz daha kısa tuttu. Yelkenin açısını buna göre ayarladı, makarayı bir delik öteye taşıdı. Düğüm orada kaldı — çözülmemiş, ama artık zararsız. Halatın bir parçası olmuş, işin içine katılmıştı.",

        { style: "hr" },

        "Yelkenli o gün sefere çıktı ve sorunsuz döndü. Liman halkı şaşkındı. «Düğümcü!» dediler. «Demek sonunda onu da çözdün!»",

        "Yusuf başını salladı. «Çözmedim,» dedi. «Etrafından dolaştım.»",

        "Çırak anlamadı. «Ama çözemediğin bir düğüm, senin adına leke değil mi?» diye sordu. Yusuf halatı gösterdi; düğüm hâlâ oradaydı, sapasağlam, ve hiçbir işi aksatmıyordu.",

        { style: "quote", text: "Kimi düğüm çözülmek için değil, yanında yaşamak için bağlanmıştır." },

        "«Yıllarca her düğümü açtım,» dedi Yusuf çırağa. «Meğer ustalık, sandığım gibi her düğümü açmak değilmiş. Bazen hangi düğümü olduğu gibi bırakacağını bilmekmiş. Onu kesmedim, çünkü kesmek kaybetmektir. Açmadım, çünkü açamadım. Yalnızca, onunla birlikte yelken açmayı öğrendim. Bunu öğrenmek, çözmekten zordu.»",

        "Çırak o günden sonra düğümlere başka türlü baktı. Önüne çözülmez bir düğüm geldiğinde, önce halatın tamamına bakmayı öğrendi; çoğu zaman düğüm olduğu yerde kalır, iş yine de yürürdü. Ve limanda, çözülmeden bırakılmış o tek düğüm, Düğümcü'nün en çok anılan işi oldu — açtığı bunca düğümden değil, açmadığı bu birinden ötürü anılır oldu."
    ]
});
