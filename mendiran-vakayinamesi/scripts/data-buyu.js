/* ════════════════════════════════════════════════════════════════════
 *  MENDÎRAN VAKAYİNÂMESİ — KÜLBAĞ SİSTEMİ
 *  Mendîran’ın tek (ve son) büyü sistemi: bedeli, sınırı, gizemi.
 * ════════════════════════════════════════════════════════════════════ */

window.MENDIRAN_BUYU = {

  baslik: "Külbağ",
  altBaslik: "Ölülerin Sözüne Bağlanma Sanatı",

  acilis: `
    Mendîran’da büyü yoktur. Olan, <em>bağlanma</em>’dır. Külbağ adı verilen
    bu sanat, Korsend çölünde, VS 298’de, adı bilinmeyen bir küllükçünün
    bir ölünün külünden onun anılarını çağırmasıyla doğmuştur. O günden
    bu yana büyü dünyada bir kez de doğal olarak ortaya çıkmamış,
    yalnızca öğrenilerek aktarılmıştır.

    Külbağ’ın temeli üç ilkedir:

    <ol>
      <li><strong>Anı, küle bağlıdır.</strong> Bir ölünün anısı,
      onun küllerinde dağılır ama kaybolmaz. Doğru bağlanma ile, o anı
      yeniden çağrılabilir.</li>
      <li><strong>Bağlanma, taşımadır.</strong> Külden çağrılan anı, bağlanan
      kişiye geçer; geçen anı bağlananın ‘kendi’ anısı kadar gerçektir.
      Bir Külbağcı, kaç ölünün anısını taşırsa, kendisinden o kadar
      çok şeyi kaybeder.</li>
      <li><strong>Söz, yemindir.</strong> Bağlanma, ölünün adını söylemekle
      başlar. Söylenen ad bir yemindir; söylenen yemin bozulamaz. Külbağcı,
      bir kez bağlandığı ölüye, ölene kadar bağlıdır.</li>
    </ol>

    Bu üç ilke, hem büyünün gücünü, hem yıkıcılığını tanımlar.
  `,

  yedi_soz: {
    baslik: "Yedi Kül Sözü",
    aciklama: `
      Külbağcı çıraklığı yedi söz üzerine kuruludur. Her söz bir yıllık
      çalışma; her çalışmanın sonunda bir tek küle ‘hizmet’ edilmesi gerekir.
      Yedi yılın sonunda çırak, ‘bağlanabilir’ sayılır. Bu söylem, Külbağcılar
      arasında yedi yüz yıl boyunca değişmedi:
    `,
    sozler: [
      { soz: "Anmak", aciklama: "Adı söyleyebilmek. Adın doğru telaffuzu, sahibinin değil, hâfızadan çağıranındır." },
      { soz: "Korumak", aciklama: "Külü kuru, soğuk, ışıksız tutmak. Külbağcı küllüğünü kendi bedeniyle korur." },
      { soz: "Yakmak", aciklama: "Yeni ölülerin külünü hazırlamak. Yakma töreni, yedi günlük bir işidir; bedeni yakan da Külbağcı’dır." },
      { soz: "Taşımak", aciklama: "Külü yer değiştirmek. Bir Külbağcı’nın küllüğü yıllarca aynı yerde kalmaz; nedeni, ölünün yer tutmasını engellemektir." },
      { soz: "Susmak", aciklama: "Bağlanmadan önce, üç gün üst üste konuşmamak. Bu, Külbağcı’nın kendi sesinden boşalmasıdır." },
      { soz: "Devretmek", aciklama: "Bir ölüyü başka bir Külbağcı’ya bırakmak. Bu, törenlerin en zoru; çünkü ölünün ‘ben’i biraz değişir." },
      { soz: "Bırakmak", aciklama: "Bir ölüyü serbest etmek. Bağlanan ölünün ‘ikinci ölümü’ sayılır. Çoğu Külbağcı bunu yapmaz; çünkü yapmak, bir ad daha unutulmuş demektir." }
    ]
  },

  hafiza_cami: {
    baslik: "Hâfıza Camı",
    aciklama: `
      Külbağcılar, taşıdıkları ölüleri yalnız ezberden değil, ‘hâfıza camı’
      adı verilen iri amber-cam nesnelerde de saklayabilir. Cam, ölünün
      külüne karıştırılan özel bir maden (Korsend çölündeki ‘sevr-tuz’u)
      ile uzun bir sürede dövülerek yapılır. Süreç yedi yıl alır; sonunda
      avuç içine sığacak bir parça oluşur.

      Hâfıza camı, dokunulduğunda fısıldar. Cama bağlı olan Külbağcı bu
      fısıltıyı bir cümleye çevirebilir; başkaları yalnız uğultu duyar.
      Cam başka bir Külbağcı’ya devredilirse, fısıltı önce sustur, sonra
      yeni sahibine yeniden konuşur — devir süreci üç ay sürer.

      Hâfıza camları, Mendîran’ın en pahalı nesnelerindendir. Bir cam
      bir hânenin yıllık vergi gelirine bedeldir. Velivar saray kayıtlarında
      Velemâr’ın yedi hâfıza camı sahibi olduğu söylenir; gerçekte
      bu sayı üçtür ve üçü de saray dışındaki bir tüccarda emanettir.
    `
  },

  bedel: {
    baslik: "Bedel",
    aciklama: `
      Külbağ’ın bedeli, doğrudan büyücüye yüklenir. Üç kademeli bir
      bedel sistemi vardır:
    `,
    kademeler: [
      {
        ad: "Küçük Bağlanma",
        bedel: "Yedi gün sessizlik. Külbağcı, küçük bir ölü anısı çağırdığında (örn. bir tarih, bir görüş) yedi gün kimseyle yüksek sesle konuşamaz; konuşursa anı dağılır."
      },
      {
        ad: "Orta Bağlanma",
        bedel: "Saç ağarması. Külbağcı’nın saçı bir gecede grilik basar; bu, bağlanan ölünün ‘ağırlığına’ orantılıdır. Yaşlanma değildir, kalıcıdır."
      },
      {
        ad: "Büyük Bağlanma",
        bedel: "Bir kendi anısının silinmesi. Külbağcı bir ölünün bütün hayatını taşır almak için, kendi hayatından eşdeğer bir anıyı kaybeder. Hangi anının kaybolacağını seçemez. Bu, en korkulan bedeldir; çünkü Külbağcı, bir gün hangi anılarını kaybettiğini bile hatırlamaz."
      },
      {
        ad: "Yedinci Bağlanma (Yasak)",
        bedel: "Bilinmiyor. Hiçbir Külbağcı yedinci kademeden sağ çıkmadı. Söylenti: ölünün ‘kendisi’ bağlanana geçer; Külbağcı’nın bedeni vardır, ama içinde başka biri yaşamaktadır. Korsendî dilinde buna ‘sahn-vehd-i nâ-gûyâ’ (söylenemeyen yer değiştirme) denir."
      }
    ]
  },

  toplumsalEtki: {
    baslik: "Külbağ’ın Toplumsal Etkisi",
    aciklama: `
      Külbağ’ın varlığı, Mendîran’ın siyasî haritasını yedi yüz yıldır
      şekillendirmiştir. Etkiler dört başlık altında özetlenebilir:
    `,
    etkiler: [
      {
        ad: "Sınıfsal Eşitsizlik",
        aciklama: "Bir Külbağcı’nın ezberindeki ölü kadar bilgisi olur. Bu, Külbağcıları kıymetli yapar — ve aynı zamanda korkutucu. Korsend’de Külbağcılar aristokrasinin üstüne çıkmıştır; başka kıtalarda Külbağcılar yer altında yaşar."
      },
      {
        ad: "Tarih Yazımı",
        aciklama: "Külbağcılar resmî tarihçilerden daha güvenilir sayılır; çünkü onlar ‘doğrudan’ ölüden okur. Bu, hâneleri huzursuz eder. Naerath’ın iki tasfiyesi (VS 401 ve VS 1003), büyük ölçüde resmî tarihi koruma çabasıdır."
      },
      {
        ad: "Yas Kültürü",
        aciklama: "Bir aile bir Külbağcı tutarak, ölülerini ‘koruyabilir.’ Ama ölü ancak bağlandığı süre boyunca canlı kalır; Külbağcı öldüğünde aile yine yastır. Bu, Külbağcılara mistik bir konum verir; aynı zamanda onları hâlsiz bırakır."
      },
      {
        ad: "Korku",
        aciklama: "Külbağ’ın varlığı, ölülerin gerçek anlamda ölmediği inancını yayar. Bu, intihar oranlarını azaltır (‘ölsem de hatırlanacağım’) ama cinayet oranlarını da artırır (‘öldürürsem ezberini ben taşıyacağım’ — bu, eski bir Korsend deyimi)."
      }
    ]
  },

  sinirlar: {
    baslik: "Sınırlar",
    aciklama: `
      Külbağ, sınırsız değildir. Yedi büyük sınır vardır; bunlar Külbağcı
      çıraklığının ilk yedi haftasında öğretilir ve hiç bozulmaz:
    `,
    siralama: [
      "1. Anı, kül olmadan çağrılamaz. Sözle, kanla, kıyafetle değil — yalnız külle.",
      "2. Bir Külbağcı, kendi külüne bağlanamaz. (Bu, intihar ile delirme arasındaki anlamına ‘yedinci bağlanma’ denmesinin sebebidir.)",
      "3. Külbağ ile gelecek görülmez. Yalnız anı, yani geçmiş.",
      "4. Külbağ ile yeniden canlandırma yapılmaz. Beden değil, yalnız bilgi taşınır.",
      "5. Külbağcı, bağlandığı ölünün anılarını ‘seçemez.’ Ölü ne hatırlatırsa, o çağrılır.",
      "6. İki Külbağcı aynı küle bağlanırsa, ikisi de delirir. Bu, ‘kül kıskançlığı’ olarak bilinir.",
      "7. Sönmeyenler’in külü yoktur. Külbağ, onlara dokunamaz. Bu, sistemin en derin sınırıdır — ve sistemin sahiplerinin en korkutucu bilgisi."
    ]
  },

  gizem: {
    baslik: "Henüz Anlaşılmayan",
    aciklama: `
      Külbağ’ın yedi yüz yıllık tarihinde, hiçbir Külbağcı tam olarak
      açıklayamadığı üç şey vardır. Bu üç şey, bütün sistemin altında
      yatan gizemdir:
    `,
    gizemler: [
      {
        ad: "Yedinci And-Söyleyici’nin Külü",
        ozet: "Yedinci And imzalandığında, And-Söyleyiciler’in yedisi de yüz yıl içinde öldü. Altısının külleri, hâne arşivlerinde — gizli ama kayıtlı. Yedincisinin külü ortada yok. Bazı kayıtlar onun ölmediğini söyler. Külbağcılar bu yedinciye ulaşırsa, Yedinci And’ı yeniden imzalamak mümkün olabilir. Ya da imzayı sonsuza dek bozmak."
      },
      {
        ad: "Sevr Rüzgârı",
        ozet: "Korsend çölüne yılda bir kez gelen rüzgâr. Bu rüzgâr esnasında bağlanan hâfızalar, başka zamana göre yedi kat daha derindir. Sebebi bilinmez. Bir teori: Sevr Rüzgârı, Sönmeyenler’in nefesidir ve onlara en yakın olduğumuz andır."
      },
      {
        ad: "İkinci Konuşma",
        ozet: "Bazı Külbağcılar, çok yaşlandıklarında — genelde altmış yaşından sonra — kimseyle konuşmadıkları halde kendi seslerini duymaya başlar. Bu ses, taşıdıkları ölülerden birine ait değildir; ‘başka’dır. Külbağcılar bunu yıllarca gizler; ölmeden önce bir kişiye söylerler. Bu söylenti, yalnız ‘ikinci konuşma’ adıyla geçer. Suskun Vasıl’ın VS 1224’te duyduğu sesin bu olduğu, bazı arşivler tarafından ihtimal dahilinde tutulur."
      }
    ]
  },

  saheshFarki: {
    baslik: "Sahesh Yolu",
    aciklama: `
      Sahesh halkı, Külbağcı değildir — ama anı taşır. Onların yolu farklıdır:
      ‘ezbersiz ezberleme’ adıyla bilinir. Sahesh’ler küle bağlanmaz;
      ölünün hâfızasını doğrudan, herhangi bir nesne aracılığı olmadan
      taşır. Bu, mistik bir hal değil, eğitimle aktarılan bir tekniktir.

      Sahesh tekniği çok eski olmakla beraber, çok tehlikelidir. Külbağcının
      bedeli ‘bir anının silinmesi’ iken, Sahesh’in bedeli daha bulanık:
      taşıyıcı, taşıdığı ölünün ‘kendisinden ne kadar olduğunu’ ayırt
      edemez olur. Çoğu Sahesh hâfıza tutucusu, ikinci kuşakta deliriyor.

      Lethe, üçüncü kuşağa varan az sayıda yaşayan Sahesh’dendir. Onun
      hayatta kalması, Sahesh hâfızasının başka bir biçimde bağlandığını
      gösteriyor olabilir; ama bunu kimse henüz adlandıramadı.

      Sahesh inanışına göre, ‘doğru’ Sahesh hâfıza tutucusu, Yedinci And’ı
      taşıyabilir. Bu, Külbağcılar için kâbus; Sahesh’ler için bir umut.
    `
  }

};
