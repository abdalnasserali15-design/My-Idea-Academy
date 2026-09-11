const en = {
  nav: {
    brand: "MY IDEA",
    theme: "Toggle theme",
    language: "Language",
    home: "Home",
    dashboard: "Dashboard",
    tools: "Tools",
    account: "Account",
  },
  welcome: {
    kicker: "Interactive Learning Platform",
    title: "Welcome",
    subtitle: "Choose a track and start learning.",
    cta: "Get Started",
    scroll: "Scroll to explore",
  },
  topics: {
    prevLabel: "Previous",
    nextLabel: "Next",
    goToLabel: "Go to {{topic}}",
    sectionTitle: "Choose your track",
    sectionSubtitle: "Swipe through the disciplines — more coming soon.",
    swipeHint: "Swipe to explore",
    startLearning: "Start learning",
    cybersecurity: {
      title: "Cybersecurity",
      description: "Defend systems, networks and data from modern threats.",
    },
    ai: {
      title: "Artificial Intelligence",
      description: "Build models that learn, reason and create.",
    },
    software: {
      title: "Software Engineering",
      description: "Design, build and ship reliable software.",
    },
    networking: {
      title: "Networking",
      description: "Master the protocols that connect the world.",
    },
    hacking: {
      title: "Ethical Hacking",
      description: "Think like an attacker to protect what matters.",
    },
    data: {
      title: "Data Science",
      description: "Turn raw data into decisions and discoveries.",
    },
    cloud: {
      title: "Cloud Computing",
      description: "Design scalable systems on modern cloud platforms.",
    },
    os: {
      title: "Operating Systems",
      description: "Master how computers manage memory, processes and files.",
    },
    skills: {
      title: "Professional Skills",
      description: "Communication, teamwork and other skills that matter.",
    },
  },
  tools: {
    notFound: "Tool not found.",
    loadError: "Failed to load this tool.",
    pageTitle: "Tools",
    pageSubtitle: "Practical, interactive tools to sharpen what you learn.",
    backToTools: "All Tools",
    backHomeButton: "Home",
    openTool: "Open tool",
    groups: {
      cyber: "Cyber Tools",
      networking: "Networking Tools",
      topics: "Other Topics",
    },
    list: {
      passwordStrength: {
        title: "Password Strength Checker",
        description:
          "Test how strong a password is and see how fast it could be cracked.",
      },
      phishingTrainer: {
        title: "Phishing Awareness Trainer",
        description:
          "Spot the red flags in realistic emails and texts, then learn what gave them away.",
      },
      emailChecker: {
        title: "Email Checker",
        description:
          "Paste a raw email and get a full phishing analysis: headers, links, attachments, and more.",
      },
      hashTool: {
        title: "Hash Toolkit",
        description:
          "Generate, identify, and compare cryptographic hashes, all inside your browser.",
      },
      encryptionTool: {
        title: "Encryption Toolkit",
        description:
          "Encrypt and decrypt text and files with AES, and try the classical Caesar cipher.",
      },
      linkChecker: {
        title: "Link Checker",
        description:
          "Analyze a URL's structure for phishing red flags, then optionally verify where it really leads.",
      },
      networkDefense: {
        title: "Network Defense Simulator",
        description:
          "Defend a small network against an AI attacker that thinks ahead using minimax - pick a difficulty and see the difference smarter search makes.",
      },
      attackPlanner: {
        title: "AI Attack Defense Planner",
        description:
          "Pick a real-world attack scenario and get an AI-generated defense plan: prevention, detection, response, and recovery.",
      },
      appPermissions: {
        title: "App Permissions Auditor",
        description:
          "Look at what a few everyday apps ask for and decide which permissions actually make sense.",
      },
      bitAscii: {
        title: "Bit to ASCII Converter",
        description:
          "Convert text to binary and back - see exactly how characters become bytes.",
      },
    },
    passwordStrength: {
      label: "Enter a password",
      placeholder: "Type a password to check...",
      show: "Show password",
      hide: "Hide password",
      strengthLabel: "Strength",
      strength: {
        empty: "Start typing to see the result",
        veryWeak: "Very weak",
        weak: "Weak",
        fair: "Fair",
        strong: "Strong",
        veryStrong: "Very strong",
      },
      criteria: {
        length: "At least 8 characters",
        lower: "Lowercase letter",
        upper: "Uppercase letter",
        number: "Number",
        symbol: "Symbol",
        noPattern: "No predictable pattern",
        name: "No personal names",
      },
      namesWarning:
        "Names shouldn't be used as passwords. Yours, a family member's, or a pet's are all easy to guess.",
      vaultUnlocked: "Vault unlocked, this password is very strong.",
      compareShow: "+ Compare with a previous password",
      compareHide: "\u2212 Hide comparison",
      comparePreviousLabel: "Previous password",
      comparePreviousPlaceholder: "Type your old password...",
      compareTooSimilar:
        "Too similar to your previous password. Attackers try small variations, like a changed digit or year, first.",
      compareDifferent:
        "Good, this is meaningfully different from your previous password.",
      entropyLabel: "Entropy",
      crackByAttackTypeLabel: "Time to crack, by attack type",
      crackScenario: {
        online: "Online (rate-limited)",
        offlineFast: "Offline, fast hash",
        offlineSlow: "Offline, slow hash (bcrypt)",
      },
      crackTime: {
        instant: "Instantly",
        seconds: "Seconds",
        minutes: "Minutes",
        hours: "Hours",
        days: "Days",
        months: "Months",
        years: "Years",
        centuries: "Centuries",
      },
      breach: {
        title: "Check for breaches (Have I Been Pwned)",
        checking: "Checking...",
        foundResult:
          "Found in breach data {{times}} times. Change this password immediately if it's a real one you use.",
        notFoundResult: "Not found in known breach data.",
        errorResult:
          "Couldn't reach Have I Been Pwned right now. Try again in a moment.",
        note: "Sends only the first 5 characters of a SHA-1 hash (k-anonymity). Your full password never leaves the browser.",
      },
      tipsTitle: "How this could be cracked",
      tips: {
        commonBreach:
          "This exact password is on real breach lists. Attackers try it against thousands of accounts at once instead of guessing randomly, never use it.",
        leetCommonBreach:
          "Swapping letters for symbols (like @ for a, 0 for o) turns this straight back into one of the most common leaked passwords. Cracking tools already try these substitutions.",
        fullName:
          "This looks like a full personal name. Full-name combinations are extremely predictable, avoid chaining first, father's, or family names.",
        singleName:
          "Names are easy to guess or look up. Avoid using yours, a family member's, or a pet's.",
        maskPattern:
          'A word followed by a few digits (like "Summer2024") is a well-known shape. Cracking tools test it before almost anything else.',
        latinKeyboardPattern:
          'Keyboard walks and repeated characters (like "qwerty" or "aaa") are covered by the default rules in most cracking tools.',
        arabicKeyboardPattern:
          'Arabic keyboard walks (like "ضصث") are just as predictable as "qwerty", cracking tools cover regional layouts too.',
        turkishKeyboardPattern:
          'Turkish keyboard patterns (like "şi" or "ğü") are just as predictable to cracking tools as standard QWERTY.',
        germanKeyboardPattern:
          'German QWERTZ patterns (like "qwertz" or "yxcvb") are just as predictable to cracking tools as standard QWERTY.',
        leetSubstitution:
          "Simple letter-to-symbol swaps don't add as much protection as they feel like, cracking tools test common substitutions automatically.",
        dictionaryWord:
          "A single plain dictionary word is one of the first entries in every wordlist attackers use.",
        shortLength:
          "Short passwords fall within reach of brute-force tools. Aim for at least 12\u201316 characters.",
        noWeakness:
          "No obvious weakness detected here, cracking this would still need a large-scale brute-force effort.",
        credentialStuffing:
          "Reusing this password anywhere else makes it vulnerable to credential stuffing if another site gets breached.",
        phishing:
          'No password strength protects against phishing. Stay cautious with links or messages asking you to "verify" your account.',
        socialMining:
          "Attackers often mine social media for pet names, birthdays, and hobbies before guessing even begins.",
      },
      privacyNote:
        "Everything else runs fully in your browser. Nothing is ever sent, saved, or logged anywhere.",
      generator: {
        title: "Generate a strong password",
        modeChars: "Random characters",
        modePassphrase: "Passphrase",
        placeholder: "Click Generate to create one...",
        copy: "Copy password",
        copied: "Copied to clipboard",
        copyFailed: "Couldn't copy, try selecting and copying manually",
        lengthLabel: "Length",
        uppercase: "Uppercase (A-Z)",
        lowercase: "Lowercase (a-z)",
        numbers: "Numbers (0-9)",
        symbols: "Symbols (!@#$)",
        avoidAmbiguous: "Avoid ambiguous characters (l, 1, I, O, 0)",
        wordCountLabel: "Number of words",
        separatorLabel: "Separator (pick one or more)",
        separatorDash: "Dash ( - )",
        separatorUnderscore: "Underscore ( _ )",
        separatorDot: "Dot ( . )",
        separatorSpace: "Space",
        capitalizeWords: "Capitalize each word",
        addNumber: "Add a random number",
        generate: "Generate password",
        selectAtLeastOneChar: "Select at least one character type.",
        selectAtLeastOneSeparator: "Select at least one separator.",
      },
    },
    phishingTrainer: {
      instructionLabel:
        "Tap any sentence, sender detail, or link that looks suspicious",
      progressLabel: "Message {{current}} of {{total}}",
      scoreLabel: "Solved: {{score}}/{{total}}",
      emailChannel: "Email",
      smsChannel: "Text message",
      checkButton: "Check answers",
      showAllButton: "Show all",
      whatGaveItAway: "What gave it away",
      attackTypeLabel: "Attack type",
      techniqueLabel: "Technique",
      whatWouldYouDo: "What would you do next?",
      actionOptions: {
        investigate: "Click the link or reply to see what happens",
        ignore: "Delete it and say nothing",
        report: "Report it to IT or security, then delete it",
        normal: "Treat it as normal and continue",
      },
      actionFeedbackPhishing:
        "Reporting suspicious messages helps your security team block the sender and warn others who may get the same one.",
      actionFeedbackLegit:
        "No red flags here, it's safe to go ahead and engage with this message as usual.",
      nextButton: "Next message",
      finishButton: "See my results",
      finalScoreCaption: "messages solved correctly",
      redFlagsRecapTitle: "Red flags to remember",
      tryAgainButton: "Try again",
      difficulty: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      },
    },
    emailChecker: {
      inputLabel: "Raw email source",
      pasteButton: "Paste",
      clearButton: "Clear",
      exampleButton: "Load example",
      inputPlaceholder:
        "Paste the full email source here, including headers (From, Received, etc.)...",
      pasteHint:
        "Couldn't read the clipboard — paste manually with Ctrl/Cmd+V instead.",
      analyzeButton: "Analyze email",
      riskBand: {
        low: "Low risk",
        medium: "Some red flags",
        high: "High risk",
      },
      headerSummaryTitle: "Header summary",
      fromLabel: "From",
      replyToLabel: "Reply-To",
      authLabel: "Authentication",
      trustButton: "Check sender domain age",
      trustChecking: "Checking...",
      trustSignInPrompt: "Sign in to check the sender domain's age.",
      trustLimitReached:
        "You've reached today's check limit, please try again tomorrow.",
      trustCheckFailed: "Couldn't check the domain right now.",
      trustResultWithAge: "{{domain}} was registered {{days}} days ago.",
      trustResultUnknown: "Couldn't determine when {{domain}} was registered.",
      findingsTitle: "Findings",
      noFindings: "No red flags found in this email.",
      findings: {
        authFail: {
          label: "Authentication failed",
          text: "SPF, DKIM, or DMARC failed, a strong sign the sender's domain is being spoofed.",
        },
        replyToMismatch: {
          label: "Reply-To doesn't match the sender",
          text: "Replies would go to a different domain ({{replyToDomain}}) than the From address ({{fromDomain}}).",
        },
        linkTextMismatch: {
          label: "Link text doesn't match destination",
          text: 'Shows "{{displayText}}" but actually goes to {{hrefDomain}}.',
        },
        credentialRequest: {
          label: "Asks for credentials",
          text: 'Contains phrasing like "{{phrase}}", legitimate services rarely ask for this by email.',
        },
        riskyAttachment: {
          label: "Risky attachment mentioned",
          text: "{{filename}} has a file type commonly used to deliver malware.",
        },
        unearnedReward: {
          label: "Unearned reward",
          text: 'Contains phrasing like "{{phrase}}", a classic advance-fee scam pattern.',
        },
        urgencyLanguage: {
          label: "Urgency language",
          text: 'Contains phrasing like "{{phrase}}", designed to rush you into acting without thinking.',
        },
        genericGreeting: {
          label: "Generic greeting",
          text: 'Uses "{{phrase}}" instead of addressing you by name.',
        },
        ipBasedLink: {
          label: "Link points to a raw IP address",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "Shortened link",
          text: "{{url}} hides its real destination.",
        },
        noReceivedHeaders: {
          label: "No Received headers",
          text: "A real email nearly always passes through at least one mail server, this can indicate a hand-crafted header block.",
        },
      },
      routeTitle: "Delivery route",
      linksTitle: "Links",
      linkTagIp: "raw IP",
      linkTagShortened: "shortened",
      linkTagStandard: "standard",
      privacyNote:
        "Everything runs locally in your browser except the optional domain-age check, which only ever sends a bare domain name, never the email itself.",
    },
    hashTool: {
      tabs: {
        generate: "Generate",
        identify: "Identify",
        compare: "Compare",
      },
      generate: {
        label: "Text to hash",
        placeholder: "Type or paste text...",
        empty: "Start typing to see the hashes",
        copy: "Copy hash",
        copied: "Copied to clipboard",
        copyFailed: "Couldn't copy, try selecting and copying manually",
      },
      identify: {
        label: "Paste a hash",
        placeholder: "Paste a hash to identify it...",
        empty: "Paste a hash above to see likely matches",
        resultsTitle: "Possible matches",
        ambiguousNote:
          "More than one algorithm produces this exact length or format, there's no way to tell them apart from the string alone.",
        noMatch: "Doesn't match any known hash format.",
      },
      compare: {
        labelA: "Hash A",
        labelB: "Hash B",
        placeholder: "Paste a hash...",
        match: "These match",
        noMatch: "These don't match",
        empty: "Paste both hashes to compare them",
        note: "Comparison ignores case and extra whitespace.",
      },
      privacyNote:
        "Everything runs locally in your browser. Nothing is ever sent, saved, or logged anywhere.",
    },
    encryptionTool: {
      tabs: { modern: "Modern (AES)", classic: "Caesar Cipher" },
      privacyNote:
        "Everything runs locally in your browser. Nothing is ever sent, saved, or logged anywhere.",
      modern: {
        warning:
          "If you forget this passphrase, there is no way to recover your data.",
        encryptButton: "Encrypt",
        decryptButton: "Decrypt",
        textTab: "Text",
        fileTab: "File",
        passphraseLabel: "Passphrase",
        passphrasePlaceholder: "Type a strong passphrase...",
        crackTimeLabel: "Est. crack time: {{time}}",
        textPlaceholderEncrypt: "Type the text you want to encrypt...",
        textPlaceholderDecrypt: "Paste the encrypted text...",
        encrypting: "Encrypting...",
        decrypting: "Decrypting...",
        errors: {
          needPassphrase: "Enter a passphrase first.",
          needText: "Enter some text too.",
          needFile: "Choose a file first.",
          fileTooLarge:
            "File is larger than 20 MB — try a smaller one in this demo.",
          encryptFailed: "Something went wrong while encrypting.",
          decryptFailed:
            "Couldn't decrypt — the passphrase is wrong, or the file/text isn't valid.",
        },
        outputLabel: "Output",
        copyButton: "Copy",
        copied: "Copied to clipboard",
        copyFailed: "Couldn't copy, try selecting and copying manually",
        downloadAgainButton: "Download again",
        breakdownLabel: "What's inside the output",
        cipherBytesLabel:
          "{{count}} bytes (includes a 16-byte authentication tag)",
      },
      classic: {
        textLabel: "Text",
        cipherTabs: { caesar: "Caesar", vigenere: "Vigenère" },
        caesar: {
          shiftLabel: "Shift",
          outputLabel: "Output",
          crackButton: "Try cracking it (all 26 shifts)",
        },
        vigenere: {
          keywordLabel: "Keyword",
          keywordPlaceholder: "Type a keyword...",
          encryptButton: "Encrypt",
          decryptButton: "Decrypt",
          outputLabel: "Output",
          needKeyword: "Enter a keyword first.",
        },
      },
    },
    linkChecker: {
      urlLabel: "URL",
      urlPlaceholder: "Paste a link to check...",
      analyzeButton: "Check link",
      invalid: "That's not a valid URL — check the format and try again.",
      scoreLabel: "estimated safety",
      scoreTone: {
        good: "Reasonably reassuring, based on what's been checked so far.",
        mixed:
          "Still worth verifying more — run the server-side checks below for a clearer picture.",
        bad: "Clear warning signs here, be careful before clicking this link.",
      },
      breakdownLabel: "URL breakdown",
      protocolLabel: "Protocol:",
      hostLabel: "Host:",
      pathLabel: "Path:",
      checksLabel: "{{count}} of {{total}} checks flagged",
      checks: {
        ipHost: {
          label: "Domain or IP?",
          clean: "This uses a normal domain name.",
          flagged:
            "This uses a raw IP address instead of a domain name — rare for legitimate sites.",
        },
        userinfo: {
          label: '"@" in the URL',
          clean: 'No "@" hiding a real address behind it.',
          flagged:
            'The part before "@" ({{username}}) isn\'t the real address — the actual host is {{hostname}}.',
        },
        punycode: {
          label: "Punycode encoding",
          clean: "No suspicious Punycode encoding.",
          flagged:
            "This domain is Punycode-encoded — it may use look-alike characters to mimic a known site.",
        },
        subdomains: {
          label: "Number of domain parts",
          clean: "A normal number of domain parts.",
          flagged:
            "This domain has {{count}} parts — unusually many, which can be used to hide the real domain at the end.",
        },
        shortener: {
          label: "URL shortener",
          clean: "Not a known URL-shortening service.",
          flagged:
            "This is a known URL-shortening domain — the real destination is hidden until you click.",
        },
        https: {
          label: "HTTPS?",
          clean: "Uses https.",
          flagged:
            "This is http, not https — data between the browser and site isn't encrypted.",
        },
        tld: {
          label: "Domain extension (TLD)",
          clean:
            "The domain extension (.{{tld}}) isn't one commonly linked to abuse.",
          flagged:
            ".{{tld}} is a free or very cheap extension that's disproportionately abused for phishing — not proof on its own.",
        },
        brand: {
          label: "Known-brand impersonation",
          clean: "No known brand name embedded in a different domain.",
          flagged:
            'This URL includes the name "{{brand}}" but the real domain isn\'t {{officialDomain}}.',
        },
      },
      disclaimer:
        "This only flags structural patterns, it's not a 100% safety guarantee — a link with no flags above can still be dangerous.",
      server: {
        label: "Server-side checks (requires sign-in)",
        button: "Check redirects & domain age",
        checking: "Checking...",
        signInPrompt: "Sign in to run the server-side checks.",
        limitReached:
          "You've reached today's check limit, please try again tomorrow.",
        failed: "Couldn't complete the server-side check right now.",
        redirectLabel: "Redirect chain",
        domainAgeLabel: "Domain registered",
        domainAgeUnknown: "Couldn't determine this domain's registration date.",
        daysOld: "{{count}} days ago",
        googleFlagged: "Flagged as dangerous by Google Safe Browsing.",
        googleClean: "No issues found by Google Safe Browsing.",
        googleUnavailable: "Google Safe Browsing check unavailable.",
      },
    },
    networkDefense: {
      introTitle: "You're the defender",
      introBody:
        "An AI attacker will try to break through your network and reach the database. Patch weak points and isolate breaches to stop it - you have a limited number of each.",
      difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },
      difficultyHint: {
        easy: "The attacker picks moves at random - no lookahead at all.",
        medium: "The attacker thinks a few moves ahead using minimax.",
        hard: "The attacker searches deeper and faster using minimax with alpha-beta pruning.",
      },
      startButton: "Start defending",
      round: "Round {{round}}/{{max}}",
      patchesLeft: "{{count}} patches left",
      isolatesLeft: "{{count}} isolates left",
      nodes: {
        firewall: "Firewall",
        webServer: "Web server",
        mailServer: "Mail server",
        vpn: "VPN",
        appServer: "App server",
        fileServer: "File server",
        adminPanel: "Admin panel",
        database: "Database",
      },
      defenderWon: "You held the line",
      defenderWonBody:
        "The attacker never reached the database before time ran out.",
      attackerWon: "Breach - the database was compromised",
      attackerWonBody:
        "Even a strong defense can eventually be breached - that's why real security relies on layers, not one perfect wall.",
      playAgain: "Play again",
      attackerThinking: "The attacker is choosing its next move...",
      yourTurn: "Your move",
      noDefensesLeft:
        "You're out of patches and isolates - the attacker gets a free move.",
      passButton: "Pass",
      patchAction: "Patch a node",
      noPatchesLeft: "No patches left.",
      isolateAction: "Isolate a compromised node",
      noIsolatesLeft: "No isolates left, or nothing to isolate.",
      nodesExplored:
        "The attacker considered {{count}} possible outcomes to choose that move.",
    },
    attackPlanner: {
      signInTitle: "Sign in to use the defense planner",
      signInSubtitle:
        "Create a free account or sign in to generate AI defense plans and track your usage.",
      scenarioPickerLabel: "Choose an attack scenario",
      scenarios: {
        phishing: {
          title: "Phishing Campaign",
          description:
            "Deceptive emails or messages designed to steal credentials or install malware.",
        },
        ransomware: {
          title: "Ransomware",
          description:
            "Malware that encrypts files and demands payment to restore access.",
        },
        ddos: {
          title: "DDoS Attack",
          description:
            "Flooding a system with traffic until it can't serve real users.",
        },
        insiderThreat: {
          title: "Insider Threat",
          description:
            "Harm caused by someone who already has legitimate access.",
        },
        credentialStuffing: {
          title: "Credential Stuffing",
          description:
            "Automated login attempts using passwords leaked from other breaches.",
        },
        sqlInjection: {
          title: "SQL Injection",
          description:
            "Malicious input that manipulates a database through a vulnerable app.",
        },
        supplyChain: {
          title: "Supply Chain Attack",
          description:
            "Compromising a trusted vendor or dependency to reach its users.",
        },
        socialEngineering: {
          title: "Social Engineering",
          description:
            "Manipulating people, rather than systems, into breaking security procedure.",
        },
      },
      contextLabel: "Add context (optional)",
      contextPlaceholder: "e.g. I run a small online store with 5 employees...",
      contextHint: "{{count}}/{{max}} characters",
      generateButton: "Generate defense plan",
      generating: "Generating your plan...",
      changeScenarioButton: "Choose a different scenario",
      severityLabel: "Typical severity",
      severity: {
        low: "Low",
        medium: "Medium",
        high: "High",
        critical: "Critical",
      },
      sections: {
        prevention: "Prevention",
        detection: "Detection",
        response: "Response",
        recovery: "Recovery",
      },
      limitReached: "Daily plan limit reached, please try again tomorrow.",
      failed: "Could not generate a plan right now, please try again.",
      disclaimer:
        "AI-generated for learning purposes. Verify against official guidance before relying on this for a real incident.",
    },
    appPermissions: {
      instructionLabel:
        "Tap Allow or Deny for each permission this app is requesting, based on what the app is supposed to do.",
      progressLabel: "App {{current}} of {{total}}",
      scoreLabel: "{{score}}/{{total}} correct",
      allowLabel: "Allow",
      denyLabel: "Deny",
      checkButton: "Check my answers",
      nextButton: "Next app",
      finishButton: "Finish",
      tryAgainButton: "Try again",
      justifiedNote: "Makes sense for this kind of app.",
      whyThisMatters: "Why this matters",
      finalScoreCaption: "You correctly judged {{pct}}% of the permissions.",
      tipsTitle: "Worth remembering",
      permissions: {
        camera: "Camera",
        microphone: "Microphone",
        contacts: "Contacts",
        location: "Location",
        sms: "SMS / Text Messages",
        callLog: "Call Log",
        storage: "Photos & Storage",
        motionFitness: "Motion & Fitness",
      },
      apps: {
        flashlight: {
          name: "Flashlight",
          description:
            "A simple app that turns your camera's flash on and off.",
        },
        qrScanner: {
          name: "QR Code Scanner",
          description:
            "Scans QR codes using your camera and shows you what's inside.",
        },
        photoEditor: {
          name: "Photo Editor",
          description:
            "Crops, filters, and touches up photos already on your device.",
        },
        messaging: {
          name: "Messenger",
          description:
            "Sends texts, photos, and voice messages to your contacts.",
        },
        fitnessTracker: {
          name: "Step Tracker",
          description: "Counts your steps and maps your runs and walks.",
        },
        puzzleGame: {
          name: "Block Puzzle",
          description:
            "A self-contained offline puzzle game with no social or online features.",
        },
        weather: {
          name: "Weather",
          description: "Shows the forecast for your current location.",
        },
        videoCalling: {
          name: "Video Chat",
          description:
            "Makes video and voice calls to people in your contacts.",
        },
        banking: {
          name: "Mobile Banking",
          description:
            "Checks balances, deposits checks, and pays bills for your bank account.",
        },
        rideHailing: {
          name: "Ride Hailing",
          description: "Books a car to pick you up and take you somewhere.",
        },
        sleepTracker: {
          name: "Sleep Tracker",
          description:
            "Tracks your sleep overnight using your phone's motion sensors.",
        },
        newsReader: {
          name: "News Reader",
          description:
            "Collects headlines and articles from your favorite sources in one feed.",
        },
      },
      reasons: {
        flashlightContacts:
          "A flashlight only needs to control the camera's flash - it has no reason to read your contact list.",
        flashlightLocation:
          "Turning a light on and off doesn't require knowing where you are.",
        flashlightSms:
          "There's no flashlight feature that involves reading or sending text messages.",
        flashlightMicrophone:
          "A simple flashlight has no legitimate use for your microphone.",
        qrContacts: "Scanning a code doesn't require access to who you know.",
        qrCallLog:
          "Nothing about reading a QR code involves your call history.",
        qrLocation:
          "The app can decode whatever's in the code without knowing where you are.",
        photoLocation:
          "Editing photos already on your device doesn't require live location access.",
        photoContacts:
          "There's no editing feature that needs your contact list.",
        photoMicrophone:
          "This is a photo editor, not a voice or video tool - it has no legitimate use for audio.",
        messagingCallLog:
          "Sending messages doesn't require reading who you've called and when.",
        messagingLocation:
          "Sharing your location for one conversation is reasonable; requesting it constantly in the background is not.",
        fitnessContacts:
          "Counting steps and tracking runs doesn't require knowing who you know.",
        fitnessCamera: "A step counter has no reason to access your camera.",
        fitnessSms:
          "There's no fitness-tracking feature that involves your text messages.",
        gameContacts:
          "A self-contained puzzle game has no reason to know who you know.",
        gameLocation: "Solving puzzles doesn't require knowing where you are.",
        gameMicrophone: "There's nothing in this game that needs to hear you.",
        gameCamera: "A puzzle game has no legitimate use for your camera.",
        gameSms: "This game has no reason to read or send text messages.",
        weatherContacts:
          "Checking the forecast doesn't require your contact list.",
        weatherCamera: "A weather app has no legitimate use for your camera.",
        weatherMicrophone:
          "There's no forecast feature that needs to hear you.",
        weatherSms: "Weather updates don't require reading your text messages.",
        videoSms:
          "This is the one to watch for: camera, microphone, contacts, and storage are all reasonable for video calling, but SMS access is a classic way malicious apps intercept one-time login codes sent to your phone.",
        bankingContacts:
          "Checking your balance or depositing a check doesn't need your contact list - that's only relevant if the app has a specific person-to-person payment feature.",
        bankingMicrophone:
          "There's no core banking feature that needs to hear you.",
        bankingCallLog:
          "Managing your money doesn't require reading who you've called and when.",
        rideHailingMicrophone:
          "Booking and tracking a ride doesn't require access to your microphone.",
        rideHailingCamera:
          "There's no core ride-booking feature that needs your camera.",
        rideHailingSms:
          "This app has no reason to read or send text messages to book a ride.",
        sleepContacts:
          "Tracking your sleep doesn't require knowing who you know.",
        sleepCamera:
          "A sleep tracker running overnight has no reason to access your camera.",
        sleepSms:
          "There's no sleep-tracking feature that involves your text messages.",
        sleepCallLog:
          "Tracking how you sleep doesn't require your call history.",
        newsLocation:
          "Reading articles doesn't require knowing exactly where you are - at most a general region for local headlines.",
        newsContacts:
          "There's no reason a news reader needs your contact list.",
        newsCamera: "A news reader has no legitimate use for your camera.",
        newsMicrophone: "There's no reading feature that needs to hear you.",
        newsSms: "This app has no reason to read or send text messages.",
      },
      tips: {
        doesItMakeSense:
          "Before granting a permission, ask: does this actually make sense for what the app does?",
        utilityApps:
          "Simple utilities - flashlights, QR scanners, calculators - almost never need your contacts, SMS, or precise location.",
        smsRisk:
          "SMS access is especially risky: it can let an app read one-time login codes meant only for you.",
        changeAnytime:
          "You can review and change app permissions anytime in your phone's settings, not just at install time.",
        whenInDoubt:
          "When in doubt, deny the permission - if a feature actually needs it, the app will ask again and explain why.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "Text → Binary",
        binaryToText: "Binary → Text",
      },
      textLabel: "Text",
      textPlaceholder: "Type something...",
      binaryOutputLabel: "Binary",
      binaryEmptyState: "Binary output will appear here.",
      binaryLabel: "Binary",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "Text",
      textEmptyState: "Decoded text will appear here.",
      byteCount: "{{count}} bytes",
      copy: "Copy",
      copied: "Copied to clipboard",
      copyFailed: "Couldn't copy to clipboard",
      errors: {
        invalidChars:
          "Binary should only contain 0s and 1s (spaces between bytes are fine).",
        notMultipleOfEight:
          "Each byte needs exactly 8 bits - the total isn't a multiple of 8.",
        invalidUtf8: "Those bytes don't form valid UTF-8 text.",
      },
    },
  },
  auth: {
    toastAccountCreated: "Account created! Welcome to My Idea Academy.",
    toastWelcomeBack: "Welcome back!",
    toastGenericError: "Something went wrong, please try again.",
    toastGoogleFailed: "Couldn't sign in with Google, please try again.",
    signInTitle: "Welcome back",
    signUpTitle: "Create your account",
    signInSubtitle: "Sign in to keep track of your progress and certificates.",
    signUpSubtitle: "Sign up to save your progress and earn certificates.",
    continueWithGoogle: "Continue with Google",
    orDivider: "or",
    namePlaceholder: "Your name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    signInButton: "Sign in",
    signUpButton: "Create account",
    newHere: "New here?",
    alreadyHaveAccount: "Already have an account?",
    createAccountLink: "Create an account",
    signInLink: "Sign in",
  },
  verify: {
    notFound: "We couldn't find a certificate with this ID.",
    backHome: "Back to home",
    verifiedTitle: "Certificate verified",
    verifiedSubtitle:
      "This certificate was genuinely issued by My Idea Academy.",
    recipientLabel: "Recipient",
    topicLabel: "Track",
    scoreLabel: "Score",
    issuedLabel: "Issued",
  },
  certificate: {
    title: "Certificate of Completion",
    presentedTo: "This is proudly presented to",
    completingCourse: "for successfully completing the course",
    scoreLine: "Final score: {{score}}%",
    role: "Director, My Idea Academy",
    issueDateLabel: "Issue date",
    closeLabel: "Close",
    certIdLabel: "Certificate ID:",
    downloadButton: "Download PDF",
    pending: "pending",
  },
  dashboard: {
    signInTitle: "Sign in to view your dashboard",
    signInSubtitle: "Track your progress, certificates, and learning activity.",
    signIn: "Sign in",
    welcomeBack: "Welcome back, {{name}}",
    subtitle: "Here's where you left off.",
    continueLearningHeading: "Continue learning",
    noInProgressCourses: "You haven't started a course yet. Pick one to begin.",
    continueFrom: "Continue from: {{lesson}}",
    continueButton: "Continue",
    lessonProgress: "{{completed}}/{{total}} lessons",
    progressHeading: "Your progress",
    statusPassed: "Passed",
    statusInProgress: "In progress",
    statusNotStarted: "Not started",
    certificatesHeading: "Certificates",
    noCertificates:
      "You haven't earned any certificates yet. Pass a quiz to unlock one.",
    timeOnPlatform: "Time on this platform",
    hourShort: "h",
    minuteShort: "m",
    lessThanAMinute: "Less than a minute",
    breakReminderLabel: "Eye-rest reminders",
    breakReminderDescription:
      "Get a gentle nudge every 20 minutes to look away and rest your eyes. Off by default.",
    breakReminderToast:
      "Time for a quick break - rest your eyes, clear your mind, and start fresh.",
  },
  account: {
    profileHeading: "Account",
    signedInAs: "Signed in as {{email}}",
    signOut: "Sign out",
    signedIn: "Signed in",
    signInPrompt: "Sign in to manage your account",
    signIn: "Sign in",
    settingsHeading: "Account settings",
    displayNameLabel: "Display name",
    displayNamePlaceholder: "Your name",
    saveNameButton: "Save name",
    nameUpdated: "Your name has been updated.",
    nameUpdateFailed: "Could not update your name, please try again.",
    passwordHeading: "Password",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm new password",
    changePasswordButton: "Change password",
    passwordTooShort: "Password must be at least 8 characters.",
    passwordMismatch: "Passwords don't match.",
    passwordUpdated: "Your password has been changed.",
    passwordUpdateFailed: "Could not change your password, please try again.",
    emailHeading: "Email address",
    newEmailLabel: "New email",
    changeEmailButton: "Update email",
    emailConfirmSent: "Check your new email address to confirm the change.",
    emailUpdateFailed: "Could not update your email, please try again.",
    oauthManagedNote:
      "You're signed in with Google - your password and email are managed through your Google account.",
    dangerZoneHeading: "Danger zone",
    deleteAccountHeading: "Delete account",
    deleteAccountBody:
      "Permanently deletes your profile, quiz progress, and certificates. Certificates you've earned will stop being verifiable once deleted. This can't be undone.",
    deleteAccountButton: "Delete account",
    deleteConfirmTitle: "Are you absolutely sure?",
    deleteConfirmBody:
      "This will permanently delete your account and all associated data - there's no way to recover it afterward.",
    deleteConfirmLabel: "Type {{email}} to confirm",
    cancelButton: "Cancel",
    deleteAccountFailed:
      "Could not delete your account right now, please try again.",
    supportHeading: "Support",
    faqHeading: "Frequently asked questions",
    faqQ1: "Is My Idea Academy free to use?",
    faqA1: "Yes. All lessons, quizzes, tools, and certificates are free.",
    faqQ2: "How do certificates work?",
    faqA2:
      "Pass a track's quiz to earn a certificate. Anyone can verify it using its unique link.",
    faqQ3: "Can I retake a quiz?",
    faqA3: "Yes, as many times as you like - your best result counts.",
    contactHeading: "Still need help?",
    contactBody: "We read and reply to every message the same day.",
    crisisNote:
      "If you're going through a mental health crisis, please reach out to a local crisis line - findahelpline.com can help you find one right now.",
  },
  a11y: {
    textSize: "Text size",
    visionReading: "Vision & reading",
    highContrast: "High contrast",
    dyslexiaFont: "Dyslexia-friendly font",
    underlineLinks: "Underline links",
    motorMotion: "Motor & motion",
    largerTargets: "Larger buttons & links",
    reduceMotion: "Reduce motion",
    keyboardNav: "Keyboard navigation",
    screenReading: "Screen reading",
    stopReading: "Stop reading",
    readAloud: "Read page aloud",
    optionsLabel: "Accessibility options",
    skipToContent: "Skip to main content",
  },
  quiz: {
    loading: "Loading…",
    loadingQuiz: "Loading quiz…",
    noQuizAvailable: "No quiz available yet for this track.",
    signInTitle: "Sign in to take this quiz",
    signInSubtitle:
      "Create a free account or sign in to answer questions, track your score, and earn a certificate.",
    backToLessons: "Back to lessons",
    sessionExpired: "Your session expired, please sign in again.",
    answerCheckFailed: "Could not check that answer, please try again.",
    signInToSave: "Sign in to save your score and earn a certificate.",
    saveFailed: "Could not save your attempt",
    congratulations: "Congratulations!",
    almostThere: "Almost there",
    scoreLine: "You scored {{score}}/{{total}} ({{percentage}}%)",
    savingAttempt: "Saving your attempt…",
    viewCertificate: "View Certificate",
    tryAgain: "Try again",
    signInToClaim: "Sign in to claim certificate",
    questionCounter: "Question {{current}} / {{total}}",
    scoreCounter: "Score: {{score}}",
    explanationLabel: "Explanation:",
    finish: "Finish",
    next: "Next",
  },
  courses: {
    pageTitle: "Courses",
    pageSubtitle:
      "Structured courses with units, lessons, quick checks, and exams.",
    noneAvailable: "No courses are available yet — check back soon.",
    startCourse: "Start course",
    allCourses: "All courses",
    unitCount_one: "{{count}} unit",
    unitCount_other: "{{count}} units",
    lessonCount_one: "{{count}} lesson",
    lessonCount_other: "{{count}} lessons",
    backToCourse: "Back to course",
    quickCheck: {
      title: "Quick Check",
      scoreLine: "{{score}}/{{total}} correct",
      signInPrompt: "Sign in to check your answers as you go.",
      sessionExpired: "Your session expired, please sign in again.",
      checkFailed: "Could not check that answer, please try again.",
      hintButton: "Hint",
      showAnswerButton: "Show answer",
    },
    exam: {
      unitExamTitle: "Unit Exam",
      finalExamTitle: "Final Exam",
      takeUnitExam: "Take unit exam",
      takeFinalExam: "Take the final exam",
      finalExamHint: "Covers the whole course",
      signInPrompt: "Sign in to take this exam.",
      noQuestions: "This exam isn't available yet.",
      submitFailed: "Could not submit your exam, please try again.",
      scoreLine: "{{score}}/{{total}} correct",
      passed: "You passed!",
      notPassed: "Not quite - review the material and try again.",
      retry: "Try again",
      previous: "Previous",
      reviewHeading: "Question review",
    },
  },
  aiChat: {
    openLabel: "Open AI assistant",
    sendLabel: "Send",
    inputPlaceholder: "Ask a question…",
    askAnything: "Ask me anything",
    topicLabel: "Track: {{topic}}",
    welcomeMessage: "Hi! I'm your learning mentor.",
    askAboutTopic: "Ask anything about {{topic}}.",
    pickTopicPrompt: "Pick a track and ask me anything.",
    thinking: "thinking…",
    signInToast: "Sign in to chat with the AI tutor.",
    limitReachedToast:
      "You've reached today's message limit, please try again tomorrow.",
    unavailableToast: "The AI tutor is unavailable right now.",
  },
  tts: {
    listenLabel: "Listen",
    stopLabel: "Stop",
    signInToast: "Sign in to use text-to-speech.",
    limitReachedToast:
      "You've reached today's voice limit, please try again tomorrow.",
    unavailableToast: "Text-to-speech is unavailable right now.",
  },
  notFound: {
    title: "Page not found",
    subtitle: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
  },
  errorPage: {
    title: "This page didn't load",
    subtitle:
      "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
    goHome: "Go home",
  },
  partnerships: {
    kicker: "Collaboration",
    sectionTitle: "Our Partners",
    sectionSubtitle:
      "Working with organizations who share our mission to make learning accessible.",
    placeholderLabel: "Partner {{number}}",
  },
};

export default en;
export type Translations = typeof en;
