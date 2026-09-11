import type { Translations } from "./en";

const ar: Translations = {
  nav: {
    brand: "MY IDEA",
    theme: "تبديل السمة",
    language: "اللغة",
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
    tools: "الأدوات",
    account: "الحساب",
  },
  welcome: {
    kicker: "منصة تعلّم تفاعلية",
    title: "أهلاً بك",
    subtitle: "اختر مسارًا وابدأ التعلّم.",
    cta: "ابدأ الآن",
    scroll: "مرّر للاستكشاف",
  },
  topics: {
    prevLabel: "السابق",
    nextLabel: "التالي",
    goToLabel: "روح لـ {{topic}}",
    sectionTitle: "اختر مسارك",
    sectionSubtitle: "اسحب لاستكشاف المجالات — والمزيد قادم قريباً.",
    swipeHint: "اسحب للاستكشاف",
    startLearning: "ابدأ التعلّم",
    cybersecurity: {
      title: "الأمن السيبراني",
      description: "احمِ الأنظمة والشبكات والبيانات من التهديدات الحديثة.",
    },
    ai: {
      title: "الذكاء الاصطناعي",
      description: "ابنِ نماذج تتعلّم وتفكّر وتُبدع.",
    },
    software: {
      title: "هندسة البرمجيات",
      description: "صمّم وابنِ وأطلق برمجيات موثوقة.",
    },
    networking: {
      title: "الشبكات",
      description: "أتقن البروتوكولات التي تربط العالم.",
    },
    hacking: {
      title: "الاختراق الأخلاقي",
      description: "فكّر كالمهاجم لتحمي ما هو مهم.",
    },
    data: {
      title: "علم البيانات",
      description: "حوّل البيانات الخام إلى قرارات واكتشافات.",
    },
    cloud: {
      title: "الحوسبة السحابية",
      description: "صمّم أنظمة قابلة للتوسع على منصات سحابية حديثة.",
    },
    os: {
      title: "أنظمة التشغيل",
      description: "افهم إزاي الكمبيوتر بيدير الذاكرة والعمليات والملفات.",
    },
    skills: {
      title: "المهارات المهنية",
      description: "التواصل والعمل الجماعي ومهارات تانية مهمة.",
    },
  },
  tools: {
    notFound: "الأداة مش موجودة.",
    loadError: "معرفناش نحمّل الأداة دي.",
    pageTitle: "الأدوات",
    pageSubtitle: "أدوات تفاعلية عملية تساعدك تطبّق اللي بتتعلّمه.",
    backToTools: "كل الأدوات",
    backHomeButton: "الرئيسية",
    openTool: "افتح الأداة",
    groups: {
      cyber: "أدوات سايبر",
      networking: "أدوات الشبكات",
      topics: "مواضيع أخرى",
    },
    list: {
      passwordStrength: {
        title: "فاحص قوة كلمة المرور",
        description:
          "اختبر مدى قوة كلمة المرور وشوف السرعة المحتملة لاختراقها.",
      },
      phishingTrainer: {
        title: "تدريب الوعي بالتصيد الاحتيالي",
        description:
          "اكتشف علامات التصيد في إيميلات ورسائل واقعية، وبعدين اتعلم إيه اللي كشفها.",
      },
      emailChecker: {
        title: "فاحص الإيميل",
        description:
          "الزق مصدر إيميل كامل واحصل على تحليل فيشينج شامل: الهيدرز، الروابط، المرفقات، وأكتر.",
      },
      hashTool: {
        title: "أدوات الـ Hash",
        description:
          "ولّد Hash، اعرف نوعه، وقارن بين اتنين — كل ده جوه المتصفح بس.",
      },
      encryptionTool: {
        title: "أدوات التشفير",
        description:
          "شفّر وفك تشفير النصوص والملفات بـ AES، وجرّب شيفرة قيصر الكلاسيكية.",
      },
      linkChecker: {
        title: "فاحص الروابط",
        description:
          "حلّل بنية أي رابط عشان تلاقي علامات فيشينج، وبعدين اتأكد فعليًا فين بيودّي.",
      },
      networkDefense: {
        title: "محاكي الدفاع عن الشبكة",
        description:
          "دافع عن شبكة صغيرة ضد مهاجم بالذكاء الاصطناعي بيفكر قدام باستخدام minimax - اختار مستوى الصعوبة وشوف الفرق اللي البحث الأذكى بيعمله.",
      },
      attackPlanner: {
        title: "مخطط الدفاع بالذكاء الاصطناعي",
        description:
          "اختار سيناريو هجوم حقيقي واحصل على خطة دفاع من الذكاء الاصطناعي: وقاية، اكتشاف، استجابة، وتعافي.",
      },
      appPermissions: {
        title: "مدقق صلاحيات التطبيقات",
        description:
          "بص على الصلاحيات اللي شوية تطبيقات عادية بتطلبها وقرر أنهي صلاحية منطقية فعلاً.",
      },
      bitAscii: {
        title: "محول البتات لـ ASCII",
        description:
          "حوّل النص لثنائي (binary) والعكس - شوف بالظبط إزاي الحروف بتتحول لبايتات.",
      },
    },
    passwordStrength: {
      label: "أدخل كلمة المرور",
      placeholder: "اكتب كلمة مرور للفحص...",
      show: "إظهار كلمة المرور",
      hide: "إخفاء كلمة المرور",
      strengthLabel: "القوة",
      strength: {
        empty: "ابدأ الكتابة عشان تشوف النتيجة",
        veryWeak: "ضعيفة جدًا",
        weak: "ضعيفة",
        fair: "متوسطة",
        strong: "قوية",
        veryStrong: "قوية جدًا",
      },
      criteria: {
        length: "٨ أحرف على الأقل",
        lower: "حرف صغير",
        upper: "حرف كبير",
        number: "رقم",
        symbol: "رمز",
        noPattern: "بدون نمط متوقّع",
        name: "من غير أسماء شخصية",
      },
      namesWarning:
        "الأسماء منفعش تتستخدم كباسورد. اسمك أو اسم حد من عيلتك أو حيوانك الأليف كلهم سهل تخمينهم.",
      vaultUnlocked: "الخزنة اتفتحت، الباسورد دي قوية جدًا.",
      compareShow: "+ قارن بباسورد قديمة",
      compareHide: "− اخفِ المقارنة",
      comparePreviousLabel: "الباسورد القديمة",
      comparePreviousPlaceholder: "اكتب الباسورد القديمة...",
      compareTooSimilar:
        "شبه جدًا للباسورد القديمة. المهاجمين بيجرّبوا تعديلات بسيطة زي تغيير رقم أو سنة الأول.",
      compareDifferent: "تمام، دي مختلفة فعليًا عن الباسورد القديمة.",
      entropyLabel: "الإنتروبيا",
      crackByAttackTypeLabel: "وقت الاختراق حسب نوع الهجوم",
      crackScenario: {
        online: "أونلاين (بمحاولات محدودة)",
        offlineFast: "أوفلاين، hash سريع",
        offlineSlow: "أوفلاين، hash بطيء (bcrypt)",
      },
      crackTime: {
        instant: "فورًا",
        seconds: "ثوانٍ",
        minutes: "دقائق",
        hours: "ساعات",
        days: "أيام",
        months: "شهور",
        years: "سنين",
        centuries: "قرون",
      },
      breach: {
        title: "فحص التسريبات (Have I Been Pwned)",
        checking: "بيتفحص...",
        foundResult:
          "اتلاقت في بيانات مسربة {{times}} مرة. غيّر الباسورد دي فورًا لو بتستخدمها فعلاً.",
        notFoundResult: "مش موجودة في بيانات التسريبات المعروفة.",
        errorResult:
          "مقدرناش نوصل لـ Have I Been Pwned دلوقتي. جرّب تاني بعد شوية.",
        note: "بيبعت أول 5 حروف بس من SHA-1 hash (k-anonymity). الباسورد الكاملة مش بتسيب المتصفح خالص.",
      },
      tipsTitle: "الباسورد دي ممكن تتخترق إزاي",
      tips: {
        commonBreach:
          "الباسورد دي بالظبط موجودة في قوائم تسريبات حقيقية. المهاجمين بيجرّبوها على آلاف الحسابات دفعة واحدة بدل التخمين العشوائي — متستخدمهاش خالص.",
        leetCommonBreach:
          "استبدال الحروف برموز (زي @ بدل a، 0 بدل o) بيرجّعها لواحدة من أشهر الباسوردات المسربة. أدوات الاختراق بتجرّب الاستبدالات دي أصلاً.",
        fullName:
          "ده شكله اسم شخصي كامل. تركيب الاسم الرباعي سهل التوقع جدًا، تجنّب ربط الاسم الأول باسم الأب أو العيلة.",
        singleName:
          "الأسماء سهل تخمينها أو البحث عنها. تجنّب استخدام اسمك أو اسم حد من عيلتك أو حيوانك الأليف.",
        maskPattern:
          'كلمة متبوعة بأرقام (زي "Summer2024") شكل معروف جدًا. أدوات الاختراق بتجرّب النمط ده قبل أي حاجة تانية تقريبًا.',
        latinKeyboardPattern:
          'أنماط الكيبورد المتتالية والحروف المكررة (زي "qwerty" أو "aaa") مغطاة بالقواعد الافتراضية في أغلب أدوات الاختراق.',
        arabicKeyboardPattern:
          'أنماط الكيبورد العربي المتتالية (زي "ضصث") متوقعة زي "qwerty" بالظبط، أدوات الاختراق بتغطي لوحات المفاتيح الإقليمية كمان.',
        turkishKeyboardPattern:
          'أنماط الكيبورد التركي (زي "şi" أو "ğü") متوقعة برضه بالنسبة لأدوات الاختراق زي QWERTY العادي.',
        germanKeyboardPattern:
          'أنماط الكيبورد الألماني QWERTZ (زي "qwertz" أو "yxcvb") متوقعة برضه لأدوات الاختراق زي QWERTY العادي.',
        leetSubstitution:
          "استبدال الحروف برموز بسيطة مبيضيفش حماية بالقد اللي حاسس بيه، أدوات الاختراق بتجرّب الاستبدالات الشائعة دي أوتوماتيك.",
        dictionaryWord:
          "كلمة قاموسية واحدة بسيطة من أول العناصر في أي قايمة كلمات بيستخدمها المهاجمين.",
        shortLength:
          "الباسوردات القصيرة في مرمى أدوات التخمين بالقوة. حاول توصل لـ12–16 حرف على الأقل.",
        noWeakness:
          "مفيش ضعف واضح هنا، اختراقها هيحتاج مجهود تخمين واسع النطاق.",
        credentialStuffing:
          "استخدام نفس الباسورد في أي مكان تاني بيخليها عرضة لـcredential stuffing لو موقع تاني اتسرب.",
        phishing:
          'مفيش قوة باسورد بتحمي من الـphishing. خلّي بالك من الروابط أو الرسايل اللي بتطلب منك "تأكيد" حسابك.',
        socialMining:
          "المهاجمين غالبًا بيدوّروا في السوشيال ميديا على أسماء حيوانات أليفة، تواريخ ميلاد، وهوايات قبل ما يبدأوا التخمين حتى.",
      },
      privacyNote:
        "باقي الأداة شغالة بالكامل جوه المتصفح بتاعك. مفيش حاجة بتتبعت أو تتحفظ أو تتسجّل في أي مكان.",
      generator: {
        title: "ولّد باسورد قوية",
        modeChars: "حروف عشوائية",
        modePassphrase: "عبارة مرور",
        placeholder: "دوس Generate عشان تعمل واحدة...",
        copy: "انسخ الباسورد",
        copied: "اتنسخت",
        copyFailed: "معرفناش ننسخ، جرّب تحدد وتنسخ يدويًا",
        lengthLabel: "الطول",
        uppercase: "حروف كبيرة (A-Z)",
        lowercase: "حروف صغيرة (a-z)",
        numbers: "أرقام (0-9)",
        symbols: "رموز (!@#$)",
        avoidAmbiguous: "تجنّب الحروف المتشابهة (l, 1, I, O, 0)",
        wordCountLabel: "عدد الكلمات",
        separatorLabel: "الفاصل (اختار واحد أو أكتر)",
        separatorDash: "شرطة ( - )",
        separatorUnderscore: "شرطة سفلية ( _ )",
        separatorDot: "نقطة ( . )",
        separatorSpace: "مسافة",
        capitalizeWords: "كبّر أول حرف في كل كلمة",
        addNumber: "ضيف رقم عشوائي",
        generate: "ولّد الباسورد",
        selectAtLeastOneChar: "اختار نوع حروف واحد على الأقل.",
        selectAtLeastOneSeparator: "اختار فاصل واحد على الأقل.",
      },
    },
    phishingTrainer: {
      instructionLabel: "دوس على أي جملة أو بيانات مرسل أو رابط شايفه مريب",
      progressLabel: "رسالة {{current}} من {{total}}",
      scoreLabel: "الصح: {{score}}/{{total}}",
      emailChannel: "إيميل",
      smsChannel: "رسالة نصية",
      checkButton: "تحقق من إجابتك",
      showAllButton: "اعرض كل العلامات",
      whatGaveItAway: "إيه اللي كشفها",
      attackTypeLabel: "نوع الهجوم",
      techniqueLabel: "الأسلوب",
      whatWouldYouDo: "هتعمل إيه بعد كده؟",
      actionOptions: {
        investigate: "تدوس على الرابط أو ترد عشان تشوف هيحصل إيه",
        ignore: "تمسحها وتسكت",
        report: "تبلّغ عنها لفريق الأمن أو الـIT وبعدين تمسحها",
        normal: "تتعامل معاها عادي وتكمل",
      },
      actionFeedbackPhishing:
        "الإبلاغ عن الرسائل المشبوهة بيساعد فريق الأمن يمنع المرسل وينبّه ناس تانية ممكن توصلهم نفس الرسالة.",
      actionFeedbackLegit:
        "مفيش علامات تصيد هنا، تقدر تتعامل مع الرسالة دي عادي.",
      nextButton: "الرسالة اللي بعدها",
      finishButton: "شوف نتيجتي",
      finalScoreCaption: "رسالة اتحلّت صح",
      redFlagsRecapTitle: "علامات لازم تفتكرها",
      tryAgainButton: "جرب تاني",
      difficulty: {
        easy: "سهل",
        medium: "متوسط",
        hard: "صعب",
      },
    },
    emailChecker: {
      inputLabel: "مصدر الإيميل الخام",
      pasteButton: "الصق",
      clearButton: "امسح",
      exampleButton: "حمّل مثال",
      inputPlaceholder:
        "الزق مصدر الإيميل كامل هنا، شامل الهيدرز (From، Received، إلخ)...",
      pasteHint: "معرفناش نقرا الكليبورد — الصق يدويًا بـ Ctrl/Cmd+V بدل كده.",
      analyzeButton: "حلّل الإيميل",
      riskBand: {
        low: "خطورة قليلة",
        medium: "فيه علامات تستاهل انتباه",
        high: "خطورة عالية",
      },
      headerSummaryTitle: "ملخص الهيدرز",
      fromLabel: "من",
      replyToLabel: "الرد على",
      authLabel: "التحقق",
      trustButton: "افحص عمر دومين المرسل",
      trustChecking: "بيفحص...",
      trustSignInPrompt: "سجّل دخولك عشان تفحص عمر دومين المرسل.",
      trustLimitReached: "وصلت لحد الفحص بتاع النهاردة، جرّب تاني بكرة.",
      trustCheckFailed: "معرفناش نفحص الدومين دلوقتي.",
      trustResultWithAge: "{{domain}} اتسجّل من {{days}} يوم.",
      trustResultUnknown: "معرفناش نحدد إمتى {{domain}} اتسجّل.",
      findingsTitle: "الملاحظات",
      noFindings: "مفيش علامات خطر في الإيميل ده.",
      findings: {
        authFail: {
          label: "فشل التحقق من الهوية",
          text: "SPF أو DKIM أو DMARC فشلوا، وده مؤشر قوي إن دومين المرسل بيتم انتحاله.",
        },
        replyToMismatch: {
          label: "الرد (Reply-To) مش نفس المرسل",
          text: "الردود هتروح لدومين مختلف ({{replyToDomain}}) عن عنوان المرسل ({{fromDomain}}).",
        },
        linkTextMismatch: {
          label: "نص الرابط مش مطابق للوجهة",
          text: 'بيظهر "{{displayText}}" بس فعليًا بيروح لـ {{hrefDomain}}.',
        },
        credentialRequest: {
          label: "بيطلب بيانات دخول",
          text: 'فيه عبارات زي "{{phrase}}"، والخدمات الحقيقية نادرًا ما تطلب كده بالإيميل.',
        },
        riskyAttachment: {
          label: "مرفق مشبوه اتذكر",
          text: "{{filename}} ده نوع ملف بيستخدم عادةً لنشر برامج ضارة.",
        },
        unearnedReward: {
          label: "جايزة مش مستحقة",
          text: 'فيه عبارات زي "{{phrase}}"، وده نمط كلاسيكي لنصب الرسوم المقدمة.',
        },
        urgencyLanguage: {
          label: "لغة استعجال",
          text: 'فيه عبارات زي "{{phrase}}"، مصممة عشان تستعجلك تتصرف من غير ما تفكر.',
        },
        genericGreeting: {
          label: "تحية عامة",
          text: 'بيستخدم "{{phrase}}" بدل ما يناديك بالاسم.',
        },
        ipBasedLink: {
          label: "رابط بعنوان IP خام",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "رابط مختصر",
          text: "{{url}} بيخبي وجهته الحقيقية.",
        },
        noReceivedHeaders: {
          label: "مفيش Received headers",
          text: "الإيميل الحقيقي غالبًا بيعدي على سيرفر بريد واحد على الأقل، وغيابه ممكن يبقى مؤشر إن الهيدر اتصنع يدويًا.",
        },
      },
      routeTitle: "مسار التوصيل",
      linksTitle: "الروابط",
      linkTagIp: "IP مباشر",
      linkTagShortened: "مختصر",
      linkTagStandard: "عادي",
      privacyNote:
        "كل حاجة شغالة محليًا جوه المتصفح ما عدا فحص عمر الدومين الاختياري، اللي بيبعت بس اسم الدومين المجرد، مش الإيميل نفسه أبدًا.",
    },
    hashTool: {
      tabs: { generate: "ولّد", identify: "تعرّف", compare: "قارن" },
      generate: {
        label: "النص اللي هتعمله Hash",
        placeholder: "اكتب أو الزق نص...",
        empty: "ابدأ الكتابة عشان تشوف الـ hashes",
        copy: "انسخ الـ Hash",
        copied: "اتنسخ",
        copyFailed: "معرفناش ننسخ، جرّب تحدد وتنسخ يدويًا",
      },
      identify: {
        label: "الزق Hash",
        placeholder: "الزق hash عشان تعرف نوعه...",
        empty: "الزق hash فوق عشان تشوف الاحتمالات",
        resultsTitle: "احتمالات ممكنة",
        ambiguousNote:
          "أكتر من خوارزمية بتطلّع نفس الطول أو الصيغة بالظبط، مفيش طريقة تفرّق بينهم من النص لوحده.",
        noMatch: "مش متطابق مع أي صيغة hash معروفة.",
      },
      compare: {
        labelA: "الـ Hash الأول",
        labelB: "الـ Hash التاني",
        placeholder: "الزق hash...",
        match: "دول متطابقين",
        noMatch: "دول مش متطابقين",
        empty: "الزق الـ hashين الاتنين عشان تقارن بينهم",
        note: "المقارنة بتتجاهل حالة الحروف والمسافات الزيادة.",
      },
      privacyNote:
        "كل حاجة شغالة محليًا جوه المتصفح بتاعك. مفيش حاجة بتتبعت أو تتحفظ أو تتسجّل في أي مكان.",
    },
    encryptionTool: {
      tabs: { modern: "تشفير حديث (AES)", classic: "شيفرة قيصر" },
      privacyNote:
        "كل حاجة شغالة محليًا جوه المتصفح بتاعك. مفيش حاجة بتتبعت أو تتحفظ أو تتسجّل في أي مكان.",
      modern: {
        warning: "لو نسيت كلمة المرور دي، مفيش أي طريقة تسترجع بيها البيانات.",
        encryptButton: "شفّر",
        decryptButton: "فك التشفير",
        textTab: "نص",
        fileTab: "ملف",
        passphraseLabel: "كلمة المرور",
        passphrasePlaceholder: "اكتب كلمة مرور قوية...",
        crackTimeLabel: "وقت التخمين التقريبي: {{time}}",
        textPlaceholderEncrypt: "اكتب النص اللي عايز تشفّره...",
        textPlaceholderDecrypt: "الزق النص المشفّر...",
        encrypting: "بيشفّر...",
        decrypting: "بيفك التشفير...",
        errors: {
          needPassphrase: "دخّل كلمة المرور الأول.",
          needText: "دخّل النص كمان.",
          needFile: "اختار ملف الأول.",
          fileTooLarge: "الملف أكبر من 20 ميجا — جرّب ملف أصغر في المعاينة دي.",
          encryptFailed: "حصل خطأ أثناء التشفير.",
          decryptFailed:
            "مقدرناش نفك التشفير — كلمة المرور غلط، أو الملف/النص مش سليم.",
        },
        outputLabel: "الناتج",
        copyButton: "انسخ",
        copied: "اتنسخ",
        copyFailed: "معرفناش ننسخ، جرّب تحدد وتنسخ يدويًا",
        downloadAgainButton: "نزّل تاني",
        breakdownLabel: "مكوّنات الناتج",
        cipherBytesLabel: "{{count}} بايت (بيشمل 16-byte auth tag)",
      },
      classic: {
        textLabel: "النص",
        cipherTabs: { caesar: "قيصر", vigenere: "فيجينير" },
        caesar: {
          shiftLabel: "الإزاحة",
          outputLabel: "الناتج",
          crackButton: "جرّب فك الشيفرة (كل الـ26 احتمال)",
        },
        vigenere: {
          keywordLabel: "الكلمة المفتاحية",
          keywordPlaceholder: "اكتب كلمة مفتاحية...",
          encryptButton: "شفّر",
          decryptButton: "فك التشفير",
          outputLabel: "الناتج",
          needKeyword: "دخّل كلمة مفتاحية الأول.",
        },
      },
    },
    linkChecker: {
      urlLabel: "الرابط",
      urlPlaceholder: "الزق رابط عشان تفحصه...",
      analyzeButton: "افحص الرابط",
      invalid: "ده مش رابط صحيح — تأكد من الصيغة وجرّب تاني.",
      scoreLabel: "نسبة أمان تقديرية",
      scoreTone: {
        good: "مطمّن نسبيًا، بناءً على اللي اتفحص لحد دلوقتي.",
        mixed:
          "لسه محتاج تتأكد أكتر — شغّل الفحوصات اللي محتاجة سيرفر تحت لصورة أوضح.",
        bad: "فيه علامات خطر واضحة، احترس قبل ما تدوس على الرابط ده.",
      },
      breakdownLabel: "تفكيك الرابط",
      protocolLabel: "البروتوكول:",
      hostLabel: "المضيف:",
      pathLabel: "المسار:",
      checksLabel: "{{count}} من {{total}} علامات اتفعّلت",
      checks: {
        ipHost: {
          label: "دومين ولا IP؟",
          clean: "الرابط بيستخدم اسم دومين عادي.",
          flagged:
            "الرابط بيستخدم عنوان IP مباشر بدل اسم دومين — نادر جدًا في المواقع الشرعية.",
        },
        userinfo: {
          label: "حرف @ في الرابط",
          clean: 'مفيش "@" بيخبي عنوان حقيقي وراه.',
          flagged:
            'اللي قبل "@" ({{username}}) مش جزء من العنوان — العنوان الحقيقي هو {{hostname}}.',
        },
        punycode: {
          label: "ترميز Punycode",
          clean: "مفيش ترميز Punycode مشبوه.",
          flagged:
            "الدومين متشفّر بـ Punycode — ممكن يستخدم حروف شبه لاتينية عشان يشبه اسم موقع معروف.",
        },
        subdomains: {
          label: "عدد أجزاء الدومين",
          clean: "عدد أجزاء الدومين طبيعي.",
          flagged:
            "الدومين فيه {{count}} أجزاء — عدد كبير غير معتاد، ممكن يكون بيخبي الدومين الحقيقي في الآخر.",
        },
        shortener: {
          label: "مختصر روابط",
          clean: "مش من مختصرات الروابط المعروفة.",
          flagged:
            "ده دومين اختصار روابط معروف — العنوان الحقيقي مخفي لحد ما تدوس عليه.",
        },
        https: {
          label: "HTTPS؟",
          clean: "الرابط بيستخدم https.",
          flagged:
            "الرابط http مش https — البيانات مش متشفّرة بين المتصفح والموقع.",
        },
        tld: {
          label: "نوع امتداد الدومين (TLD)",
          clean:
            "امتداد الدومين (.{{tld}}) مش من الامتدادات المعروفة بكثرة الاستغلال.",
          flagged:
            ".{{tld}} من الامتدادات اللي بتتسجل ببلاش أو رخيصة جدًا، وبتتعرّض لاستغلال في الفيشينج أكتر من غيرها — ده مش دليل قاطع لوحده.",
        },
        brand: {
          label: "انتحال اسم شركة معروفة",
          clean: "مفيش اسم شركة معروفة متضمّن في دومين تاني.",
          flagged:
            'الرابط فيه اسم "{{brand}}" بس الدومين الحقيقي مش {{officialDomain}}.',
        },
      },
      disclaimer:
        "الفحص ده بيوضّح علامات هيكلية بس — مش ضمان أمان 100%. رابط من غير أي علامة فوق ممكن برضه يكون خطر.",
      server: {
        label: "فحوصات تحتاج سيرفر (محتاجة تسجيل دخول)",
        button: "افحص التوجيه وعمر الدومين",
        checking: "بيفحص...",
        signInPrompt: "سجّل دخولك عشان تشغّل الفحوصات اللي محتاجة سيرفر.",
        limitReached: "وصلت لحد الفحص بتاع النهاردة، جرّب تاني بكرة.",
        failed: "معرفناش نكمّل الفحص اللي محتاج سيرفر دلوقتي.",
        redirectLabel: "سلسلة إعادة التوجيه",
        domainAgeLabel: "الدومين مسجّل من",
        domainAgeUnknown: "معرفناش نحدد تاريخ تسجيل الدومين ده.",
        daysOld: "من {{count}} يوم",
        googleFlagged: "جوجل Safe Browsing حددها كخطيرة.",
        googleClean: "جوجل Safe Browsing ملقتش أي مشكلة فيها.",
        googleUnavailable: "فحص جوجل Safe Browsing مش متاح دلوقتي.",
      },
    },
    networkDefense: {
      introTitle: "إنت المدافع",
      introBody:
        "مهاجم بالذكاء الاصطناعي هيحاول يخترق شبكتك ويوصل لقاعدة البيانات. رقّع نقاط الضعف واعزل أي اختراق عشان توقفه - عندك عدد محدود من كل واحدة.",
      difficulty: { easy: "سهل", medium: "متوسط", hard: "صعب" },
      difficultyHint: {
        easy: "المهاجم بيختار حركاته عشوائي - من غير أي تفكير قدام خالص.",
        medium: "المهاجم بيفكر كذا خطوة قدام باستخدام minimax.",
        hard: "المهاجم بيبحث أعمق وأسرع باستخدام minimax مع alpha-beta pruning.",
      },
      startButton: "ابدأ الدفاع",
      round: "الجولة {{round}}/{{max}}",
      patchesLeft: "{{count}} ترقيعة متبقية",
      isolatesLeft: "{{count}} عزلة متبقية",
      nodes: {
        firewall: "جدار الحماية",
        webServer: "سيرفر الويب",
        mailServer: "سيرفر الإيميل",
        vpn: "VPN",
        appServer: "سيرفر التطبيقات",
        fileServer: "سيرفر الملفات",
        adminPanel: "لوحة التحكم",
        database: "قاعدة البيانات",
      },
      defenderWon: "صمدت في الدفاع",
      defenderWonBody: "المهاجم ما وصلش لقاعدة البيانات قبل ما الوقت يخلص.",
      attackerWon: "اختراق - قاعدة البيانات اتخترقت",
      attackerWonBody:
        "حتى الدفاع القوي ممكن يتخترق في النهاية - عشان كده الأمن الحقيقي بيعتمد على طبقات متعددة، مش سور واحد مثالي.",
      playAgain: "العب تاني",
      attackerThinking: "المهاجم بيختار حركته الجاية...",
      yourTurn: "دورك",
      noDefensesLeft: "خلصت ترقيعاتك وعزلاتك - المهاجم هياخد حركة مجانية.",
      passButton: "تخطي",
      patchAction: "رقّع نقطة",
      noPatchesLeft: "مفيش ترقيعات متبقية.",
      isolateAction: "اعزل نقطة مخترقة",
      noIsolatesLeft: "مفيش عزلات متبقية، أو مفيش حاجة تتعزل.",
      nodesExplored:
        "المهاجم فكّر في {{count}} احتمال ممكن قبل ما يختار الحركة دي.",
    },
    attackPlanner: {
      signInTitle: "سجّل دخول عشان تستخدم مخطط الدفاع",
      signInSubtitle:
        "اعمل حساب مجاني أو سجّل دخول عشان تقدر تولّد خطط دفاع بالذكاء الاصطناعي وتتابع استخدامك.",
      scenarioPickerLabel: "اختار سيناريو هجوم",
      scenarios: {
        phishing: {
          title: "حملة تصيّد احتيالي",
          description:
            "إيميلات أو رسايل خادعة هدفها سرقة بيانات الدخول أو تثبيت برمجيات خبيثة.",
        },
        ransomware: {
          title: "برمجية الفدية",
          description:
            "برمجية خبيثة بتشفّر الملفات وتطلب فدية عشان ترجّع الوصول ليها.",
        },
        ddos: {
          title: "هجوم حجب الخدمة الموزّع",
          description:
            "إغراق النظام بكمية ضخمة من الترافيك لحد ما يبقى مش قادر يخدم المستخدمين الحقيقيين.",
        },
        insiderThreat: {
          title: "تهديد داخلي",
          description: "ضرر بيسببه حد عنده صلاحية وصول شرعية أصلاً.",
        },
        credentialStuffing: {
          title: "حشو بيانات الدخول",
          description:
            "محاولات دخول أوتوماتيكية باستخدام باسوردات مسرّبة من اختراقات تانية.",
        },
        sqlInjection: {
          title: "حقن SQL",
          description:
            "إدخال خبيث بيلاعب قاعدة البيانات من خلال ثغرة في التطبيق.",
        },
        supplyChain: {
          title: "هجوم على سلسلة التوريد",
          description: "اختراق مورّد أو مكتبة موثوقة عشان توصل لمستخدميها.",
        },
        socialEngineering: {
          title: "الهندسة الاجتماعية",
          description:
            "التلاعب بالناس، مش بالأنظمة، عشان يخالفوا إجراءات الأمان.",
        },
      },
      contextLabel: "ضيف سياق (اختياري)",
      contextPlaceholder: "مثال: عندي متجر إلكتروني صغير و5 موظفين...",
      contextHint: "{{count}}/{{max}} حرف",
      generateButton: "ولّد خطة الدفاع",
      generating: "بنولّد خطتك...",
      changeScenarioButton: "اختار سيناريو تانى",
      severityLabel: "الخطورة المعتادة",
      severity: {
        low: "منخفضة",
        medium: "متوسطة",
        high: "عالية",
        critical: "حرجة",
      },
      sections: {
        prevention: "الوقاية",
        detection: "الاكتشاف",
        response: "الاستجابة",
        recovery: "التعافي",
      },
      limitReached: "وصلت للحد اليومي للخطط، جرّب تانى بكرة.",
      failed: "معرفناش نولّد خطة دلوقتي، جرّب تانى.",
      disclaimer:
        "الخطة مولّدة بالذكاء الاصطناعي لأغراض تعليمية. اتأكد من الإرشادات الرسمية قبل ما تعتمد عليها في حادثة حقيقية.",
    },
    appPermissions: {
      instructionLabel:
        "دوس Allow أو Deny لكل صلاحية التطبيق ده طالبها، على حسب وظيفته المفروضة.",
      progressLabel: "تطبيق {{current}} من {{total}}",
      scoreLabel: "{{score}}/{{total}} صح",
      allowLabel: "سماح",
      denyLabel: "رفض",
      checkButton: "شوف إجاباتي",
      nextButton: "التطبيق التالي",
      finishButton: "خلاص",
      tryAgainButton: "جرب تاني",
      justifiedNote: "منطقية لنوع التطبيق ده.",
      whyThisMatters: "ليه ده مهم",
      finalScoreCaption: "حكمت صح على {{pct}}% من الصلاحيات.",
      tipsTitle: "حاجات تستاهل تفتكرها",
      permissions: {
        camera: "الكاميرا",
        microphone: "الميكروفون",
        contacts: "جهات الاتصال",
        location: "الموقع",
        sms: "الرسائل النصية (SMS)",
        callLog: "سجل المكالمات",
        storage: "الصور والتخزين",
        motionFitness: "الحركة واللياقة",
      },
      apps: {
        flashlight: {
          name: "الكشاف",
          description: "تطبيق بسيط بيولّع ويطفي فلاش الكاميرا.",
        },
        qrScanner: {
          name: "قارئ QR Code",
          description: "بيقرأ أكواد QR بالكاميرا وبيوريك اللي جواها.",
        },
        photoEditor: {
          name: "محرر الصور",
          description: "بيقص ويفلتر ويظبط الصور الموجودة أصلاً على جهازك.",
        },
        messaging: {
          name: "تطبيق مراسلة",
          description: "بيبعت رسايل وصور ورسايل صوتية لجهات اتصالك.",
        },
        fitnessTracker: {
          name: "عداد الخطوات",
          description: "بيعد خطواتك ويرسم خريطة جريك ومشيك.",
        },
        puzzleGame: {
          name: "لعبة بازل",
          description:
            "لعبة بازل أوفلاين مستقلة، مفيهاش أي مميزات اجتماعية أو أونلاين.",
        },
        weather: {
          name: "الطقس",
          description: "بيوريك حالة الطقس في مكانك الحالي.",
        },
        videoCalling: {
          name: "مكالمات فيديو",
          description: "بيعمل مكالمات فيديو وصوت لجهات الاتصال بتاعتك.",
        },
        banking: {
          name: "التطبيق البنكي",
          description:
            "بيشوفلك رصيدك، ويودّع شيكات، ويدفع فواتيرك من حسابك البنكي.",
        },
        rideHailing: {
          name: "طلب مشاوير",
          description: "بيحجزلك عربية توصلك من مكان لمكان.",
        },
        sleepTracker: {
          name: "متتبع النوم",
          description: "بيتتبع نومك بالليل باستخدام حساسات الحركة في تليفونك.",
        },
        newsReader: {
          name: "قارئ الأخبار",
          description:
            "بيجمعلك العناوين والمقالات من مصادرك المفضلة في فيد واحد.",
        },
      },
      reasons: {
        flashlightContacts:
          "الكشاف محتاج بس يتحكم في فلاش الكاميرا - مفيش سبب يخليه يقرا جهات اتصالك.",
        flashlightLocation: "تولّع وتطفي نور مش محتاج يعرف انت فين.",
        flashlightSms:
          "مفيش أي ميزة في الكشاف ليها علاقة بقراءة أو بعت رسايل نصية.",
        flashlightMicrophone: "كشاف بسيط مفيهوش أي استخدام حقيقي للميكروفون.",
        qrContacts: "قراءة كود مش محتاجة توصل لمين انت عارفه.",
        qrCallLog: "مفيش حاجة في قراءة QR ليها علاقة بسجل مكالماتك.",
        qrLocation:
          "التطبيق يقدر يفك تشفير اللي جوه الكود من غير ما يعرف انت فين.",
        photoLocation:
          "تعديل صور موجودة أصلاً على جهازك مش محتاج وصول لموقعك اللحظي.",
        photoContacts: "مفيش ميزة تعديل محتاجة جهات اتصالك.",
        photoMicrophone:
          "ده محرر صور، مش أداة صوت أو فيديو - مفيش استخدام حقيقي للصوت.",
        messagingCallLog: "بعت رسايل مش محتاج يقرا مين اتصلت بيه وإمتى.",
        messagingLocation:
          "مشاركة موقعك لمحادثة واحدة حاجة منطقية؛ لكن طلبه باستمرار في الخلفية لأ.",
        fitnessContacts: "عد الخطوات وتتبع الجري مش محتاج يعرف مين انت عارفه.",
        fitnessCamera: "عداد خطوات مفيش سبب يخليه يوصل لكاميراك.",
        fitnessSms: "مفيش ميزة تتبع لياقة ليها علاقة برسايلك النصية.",
        gameContacts: "لعبة بازل مستقلة مفيش سبب تعرف بيه مين انت عارفه.",
        gameLocation: "حل البازلات مش محتاج يعرف انت فين.",
        gameMicrophone: "مفيش حاجة في اللعبة دي محتاجة تسمعك.",
        gameCamera: "لعبة بازل مفيهاش استخدام حقيقي لكاميراك.",
        gameSms: "اللعبة دي مفيش سبب تقرا أو تبعت رسايل نصية.",
        weatherContacts: "معرفة حالة الطقس مش محتاجة جهات اتصالك.",
        weatherCamera: "تطبيق طقس مفيهوش استخدام حقيقي لكاميراك.",
        weatherMicrophone: "مفيش ميزة توقعات محتاجة تسمعك.",
        weatherSms: "تحديثات الطقس مش محتاجة تقرا رسايلك النصية.",
        videoSms:
          "دي اللي لازم تركز فيها: الكاميرا والميكروفون وجهات الاتصال والتخزين كلهم منطقيين لمكالمات الفيديو، بس صلاحية الـ SMS طريقة كلاسيكية للتطبيقات الخبيثة إنها تعترض أكواد الدخول اللي بتتبعت لتليفونك.",
        bankingContacts:
          "شوف رصيدك أو إيداع شيك مش محتاج جهات اتصالك - إلا لو التطبيق فيه ميزة تحويل فلوس لشخص تاني تحديدًا.",
        bankingMicrophone: "مفيش ميزة بنكية أساسية محتاجة تسمعك.",
        bankingCallLog: "إدارة فلوسك مش محتاجة تقرا مين اتصلت بيه وإمتى.",
        rideHailingMicrophone: "حجز ومتابعة مشوار مش محتاج وصول لميكروفونك.",
        rideHailingCamera: "مفيش ميزة حجز مشاوير أساسية محتاجة كاميراك.",
        rideHailingSms:
          "التطبيق ده مفيش سبب يقرا أو يبعت رسايل نصية عشان يحجزلك مشوار.",
        sleepContacts: "متابعة نومك مش محتاجة تعرف مين انت عارفه.",
        sleepCamera: "متتبع نوم شغال بالليل مفيش سبب يوصل لكاميراك.",
        sleepSms: "مفيش ميزة تتبع نوم ليها علاقة برسايلك النصية.",
        sleepCallLog: "متابعة إزاي بتنام مش محتاجة سجل مكالماتك.",
        newsLocation:
          "قراءة المقالات مش محتاجة تعرف مكانك بالظبط - أقصى حاجة منطقة عامة عشان عناوين محلية.",
        newsContacts: "مفيش سبب يخلي قارئ أخبار محتاج جهات اتصالك.",
        newsCamera: "قارئ أخبار مفيهوش استخدام حقيقي لكاميراك.",
        newsMicrophone: "مفيش ميزة قراءة محتاجة تسمعك.",
        newsSms: "التطبيق ده مفيش سبب يقرا أو يبعت رسايل نصية.",
      },
      tips: {
        doesItMakeSense:
          "قبل ما توافق على أي صلاحية، اسأل نفسك: ده فعلاً منطقي لوظيفة التطبيق؟",
        utilityApps:
          "الأدوات البسيطة - الكشاف، قارئ QR، الآلة الحاسبة - نادرًا جدًا ما تحتاج جهات اتصالك أو الـ SMS أو موقعك الدقيق.",
        smsRisk:
          "صلاحية الـ SMS خطيرة بشكل خاص: ممكن تخلي تطبيق يقرا أكواد دخول لمرة واحدة مفروض تكون ليك انت بس.",
        changeAnytime:
          "تقدر تراجع وتغيّر صلاحيات التطبيقات في أي وقت من إعدادات تليفونك، مش بس وقت التنصيب.",
        whenInDoubt:
          "لو مش متأكد، ارفض الصلاحية - لو ميزة فعلاً محتاجاها، التطبيق هيطلبها تاني ويوضح ليه.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "نص ← ثنائي",
        binaryToText: "ثنائي ← نص",
      },
      textLabel: "النص",
      textPlaceholder: "اكتب حاجة...",
      binaryOutputLabel: "الثنائي",
      binaryEmptyState: "الناتج الثنائي هيظهر هنا.",
      binaryLabel: "الثنائي",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "النص",
      textEmptyState: "النص المفكوك هيظهر هنا.",
      byteCount: "{{count}} بايت",
      copy: "نسخ",
      copied: "اتنسخ للحافظة",
      copyFailed: "معرفناش ننسخ للحافظة",
      errors: {
        invalidChars:
          "الثنائي المفروض يحتوي بس على 0 و1 (المسافات بين البايتات مفيش مشكلة فيها).",
        notMultipleOfEight:
          "كل بايت محتاج 8 بت بالظبط - المجموع مش من مضاعفات الـ 8.",
        invalidUtf8: "البايتات دي مش بتكوّن نص UTF-8 صحيح.",
      },
    },
  },
  auth: {
    toastAccountCreated: "اتعمل الحساب! أهلًا بيك في My Idea Academy.",
    toastWelcomeBack: "أهلًا بيك تاني!",
    toastGenericError: "حصل خطأ، جرّب تاني.",
    toastGoogleFailed: "معرفناش نسجّل دخولك بجوجل، جرّب تاني.",
    signInTitle: "أهلًا بيك تاني",
    signUpTitle: "اعمل حسابك",
    signInSubtitle: "سجّل دخولك عشان تتابع تقدمك وشهاداتك.",
    signUpSubtitle: "اعمل حساب عشان تحفظ تقدمك وتاخد شهادات.",
    continueWithGoogle: "كمّل بجوجل",
    orDivider: "أو",
    namePlaceholder: "اسمك",
    emailPlaceholder: "الإيميل",
    passwordPlaceholder: "كلمة المرور",
    signInButton: "سجّل دخول",
    signUpButton: "اعمل حساب",
    newHere: "أول مرة هنا؟",
    alreadyHaveAccount: "عندك حساب بالفعل؟",
    createAccountLink: "اعمل حساب",
    signInLink: "سجّل دخول",
  },
  verify: {
    notFound: "معرفناش نلاقي شهادة بالـID ده.",
    backHome: "ارجع للصفحة الرئيسية",
    verifiedTitle: "الشهادة اتأكّدت",
    verifiedSubtitle: "الشهادة دي فعلاً صادرة من My Idea Academy.",
    recipientLabel: "الاسم",
    topicLabel: "المسار",
    scoreLabel: "النتيجة",
    issuedLabel: "تاريخ الإصدار",
  },
  certificate: {
    title: "شهادة إتمام",
    presentedTo: "بكل فخر تُمنح هذه الشهادة إلى",
    completingCourse: "لإتمامه بنجاح كورس",
    scoreLine: "النتيجة النهائية: {{score}}%",
    role: "مدير الشركة",
    issueDateLabel: "تاريخ الإصدار",
    closeLabel: "قفل",
    certIdLabel: "رقم الشهادة:",
    downloadButton: "نزّل PDF",
    pending: "قيد الانتظار",
  },
  dashboard: {
    signInTitle: "سجّل دخولك لعرض لوحة التحكم",
    signInSubtitle: "تابع تقدمك وشهاداتك ونشاطك التعليمي.",
    signIn: "تسجيل الدخول",
    welcomeBack: "أهلاً بعودتك، {{name}}",
    subtitle: "من هنا كملت آخر مرة.",
    continueLearningHeading: "كمّل من هنا",
    noInProgressCourses: "لسه مبتدأتش أي كورس. اختار واحد وابدأ.",
    continueFrom: "كمّل من: {{lesson}}",
    continueButton: "كمّل",
    lessonProgress: "{{completed}}/{{total}} درس",
    progressHeading: "تقدمك",
    statusPassed: "ناجح",
    statusInProgress: "قيد التقدم",
    statusNotStarted: "لم يبدأ",
    certificatesHeading: "الشهادات",
    noCertificates:
      "لسه ما حصلتش على أي شهادة. اجتز اختبارًا للحصول على واحدة.",
    timeOnPlatform: "الوقت اللي قضيته في المنصة",
    hourShort: "س",
    minuteShort: "د",
    lessThanAMinute: "أقل من دقيقة",
    breakReminderLabel: "تذكير راحة العين",
    breakReminderDescription:
      "تنبيه بسيط كل 20 دقيقة يقولك تبعد نظرك وتريّح عينك شوية. مقفول بشكل افتراضي.",
    breakReminderToast: "وقت راحة صغيرة - ريّح عينك، صفّي ذهنك، وابدأ من جديد.",
  },
  account: {
    profileHeading: "الحساب",
    signedInAs: "مسجّل دخول بـ {{email}}",
    signOut: "تسجيل الخروج",
    signedIn: "مسجل دخول",
    signInPrompt: "سجّل دخولك لإدارة حسابك",
    signIn: "تسجيل الدخول",
    settingsHeading: "إعدادات الحساب",
    displayNameLabel: "الاسم المعروض",
    displayNamePlaceholder: "اسمك",
    saveNameButton: "احفظ الاسم",
    nameUpdated: "الاسم اتحدّث.",
    nameUpdateFailed: "معرفناش نحدّث الاسم، جرّب تانى.",
    passwordHeading: "الباسورد",
    newPasswordLabel: "باسورد جديد",
    confirmPasswordLabel: "أكّد الباسورد الجديد",
    changePasswordButton: "غيّر الباسورد",
    passwordTooShort: "الباسورد لازم يكون 8 حروف على الأقل.",
    passwordMismatch: "الباسوردين مش متطابقين.",
    passwordUpdated: "الباسورد اتغيّر.",
    passwordUpdateFailed: "معرفناش نغيّر الباسورد، جرّب تانى.",
    emailHeading: "الإيميل",
    newEmailLabel: "إيميل جديد",
    changeEmailButton: "حدّث الإيميل",
    emailConfirmSent: "افتح إيميلك الجديد وأكّد التغيير.",
    emailUpdateFailed: "معرفناش نحدّث الإيميل، جرّب تانى.",
    oauthManagedNote:
      "أنت داخل بحساب Google — الباسورد والإيميل بتتاداروا من حساب Google بتاعك.",
    dangerZoneHeading: "منطقة الخطر",
    deleteAccountHeading: "احذف الحساب",
    deleteAccountBody:
      "هيحذف البروفايل وتقدّمك فى الاختبارات وشهاداتك نهائيًا. الشهادات اللي أخدتها هتبطل قابلة للتحقق بمجرد الحذف. الخطوة دي مفيش رجوع فيها.",
    deleteAccountButton: "احذف الحساب",
    deleteConfirmTitle: "متأكد تمامًا؟",
    deleteConfirmBody:
      "ده هيحذف حسابك وكل البيانات المرتبطة بيه نهائيًا — مفيش طريقة تسترجعها بعد كده.",
    deleteConfirmLabel: "اكتب {{email}} عشان تأكّد",
    cancelButton: "إلغاء",
    deleteAccountFailed: "معرفناش نحذف حسابك دلوقتي، جرّب تانى.",
    supportHeading: "الدعم",
    faqHeading: "الأسئلة الشائعة",
    faqQ1: "منصة My Idea Academy مجانية؟",
    faqA1: "أيوه، كل الدروس والاختبارات والأدوات والشهادات مجانية بالكامل.",
    faqQ2: "الشهادات بتشتغل إزاي؟",
    faqA2:
      "اجتز اختبار أي مسار عشان تحصل على شهادة. أي حد يقدر يتحقق منها بالرابط الخاص بيها.",
    faqQ3: "أقدر أعيد الاختبار؟",
    faqA3: "أيوه، قد ما تحب - أحسن نتيجة هي اللي بتتحسب.",
    contactHeading: "لسه محتاج مساعدة؟",
    contactBody: "بنقرا ونرد على كل رسالة في نفس اليوم.",
    crisisNote:
      "لو بتمر بأزمة نفسية، كلّم خط أزمات في بلدك — موقع findahelpline.com هيساعدك تلاقي واحد دلوقتي.",
  },
  a11y: {
    textSize: "حجم الخط",
    visionReading: "الرؤية والقراءة",
    highContrast: "تباين عالي",
    dyslexiaFont: "خط مناسب لعسر القراءة",
    underlineLinks: "تسطير الروابط",
    motorMotion: "الحركة",
    largerTargets: "أزرار وروابط أكبر",
    reduceMotion: "تقليل الحركة",
    keyboardNav: "التنقل بلوحة المفاتيح",
    screenReading: "قراءة الشاشة",
    stopReading: "إيقاف القراءة",
    readAloud: "قراءة الصفحة بصوت عالي",
    optionsLabel: "خيارات سهولة الوصول",
    skipToContent: "روح للمحتوى الرئيسي",
  },
  quiz: {
    loading: "بيحمّل…",
    loadingQuiz: "بيحمّل الكويز…",
    noQuizAvailable: "مفيش كويز متاح للمسار ده لسه.",
    signInTitle: "سجّل دخولك عشان تحل الكويز ده",
    signInSubtitle:
      "اعمل حساب مجاني أو سجّل دخول عشان تجاوب على الأسئلة، تتابع نتيجتك، وتاخد شهادة.",
    backToLessons: "رجوع للدروس",
    sessionExpired: "انتهت جلستك، سجّل دخول تاني من فضلك.",
    answerCheckFailed: "معرفناش نتأكد من الإجابة دي، جرّب تاني.",
    signInToSave: "سجّل دخول عشان تحفظ نتيجتك وتاخد شهادة.",
    saveFailed: "معرفناش نحفظ محاولتك",
    congratulations: "مبروك!",
    almostThere: "قربت توصل",
    scoreLine: "جبت {{score}}/{{total}} ({{percentage}}%)",
    savingAttempt: "بنحفظ محاولتك…",
    viewCertificate: "عرض الشهادة",
    tryAgain: "جرّب تاني",
    signInToClaim: "سجّل دخول عشان تستلم شهادتك",
    questionCounter: "سؤال {{current}} / {{total}}",
    scoreCounter: "النتيجة: {{score}}",
    explanationLabel: "الشرح:",
    finish: "خلّص",
    next: "التالي",
  },
  courses: {
    pageTitle: "الكورسات",
    pageSubtitle: "كورسات متقسمة لوحدات ودروس، فيها اختبارات قصيرة وامتحانات.",
    noneAvailable: "مفيش كورسات متاحة دلوقتي — تابعنا قريب.",
    startCourse: "ابدأ الكورس",
    allCourses: "كل الكورسات",
    unitCount_one: "وحدة واحدة",
    unitCount_other: "{{count}} وحدة",
    lessonCount_one: "درس واحد",
    lessonCount_other: "{{count}} درس",
    backToCourse: "ارجع للكورس",
    quickCheck: {
      title: "اختبار سريع",
      scoreLine: "{{score}}/{{total}} صح",
      signInPrompt: "سجّل دخول عشان تقدر تتأكد من إجاباتك وانت بتتعلم.",
      sessionExpired: "الجلسة بتاعتك خلصت، سجّل دخول تاني.",
      checkFailed: "معرفناش نتأكد من الإجابة دي، جرّب تاني.",
      hintButton: "تلميح",
      showAnswerButton: "اظهار الإجابة",
    },
    exam: {
      unitExamTitle: "امتحان الوحدة",
      finalExamTitle: "الامتحان النهائي",
      takeUnitExam: "اعمل امتحان الوحدة",
      takeFinalExam: "اعمل الامتحان النهائي",
      finalExamHint: "بيغطي الكورس كله",
      signInPrompt: "سجّل دخول عشان تقدر تعمل الامتحان ده.",
      noQuestions: "الامتحان ده لسه مش متاح.",
      submitFailed: "معرفناش نبعت الامتحان، جرّب تاني.",
      scoreLine: "{{score}}/{{total}} صح",
      passed: "نجحت!",
      notPassed: "لسه، راجع المحتوى وجرّب تاني.",
      retry: "جرّب تاني",
      previous: "السابق",
      reviewHeading: "مراجعة الأسئلة",
    },
  },
  aiChat: {
    openLabel: "افتح المساعد الذكي",
    sendLabel: "إرسال",
    inputPlaceholder: "اكتب سؤالك…",
    askAnything: "اسألني أي حاجة",
    topicLabel: "المسار: {{topic}}",
    welcomeMessage: "أهلًا! أنا مرشدك في التعلّم.",
    askAboutTopic: "اسألني أي حاجة عن {{topic}}.",
    pickTopicPrompt: "اختار مسار واسألني أي حاجة.",
    thinking: "بيفكّر…",
    signInToast: "سجّل دخول عشان تتكلم مع المساعد الذكي.",
    limitReachedToast: "وصلت لحد الرسايل بتاع النهاردة، جرّب تاني بكرة.",
    unavailableToast: "المساعد الذكي مش متاح دلوقتي.",
  },
  tts: {
    listenLabel: "استمع",
    stopLabel: "إيقاف",
    signInToast: "سجّل دخول عشان تستخدم تحويل النص لصوت.",
    limitReachedToast: "وصلت لحد الصوتيات بتاع النهاردة، جرّب تاني بكرة.",
    unavailableToast: "تحويل النص لصوت مش متاح دلوقتي.",
  },
  notFound: {
    title: "الصفحة مش موجودة",
    subtitle: "الصفحة اللي بتدور عليها مش موجودة أو اتنقلت.",
    goHome: "روح للرئيسية",
  },
  errorPage: {
    title: "الصفحة دي معرفتش تفتح",
    subtitle: "حصل خطأ من عندنا. جرّب تحدّث الصفحة أو ارجع للرئيسية.",
    tryAgain: "جرّب تاني",
    goHome: "روح للرئيسية",
  },
  partnerships: {
    kicker: "تعاون",
    sectionTitle: "شركاؤنا",
    sectionSubtitle: "بنشتغل مع جهات بتشاركنا هدف إن التعليم يوصل لأي حد.",
    placeholderLabel: "شريك {{number}}",
  },
};

export default ar;
