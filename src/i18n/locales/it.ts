import type { Translations } from "./en";

const it: Translations = {
  nav: {
    brand: "MY IDEA",
    theme: "Cambia tema",
    language: "Lingua",
    home: "Home",
    dashboard: "Dashboard",
    tools: "Strumenti",
    account: "Account",
  },
  welcome: {
    kicker: "Piattaforma di apprendimento interattiva",
    title: "Benvenuto",
    subtitle: "Scegli un percorso e inizia a imparare.",
    cta: "Inizia",
    scroll: "Scorri per esplorare",
  },
  topics: {
    prevLabel: "Precedente",
    nextLabel: "Successivo",
    goToLabel: "Vai a {{topic}}",
    sectionTitle: "Scegli il tuo percorso",
    sectionSubtitle: "Scorri tra le discipline — presto ne arriveranno altre.",
    swipeHint: "Scorri per esplorare",
    startLearning: "Inizia a imparare",
    cybersecurity: {
      title: "Cybersecurity",
      description: "Difendi sistemi, reti e dati dalle minacce moderne.",
    },
    ai: {
      title: "Intelligenza Artificiale",
      description: "Costruisci modelli che imparano, ragionano e creano.",
    },
    software: {
      title: "Ingegneria del Software",
      description: "Progetta, costruisci e rilascia software affidabile.",
    },
    networking: {
      title: "Reti",
      description: "Padroneggia i protocolli che connettono il mondo.",
    },
    hacking: {
      title: "Hacking Etico",
      description: "Pensa come un attaccante per proteggere ciò che conta.",
    },
    data: {
      title: "Scienza dei Dati",
      description: "Trasforma i dati grezzi in decisioni e scoperte.",
    },
    cloud: {
      title: "Cloud Computing",
      description: "Progetta sistemi scalabili su piattaforme cloud moderne.",
    },
    os: {
      title: "Sistemi Operativi",
      description:
        "Scopri come i computer gestiscono memoria, processi e file.",
    },
    skills: {
      title: "Competenze Professionali",
      description:
        "Comunicazione, lavoro di squadra e altre competenze essenziali.",
    },
  },
  tools: {
    notFound: "Strumento non trovato.",
    loadError: "Impossibile caricare questo strumento.",
    pageTitle: "Strumenti",
    pageSubtitle:
      "Strumenti pratici e interattivi per mettere alla prova ciò che impari.",
    backToTools: "Tutti gli Strumenti",
    backHomeButton: "Home",
    openTool: "Apri strumento",
    groups: {
      cyber: "Strumenti Cyber",
      networking: "Strumenti di Rete",
      topics: "Altri Argomenti",
    },
    list: {
      passwordStrength: {
        title: "Verifica Robustezza Password",
        description:
          "Verifica quanto è robusta una password e con quale rapidità potrebbe essere violata.",
      },
      phishingTrainer: {
        title: "Simulatore di Consapevolezza Phishing",
        description:
          "Individua i segnali d'allarme in email e SMS realistici, poi scopri cosa li ha traditi.",
      },
      emailChecker: {
        title: "Verificatore di email",
        description:
          "Incolla un'email grezza e ottieni un'analisi completa del phishing: intestazioni, link, allegati e altro.",
      },
      hashTool: {
        title: "Kit di strumenti hash",
        description:
          "Genera, identifica e confronta hash crittografici, tutto dentro il tuo browser.",
      },
      encryptionTool: {
        title: "Kit di cifratura",
        description:
          "Cifra e decifra testo e file con AES, e prova il cifrario di Cesare classico.",
      },
      linkChecker: {
        title: "Verificatore di link",
        description:
          "Analizza la struttura di un URL alla ricerca di segnali di phishing, poi verifica facoltativamente dove porta davvero.",
      },
      networkDefense: {
        title: "Simulatore di difesa di rete",
        description:
          "Difendi una piccola rete da un attaccante IA che pianifica in anticipo con minimax - scegli una difficoltà e scopri la differenza che fa una ricerca più intelligente.",
      },
      attackPlanner: {
        title: "Pianificatore di difesa IA",
        description:
          "Scegli uno scenario di attacco reale e ottieni un piano di difesa generato dall'IA: prevenzione, rilevamento, risposta e ripristino.",
      },
      appPermissions: {
        title: "Controllo permessi delle app",
        description:
          "Guarda cosa chiedono alcune app di uso comune e decidi quali permessi hanno davvero senso.",
      },
      bitAscii: {
        title: "Convertitore Bit in ASCII",
        description:
          "Converti il testo in binario e viceversa - guarda esattamente come i caratteri diventano byte.",
      },
    },
    passwordStrength: {
      label: "Inserisci una password",
      placeholder: "Digita una password da verificare...",
      show: "Mostra password",
      hide: "Nascondi password",
      strengthLabel: "Robustezza",
      strength: {
        empty: "Inizia a digitare per vedere il risultato",
        veryWeak: "Molto debole",
        weak: "Debole",
        fair: "Discreta",
        strong: "Forte",
        veryStrong: "Molto forte",
      },
      criteria: {
        length: "Almeno 8 caratteri",
        lower: "Lettera minuscola",
        upper: "Lettera maiuscola",
        number: "Numero",
        symbol: "Simbolo",
        noPattern: "Nessuno schema prevedibile",
        name: "Nessun nome personale",
      },
      namesWarning:
        "I nomi non dovrebbero essere usati come password. Il tuo, quello di un familiare o di un animale domestico sono tutti facili da indovinare.",
      vaultUnlocked: "Cassaforte sbloccata, questa password è molto forte.",
      compareShow: "+ Confronta con una password precedente",
      compareHide: "\u2212 Nascondi confronto",
      comparePreviousLabel: "Password precedente",
      comparePreviousPlaceholder: "Digita la tua vecchia password...",
      compareTooSimilar:
        "Troppo simile alla tua password precedente. Gli attaccanti provano prima piccole variazioni, come una cifra o un anno cambiato.",
      compareDifferent:
        "Bene, è significativamente diversa dalla tua password precedente.",
      entropyLabel: "Entropia",
      crackByAttackTypeLabel: "Tempo per violarla, per tipo di attacco",
      crackScenario: {
        online: "Online (tentativi limitati)",
        offlineFast: "Offline, hash veloce",
        offlineSlow: "Offline, hash lento (bcrypt)",
      },
      crackTime: {
        instant: "Istantaneamente",
        seconds: "Secondi",
        minutes: "Minuti",
        hours: "Ore",
        days: "Giorni",
        months: "Mesi",
        years: "Anni",
        centuries: "Secoli",
      },
      breach: {
        title: "Verifica violazioni (Have I Been Pwned)",
        checking: "Verifica in corso...",
        foundResult:
          "Trovata in violazioni di dati {{times}} volte. Cambiala subito se la usi davvero.",
        notFoundResult: "Non trovata in violazioni di dati conosciute.",
        errorResult:
          "Impossibile raggiungere Have I Been Pwned al momento. Riprova tra poco.",
        note: "Invia solo i primi 5 caratteri di un hash SHA-1 (k-anonymity). La password completa non lascia mai il browser.",
      },
      tipsTitle: "Come potrebbe essere violata",
      tips: {
        commonBreach:
          "Questa password esatta è in liste di violazioni reali. Gli attaccanti la provano su migliaia di account insieme invece di indovinare a caso, non usarla mai.",
        leetCommonBreach:
          "Sostituire lettere con simboli (come @ per a, 0 per o) la riporta a una delle password più comuni trapelate. Gli strumenti di cracking provano già queste sostituzioni.",
        fullName:
          "Sembra un nome completo. Le combinazioni di nome completo sono estremamente prevedibili, evita di concatenare nome, nome del padre o cognome.",
        singleName:
          "I nomi sono facili da indovinare o cercare. Evita di usare il tuo, quello di un familiare o di un animale domestico.",
        maskPattern:
          'Una parola seguita da alcune cifre (come "Estate2024") è una forma ben nota. Gli strumenti di cracking la testano prima di quasi tutto il resto.',
        latinKeyboardPattern:
          'Le sequenze da tastiera e i caratteri ripetuti (come "qwerty" o "aaa") sono coperti dalle regole predefinite della maggior parte degli strumenti di cracking.',
        arabicKeyboardPattern:
          'Le sequenze da tastiera araba (come "ضصث") sono prevedibili quanto "qwerty", gli strumenti di cracking coprono anche i layout regionali.',
        turkishKeyboardPattern:
          'Gli schemi da tastiera turca (come "şi" o "ğü") sono prevedibili quanto il QWERTY standard per gli strumenti di cracking.',
        germanKeyboardPattern:
          'Gli schemi QWERTZ tedeschi (come "qwertz" o "yxcvb") sono prevedibili quanto il QWERTY standard per gli strumenti di cracking.',
        leetSubstitution:
          "Le semplici sostituzioni lettera-simbolo non aggiungono tanta protezione quanto sembra, gli strumenti di cracking testano automaticamente le sostituzioni comuni.",
        dictionaryWord:
          "Una singola parola comune del dizionario è una delle prime voci in ogni lista di parole usata dagli attaccanti.",
        shortLength:
          "Le password brevi sono alla portata degli strumenti di forza bruta. Punta ad almeno 12\u201316 caratteri.",
        noWeakness:
          "Nessuna debolezza evidente rilevata qui, violarla richiederebbe comunque uno sforzo di forza bruta su larga scala.",
        credentialStuffing:
          "Riutilizzare questa password altrove la rende vulnerabile al credential stuffing se un altro sito subisce una violazione.",
        phishing:
          'Nessuna robustezza della password protegge dal phishing. Fai attenzione a link o messaggi che chiedono di "verificare" il tuo account.',
        socialMining:
          "Gli attaccanti spesso raccolgono dati dai social media su animali domestici, compleanni e hobby prima ancora di iniziare a indovinare.",
      },
      privacyNote:
        "Tutto il resto funziona interamente nel tuo browser. Niente viene mai inviato, salvato o registrato da nessuna parte.",
      generator: {
        title: "Genera una password sicura",
        modeChars: "Caratteri casuali",
        modePassphrase: "Passphrase",
        placeholder: "Clicca Genera per crearne una...",
        copy: "Copia password",
        copied: "Copiata negli appunti",
        copyFailed:
          "Impossibile copiare, prova a selezionare e copiare manualmente",
        lengthLabel: "Lunghezza",
        uppercase: "Maiuscole (A-Z)",
        lowercase: "Minuscole (a-z)",
        numbers: "Numeri (0-9)",
        symbols: "Simboli (!@#$)",
        avoidAmbiguous: "Evita caratteri ambigui (l, 1, I, O, 0)",
        wordCountLabel: "Numero di parole",
        separatorLabel: "Separatore (scegline uno o più)",
        separatorDash: "Trattino ( - )",
        separatorUnderscore: "Underscore ( _ )",
        separatorDot: "Punto ( . )",
        separatorSpace: "Spazio",
        capitalizeWords: "Metti in maiuscolo ogni parola",
        addNumber: "Aggiungi un numero casuale",
        generate: "Genera password",
        selectAtLeastOneChar: "Seleziona almeno un tipo di carattere.",
        selectAtLeastOneSeparator: "Seleziona almeno un separatore.",
      },
    },
    phishingTrainer: {
      instructionLabel:
        "Tocca qualsiasi frase, dettaglio del mittente o link che sembri sospetto",
      progressLabel: "Messaggio {{current}} di {{total}}",
      scoreLabel: "Risolti: {{score}}/{{total}}",
      emailChannel: "Email",
      smsChannel: "Messaggio di testo",
      checkButton: "Controlla le risposte",
      showAllButton: "Mostra tutto",
      whatGaveItAway: "Cosa lo ha tradito",
      attackTypeLabel: "Tipo di attacco",
      techniqueLabel: "Tecnica",
      whatWouldYouDo: "Cosa faresti adesso?",
      actionOptions: {
        investigate: "Clicca sul link o rispondi per vedere cosa succede",
        ignore: "Cancellalo senza dire nulla",
        report: "Segnalalo all'IT o alla sicurezza, poi cancellalo",
        normal: "Trattalo come normale e continua",
      },
      actionFeedbackPhishing:
        "Segnalare i messaggi sospetti aiuta il team di sicurezza a bloccare il mittente e avvisare chi potrebbe ricevere lo stesso messaggio.",
      actionFeedbackLegit:
        "Nessun segnale d'allarme qui, puoi tranquillamente interagire con questo messaggio come al solito.",
      nextButton: "Messaggio successivo",
      finishButton: "Vedi i miei risultati",
      finalScoreCaption: "messaggi risolti correttamente",
      redFlagsRecapTitle: "Segnali d'allarme da ricordare",
      tryAgainButton: "Riprova",
      difficulty: {
        easy: "Facile",
        medium: "Medio",
        hard: "Difficile",
      },
    },
    emailChecker: {
      inputLabel: "Codice sorgente dell'email",
      pasteButton: "Incolla",
      clearButton: "Cancella",
      exampleButton: "Carica esempio",
      inputPlaceholder:
        "Incolla qui il codice sorgente completo dell'email, incluse le intestazioni (From, Received, ecc.)...",
      pasteHint:
        "Impossibile leggere gli appunti — incolla manualmente con Ctrl/Cmd+V.",
      analyzeButton: "Analizza email",
      riskBand: {
        low: "Rischio basso",
        medium: "Alcuni segnali d'allarme",
        high: "Rischio alto",
      },
      headerSummaryTitle: "Riepilogo intestazioni",
      fromLabel: "Da",
      replyToLabel: "Rispondi a",
      authLabel: "Autenticazione",
      trustButton: "Controlla l'età del dominio del mittente",
      trustChecking: "Controllo in corso...",
      trustSignInPrompt:
        "Accedi per controllare l'età del dominio del mittente.",
      trustLimitReached:
        "Hai raggiunto il limite di controlli di oggi, riprova domani.",
      trustCheckFailed: "Impossibile controllare il dominio in questo momento.",
      trustResultWithAge: "{{domain}} è stato registrato {{days}} giorni fa.",
      trustResultUnknown:
        "Impossibile determinare quando è stato registrato {{domain}}.",
      findingsTitle: "Risultati",
      noFindings: "Nessun segnale d'allarme trovato in questa email.",
      findings: {
        authFail: {
          label: "Autenticazione fallita",
          text: "SPF, DKIM o DMARC non sono riusciti, un forte indizio che il dominio del mittente è falsificato.",
        },
        replyToMismatch: {
          label: "Rispondi-a non corrisponde al mittente",
          text: "Le risposte andrebbero a un dominio diverso ({{replyToDomain}}) rispetto al mittente ({{fromDomain}}).",
        },
        linkTextMismatch: {
          label: "Il testo del link non corrisponde alla destinazione",
          text: 'Mostra "{{displayText}}" ma in realtà porta a {{hrefDomain}}.',
        },
        credentialRequest: {
          label: "Richiede credenziali",
          text: 'Contiene frasi come "{{phrase}}", i servizi legittimi raramente lo chiedono via email.',
        },
        riskyAttachment: {
          label: "Allegato rischioso menzionato",
          text: "{{filename}} ha un tipo di file comunemente usato per diffondere malware.",
        },
        unearnedReward: {
          label: "Premio non guadagnato",
          text: 'Contiene frasi come "{{phrase}}", uno schema classico di truffa a pagamento anticipato.',
        },
        urgencyLanguage: {
          label: "Linguaggio d'urgenza",
          text: 'Contiene frasi come "{{phrase}}", pensate per spingerti ad agire senza riflettere.',
        },
        genericGreeting: {
          label: "Saluto generico",
          text: 'Usa "{{phrase}}" invece di rivolgersi a te per nome.',
        },
        ipBasedLink: {
          label: "Il link punta a un indirizzo IP diretto",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "Link abbreviato",
          text: "{{url}} nasconde la sua vera destinazione.",
        },
        noReceivedHeaders: {
          label: "Nessuna intestazione Received",
          text: "Una email reale passa quasi sempre per almeno un server di posta; l'assenza può indicare un'intestazione creata a mano.",
        },
      },
      routeTitle: "Percorso di consegna",
      linksTitle: "Link",
      linkTagIp: "IP diretto",
      linkTagShortened: "accorciato",
      linkTagStandard: "standard",
      privacyNote:
        "Tutto viene eseguito localmente nel tuo browser tranne il controllo facoltativo dell'età del dominio, che invia solo il nome del dominio, mai l'email stessa.",
    },
    hashTool: {
      tabs: {
        generate: "Genera",
        identify: "Identifica",
        compare: "Confronta",
      },
      generate: {
        label: "Testo da trasformare in hash",
        placeholder: "Scrivi o incolla un testo...",
        empty: "Inizia a scrivere per vedere gli hash",
        copy: "Copia hash",
        copied: "Copiato negli appunti",
        copyFailed:
          "Impossibile copiare, prova a selezionare e copiare manualmente",
      },
      identify: {
        label: "Incolla un hash",
        placeholder: "Incolla un hash per identificarlo...",
        empty: "Incolla un hash sopra per vedere le possibili corrispondenze",
        resultsTitle: "Possibili corrispondenze",
        ambiguousNote:
          "Più di un algoritmo produce esattamente questa lunghezza o questo formato, non è possibile distinguerli solo dalla stringa.",
        noMatch: "Non corrisponde a nessun formato di hash conosciuto.",
      },
      compare: {
        labelA: "Hash A",
        labelB: "Hash B",
        placeholder: "Incolla un hash...",
        match: "Corrispondono",
        noMatch: "Non corrispondono",
        empty: "Incolla entrambi gli hash per confrontarli",
        note: "Il confronto ignora maiuscole/minuscole e spazi extra.",
      },
      privacyNote:
        "Tutto viene eseguito localmente nel tuo browser. Nulla viene mai inviato, salvato o registrato da nessuna parte.",
    },
    encryptionTool: {
      tabs: { modern: "Moderno (AES)", classic: "Cifrario di Cesare" },
      privacyNote:
        "Tutto viene eseguito localmente nel tuo browser. Nulla viene mai inviato, salvato o registrato da nessuna parte.",
      modern: {
        warning:
          "Se dimentichi questa passphrase, non c'è modo di recuperare i tuoi dati.",
        encryptButton: "Cifra",
        decryptButton: "Decifra",
        textTab: "Testo",
        fileTab: "File",
        passphraseLabel: "Passphrase",
        passphrasePlaceholder: "Scrivi una passphrase robusta...",
        crackTimeLabel: "Tempo stimato per indovinarla: {{time}}",
        textPlaceholderEncrypt: "Scrivi il testo che vuoi cifrare...",
        textPlaceholderDecrypt: "Incolla il testo cifrato...",
        encrypting: "Cifratura in corso...",
        decrypting: "Decifratura in corso...",
        errors: {
          needPassphrase: "Inserisci prima una passphrase.",
          needText: "Inserisci anche un testo.",
          needFile: "Scegli prima un file.",
          fileTooLarge:
            "Il file supera i 20 MB — prova con uno più piccolo in questa demo.",
          encryptFailed: "Qualcosa è andato storto durante la cifratura.",
          decryptFailed:
            "Impossibile decifrare — la passphrase è sbagliata, oppure il file/testo non è valido.",
        },
        outputLabel: "Risultato",
        copyButton: "Copia",
        copied: "Copiato negli appunti",
        copyFailed:
          "Impossibile copiare, prova a selezionare e copiare manualmente",
        downloadAgainButton: "Scarica di nuovo",
        breakdownLabel: "Cosa contiene il risultato",
        cipherBytesLabel:
          "{{count}} byte (include un tag di autenticazione di 16 byte)",
      },
      classic: {
        textLabel: "Testo",
        cipherTabs: { caesar: "Cesare", vigenere: "Vigenère" },
        caesar: {
          shiftLabel: "Spostamento",
          outputLabel: "Risultato",
          crackButton: "Prova a decifrarlo (tutti i 26 spostamenti)",
        },
        vigenere: {
          keywordLabel: "Parola chiave",
          keywordPlaceholder: "Scrivi una parola chiave...",
          encryptButton: "Cifra",
          decryptButton: "Decifra",
          outputLabel: "Risultato",
          needKeyword: "Inserisci prima una parola chiave.",
        },
      },
    },
    linkChecker: {
      urlLabel: "URL",
      urlPlaceholder: "Incolla un link da controllare...",
      analyzeButton: "Controlla link",
      invalid: "Non è un URL valido — controlla il formato e riprova.",
      scoreLabel: "sicurezza stimata",
      scoreTone: {
        good: "Piuttosto rassicurante, in base a quanto controllato finora.",
        mixed:
          "Vale ancora la pena verificare di più — esegui i controlli server qui sotto per un quadro più chiaro.",
        bad: "Ci sono segnali di allarme evidenti, fai attenzione prima di cliccare su questo link.",
      },
      breakdownLabel: "Analisi dell'URL",
      protocolLabel: "Protocollo:",
      hostLabel: "Host:",
      pathLabel: "Percorso:",
      checksLabel: "{{count}} controlli segnalati su {{total}}",
      checks: {
        ipHost: {
          label: "Dominio o IP?",
          clean: "Questo usa un normale nome di dominio.",
          flagged:
            "Questo usa un indirizzo IP diretto invece di un nome di dominio — raro nei siti legittimi.",
        },
        userinfo: {
          label: '"@" nell\'URL',
          clean: 'Nessuna "@" nasconde un indirizzo reale dietro.',
          flagged:
            "La parte prima di \"@\" ({{username}}) non è l'indirizzo reale — l'host reale è {{hostname}}.",
        },
        punycode: {
          label: "Codifica Punycode",
          clean: "Nessuna codifica Punycode sospetta.",
          flagged:
            "Questo dominio è codificato in Punycode — potrebbe usare caratteri simili per imitare un sito noto.",
        },
        subdomains: {
          label: "Numero di parti del dominio",
          clean: "Un numero normale di parti nel dominio.",
          flagged:
            "Questo dominio ha {{count}} parti — un numero insolitamente alto, che può servire a nascondere il dominio reale alla fine.",
        },
        shortener: {
          label: "Accorciatore di link",
          clean: "Non è un servizio noto di accorciamento link.",
          flagged:
            "Questo è un dominio noto di accorciamento link — la destinazione reale è nascosta finché non ci clicchi.",
        },
        https: {
          label: "HTTPS?",
          clean: "Usa https.",
          flagged:
            "Questo è http, non https — i dati tra il browser e il sito non sono cifrati.",
        },
        tld: {
          label: "Estensione di dominio (TLD)",
          clean:
            "L'estensione di dominio (.{{tld}}) non è tra quelle comunemente legate ad abusi.",
          flagged:
            ".{{tld}} è un'estensione gratuita o molto economica sfruttata in modo sproporzionato per il phishing — non è una prova da sola.",
        },
        brand: {
          label: "Impersonazione di un marchio noto",
          clean: "Nessun nome di marchio noto incluso in un altro dominio.",
          flagged:
            'Questo URL include il nome "{{brand}}" ma il dominio reale non è {{officialDomain}}.',
        },
      },
      disclaimer:
        "Questo segnala solo pattern strutturali, non è una garanzia di sicurezza al 100% — un link senza segnalazioni sopra può comunque essere pericoloso.",
      server: {
        label: "Controlli server (richiede accesso)",
        button: "Controlla redirect ed età del dominio",
        checking: "Controllo in corso...",
        signInPrompt: "Accedi per eseguire i controlli server.",
        limitReached:
          "Hai raggiunto il limite di controlli di oggi, riprova domani.",
        failed: "Impossibile completare il controllo server in questo momento.",
        redirectLabel: "Catena di redirect",
        domainAgeLabel: "Dominio registrato",
        domainAgeUnknown:
          "Impossibile determinare la data di registrazione di questo dominio.",
        daysOld: "{{count}} giorni fa",
        googleFlagged: "Segnalato come pericoloso da Google Safe Browsing.",
        googleClean: "Nessun problema rilevato da Google Safe Browsing.",
        googleUnavailable: "Verifica di Google Safe Browsing non disponibile.",
      },
    },
    networkDefense: {
      introTitle: "Sei il difensore",
      introBody:
        "Un attaccante IA cercherà di violare la tua rete e raggiungere il database. Correggi i punti deboli e isola le violazioni per fermarlo - ne hai un numero limitato di ciascuna.",
      difficulty: { easy: "Facile", medium: "Medio", hard: "Difficile" },
      difficultyHint: {
        easy: "L'attaccante sceglie le mosse a caso - senza alcuna pianificazione.",
        medium: "L'attaccante pensa alcune mosse in anticipo usando minimax.",
        hard: "L'attaccante cerca più a fondo e più velocemente usando minimax con potatura alpha-beta.",
      },
      startButton: "Inizia a difendere",
      round: "Turno {{round}}/{{max}}",
      patchesLeft: "{{count}} patch rimaste",
      isolatesLeft: "{{count}} isolamenti rimasti",
      nodes: {
        firewall: "Firewall",
        webServer: "Server web",
        mailServer: "Server di posta",
        vpn: "VPN",
        appServer: "Server applicativo",
        fileServer: "File server",
        adminPanel: "Pannello di amministrazione",
        database: "Database",
      },
      defenderWon: "Hai retto la linea",
      defenderWonBody:
        "L'attaccante non ha mai raggiunto il database prima dello scadere del tempo.",
      attackerWon: "Violazione - il database è stato compromesso",
      attackerWonBody:
        "Anche una difesa forte può alla fine cedere - per questo la sicurezza reale si basa su più livelli, non su un muro perfetto.",
      playAgain: "Gioca ancora",
      attackerThinking: "L'attaccante sta scegliendo la prossima mossa...",
      yourTurn: "Tocca a te",
      noDefensesLeft:
        "Hai finito patch e isolamenti - l'attaccante ottiene una mossa gratuita.",
      passButton: "Passa",
      patchAction: "Correggi un nodo",
      noPatchesLeft: "Nessuna patch rimasta.",
      isolateAction: "Isola un nodo compromesso",
      noIsolatesLeft: "Nessun isolamento rimasto, o niente da isolare.",
      nodesExplored:
        "L'attaccante ha considerato {{count}} possibili esiti prima di scegliere questa mossa.",
    },
    attackPlanner: {
      signInTitle: "Accedi per usare il pianificatore di difesa",
      signInSubtitle:
        "Crea un account gratuito o accedi per generare piani di difesa con l'IA e monitorare il tuo utilizzo.",
      scenarioPickerLabel: "Scegli uno scenario di attacco",
      scenarios: {
        phishing: {
          title: "Campagna di phishing",
          description:
            "Email o messaggi ingannevoli pensati per rubare credenziali o installare malware.",
        },
        ransomware: {
          title: "Ransomware",
          description:
            "Malware che cifra i file e chiede un pagamento per ripristinare l'accesso.",
        },
        ddos: {
          title: "Attacco DDoS",
          description:
            "Inondare un sistema di traffico finché non riesce più a servire gli utenti reali.",
        },
        insiderThreat: {
          title: "Minaccia interna",
          description:
            "Danno causato da qualcuno che ha già un accesso legittimo.",
        },
        credentialStuffing: {
          title: "Credential stuffing",
          description:
            "Tentativi di accesso automatizzati con password trapelate da altre violazioni.",
        },
        sqlInjection: {
          title: "Iniezione SQL",
          description:
            "Input malevolo che manipola un database attraverso un'app vulnerabile.",
        },
        supplyChain: {
          title: "Attacco alla catena di fornitura",
          description:
            "Compromettere un fornitore o una dipendenza fidata per raggiungere i suoi utenti.",
        },
        socialEngineering: {
          title: "Ingegneria sociale",
          description:
            "Manipolare le persone, anziché i sistemi, per violare le procedure di sicurezza.",
        },
      },
      contextLabel: "Aggiungi contesto (facoltativo)",
      contextPlaceholder:
        "es. gestisco un piccolo negozio online con 5 dipendenti...",
      contextHint: "{{count}}/{{max}} caratteri",
      generateButton: "Genera piano di difesa",
      generating: "Generazione del piano in corso...",
      changeScenarioButton: "Scegli un altro scenario",
      severityLabel: "Gravità tipica",
      severity: {
        low: "Bassa",
        medium: "Media",
        high: "Alta",
        critical: "Critica",
      },
      sections: {
        prevention: "Prevenzione",
        detection: "Rilevamento",
        response: "Risposta",
        recovery: "Ripristino",
      },
      limitReached: "Limite giornaliero di piani raggiunto, riprova domani.",
      failed: "Impossibile generare un piano ora, riprova.",
      disclaimer:
        "Generato dall'IA a scopo didattico. Verifica le linee guida ufficiali prima di affidarti a questo per un incidente reale.",
    },
    appPermissions: {
      instructionLabel:
        "Tocca Consenti o Nega per ogni permesso richiesto da questa app, in base a quello che dovrebbe fare.",
      progressLabel: "App {{current}} di {{total}}",
      scoreLabel: "{{score}}/{{total}} corrette",
      allowLabel: "Consenti",
      denyLabel: "Nega",
      checkButton: "Controlla le mie risposte",
      nextButton: "App successiva",
      finishButton: "Fine",
      tryAgainButton: "Riprova",
      justifiedNote: "Ha senso per questo tipo di app.",
      whyThisMatters: "Perché è importante",
      finalScoreCaption: "Hai valutato correttamente il {{pct}}% dei permessi.",
      tipsTitle: "Da ricordare",
      permissions: {
        camera: "Fotocamera",
        microphone: "Microfono",
        contacts: "Contatti",
        location: "Posizione",
        sms: "SMS / Messaggi di testo",
        callLog: "Registro chiamate",
        storage: "Foto e archiviazione",
        motionFitness: "Movimento e attività fisica",
      },
      apps: {
        flashlight: {
          name: "Torcia",
          description:
            "Un'app semplice che accende e spegne il flash della fotocamera.",
        },
        qrScanner: {
          name: "Lettore di codici QR",
          description:
            "Scansiona codici QR con la fotocamera e mostra cosa contengono.",
        },
        photoEditor: {
          name: "Editor di foto",
          description:
            "Ritaglia, applica filtri e ritocca foto già presenti sul tuo dispositivo.",
        },
        messaging: {
          name: "Messaggistica",
          description: "Invia testi, foto e messaggi vocali ai tuoi contatti.",
        },
        fitnessTracker: {
          name: "Contapassi",
          description:
            "Conta i tuoi passi e traccia il percorso delle tue corse e camminate.",
        },
        puzzleGame: {
          name: "Puzzle a blocchi",
          description:
            "Un gioco puzzle autonomo e offline, senza funzioni social o online.",
        },
        weather: {
          name: "Meteo",
          description: "Mostra le previsioni per la tua posizione attuale.",
        },
        videoCalling: {
          name: "Videochiamate",
          description:
            "Effettua videochiamate e chiamate vocali alle persone nei tuoi contatti.",
        },
        banking: {
          name: "Banca Mobile",
          description:
            "Controlla i saldi, deposita assegni e paga bollette dal tuo conto bancario.",
        },
        rideHailing: {
          name: "Chiamata Auto",
          description:
            "Prenota un'auto che viene a prenderti e ti porta da qualche parte.",
        },
        sleepTracker: {
          name: "Monitor del Sonno",
          description:
            "Monitora il tuo sonno di notte usando i sensori di movimento del telefono.",
        },
        newsReader: {
          name: "Lettore di Notizie",
          description:
            "Raccoglie titoli e articoli dalle tue fonti preferite in un unico feed.",
        },
      },
      reasons: {
        flashlightContacts:
          "Una torcia deve solo controllare il flash della fotocamera - non ha motivo di leggere la tua rubrica.",
        flashlightLocation:
          "Accendere e spegnere una luce non richiede di sapere dove ti trovi.",
        flashlightSms:
          "Nessuna funzione di una torcia implica la lettura o l'invio di messaggi di testo.",
        flashlightMicrophone:
          "Una semplice torcia non ha alcun uso legittimo per il tuo microfono.",
        qrContacts:
          "Scansionare un codice non richiede l'accesso a chi conosci.",
        qrCallLog:
          "Leggere un codice QR non ha nulla a che fare con la cronologia delle chiamate.",
        qrLocation:
          "L'app può decodificare il contenuto del codice senza sapere dove ti trovi.",
        photoLocation:
          "Modificare foto già presenti sul dispositivo non richiede l'accesso alla posizione in tempo reale.",
        photoContacts: "Nessuna funzione di modifica richiede la tua rubrica.",
        photoMicrophone:
          "Questo è un editor di foto, non uno strumento audio o video - non ha alcun uso legittimo per l'audio.",
        messagingCallLog:
          "Inviare messaggi non richiede di leggere chi hai chiamato e quando.",
        messagingLocation:
          "Condividere la posizione per una conversazione è ragionevole; richiederla costantemente in background no.",
        fitnessContacts:
          "Contare i passi e tracciare le corse non richiede di sapere chi conosci.",
        fitnessCamera:
          "Un contapassi non ha motivo di accedere alla tua fotocamera.",
        fitnessSms:
          "Nessuna funzione di monitoraggio dell'attività fisica coinvolge i tuoi messaggi di testo.",
        gameContacts:
          "Un gioco puzzle autonomo non ha motivo di sapere chi conosci.",
        gameLocation: "Risolvere puzzle non richiede di sapere dove ti trovi.",
        gameMicrophone: "Non c'è nulla in questo gioco che debba ascoltarti.",
        gameCamera:
          "Un gioco puzzle non ha alcun uso legittimo per la tua fotocamera.",
        gameSms:
          "Questo gioco non ha motivo di leggere o inviare messaggi di testo.",
        weatherContacts:
          "Controllare le previsioni non richiede la tua rubrica.",
        weatherCamera:
          "Un'app meteo non ha alcun uso legittimo per la tua fotocamera.",
        weatherMicrophone: "Nessuna funzione di previsione deve ascoltarti.",
        weatherSms:
          "Gli aggiornamenti meteo non richiedono la lettura dei tuoi messaggi di testo.",
        videoSms:
          "Questa è quella da tenere d'occhio: fotocamera, microfono, contatti e archiviazione sono tutti ragionevoli per le videochiamate, ma l'accesso agli SMS è un modo classico con cui le app dannose intercettano i codici di accesso monouso inviati al tuo telefono.",
        bankingContacts:
          "Controllare il saldo o depositare un assegno non richiede la tua rubrica, a meno che tu non usi una funzione specifica di pagamento tra persone.",
        bankingMicrophone:
          "Nessuna funzione bancaria essenziale deve ascoltarti.",
        bankingCallLog:
          "Gestire il tuo denaro non richiede di leggere chi hai chiamato e quando.",
        rideHailingMicrophone:
          "Prenotare e seguire una corsa non richiede l'accesso al tuo microfono.",
        rideHailingCamera:
          "Nessuna funzione essenziale di prenotazione corse ha bisogno della tua fotocamera.",
        rideHailingSms:
          "Questa app non ha motivo di leggere o inviare messaggi di testo per prenotare una corsa.",
        sleepContacts:
          "Monitorare il tuo sonno non richiede di sapere chi conosci.",
        sleepCamera:
          "Un monitor del sonno attivo di notte non ha motivo di accedere alla tua fotocamera.",
        sleepSms:
          "Nessuna funzione di monitoraggio del sonno coinvolge i tuoi messaggi di testo.",
        sleepCallLog:
          "Monitorare come dormi non richiede la cronologia delle chiamate.",
        newsLocation:
          "Leggere articoli non richiede di sapere esattamente dove ti trovi - al massimo una regione generale per i titoli locali.",
        newsContacts:
          "Non c'è motivo per cui un lettore di notizie abbia bisogno della tua rubrica.",
        newsCamera:
          "Un lettore di notizie non ha alcun uso legittimo per la tua fotocamera.",
        newsMicrophone: "Nessuna funzione di lettura deve ascoltarti.",
        newsSms:
          "Questa app non ha motivo di leggere o inviare messaggi di testo.",
      },
      tips: {
        doesItMakeSense:
          "Prima di concedere un permesso, chiediti: ha davvero senso per quello che fa l'app?",
        utilityApps:
          "Le utility semplici - torce, lettori QR, calcolatrici - quasi mai hanno bisogno dei tuoi contatti, degli SMS o della posizione precisa.",
        smsRisk:
          "L'accesso agli SMS è particolarmente rischioso: può permettere a un'app di leggere codici di accesso monouso destinati solo a te.",
        changeAnytime:
          "Puoi rivedere e modificare i permessi delle app in qualsiasi momento dalle impostazioni del telefono, non solo all'installazione.",
        whenInDoubt:
          "Nel dubbio, nega il permesso - se una funzione ne ha davvero bisogno, l'app lo richiederà di nuovo spiegandone il motivo.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "Testo → Binario",
        binaryToText: "Binario → Testo",
      },
      textLabel: "Testo",
      textPlaceholder: "Scrivi qualcosa...",
      binaryOutputLabel: "Binario",
      binaryEmptyState: "Il risultato binario apparirà qui.",
      binaryLabel: "Binario",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "Testo",
      textEmptyState: "Il testo decodificato apparirà qui.",
      byteCount: "{{count}} byte",
      copy: "Copia",
      copied: "Copiato negli appunti",
      copyFailed: "Impossibile copiare negli appunti",
      errors: {
        invalidChars:
          "Il binario deve contenere solo 0 e 1 (gli spazi tra i byte non sono un problema).",
        notMultipleOfEight:
          "Ogni byte richiede esattamente 8 bit - il totale non è un multiplo di 8.",
        invalidUtf8: "Questi byte non formano un testo UTF-8 valido.",
      },
    },
  },
  auth: {
    toastAccountCreated: "Account creato! Benvenuto su My Idea Academy.",
    toastWelcomeBack: "Bentornato!",
    toastGenericError: "Qualcosa è andato storto, riprova.",
    toastGoogleFailed: "Impossibile accedere con Google, riprova.",
    signInTitle: "Bentornato",
    signUpTitle: "Crea il tuo account",
    signInSubtitle:
      "Accedi per tenere traccia dei tuoi progressi e certificati.",
    signUpSubtitle:
      "Registrati per salvare i tuoi progressi e ottenere certificati.",
    continueWithGoogle: "Continua con Google",
    orDivider: "oppure",
    namePlaceholder: "Il tuo nome",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    signInButton: "Accedi",
    signUpButton: "Crea account",
    newHere: "Sei nuovo qui?",
    alreadyHaveAccount: "Hai già un account?",
    createAccountLink: "Crea un account",
    signInLink: "Accedi",
  },
  verify: {
    notFound: "Non abbiamo trovato nessun certificato con questo ID.",
    backHome: "Torna alla home",
    verifiedTitle: "Certificato verificato",
    verifiedSubtitle:
      "Questo certificato è stato effettivamente rilasciato da My Idea Academy.",
    recipientLabel: "Destinatario",
    topicLabel: "Percorso",
    scoreLabel: "Punteggio",
    issuedLabel: "Rilasciato il",
  },
  certificate: {
    title: "Certificato di Completamento",
    presentedTo: "Viene orgogliosamente conferito a",
    completingCourse: "per aver completato con successo il corso",
    scoreLine: "Punteggio finale: {{score}}%",
    role: "Direttore dell'azienda",
    issueDateLabel: "Data di emissione",
    closeLabel: "Chiudi",
    certIdLabel: "ID certificato:",
    downloadButton: "Scarica il PDF",
    pending: "in attesa",
  },
  dashboard: {
    signInTitle: "Accedi per vedere la tua dashboard",
    signInSubtitle:
      "Segui i tuoi progressi, certificati e attività di apprendimento.",
    signIn: "Accedi",
    welcomeBack: "Bentornato, {{name}}",
    subtitle: "Ecco da dove avevi lasciato.",
    continueLearningHeading: "Continua a imparare",
    noInProgressCourses:
      "Non hai ancora iniziato nessun corso. Scegline uno per cominciare.",
    continueFrom: "Continua da: {{lesson}}",
    continueButton: "Continua",
    lessonProgress: "{{completed}}/{{total}} lezioni",
    progressHeading: "I tuoi progressi",
    statusPassed: "Superato",
    statusInProgress: "In corso",
    statusNotStarted: "Non iniziato",
    certificatesHeading: "Certificati",
    noCertificates:
      "Non hai ancora ottenuto nessun certificato. Supera un quiz per sbloccarne uno.",
    timeOnPlatform: "Tempo trascorso su questa piattaforma",
    hourShort: "h",
    minuteShort: "min",
    lessThanAMinute: "Meno di un minuto",
    breakReminderLabel: "Promemoria per riposare gli occhi",
    breakReminderDescription:
      "Un avviso discreto ogni 20 minuti per distogliere lo sguardo e riposare gli occhi. Disattivato di default.",
    breakReminderToast:
      "È ora di una piccola pausa - riposa gli occhi, svuota la mente e ricomincia.",
  },
  account: {
    profileHeading: "Account",
    signedInAs: "Accesso effettuato come {{email}}",
    signOut: "Esci",
    signedIn: "Accesso effettuato",
    signInPrompt: "Accedi per gestire il tuo account",
    signIn: "Accedi",
    settingsHeading: "Impostazioni account",
    displayNameLabel: "Nome visualizzato",
    displayNamePlaceholder: "Il tuo nome",
    saveNameButton: "Salva nome",
    nameUpdated: "Il tuo nome è stato aggiornato.",
    nameUpdateFailed: "Impossibile aggiornare il nome, riprova.",
    passwordHeading: "Password",
    newPasswordLabel: "Nuova password",
    confirmPasswordLabel: "Conferma la nuova password",
    changePasswordButton: "Cambia password",
    passwordTooShort: "La password deve avere almeno 8 caratteri.",
    passwordMismatch: "Le password non coincidono.",
    passwordUpdated: "La tua password è stata cambiata.",
    passwordUpdateFailed: "Impossibile cambiare la password, riprova.",
    emailHeading: "Indirizzo email",
    newEmailLabel: "Nuova email",
    changeEmailButton: "Aggiorna email",
    emailConfirmSent:
      "Controlla la tua nuova email per confermare la modifica.",
    emailUpdateFailed: "Impossibile aggiornare l'email, riprova.",
    oauthManagedNote:
      "Hai effettuato l'accesso con Google - la tua password e email sono gestite dal tuo account Google.",
    dangerZoneHeading: "Zona pericolosa",
    deleteAccountHeading: "Elimina account",
    deleteAccountBody:
      "Elimina definitivamente il tuo profilo, i progressi nei quiz e i certificati. I certificati ottenuti smetteranno di essere verificabili una volta eliminati. Questa azione non può essere annullata.",
    deleteAccountButton: "Elimina account",
    deleteConfirmTitle: "Sei assolutamente sicuro?",
    deleteConfirmBody:
      "Questo eliminerà definitivamente il tuo account e tutti i dati associati - non sarà possibile recuperarli in seguito.",
    deleteConfirmLabel: "Scrivi {{email}} per confermare",
    cancelButton: "Annulla",
    deleteAccountFailed: "Impossibile eliminare il tuo account ora, riprova.",
    supportHeading: "Supporto",
    faqHeading: "Domande frequenti",
    faqQ1: "My Idea Academy è gratuito?",
    faqA1:
      "Sì. Tutte le lezioni, i quiz, gli strumenti e i certificati sono gratuiti.",
    faqQ2: "Come funzionano i certificati?",
    faqA2:
      "Supera il quiz di un percorso per ottenere un certificato. Chiunque può verificarlo tramite il suo link univoco.",
    faqQ3: "Posso rifare un quiz?",
    faqA3: "Sì, tutte le volte che vuoi - conta il tuo risultato migliore.",
    contactHeading: "Hai ancora bisogno di aiuto?",
    contactBody: "Scrivici e ti risponderemo.",
    crisisNote:
      "Se stai attraversando una crisi di salute mentale, contatta una linea di ascolto locale - findahelpline.com può aiutarti a trovarne una subito.",
  },
  a11y: {
    textSize: "Dimensione del testo",
    visionReading: "Vista e lettura",
    highContrast: "Contrasto elevato",
    dyslexiaFont: "Font per la dislessia",
    underlineLinks: "Sottolinea i link",
    motorMotion: "Motricità e movimento",
    largerTargets: "Pulsanti e link più grandi",
    reduceMotion: "Riduci le animazioni",
    keyboardNav: "Navigazione da tastiera",
    screenReading: "Lettura ad alta voce",
    stopReading: "Ferma la lettura",
    readAloud: "Leggi la pagina ad alta voce",
    optionsLabel: "Opzioni di accessibilità",
    skipToContent: "Vai al contenuto principale",
  },
  quiz: {
    loading: "Caricamento…",
    loadingQuiz: "Caricamento del quiz…",
    noQuizAvailable: "Nessun quiz ancora disponibile per questo percorso.",
    signInTitle: "Accedi per fare questo quiz",
    signInSubtitle:
      "Crea un account gratuito o accedi per rispondere alle domande, monitorare il tuo punteggio e ottenere un certificato.",
    backToLessons: "Torna alle lezioni",
    sessionExpired: "La tua sessione è scaduta, accedi di nuovo.",
    answerCheckFailed: "Impossibile verificare quella risposta, riprova.",
    signInToSave:
      "Accedi per salvare il tuo punteggio e ottenere un certificato.",
    saveFailed: "Impossibile salvare il tuo tentativo",
    congratulations: "Congratulazioni!",
    almostThere: "Ci sei quasi",
    scoreLine: "Hai ottenuto {{score}}/{{total}} ({{percentage}}%)",
    savingAttempt: "Salvataggio del tuo tentativo…",
    viewCertificate: "Vedi certificato",
    tryAgain: "Riprova",
    signInToClaim: "Accedi per richiedere il tuo certificato",
    questionCounter: "Domanda {{current}} / {{total}}",
    scoreCounter: "Punteggio: {{score}}",
    explanationLabel: "Spiegazione:",
    finish: "Termina",
    next: "Avanti",
  },
  courses: {
    pageTitle: "Corsi",
    pageSubtitle:
      "Corsi strutturati con unità, lezioni, verifiche rapide ed esami.",
    noneAvailable: "Nessun corso disponibile per ora — torna presto.",
    startCourse: "Inizia il corso",
    allCourses: "Tutti i corsi",
    unitCount_one: "{{count}} unità",
    unitCount_other: "{{count}} unità",
    lessonCount_one: "{{count}} lezione",
    lessonCount_other: "{{count}} lezioni",
    backToCourse: "Torna al corso",
    quickCheck: {
      title: "Verifica rapida",
      scoreLine: "{{score}}/{{total}} corrette",
      signInPrompt:
        "Accedi per verificare le tue risposte man mano che procedi.",
      sessionExpired: "La sessione è scaduta, accedi di nuovo.",
      checkFailed: "Impossibile verificare questa risposta, riprova.",
      hintButton: "Suggerimento",
      showAnswerButton: "Mostra risposta",
    },
    exam: {
      unitExamTitle: "Verifica dell'unità",
      finalExamTitle: "Esame finale",
      takeUnitExam: "Fai la verifica dell'unità",
      takeFinalExam: "Fai l'esame finale",
      finalExamHint: "Copre l'intero corso",
      signInPrompt: "Accedi per sostenere questo esame.",
      noQuestions: "Questo esame non è ancora disponibile.",
      submitFailed: "Impossibile inviare il tuo esame, riprova.",
      scoreLine: "{{score}}/{{total}} corrette",
      passed: "Hai superato l'esame!",
      notPassed: "Non ancora - ripassa il materiale e riprova.",
      retry: "Riprova",
      previous: "Precedente",
      reviewHeading: "Revisione delle domande",
    },
  },
  aiChat: {
    openLabel: "Apri l'assistente IA",
    sendLabel: "Invia",
    inputPlaceholder: "Fai una domanda…",
    askAnything: "Chiedimi qualsiasi cosa",
    topicLabel: "Percorso: {{topic}}",
    welcomeMessage: "Ciao! Sono il tuo mentore di apprendimento.",
    askAboutTopic: "Chiedimi qualsiasi cosa su {{topic}}.",
    pickTopicPrompt: "Scegli un percorso e chiedimi qualsiasi cosa.",
    thinking: "sto pensando…",
    signInToast: "Accedi per chattare con il tutor IA.",
    limitReachedToast:
      "Hai raggiunto il limite di messaggi di oggi, riprova domani.",
    unavailableToast: "Il tutor IA non è disponibile in questo momento.",
  },
  tts: {
    listenLabel: "Ascolta",
    stopLabel: "Ferma",
    signInToast: "Accedi per usare la sintesi vocale.",
    limitReachedToast:
      "Hai raggiunto il limite vocale di oggi, riprova domani.",
    unavailableToast: "La sintesi vocale non è disponibile in questo momento.",
  },
  notFound: {
    title: "Pagina non trovata",
    subtitle: "La pagina che cerchi non esiste o è stata spostata.",
    goHome: "Torna alla home",
  },
  errorPage: {
    title: "Questa pagina non si è caricata",
    subtitle:
      "Qualcosa è andato storto da parte nostra. Puoi riprovare o tornare alla home.",
    tryAgain: "Riprova",
    goHome: "Torna alla home",
  },
  partnerships: {
    kicker: "Collaborazione",
    sectionTitle: "I Nostri Partner",
    sectionSubtitle:
      "Lavoriamo con organizzazioni che condividono la nostra missione di rendere l'apprendimento accessibile.",
    placeholderLabel: "Partner {{number}}",
  },
};

export default it;
