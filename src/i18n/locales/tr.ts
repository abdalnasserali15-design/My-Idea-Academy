import type { Translations } from "./en";

const tr: Translations = {
  nav: {
    brand: "MY IDEA",
    theme: "Temayı değiştir",
    language: "Dil",
    home: "Ana Sayfa",
    dashboard: "Panel",
    tools: "Araçlar",
    account: "Hesap",
  },
  welcome: {
    kicker: "Etkileşimli öğrenme platformu",
    title: "Hoş Geldin",
    subtitle: "Bir yol seç ve öğrenmeye başla.",
    cta: "Başla",
    scroll: "Keşfetmek için kaydır",
  },
  topics: {
    prevLabel: "Önceki",
    nextLabel: "Sonraki",
    goToLabel: "{{topic}} konusuna git",
    sectionTitle: "Yolunu seç",
    sectionSubtitle: "Disiplinler arasında kaydır — yakında daha fazlası.",
    swipeHint: "Keşfetmek için kaydır",
    startLearning: "Öğrenmeye başla",
    cybersecurity: {
      title: "Siber Güvenlik",
      description: "Sistemleri, ağları ve verileri modern tehditlerden koru.",
    },
    ai: {
      title: "Yapay Zeka",
      description: "Öğrenen, akıl yürüten ve üreten modeller inşa et.",
    },
    software: {
      title: "Yazılım Mühendisliği",
      description: "Güvenilir yazılımlar tasarla, geliştir ve yayınla.",
    },
    networking: {
      title: "Ağ Teknolojileri",
      description: "Dünyayı birbirine bağlayan protokollere hakim ol.",
    },
    hacking: {
      title: "Etik Hackleme",
      description: "Önemli olanı korumak için saldırgan gibi düşün.",
    },
    data: {
      title: "Veri Bilimi",
      description: "Ham veriyi karara ve keşfe dönüştür.",
    },
    cloud: {
      title: "Bulut Bilişim",
      description:
        "Modern bulut platformlarında ölçeklenebilir sistemler tasarla.",
    },
    os: {
      title: "İşletim Sistemleri",
      description:
        "Bilgisayarların belleği, süreçleri ve dosyaları nasıl yönettiğini öğren.",
    },
    skills: {
      title: "Profesyonel Beceriler",
      description: "İletişim, takım çalışması ve diğer önemli beceriler.",
    },
  },
  tools: {
    notFound: "Araç bulunamadı.",
    loadError: "Bu araç yüklenemedi.",
    pageTitle: "Araçlar",
    pageSubtitle: "Öğrendiklerini pekiştirecek pratik, etkileşimli araçlar.",
    backToTools: "Tüm Araçlar",
    backHomeButton: "Ana Sayfa",
    openTool: "Aracı aç",
    groups: {
      cyber: "Siber Araçlar",
      networking: "Ağ Araçları",
      topics: "Diğer Konular",
    },
    list: {
      passwordStrength: {
        title: "Parola Gücü Denetleyicisi",
        description:
          "Bir parolanın ne kadar güçlü olduğunu ve ne kadar hızlı kırılabileceğini test et.",
      },
      phishingTrainer: {
        title: "Kimlik Avı Farkındalık Eğitimi",
        description:
          "Gerçekçi e-postalarda ve mesajlarda uyarı işaretlerini bul, sonra seni neyin ele verdiğini öğren.",
      },
      emailChecker: {
        title: "E-posta Denetleyici",
        description:
          "Ham bir e-postayı yapıştır ve tam bir kimlik avı analizi al: başlıklar, bağlantılar, ekler ve daha fazlası.",
      },
      hashTool: {
        title: "Hash Araç Takımı",
        description:
          "Kriptografik hash'ler oluştur, tanımla ve karşılaştır — hepsi tarayıcında.",
      },
      encryptionTool: {
        title: "Şifreleme Araç Takımı",
        description:
          "AES ile metin ve dosyaları şifrele ve şifresini çöz, klasik Sezar şifresini dene.",
      },
      linkChecker: {
        title: "Bağlantı Denetleyici",
        description:
          "Bir URL'nin yapısını kimlik avı işaretleri için analiz et, sonra istersen gerçekten nereye gittiğini doğrula.",
      },
      networkDefense: {
        title: "Ağ Savunma Simülatörü",
        description:
          "minimax kullanarak önden düşünen bir yapay zeka saldırganına karşı küçük bir ağı savun - bir zorluk seç ve daha akıllı aramanın yarattığı farkı gör.",
      },
      attackPlanner: {
        title: "Yapay Zeka Saldırı Savunma Planlayıcısı",
        description:
          "Gerçek bir saldırı senaryosu seç ve yapay zekanın oluşturduğu bir savunma planı al: önleme, tespit, müdahale ve iyileştirme.",
      },
      appPermissions: {
        title: "Uygulama İzinleri Denetleyicisi",
        description:
          "Birkaç günlük uygulamanın ne istediğine bak ve hangi izinlerin gerçekten mantıklı olduğuna karar ver.",
      },
      bitAscii: {
        title: "Bit'ten ASCII'ye Dönüştürücü",
        description:
          "Metni ikiliye (binary) ve geri dönüştür - karakterlerin tam olarak nasıl bayta dönüştüğünü gör.",
      },
    },
    passwordStrength: {
      label: "Bir parola gir",
      placeholder: "Kontrol etmek için bir parola yaz...",
      show: "Parolayı göster",
      hide: "Parolayı gizle",
      strengthLabel: "Güç",
      strength: {
        empty: "Sonucu görmek için yazmaya başla",
        veryWeak: "Çok zayıf",
        weak: "Zayıf",
        fair: "Orta",
        strong: "Güçlü",
        veryStrong: "Çok güçlü",
      },
      criteria: {
        length: "En az 8 karakter",
        lower: "Küçük harf",
        upper: "Büyük harf",
        number: "Rakam",
        symbol: "Sembol",
        noPattern: "Tahmin edilebilir desen yok",
        name: "Kişisel isim yok",
      },
      namesWarning:
        "İsimler parola olarak kullanılmamalı. Kendi adın, bir aile üyeninki veya evcil hayvanınınki kolayca tahmin edilebilir.",
      vaultUnlocked: "Kasa açıldı, bu parola çok güçlü.",
      compareShow: "+ Önceki bir parolayla karşılaştır",
      compareHide: "\u2212 Karşılaştırmayı gizle",
      comparePreviousLabel: "Önceki parola",
      comparePreviousPlaceholder: "Eski parolanı yaz...",
      compareTooSimilar:
        "Önceki parolana çok benziyor. Saldırganlar önce bir rakamı veya yılı değiştirmek gibi küçük varyasyonları dener.",
      compareDifferent: "İyi, bu önceki parolandan gerçekten farklı.",
      entropyLabel: "Entropi",
      crackByAttackTypeLabel: "Saldırı türüne göre kırılma süresi",
      crackScenario: {
        online: "Çevrimiçi (deneme sınırlı)",
        offlineFast: "Çevrimdışı, hızlı hash",
        offlineSlow: "Çevrimdışı, yavaş hash (bcrypt)",
      },
      crackTime: {
        instant: "Anında",
        seconds: "Saniyeler",
        minutes: "Dakikalar",
        hours: "Saatler",
        days: "Günler",
        months: "Aylar",
        years: "Yıllar",
        centuries: "Yüzyıllar",
      },
      breach: {
        title: "Veri sızıntısı kontrolü (Have I Been Pwned)",
        checking: "Kontrol ediliyor...",
        foundResult:
          "Veri sızıntılarında {{times}} kez bulundu. Gerçekten kullandığın bir parolaysa hemen değiştir.",
        notFoundResult: "Bilinen veri sızıntılarında bulunamadı.",
        errorResult:
          "Have I Been Pwned'a şu an ulaşılamadı. Biraz sonra tekrar dene.",
        note: "Yalnızca bir SHA-1 hash'inin ilk 5 karakteri gönderilir (k-anonimlik). Tam parolan tarayıcından asla çıkmaz.",
      },
      tipsTitle: "Bu nasıl kırılabilir",
      tips: {
        commonBreach:
          "Bu parolanın tıpkısı gerçek veri sızıntılarında var. Saldırganlar rastgele tahmin etmek yerine bunu binlerce hesaba karşı aynı anda dener, asla kullanma.",
        leetCommonBreach:
          "Harfleri sembollerle değiştirmek (a yerine @, o yerine 0 gibi) bunu doğrudan en yaygın sızdırılmış parolalardan birine dönüştürür. Kırma araçları bu değişimleri zaten dener.",
        fullName:
          "Bu tam bir kişisel isim gibi görünüyor. Tam isim kombinasyonları son derece tahmin edilebilir, ad, baba adı veya soyadını art arda eklemekten kaçın.",
        singleName:
          "İsimler tahmin edilmesi veya bulunması kolaydır. Kendi adını, bir aile üyeninkini veya evcil hayvanınınkini kullanmaktan kaçın.",
        maskPattern:
          'Bir kelimenin ardından birkaç rakam gelmesi ("Summer2024" gibi) çok bilinen bir şekildir. Kırma araçları neredeyse her şeyden önce bunu dener.',
        latinKeyboardPattern:
          'Klavye yürüyüşleri ve tekrarlayan karakterler ("qwerty" veya "aaa" gibi) çoğu kırma aracının varsayılan kurallarında yer alır.',
        arabicKeyboardPattern:
          'Arapça klavye yürüyüşleri ("ضصث" gibi) tıpkı "qwerty" kadar tahmin edilebilir, kırma araçları bölgesel klavye düzenlerini de kapsar.',
        turkishKeyboardPattern:
          'Türkçe klavye desenleri ("şi" veya "ğü" gibi) kırma araçları için standart QWERTY kadar tahmin edilebilir.',
        germanKeyboardPattern:
          'Almanca QWERTZ desenleri ("qwertz" veya "yxcvb" gibi) kırma araçları için standart QWERTY kadar tahmin edilebilir.',
        leetSubstitution:
          "Basit harf-sembol değişimleri hissettirdiği kadar koruma sağlamaz, kırma araçları bu yaygın değişimleri otomatik olarak dener.",
        dictionaryWord:
          "Tek bir düz sözlük kelimesi, saldırganların kullandığı her kelime listesindeki ilk girişlerden biridir.",
        shortLength:
          "Kısa parolalar kaba kuvvet araçlarının erişimi dahilindedir. En az 12-16 karakter hedefle.",
        noWeakness:
          "Burada belirgin bir zafiyet tespit edilmedi, kırmak yine de büyük ölçekli bir kaba kuvvet çabası gerektirir.",
        credentialStuffing:
          "Bu parolayı başka bir yerde tekrar kullanmak, o site sızıntıya uğrarsa kimlik bilgisi doldurma saldırısına karşı savunmasız bırakır.",
        phishing:
          'Hiçbir parola gücü kimlik avına karşı koruma sağlamaz. Hesabını "doğrulamanı" isteyen bağlantı veya mesajlara karşı dikkatli ol.',
        socialMining:
          "Saldırganlar genellikle tahmin etmeye başlamadan önce bile sosyal medyada evcil hayvan adları, doğum tarihleri ve hobiler arar.",
      },
      privacyNote:
        "Aracın geri kalanı tamamen tarayıcında çalışır. Hiçbir şey asla hiçbir yere gönderilmez, kaydedilmez veya loglanmaz.",
      generator: {
        title: "Güçlü bir parola oluştur",
        modeChars: "Rastgele karakterler",
        modePassphrase: "Parola cümlesi",
        placeholder: "Bir tane oluşturmak için Oluştur'a tıkla...",
        copy: "Parolayı kopyala",
        copied: "Panoya kopyalandı",
        copyFailed: "Kopyalanamadı, seçip elle kopyalamayı dene",
        lengthLabel: "Uzunluk",
        uppercase: "Büyük harf (A-Z)",
        lowercase: "Küçük harf (a-z)",
        numbers: "Rakamlar (0-9)",
        symbols: "Semboller (!@#$)",
        avoidAmbiguous: "Belirsiz karakterlerden kaçın (l, 1, I, O, 0)",
        wordCountLabel: "Kelime sayısı",
        separatorLabel: "Ayırıcı (bir veya daha fazlasını seç)",
        separatorDash: "Tire ( - )",
        separatorUnderscore: "Alt çizgi ( _ )",
        separatorDot: "Nokta ( . )",
        separatorSpace: "Boşluk",
        capitalizeWords: "Her kelimeyi büyük harfle başlat",
        addNumber: "Rastgele bir rakam ekle",
        generate: "Parola oluştur",
        selectAtLeastOneChar: "En az bir karakter türü seç.",
        selectAtLeastOneSeparator: "En az bir ayırıcı seç.",
      },
    },
    phishingTrainer: {
      instructionLabel:
        "Şüpheli görünen herhangi bir cümleye, gönderen bilgisine veya bağlantıya dokun",
      progressLabel: "Mesaj {{current}} / {{total}}",
      scoreLabel: "Doğru: {{score}}/{{total}}",
      emailChannel: "E-posta",
      smsChannel: "Kısa mesaj",
      checkButton: "Cevapları kontrol et",
      showAllButton: "Hepsini göster",
      whatGaveItAway: "Onu ne ele verdi",
      attackTypeLabel: "Saldırı türü",
      techniqueLabel: "Teknik",
      whatWouldYouDo: "Sırada ne yapardın?",
      actionOptions: {
        investigate: "Ne olacağını görmek için bağlantıya tıkla veya yanıtla",
        ignore: "Sil ve hiçbir şey söyleme",
        report: "BT veya güvenlik ekibine bildir, sonra sil",
        normal: "Normal karşıla ve devam et",
      },
      actionFeedbackPhishing:
        "Şüpheli mesajları bildirmek güvenlik ekibinin göndereni engellemesine ve aynı mesajı alabilecek diğer kişileri uyarmasına yardımcı olur.",
      actionFeedbackLegit:
        "Burada uyarı işareti yok, bu mesajla normal şekilde ilgilenebilirsin.",
      nextButton: "Sonraki mesaj",
      finishButton: "Sonuçlarımı gör",
      finalScoreCaption: "doğru çözülen mesaj",
      redFlagsRecapTitle: "Hatırlanması gereken uyarı işaretleri",
      tryAgainButton: "Tekrar dene",
      difficulty: {
        easy: "Kolay",
        medium: "Orta",
        hard: "Zor",
      },
    },
    emailChecker: {
      inputLabel: "Ham e-posta kaynağı",
      pasteButton: "Yapıştır",
      clearButton: "Temizle",
      exampleButton: "Örnek yükle",
      inputPlaceholder:
        "Başlıklar dahil (From, Received, vb.) tam e-posta kaynağını buraya yapıştır...",
      pasteHint: "Pano okunamadı — Ctrl/Cmd+V ile manuel olarak yapıştır.",
      analyzeButton: "E-postayı analiz et",
      riskBand: {
        low: "Düşük risk",
        medium: "Bazı uyarı işaretleri",
        high: "Yüksek risk",
      },
      headerSummaryTitle: "Başlık özeti",
      fromLabel: "Kimden",
      replyToLabel: "Yanıtla",
      authLabel: "Kimlik doğrulama",
      trustButton: "Gönderen alan adının yaşını kontrol et",
      trustChecking: "Kontrol ediliyor...",
      trustSignInPrompt:
        "Gönderen alan adının yaşını kontrol etmek için giriş yap.",
      trustLimitReached: "Bugünkü kontrol limitine ulaştın, yarın tekrar dene.",
      trustCheckFailed: "Alan adı şu anda kontrol edilemedi.",
      trustResultWithAge: "{{domain}} {{days}} gün önce kaydedildi.",
      trustResultUnknown:
        "{{domain}} adının ne zaman kaydedildiği belirlenemedi.",
      findingsTitle: "Bulgular",
      noFindings: "Bu e-postada uyarı işareti bulunamadı.",
      findings: {
        authFail: {
          label: "Kimlik doğrulama başarısız",
          text: "SPF, DKIM veya DMARC başarısız oldu; bu, gönderenin alan adının taklit edildiğine dair güçlü bir işaret.",
        },
        replyToMismatch: {
          label: "Yanıtla-Adresi gönderenle uyuşmuyor",
          text: "Yanıtlar, gönderen adresinden ({{fromDomain}}) farklı bir alan adına ({{replyToDomain}}) gidecek.",
        },
        linkTextMismatch: {
          label: "Bağlantı metni hedefle uyuşmuyor",
          text: '"{{displayText}}" gösteriyor ama aslında {{hrefDomain}} adresine gidiyor.',
        },
        credentialRequest: {
          label: "Kimlik bilgisi istiyor",
          text: '"{{phrase}}" gibi ifadeler içeriyor; meşru hizmetler bunu e-postayla nadiren ister.',
        },
        riskyAttachment: {
          label: "Riskli ek dosyadan bahsediliyor",
          text: "{{filename}}, kötü amaçlı yazılım yaymak için sıkça kullanılan bir dosya türüne sahip.",
        },
        unearnedReward: {
          label: "Hak edilmemiş ödül",
          text: '"{{phrase}}" gibi ifadeler içeriyor; bu, klasik bir avans ücreti dolandırıcılığı örüntüsü.',
        },
        urgencyLanguage: {
          label: "Aciliyet dili",
          text: '"{{phrase}}" gibi ifadeler içeriyor; düşünmeden hareket etmeniz için tasarlanmış.',
        },
        genericGreeting: {
          label: "Genel selamlama",
          text: 'Sizi adınızla hitap etmek yerine "{{phrase}}" kullanıyor.',
        },
        ipBasedLink: {
          label: "Bağlantı ham bir IP adresine gidiyor",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "Kısaltılmış bağlantı",
          text: "{{url}} gerçek hedefini gizliyor.",
        },
        noReceivedHeaders: {
          label: "Received başlığı yok",
          text: "Gerçek bir e-posta neredeyse her zaman en az bir posta sunucusundan geçer; bunun eksikliği elle oluşturulmuş bir başlığa işaret edebilir.",
        },
      },
      routeTitle: "Teslimat rotası",
      linksTitle: "Bağlantılar",
      linkTagIp: "doğrudan IP",
      linkTagShortened: "kısaltılmış",
      linkTagStandard: "standart",
      privacyNote:
        "Alan adı yaşı kontrolü hariç her şey tamamen tarayıcında çalışır; bu kontrol yalnızca çıplak bir alan adı gönderir, e-postanın kendisini asla göndermez.",
    },
    hashTool: {
      tabs: {
        generate: "Oluştur",
        identify: "Tanımla",
        compare: "Karşılaştır",
      },
      generate: {
        label: "Hash'lenecek metin",
        placeholder: "Bir metin yaz ya da yapıştır...",
        empty: "Hash'leri görmek için yazmaya başla",
        copy: "Hash'i kopyala",
        copied: "Panoya kopyalandı",
        copyFailed: "Kopyalanamadı, manuel olarak seçip kopyalamayı dene",
      },
      identify: {
        label: "Bir hash yapıştır",
        placeholder: "Tanımlamak için bir hash yapıştır...",
        empty: "Olası eşleşmeleri görmek için yukarıya bir hash yapıştır",
        resultsTitle: "Olası eşleşmeler",
        ambiguousNote:
          "Birden fazla algoritma tam olarak bu uzunlukta veya formatta çıktı üretebilir, sadece bu diziden hangisi olduğunu anlamanın bir yolu yok.",
        noMatch: "Bilinen bir hash formatıyla eşleşmiyor.",
      },
      compare: {
        labelA: "Hash A",
        labelB: "Hash B",
        placeholder: "Bir hash yapıştır...",
        match: "Bunlar eşleşiyor",
        noMatch: "Bunlar eşleşmiyor",
        empty: "Karşılaştırmak için her iki hash'i de yapıştır",
        note: "Karşılaştırma büyük/küçük harf ve fazladan boşlukları yok sayar.",
      },
      privacyNote:
        "Her şey tamamen tarayıcında, yerel olarak çalışır. Hiçbir şey hiçbir yere gönderilmez, kaydedilmez veya günlüğe yazılmaz.",
    },
    encryptionTool: {
      tabs: { modern: "Modern (AES)", classic: "Sezar Şifresi" },
      privacyNote:
        "Her şey tamamen tarayıcında, yerel olarak çalışır. Hiçbir şey hiçbir yere gönderilmez, kaydedilmez veya günlüğe yazılmaz.",
      modern: {
        warning:
          "Bu parolayı unutursan verilerini geri getirmenin hiçbir yolu yok.",
        encryptButton: "Şifrele",
        decryptButton: "Şifresini çöz",
        textTab: "Metin",
        fileTab: "Dosya",
        passphraseLabel: "Parola",
        passphrasePlaceholder: "Güçlü bir parola yaz...",
        crackTimeLabel: "Tahmini kırılma süresi: {{time}}",
        textPlaceholderEncrypt: "Şifrelemek istediğin metni yaz...",
        textPlaceholderDecrypt: "Şifreli metni yapıştır...",
        encrypting: "Şifreleniyor...",
        decrypting: "Şifre çözülüyor...",
        errors: {
          needPassphrase: "Önce bir parola gir.",
          needText: "Bir metin de gir.",
          needFile: "Önce bir dosya seç.",
          fileTooLarge:
            "Dosya 20 MB'tan büyük — bu demoda daha küçük bir dosya dene.",
          encryptFailed: "Şifreleme sırasında bir şeyler ters gitti.",
          decryptFailed:
            "Şifre çözülemedi — parola yanlış ya da dosya/metin geçerli değil.",
        },
        outputLabel: "Çıktı",
        copyButton: "Kopyala",
        copied: "Panoya kopyalandı",
        copyFailed: "Kopyalanamadı, manuel olarak seçip kopyalamayı dene",
        downloadAgainButton: "Tekrar indir",
        breakdownLabel: "Çıktının içinde ne var",
        cipherBytesLabel:
          "{{count}} bayt (16 baytlık bir kimlik doğrulama etiketi dahil)",
      },
      classic: {
        textLabel: "Metin",
        cipherTabs: { caesar: "Sezar", vigenere: "Vigenère" },
        caesar: {
          shiftLabel: "Kaydırma",
          outputLabel: "Çıktı",
          crackButton: "Kırmayı dene (tüm 26 kaydırma)",
        },
        vigenere: {
          keywordLabel: "Anahtar kelime",
          keywordPlaceholder: "Bir anahtar kelime yaz...",
          encryptButton: "Şifrele",
          decryptButton: "Şifresini çöz",
          outputLabel: "Çıktı",
          needKeyword: "Önce bir anahtar kelime gir.",
        },
      },
    },
    linkChecker: {
      urlLabel: "URL",
      urlPlaceholder: "Kontrol etmek için bir bağlantı yapıştır...",
      analyzeButton: "Bağlantıyı kontrol et",
      invalid: "Bu geçerli bir URL değil — biçimi kontrol edip tekrar dene.",
      scoreLabel: "tahmini güvenlik",
      scoreTone: {
        good: "Şu ana kadar kontrol edilenlere göre oldukça güven verici.",
        mixed:
          "Daha net bir tablo için hâlâ daha fazla doğrulama gerekiyor — aşağıdaki sunucu kontrollerini çalıştır.",
        bad: "Burada net uyarı işaretleri var, bu bağlantıya tıklamadan önce dikkatli ol.",
      },
      breakdownLabel: "URL dökümü",
      protocolLabel: "Protokol:",
      hostLabel: "Sunucu:",
      pathLabel: "Yol:",
      checksLabel: "{{total}} kontrolden {{count}} tanesi işaretlendi",
      checks: {
        ipHost: {
          label: "Alan adı mı IP mi?",
          clean: "Bu normal bir alan adı kullanıyor.",
          flagged:
            "Bu, alan adı yerine doğrudan bir IP adresi kullanıyor — meşru sitelerde nadir görülür.",
        },
        userinfo: {
          label: 'URL\'de "@" işareti',
          clean: 'Arkasında gerçek bir adresi gizleyen bir "@" yok.',
          flagged:
            '"@" işaretinden önceki kısım ({{username}}) gerçek adres değil — gerçek sunucu {{hostname}}.',
        },
        punycode: {
          label: "Punycode kodlaması",
          clean: "Şüpheli bir Punycode kodlaması yok.",
          flagged:
            "Bu alan adı Punycode ile kodlanmış — bilinen bir siteyi taklit etmek için benzer karakterler kullanıyor olabilir.",
        },
        subdomains: {
          label: "Alan adı parça sayısı",
          clean: "Alan adında normal sayıda parça var.",
          flagged:
            "Bu alan adının {{count}} parçası var — alışılmadık derecede fazla, gerçek alan adını sonda gizlemek için kullanılabilir.",
        },
        shortener: {
          label: "URL kısaltıcı",
          clean: "Bilinen bir URL kısaltma hizmeti değil.",
          flagged:
            "Bu bilinen bir URL kısaltma alan adı — gerçek hedef tıklayana kadar gizli.",
        },
        https: {
          label: "HTTPS mi?",
          clean: "https kullanıyor.",
          flagged:
            "Bu https değil, http — tarayıcı ile site arasındaki veriler şifrelenmiyor.",
        },
        tld: {
          label: "Alan adı uzantısı (TLD)",
          clean:
            "Alan adı uzantısı (.{{tld}}) yaygın olarak istismarla ilişkilendirilen uzantılardan değil.",
          flagged:
            ".{{tld}} kimlik avında orantısız şekilde istismar edilen ücretsiz veya çok ucuz bir uzantı — tek başına kanıt değil.",
        },
        brand: {
          label: "Bilinen marka taklidi",
          clean: "Başka bir alan adında bilinen bir marka adı yok.",
          flagged:
            'Bu URL "{{brand}}" adını içeriyor ama gerçek alan adı {{officialDomain}} değil.',
        },
      },
      disclaimer:
        "Bu sadece yapısal kalıpları işaret eder, %100 güvenlik garantisi değildir — yukarıda hiçbir işaret olmayan bir bağlantı yine de tehlikeli olabilir.",
      server: {
        label: "Sunucu kontrolleri (giriş gerektirir)",
        button: "Yönlendirmeleri ve alan adı yaşını kontrol et",
        checking: "Kontrol ediliyor...",
        signInPrompt: "Sunucu kontrollerini çalıştırmak için giriş yap.",
        limitReached: "Bugünkü kontrol limitine ulaştın, yarın tekrar dene.",
        failed: "Sunucu kontrolü şu anda tamamlanamadı.",
        redirectLabel: "Yönlendirme zinciri",
        domainAgeLabel: "Alan adı kayıt tarihi",
        domainAgeUnknown: "Bu alan adının kayıt tarihi belirlenemedi.",
        daysOld: "{{count}} gün önce",
        googleFlagged:
          "Google Safe Browsing tarafından tehlikeli olarak işaretlendi.",
        googleClean: "Google Safe Browsing herhangi bir sorun bulmadı.",
        googleUnavailable:
          "Google Safe Browsing kontrolü şu anda kullanılamıyor.",
      },
    },
    networkDefense: {
      introTitle: "Sen savunmacısın",
      introBody:
        "Bir yapay zeka saldırganı ağını kırıp veritabanına ulaşmaya çalışacak. Onu durdurmak için zayıf noktaları yama ve ihlalleri izole et - her birinden sınırlı sayıda hakkın var.",
      difficulty: { easy: "Kolay", medium: "Orta", hard: "Zor" },
      difficultyHint: {
        easy: "Saldırgan hamlelerini rastgele seçer - hiç önden düşünme yok.",
        medium: "Saldırgan minimax kullanarak birkaç hamle önden düşünür.",
        hard: "Saldırgan alfa-beta budaması ile minimax kullanarak daha derin ve hızlı arar.",
      },
      startButton: "Savunmaya başla",
      round: "Tur {{round}}/{{max}}",
      patchesLeft: "{{count}} yama kaldı",
      isolatesLeft: "{{count}} izolasyon kaldı",
      nodes: {
        firewall: "Güvenlik duvarı",
        webServer: "Web sunucusu",
        mailServer: "Posta sunucusu",
        vpn: "VPN",
        appServer: "Uygulama sunucusu",
        fileServer: "Dosya sunucusu",
        adminPanel: "Yönetim paneli",
        database: "Veritabanı",
      },
      defenderWon: "Hattı korudun",
      defenderWonBody: "Saldırgan süre dolmadan veritabanına asla ulaşamadı.",
      attackerWon: "İhlal - veritabanı ele geçirildi",
      attackerWonBody:
        "Güçlü bir savunma bile sonunda aşılabilir - gerçek güvenliğin tek mükemmel bir duvara değil, katmanlara dayanmasının nedeni bu.",
      playAgain: "Tekrar oyna",
      attackerThinking: "Saldırgan bir sonraki hamlesini seçiyor...",
      yourTurn: "Sıra sende",
      noDefensesLeft:
        "Yaman ve izolasyonun kalmadı - saldırgan bedava bir hamle kazanıyor.",
      passButton: "Geç",
      patchAction: "Bir düğümü yama",
      noPatchesLeft: "Yama kalmadı.",
      isolateAction: "Ele geçirilmiş bir düğümü izole et",
      noIsolatesLeft: "İzolasyon kalmadı, ya da izole edilecek bir şey yok.",
      nodesExplored:
        "Saldırgan bu hamleyi seçmeden önce {{count}} olası sonucu değerlendirdi.",
    },
    attackPlanner: {
      signInTitle: "Savunma planlayıcısını kullanmak için giriş yap",
      signInSubtitle:
        "Yapay zeka savunma planları oluşturmak ve kullanımını takip etmek için ücretsiz hesap oluştur veya giriş yap.",
      scenarioPickerLabel: "Bir saldırı senaryosu seç",
      scenarios: {
        phishing: {
          title: "Kimlik Avı Kampanyası",
          description:
            "Kimlik bilgilerini çalmak veya kötü amaçlı yazılım yüklemek için tasarlanmış aldatıcı e-postalar veya mesajlar.",
        },
        ransomware: {
          title: "Fidye Yazılımı",
          description:
            "Dosyaları şifreleyen ve erişimi geri vermek için ödeme talep eden kötü amaçlı yazılım.",
        },
        ddos: {
          title: "DDoS Saldırısı",
          description:
            "Gerçek kullanıcılara hizmet veremeyene kadar bir sistemi trafiğe boğmak.",
        },
        insiderThreat: {
          title: "İçeriden Gelen Tehdit",
          description:
            "Zaten meşru erişimi olan biri tarafından verilen zarar.",
        },
        credentialStuffing: {
          title: "Kimlik Bilgisi Doldurma",
          description:
            "Başka veri ihlallerinden sızan parolalarla yapılan otomatik giriş denemeleri.",
        },
        sqlInjection: {
          title: "SQL Enjeksiyonu",
          description:
            "Savunmasız bir uygulama üzerinden veritabanını manipüle eden kötü amaçlı girdi.",
        },
        supplyChain: {
          title: "Tedarik Zinciri Saldırısı",
          description:
            "Kullanıcılarına ulaşmak için güvenilir bir tedarikçiyi veya bağımlılığı ele geçirmek.",
        },
        socialEngineering: {
          title: "Sosyal Mühendislik",
          description:
            "Güvenlik prosedürünü çiğnetmek için sistemler yerine insanları manipüle etmek.",
        },
      },
      contextLabel: "Bağlam ekle (isteğe bağlı)",
      contextPlaceholder:
        "örn. 5 çalışanı olan küçük bir online mağaza işletiyorum...",
      contextHint: "{{count}}/{{max}} karakter",
      generateButton: "Savunma planı oluştur",
      generating: "Planın oluşturuluyor...",
      changeScenarioButton: "Farklı bir senaryo seç",
      severityLabel: "Tipik önem derecesi",
      severity: {
        low: "Düşük",
        medium: "Orta",
        high: "Yüksek",
        critical: "Kritik",
      },
      sections: {
        prevention: "Önleme",
        detection: "Tespit",
        response: "Müdahale",
        recovery: "İyileştirme",
      },
      limitReached: "Günlük plan limitine ulaşıldı, lütfen yarın tekrar dene.",
      failed: "Şu anda plan oluşturulamadı, lütfen tekrar dene.",
      disclaimer:
        "Öğrenme amaçlı yapay zeka tarafından oluşturulmuştur. Gerçek bir olayda güvenmeden önce resmi rehberlikle doğrula.",
    },
    appPermissions: {
      instructionLabel:
        "Bu uygulamanın istediği her izin için, uygulamanın ne yapması gerektiğine göre İzin Ver veya Reddet'e dokun.",
      progressLabel: "{{total}} uygulamadan {{current}}.",
      scoreLabel: "{{score}}/{{total}} doğru",
      allowLabel: "İzin Ver",
      denyLabel: "Reddet",
      checkButton: "Cevaplarımı kontrol et",
      nextButton: "Sonraki uygulama",
      finishButton: "Bitir",
      tryAgainButton: "Tekrar dene",
      justifiedNote: "Bu tür bir uygulama için mantıklı.",
      whyThisMatters: "Bu neden önemli",
      finalScoreCaption: "İzinlerin %{{pct}}'ini doğru değerlendirdin.",
      tipsTitle: "Hatırlamakta fayda var",
      permissions: {
        camera: "Kamera",
        microphone: "Mikrofon",
        contacts: "Kişiler",
        location: "Konum",
        sms: "SMS / Kısa Mesaj",
        callLog: "Arama Kaydı",
        storage: "Fotoğraflar ve Depolama",
        motionFitness: "Hareket ve Fitness",
      },
      apps: {
        flashlight: {
          name: "El Feneri",
          description: "Kameranın flaşını açıp kapatan basit bir uygulama.",
        },
        qrScanner: {
          name: "QR Kod Tarayıcı",
          description: "Kamerayla QR kodlarını tarar ve içeriğini gösterir.",
        },
        photoEditor: {
          name: "Fotoğraf Düzenleyici",
          description:
            "Cihazında zaten bulunan fotoğrafları kırpar, filtreler ve rötuşlar.",
        },
        messaging: {
          name: "Mesajlaşma",
          description: "Kişilerine metin, fotoğraf ve sesli mesaj gönderir.",
        },
        fitnessTracker: {
          name: "Adım Sayar",
          description:
            "Adımlarını sayar, koşularını ve yürüyüşlerini haritalar.",
        },
        puzzleGame: {
          name: "Blok Bulmaca",
          description:
            "Sosyal veya çevrimiçi özelliği olmayan, bağımsız çevrimdışı bir bulmaca oyunu.",
        },
        weather: {
          name: "Hava Durumu",
          description: "Bulunduğun konum için hava tahminini gösterir.",
        },
        videoCalling: {
          name: "Görüntülü Arama",
          description:
            "Kişilerindeki insanlarla görüntülü ve sesli arama yapar.",
        },
        banking: {
          name: "Mobil Bankacılık",
          description:
            "Banka hesabından bakiyeleri kontrol eder, çek yatırır ve fatura öder.",
        },
        rideHailing: {
          name: "Araç Çağırma",
          description: "Seni almak ve bir yere götürmek için bir araç ayırtır.",
        },
        sleepTracker: {
          name: "Uyku Takibi",
          description:
            "Telefonunun hareket sensörlerini kullanarak geceleri uykunu takip eder.",
        },
        newsReader: {
          name: "Haber Okuyucu",
          description:
            "Favori kaynaklarından başlıkları ve makaleleri tek bir akışta toplar.",
        },
      },
      reasons: {
        flashlightContacts:
          "Bir el feneri sadece kameranın flaşını kontrol etmeli - kişi listeni okumasının hiçbir sebebi yok.",
        flashlightLocation:
          "Bir ışığı açıp kapatmak, nerede olduğunu bilmeyi gerektirmez.",
        flashlightSms:
          "Bir el fenerinin metin mesajı okuma veya gönderme ile ilgili hiçbir özelliği yoktur.",
        flashlightMicrophone:
          "Basit bir el fenerinin mikrofonun için meşru bir kullanımı yoktur.",
        qrContacts:
          "Bir kodu taramak, kimleri tanıdığına erişmeyi gerektirmez.",
        qrCallLog:
          "Bir QR kodu okumanın arama geçmişinle hiçbir ilgisi yoktur.",
        qrLocation:
          "Uygulama, nerede olduğunu bilmeden kodun içindekini çözebilir.",
        photoLocation:
          "Cihazında zaten bulunan fotoğrafları düzenlemek, canlı konum erişimi gerektirmez.",
        photoContacts: "Hiçbir düzenleme özelliği kişi listeni gerektirmez.",
        photoMicrophone:
          "Bu bir fotoğraf düzenleyici, ses veya video aracı değil - sesin için meşru bir kullanımı yoktur.",
        messagingCallLog:
          "Mesaj göndermek, kimi ne zaman aradığını okumayı gerektirmez.",
        messagingLocation:
          "Bir konuşma için konumunu paylaşmak makuldür; bunu arka planda sürekli istemek değildir.",
        fitnessContacts:
          "Adım saymak ve koşu takip etmek, kimleri tanıdığını bilmeyi gerektirmez.",
        fitnessCamera:
          "Bir adım sayarın kameranıza erişmesi için hiçbir sebep yoktur.",
        fitnessSms:
          "Hiçbir fitness takip özelliği metin mesajlarınla ilgili değildir.",
        gameContacts:
          "Bağımsız bir bulmaca oyununun kimleri tanıdığını bilmesi için hiçbir sebep yoktur.",
        gameLocation: "Bulmaca çözmek, nerede olduğunu bilmeyi gerektirmez.",
        gameMicrophone: "Bu oyunda seni duyması gereken hiçbir şey yoktur.",
        gameCamera:
          "Bir bulmaca oyununun kameran için meşru bir kullanımı yoktur.",
        gameSms:
          "Bu oyunun metin mesajı okuması veya göndermesi için hiçbir sebep yoktur.",
        weatherContacts: "Hava durumuna bakmak kişi listeni gerektirmez.",
        weatherCamera:
          "Bir hava durumu uygulamasının kameran için meşru bir kullanımı yoktur.",
        weatherMicrophone: "Hiçbir tahmin özelliği seni duymayı gerektirmez.",
        weatherSms:
          "Hava durumu güncellemeleri metin mesajlarını okumayı gerektirmez.",
        videoSms:
          "Dikkat etmen gereken bu: kamera, mikrofon, kişiler ve depolama görüntülü arama için makuldür, ancak SMS erişimi, kötü amaçlı uygulamaların telefonuna gönderilen tek kullanımlık giriş kodlarını ele geçirmesinin klasik bir yoludur.",
        bankingContacts:
          "Bakiyeni kontrol etmek veya çek yatırmak, kişiden kişiye ödeme özelliği kullanmadığın sürece kişi listeni gerektirmez.",
        bankingMicrophone:
          "Hiçbir temel bankacılık özelliği seni duymayı gerektirmez.",
        bankingCallLog:
          "Paranı yönetmek, kimi ne zaman aradığını okumayı gerektirmez.",
        rideHailingMicrophone:
          "Bir yolculuk ayırtmak ve takip etmek, mikrofonuna erişim gerektirmez.",
        rideHailingCamera:
          "Hiçbir temel yolculuk ayırtma özelliği kameranıza ihtiyaç duymaz.",
        rideHailingSms:
          "Bu uygulamanın bir yolculuk ayırtmak için metin mesajı okuması veya göndermesi için hiçbir sebep yoktur.",
        sleepContacts:
          "Uykunu takip etmek, kimleri tanıdığını bilmeyi gerektirmez.",
        sleepCamera:
          "Gece boyunca çalışan bir uyku takipçisinin kameranıza erişmesi için hiçbir sebep yoktur.",
        sleepSms:
          "Hiçbir uyku takip özelliği metin mesajlarınla ilgili değildir.",
        sleepCallLog:
          "Nasıl uyuduğunu takip etmek, arama geçmişini gerektirmez.",
        newsLocation:
          "Makale okumak, tam olarak nerede olduğunu bilmeyi gerektirmez - en fazla yerel başlıklar için genel bir bölge.",
        newsContacts:
          "Bir haber okuyucunun kişi listene ihtiyaç duyması için hiçbir sebep yoktur.",
        newsCamera:
          "Bir haber okuyucunun kameran için meşru bir kullanımı yoktur.",
        newsMicrophone: "Hiçbir okuma özelliği seni duymayı gerektirmez.",
        newsSms:
          "Bu uygulamanın metin mesajı okuması veya göndermesi için hiçbir sebep yoktur.",
      },
      tips: {
        doesItMakeSense:
          "Bir izin vermeden önce kendine sor: bu, uygulamanın yaptığı işle gerçekten mantıklı mı?",
        utilityApps:
          "Basit araçlar - el fenerleri, QR okuyucular, hesap makineleri - neredeyse hiçbir zaman kişilerine, SMS'ine veya hassas konumuna ihtiyaç duymaz.",
        smsRisk:
          "SMS erişimi özellikle risklidir: bir uygulamanın yalnızca sana ait olması gereken tek kullanımlık giriş kodlarını okumasına izin verebilir.",
        changeAnytime:
          "Uygulama izinlerini yalnızca kurulumda değil, telefonunun ayarlarından istediğin zaman gözden geçirip değiştirebilirsin.",
        whenInDoubt:
          "Şüphe duyduğunda izni reddet - bir özellik gerçekten ihtiyaç duyarsa, uygulama bunu tekrar isteyip nedenini açıklar.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "Metin → İkili",
        binaryToText: "İkili → Metin",
      },
      textLabel: "Metin",
      textPlaceholder: "Bir şey yaz...",
      binaryOutputLabel: "İkili",
      binaryEmptyState: "İkili çıktı burada görünecek.",
      binaryLabel: "İkili",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "Metin",
      textEmptyState: "Çözülen metin burada görünecek.",
      byteCount: "{{count}} bayt",
      copy: "Kopyala",
      copied: "Panoya kopyalandı",
      copyFailed: "Panoya kopyalanamadı",
      errors: {
        invalidChars:
          "İkili sadece 0 ve 1 içermeli (baytlar arasındaki boşluklar sorun değil).",
        notMultipleOfEight:
          "Her bayt tam olarak 8 bit gerektirir - toplam 8'in katı değil.",
        invalidUtf8: "Bu baytlar geçerli bir UTF-8 metni oluşturmuyor.",
      },
    },
  },
  auth: {
    toastAccountCreated: "Hesap oluşturuldu! My Idea Academy'ya hoş geldin.",
    toastWelcomeBack: "Tekrar hoş geldin!",
    toastGenericError: "Bir şeyler ters gitti, tekrar dene.",
    toastGoogleFailed: "Google ile giriş yapılamadı, tekrar dene.",
    signInTitle: "Tekrar hoş geldin",
    signUpTitle: "Hesabını oluştur",
    signInSubtitle: "İlerlemeni ve sertifikalarını takip etmek için giriş yap.",
    signUpSubtitle: "İlerlemeni kaydetmek ve sertifika kazanmak için kaydol.",
    continueWithGoogle: "Google ile devam et",
    orDivider: "veya",
    namePlaceholder: "Adın",
    emailPlaceholder: "E-posta",
    passwordPlaceholder: "Parola",
    signInButton: "Giriş yap",
    signUpButton: "Hesap oluştur",
    newHere: "Burada yeni misin?",
    alreadyHaveAccount: "Zaten bir hesabın var mı?",
    createAccountLink: "Hesap oluştur",
    signInLink: "Giriş yap",
  },
  verify: {
    notFound: "Bu kimlikle bir sertifika bulamadık.",
    backHome: "Ana sayfaya dön",
    verifiedTitle: "Sertifika doğrulandı",
    verifiedSubtitle:
      "Bu sertifika gerçekten My Idea Academy tarafından verilmiştir.",
    recipientLabel: "Alıcı",
    topicLabel: "Yol",
    scoreLabel: "Puan",
    issuedLabel: "Verilme tarihi",
  },
  certificate: {
    title: "Tamamlama Sertifikası",
    presentedTo: "Gururla şu kişiye sunulmuştur:",
    completingCourse: "kursu başarıyla tamamladığı için",
    scoreLine: "Son puan: %{{score}}",
    role: "Şirket müdürü",
    issueDateLabel: "Veriliş tarihi",
    closeLabel: "Kapat",
    certIdLabel: "Sertifika kimliği:",
    downloadButton: "PDF indir",
    pending: "beklemede",
  },
  dashboard: {
    signInTitle: "Panelini görmek için giriş yap",
    signInSubtitle:
      "İlerlemeni, sertifikalarını ve öğrenme etkinliğini takip et.",
    signIn: "Giriş yap",
    welcomeBack: "Tekrar hoş geldin, {{name}}",
    subtitle: "Kaldığın yer burası.",
    continueLearningHeading: "Öğrenmeye devam et",
    noInProgressCourses:
      "Henüz bir kursa başlamadın. Başlamak için birini seç.",
    continueFrom: "Şuradan devam et: {{lesson}}",
    continueButton: "Devam et",
    lessonProgress: "{{completed}}/{{total}} ders",
    progressHeading: "İlerlemen",
    statusPassed: "Geçti",
    statusInProgress: "Devam ediyor",
    statusNotStarted: "Başlanmadı",
    certificatesHeading: "Sertifikalar",
    noCertificates:
      "Henüz hiç sertifika kazanmadın. Bir tane açmak için bir sınavı geç.",
    timeOnPlatform: "Bu platformda geçirdiğin süre",
    hourShort: "sa",
    minuteShort: "dk",
    lessThanAMinute: "Bir dakikadan az",
    breakReminderLabel: "Göz dinlendirme hatırlatmaları",
    breakReminderDescription:
      "Her 20 dakikada bir gözlerini dinlendirmen için nazik bir hatırlatma. Varsayılan olarak kapalı.",
    breakReminderToast:
      "Kısa bir mola zamanı - gözlerini dinlendir, zihnini boşalt ve yeniden başla.",
  },
  account: {
    profileHeading: "Hesap",
    signedInAs: "{{email}} olarak giriş yaptın",
    signOut: "Çıkış yap",
    signedIn: "Giriş yapıldı",
    signInPrompt: "Hesabını yönetmek için giriş yap",
    signIn: "Giriş yap",
    settingsHeading: "Hesap ayarları",
    displayNameLabel: "Görünen ad",
    displayNamePlaceholder: "Adın",
    saveNameButton: "Adı kaydet",
    nameUpdated: "Adın güncellendi.",
    nameUpdateFailed: "Adın güncellenemedi, tekrar dene.",
    passwordHeading: "Şifre",
    newPasswordLabel: "Yeni şifre",
    confirmPasswordLabel: "Yeni şifreyi onayla",
    changePasswordButton: "Şifreyi değiştir",
    passwordTooShort: "Şifre en az 8 karakter olmalı.",
    passwordMismatch: "Şifreler eşleşmiyor.",
    passwordUpdated: "Şifren değiştirildi.",
    passwordUpdateFailed: "Şifren değiştirilemedi, tekrar dene.",
    emailHeading: "E-posta adresi",
    newEmailLabel: "Yeni e-posta",
    changeEmailButton: "E-postayı güncelle",
    emailConfirmSent: "Değişikliği onaylamak için yeni e-postanı kontrol et.",
    emailUpdateFailed: "E-posta güncellenemedi, tekrar dene.",
    oauthManagedNote:
      "Google ile giriş yaptın - şifren ve e-postan Google hesabın üzerinden yönetilir.",
    dangerZoneHeading: "Tehlikeli bölge",
    deleteAccountHeading: "Hesabı sil",
    deleteAccountBody:
      "Profilini, quiz ilerlemeni ve sertifikalarını kalıcı olarak siler. Kazandığın sertifikalar silindikten sonra doğrulanamaz hale gelir. Bu işlem geri alınamaz.",
    deleteAccountButton: "Hesabı sil",
    deleteConfirmTitle: "Kesinlikle emin misin?",
    deleteConfirmBody:
      "Bu işlem hesabını ve ilişkili tüm verileri kalıcı olarak siler - sonrasında geri getirmenin bir yolu yoktur.",
    deleteConfirmLabel: "Onaylamak için {{email}} yaz",
    cancelButton: "İptal",
    deleteAccountFailed: "Hesabın şu anda silinemedi, tekrar dene.",
    supportHeading: "Destek",
    faqHeading: "Sık sorulan sorular",
    faqQ1: "My Idea Academy ücretsiz mi?",
    faqA1: "Evet. Tüm dersler, sınavlar, araçlar ve sertifikalar ücretsizdir.",
    faqQ2: "Sertifikalar nasıl çalışır?",
    faqA2:
      "Bir yolun sınavını geçerek sertifika kazan. Herkes benzersiz bağlantısıyla doğrulayabilir.",
    faqQ3: "Bir sınavı tekrar çözebilir miyim?",
    faqA3: "Evet, istediğin kadar - en iyi sonucun sayılır.",
    contactHeading: "Hâlâ yardıma mı ihtiyacın var?",
    contactBody: "Bize e-posta at, sana dönüş yapalım.",
    crisisNote:
      "Bir ruh sağlığı krizi yaşıyorsan, yerel bir kriz hattıyla iletişime geç - findahelpline.com şu anda birini bulmana yardımcı olabilir.",
  },
  a11y: {
    textSize: "Yazı boyutu",
    visionReading: "Görme ve okuma",
    highContrast: "Yüksek kontrast",
    dyslexiaFont: "Disleksi dostu yazı tipi",
    underlineLinks: "Bağlantıların altını çiz",
    motorMotion: "Motor beceriler ve hareket",
    largerTargets: "Daha büyük düğme ve bağlantılar",
    reduceMotion: "Hareketi azalt",
    keyboardNav: "Klavye ile gezinme",
    screenReading: "Sesli okuma",
    stopReading: "Okumayı durdur",
    readAloud: "Sayfayı sesli oku",
    optionsLabel: "Erişilebilirlik seçenekleri",
    skipToContent: "Ana içeriğe geç",
  },
  quiz: {
    loading: "Yükleniyor…",
    loadingQuiz: "Sınav yükleniyor…",
    noQuizAvailable: "Bu yol için henüz sınav yok.",
    signInTitle: "Bu sınavı çözmek için giriş yap",
    signInSubtitle:
      "Soruları cevaplamak, puanını takip etmek ve sertifika kazanmak için ücretsiz hesap oluştur ya da giriş yap.",
    backToLessons: "Derslere dön",
    sessionExpired: "Oturumun sona erdi, tekrar giriş yap.",
    answerCheckFailed: "Bu cevap kontrol edilemedi, tekrar dene.",
    signInToSave: "Puanını kaydetmek ve sertifika kazanmak için giriş yap.",
    saveFailed: "Denemen kaydedilemedi",
    congratulations: "Tebrikler!",
    almostThere: "Neredeyse başardın",
    scoreLine: "{{score}}/{{total}} aldın (%{{percentage}})",
    savingAttempt: "Denemen kaydediliyor…",
    viewCertificate: "Sertifikayı görüntüle",
    tryAgain: "Tekrar dene",
    signInToClaim: "Sertifikanı almak için giriş yap",
    questionCounter: "Soru {{current}} / {{total}}",
    scoreCounter: "Puan: {{score}}",
    explanationLabel: "Açıklama:",
    finish: "Bitir",
    next: "İleri",
  },
  courses: {
    pageTitle: "Kurslar",
    pageSubtitle:
      "Üniteler, dersler, hızlı kontroller ve sınavlar içeren yapılandırılmış kurslar.",
    noneAvailable: "Henüz kurs yok — yakında tekrar kontrol edin.",
    startCourse: "Kursa başla",
    allCourses: "Tüm kurslar",
    unitCount_one: "{{count}} ünite",
    unitCount_other: "{{count}} ünite",
    lessonCount_one: "{{count}} ders",
    lessonCount_other: "{{count}} ders",
    backToCourse: "Kursa dön",
    quickCheck: {
      title: "Hızlı Kontrol",
      scoreLine: "{{score}}/{{total}} doğru",
      signInPrompt: "İlerlerken cevaplarını kontrol etmek için giriş yap.",
      sessionExpired: "Oturumun sona erdi, lütfen tekrar giriş yap.",
      checkFailed: "Bu cevap kontrol edilemedi, tekrar dene.",
      hintButton: "İpucu",
      showAnswerButton: "Cevabı göster",
    },
    exam: {
      unitExamTitle: "Ünite Sınavı",
      finalExamTitle: "Final Sınavı",
      takeUnitExam: "Ünite sınavına gir",
      takeFinalExam: "Final sınavına gir",
      finalExamHint: "Tüm kursu kapsar",
      signInPrompt: "Bu sınava girmek için giriş yap.",
      noQuestions: "Bu sınav henüz mevcut değil.",
      submitFailed: "Sınavın gönderilemedi, tekrar dene.",
      scoreLine: "{{score}}/{{total}} doğru",
      passed: "Geçtin!",
      notPassed: "Henüz olmadı - konuyu tekrar gözden geçirip tekrar dene.",
      retry: "Tekrar dene",
      previous: "Önceki",
      reviewHeading: "Soru incelemesi",
    },
  },
  aiChat: {
    openLabel: "Yapay zekâ asistanını aç",
    sendLabel: "Gönder",
    inputPlaceholder: "Bir soru sor…",
    askAnything: "Bana istediğini sor",
    topicLabel: "Yol: {{topic}}",
    welcomeMessage: "Merhaba! Ben senin öğrenme rehberinim.",
    askAboutTopic: "{{topic}} hakkında istediğini sor.",
    pickTopicPrompt: "Bir yol seç ve bana istediğini sor.",
    thinking: "düşünüyor…",
    signInToast: "Yapay zekâ öğretmeniyle sohbet etmek için giriş yap.",
    limitReachedToast: "Bugünkü mesaj sınırına ulaştın, yarın tekrar dene.",
    unavailableToast: "Yapay zekâ öğretmeni şu anda kullanılamıyor.",
  },
  tts: {
    listenLabel: "Dinle",
    stopLabel: "Durdur",
    signInToast: "Metni sese dönüştürmeyi kullanmak için giriş yap.",
    limitReachedToast: "Bugünkü ses sınırına ulaştın, yarın tekrar dene.",
    unavailableToast: "Metin okuma şu anda kullanılamıyor.",
  },
  notFound: {
    title: "Sayfa bulunamadı",
    subtitle: "Aradığın sayfa mevcut değil ya da taşınmış.",
    goHome: "Ana sayfaya dön",
  },
  errorPage: {
    title: "Bu sayfa yüklenemedi",
    subtitle:
      "Bizden kaynaklanan bir hata oluştu. Sayfayı yenilemeyi deneyebilir ya da ana sayfaya dönebilirsin.",
    tryAgain: "Tekrar dene",
    goHome: "Ana sayfaya dön",
  },
  partnerships: {
    kicker: "İş Birliği",
    sectionTitle: "Ortaklarımız",
    sectionSubtitle:
      "Öğrenmeyi herkes için erişilebilir kılma misyonumuzu paylaşan kuruluşlarla çalışıyoruz.",
    placeholderLabel: "Ortak {{number}}",
  },
};

export default tr;
