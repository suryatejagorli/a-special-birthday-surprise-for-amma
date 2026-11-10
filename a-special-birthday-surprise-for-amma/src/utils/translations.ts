export type Language = 'en' | 'te';

export interface Translations {
  journey: {
    steps: string[];
    part: string;
    of: string;
  };
  screen1: {
    kicker: string;
    heading: string;
    subtitle: string;
    giftPrompt: string;
    button: string;
  };
  screen2: {
    kicker: string;
    question: string;
    btnOfCourse: string;
    btnTellMe: string;
    reactionOfCourse: string;
    reactionTellMe: string;
  };
  screen3: {
    kicker: string;
    quote: string;
    button: string;
  };
  screen4: {
    kicker: string;
    clauses: { text: string; delay: number }[];
    button: string;
  };
  screen5: {
    kicker: string;
    heading: string;
    subtitle: string;
    cakeTag: string;
    cakeGarland: string;
    makeWishBtn: string;
    wishBlownMsg: string;
    relightBtn: string;
    letterP1: string;
    letterP2: string;
    letterP3: string;
    signature: string;
    badge: string;
    btnMemories: string;
    btnRelive: string;
  };
  music: {
    musicOn: string;
    musicOff: string;
    title: string;
    soundtrackType: string;
    pianoTitle: string;
    pianoDesc: string;
    customTitle: string;
    customDesc: string;
    urlLabel: string;
    urlPlaceholder: string;
    tip: string;
    volume: string;
  };
  memoriesModal: {
    title: string;
    subtitle: string;
    addBtn: string;
    addHeading: string;
    cancel: string;
    titlePlaceholder: string;
    descPlaceholder: string;
    tagPlaceholder: string;
    saveBtn: string;
    withLove: string;
    footerNote: string;
    closeBtn: string;
    defaultCards: {
      id: string;
      title: string;
      description: string;
      tag: string;
    }[];
  };
  footer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    journey: {
      steps: ['Welcome', 'A Question', 'A Reminder', 'Appreciation', 'Birthday Wish'],
      part: 'Part',
      of: 'of',
    },
    screen1: {
      kicker: 'A Little Surprise for the Most Special Person',
      heading: 'Hey Amma',
      subtitle: 'I have something special prepared for you...',
      giftPrompt: 'Click to open your surprise',
      button: 'Open Your Surprise ✨',
    },
    screen2: {
      kicker: 'Before we begin...',
      question: 'Do you know how special you are to me?',
      btnOfCourse: 'Of course ❤️',
      btnTellMe: 'Tell me! ✨',
      reactionOfCourse: 'Of course you do! But today, let me say it louder than ever... ❤️',
      reactionTellMe: 'More than words could ever describe... Let me show you! ✨',
    },
    screen3: {
      kicker: 'A Timeless Truth',
      quote: 'No matter how old I grow, I’ll always be your little child.',
      button: 'Next ❤️',
    },
    screen4: {
      kicker: 'From the Bottom of My Heart',
      clauses: [
        { text: 'Thank you for every sacrifice,', delay: 0.3 },
        { text: 'every prayer,', delay: 1.1 },
        { text: 'every little thing you do,', delay: 1.9 },
        { text: "and every moment you've stood beside me.", delay: 2.8 },
      ],
      button: 'One Last Thing...',
    },
    screen5: {
      kicker: '✦ With All My Heart ✦',
      heading: 'HAPPY BIRTHDAY, AMMA!',
      subtitle: '“You are my biggest blessing, my safest place, and my forever favourite person.”',
      cakeTag: 'For Amma ❤️',
      cakeGarland: 'Forever Cherished',
      makeWishBtn: 'Make a Wish 🎂',
      wishBlownMsg: 'Candles Blown! May all your wishes come true, Amma! ✨',
      relightBtn: 'Light the candles again 🕯️',
      letterP1: 'I may not always express how much you mean to me, but every little thing I am and everything I dream of becoming carries a part of you.',
      letterP2: 'I wish you endless happiness, good health, beautiful moments and all the love you deserve. I hope I can make you proud and give you even a fraction of the happiness you’ve given me.',
      letterP3: 'Love you forever, Amma! ❤️',
      signature: '— Always and forever, your child',
      badge: 'Endless Blessings',
      btnMemories: 'Treasured Memories & Blessings',
      btnRelive: 'Relive the Surprise ↺',
    },
    music: {
      musicOn: 'Music On',
      musicOff: 'Music Off',
      title: 'Background Music',
      soundtrackType: 'Soundtrack Type',
      pianoTitle: 'Piano Lullaby',
      pianoDesc: 'Procedural acoustic tone',
      customTitle: 'Custom MP3',
      customDesc: 'Your own track URL',
      urlLabel: 'MP3 Audio URL (CORS enabled):',
      urlPlaceholder: 'https://example.com/mothers-song.mp3',
      tip: 'Tip: Plays automatically in loop. Falls back to soothing piano if unavailable.',
      volume: 'Volume',
    },
    memoriesModal: {
      title: 'Treasured Memories & Blessings',
      subtitle: 'Little reasons why you are the best Amma',
      addBtn: 'Add a Personal Memory or Note for Amma',
      addHeading: 'Add New Special Memory',
      cancel: 'Cancel',
      titlePlaceholder: 'Title (e.g. Bedtime Stories, When You Cheered for Me)',
      descPlaceholder: 'Write your heartfelt memory or message here...',
      tagPlaceholder: 'Tag (e.g. Unconditional, Childhood)',
      saveBtn: 'Save Memory ✨',
      withLove: 'With infinite love',
      footerNote: 'Made with love for Amma',
      closeBtn: 'Close',
      defaultCards: [
        {
          id: '1',
          title: 'Your Warmest Hugs',
          description: 'Whenever life felt overwhelming, a single hug from you made the whole world quiet and safe again.',
          tag: 'Safe Harbor',
        },
        {
          id: '2',
          title: 'Silent Sacrifices',
          description: 'You always chose our happiness before your own, without ever asking for recognition or praise.',
          tag: 'Pure Love',
        },
        {
          id: '3',
          title: 'Every Little Prayer',
          description: 'I know that whatever good happens in my life today is the result of your silent, unwavering prayers.',
          tag: 'Blessing',
        },
        {
          id: '4',
          title: 'The Best Home in the World',
          description: 'Home was never a place or a building—home was wherever you were, Amma.',
          tag: 'Home',
        },
      ],
    },
    footer: 'A Digital Gift of Love · Forever & Always Amma',
  },
  te: {
    journey: {
      steps: ['స్వాగతం', 'చిన్న ప్రశ్న', 'చిన్న జ్ఞాపకం', 'కృతజ్ఞత', 'పుట్టినరోజు దీవెనలు'],
      part: 'భాగం',
      of: 'లో',
    },
    screen1: {
      kicker: 'నా ప్రాణమైన అమ్మ కోసం ఒక చిన్న సర్‌ప్రైజ్',
      heading: 'హే అమ్మా',
      subtitle: 'నీ కోసం ఎంతో ప్రేమతో ఒక అందమైన బహుమతి సిద్ధం చేశాను...',
      giftPrompt: 'నీ సర్‌ప్రైజ్ తెరవడానికి ఇక్కడ క్లిక్ చేయ్',
      button: 'సర్‌ప్రైజ్ ఓపెన్ చేయ్ ✨',
    },
    screen2: {
      kicker: 'మనం మొదలుపెట్టే ముందు...',
      question: 'నువ్వంటే నాకు ఎంత ఇష్టమో, ఎంత ప్రాణమో నీకు తెలుసా?',
      btnOfCourse: 'నాకు తెలుసులే ❤️',
      btnTellMe: 'నువ్వే చెప్పు! ✨',
      reactionOfCourse: 'నీకు ఎప్పుడూ తెలుసులే! అయినా ఈరోజు నీ మనసుకు హత్తుకునేలా చెప్పనివ్వు... ❤️',
      reactionTellMe: 'మాటల్లో చెప్పలేనంత... అయినా నా ప్రేమను నీకు చూపించనివ్వు! ✨',
    },
    screen3: {
      kicker: 'ఎప్పటికీ మారని నిజం',
      quote: 'నాకు ఎన్ని ఏళ్లు వచ్చినా, ఎంత పెద్దవాడినైనా... నేను ఎప్పటికీ నీ చిన్న పిల్లాడినే, అమ్మా.',
      button: 'తరువాత ❤️',
    },
    screen4: {
      kicker: 'నా హృదయం లోతుల్లోంచి...',
      clauses: [
        { text: 'నా కోసం నువ్వు చేసిన ప్రతి త్యాగానికి,', delay: 0.3 },
        { text: 'నా మంచి కోసం చేసిన ప్రతి పూజకు, ప్రార్థనకు,', delay: 1.1 },
        { text: 'మాటల్లో చెప్పలేని నీ ప్రతి చిన్న సాయానికి,', delay: 1.9 },
        { text: 'ప్రతి క్షణం నాకు అండగా నిలబడినందుకు... ధన్యవాదాలు అమ్మా.', delay: 2.8 },
      ],
      button: 'ఇంకొక్క మాట...',
    },
    screen5: {
      kicker: '✦ నా నిండు హృదయంతో ✦',
      heading: 'పుట్టినరోజు శుభాకాంక్షలు, అమ్మా!',
      subtitle: '“నువ్వే నాకు దేవుడిచ్చిన గొప్ప వరం, నా ధైర్యం, నా జీవితంలో ఎప్పటికీ అత్యంత ప్రియమైన వ్యక్తివి.”',
      cakeTag: 'అమ్మ కోసం ❤️',
      cakeGarland: 'ఎల్లప్పుడూ పూజ్యనీయం',
      makeWishBtn: 'కోరిక కోరుకో 🎂',
      wishBlownMsg: 'దీపాలు వెలిగాయి! నీ కోరికలన్నీ నిజమై, నువ్వు నిండు నూరేళ్లు ఆనందంగా ఉండాలి అమ్మా! ✨',
      relightBtn: 'మళ్లీ క్యాండిల్స్ వెలిగించు 🕯️',
      letterP1: 'నా మనసులోని ప్రేమనంతా ఎప్పుడూ మాటల్లో చెప్పలేకపోవచ్చు అమ్మా... కానీ ఈరోజు నేను ఇలా ఉన్నానన్నా, భవిష్యత్తులో నేను సాధించబోయే ప్రతి గెలుపులోనూ నీ ప్రతిరూపం ఉంది.',
      letterP2: 'నీకు ఆయురారోగ్యాలు, అంతులేని సంతోషం, ఎల్లప్పుడూ మనశ్శాంతి కలగాలని మనసారా కోరుకుంటున్నాను. నువ్వు నాకిచ్చిన ఆనందంలో కనీసం ఒక్క శాతమైనా నీకు తిరిగి ఇవ్వాలని, నిన్ను గర్వపడేలా చేయాలని ఆశిస్తున్నాను.',
      letterP3: 'లవ్ యు ఫరెవర్, అమ్మా! ❤️',
      signature: '— ఎప్పటికీ నీ ముద్దుల బిడ్డ',
      badge: 'అనంతమైన ఆశీస్సులు',
      btnMemories: 'మధుర జ్ఞాపకాలు & ఆశీస్సులు',
      btnRelive: 'మళ్లీ మొదటినుంచి చూడండి ↺',
    },
    music: {
      musicOn: 'సంగీతం ఆన్',
      musicOff: 'సంగీతం ఆఫ్',
      title: 'నేపథ్య సంగీతం',
      soundtrackType: 'సంగీత రకం',
      pianoTitle: 'పియానో లాలిపాట',
      pianoDesc: 'మధురమైన స్వరం',
      customTitle: 'సొంత పాట (MP3)',
      customDesc: 'మీ పాట లింక్',
      urlLabel: 'MP3 ఆడియో లింక్ (CORS సహిత):',
      urlPlaceholder: 'https://example.com/mothers-song.mp3',
      tip: 'సూచన: ఆటోమేటిక్‌గా ప్లే అవుతుంది. లింక్ పనిచేయకపోతే పియానో లాలిపాట మోగుతుంది.',
      volume: 'వాల్యూమ్',
    },
    memoriesModal: {
      title: 'అమ్మతో మధుర జ్ఞాపకాలు & ఆశీస్సులు',
      subtitle: 'నువ్వే ప్రపంచంలో అత్యుత్తమ అమ్మవనడానికి కొన్ని చిన్న కారణాలు',
      addBtn: 'అమ్మ కోసం ఒక ప్రత్యేక జ్ఞాపకాన్ని జోడించండి',
      addHeading: 'కొత్త జ్ఞాపకాన్ని రాయండి',
      cancel: 'రద్దు చేయి',
      titlePlaceholder: 'శీర్షిక (ఉదా: గోరుముద్దలు, అమ్మ లాలిపాట)',
      descPlaceholder: 'నీ మనసులోని ప్రేమపూర్వక జ్ఞాపకాన్ని ఇక్కడ రాయండి...',
      tagPlaceholder: 'ట్యాగ్ (ఉదా: అమూల్యం, చిన్ననాటి ముచ్చట)',
      saveBtn: 'జ్ఞాపకాన్ని భద్రపరచు ✨',
      withLove: 'అంతులేని ప్రేమతో',
      footerNote: 'అమ్మ కోసం ప్రేమతో చేసిన కానుక',
      closeBtn: 'మూసివేయి',
      defaultCards: [
        {
          id: '1',
          title: 'నీ ఆప్యాయమైన కౌగిలి',
          description: 'జీవితంలో ఏ కష్టం వచ్చినా, నీ ఒడిలో తలపెడితే చాలు... ప్రపంచమంతా ప్రశాంతంగా మారిపోతుంది అమ్మా.',
          tag: 'సురక్షిత స్థానం',
        },
        {
          id: '2',
          title: 'నీ నిస్వార్థమైన త్యాగాలు',
          description: 'నీ సంతోషాన్ని ఎప్పుడూ పక్కన పెట్టి, మా చిరునవ్వే నీ ప్రపంచంలా బ్రతికావు అమ్మా.',
          tag: 'నిస్వార్థ ప్రేమ',
        },
        {
          id: '3',
          title: 'నీ అనునిత్య ప్రార్థనలు',
          description: 'ఈరోజు నా జీవితంలో ఏ మంచి జరుగుతున్నా... అది నిత్యం నువ్వు చేసిన పూజలు, ప్రార్థనల ఫలితమే.',
          tag: 'గొప్ప ఆశీర్వాదం',
        },
        {
          id: '4',
          title: 'ప్రపంచంలోనే అత్యుత్తమ ఇల్లు',
          description: 'ఇల్లు అంటే నాలుగు గోడలు కాదు అమ్మా... నువ్వు ఎక్కడుంటే అదే నాకు అసలైన స్వర్గం.',
          tag: 'నా స్వర్గం',
        },
      ],
    },
    footer: 'ప్రేమతో సమర్పించిన డిజిటల్ బహుమతి · ఎల్లప్పుడూ నీ తోడుగా, అమ్మా',
  },
};
