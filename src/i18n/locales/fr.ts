import type { Translations } from "./en";

const fr: Translations = {
  nav: {
    brand: "MY IDEA",
    theme: "Changer de thème",
    language: "Langue",
    home: "Accueil",
    dashboard: "Tableau de bord",
    tools: "Outils",
    account: "Compte",
  },
  welcome: {
    kicker: "Plateforme d'apprentissage interactive",
    title: "Bienvenue",
    subtitle: "Choisis un parcours et commence à apprendre.",
    cta: "Commencer",
    scroll: "Fais défiler pour explorer",
  },
  topics: {
    prevLabel: "Précédent",
    nextLabel: "Suivant",
    goToLabel: "Aller à {{topic}}",
    sectionTitle: "Choisis ton parcours",
    sectionSubtitle:
      "Fais défiler les disciplines — d'autres arrivent bientôt.",
    swipeHint: "Fais défiler pour explorer",
    startLearning: "Commencer à apprendre",
    cybersecurity: {
      title: "Cybersécurité",
      description: "Protège systèmes, réseaux et données des menaces modernes.",
    },
    ai: {
      title: "Intelligence Artificielle",
      description:
        "Construis des modèles qui apprennent, raisonnent et créent.",
    },
    software: {
      title: "Génie Logiciel",
      description: "Conçois, construis et déploie des logiciels fiables.",
    },
    networking: {
      title: "Réseaux",
      description: "Maîtrise les protocoles qui connectent le monde.",
    },
    hacking: {
      title: "Hacking Éthique",
      description: "Pense comme un attaquant pour protéger l'essentiel.",
    },
    data: {
      title: "Science des Données",
      description: "Transforme les données brutes en décisions et découvertes.",
    },
    cloud: {
      title: "Cloud Computing",
      description:
        "Conçois des systèmes évolutifs sur des plateformes modernes.",
    },
    os: {
      title: "Systèmes d'Exploitation",
      description:
        "Maîtrise comment les ordinateurs gèrent mémoire, processus et fichiers.",
    },
    skills: {
      title: "Compétences Professionnelles",
      description:
        "Communication, travail d'équipe et autres compétences essentielles.",
    },
  },
  tools: {
    notFound: "Outil introuvable.",
    loadError: "Impossible de charger cet outil.",
    pageTitle: "Outils",
    pageSubtitle:
      "Des outils pratiques et interactifs pour mettre en pratique ce que tu apprends.",
    backToTools: "Tous les Outils",
    backHomeButton: "Accueil",
    openTool: "Ouvrir l'outil",
    groups: {
      cyber: "Outils Cyber",
      networking: "Outils Réseau",
      topics: "Autres Sujets",
    },
    list: {
      passwordStrength: {
        title: "Vérificateur de Force de Mot de Passe",
        description:
          "Teste la solidité d'un mot de passe et estime la rapidité avec laquelle il pourrait être craqué.",
      },
      phishingTrainer: {
        title: "Entraînement à la Détection du Phishing",
        description:
          "Repère les signaux d'alerte dans des e-mails et messages réalistes, puis découvre ce qui les trahissait.",
      },
      emailChecker: {
        title: "Vérificateur d'e-mail",
        description:
          "Colle un e-mail brut et obtiens une analyse complète de phishing : en-têtes, liens, pièces jointes et plus.",
      },
      hashTool: {
        title: "Boîte à outils de hash",
        description:
          "Génère, identifie et compare des empreintes cryptographiques, le tout dans ton navigateur.",
      },
      encryptionTool: {
        title: "Boîte à outils de chiffrement",
        description:
          "Chiffre et déchiffre du texte et des fichiers avec AES, et essaie le chiffrement de César classique.",
      },
      linkChecker: {
        title: "Vérificateur de liens",
        description:
          "Analyse la structure d'une URL à la recherche de signaux de phishing, puis vérifie éventuellement où elle mène vraiment.",
      },
      networkDefense: {
        title: "Simulateur de défense réseau",
        description:
          "Défendez un petit réseau contre un attaquant IA qui anticipe grâce à minimax - choisissez une difficulté et voyez la différence qu'une recherche plus intelligente fait.",
      },
      attackPlanner: {
        title: "Planificateur de défense IA",
        description:
          "Choisissez un scénario d'attaque réel et obtenez un plan de défense généré par IA : prévention, détection, réponse et récupération.",
      },
      appPermissions: {
        title: "Auditeur de permissions d'applications",
        description:
          "Regardez ce que demandent quelques applications du quotidien et décidez quelles permissions ont vraiment un sens.",
      },
      bitAscii: {
        title: "Convertisseur Bits vers ASCII",
        description:
          "Convertit du texte en binaire et inversement - voyez exactement comment les caractères deviennent des octets.",
      },
    },
    passwordStrength: {
      label: "Saisis un mot de passe",
      placeholder: "Tape un mot de passe à vérifier...",
      show: "Afficher le mot de passe",
      hide: "Masquer le mot de passe",
      strengthLabel: "Robustesse",
      strength: {
        empty: "Commence à taper pour voir le résultat",
        veryWeak: "Très faible",
        weak: "Faible",
        fair: "Moyen",
        strong: "Fort",
        veryStrong: "Très fort",
      },
      criteria: {
        length: "Au moins 8 caractères",
        lower: "Lettre minuscule",
        upper: "Lettre majuscule",
        number: "Chiffre",
        symbol: "Symbole",
        noPattern: "Aucun motif prévisible",
        name: "Aucun nom personnel",
      },
      namesWarning:
        "Les noms ne devraient pas servir de mots de passe. Le tien, celui d'un proche ou celui d'un animal de compagnie sont tous faciles à deviner.",
      vaultUnlocked: "Coffre déverrouillé, ce mot de passe est très fort.",
      compareShow: "+ Comparer avec un ancien mot de passe",
      compareHide: "\u2212 Masquer la comparaison",
      comparePreviousLabel: "Ancien mot de passe",
      comparePreviousPlaceholder: "Tape ton ancien mot de passe...",
      compareTooSimilar:
        "Trop proche de ton ancien mot de passe. Les attaquants essaient d'abord de petites variations, comme un chiffre ou une année modifiée.",
      compareDifferent:
        "Bien, celui-ci est vraiment différent de ton ancien mot de passe.",
      entropyLabel: "Entropie",
      crackByAttackTypeLabel: "Temps pour le craquer, par type d'attaque",
      crackScenario: {
        online: "En ligne (tentatives limitées)",
        offlineFast: "Hors ligne, hachage rapide",
        offlineSlow: "Hors ligne, hachage lent (bcrypt)",
      },
      crackTime: {
        instant: "Instantanément",
        seconds: "Secondes",
        minutes: "Minutes",
        hours: "Heures",
        days: "Jours",
        months: "Mois",
        years: "Années",
        centuries: "Siècles",
      },
      breach: {
        title: "Vérifier les fuites de données (Have I Been Pwned)",
        checking: "Vérification...",
        foundResult:
          "Trouvé dans des fuites de données {{times}} fois. Change ce mot de passe immédiatement si c'est un vrai que tu utilises.",
        notFoundResult: "Non trouvé dans les fuites de données connues.",
        errorResult:
          "Impossible de contacter Have I Been Pwned pour le moment. Réessaie dans un instant.",
        note: "N'envoie que les 5 premiers caractères d'un hachage SHA-1 (k-anonymat). Ton mot de passe complet ne quitte jamais le navigateur.",
      },
      tipsTitle: "Comment il pourrait être craqué",
      tips: {
        commonBreach:
          "Ce mot de passe exact figure dans de vraies fuites de données. Les attaquants l'essaient sur des milliers de comptes à la fois plutôt que de deviner au hasard, ne l'utilise jamais.",
        leetCommonBreach:
          "Remplacer des lettres par des symboles (comme @ pour a, 0 pour o) le ramène directement à l'un des mots de passe divulgués les plus courants. Les outils de craquage testent déjà ces substitutions.",
        fullName:
          "Cela ressemble à un nom complet. Les combinaisons de nom complet sont extrêmement prévisibles, évite d'enchaîner prénom, nom du père ou nom de famille.",
        singleName:
          "Les noms sont faciles à deviner ou à retrouver. Évite d'utiliser le tien, celui d'un proche ou celui d'un animal de compagnie.",
        maskPattern:
          'Un mot suivi de quelques chiffres (comme "Summer2024") est une forme bien connue. Les outils de craquage la testent avant presque tout le reste.',
        latinKeyboardPattern:
          'Les parcours de clavier et les caractères répétés (comme "qwerty" ou "aaa") sont couverts par les règles par défaut de la plupart des outils de craquage.',
        arabicKeyboardPattern:
          'Les parcours du clavier arabe (comme "ضصث") sont tout aussi prévisibles que "qwerty", les outils de craquage couvrent aussi les dispositions régionales.',
        turkishKeyboardPattern:
          'Les motifs du clavier turc (comme "şi" ou "ğü") sont tout aussi prévisibles pour les outils de craquage que le QWERTY standard.',
        germanKeyboardPattern:
          'Les motifs du clavier allemand QWERTZ (comme "qwertz" ou "yxcvb") sont tout aussi prévisibles pour les outils de craquage que le QWERTY standard.',
        leetSubstitution:
          "De simples remplacements lettre-symbole n'apportent pas autant de protection qu'on le pense, les outils de craquage testent ces substitutions courantes automatiquement.",
        dictionaryWord:
          "Un simple mot du dictionnaire est l'une des premières entrées de toutes les listes de mots utilisées par les attaquants.",
        shortLength:
          "Les mots de passe courts sont à la portée des outils de force brute. Vise au moins 12 à 16 caractères.",
        noWeakness:
          "Aucune faiblesse évidente détectée ici, le craquer nécessiterait quand même un effort de force brute à grande échelle.",
        credentialStuffing:
          "Réutiliser ce mot de passe ailleurs le rend vulnérable au credential stuffing si cet autre site subit une fuite.",
        phishing:
          'Aucune robustesse de mot de passe ne protège contre le phishing. Reste prudent avec les liens ou messages demandant de "vérifier" ton compte.',
        socialMining:
          "Les attaquants exploitent souvent les réseaux sociaux à la recherche de noms d'animaux, de dates de naissance et de loisirs avant même de commencer à deviner.",
      },
      privacyNote:
        "Le reste de l'outil fonctionne entièrement dans ton navigateur. Rien n'est jamais envoyé, enregistré ni consigné où que ce soit.",
      generator: {
        title: "Générer un mot de passe robuste",
        modeChars: "Caractères aléatoires",
        modePassphrase: "Phrase de passe",
        placeholder: "Clique sur Générer pour en créer un...",
        copy: "Copier le mot de passe",
        copied: "Copié dans le presse-papiers",
        copyFailed:
          "Impossible de copier, essaie de sélectionner et copier manuellement",
        lengthLabel: "Longueur",
        uppercase: "Majuscules (A-Z)",
        lowercase: "Minuscules (a-z)",
        numbers: "Chiffres (0-9)",
        symbols: "Symboles (!@#$)",
        avoidAmbiguous: "Éviter les caractères ambigus (l, 1, I, O, 0)",
        wordCountLabel: "Nombre de mots",
        separatorLabel: "Séparateur (choisis-en un ou plusieurs)",
        separatorDash: "Tiret ( - )",
        separatorUnderscore: "Tiret bas ( _ )",
        separatorDot: "Point ( . )",
        separatorSpace: "Espace",
        capitalizeWords: "Mettre une majuscule à chaque mot",
        addNumber: "Ajouter un chiffre aléatoire",
        generate: "Générer le mot de passe",
        selectAtLeastOneChar: "Choisis au moins un type de caractère.",
        selectAtLeastOneSeparator: "Choisis au moins un séparateur.",
      },
    },
    phishingTrainer: {
      instructionLabel:
        "Touche toute phrase, détail de l'expéditeur ou lien qui te semble suspect",
      progressLabel: "Message {{current}} sur {{total}}",
      scoreLabel: "Réussis : {{score}}/{{total}}",
      emailChannel: "E-mail",
      smsChannel: "Message texte",
      checkButton: "Vérifier les réponses",
      showAllButton: "Tout révéler",
      whatGaveItAway: "Ce qui l'a trahi",
      attackTypeLabel: "Type d'attaque",
      techniqueLabel: "Technique",
      whatWouldYouDo: "Que ferais-tu ensuite ?",
      actionOptions: {
        investigate:
          "Cliquer sur le lien ou répondre pour voir ce qui se passe",
        ignore: "Le supprimer sans rien dire",
        report:
          "Le signaler à l'informatique ou à la sécurité, puis le supprimer",
        normal: "Le traiter normalement et continuer",
      },
      actionFeedbackPhishing:
        "Signaler les messages suspects aide ton équipe de sécurité à bloquer l'expéditeur et à prévenir d'autres personnes qui pourraient recevoir le même message.",
      actionFeedbackLegit:
        "Aucun signal d'alerte ici, tu peux interagir avec ce message normalement.",
      nextButton: "Message suivant",
      finishButton: "Voir mes résultats",
      finalScoreCaption: "messages résolus correctement",
      redFlagsRecapTitle: "Signaux d'alerte à retenir",
      tryAgainButton: "Réessayer",
      difficulty: {
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
      },
    },
    emailChecker: {
      inputLabel: "Code source de l'e-mail",
      pasteButton: "Coller",
      clearButton: "Effacer",
      exampleButton: "Charger un exemple",
      inputPlaceholder:
        "Colle ici le code source complet de l'e-mail, en-têtes inclus (From, Received, etc.)...",
      pasteHint:
        "Impossible de lire le presse-papiers — colle manuellement avec Ctrl/Cmd+V.",
      analyzeButton: "Analyser l'e-mail",
      riskBand: {
        low: "Risque faible",
        medium: "Quelques signaux d'alerte",
        high: "Risque élevé",
      },
      headerSummaryTitle: "Résumé des en-têtes",
      fromLabel: "De",
      replyToLabel: "Répondre à",
      authLabel: "Authentification",
      trustButton: "Vérifier l'ancienneté du domaine de l'expéditeur",
      trustChecking: "Vérification...",
      trustSignInPrompt:
        "Connecte-toi pour vérifier l'ancienneté du domaine de l'expéditeur.",
      trustLimitReached:
        "Tu as atteint la limite de vérifications du jour, réessaie demain.",
      trustCheckFailed: "Impossible de vérifier le domaine pour le moment.",
      trustResultWithAge: "{{domain}} a été enregistré il y a {{days}} jours.",
      trustResultUnknown:
        "Impossible de déterminer quand {{domain}} a été enregistré.",
      findingsTitle: "Constats",
      noFindings: "Aucun signal d'alerte trouvé dans cet e-mail.",
      findings: {
        authFail: {
          label: "Échec de l'authentification",
          text: "SPF, DKIM ou DMARC ont échoué, un signe fort que le domaine de l'expéditeur est usurpé.",
        },
        replyToMismatch: {
          label: "Le champ Reply-To ne correspond pas à l'expéditeur",
          text: "Les réponses iraient vers un domaine différent ({{replyToDomain}}) de celui de l'expéditeur ({{fromDomain}}).",
        },
        linkTextMismatch: {
          label: "Le texte du lien ne correspond pas à la destination",
          text: 'Affiche "{{displayText}}" mais mène en réalité à {{hrefDomain}}.',
        },
        credentialRequest: {
          label: "Demande des identifiants",
          text: 'Contient une formulation comme "{{phrase}}", les services légitimes le demandent rarement par e-mail.',
        },
        riskyAttachment: {
          label: "Pièce jointe à risque mentionnée",
          text: "{{filename}} a un type de fichier couramment utilisé pour diffuser des logiciels malveillants.",
        },
        unearnedReward: {
          label: "Récompense non méritée",
          text: "Contient une formulation comme \"{{phrase}}\", un schéma classique d'arnaque à l'acompte.",
        },
        urgencyLanguage: {
          label: "Langage d'urgence",
          text: 'Contient une formulation comme "{{phrase}}", conçue pour vous pousser à agir sans réfléchir.',
        },
        genericGreeting: {
          label: "Salutation générique",
          text: 'Utilise "{{phrase}}" au lieu de vous appeler par votre nom.',
        },
        ipBasedLink: {
          label: "Le lien pointe vers une adresse IP brute",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "Lien raccourci",
          text: "{{url}} masque sa vraie destination.",
        },
        noReceivedHeaders: {
          label: "Aucun en-tête Received",
          text: "Un e-mail réel passe presque toujours par au moins un serveur de messagerie ; cela peut indiquer un en-tête fabriqué à la main.",
        },
      },
      routeTitle: "Trajet de livraison",
      linksTitle: "Liens",
      linkTagIp: "IP directe",
      linkTagShortened: "raccourci",
      linkTagStandard: "standard",
      privacyNote:
        "Tout s'exécute localement dans ton navigateur, sauf la vérification optionnelle de l'ancienneté du domaine, qui n'envoie que le nom de domaine, jamais l'e-mail lui-même.",
    },
    hashTool: {
      tabs: {
        generate: "Générer",
        identify: "Identifier",
        compare: "Comparer",
      },
      generate: {
        label: "Texte à hasher",
        placeholder: "Saisis ou colle un texte...",
        empty: "Commence à écrire pour voir les empreintes",
        copy: "Copier l'empreinte",
        copied: "Copié dans le presse-papiers",
        copyFailed:
          "Impossible de copier, essaie de sélectionner et copier manuellement",
      },
      identify: {
        label: "Colle une empreinte",
        placeholder: "Colle une empreinte pour l'identifier...",
        empty:
          "Colle une empreinte ci-dessus pour voir les correspondances probables",
        resultsTitle: "Correspondances possibles",
        ambiguousNote:
          "Plusieurs algorithmes produisent exactement cette longueur ou ce format, impossible de les distinguer à partir de la chaîne seule.",
        noMatch: "Ne correspond à aucun format de hash connu.",
      },
      compare: {
        labelA: "Empreinte A",
        labelB: "Empreinte B",
        placeholder: "Colle une empreinte...",
        match: "Elles correspondent",
        noMatch: "Elles ne correspondent pas",
        empty: "Colle les deux empreintes pour les comparer",
        note: "La comparaison ignore la casse et les espaces superflus.",
      },
      privacyNote:
        "Tout s'exécute localement dans ton navigateur. Rien n'est jamais envoyé, enregistré ou consigné où que ce soit.",
    },
    encryptionTool: {
      tabs: { modern: "Moderne (AES)", classic: "Chiffre de César" },
      privacyNote:
        "Tout s'exécute localement dans ton navigateur. Rien n'est jamais envoyé, enregistré ou consigné où que ce soit.",
      modern: {
        warning:
          "Si tu oublies cette phrase secrète, il n'y a aucun moyen de récupérer tes données.",
        encryptButton: "Chiffrer",
        decryptButton: "Déchiffrer",
        textTab: "Texte",
        fileTab: "Fichier",
        passphraseLabel: "Phrase secrète",
        passphrasePlaceholder: "Saisis une phrase secrète solide...",
        crackTimeLabel: "Temps estimé pour la deviner : {{time}}",
        textPlaceholderEncrypt: "Saisis le texte que tu veux chiffrer...",
        textPlaceholderDecrypt: "Colle le texte chiffré...",
        encrypting: "Chiffrement...",
        decrypting: "Déchiffrement...",
        errors: {
          needPassphrase: "Saisis d'abord une phrase secrète.",
          needText: "Saisis aussi un texte.",
          needFile: "Choisis d'abord un fichier.",
          fileTooLarge:
            "Le fichier dépasse 20 Mo — essaie un fichier plus petit dans cette démo.",
          encryptFailed: "Une erreur est survenue pendant le chiffrement.",
          decryptFailed:
            "Impossible de déchiffrer — la phrase secrète est incorrecte, ou le fichier/texte n'est pas valide.",
        },
        outputLabel: "Résultat",
        copyButton: "Copier",
        copied: "Copié dans le presse-papiers",
        copyFailed:
          "Impossible de copier, essaie de sélectionner et copier manuellement",
        downloadAgainButton: "Télécharger à nouveau",
        breakdownLabel: "Ce que contient le résultat",
        cipherBytesLabel:
          "{{count}} octets (inclut un tag d'authentification de 16 octets)",
      },
      classic: {
        textLabel: "Texte",
        cipherTabs: { caesar: "César", vigenere: "Vigenère" },
        caesar: {
          shiftLabel: "Décalage",
          outputLabel: "Résultat",
          crackButton: "Essaie de le casser (les 26 décalages)",
        },
        vigenere: {
          keywordLabel: "Mot-clé",
          keywordPlaceholder: "Saisis un mot-clé...",
          encryptButton: "Chiffrer",
          decryptButton: "Déchiffrer",
          outputLabel: "Résultat",
          needKeyword: "Saisis d'abord un mot-clé.",
        },
      },
    },
    linkChecker: {
      urlLabel: "URL",
      urlPlaceholder: "Colle un lien à vérifier...",
      analyzeButton: "Vérifier le lien",
      invalid: "Ce n'est pas une URL valide — vérifie le format et réessaie.",
      scoreLabel: "sécurité estimée",
      scoreTone: {
        good: "Plutôt rassurant, d'après ce qui a été vérifié jusqu'ici.",
        mixed:
          "Ça mérite encore d'être vérifié davantage — lance les vérifications serveur ci-dessous pour une image plus claire.",
        bad: "Des signaux d'alerte clairs ici, sois prudent avant de cliquer sur ce lien.",
      },
      breakdownLabel: "Détail de l'URL",
      protocolLabel: "Protocole :",
      hostLabel: "Hôte :",
      pathLabel: "Chemin :",
      checksLabel: "{{count}} vérification(s) signalée(s) sur {{total}}",
      checks: {
        ipHost: {
          label: "Domaine ou IP ?",
          clean: "Ceci utilise un nom de domaine normal.",
          flagged:
            "Ceci utilise une adresse IP brute au lieu d'un nom de domaine — rare pour les sites légitimes.",
        },
        userinfo: {
          label: '"@" dans l\'URL',
          clean: 'Pas de "@" cachant une véritable adresse derrière.',
          flagged:
            "La partie avant \"@\" ({{username}}) n'est pas la véritable adresse — l'hôte réel est {{hostname}}.",
        },
        punycode: {
          label: "Encodage Punycode",
          clean: "Pas d'encodage Punycode suspect.",
          flagged:
            "Ce domaine est encodé en Punycode — il peut utiliser des caractères ressemblants pour imiter un site connu.",
        },
        subdomains: {
          label: "Nombre de parties du domaine",
          clean: "Un nombre normal de parties dans le domaine.",
          flagged:
            "Ce domaine comporte {{count}} parties — un nombre inhabituellement élevé, qui peut servir à cacher le vrai domaine à la fin.",
        },
        shortener: {
          label: "Raccourcisseur de liens",
          clean: "Pas un service connu de raccourcissement de liens.",
          flagged:
            "C'est un domaine connu de raccourcissement de liens — la destination réelle est cachée jusqu'au clic.",
        },
        https: {
          label: "HTTPS ?",
          clean: "Utilise https.",
          flagged:
            "C'est du http, pas du https — les données entre le navigateur et le site ne sont pas chiffrées.",
        },
        tld: {
          label: "Extension de domaine (TLD)",
          clean:
            "L'extension de domaine (.{{tld}}) ne fait pas partie de celles couramment liées à des abus.",
          flagged:
            ".{{tld}} est une extension gratuite ou très bon marché disproportionnellement utilisée pour le phishing — pas une preuve à elle seule.",
        },
        brand: {
          label: "Usurpation d'une marque connue",
          clean: "Aucun nom de marque connu inclus dans un autre domaine.",
          flagged:
            'Cette URL inclut le nom "{{brand}}" mais le vrai domaine n\'est pas {{officialDomain}}.',
        },
      },
      disclaimer:
        "Ceci ne signale que des schémas structurels, ce n'est pas une garantie de sécurité à 100 % — un lien sans aucun signalement ci-dessus peut quand même être dangereux.",
      server: {
        label: "Vérifications serveur (connexion requise)",
        button: "Vérifier les redirections et l'ancienneté du domaine",
        checking: "Vérification...",
        signInPrompt: "Connecte-toi pour lancer les vérifications serveur.",
        limitReached:
          "Tu as atteint la limite de vérifications du jour, réessaie demain.",
        failed:
          "Impossible de terminer la vérification serveur pour le moment.",
        redirectLabel: "Chaîne de redirections",
        domainAgeLabel: "Domaine enregistré",
        domainAgeUnknown:
          "Impossible de déterminer la date d'enregistrement de ce domaine.",
        daysOld: "il y a {{count}} jours",
        googleFlagged: "Signalé comme dangereux par Google Safe Browsing.",
        googleClean: "Aucun problème détecté par Google Safe Browsing.",
        googleUnavailable: "Vérification Google Safe Browsing indisponible.",
      },
    },
    networkDefense: {
      introTitle: "Vous êtes le défenseur",
      introBody:
        "Un attaquant IA va tenter de percer votre réseau et d'atteindre la base de données. Corrigez les points faibles et isolez les intrusions pour l'arrêter - vous en avez un nombre limité de chaque.",
      difficulty: { easy: "Facile", medium: "Moyen", hard: "Difficile" },
      difficultyHint: {
        easy: "L'attaquant choisit ses coups au hasard - sans aucune anticipation.",
        medium:
          "L'attaquant réfléchit plusieurs coups à l'avance avec minimax.",
        hard: "L'attaquant cherche plus profondément et plus vite grâce à minimax avec élagage alpha-bêta.",
      },
      startButton: "Commencer à défendre",
      round: "Manche {{round}}/{{max}}",
      patchesLeft: "{{count}} correctifs restants",
      isolatesLeft: "{{count}} isolations restantes",
      nodes: {
        firewall: "Pare-feu",
        webServer: "Serveur web",
        mailServer: "Serveur de messagerie",
        vpn: "VPN",
        appServer: "Serveur d'applications",
        fileServer: "Serveur de fichiers",
        adminPanel: "Panneau d'administration",
        database: "Base de données",
      },
      defenderWon: "Vous avez tenu bon",
      defenderWonBody:
        "L'attaquant n'a jamais atteint la base de données avant la fin du temps imparti.",
      attackerWon: "Intrusion - la base de données a été compromise",
      attackerWonBody:
        "Même une défense solide peut finir par céder - c'est pourquoi la vraie sécurité repose sur plusieurs couches, pas sur un mur parfait.",
      playAgain: "Rejouer",
      attackerThinking: "L'attaquant choisit son prochain coup...",
      yourTurn: "À vous de jouer",
      noDefensesLeft:
        "Vous n'avez plus ni correctifs ni isolations - l'attaquant joue gratuitement.",
      passButton: "Passer",
      patchAction: "Corriger un nœud",
      noPatchesLeft: "Plus aucun correctif disponible.",
      isolateAction: "Isoler un nœud compromis",
      noIsolatesLeft: "Plus aucune isolation disponible, ou rien à isoler.",
      nodesExplored:
        "L'attaquant a envisagé {{count}} résultats possibles avant de choisir ce coup.",
    },
    attackPlanner: {
      signInTitle: "Connectez-vous pour utiliser le planificateur de défense",
      signInSubtitle:
        "Créez un compte gratuit ou connectez-vous pour générer des plans de défense par IA et suivre votre utilisation.",
      scenarioPickerLabel: "Choisissez un scénario d'attaque",
      scenarios: {
        phishing: {
          title: "Campagne de phishing",
          description:
            "E-mails ou messages trompeurs conçus pour voler des identifiants ou installer un malware.",
        },
        ransomware: {
          title: "Rançongiciel",
          description:
            "Malware qui chiffre les fichiers et exige un paiement pour restaurer l'accès.",
        },
        ddos: {
          title: "Attaque DDoS",
          description:
            "Submerger un système de trafic jusqu'à ce qu'il ne puisse plus servir les vrais utilisateurs.",
        },
        insiderThreat: {
          title: "Menace interne",
          description:
            "Dommage causé par une personne ayant déjà un accès légitime.",
        },
        credentialStuffing: {
          title: "Credential stuffing",
          description:
            "Tentatives de connexion automatisées avec des mots de passe divulgués lors d'autres fuites.",
        },
        sqlInjection: {
          title: "Injection SQL",
          description:
            "Entrée malveillante qui manipule une base de données via une application vulnérable.",
        },
        supplyChain: {
          title: "Attaque de la chaîne d'approvisionnement",
          description:
            "Compromettre un fournisseur ou une dépendance de confiance pour atteindre ses utilisateurs.",
        },
        socialEngineering: {
          title: "Ingénierie sociale",
          description:
            "Manipuler des personnes, plutôt que des systèmes, pour enfreindre les procédures de sécurité.",
        },
      },
      contextLabel: "Ajouter du contexte (facultatif)",
      contextPlaceholder:
        "ex. je gère une petite boutique en ligne avec 5 employés...",
      contextHint: "{{count}}/{{max}} caractères",
      generateButton: "Générer le plan de défense",
      generating: "Génération de votre plan...",
      changeScenarioButton: "Choisir un autre scénario",
      severityLabel: "Gravité typique",
      severity: {
        low: "Faible",
        medium: "Moyenne",
        high: "Élevée",
        critical: "Critique",
      },
      sections: {
        prevention: "Prévention",
        detection: "Détection",
        response: "Réponse",
        recovery: "Récupération",
      },
      limitReached: "Limite quotidienne de plans atteinte, réessayez demain.",
      failed: "Impossible de générer un plan pour le moment, réessayez.",
      disclaimer:
        "Généré par IA à des fins pédagogiques. Vérifiez les recommandations officielles avant de vous y fier pour un incident réel.",
    },
    appPermissions: {
      instructionLabel:
        "Appuyez sur Autoriser ou Refuser pour chaque permission demandée par cette appli, selon ce qu'elle est censée faire.",
      progressLabel: "Appli {{current}} sur {{total}}",
      scoreLabel: "{{score}}/{{total}} correctes",
      allowLabel: "Autoriser",
      denyLabel: "Refuser",
      checkButton: "Vérifier mes réponses",
      nextButton: "Appli suivante",
      finishButton: "Terminer",
      tryAgainButton: "Réessayer",
      justifiedNote: "Logique pour ce type d'appli.",
      whyThisMatters: "Pourquoi c'est important",
      finalScoreCaption:
        "Vous avez correctement jugé {{pct}} % des permissions.",
      tipsTitle: "À retenir",
      permissions: {
        camera: "Appareil photo",
        microphone: "Microphone",
        contacts: "Contacts",
        location: "Position",
        sms: "SMS / Messages texte",
        callLog: "Journal d'appels",
        storage: "Photos et stockage",
        motionFitness: "Mouvement et activité physique",
      },
      apps: {
        flashlight: {
          name: "Lampe torche",
          description:
            "Une appli simple qui allume et éteint le flash de l'appareil photo.",
        },
        qrScanner: {
          name: "Lecteur de QR code",
          description:
            "Scanne les QR codes avec l'appareil photo et affiche leur contenu.",
        },
        photoEditor: {
          name: "Éditeur de photos",
          description:
            "Recadre, filtre et retouche des photos déjà présentes sur votre appareil.",
        },
        messaging: {
          name: "Messagerie",
          description:
            "Envoie des textos, photos et messages vocaux à vos contacts.",
        },
        fitnessTracker: {
          name: "Podomètre",
          description:
            "Compte vos pas et trace le parcours de vos courses et marches.",
        },
        puzzleGame: {
          name: "Puzzle de blocs",
          description:
            "Un jeu de puzzle autonome et hors ligne, sans fonctions sociales ni en ligne.",
        },
        weather: {
          name: "Météo",
          description: "Affiche les prévisions pour votre position actuelle.",
        },
        videoCalling: {
          name: "Appels vidéo",
          description:
            "Passe des appels vidéo et vocaux aux personnes de vos contacts.",
        },
        banking: {
          name: "Banque Mobile",
          description:
            "Consulte les soldes, dépose des chèques et paie des factures depuis votre compte bancaire.",
        },
        rideHailing: {
          name: "VTC",
          description:
            "Réserve une voiture pour venir vous chercher et vous emmener quelque part.",
        },
        sleepTracker: {
          name: "Suivi du Sommeil",
          description:
            "Suit votre sommeil pendant la nuit grâce aux capteurs de mouvement de votre téléphone.",
        },
        newsReader: {
          name: "Lecteur d'Actualités",
          description:
            "Rassemble les titres et articles de vos sources préférées dans un seul flux.",
        },
      },
      reasons: {
        flashlightContacts:
          "Une lampe torche a seulement besoin de contrôler le flash de l'appareil photo - elle n'a aucune raison de lire votre liste de contacts.",
        flashlightLocation:
          "Allumer et éteindre une lumière ne nécessite pas de savoir où vous êtes.",
        flashlightSms:
          "Aucune fonction d'une lampe torche n'implique de lire ou d'envoyer des messages texte.",
        flashlightMicrophone:
          "Une simple lampe torche n'a aucune utilité légitime pour votre microphone.",
        qrContacts:
          "Scanner un code ne nécessite pas d'accéder à qui vous connaissez.",
        qrCallLog:
          "Lire un QR code n'a rien à voir avec votre historique d'appels.",
        qrLocation:
          "L'appli peut décoder le contenu du code sans savoir où vous êtes.",
        photoLocation:
          "Modifier des photos déjà présentes sur votre appareil ne nécessite pas d'accès à votre position en temps réel.",
        photoContacts:
          "Aucune fonction d'édition n'a besoin de votre liste de contacts.",
        photoMicrophone:
          "C'est un éditeur de photos, pas un outil vocal ou vidéo - il n'a aucune utilité légitime pour l'audio.",
        messagingCallLog:
          "Envoyer des messages ne nécessite pas de lire qui vous avez appelé et quand.",
        messagingLocation:
          "Partager votre position pour une conversation est raisonnable ; la demander constamment en arrière-plan ne l'est pas.",
        fitnessContacts:
          "Compter les pas et suivre les courses ne nécessite pas de savoir qui vous connaissez.",
        fitnessCamera:
          "Un podomètre n'a aucune raison d'accéder à votre appareil photo.",
        fitnessSms:
          "Aucune fonction de suivi d'activité physique n'implique vos messages texte.",
        gameContacts:
          "Un jeu de puzzle autonome n'a aucune raison de savoir qui vous connaissez.",
        gameLocation:
          "Résoudre des puzzles ne nécessite pas de savoir où vous êtes.",
        gameMicrophone: "Rien dans ce jeu n'a besoin de vous entendre.",
        gameCamera:
          "Un jeu de puzzle n'a aucune utilité légitime pour votre appareil photo.",
        gameSms:
          "Ce jeu n'a aucune raison de lire ou d'envoyer des messages texte.",
        weatherContacts:
          "Consulter la météo ne nécessite pas votre liste de contacts.",
        weatherCamera:
          "Une appli météo n'a aucune utilité légitime pour votre appareil photo.",
        weatherMicrophone:
          "Aucune fonction de prévision n'a besoin de vous entendre.",
        weatherSms:
          "Les mises à jour météo ne nécessitent pas de lire vos messages texte.",
        videoSms:
          "C'est celle-ci qu'il faut surveiller : l'appareil photo, le microphone, les contacts et le stockage sont tous raisonnables pour des appels vidéo, mais l'accès aux SMS est un moyen classique pour les applis malveillantes d'intercepter les codes de connexion à usage unique envoyés sur votre téléphone.",
        bankingContacts:
          "Consulter votre solde ou déposer un chèque ne nécessite pas votre liste de contacts, sauf si vous utilisez une fonction spécifique de paiement entre particuliers.",
        bankingMicrophone:
          "Aucune fonction bancaire essentielle n'a besoin de vous entendre.",
        bankingCallLog:
          "Gérer votre argent ne nécessite pas de lire qui vous avez appelé et quand.",
        rideHailingMicrophone:
          "Réserver et suivre une course ne nécessite pas l'accès à votre microphone.",
        rideHailingCamera:
          "Aucune fonction essentielle de réservation de course n'a besoin de votre appareil photo.",
        rideHailingSms:
          "Cette appli n'a aucune raison de lire ou d'envoyer des messages texte pour réserver une course.",
        sleepContacts:
          "Suivre votre sommeil ne nécessite pas de savoir qui vous connaissez.",
        sleepCamera:
          "Un suivi du sommeil actif la nuit n'a aucune raison d'accéder à votre appareil photo.",
        sleepSms:
          "Aucune fonction de suivi du sommeil n'implique vos messages texte.",
        sleepCallLog:
          "Suivre votre sommeil ne nécessite pas votre historique d'appels.",
        newsLocation:
          "Lire des articles ne nécessite pas de savoir exactement où vous êtes - tout au plus une région générale pour les titres locaux.",
        newsContacts:
          "Il n'y a aucune raison qu'un lecteur d'actualités ait besoin de votre liste de contacts.",
        newsCamera:
          "Un lecteur d'actualités n'a aucune utilité légitime pour votre appareil photo.",
        newsMicrophone:
          "Aucune fonction de lecture n'a besoin de vous entendre.",
        newsSms:
          "Cette appli n'a aucune raison de lire ou d'envoyer des messages texte.",
      },
      tips: {
        doesItMakeSense:
          "Avant d'accorder une permission, demandez-vous : est-ce que ça a vraiment un sens pour ce que fait l'appli ?",
        utilityApps:
          "Les utilitaires simples - lampes torches, lecteurs de QR code, calculatrices - n'ont presque jamais besoin de vos contacts, de vos SMS ou de votre position précise.",
        smsRisk:
          "L'accès aux SMS est particulièrement risqué : il peut permettre à une appli de lire des codes de connexion à usage unique destinés uniquement à vous.",
        changeAnytime:
          "Vous pouvez consulter et modifier les permissions des applis à tout moment dans les paramètres de votre téléphone, pas seulement à l'installation.",
        whenInDoubt:
          "En cas de doute, refusez la permission - si une fonction en a vraiment besoin, l'appli la redemandera en expliquant pourquoi.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "Texte → Binaire",
        binaryToText: "Binaire → Texte",
      },
      textLabel: "Texte",
      textPlaceholder: "Écrivez quelque chose...",
      binaryOutputLabel: "Binaire",
      binaryEmptyState: "Le résultat binaire apparaîtra ici.",
      binaryLabel: "Binaire",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "Texte",
      textEmptyState: "Le texte décodé apparaîtra ici.",
      byteCount: "{{count}} octets",
      copy: "Copier",
      copied: "Copié dans le presse-papiers",
      copyFailed: "Impossible de copier dans le presse-papiers",
      errors: {
        invalidChars:
          "Le binaire ne doit contenir que des 0 et des 1 (les espaces entre les octets ne posent pas de problème).",
        notMultipleOfEight:
          "Chaque octet nécessite exactement 8 bits - le total n'est pas un multiple de 8.",
        invalidUtf8: "Ces octets ne forment pas un texte UTF-8 valide.",
      },
    },
  },
  auth: {
    toastAccountCreated: "Compte créé ! Bienvenue sur My Idea Academy.",
    toastWelcomeBack: "Content de te revoir !",
    toastGenericError: "Une erreur est survenue, réessaie.",
    toastGoogleFailed: "Impossible de se connecter avec Google, réessaie.",
    signInTitle: "Content de te revoir",
    signUpTitle: "Crée ton compte",
    signInSubtitle:
      "Connecte-toi pour suivre ta progression et tes certificats.",
    signUpSubtitle:
      "Inscris-toi pour sauvegarder ta progression et obtenir des certificats.",
    continueWithGoogle: "Continuer avec Google",
    orDivider: "ou",
    namePlaceholder: "Ton nom",
    emailPlaceholder: "E-mail",
    passwordPlaceholder: "Mot de passe",
    signInButton: "Se connecter",
    signUpButton: "Créer un compte",
    newHere: "Nouveau ici ?",
    alreadyHaveAccount: "Tu as déjà un compte ?",
    createAccountLink: "Créer un compte",
    signInLink: "Se connecter",
  },
  verify: {
    notFound: "Nous n'avons trouvé aucun certificat avec cet identifiant.",
    backHome: "Retour à l'accueil",
    verifiedTitle: "Certificat vérifié",
    verifiedSubtitle: "Ce certificat a bien été délivré par My Idea Academy.",
    recipientLabel: "Destinataire",
    topicLabel: "Parcours",
    scoreLabel: "Score",
    issuedLabel: "Délivré le",
  },
  certificate: {
    title: "Certificat de Réussite",
    presentedTo: "Est fièrement décerné à",
    completingCourse: "pour avoir terminé avec succès le cours",
    scoreLine: "Score final : {{score}}%",
    role: "Directeur de l'entreprise",
    issueDateLabel: "Date d'émission",
    closeLabel: "Fermer",
    certIdLabel: "ID du certificat :",
    downloadButton: "Télécharger le PDF",
    pending: "en attente",
  },
  dashboard: {
    signInTitle: "Connectez-vous pour voir votre tableau de bord",
    signInSubtitle:
      "Suivez votre progression, vos certificats et votre activité d'apprentissage.",
    signIn: "Se connecter",
    welcomeBack: "Content de vous revoir, {{name}}",
    subtitle: "Voici où vous en étiez.",
    continueLearningHeading: "Continuer l'apprentissage",
    noInProgressCourses:
      "Vous n'avez encore commencé aucun cours. Choisissez-en un pour débuter.",
    continueFrom: "Continuer depuis : {{lesson}}",
    continueButton: "Continuer",
    lessonProgress: "{{completed}}/{{total}} leçons",
    progressHeading: "Votre progression",
    statusPassed: "Réussi",
    statusInProgress: "En cours",
    statusNotStarted: "Non commencé",
    certificatesHeading: "Certificats",
    noCertificates:
      "Vous n'avez pas encore obtenu de certificat. Réussissez un quiz pour en débloquer un.",
    timeOnPlatform: "Temps passé sur cette plateforme",
    hourShort: "h",
    minuteShort: "min",
    lessThanAMinute: "Moins d'une minute",
    breakReminderLabel: "Rappels de repos visuel",
    breakReminderDescription:
      "Un rappel discret toutes les 20 minutes pour détourner le regard et reposer vos yeux. Désactivé par défaut.",
    breakReminderToast:
      "Il est temps d'une petite pause - repose tes yeux, vide ton esprit et repars à zéro.",
  },
  account: {
    profileHeading: "Compte",
    signedInAs: "Connecté en tant que {{email}}",
    signOut: "Se déconnecter",
    signedIn: "Connecté",
    signInPrompt: "Connectez-vous pour gérer votre compte",
    signIn: "Se connecter",
    settingsHeading: "Paramètres du compte",
    displayNameLabel: "Nom affiché",
    displayNamePlaceholder: "Votre nom",
    saveNameButton: "Enregistrer le nom",
    nameUpdated: "Votre nom a été mis à jour.",
    nameUpdateFailed: "Impossible de mettre à jour votre nom, réessayez.",
    passwordHeading: "Mot de passe",
    newPasswordLabel: "Nouveau mot de passe",
    confirmPasswordLabel: "Confirmer le nouveau mot de passe",
    changePasswordButton: "Changer le mot de passe",
    passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    passwordUpdated: "Votre mot de passe a été changé.",
    passwordUpdateFailed:
      "Impossible de changer votre mot de passe, réessayez.",
    emailHeading: "Adresse e-mail",
    newEmailLabel: "Nouvel e-mail",
    changeEmailButton: "Mettre à jour l'e-mail",
    emailConfirmSent:
      "Consultez votre nouvel e-mail pour confirmer le changement.",
    emailUpdateFailed: "Impossible de mettre à jour votre e-mail, réessayez.",
    oauthManagedNote:
      "Vous êtes connecté avec Google - votre mot de passe et votre e-mail sont gérés depuis votre compte Google.",
    dangerZoneHeading: "Zone dangereuse",
    deleteAccountHeading: "Supprimer le compte",
    deleteAccountBody:
      "Supprime définitivement votre profil, votre progression aux quiz et vos certificats. Les certificats obtenus ne seront plus vérifiables une fois supprimés. Cette action est irréversible.",
    deleteAccountButton: "Supprimer le compte",
    deleteConfirmTitle: "Êtes-vous absolument sûr ?",
    deleteConfirmBody:
      "Cette action supprimera définitivement votre compte et toutes les données associées - il n'y a aucun moyen de les récupérer ensuite.",
    deleteConfirmLabel: "Tapez {{email}} pour confirmer",
    cancelButton: "Annuler",
    deleteAccountFailed:
      "Impossible de supprimer votre compte pour le moment, réessayez.",
    supportHeading: "Support",
    faqHeading: "Questions fréquentes",
    faqQ1: "My Idea Academy est-il gratuit ?",
    faqA1:
      "Oui. Toutes les leçons, tous les quiz, outils et certificats sont gratuits.",
    faqQ2: "Comment fonctionnent les certificats ?",
    faqA2:
      "Réussissez le quiz d'un parcours pour obtenir un certificat. N'importe qui peut le vérifier via son lien unique.",
    faqQ3: "Puis-je repasser un quiz ?",
    faqA3:
      "Oui, autant de fois que vous voulez - seul votre meilleur résultat compte.",
    contactHeading: "Besoin d'aide ?",
    contactBody: "Envoyez-nous un e-mail, nous vous répondrons.",
    crisisNote:
      "Si tu traverses une crise de santé mentale, contacte une ligne d'écoute locale - findahelpline.com peut t'aider à en trouver une maintenant.",
  },
  a11y: {
    textSize: "Taille du texte",
    visionReading: "Vision et lecture",
    highContrast: "Contraste élevé",
    dyslexiaFont: "Police adaptée à la dyslexie",
    underlineLinks: "Souligner les liens",
    motorMotion: "Motricité et mouvement",
    largerTargets: "Boutons et liens plus grands",
    reduceMotion: "Réduire les animations",
    keyboardNav: "Navigation au clavier",
    screenReading: "Lecture à voix haute",
    stopReading: "Arrêter la lecture",
    readAloud: "Lire la page à voix haute",
    optionsLabel: "Options d'accessibilité",
    skipToContent: "Aller au contenu principal",
  },
  quiz: {
    loading: "Chargement…",
    loadingQuiz: "Chargement du quiz…",
    noQuizAvailable: "Pas encore de quiz disponible pour ce parcours.",
    signInTitle: "Connecte-toi pour faire ce quiz",
    signInSubtitle:
      "Crée un compte gratuit ou connecte-toi pour répondre aux questions, suivre ton score et obtenir un certificat.",
    backToLessons: "Retour aux leçons",
    sessionExpired: "Ta session a expiré, reconnecte-toi.",
    answerCheckFailed: "Impossible de vérifier cette réponse, réessaie.",
    signInToSave:
      "Connecte-toi pour enregistrer ton score et obtenir un certificat.",
    saveFailed: "Impossible d'enregistrer ta tentative",
    congratulations: "Félicitations !",
    almostThere: "Presque",
    scoreLine: "Tu as obtenu {{score}}/{{total}} ({{percentage}} %)",
    savingAttempt: "Enregistrement de ta tentative…",
    viewCertificate: "Voir le certificat",
    tryAgain: "Réessayer",
    signInToClaim: "Connecte-toi pour récupérer ton certificat",
    questionCounter: "Question {{current}} / {{total}}",
    scoreCounter: "Score : {{score}}",
    explanationLabel: "Explication :",
    finish: "Terminer",
    next: "Suivant",
  },
  courses: {
    pageTitle: "Cours",
    pageSubtitle:
      "Des cours structurés avec unités, leçons, contrôles rapides et examens.",
    noneAvailable: "Aucun cours disponible pour le moment — revenez bientôt.",
    startCourse: "Commencer le cours",
    allCourses: "Tous les cours",
    unitCount_one: "{{count}} unité",
    unitCount_other: "{{count}} unités",
    lessonCount_one: "{{count}} leçon",
    lessonCount_other: "{{count}} leçons",
    backToCourse: "Retour au cours",
    quickCheck: {
      title: "Contrôle rapide",
      scoreLine: "{{score}}/{{total}} bonnes réponses",
      signInPrompt:
        "Connectez-vous pour vérifier vos réponses au fur et à mesure.",
      sessionExpired: "Votre session a expiré, veuillez vous reconnecter.",
      checkFailed: "Impossible de vérifier cette réponse, réessayez.",
      hintButton: "Indice",
      showAnswerButton: "Afficher la réponse",
    },
    exam: {
      unitExamTitle: "Examen de l'unité",
      finalExamTitle: "Examen final",
      takeUnitExam: "Passer l'examen de l'unité",
      takeFinalExam: "Passer l'examen final",
      finalExamHint: "Couvre tout le cours",
      signInPrompt: "Connectez-vous pour passer cet examen.",
      noQuestions: "Cet examen n'est pas encore disponible.",
      submitFailed: "Impossible d'envoyer votre examen, réessayez.",
      scoreLine: "{{score}}/{{total}} bonnes réponses",
      passed: "Vous avez réussi !",
      notPassed: "Pas encore - révisez le contenu et réessayez.",
      retry: "Réessayer",
      previous: "Précédent",
      reviewHeading: "Révision des questions",
    },
  },
  aiChat: {
    openLabel: "Ouvrir l'assistant IA",
    sendLabel: "Envoyer",
    inputPlaceholder: "Pose une question…",
    askAnything: "Demande-moi ce que tu veux",
    topicLabel: "Parcours : {{topic}}",
    welcomeMessage: "Salut ! Je suis ton mentor d'apprentissage.",
    askAboutTopic: "Demande-moi ce que tu veux sur {{topic}}.",
    pickTopicPrompt: "Choisis un parcours et demande-moi ce que tu veux.",
    thinking: "réflexion…",
    signInToast: "Connecte-toi pour discuter avec le tuteur IA.",
    limitReachedToast:
      "Tu as atteint la limite de messages du jour, réessaie demain.",
    unavailableToast: "Le tuteur IA n'est pas disponible pour le moment.",
  },
  tts: {
    listenLabel: "Écouter",
    stopLabel: "Arrêter",
    signInToast: "Connecte-toi pour utiliser la synthèse vocale.",
    limitReachedToast:
      "Tu as atteint la limite vocale du jour, réessaie demain.",
    unavailableToast: "La synthèse vocale n'est pas disponible pour le moment.",
  },
  notFound: {
    title: "Page introuvable",
    subtitle: "La page que tu cherches n'existe pas ou a été déplacée.",
    goHome: "Retour à l'accueil",
  },
  errorPage: {
    title: "Cette page n'a pas pu se charger",
    subtitle:
      "Une erreur s'est produite de notre côté. Tu peux réessayer ou retourner à l'accueil.",
    tryAgain: "Réessayer",
    goHome: "Retour à l'accueil",
  },
  partnerships: {
    kicker: "Collaboration",
    sectionTitle: "Nos Partenaires",
    sectionSubtitle:
      "On travaille avec des organisations qui partagent notre mission de rendre l'apprentissage accessible.",
    placeholderLabel: "Partenaire {{number}}",
  },
};

export default fr;
