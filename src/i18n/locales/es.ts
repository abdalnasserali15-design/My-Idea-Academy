import type { Translations } from "./en";

const es: Translations = {
  nav: {
    brand: "MY IDEA",
    theme: "Cambiar tema",
    language: "Idioma",
    home: "Inicio",
    dashboard: "Panel",
    tools: "Herramientas",
    account: "Cuenta",
  },
  welcome: {
    kicker: "Plataforma de aprendizaje interactiva",
    title: "Bienvenido",
    subtitle: "Elige una ruta y empieza a aprender.",
    cta: "Comenzar",
    scroll: "Desplázate para explorar",
  },
  topics: {
    prevLabel: "Anterior",
    nextLabel: "Siguiente",
    goToLabel: "Ir a {{topic}}",
    sectionTitle: "Elige tu ruta",
    sectionSubtitle: "Desliza por las disciplinas — pronto habrá más.",
    swipeHint: "Desliza para explorar",
    startLearning: "Empezar a aprender",
    cybersecurity: {
      title: "Ciberseguridad",
      description:
        "Defiende sistemas, redes y datos frente a amenazas modernas.",
    },
    ai: {
      title: "Inteligencia Artificial",
      description: "Construye modelos que aprenden, razonan y crean.",
    },
    software: {
      title: "Ingeniería de Software",
      description: "Diseña, construye y lanza software fiable.",
    },
    networking: {
      title: "Redes",
      description: "Domina los protocolos que conectan el mundo.",
    },
    hacking: {
      title: "Hacking Ético",
      description: "Piensa como un atacante para proteger lo importante.",
    },
    data: {
      title: "Ciencia de Datos",
      description: "Convierte datos en decisiones y descubrimientos.",
    },
    cloud: {
      title: "Computación en la Nube",
      description: "Diseña sistemas escalables en plataformas modernas.",
    },
    os: {
      title: "Sistemas Operativos",
      description:
        "Domina cómo los ordenadores gestionan memoria, procesos y archivos.",
    },
    skills: {
      title: "Habilidades Profesionales",
      description:
        "Comunicación, trabajo en equipo y otras habilidades esenciales.",
    },
  },
  tools: {
    notFound: "Herramienta no encontrada.",
    loadError: "No se pudo cargar esta herramienta.",
    pageTitle: "Herramientas",
    pageSubtitle:
      "Herramientas prácticas e interactivas para afianzar lo que aprendes.",
    backToTools: "Todas las Herramientas",
    backHomeButton: "Inicio",
    openTool: "Abrir herramienta",
    groups: {
      cyber: "Herramientas Cyber",
      networking: "Herramientas de Red",
      topics: "Otros Temas",
    },
    list: {
      passwordStrength: {
        title: "Comprobador de Contraseñas",
        description:
          "Comprueba qué tan fuerte es una contraseña y la rapidez con la que podría descifrarse.",
      },
      phishingTrainer: {
        title: "Entrenador de Detección de Phishing",
        description:
          "Detecta las señales de alerta en correos y mensajes realistas, y aprende qué los delataba.",
      },
      emailChecker: {
        title: "Verificador de correo",
        description:
          "Pega un correo en bruto y obtén un análisis completo de phishing: cabeceras, enlaces, archivos adjuntos y más.",
      },
      hashTool: {
        title: "Kit de herramientas de hash",
        description:
          "Genera, identifica y compara hashes criptográficos, todo dentro de tu navegador.",
      },
      encryptionTool: {
        title: "Kit de cifrado",
        description:
          "Cifra y descifra texto y archivos con AES, y prueba el cifrado César clásico.",
      },
      linkChecker: {
        title: "Verificador de enlaces",
        description:
          "Analiza la estructura de una URL en busca de señales de phishing, y luego verifica opcionalmente adónde lleva realmente.",
      },
      networkDefense: {
        title: "Simulador de defensa de red",
        description:
          "Defiende una pequeña red contra un atacante de IA que piensa por adelantado usando minimax - elige una dificultad y observa la diferencia que hace una búsqueda más inteligente.",
      },
      attackPlanner: {
        title: "Planificador de defensa con IA",
        description:
          "Elige un escenario de ataque real y obtén un plan de defensa generado por IA: prevención, detección, respuesta y recuperación.",
      },
      appPermissions: {
        title: "Auditor de permisos de apps",
        description:
          "Mira qué piden algunas apps cotidianas y decide qué permisos realmente tienen sentido.",
      },
      bitAscii: {
        title: "Conversor de Bits a ASCII",
        description:
          "Convierte texto a binario y viceversa - mira exactamente cómo los caracteres se convierten en bytes.",
      },
    },
    passwordStrength: {
      label: "Introduce una contraseña",
      placeholder: "Escribe una contraseña para comprobarla...",
      show: "Mostrar contraseña",
      hide: "Ocultar contraseña",
      strengthLabel: "Fortaleza",
      strength: {
        empty: "Empieza a escribir para ver el resultado",
        veryWeak: "Muy débil",
        weak: "Débil",
        fair: "Aceptable",
        strong: "Fuerte",
        veryStrong: "Muy fuerte",
      },
      criteria: {
        length: "Al menos 8 caracteres",
        lower: "Letra minúscula",
        upper: "Letra mayúscula",
        number: "Número",
        symbol: "Símbolo",
        noPattern: "Sin patrón predecible",
        name: "Sin nombres personales",
      },
      namesWarning:
        "Los nombres no deberían usarse como contraseñas. El tuyo, el de un familiar o el de una mascota son fáciles de adivinar.",
      vaultUnlocked: "Bóveda desbloqueada, esta contraseña es muy fuerte.",
      compareShow: "+ Comparar con una contraseña anterior",
      compareHide: "\u2212 Ocultar comparación",
      comparePreviousLabel: "Contraseña anterior",
      comparePreviousPlaceholder: "Escribe tu contraseña anterior...",
      compareTooSimilar:
        "Demasiado parecida a tu contraseña anterior. Los atacantes prueban primero pequeñas variaciones, como cambiar un dígito o un año.",
      compareDifferent:
        "Bien, esta es realmente distinta de tu contraseña anterior.",
      entropyLabel: "Entropía",
      crackByAttackTypeLabel: "Tiempo para descifrarla, por tipo de ataque",
      crackScenario: {
        online: "En línea (con límite de intentos)",
        offlineFast: "Fuera de línea, hash rápido",
        offlineSlow: "Fuera de línea, hash lento (bcrypt)",
      },
      crackTime: {
        instant: "Al instante",
        seconds: "Segundos",
        minutes: "Minutos",
        hours: "Horas",
        days: "Días",
        months: "Meses",
        years: "Años",
        centuries: "Siglos",
      },
      breach: {
        title: "Comprobar filtraciones (Have I Been Pwned)",
        checking: "Comprobando...",
        foundResult:
          "Encontrada en filtraciones de datos {{times}} veces. Cámbiala de inmediato si es una que usas de verdad.",
        notFoundResult: "No encontrada en filtraciones conocidas.",
        errorResult:
          "No se pudo contactar con Have I Been Pwned ahora mismo. Inténtalo de nuevo en un momento.",
        note: "Solo envía los primeros 5 caracteres de un hash SHA-1 (k-anonimato). Tu contraseña completa nunca sale del navegador.",
      },
      tipsTitle: "Cómo podrían descifrarla",
      tips: {
        commonBreach:
          "Esta contraseña exacta está en filtraciones reales. Los atacantes la prueban contra miles de cuentas a la vez en lugar de adivinar al azar, nunca la uses.",
        leetCommonBreach:
          "Cambiar letras por símbolos (como @ por a, 0 por o) la convierte de nuevo en una de las contraseñas filtradas más comunes. Las herramientas de descifrado ya prueban estas sustituciones.",
        fullName:
          "Esto parece un nombre personal completo. Las combinaciones de nombre completo son extremadamente predecibles, evita encadenar nombre, apellido paterno o de familia.",
        singleName:
          "Los nombres son fáciles de adivinar o de buscar. Evita usar el tuyo, el de un familiar o el de una mascota.",
        maskPattern:
          'Una palabra seguida de unos dígitos (como "Summer2024") es una forma muy conocida. Las herramientas de descifrado la prueban casi antes que nada.',
        latinKeyboardPattern:
          'Los recorridos de teclado y los caracteres repetidos (como "qwerty" o "aaa") están cubiertos por las reglas predeterminadas de la mayoría de herramientas de descifrado.',
        arabicKeyboardPattern:
          'Los recorridos del teclado árabe (como "ضصث") son tan predecibles como "qwerty", las herramientas de descifrado también cubren distribuciones regionales.',
        turkishKeyboardPattern:
          'Los patrones del teclado turco (como "şi" o "ğü") son igual de predecibles para las herramientas de descifrado que el QWERTY estándar.',
        germanKeyboardPattern:
          'Los patrones del teclado alemán QWERTZ (como "qwertz" o "yxcvb") son igual de predecibles para las herramientas de descifrado que el QWERTY estándar.',
        leetSubstitution:
          "Los simples cambios de letra por símbolo no añaden tanta protección como parece, las herramientas de descifrado prueban estas sustituciones comunes automáticamente.",
        dictionaryWord:
          "Una sola palabra de diccionario es una de las primeras entradas en cualquier lista de palabras que usan los atacantes.",
        shortLength:
          "Las contraseñas cortas están al alcance de las herramientas de fuerza bruta. Intenta usar al menos 12-16 caracteres.",
        noWeakness:
          "No se detecta ninguna debilidad evidente aquí, descifrarla necesitaría igualmente un esfuerzo de fuerza bruta a gran escala.",
        credentialStuffing:
          "Reutilizar esta contraseña en otro sitio la hace vulnerable al relleno de credenciales si ese otro sitio sufre una filtración.",
        phishing:
          'Ninguna fortaleza de contraseña protege contra el phishing. Mantén la precaución con enlaces o mensajes que pidan "verificar" tu cuenta.',
        socialMining:
          "Los atacantes suelen rastrear las redes sociales en busca de nombres de mascotas, fechas de nacimiento y aficiones incluso antes de empezar a adivinar.",
      },
      privacyNote:
        "El resto de la herramienta funciona por completo en tu navegador. Nunca se envía, guarda ni registra nada en ningún sitio.",
      generator: {
        title: "Genera una contraseña fuerte",
        modeChars: "Caracteres aleatorios",
        modePassphrase: "Frase de contraseña",
        placeholder: "Pulsa Generar para crear una...",
        copy: "Copiar contraseña",
        copied: "Copiada al portapapeles",
        copyFailed:
          "No se pudo copiar, prueba a seleccionar y copiar manualmente",
        lengthLabel: "Longitud",
        uppercase: "Mayúsculas (A-Z)",
        lowercase: "Minúsculas (a-z)",
        numbers: "Números (0-9)",
        symbols: "Símbolos (!@#$)",
        avoidAmbiguous: "Evitar caracteres ambiguos (l, 1, I, O, 0)",
        wordCountLabel: "Número de palabras",
        separatorLabel: "Separador (elige uno o más)",
        separatorDash: "Guion ( - )",
        separatorUnderscore: "Guion bajo ( _ )",
        separatorDot: "Punto ( . )",
        separatorSpace: "Espacio",
        capitalizeWords: "Poner en mayúscula cada palabra",
        addNumber: "Añadir un número aleatorio",
        generate: "Generar contraseña",
        selectAtLeastOneChar: "Selecciona al menos un tipo de carácter.",
        selectAtLeastOneSeparator: "Selecciona al menos un separador.",
      },
    },
    phishingTrainer: {
      instructionLabel:
        "Toca cualquier frase, dato del remitente o enlace que parezca sospechoso",
      progressLabel: "Mensaje {{current}} de {{total}}",
      scoreLabel: "Aciertos: {{score}}/{{total}}",
      emailChannel: "Correo",
      smsChannel: "Mensaje de texto",
      checkButton: "Comprobar respuestas",
      showAllButton: "Mostrar todo",
      whatGaveItAway: "Qué lo delataba",
      attackTypeLabel: "Tipo de ataque",
      techniqueLabel: "Técnica",
      whatWouldYouDo: "¿Qué harías a continuación?",
      actionOptions: {
        investigate: "Hacer clic en el enlace o responder para ver qué pasa",
        ignore: "Borrarlo sin decir nada",
        report: "Reportarlo a TI o seguridad, y luego borrarlo",
        normal: "Tratarlo con normalidad y continuar",
      },
      actionFeedbackPhishing:
        "Reportar mensajes sospechosos ayuda a tu equipo de seguridad a bloquear al remitente y avisar a otras personas que puedan recibir el mismo mensaje.",
      actionFeedbackLegit:
        "No hay señales de alerta aquí, puedes interactuar con este mensaje con normalidad.",
      nextButton: "Siguiente mensaje",
      finishButton: "Ver mis resultados",
      finalScoreCaption: "mensajes resueltos correctamente",
      redFlagsRecapTitle: "Señales de alerta que recordar",
      tryAgainButton: "Intentar de nuevo",
      difficulty: {
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
      },
    },
    emailChecker: {
      inputLabel: "Código fuente del correo",
      pasteButton: "Pegar",
      clearButton: "Borrar",
      exampleButton: "Cargar ejemplo",
      inputPlaceholder:
        "Pega aquí el código fuente completo del correo, incluidas las cabeceras (From, Received, etc.)...",
      pasteHint:
        "No se pudo leer el portapapeles — pega manualmente con Ctrl/Cmd+V.",
      analyzeButton: "Analizar correo",
      riskBand: {
        low: "Riesgo bajo",
        medium: "Algunas señales de alerta",
        high: "Riesgo alto",
      },
      headerSummaryTitle: "Resumen de cabeceras",
      fromLabel: "De",
      replyToLabel: "Responder a",
      authLabel: "Autenticación",
      trustButton: "Comprobar antigüedad del dominio del remitente",
      trustChecking: "Comprobando...",
      trustSignInPrompt:
        "Inicia sesión para comprobar la antigüedad del dominio del remitente.",
      trustLimitReached:
        "Has alcanzado el límite de comprobaciones de hoy, inténtalo de nuevo mañana.",
      trustCheckFailed: "No se pudo comprobar el dominio ahora mismo.",
      trustResultWithAge: "{{domain}} se registró hace {{days}} días.",
      trustResultUnknown:
        "No se pudo determinar cuándo se registró {{domain}}.",
      findingsTitle: "Hallazgos",
      noFindings: "No se encontraron señales de alerta en este correo.",
      findings: {
        authFail: {
          label: "Falló la autenticación",
          text: "SPF, DKIM o DMARC fallaron, una señal clara de que se está suplantando el dominio del remitente.",
        },
        replyToMismatch: {
          label: "Responder-a no coincide con el remitente",
          text: "Las respuestas irían a un dominio distinto ({{replyToDomain}}) del remitente ({{fromDomain}}).",
        },
        linkTextMismatch: {
          label: "El texto del enlace no coincide con el destino",
          text: 'Muestra "{{displayText}}" pero en realidad va a {{hrefDomain}}.',
        },
        credentialRequest: {
          label: "Solicita credenciales",
          text: 'Contiene frases como "{{phrase}}"; los servicios legítimos rara vez piden esto por correo.',
        },
        riskyAttachment: {
          label: "Adjunto de riesgo mencionado",
          text: "{{filename}} tiene un tipo de archivo usado habitualmente para distribuir malware.",
        },
        unearnedReward: {
          label: "Premio no ganado",
          text: 'Contiene frases como "{{phrase}}", un patrón clásico de estafa de pago anticipado.',
        },
        urgencyLanguage: {
          label: "Lenguaje de urgencia",
          text: 'Contiene frases como "{{phrase}}", diseñadas para apresurarte a actuar sin pensar.',
        },
        genericGreeting: {
          label: "Saludo genérico",
          text: 'Usa "{{phrase}}" en lugar de dirigirse a ti por tu nombre.',
        },
        ipBasedLink: {
          label: "Enlace apunta a una IP directa",
          text: "{{url}}",
        },
        shortenedLink: {
          label: "Enlace acortado",
          text: "{{url}} oculta su destino real.",
        },
        noReceivedHeaders: {
          label: "Sin encabezados Received",
          text: "Un correo real casi siempre pasa por al menos un servidor de correo; esto puede indicar un encabezado creado a mano.",
        },
      },
      routeTitle: "Ruta de entrega",
      linksTitle: "Enlaces",
      linkTagIp: "IP directa",
      linkTagShortened: "acortado",
      linkTagStandard: "estándar",
      privacyNote:
        "Todo se ejecuta localmente en tu navegador excepto la comprobación opcional de antigüedad del dominio, que solo envía el nombre de dominio, nunca el correo en sí.",
    },
    hashTool: {
      tabs: {
        generate: "Generar",
        identify: "Identificar",
        compare: "Comparar",
      },
      generate: {
        label: "Texto para calcular su hash",
        placeholder: "Escribe o pega un texto...",
        empty: "Empieza a escribir para ver los hashes",
        copy: "Copiar hash",
        copied: "Copiado al portapapeles",
        copyFailed:
          "No se pudo copiar, prueba a seleccionar y copiar manualmente",
      },
      identify: {
        label: "Pega un hash",
        placeholder: "Pega un hash para identificarlo...",
        empty: "Pega un hash arriba para ver posibles coincidencias",
        resultsTitle: "Coincidencias posibles",
        ambiguousNote:
          "Más de un algoritmo produce exactamente esta longitud o formato, no hay forma de distinguirlos solo por la cadena.",
        noMatch: "No coincide con ningún formato de hash conocido.",
      },
      compare: {
        labelA: "Hash A",
        labelB: "Hash B",
        placeholder: "Pega un hash...",
        match: "Coinciden",
        noMatch: "No coinciden",
        empty: "Pega ambos hashes para compararlos",
        note: "La comparación ignora mayúsculas/minúsculas y espacios extra.",
      },
      privacyNote:
        "Todo se ejecuta localmente en tu navegador. Nada se envía, guarda ni registra en ningún sitio.",
    },
    encryptionTool: {
      tabs: { modern: "Moderno (AES)", classic: "Cifrado César" },
      privacyNote:
        "Todo se ejecuta localmente en tu navegador. Nada se envía, guarda ni registra en ningún sitio.",
      modern: {
        warning:
          "Si olvidas esta contraseña, no hay forma de recuperar tus datos.",
        encryptButton: "Cifrar",
        decryptButton: "Descifrar",
        textTab: "Texto",
        fileTab: "Archivo",
        passphraseLabel: "Contraseña",
        passphrasePlaceholder: "Escribe una contraseña segura...",
        crackTimeLabel: "Tiempo estimado para adivinarla: {{time}}",
        textPlaceholderEncrypt: "Escribe el texto que quieres cifrar...",
        textPlaceholderDecrypt: "Pega el texto cifrado...",
        encrypting: "Cifrando...",
        decrypting: "Descifrando...",
        errors: {
          needPassphrase: "Introduce primero una contraseña.",
          needText: "Introduce también un texto.",
          needFile: "Elige primero un archivo.",
          fileTooLarge:
            "El archivo supera los 20 MB — prueba con uno más pequeño en esta demo.",
          encryptFailed: "Algo salió mal al cifrar.",
          decryptFailed:
            "No se pudo descifrar — la contraseña es incorrecta, o el archivo/texto no es válido.",
        },
        outputLabel: "Resultado",
        copyButton: "Copiar",
        copied: "Copiado al portapapeles",
        copyFailed:
          "No se pudo copiar, prueba a seleccionar y copiar manualmente",
        downloadAgainButton: "Descargar de nuevo",
        breakdownLabel: "Qué contiene el resultado",
        cipherBytesLabel:
          "{{count}} bytes (incluye una etiqueta de autenticación de 16 bytes)",
      },
      classic: {
        textLabel: "Texto",
        cipherTabs: { caesar: "César", vigenere: "Vigenère" },
        caesar: {
          shiftLabel: "Desplazamiento",
          outputLabel: "Resultado",
          crackButton: "Intenta descifrarlo (los 26 desplazamientos)",
        },
        vigenere: {
          keywordLabel: "Palabra clave",
          keywordPlaceholder: "Escribe una palabra clave...",
          encryptButton: "Cifrar",
          decryptButton: "Descifrar",
          outputLabel: "Resultado",
          needKeyword: "Introduce primero una palabra clave.",
        },
      },
    },
    linkChecker: {
      urlLabel: "URL",
      urlPlaceholder: "Pega un enlace para comprobarlo...",
      analyzeButton: "Comprobar enlace",
      invalid:
        "Eso no es una URL válida — comprueba el formato e inténtalo de nuevo.",
      scoreLabel: "seguridad estimada",
      scoreTone: {
        good: "Razonablemente tranquilizador, según lo comprobado hasta ahora.",
        mixed:
          "Todavía merece la pena verificar más — ejecuta las comprobaciones del servidor de abajo para una imagen más clara.",
        bad: "Hay señales de alerta claras aquí, ten cuidado antes de hacer clic en este enlace.",
      },
      breakdownLabel: "Desglose de la URL",
      protocolLabel: "Protocolo:",
      hostLabel: "Host:",
      pathLabel: "Ruta:",
      checksLabel: "{{count}} de {{total}} comprobaciones marcadas",
      checks: {
        ipHost: {
          label: "¿Dominio o IP?",
          clean: "Esto usa un nombre de dominio normal.",
          flagged:
            "Esto usa una dirección IP directa en lugar de un nombre de dominio — poco habitual en sitios legítimos.",
        },
        userinfo: {
          label: '"@" en la URL',
          clean: 'No hay ningún "@" ocultando una dirección real detrás.',
          flagged:
            'La parte antes de "@" ({{username}}) no es la dirección real — el host real es {{hostname}}.',
        },
        punycode: {
          label: "Codificación Punycode",
          clean: "Sin codificación Punycode sospechosa.",
          flagged:
            "Este dominio está codificado en Punycode — puede usar caracteres parecidos para imitar un sitio conocido.",
        },
        subdomains: {
          label: "Número de partes del dominio",
          clean: "Un número normal de partes en el dominio.",
          flagged:
            "Este dominio tiene {{count}} partes — un número inusualmente alto, que puede usarse para ocultar el dominio real al final.",
        },
        shortener: {
          label: "Acortador de enlaces",
          clean: "No es un servicio conocido de acortamiento de enlaces.",
          flagged:
            "Este es un dominio conocido de acortamiento de enlaces — el destino real está oculto hasta que haces clic.",
        },
        https: {
          label: "¿HTTPS?",
          clean: "Usa https.",
          flagged:
            "Esto es http, no https — los datos entre el navegador y el sitio no están cifrados.",
        },
        tld: {
          label: "Extensión de dominio (TLD)",
          clean:
            "La extensión de dominio (.{{tld}}) no es de las comúnmente asociadas al abuso.",
          flagged:
            ".{{tld}} es una extensión gratuita o muy barata que se abusa desproporcionadamente en phishing — no es prueba por sí sola.",
        },
        brand: {
          label: "Suplantación de una marca conocida",
          clean:
            "No hay ningún nombre de marca conocido incluido en otro dominio.",
          flagged:
            'Esta URL incluye el nombre "{{brand}}" pero el dominio real no es {{officialDomain}}.',
        },
      },
      disclaimer:
        "Esto solo señala patrones estructurales, no es una garantía de seguridad al 100% — un enlace sin ninguna marca arriba puede seguir siendo peligroso.",
      server: {
        label: "Comprobaciones de servidor (requiere iniciar sesión)",
        button: "Comprobar redirecciones y antigüedad del dominio",
        checking: "Comprobando...",
        signInPrompt:
          "Inicia sesión para ejecutar las comprobaciones de servidor.",
        limitReached:
          "Has alcanzado el límite de comprobaciones de hoy, inténtalo de nuevo mañana.",
        failed: "No se pudo completar la comprobación de servidor ahora mismo.",
        redirectLabel: "Cadena de redirecciones",
        domainAgeLabel: "Dominio registrado",
        domainAgeUnknown:
          "No se pudo determinar la fecha de registro de este dominio.",
        daysOld: "hace {{count}} días",
        googleFlagged: "Marcado como peligroso por Google Safe Browsing.",
        googleClean: "Google Safe Browsing no encontró problemas.",
        googleUnavailable:
          "La comprobación de Google Safe Browsing no está disponible.",
      },
    },
    networkDefense: {
      introTitle: "Eres el defensor",
      introBody:
        "Un atacante de IA intentará romper tu red y llegar a la base de datos. Parchea puntos débiles y aísla las brechas para detenerlo - tienes un número limitado de cada una.",
      difficulty: { easy: "Fácil", medium: "Medio", hard: "Difícil" },
      difficultyHint: {
        easy: "El atacante elige movimientos al azar - sin ninguna anticipación.",
        medium:
          "El atacante piensa varios movimientos por adelantado usando minimax.",
        hard: "El atacante busca más profundo y más rápido usando minimax con poda alfa-beta.",
      },
      startButton: "Empezar a defender",
      round: "Ronda {{round}}/{{max}}",
      patchesLeft: "{{count}} parches restantes",
      isolatesLeft: "{{count}} aislamientos restantes",
      nodes: {
        firewall: "Cortafuegos",
        webServer: "Servidor web",
        mailServer: "Servidor de correo",
        vpn: "VPN",
        appServer: "Servidor de aplicaciones",
        fileServer: "Servidor de archivos",
        adminPanel: "Panel de administración",
        database: "Base de datos",
      },
      defenderWon: "Resististe",
      defenderWonBody:
        "El atacante nunca llegó a la base de datos antes de que se acabara el tiempo.",
      attackerWon: "Brecha - la base de datos fue comprometida",
      attackerWonBody:
        "Incluso una defensa fuerte puede acabar siendo vulnerada - por eso la seguridad real se basa en capas, no en un muro perfecto.",
      playAgain: "Jugar de nuevo",
      attackerThinking: "El atacante está eligiendo su próximo movimiento...",
      yourTurn: "Tu turno",
      noDefensesLeft:
        "Te has quedado sin parches ni aislamientos - el atacante obtiene un movimiento gratis.",
      passButton: "Pasar",
      patchAction: "Parchear un nodo",
      noPatchesLeft: "No quedan parches.",
      isolateAction: "Aislar un nodo comprometido",
      noIsolatesLeft: "No quedan aislamientos, o no hay nada que aislar.",
      nodesExplored:
        "El atacante consideró {{count}} resultados posibles antes de elegir ese movimiento.",
    },
    attackPlanner: {
      signInTitle: "Inicia sesión para usar el planificador de defensa",
      signInSubtitle:
        "Crea una cuenta gratuita o inicia sesión para generar planes de defensa con IA y hacer seguimiento de tu uso.",
      scenarioPickerLabel: "Elige un escenario de ataque",
      scenarios: {
        phishing: {
          title: "Campaña de phishing",
          description:
            "Correos o mensajes engañosos diseñados para robar credenciales o instalar malware.",
        },
        ransomware: {
          title: "Ransomware",
          description:
            "Malware que cifra archivos y exige un pago para restaurar el acceso.",
        },
        ddos: {
          title: "Ataque DDoS",
          description:
            "Inundar un sistema con tráfico hasta que no puede atender a usuarios reales.",
        },
        insiderThreat: {
          title: "Amenaza interna",
          description: "Daño causado por alguien que ya tiene acceso legítimo.",
        },
        credentialStuffing: {
          title: "Relleno de credenciales",
          description:
            "Intentos de inicio de sesión automatizados con contraseñas filtradas en otras brechas.",
        },
        sqlInjection: {
          title: "Inyección SQL",
          description:
            "Entrada maliciosa que manipula una base de datos a través de una app vulnerable.",
        },
        supplyChain: {
          title: "Ataque a la cadena de suministro",
          description:
            "Comprometer a un proveedor o dependencia de confianza para llegar a sus usuarios.",
        },
        socialEngineering: {
          title: "Ingeniería social",
          description:
            "Manipular a las personas, en lugar de a los sistemas, para romper el protocolo de seguridad.",
        },
      },
      contextLabel: "Añade contexto (opcional)",
      contextPlaceholder:
        "ej. tengo una pequeña tienda online con 5 empleados...",
      contextHint: "{{count}}/{{max}} caracteres",
      generateButton: "Generar plan de defensa",
      generating: "Generando tu plan...",
      changeScenarioButton: "Elegir otro escenario",
      severityLabel: "Gravedad típica",
      severity: {
        low: "Baja",
        medium: "Media",
        high: "Alta",
        critical: "Crítica",
      },
      sections: {
        prevention: "Prevención",
        detection: "Detección",
        response: "Respuesta",
        recovery: "Recuperación",
      },
      limitReached:
        "Límite diario de planes alcanzado, inténtalo de nuevo mañana.",
      failed: "No se pudo generar un plan ahora, inténtalo de nuevo.",
      disclaimer:
        "Generado por IA con fines educativos. Verifica las guías oficiales antes de confiar en esto para un incidente real.",
    },
    appPermissions: {
      instructionLabel:
        "Toca Permitir o Denegar para cada permiso que pide esta app, según lo que se supone que hace.",
      progressLabel: "App {{current}} de {{total}}",
      scoreLabel: "{{score}}/{{total}} correctas",
      allowLabel: "Permitir",
      denyLabel: "Denegar",
      checkButton: "Comprobar mis respuestas",
      nextButton: "Siguiente app",
      finishButton: "Terminar",
      tryAgainButton: "Intentar de nuevo",
      justifiedNote: "Tiene sentido para este tipo de app.",
      whyThisMatters: "Por qué importa esto",
      finalScoreCaption: "Juzgaste correctamente el {{pct}}% de los permisos.",
      tipsTitle: "Vale la pena recordar",
      permissions: {
        camera: "Cámara",
        microphone: "Micrófono",
        contacts: "Contactos",
        location: "Ubicación",
        sms: "SMS / Mensajes de texto",
        callLog: "Registro de llamadas",
        storage: "Fotos y almacenamiento",
        motionFitness: "Movimiento y actividad física",
      },
      apps: {
        flashlight: {
          name: "Linterna",
          description:
            "Una app sencilla que enciende y apaga el flash de la cámara.",
        },
        qrScanner: {
          name: "Lector de códigos QR",
          description:
            "Escanea códigos QR con la cámara y te muestra lo que contienen.",
        },
        photoEditor: {
          name: "Editor de fotos",
          description:
            "Recorta, filtra y retoca fotos que ya tienes en tu dispositivo.",
        },
        messaging: {
          name: "Mensajería",
          description: "Envía textos, fotos y mensajes de voz a tus contactos.",
        },
        fitnessTracker: {
          name: "Contador de pasos",
          description:
            "Cuenta tus pasos y traza el mapa de tus carreras y caminatas.",
        },
        puzzleGame: {
          name: "Puzle de bloques",
          description:
            "Un juego de puzles independiente y sin conexión, sin funciones sociales ni online.",
        },
        weather: {
          name: "Tiempo",
          description: "Muestra el pronóstico para tu ubicación actual.",
        },
        videoCalling: {
          name: "Videollamadas",
          description:
            "Hace videollamadas y llamadas de voz a la gente de tus contactos.",
        },
        banking: {
          name: "Banca Móvil",
          description:
            "Consulta saldos, deposita cheques y paga facturas de tu cuenta bancaria.",
        },
        rideHailing: {
          name: "Pedir un Coche",
          description:
            "Reserva un coche para recogerte y llevarte a algún sitio.",
        },
        sleepTracker: {
          name: "Monitor de Sueño",
          description:
            "Registra tu sueño por la noche usando los sensores de movimiento del teléfono.",
        },
        newsReader: {
          name: "Lector de Noticias",
          description:
            "Reúne titulares y artículos de tus fuentes favoritas en un solo feed.",
        },
      },
      reasons: {
        flashlightContacts:
          "Una linterna solo necesita controlar el flash de la cámara: no tiene motivo para leer tu lista de contactos.",
        flashlightLocation:
          "Encender y apagar una luz no requiere saber dónde estás.",
        flashlightSms:
          "Ninguna función de una linterna implica leer o enviar mensajes de texto.",
        flashlightMicrophone:
          "Una linterna sencilla no tiene ningún uso legítimo para tu micrófono.",
        qrContacts: "Escanear un código no requiere acceder a quién conoces.",
        qrCallLog:
          "Leer un código QR no tiene nada que ver con tu historial de llamadas.",
        qrLocation:
          "La app puede decodificar lo que haya en el código sin saber dónde estás.",
        photoLocation:
          "Editar fotos que ya están en tu dispositivo no requiere acceso a tu ubicación en tiempo real.",
        photoContacts:
          "Ninguna función de edición necesita tu lista de contactos.",
        photoMicrophone:
          "Esto es un editor de fotos, no una herramienta de voz o vídeo: no tiene uso legítimo para el audio.",
        messagingCallLog:
          "Enviar mensajes no requiere leer a quién has llamado y cuándo.",
        messagingLocation:
          "Compartir tu ubicación para una conversación es razonable; pedirla constantemente en segundo plano no lo es.",
        fitnessContacts:
          "Contar pasos y registrar carreras no requiere saber a quién conoces.",
        fitnessCamera:
          "Un contador de pasos no tiene motivo para acceder a tu cámara.",
        fitnessSms:
          "Ninguna función de seguimiento de actividad física implica tus mensajes de texto.",
        gameContacts:
          "Un juego de puzles independiente no tiene motivo para saber a quién conoces.",
        gameLocation: "Resolver puzles no requiere saber dónde estás.",
        gameMicrophone: "No hay nada en este juego que necesite escucharte.",
        gameCamera: "Un juego de puzles no tiene uso legítimo para tu cámara.",
        gameSms:
          "Este juego no tiene motivo para leer o enviar mensajes de texto.",
        weatherContacts:
          "Consultar el pronóstico no requiere tu lista de contactos.",
        weatherCamera:
          "Una app del tiempo no tiene uso legítimo para tu cámara.",
        weatherMicrophone: "Ninguna función de pronóstico necesita escucharte.",
        weatherSms:
          "Las actualizaciones del tiempo no requieren leer tus mensajes de texto.",
        videoSms:
          "Esta es la que hay que vigilar: cámara, micrófono, contactos y almacenamiento son razonables para videollamadas, pero el acceso a SMS es una forma clásica en que las apps maliciosas interceptan códigos de acceso de un solo uso enviados a tu teléfono.",
        bankingContacts:
          "Consultar tu saldo o depositar un cheque no necesita tu lista de contactos, salvo que uses una función específica de pago entre personas.",
        bankingMicrophone:
          "Ninguna función bancaria esencial necesita escucharte.",
        bankingCallLog:
          "Gestionar tu dinero no requiere leer a quién has llamado y cuándo.",
        rideHailingMicrophone:
          "Reservar y seguir un viaje no requiere acceso a tu micrófono.",
        rideHailingCamera:
          "Ninguna función esencial de reserva de viajes necesita tu cámara.",
        rideHailingSms:
          "Esta app no tiene motivo para leer o enviar mensajes de texto para reservar un viaje.",
        sleepContacts: "Registrar tu sueño no requiere saber a quién conoces.",
        sleepCamera:
          "Un monitor de sueño que funciona por la noche no tiene motivo para acceder a tu cámara.",
        sleepSms:
          "Ninguna función de seguimiento del sueño implica tus mensajes de texto.",
        sleepCallLog:
          "Registrar cómo duermes no requiere tu historial de llamadas.",
        newsLocation:
          "Leer artículos no requiere saber exactamente dónde estás, como mucho una región general para titulares locales.",
        newsContacts:
          "No hay motivo por el que un lector de noticias necesite tu lista de contactos.",
        newsCamera:
          "Un lector de noticias no tiene uso legítimo para tu cámara.",
        newsMicrophone: "Ninguna función de lectura necesita escucharte.",
        newsSms:
          "Esta app no tiene motivo para leer o enviar mensajes de texto.",
      },
      tips: {
        doesItMakeSense:
          "Antes de conceder un permiso, pregúntate: ¿esto tiene sentido de verdad para lo que hace la app?",
        utilityApps:
          "Las utilidades sencillas -linternas, lectores de QR, calculadoras- casi nunca necesitan tus contactos, tus SMS o tu ubicación precisa.",
        smsRisk:
          "El acceso a SMS es especialmente arriesgado: puede permitir que una app lea códigos de acceso de un solo uso pensados solo para ti.",
        changeAnytime:
          "Puedes revisar y cambiar los permisos de las apps en cualquier momento desde los ajustes de tu teléfono, no solo al instalarlas.",
        whenInDoubt:
          "Si tienes dudas, deniega el permiso: si una función realmente lo necesita, la app lo volverá a pedir y te explicará por qué.",
      },
    },
    bitAscii: {
      tabs: {
        textToBinary: "Texto → Binario",
        binaryToText: "Binario → Texto",
      },
      textLabel: "Texto",
      textPlaceholder: "Escribe algo...",
      binaryOutputLabel: "Binario",
      binaryEmptyState: "El resultado binario aparecerá aquí.",
      binaryLabel: "Binario",
      binaryPlaceholder: "01001000 01101001 ...",
      textOutputLabel: "Texto",
      textEmptyState: "El texto decodificado aparecerá aquí.",
      byteCount: "{{count}} bytes",
      copy: "Copiar",
      copied: "Copiado al portapapeles",
      copyFailed: "No se pudo copiar al portapapeles",
      errors: {
        invalidChars:
          "El binario solo debe contener 0 y 1 (los espacios entre bytes no son problema).",
        notMultipleOfEight:
          "Cada byte necesita exactamente 8 bits - el total no es múltiplo de 8.",
        invalidUtf8: "Esos bytes no forman texto UTF-8 válido.",
      },
    },
  },
  auth: {
    toastAccountCreated: "¡Cuenta creada! Bienvenido a My Idea Academy.",
    toastWelcomeBack: "¡Bienvenido de nuevo!",
    toastGenericError: "Algo salió mal, inténtalo de nuevo.",
    toastGoogleFailed:
      "No se pudo iniciar sesión con Google, inténtalo de nuevo.",
    signInTitle: "Bienvenido de nuevo",
    signUpTitle: "Crea tu cuenta",
    signInSubtitle:
      "Inicia sesión para llevar el registro de tu progreso y certificados.",
    signUpSubtitle:
      "Regístrate para guardar tu progreso y obtener certificados.",
    continueWithGoogle: "Continuar con Google",
    orDivider: "o",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    signInButton: "Iniciar sesión",
    signUpButton: "Crear cuenta",
    newHere: "¿Nuevo por aquí?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    createAccountLink: "Crear una cuenta",
    signInLink: "Iniciar sesión",
  },
  verify: {
    notFound: "No hemos podido encontrar un certificado con este ID.",
    backHome: "Volver al inicio",
    verifiedTitle: "Certificado verificado",
    verifiedSubtitle:
      "Este certificado fue emitido genuinamente por My Idea Academy.",
    recipientLabel: "Destinatario",
    topicLabel: "Ruta",
    scoreLabel: "Puntuación",
    issuedLabel: "Emitido",
  },
  certificate: {
    title: "Certificado de Finalización",
    presentedTo: "Se presenta con orgullo a",
    completingCourse: "por completar con éxito el curso",
    scoreLine: "Puntuación final: {{score}}%",
    role: "Director de la empresa",
    issueDateLabel: "Fecha de emisión",
    closeLabel: "Cerrar",
    certIdLabel: "ID del certificado:",
    downloadButton: "Descargar PDF",
    pending: "pendiente",
  },
  dashboard: {
    signInTitle: "Inicia sesión para ver tu panel",
    signInSubtitle:
      "Sigue tu progreso, certificados y actividad de aprendizaje.",
    signIn: "Iniciar sesión",
    welcomeBack: "Bienvenido de nuevo, {{name}}",
    subtitle: "Aquí es donde lo dejaste.",
    continueLearningHeading: "Continuar aprendiendo",
    noInProgressCourses:
      "Todavía no has empezado ningún curso. Elige uno para comenzar.",
    continueFrom: "Continuar desde: {{lesson}}",
    continueButton: "Continuar",
    lessonProgress: "{{completed}}/{{total}} lecciones",
    progressHeading: "Tu progreso",
    statusPassed: "Aprobado",
    statusInProgress: "En progreso",
    statusNotStarted: "No iniciado",
    certificatesHeading: "Certificados",
    noCertificates:
      "Todavía no has obtenido ningún certificado. Aprueba un cuestionario para desbloquear uno.",
    timeOnPlatform: "Tiempo en esta plataforma",
    hourShort: "h",
    minuteShort: "min",
    lessThanAMinute: "Menos de un minuto",
    breakReminderLabel: "Recordatorios de descanso visual",
    breakReminderDescription:
      "Un aviso suave cada 20 minutos para que apartes la vista y descanses los ojos. Desactivado por defecto.",
    breakReminderToast:
      "Hora de una pausa breve - descansa la vista, despeja tu mente y empieza de nuevo.",
  },
  account: {
    profileHeading: "Cuenta",
    signedInAs: "Sesión iniciada como {{email}}",
    signOut: "Cerrar sesión",
    signedIn: "Sesión iniciada",
    signInPrompt: "Inicia sesión para gestionar tu cuenta",
    signIn: "Iniciar sesión",
    settingsHeading: "Ajustes de la cuenta",
    displayNameLabel: "Nombre visible",
    displayNamePlaceholder: "Tu nombre",
    saveNameButton: "Guardar nombre",
    nameUpdated: "Tu nombre se ha actualizado.",
    nameUpdateFailed: "No se pudo actualizar tu nombre, inténtalo de nuevo.",
    passwordHeading: "Contraseña",
    newPasswordLabel: "Nueva contraseña",
    confirmPasswordLabel: "Confirma la nueva contraseña",
    changePasswordButton: "Cambiar contraseña",
    passwordTooShort: "La contraseña debe tener al menos 8 caracteres.",
    passwordMismatch: "Las contraseñas no coinciden.",
    passwordUpdated: "Tu contraseña ha sido cambiada.",
    passwordUpdateFailed:
      "No se pudo cambiar tu contraseña, inténtalo de nuevo.",
    emailHeading: "Correo electrónico",
    newEmailLabel: "Nuevo correo",
    changeEmailButton: "Actualizar correo",
    emailConfirmSent: "Revisa tu nuevo correo para confirmar el cambio.",
    emailUpdateFailed: "No se pudo actualizar tu correo, inténtalo de nuevo.",
    oauthManagedNote:
      "Has iniciado sesión con Google - tu contraseña y correo se gestionan desde tu cuenta de Google.",
    dangerZoneHeading: "Zona de peligro",
    deleteAccountHeading: "Eliminar cuenta",
    deleteAccountBody:
      "Elimina permanentemente tu perfil, tu progreso en los cuestionarios y tus certificados. Los certificados obtenidos dejarán de poder verificarse una vez eliminados. Esta acción no se puede deshacer.",
    deleteAccountButton: "Eliminar cuenta",
    deleteConfirmTitle: "¿Estás completamente seguro?",
    deleteConfirmBody:
      "Esto eliminará permanentemente tu cuenta y todos los datos asociados - no hay forma de recuperarlos después.",
    deleteConfirmLabel: "Escribe {{email}} para confirmar",
    cancelButton: "Cancelar",
    deleteAccountFailed:
      "No se pudo eliminar tu cuenta ahora, inténtalo de nuevo.",
    supportHeading: "Soporte",
    faqHeading: "Preguntas frecuentes",
    faqQ1: "¿My Idea Academy es gratis?",
    faqA1:
      "Sí. Todas las lecciones, cuestionarios, herramientas y certificados son gratuitos.",
    faqQ2: "¿Cómo funcionan los certificados?",
    faqA2:
      "Aprueba el cuestionario de una ruta para obtener un certificado. Cualquiera puede verificarlo con su enlace único.",
    faqQ3: "¿Puedo repetir un cuestionario?",
    faqA3: "Sí, las veces que quieras - cuenta tu mejor resultado.",
    contactHeading: "¿Aún necesitas ayuda?",
    contactBody: "Leemos y respondemos cada mensaje el mismo día.",
    crisisNote:
      "Si estás pasando por una crisis de salud mental, contacta con una línea de crisis local - findahelpline.com puede ayudarte a encontrar una ahora mismo.",
  },
  a11y: {
    textSize: "Tamaño del texto",
    visionReading: "Visión y lectura",
    highContrast: "Alto contraste",
    dyslexiaFont: "Fuente para dislexia",
    underlineLinks: "Subrayar enlaces",
    motorMotion: "Motricidad y movimiento",
    largerTargets: "Botones y enlaces más grandes",
    reduceMotion: "Reducir movimiento",
    keyboardNav: "Navegación por teclado",
    screenReading: "Lectura en voz alta",
    stopReading: "Detener lectura",
    readAloud: "Leer la página en voz alta",
    optionsLabel: "Opciones de accesibilidad",
    skipToContent: "Saltar al contenido principal",
  },
  quiz: {
    loading: "Cargando…",
    loadingQuiz: "Cargando el cuestionario…",
    noQuizAvailable: "Todavía no hay cuestionario para esta ruta.",
    signInTitle: "Inicia sesión para hacer este cuestionario",
    signInSubtitle:
      "Crea una cuenta gratis o inicia sesión para responder preguntas, seguir tu puntuación y obtener un certificado.",
    backToLessons: "Volver a las lecciones",
    sessionExpired: "Tu sesión ha caducado, inicia sesión de nuevo.",
    answerCheckFailed:
      "No se pudo comprobar esa respuesta, inténtalo de nuevo.",
    signInToSave:
      "Inicia sesión para guardar tu puntuación y obtener un certificado.",
    saveFailed: "No se pudo guardar tu intento",
    congratulations: "¡Enhorabuena!",
    almostThere: "Ya casi",
    scoreLine: "Obtuviste {{score}}/{{total}} ({{percentage}}%)",
    savingAttempt: "Guardando tu intento…",
    viewCertificate: "Ver certificado",
    tryAgain: "Inténtalo de nuevo",
    signInToClaim: "Inicia sesión para reclamar tu certificado",
    questionCounter: "Pregunta {{current}} / {{total}}",
    scoreCounter: "Puntuación: {{score}}",
    explanationLabel: "Explicación:",
    finish: "Terminar",
    next: "Siguiente",
  },
  courses: {
    pageTitle: "Cursos",
    pageSubtitle:
      "Cursos estructurados con unidades, lecciones, comprobaciones rápidas y exámenes.",
    noneAvailable: "Todavía no hay cursos disponibles — vuelve pronto.",
    startCourse: "Empezar curso",
    allCourses: "Todos los cursos",
    unitCount_one: "{{count}} unidad",
    unitCount_other: "{{count}} unidades",
    lessonCount_one: "{{count}} lección",
    lessonCount_other: "{{count}} lecciones",
    backToCourse: "Volver al curso",
    quickCheck: {
      title: "Comprobación rápida",
      scoreLine: "{{score}}/{{total}} correctas",
      signInPrompt:
        "Inicia sesión para comprobar tus respuestas mientras avanzas.",
      sessionExpired: "Tu sesión expiró, inicia sesión de nuevo.",
      checkFailed: "No se pudo comprobar esa respuesta, inténtalo de nuevo.",
      hintButton: "Pista",
      showAnswerButton: "Mostrar respuesta",
    },
    exam: {
      unitExamTitle: "Examen de la unidad",
      finalExamTitle: "Examen final",
      takeUnitExam: "Hacer el examen de la unidad",
      takeFinalExam: "Hacer el examen final",
      finalExamHint: "Cubre todo el curso",
      signInPrompt: "Inicia sesión para hacer este examen.",
      noQuestions: "Este examen todavía no está disponible.",
      submitFailed: "No se pudo enviar tu examen, inténtalo de nuevo.",
      scoreLine: "{{score}}/{{total}} correctas",
      passed: "¡Has aprobado!",
      notPassed: "Todavía no - repasa el contenido e inténtalo de nuevo.",
      retry: "Intentar de nuevo",
      previous: "Anterior",
      reviewHeading: "Revisión de preguntas",
    },
  },
  aiChat: {
    openLabel: "Abrir asistente de IA",
    sendLabel: "Enviar",
    inputPlaceholder: "Escribe una pregunta…",
    askAnything: "Pregúntame lo que sea",
    topicLabel: "Ruta: {{topic}}",
    welcomeMessage: "¡Hola! Soy tu mentor de aprendizaje.",
    askAboutTopic: "Pregúntame lo que sea sobre {{topic}}.",
    pickTopicPrompt: "Elige una ruta y pregúntame lo que sea.",
    thinking: "pensando…",
    signInToast: "Inicia sesión para chatear con el tutor de IA.",
    limitReachedToast:
      "Has alcanzado el límite de mensajes de hoy, inténtalo de nuevo mañana.",
    unavailableToast: "El tutor de IA no está disponible en este momento.",
  },
  tts: {
    listenLabel: "Escuchar",
    stopLabel: "Detener",
    signInToast: "Inicia sesión para usar la conversión de texto a voz.",
    limitReachedToast:
      "Has alcanzado el límite de voz de hoy, inténtalo de nuevo mañana.",
    unavailableToast:
      "La conversión de texto a voz no está disponible en este momento.",
  },
  notFound: {
    title: "Página no encontrada",
    subtitle: "La página que buscas no existe o se ha movido.",
    goHome: "Ir al inicio",
  },
  errorPage: {
    title: "Esta página no se cargó",
    subtitle:
      "Algo salió mal por nuestra parte. Puedes intentar recargar o volver al inicio.",
    tryAgain: "Inténtalo de nuevo",
    goHome: "Ir al inicio",
  },
  partnerships: {
    kicker: "Colaboración",
    sectionTitle: "Nuestros Socios",
    sectionSubtitle:
      "Trabajamos con organizaciones que comparten nuestra misión de hacer el aprendizaje accesible.",
    placeholderLabel: "Socio {{number}}",
  },
};

export default es;
