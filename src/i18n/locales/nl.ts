import type { Translations } from "./en";

const nl: Translations = {
  nav: {
    brand: "MY IDEA",
    theme: "Thema wisselen",
    language: "Taal",
    home: "Home",
    dashboard: "Dashboard",
    tools: "Tools",
    account: "Account",
  },
  welcome: {
    kicker: "Interactief leerplatform",
    title: "Welkom",
    subtitle: "Kies een traject en begin met leren.",
    cta: "Aan de slag",
    scroll: "Scroll om te ontdekken",
  },
  topics: {
    prevLabel: "Vorige",
    nextLabel: "Volgende",
    goToLabel: "Ga naar {{topic}}",
    sectionTitle: "Kies je traject",
    sectionSubtitle: "Veeg door de disciplines — binnenkort meer.",
    swipeHint: "Veeg om te ontdekken",
    startLearning: "Begin met leren",
    cybersecurity: {
      title: "Cybersecurity",
      description:
        "Bescherm systemen, netwerken en data tegen moderne dreigingen.",
    },
    ai: {
      title: "Kunstmatige Intelligentie",
      description: "Bouw modellen die leren, redeneren en creëren.",
    },
    software: {
      title: "Software-engineering",
      description: "Ontwerp, bouw en lever betrouwbare software.",
    },
    networking: {
      title: "Netwerken",
      description: "Beheers de protocollen die de wereld verbinden.",
    },
    hacking: {
      title: "Ethisch Hacken",
      description: "Denk als een aanvaller om te beschermen wat telt.",
    },
    data: {
      title: "Data Science",
      description: "Verander ruwe data in beslissingen en ontdekkingen.",
    },
    cloud: {
      title: "Cloud Computing",
      description: "Ontwerp schaalbare systemen op moderne cloudplatformen.",
    },
    os: {
      title: "Besturingssystemen",
      description:
        "Leer hoe computers geheugen, processen en bestanden beheren.",
    },
    skills: {
      title: "Professionele Vaardigheden",
      description: "Communicatie, teamwork en andere essentiële vaardigheden.",
    },
  },
  tools: {
    notFound: "Tool niet gevonden.",
    loadError: "Kon deze tool niet laden.",
    pageTitle: "Tools",
    pageSubtitle:
      "Praktische, interactieve tools om wat je leert direct toe te passen.",
    backToTools: "Alle Tools",
    backHomeButton: "Home",
    openTool: "Open tool",
    groups: {
      cyber: "Cybertools",
      networking: "Netwerktools",
      topics: "Andere Onderwerpen",
    },
    list: {
      passwordStrength: {
        title: "Wachtwoordsterkte-controle",
        description:
          "Test hoe sterk een wachtwoord is en hoe snel het gekraakt zou kunnen worden.",
      },
      phishingTrainer: {
        title: "Phishing-bewustzijnstraining",
        description:
          "Herken de waarschuwingssignalen in realistische e-mails en berichten, en ontdek wat ze verraadde.",
      },
      emailChecker: {
        title: "E-mailchecker",
        description:
          "Plak een ruwe e-mail en krijg een volledige phishing-analyse: headers, links, bijlagen en meer.",
      },
      hashTool: {
        title: "Hash-toolkit",
        description:
          "Genereer, herken en vergelijk cryptografische hashes, allemaal in je browser.",
      },
      encryptionTool: {
        title: "Versleutel-toolkit",
        description:
          "Versleutel en ontsleutel tekst en bestanden met AES, en probeer het klassieke Caesar-cijfer.",
      },
      linkChecker: {
        title: "Linkchecker",
        description:
          "Analyseer de structuur van een URL op phishingsignalen, en controleer daarna eventueel waar hij echt naartoe leidt.",
      },
      networkDefense: {
        title: "Netwerkverdedigingssimulator",
        description:
          "Verdedig een klein netwerk tegen een AI-aanvaller die vooruitdenkt met minimax - kies een moeilijkheidsgraad en zie het verschil dat slimmer zoeken maakt.",
      },
      attackPlanner: {
        title: "AI-aanvalsverdedigingsplanner",
        description:
          "Kies een realistisch aanvalsscenario en krijg een door AI gegenereerd verdedigingsplan: preventie, detectie, respons en herstel.",
      },
      appPermissions: {
        title: "App-machtigingen controleren",
        description:
          "Bekijk wat een paar alledaagse apps vragen en beslis welke machtigingen echt logisch zijn.",
      },
      bitAscii: {
        title: "Bit-naar-ASCII Converter",
        description:
          "Zet tekst om naar binair en terug - zie precies hoe tekens bytes worden.",
      },
    },
    passwordStrength: {
      label: "Voer een wachtwoord in",
      placeholder: "Typ een wachtwoord om te controleren...",
      show: "Wachtwoord tonen",
      hide: "Wachtwoord verbergen",
      strengthLabel: "Sterkte",
      strength: {
        empty: "Begin met typen om het resultaat te zien",
        veryWeak: "Zeer zwak",
        weak: "Zwak",
        fair: "Redelijk",
        strong: "Sterk",
        veryStrong: "Zeer sterk",
      },
      criteria: {
        length: "Minstens 8 tekens",
        lower: "Kleine letter",
        upper: "Hoofdletter",
        number: "Cijfer",
        symbol: "Symbool",
        noPattern: "Geen voorspelbaar patroon",
        name: "Geen persoonlijke namen",
      },
      namesWarning:
        "Namen mogen niet als wachtwoord worden gebruikt. Die van jou, een familielid of een huisdier zijn allemaal makkelijk te raden.",
      vaultUnlocked: "Kluis ontgrendeld, dit wachtwoord is zeer sterk.",
      compareShow: "+ Vergelijk met een vorig wachtwoord",
      compareHide: "\u2212 Vergelijking verbergen",
      comparePreviousLabel: "Vorig wachtwoord",
      comparePreviousPlaceholder: "Typ je oude wachtwoord...",
      compareTooSimilar:
        "Te veel lijkend op je vorige wachtwoord. Aanvallers proberen eerst kleine variaties, zoals een veranderd cijfer of jaartal.",
      compareDifferent:
        "Goed, dit verschilt duidelijk van je vorige wachtwoord.",
      entropyLabel: "Entropie",
      crackByAttackTypeLabel: "Kraaktijd per aanvalstype",
      crackScenario: {
        online: "Online (met snelheidslimiet)",
        offlineFast: "Offline, snelle hash",
        offlineSlow: "Offline, langzame hash (bcrypt)",
      },
      crackTime: {
        instant: "Direct",
        seconds: "Seconden",
        minutes: "Minuten",
        hours: "Uren",
        days: "Dagen",
        months: "Maanden",
        years: "Jaren",
        centuries: "Eeuwen",
      },
      breach: {
        title: "Controleer op datalekken (Have I Been Pwned)",
        checking: "Bezig met controleren...",
        foundResult:
          "Gevonden in datalekken, {{times}} keer. Verander dit wachtwoord direct als je het echt gebruikt.",
        notFoundResult: "Niet gevonden in bekende datalekken.",
        errorResult:
          "Kon Have I Been Pwned nu niet bereiken. Probeer het straks opnieuw.",
        note: "Stuurt alleen de eerste 5 tekens van een SHA-1-hash (k-anonymiteit). Je volledige wachtwoord verlaat nooit de browser.",
      },
      tipsTitle: "Hoe dit gekraakt zou kunnen worden",
      tips: {
        commonBreach:
          "Dit exacte wachtwoord staat op echte lekkenlijsten. Aanvallers proberen het bij duizenden accounts tegelijk in plaats van willekeurig te raden, gebruik het nooit.",
        leetCommonBreach:
          "Letters vervangen door symbolen (zoals @ voor a, 0 voor o) verandert dit terug in een van de meest gelekte wachtwoorden. Kraaktools proberen deze vervangingen al automatisch.",
        fullName:
          "Dit lijkt op een volledige persoonsnaam. Combinaties van volledige namen zijn extreem voorspelbaar, vermijd het aan elkaar plakken van voornaam, vadersnaam of achternaam.",
        singleName:
          "Namen zijn makkelijk te raden of op te zoeken. Vermijd je eigen naam, die van een familielid of huisdier.",
        maskPattern:
          'Een woord gevolgd door een paar cijfers (zoals "Zomer2024") is een bekend patroon. Kraaktools testen dit als een van de eerste dingen.',
        latinKeyboardPattern:
          'Toetsenbordreeksen en herhaalde tekens (zoals "qwerty" of "aaa") zitten in de standaardregels van de meeste kraaktools.',
        arabicKeyboardPattern:
          'Arabische toetsenbordreeksen (zoals "ضصث") zijn net zo voorspelbaar als "qwerty", kraaktools dekken ook regionale indelingen.',
        turkishKeyboardPattern:
          'Turkse toetsenbordpatronen (zoals "şi" of "ğü") zijn voor kraaktools net zo voorspelbaar als standaard QWERTY.',
        germanKeyboardPattern:
          'Duitse QWERTZ-patronen (zoals "qwertz" of "yxcvb") zijn voor kraaktools net zo voorspelbaar als standaard QWERTY.',
        leetSubstitution:
          "Eenvoudige letter-naar-symbool-vervangingen bieden minder extra bescherming dan het lijkt, kraaktools testen gangbare vervangingen automatisch.",
        dictionaryWord:
          "\u00c9\u00e9n simpel woordenboekwoord staat bovenaan bijna elke woordenlijst die aanvallers gebruiken.",
        shortLength:
          "Korte wachtwoorden zijn binnen bereik van brute-force-tools. Streef naar minstens 12\u201316 tekens.",
        noWeakness:
          "Hier is geen duidelijke zwakte gevonden, dit kraken zou nog steeds een grootschalige brute-force-inspanning vergen.",
        credentialStuffing:
          "Dit wachtwoord ergens anders hergebruiken maakt het kwetsbaar voor credential stuffing als een andere site wordt gelekt.",
        phishing:
          'Geen enkele wachtwoordsterkte beschermt tegen phishing. Wees voorzichtig met links of berichten die vragen je account te "verifi\u00ebren".',
        socialMining:
          "Aanvallers halen vaak informatie van sociale media over huisdieren, verjaardagen en hobby's nog voordat het gokken begint.",
      },
      privacyNote:
        "Al het andere werkt volledig in je browser. Niets wordt ooit verstuurd, opgeslagen of ergens gelogd.",
      generator: {
        title: "Genereer een sterk wachtwoord",
        modeChars: "Willekeurige tekens",
        modePassphrase: "Wachtwoordzin",
        placeholder: "Klik op Genereren om er een te maken...",
        copy: "Wachtwoord kopi\u00ebren",
        copied: "Gekopieerd naar klembord",
        copyFailed:
          "Kopi\u00ebren mislukt, probeer handmatig te selecteren en kopi\u00ebren",
        lengthLabel: "Lengte",
        uppercase: "Hoofdletters (A-Z)",
        lowercase: "Kleine letters (a-z)",
        numbers: "Cijfers (0-9)",
        symbols: "Symbolen (!@#$)",
        avoidAmbiguous: "Verwarrende tekens vermijden (l, 1, I, O, 0)",
        wordCountLabel: "Aantal woorden",
        separatorLabel: "Scheidingsteken (kies er een of meer)",
        separatorDash: "Streepje ( - )",
        separatorUnderscore: "Underscore ( _ )",
        separatorDot: "Punt ( . )",
        separatorSpace: "Spatie",
        capitalizeWords: "Elk woord met een hoofdletter",
        addNumber: "Willekeurig getal toevoegen",
        generate: "Wachtwoord genereren",
        selectAtLeastOneChar: "Selecteer minstens \u00e9\u00e9n tekentype.",
        selectAtLeastOneSeparator:
          "Selecteer minstens \u00e9\u00e9n scheidingsteken.",
      },
    },
    phishingTrainer: {
      instructionLabel:
        "Tik op elke zin, afzenderdetail of link die verdacht lijkt",
      progressLabel: "Bericht {{current}} van {{total}}",
      scoreLabel: "Correct: {{score}}/{{total}}",
      emailChannel: "E-mail",
      smsChannel: "Sms-bericht",
      checkButton: "Antwoorden controleren",
      showAllButton: "Alles tonen",
      whatGaveItAway: "Wat het verraadde",
      attackTypeLabel: "Type aanval",
      techniqueLabel: "Techniek",
      whatWouldYouDo: "Wat zou je hierna doen?",
      actionOptions: {
        investigate: "Op de link klikken of reageren om te zien wat er gebeurt",
        ignore: "Verwijderen en er niets over zeggen",
        report: "Melden bij IT of beveiliging, en dan verwijderen",
        normal: "Normaal behandelen en verdergaan",
      },
      actionFeedbackPhishing:
        "Verdachte berichten melden helpt je beveiligingsteam de afzender te blokkeren en anderen te waarschuwen die hetzelfde bericht kunnen krijgen.",
      actionFeedbackLegit:
        "Geen waarschuwingssignalen hier, je kunt dit bericht gewoon normaal behandelen.",
      nextButton: "Volgend bericht",
      finishButton: "Bekijk mijn resultaten",
      finalScoreCaption: "berichten correct opgelost",
      redFlagsRecapTitle: "Waarschuwingssignalen om te onthouden",
      tryAgainButton: "Opnieuw proberen",
      difficulty: {
        easy: "Makkelijk",
        medium: "Gemiddeld",
        hard: "Moeilijk",
      },
    },
    emailChecker: {
      inputLabel: "Ruwe e-mailbron",
      pasteButton: "Plakken",
      clearButton: "Wissen",
      exampleButton: "Voorbeeld laden",
      inputPlaceholder:
        "Plak hier de volledige e-mailbron, inclusief headers (From, Received, enz.)...",
      pasteHint: "Kon klembord niet lezen — plak handmatig met Ctrl/Cmd+V.",
      analyzeButton: "E-mail analyseren",
      riskBand: {
        low: "Laag risico",
        medium: "Enkele waarschuwingssignalen",
        high: "Hoog risico",
      },
      headerSummaryTitle: "Header-overzicht",
      fromLabel: "Van",
      replyToLabel: "Antwoorden aan",
      authLabel: "Authenticatie",
      trustButton: "Controleer leeftijd afzenderdomein",
      trustChecking: "Bezig met controleren...",
      trustSignInPrompt:
        "Log in om de leeftijd van het afzenderdomein te controleren.",
      trustLimitReached:
        "Je hebt de controlelimiet van vandaag bereikt, probeer het morgen opnieuw.",
      trustCheckFailed: "Kon het domein nu niet controleren.",
      trustResultWithAge: "{{domain}} is {{days}} dagen geleden geregistreerd.",
      trustResultUnknown:
        "Kon niet bepalen wanneer {{domain}} is geregistreerd.",
      findingsTitle: "Bevindingen",
      noFindings: "Geen waarschuwingssignalen gevonden in deze e-mail.",
      findings: {
        authFail: {
          label: "Authenticatie mislukt",
          text: "SPF, DKIM of DMARC is mislukt, een sterk signaal dat het domein van de afzender wordt vervalst.",
        },
        replyToMismatch: {
          label: "Antwoord-aan komt niet overeen met afzender",
          text: "Antwoorden zouden naar een ander domein gaan ({{replyToDomain}}) dan het afzenderadres ({{fromDomain}}).",
        },
        linkTextMismatch: {
          label: "Linktekst komt niet overeen met bestemming",
          text: 'Toont "{{displayText}}" maar leidt eigenlijk naar {{hrefDomain}}.',
        },
        credentialRequest: {
          label: "Vraagt om inloggegevens",
          text: 'Bevat formuleringen zoals "{{phrase}}"; legitieme diensten vragen dit zelden per e-mail.',
        },
        riskyAttachment: {
          label: "Risicovolle bijlage genoemd",
          text: "{{filename}} heeft een bestandstype dat vaak wordt gebruikt om malware te verspreiden.",
        },
        unearnedReward: {
          label: "Onverdiende beloning",
          text: 'Bevat formuleringen zoals "{{phrase}}", een klassiek patroon van voorschotfraude.',
        },
        urgencyLanguage: {
          label: "Urgentietaal",
          text: 'Bevat formuleringen zoals "{{phrase}}", bedoeld om je te haasten zonder na te denken.',
        },
        genericGreeting: {
          label: "Algemene aanhef",
          text: 'Gebruikt "{{phrase}}" in plaats van je bij je naam te noemen.',
        },
        ipBasedLink: {
          label: "Link verwijst naar een kaal IP-adres",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "Verkorte link",
          text: "{{url}} verbergt de werkelijke bestemming.",
        },
        noReceivedHeaders: {
          label: "Geen Received-headers",
          text: "Een echte e-mail gaat vrijwel altijd langs minstens één mailserver; het ontbreken hiervan kan wijzen op een handmatig gemaakte header.",
        },
      },
      routeTitle: "Bezorgroute",
      linksTitle: "Links",
      linkTagIp: "kaal IP",
      linkTagShortened: "verkort",
      linkTagStandard: "standaard",
      privacyNote:
        "Alles draait lokaal in je browser, behalve de optionele controle van de domeinleeftijd, die alleen een kale domeinnaam verstuurt, nooit de e-mail zelf.",
    },
    hashTool: {
      tabs: {
        generate: "Genereren",
        identify: "Herkennen",
        compare: "Vergelijken",
      },
      generate: {
        label: "Tekst om te hashen",
        placeholder: "Typ of plak tekst...",
        empty: "Begin te typen om de hashes te zien",
        copy: "Hash kopiëren",
        copied: "Gekopieerd naar klembord",
        copyFailed:
          "Kopiëren mislukt, probeer handmatig te selecteren en kopiëren",
      },
      identify: {
        label: "Plak een hash",
        placeholder: "Plak een hash om te herkennen...",
        empty: "Plak hierboven een hash om mogelijke overeenkomsten te zien",
        resultsTitle: "Mogelijke overeenkomsten",
        ambiguousNote:
          "Meerdere algoritmes produceren exact deze lengte of dit formaat, ze zijn niet te onderscheiden aan de hand van de tekenreeks alleen.",
        noMatch: "Komt niet overeen met een bekend hash-formaat.",
      },
      compare: {
        labelA: "Hash A",
        labelB: "Hash B",
        placeholder: "Plak een hash...",
        match: "Deze komen overeen",
        noMatch: "Deze komen niet overeen",
        empty: "Plak beide hashes om ze te vergelijken",
        note: "Bij het vergelijken worden hoofdletters/kleine letters en extra spaties genegeerd.",
      },
      privacyNote:
        "Alles draait lokaal in je browser. Niets wordt ooit ergens naartoe gestuurd, opgeslagen of gelogd.",
    },
    encryptionTool: {
      tabs: { modern: "Modern (AES)", classic: "Caesar-cijfer" },
      privacyNote:
        "Alles draait lokaal in je browser. Niets wordt ooit ergens naartoe gestuurd, opgeslagen of gelogd.",
      modern: {
        warning:
          "Als je dit wachtwoord vergeet, is er geen enkele manier om je gegevens terug te krijgen.",
        encryptButton: "Versleutelen",
        decryptButton: "Ontsleutelen",
        textTab: "Tekst",
        fileTab: "Bestand",
        passphraseLabel: "Wachtwoord",
        passphrasePlaceholder: "Typ een sterk wachtwoord...",
        crackTimeLabel: "Geschatte kraaktijd: {{time}}",
        textPlaceholderEncrypt: "Typ de tekst die je wilt versleutelen...",
        textPlaceholderDecrypt: "Plak de versleutelde tekst...",
        encrypting: "Bezig met versleutelen...",
        decrypting: "Bezig met ontsleutelen...",
        errors: {
          needPassphrase: "Vul eerst een wachtwoord in.",
          needText: "Vul ook een tekst in.",
          needFile: "Kies eerst een bestand.",
          fileTooLarge:
            "Bestand is groter dan 20 MB — probeer een kleiner bestand in deze demo.",
          encryptFailed: "Er ging iets mis tijdens het versleutelen.",
          decryptFailed:
            "Kon niet ontsleutelen — het wachtwoord klopt niet, of het bestand/de tekst is ongeldig.",
        },
        outputLabel: "Uitvoer",
        copyButton: "Kopiëren",
        copied: "Gekopieerd naar klembord",
        copyFailed:
          "Kopiëren mislukt, probeer handmatig te selecteren en kopiëren",
        downloadAgainButton: "Opnieuw downloaden",
        breakdownLabel: "Wat er in de uitvoer zit",
        cipherBytesLabel:
          "{{count}} bytes (inclusief een 16-byte authenticatietag)",
      },
      classic: {
        textLabel: "Tekst",
        cipherTabs: { caesar: "Caesar", vigenere: "Vigenère" },
        caesar: {
          shiftLabel: "Verschuiving",
          outputLabel: "Uitvoer",
          crackButton: "Probeer het te kraken (alle 26 verschuivingen)",
        },
        vigenere: {
          keywordLabel: "Sleutelwoord",
          keywordPlaceholder: "Typ een sleutelwoord...",
          encryptButton: "Versleutelen",
          decryptButton: "Ontsleutelen",
          outputLabel: "Uitvoer",
          needKeyword: "Vul eerst een sleutelwoord in.",
        },
      },
    },
    linkChecker: {
      urlLabel: "URL",
      urlPlaceholder: "Plak een link om te controleren...",
      analyzeButton: "Link controleren",
      invalid:
        "Dat is geen geldige URL — controleer de indeling en probeer opnieuw.",
      scoreLabel: "geschatte veiligheid",
      scoreTone: {
        good: "Redelijk geruststellend, op basis van wat tot nu toe is gecontroleerd.",
        mixed:
          "Nog de moeite waard om verder te controleren — voer de servercontroles hieronder uit voor een duidelijker beeld.",
        bad: "Duidelijke waarschuwingssignalen hier, wees voorzichtig voordat je op deze link klikt.",
      },
      breakdownLabel: "URL-uitsplitsing",
      protocolLabel: "Protocol:",
      hostLabel: "Host:",
      pathLabel: "Pad:",
      checksLabel: "{{count}} van {{total}} controles gemarkeerd",
      checks: {
        ipHost: {
          label: "Domein of IP?",
          clean: "Dit gebruikt een normale domeinnaam.",
          flagged:
            "Dit gebruikt een kaal IP-adres in plaats van een domeinnaam — zeldzaam bij legitieme sites.",
        },
        userinfo: {
          label: '"@" in de URL',
          clean: 'Geen "@" die een echt adres erachter verbergt.',
          flagged:
            'Het deel vóór "@" ({{username}}) is niet het echte adres — de echte host is {{hostname}}.',
        },
        punycode: {
          label: "Punycode-codering",
          clean: "Geen verdachte Punycode-codering.",
          flagged:
            "Dit domein is Punycode-gecodeerd — het kan lijkende tekens gebruiken om een bekende site na te bootsen.",
        },
        subdomains: {
          label: "Aantal domeindelen",
          clean: "Een normaal aantal domeindelen.",
          flagged:
            "Dit domein heeft {{count}} delen — ongewoon veel, wat kan worden gebruikt om het echte domein aan het einde te verbergen.",
        },
        shortener: {
          label: "URL-verkorter",
          clean: "Geen bekende URL-verkortingsdienst.",
          flagged:
            "Dit is een bekend URL-verkortingsdomein — de echte bestemming is verborgen totdat je klikt.",
        },
        https: {
          label: "HTTPS?",
          clean: "Gebruikt https.",
          flagged:
            "Dit is http, geen https — gegevens tussen browser en site zijn niet versleuteld.",
        },
        tld: {
          label: "Domeinextensie (TLD)",
          clean:
            "De domeinextensie (.{{tld}}) is niet een van de extensies die vaak met misbruik worden geassocieerd.",
          flagged:
            ".{{tld}} is een gratis of zeer goedkope extensie die onevenredig vaak wordt misbruikt voor phishing — op zich geen bewijs.",
        },
        brand: {
          label: "Imitatie van een bekend merk",
          clean: "Geen bekende merknaam opgenomen in een ander domein.",
          flagged:
            'Deze URL bevat de naam "{{brand}}" maar het echte domein is niet {{officialDomain}}.',
        },
      },
      disclaimer:
        "Dit signaleert alleen structurele patronen, het is geen 100%-veiligheidsgarantie — een link zonder markeringen hierboven kan nog steeds gevaarlijk zijn.",
      server: {
        label: "Servercontroles (inloggen vereist)",
        button: "Controleer redirects en domeinleeftijd",
        checking: "Bezig met controleren...",
        signInPrompt: "Log in om de servercontroles uit te voeren.",
        limitReached:
          "Je hebt de controlelimiet van vandaag bereikt, probeer het morgen opnieuw.",
        failed: "Kon de servercontrole nu niet voltooien.",
        redirectLabel: "Redirect-keten",
        domainAgeLabel: "Domein geregistreerd",
        domainAgeUnknown:
          "Kon de registratiedatum van dit domein niet bepalen.",
        daysOld: "{{count}} dagen geleden",
        googleFlagged: "Gemarkeerd als gevaarlijk door Google Safe Browsing.",
        googleClean: "Geen problemen gevonden door Google Safe Browsing.",
        googleUnavailable: "Google Safe Browsing-controle niet beschikbaar.",
      },
    },
    networkDefense: {
      introTitle: "Jij bent de verdediger",
      introBody:
        "Een AI-aanvaller probeert je netwerk binnen te dringen en de database te bereiken. Patch zwakke plekken en isoleer inbraken om dit te stoppen - je hebt van elk een beperkt aantal.",
      difficulty: { easy: "Makkelijk", medium: "Gemiddeld", hard: "Moeilijk" },
      difficultyHint: {
        easy: "De aanvaller kiest willekeurige zetten - zonder enige vooruitblik.",
        medium: "De aanvaller denkt een paar zetten vooruit met minimax.",
        hard: "De aanvaller zoekt dieper en sneller met minimax en alpha-bèta-snoeien.",
      },
      startButton: "Begin met verdedigen",
      round: "Ronde {{round}}/{{max}}",
      patchesLeft: "{{count}} patches over",
      isolatesLeft: "{{count}} isolaties over",
      nodes: {
        firewall: "Firewall",
        webServer: "Webserver",
        mailServer: "Mailserver",
        vpn: "VPN",
        appServer: "Applicatieserver",
        fileServer: "Bestandsserver",
        adminPanel: "Beheerpaneel",
        database: "Database",
      },
      defenderWon: "Je hebt standgehouden",
      defenderWonBody:
        "De aanvaller bereikte de database niet voordat de tijd om was.",
      attackerWon: "Inbraak - de database is gecompromitteerd",
      attackerWonBody:
        "Zelfs een sterke verdediging kan uiteindelijk doorbroken worden - daarom draait echte beveiliging om meerdere lagen, niet één perfecte muur.",
      playAgain: "Opnieuw spelen",
      attackerThinking: "De aanvaller kiest zijn volgende zet...",
      yourTurn: "Jouw beurt",
      noDefensesLeft:
        "Je hebt geen patches of isolaties meer - de aanvaller krijgt een gratis zet.",
      passButton: "Passen",
      patchAction: "Patch een knooppunt",
      noPatchesLeft: "Geen patches meer over.",
      isolateAction: "Isoleer een gecompromitteerd knooppunt",
      noIsolatesLeft: "Geen isolaties meer over, of niets om te isoleren.",
      nodesExplored:
        "De aanvaller overwoog {{count}} mogelijke uitkomsten voordat hij die zet koos.",
    },
    attackPlanner: {
      signInTitle: "Log in om de verdedigingsplanner te gebruiken",
      signInSubtitle:
        "Maak een gratis account aan of log in om AI-verdedigingsplannen te genereren en je gebruik bij te houden.",
      scenarioPickerLabel: "Kies een aanvalsscenario",
      scenarios: {
        phishing: {
          title: "Phishingcampagne",
          description:
            "Misleidende e-mails of berichten bedoeld om inloggegevens te stelen of malware te installeren.",
        },
        ransomware: {
          title: "Ransomware",
          description:
            "Malware die bestanden versleutelt en betaling eist om de toegang te herstellen.",
        },
        ddos: {
          title: "DDoS-aanval",
          description:
            "Een systeem overspoelen met verkeer totdat het echte gebruikers niet meer kan bedienen.",
        },
        insiderThreat: {
          title: "Interne dreiging",
          description:
            "Schade veroorzaakt door iemand die al legitieme toegang heeft.",
        },
        credentialStuffing: {
          title: "Credential stuffing",
          description:
            "Geautomatiseerde inlogpogingen met wachtwoorden die bij andere datalekken zijn buitgemaakt.",
        },
        sqlInjection: {
          title: "SQL-injectie",
          description:
            "Kwaadaardige invoer die een database manipuleert via een kwetsbare app.",
        },
        supplyChain: {
          title: "Supply chain-aanval",
          description:
            "Een vertrouwde leverancier of afhankelijkheid compromitteren om bij de gebruikers ervan te komen.",
        },
        socialEngineering: {
          title: "Social engineering",
          description:
            "Mensen manipuleren, in plaats van systemen, om beveiligingsprocedures te doorbreken.",
        },
      },
      contextLabel: "Context toevoegen (optioneel)",
      contextPlaceholder:
        "bijv. ik run een kleine webshop met 5 medewerkers...",
      contextHint: "{{count}}/{{max}} tekens",
      generateButton: "Verdedigingsplan genereren",
      generating: "Je plan wordt gegenereerd...",
      changeScenarioButton: "Ander scenario kiezen",
      severityLabel: "Typische ernst",
      severity: {
        low: "Laag",
        medium: "Gemiddeld",
        high: "Hoog",
        critical: "Kritiek",
      },
      sections: {
        prevention: "Preventie",
        detection: "Detectie",
        response: "Respons",
        recovery: "Herstel",
      },
      limitReached:
        "Dagelijkse limiet voor plannen bereikt, probeer het morgen opnieuw.",
      failed: "Kon nu geen plan genereren, probeer het opnieuw.",
      disclaimer:
        "Door AI gegenereerd voor educatieve doeleinden. Controleer officiële richtlijnen voordat je hierop vertrouwt bij een echt incident.",
    },
    appPermissions: {
      instructionLabel:
        "Tik op Toestaan of Weigeren voor elke machtiging die deze app vraagt, op basis van wat de app hoort te doen.",
      progressLabel: "App {{current}} van {{total}}",
      scoreLabel: "{{score}}/{{total}} correct",
      allowLabel: "Toestaan",
      denyLabel: "Weigeren",
      checkButton: "Controleer mijn antwoorden",
      nextButton: "Volgende app",
      finishButton: "Klaar",
      tryAgainButton: "Opnieuw proberen",
      justifiedNote: "Logisch voor dit soort app.",
      whyThisMatters: "Waarom dit belangrijk is",
      finalScoreCaption:
        "Je hebt {{pct}}% van de machtigingen juist beoordeeld.",
      tipsTitle: "Om te onthouden",
      permissions: {
        camera: "Camera",
        microphone: "Microfoon",
        contacts: "Contacten",
        location: "Locatie",
        sms: "Sms / Tekstberichten",
        callLog: "Oproepgeschiedenis",
        storage: "Foto's en opslag",
        motionFitness: "Beweging en fitness",
      },
      apps: {
        flashlight: {
          name: "Zaklamp",
          description:
            "Een simpele app die de flitser van de camera aan- en uitzet.",
        },
        qrScanner: {
          name: "QR-codescanner",
          description:
            "Scant QR-codes met de camera en laat zien wat erin staat.",
        },
        photoEditor: {
          name: "Fotobewerker",
          description:
            "Bijsnijden, filteren en bewerken van foto's die al op je apparaat staan.",
        },
        messaging: {
          name: "Berichten-app",
          description:
            "Stuurt tekst-, foto- en spraakberichten naar je contacten.",
        },
        fitnessTracker: {
          name: "Stappenteller",
          description:
            "Telt je stappen en brengt je hardloop- en wandelroutes in kaart.",
        },
        puzzleGame: {
          name: "Blokkenpuzzel",
          description:
            "Een op zichzelf staand offline puzzelspel zonder sociale of online functies.",
        },
        weather: {
          name: "Weer",
          description: "Toont de verwachting voor je huidige locatie.",
        },
        videoCalling: {
          name: "Videobellen",
          description:
            "Maakt video- en spraakoproepen naar mensen uit je contacten.",
        },
        banking: {
          name: "Mobiel Bankieren",
          description:
            "Bekijkt saldo's, stort cheques en betaalt rekeningen vanaf je bankrekening.",
        },
        rideHailing: {
          name: "Taxi Bestellen",
          description:
            "Boekt een auto die je ophaalt en ergens naartoe brengt.",
        },
        sleepTracker: {
          name: "Slaaptracker",
          description:
            "Volgt je slaap 's nachts met de bewegingssensoren van je telefoon.",
        },
        newsReader: {
          name: "Nieuwslezer",
          description:
            "Verzamelt koppen en artikelen van je favoriete bronnen in één feed.",
        },
      },
      reasons: {
        flashlightContacts:
          "Een zaklamp hoeft alleen de flitser van de camera te bedienen - er is geen reden om je contactenlijst te lezen.",
        flashlightLocation:
          "Een lampje aan- en uitzetten vereist niet dat de app weet waar je bent.",
        flashlightSms:
          "Geen enkele functie van een zaklamp heeft iets te maken met het lezen of versturen van tekstberichten.",
        flashlightMicrophone:
          "Een simpele zaklamp heeft geen legitiem gebruik voor je microfoon.",
        qrContacts: "Een code scannen vereist geen toegang tot wie je kent.",
        qrCallLog:
          "Een QR-code lezen heeft niets te maken met je oproepgeschiedenis.",
        qrLocation:
          "De app kan decoderen wat er in de code staat zonder te weten waar je bent.",
        photoLocation:
          "Foto's bewerken die al op je apparaat staan vereist geen toegang tot je actuele locatie.",
        photoContacts:
          "Geen enkele bewerkingsfunctie heeft je contactenlijst nodig.",
        photoMicrophone:
          "Dit is een fotobewerker, geen spraak- of videotool - er is geen legitiem gebruik voor audio.",
        messagingCallLog:
          "Berichten versturen vereist niet dat de app leest wie je hebt gebeld en wanneer.",
        messagingLocation:
          "Je locatie delen voor één gesprek is redelijk; er voortdurend op de achtergrond om vragen niet.",
        fitnessContacts:
          "Stappen tellen en hardlopen bijhouden vereist niet dat de app weet wie je kent.",
        fitnessCamera:
          "Een stappenteller heeft geen reden om bij je camera te kunnen.",
        fitnessSms:
          "Geen enkele fitness-trackingfunctie heeft iets met je tekstberichten te maken.",
        gameContacts:
          "Een op zichzelf staand puzzelspel heeft geen reden om te weten wie je kent.",
        gameLocation:
          "Puzzels oplossen vereist niet dat de app weet waar je bent.",
        gameMicrophone: "Niets in dit spel hoeft je te horen.",
        gameCamera:
          "Een puzzelspel heeft geen legitiem gebruik voor je camera.",
        gameSms:
          "Dit spel heeft geen reden om tekstberichten te lezen of te versturen.",
        weatherContacts:
          "Het weerbericht bekijken vereist niet je contactenlijst.",
        weatherCamera:
          "Een weer-app heeft geen legitiem gebruik voor je camera.",
        weatherMicrophone:
          "Geen enkele voorspellingsfunctie hoeft je te horen.",
        weatherSms:
          "Weerupdates vereisen niet dat je tekstberichten worden gelezen.",
        videoSms:
          "Dit is er een om op te letten: camera, microfoon, contacten en opslag zijn allemaal redelijk voor videobellen, maar sms-toegang is een klassieke manier waarop kwaadaardige apps eenmalige inlogcodes onderscheppen die naar je telefoon worden gestuurd.",
        bankingContacts:
          "Je saldo bekijken of een cheque storten vereist niet je contactenlijst - tenzij je een specifieke functie voor betalingen tussen personen gebruikt.",
        bankingMicrophone:
          "Geen enkele essentiële bankfunctie hoeft je te horen.",
        bankingCallLog:
          "Je geld beheren vereist niet dat de app leest wie je hebt gebeld en wanneer.",
        rideHailingMicrophone:
          "Een rit boeken en volgen vereist geen toegang tot je microfoon.",
        rideHailingCamera:
          "Geen enkele essentiële functie voor het boeken van ritten heeft je camera nodig.",
        rideHailingSms:
          "Deze app heeft geen reden om tekstberichten te lezen of te versturen om een rit te boeken.",
        sleepContacts:
          "Je slaap volgen vereist niet dat de app weet wie je kent.",
        sleepCamera:
          "Een slaaptracker die 's nachts actief is, heeft geen reden om bij je camera te kunnen.",
        sleepSms:
          "Geen enkele slaap-trackingfunctie heeft iets met je tekstberichten te maken.",
        sleepCallLog:
          "Volgen hoe je slaapt vereist niet je oproepgeschiedenis.",
        newsLocation:
          "Artikelen lezen vereist niet dat de app precies weet waar je bent - hooguit een algemene regio voor lokaal nieuws.",
        newsContacts:
          "Er is geen reden waarom een nieuwslezer je contactenlijst nodig heeft.",
        newsCamera:
          "Een nieuwslezer heeft geen legitiem gebruik voor je camera.",
        newsMicrophone: "Geen enkele leesfunctie hoeft je te horen.",
        newsSms:
          "Deze app heeft geen reden om tekstberichten te lezen of te versturen.",
      },
      tips: {
        doesItMakeSense:
          "Vraag jezelf af voordat je een machtiging verleent: heeft dit echt zin voor wat de app doet?",
        utilityApps:
          "Simpele hulpmiddelen - zaklampen, QR-scanners, rekenmachines - hebben bijna nooit je contacten, sms of precieze locatie nodig.",
        smsRisk:
          "Sms-toegang is bijzonder riskant: het kan een app in staat stellen eenmalige inlogcodes te lezen die alleen voor jou bedoeld zijn.",
        changeAnytime:
          "Je kunt app-machtigingen op elk moment bekijken en wijzigen in de instellingen van je telefoon, niet alleen bij installatie.",
        whenInDoubt:
          "Twijfel je? Weiger de machtiging - als een functie het echt nodig heeft, vraagt de app het opnieuw en legt uit waarom.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "Tekst → Binair",
        binaryToText: "Binair → Tekst",
      },
      textLabel: "Tekst",
      textPlaceholder: "Typ iets...",
      binaryOutputLabel: "Binair",
      binaryEmptyState: "De binaire uitvoer verschijnt hier.",
      binaryLabel: "Binair",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "Tekst",
      textEmptyState: "De gedecodeerde tekst verschijnt hier.",
      byteCount: "{{count}} bytes",
      copy: "Kopiëren",
      copied: "Gekopieerd naar klembord",
      copyFailed: "Kopiëren naar klembord mislukt",
      errors: {
        invalidChars:
          "Binair mag alleen 0's en 1's bevatten (spaties tussen bytes zijn geen probleem).",
        notMultipleOfEight:
          "Elke byte heeft precies 8 bits nodig - het totaal is geen veelvoud van 8.",
        invalidUtf8: "Deze bytes vormen geen geldige UTF-8-tekst.",
      },
    },
  },
  auth: {
    toastAccountCreated: "Account aangemaakt! Welkom bij My Idea Academy.",
    toastWelcomeBack: "Welkom terug!",
    toastGenericError: "Er ging iets mis, probeer het opnieuw.",
    toastGoogleFailed: "Inloggen met Google is mislukt, probeer het opnieuw.",
    signInTitle: "Welkom terug",
    signUpTitle: "Maak je account aan",
    signInSubtitle: "Log in om je voortgang en certificaten bij te houden.",
    signUpSubtitle:
      "Meld je aan om je voortgang op te slaan en certificaten te verdienen.",
    continueWithGoogle: "Doorgaan met Google",
    orDivider: "of",
    namePlaceholder: "Je naam",
    emailPlaceholder: "E-mail",
    passwordPlaceholder: "Wachtwoord",
    signInButton: "Inloggen",
    signUpButton: "Account aanmaken",
    newHere: "Nieuw hier?",
    alreadyHaveAccount: "Heb je al een account?",
    createAccountLink: "Account aanmaken",
    signInLink: "Inloggen",
  },
  verify: {
    notFound: "We konden geen certificaat met dit ID vinden.",
    backHome: "Terug naar home",
    verifiedTitle: "Certificaat geverifieerd",
    verifiedSubtitle:
      "Dit certificaat is daadwerkelijk uitgegeven door My Idea Academy.",
    recipientLabel: "Ontvanger",
    topicLabel: "Traject",
    scoreLabel: "Score",
    issuedLabel: "Uitgegeven",
  },
  certificate: {
    title: "Certificaat van Voltooiing",
    presentedTo: "Wordt met trots uitgereikt aan",
    completingCourse: "voor het succesvol voltooien van de cursus",
    scoreLine: "Eindscore: {{score}}%",
    role: "Directeur van het bedrijf",
    issueDateLabel: "Uitgiftedatum",
    closeLabel: "Sluiten",
    certIdLabel: "Certificaat-ID:",
    downloadButton: "PDF downloaden",
    pending: "in behandeling",
  },
  dashboard: {
    signInTitle: "Log in om je dashboard te bekijken",
    signInSubtitle: "Volg je voortgang, certificaten en leeractiviteit.",
    signIn: "Inloggen",
    welcomeBack: "Welkom terug, {{name}}",
    subtitle: "Hier was je gebleven.",
    continueLearningHeading: "Verder leren",
    noInProgressCourses:
      "Je bent nog met geen enkele cursus begonnen. Kies er een om te starten.",
    continueFrom: "Verdergaan vanaf: {{lesson}}",
    continueButton: "Verdergaan",
    lessonProgress: "{{completed}}/{{total}} lessen",
    progressHeading: "Jouw voortgang",
    statusPassed: "Geslaagd",
    statusInProgress: "Bezig",
    statusNotStarted: "Nog niet begonnen",
    certificatesHeading: "Certificaten",
    noCertificates:
      "Je hebt nog geen certificaten behaald. Haal een quiz om er een te ontgrendelen.",
    timeOnPlatform: "Tijd op dit platform",
    hourShort: "u",
    minuteShort: "min",
    lessThanAMinute: "Minder dan een minuut",
    breakReminderLabel: "Herinneringen om je ogen te rusten",
    breakReminderDescription:
      "Elke 20 minuten een zachte herinnering om even weg te kijken en je ogen te laten rusten. Standaard uit.",
    breakReminderToast:
      "Tijd voor een korte pauze - rust je ogen, maak je hoofd leeg en begin fris.",
  },
  account: {
    profileHeading: "Account",
    signedInAs: "Ingelogd als {{email}}",
    signOut: "Uitloggen",
    signedIn: "Ingelogd",
    signInPrompt: "Log in om je account te beheren",
    signIn: "Inloggen",
    settingsHeading: "Accountinstellingen",
    displayNameLabel: "Weergavenaam",
    displayNamePlaceholder: "Je naam",
    saveNameButton: "Naam opslaan",
    nameUpdated: "Je naam is bijgewerkt.",
    nameUpdateFailed: "Kon je naam niet bijwerken, probeer het opnieuw.",
    passwordHeading: "Wachtwoord",
    newPasswordLabel: "Nieuw wachtwoord",
    confirmPasswordLabel: "Bevestig nieuw wachtwoord",
    changePasswordButton: "Wachtwoord wijzigen",
    passwordTooShort: "Wachtwoord moet minstens 8 tekens bevatten.",
    passwordMismatch: "Wachtwoorden komen niet overeen.",
    passwordUpdated: "Je wachtwoord is gewijzigd.",
    passwordUpdateFailed:
      "Kon je wachtwoord niet wijzigen, probeer het opnieuw.",
    emailHeading: "E-mailadres",
    newEmailLabel: "Nieuwe e-mail",
    changeEmailButton: "E-mail bijwerken",
    emailConfirmSent:
      "Controleer je nieuwe e-mail om de wijziging te bevestigen.",
    emailUpdateFailed: "Kon je e-mail niet bijwerken, probeer het opnieuw.",
    oauthManagedNote:
      "Je bent ingelogd met Google - je wachtwoord en e-mail worden beheerd via je Google-account.",
    dangerZoneHeading: "Gevarenzone",
    deleteAccountHeading: "Account verwijderen",
    deleteAccountBody:
      "Verwijdert je profiel, quizvoortgang en certificaten permanent. Certificaten die je hebt behaald, zijn na verwijdering niet meer te verifiëren. Dit kan niet ongedaan worden gemaakt.",
    deleteAccountButton: "Account verwijderen",
    deleteConfirmTitle: "Weet je het absoluut zeker?",
    deleteConfirmBody:
      "Dit verwijdert je account en alle bijbehorende gegevens permanent - je kunt dit daarna niet meer herstellen.",
    deleteConfirmLabel: "Typ {{email}} om te bevestigen",
    cancelButton: "Annuleren",
    deleteAccountFailed:
      "Kon je account nu niet verwijderen, probeer het opnieuw.",
    supportHeading: "Ondersteuning",
    faqHeading: "Veelgestelde vragen",
    faqQ1: "Is My Idea Academy gratis?",
    faqA1: "Ja. Alle lessen, quizzen, tools en certificaten zijn gratis.",
    faqQ2: "Hoe werken certificaten?",
    faqA2:
      "Haal de quiz van een traject om een certificaat te krijgen. Iedereen kan het verifiëren via de unieke link.",
    faqQ3: "Kan ik een quiz opnieuw maken?",
    faqA3: "Ja, zo vaak als je wilt - je beste resultaat telt.",
    contactHeading: "Nog hulp nodig?",
    contactBody: "Mail ons en we reageren zo snel mogelijk.",
    crisisNote:
      "Als je in een mentale crisis zit, neem dan contact op met een lokale hulplijn - findahelpline.com helpt je er nu meteen een te vinden.",
  },
  a11y: {
    textSize: "Tekstgrootte",
    visionReading: "Zicht en lezen",
    highContrast: "Hoog contrast",
    dyslexiaFont: "Dyslexievriendelijk lettertype",
    underlineLinks: "Links onderstrepen",
    motorMotion: "Motoriek en beweging",
    largerTargets: "Grotere knoppen en links",
    reduceMotion: "Beweging verminderen",
    keyboardNav: "Toetsenbordnavigatie",
    screenReading: "Voorlezen",
    stopReading: "Stop met voorlezen",
    readAloud: "Pagina hardop voorlezen",
    optionsLabel: "Toegankelijkheidsopties",
    skipToContent: "Ga naar de hoofdinhoud",
  },
  quiz: {
    loading: "Laden…",
    loadingQuiz: "Quiz laden…",
    noQuizAvailable: "Nog geen quiz beschikbaar voor dit traject.",
    signInTitle: "Log in om deze quiz te maken",
    signInSubtitle:
      "Maak een gratis account of log in om vragen te beantwoorden, je score bij te houden en een certificaat te verdienen.",
    backToLessons: "Terug naar de lessen",
    sessionExpired: "Je sessie is verlopen, log opnieuw in.",
    answerCheckFailed:
      "Kon dat antwoord niet controleren, probeer het opnieuw.",
    signInToSave:
      "Log in om je score op te slaan en een certificaat te verdienen.",
    saveFailed: "Kon je poging niet opslaan",
    congratulations: "Gefeliciteerd!",
    almostThere: "Bijna klaar",
    scoreLine: "Je scoorde {{score}}/{{total}} ({{percentage}}%)",
    savingAttempt: "Je poging wordt opgeslagen…",
    viewCertificate: "Certificaat bekijken",
    tryAgain: "Probeer opnieuw",
    signInToClaim: "Log in om je certificaat op te halen",
    questionCounter: "Vraag {{current}} / {{total}}",
    scoreCounter: "Score: {{score}}",
    explanationLabel: "Uitleg:",
    finish: "Afronden",
    next: "Volgende",
  },
  courses: {
    pageTitle: "Cursussen",
    pageSubtitle:
      "Gestructureerde cursussen met units, lessen, korte toetsen en examens.",
    noneAvailable: "Nog geen cursussen beschikbaar — kom snel terug.",
    startCourse: "Cursus starten",
    allCourses: "Alle cursussen",
    unitCount_one: "{{count}} unit",
    unitCount_other: "{{count}} units",
    lessonCount_one: "{{count}} les",
    lessonCount_other: "{{count}} lessen",
    backToCourse: "Terug naar cursus",
    quickCheck: {
      title: "Korte toets",
      scoreLine: "{{score}}/{{total}} goed",
      signInPrompt: "Log in om je antwoorden onderweg te controleren.",
      sessionExpired: "Je sessie is verlopen, log opnieuw in.",
      checkFailed: "Kon dat antwoord niet controleren, probeer het opnieuw.",
      hintButton: "Hint",
      showAnswerButton: "Antwoord tonen",
    },
    exam: {
      unitExamTitle: "Unittoets",
      finalExamTitle: "Eindexamen",
      takeUnitExam: "Doe de unittoets",
      takeFinalExam: "Doe het eindexamen",
      finalExamHint: "Behandelt de hele cursus",
      signInPrompt: "Log in om deze toets te maken.",
      noQuestions: "Deze toets is nog niet beschikbaar.",
      submitFailed: "Kon je toets niet versturen, probeer het opnieuw.",
      scoreLine: "{{score}}/{{total}} goed",
      passed: "Je bent geslaagd!",
      notPassed: "Nog niet - bekijk de stof nog eens en probeer opnieuw.",
      retry: "Opnieuw proberen",
      previous: "Vorige",
      reviewHeading: "Vraagoverzicht",
    },
  },
  aiChat: {
    openLabel: "AI-assistent openen",
    sendLabel: "Verstuur",
    inputPlaceholder: "Stel een vraag…",
    askAnything: "Vraag me wat je wilt",
    topicLabel: "Traject: {{topic}}",
    welcomeMessage: "Hoi! Ik ben je leermentor.",
    askAboutTopic: "Vraag me wat je wilt over {{topic}}.",
    pickTopicPrompt: "Kies een traject en vraag me wat je wilt.",
    thinking: "denkt na…",
    signInToast: "Log in om met de AI-tutor te chatten.",
    limitReachedToast:
      "Je hebt je berichtenlimiet voor vandaag bereikt, probeer het morgen opnieuw.",
    unavailableToast: "De AI-tutor is nu niet beschikbaar.",
  },
  tts: {
    listenLabel: "Luister",
    stopLabel: "Stop",
    signInToast: "Log in om tekst-naar-spraak te gebruiken.",
    limitReachedToast:
      "Je hebt je spraaklimiet voor vandaag bereikt, probeer het morgen opnieuw.",
    unavailableToast: "Tekst-naar-spraak is nu niet beschikbaar.",
  },
  notFound: {
    title: "Pagina niet gevonden",
    subtitle: "De pagina die je zoekt bestaat niet meer of is verplaatst.",
    goHome: "Naar de startpagina",
  },
  errorPage: {
    title: "Deze pagina kon niet laden",
    subtitle:
      "Er ging iets mis aan onze kant. Probeer het opnieuw of ga terug naar de startpagina.",
    tryAgain: "Probeer opnieuw",
    goHome: "Naar de startpagina",
  },
  partnerships: {
    kicker: "Samenwerking",
    sectionTitle: "Onze Partners",
    sectionSubtitle:
      "We werken samen met organisaties die onze missie delen om leren toegankelijk te maken.",
    placeholderLabel: "Partner {{number}}",
  },
};

export default nl;
