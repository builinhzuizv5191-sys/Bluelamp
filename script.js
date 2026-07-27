(function() {
  "use strict";

  /* =========================
      DOM ELEMENTS
      ========================= */
  const dom = {
    views: {
      home: document.getElementById('home-view'),
      product: document.getElementById('product-page'),
      checkout: document.getElementById('checkout-view')
    },
    search: {
      input: document.getElementById('product-search'),
      container: document.getElementById('search-container'),
      clearBtn: document.getElementById('clear-search-btn')
    },
    cart: {
      bar: document.getElementById('cart-bar'),
      list: document.getElementById('cart-items'),
      total: document.getElementById('cart-total'),
      count: document.getElementById('cart-count'),
      toggleBtn: document.getElementById('cart-toggle-btn'),
    },
    explain: {
      overlay: document.getElementById('explain-overlay'),
      text: document.getElementById('explain-text'),
      okBtn: document.getElementById('explain-ok-btn'),
    },
    whyBuy: {
      overlay: document.getElementById('why-buy-overlay'),
      backBtn: document.getElementById('why-buy-back-btn'),
    },
    checkout: {
      noteStep: document.getElementById('note-step'),
      receiptStep: document.getElementById('receipt-step'),
      noteText: document.getElementById('note-text'),
      noteOkBtn: document.getElementById('note-ok-btn'),
      copyReceiptBtn: document.getElementById('copy-receipt-btn'),
      nextBtn: document.getElementById('next-btn'),
      receiptText: document.getElementById('receipt-text'),
      receipts: {
        single: document.getElementById('receipt-single'),
        multi: document.getElementById('receipt-multi'),
        r1_item: document.getElementById('r1-item'),
        r1_plan: document.getElementById('r1-plan'),
        r1_duration: document.getElementById('r1-duration'),
        r1_price: document.getElementById('r1-price'),
        rm_itemList: document.getElementById('rm-item-list'),
        rm_total: document.getElementById('rm-total'),
      }
    }
  };

  /* =========================
      STARFIELD BACKGROUND
      ========================= */
  (function starfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(350, Math.floor((W * H) / 8000));
      stars = Array.from({
        length: n
      }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + .4,
        s: Math.random() * .6 + .2,
        a: Math.random() * .6 + .4
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.y += s.s;
        s.x += s.s * .15;
        if (s.y > H) s.y = -2;
        if (s.x > W) s.x = -2;
        const tw = s.a + Math.sin((s.x + s.y) * .01) * .25;
        ctx.globalAlpha = Math.max(.15, Math.min(1, tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#cfe9ff';
        ctx.fill();
        ctx.globalAlpha = tw * .25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = '#7fbfff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    draw();
  })();

  /* =========================
      PRODUCT DATA & ASSETS
      ========================= */
  const imageFor = {
    "CapCut": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-C695-D25-1.png",
    "AlightMotion": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9675-E38-1.png",
    "Wink": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6373-C12.png",
    "Meitu": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9460-A69.png",
    "PicsArt": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-C2-C2-B1-B.png",
    "Canva": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B7-E9-D62.png",
    "VSCO": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A7-EE340.png",
    "PhotoRoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9-A11032.png",
    "Remini": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-CBAFAF8.png",
    "NordVpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-FBC099.png",
    "Express Vpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-7-D8-AC42-1.png",
    "Surfshark Vpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B51-A628.png",
    "Windows License": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-041-CB23.png",
    "Microsoft 365": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A872-E8-C.png",
    "Netflix": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-0-F69823.png",
    "Disney+": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-FEB8336.png",
    "HBO Max": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E7812-FA.png",
    "Prime Video": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-8750-DEF.png",
    "Spotify": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D73314-D.png",
    "Apple Music": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-53-CD4-A0.png?updatedAt=1764609026124",
    "Qobuz": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-953E931.png",
    "Google Drive": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-A43-DD6.png",
    "Google One": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-009-BD4-E.png",
    "iCloud": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-30-EDAEA.png",
    "ChatGPT": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6-CB3-A91-1.png",
    "Grok": "https://ik.imagekit.io/dkdlgynlu/ICON%20_1B59F27_.png",
    "Gemini Pro": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-906-D5-F0.png",
    "Flow AI": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A4B3FC6_.png?updatedAt=1768837724112",
    "NotebookLM": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_363313A_.png?updatedAt=1768837724010",
    "Zoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-5270010.png",
    "YouTube Premium": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-DCD6-D5.png",
    "YouTube Music": "https://ik.imagekit.io/dkdlgynlu/ICON%20_646108C_.png?updatedAt=1784222599196",
    "Tidal Music": "https://ik.imagekit.io/dkdlgynlu/ICON%20_FF5CFDB_.png?updatedAt=1779179229139",
    "Tinder": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-DCDE0-B9.png",
    "Telegram Premium": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A162-FC1.png",
    "Discord": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D060367.png",
    "Perplexity Ai": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-F59-EE5-A.png",
    "Flow AI": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A4B3FC6_.png?updatedAt=1768837724112",
    "NotebookLM": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_363313A_.png?updatedAt=1768837724010",
    "Claude Opus": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-087-AC47.png?updatedAt=1764609026634",
    "Claude Sonnet": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-087-AC47.png?updatedAt=1764609026634",
    "ChatGPT API": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6-CB3-A91-1.png?updatedAt=1764609028617",
    "Qwen": "https://ik.imagekit.io/dkdlgynlu/ICON%20_C2FF1C4_.png?updatedAt=1784197274777",
    "DeepSeek": "https://ik.imagekit.io/dkdlgynlu/ICON%20_E12731D_.png?updatedAt=1784197015433",
    "BSTATION": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-631-CC84.png",
    "INSHOT": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-16-13-54-58-884.png",
    "Duolingo Super": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E560-B70.png",
    "SCRIBD": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-FA4502.png",
    "WPS Office": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-49DAE75.png",
    "TradingView": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-02-36-751.png",
    "TeraBox": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-01-52-861.png",
    "PaySafeCard": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-478-B983.png",
    "TikTok Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B93-FC6-C.png",
    "TikTok Non Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B93-FC6-C.png",
    "Telegram Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-ED17968.png",
    "YouTube Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-87-A43-F1.png",
    "Facebook Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-10387-D3.png",
    "Instagram Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-01-CA830.png",
    "Custom Website Service": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-26-17-49-23-686.png",
    "Domain": "https://ik.imagekit.io/dkdlgynlu/ICON%20_6176291_.png?updatedAt=1770475710430",
    "LightRoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-75A8C0F.png",
    "Wattpad": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_DF63C42_.png",
    "Photoshop": "https://ik.imagekit.io/dkdlgynlu/Photoshop%20_83C7623_.png",
    "Adobe Creative Cloud": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_3DECB4E_.png?updatedAt=1766482936190",
    "HMA VPN": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A5A675F_.png?updatedAt=1766482936062",
    "Crunchyroll": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A70E5F8_.png",
    "Telegram Star": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_AEF396E_.png",
    "Google Play Gift Card": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_E847DAF_.png?updatedAt=1767023159606",
    "Adobe Premiere Pro": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_C6AC5BD_.png?updatedAt=1768837723586",
    "Adobe Illustrator": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_C1803E2_.png?updatedAt=1768837723546",
    "Adobe After Effects": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_EDDA3E8_.png?updatedAt=1768837723640",
    "Adobe Acrobat Pro": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_2F8B05A_.png?updatedAt=1768837722226",
    "Adobe InDesign": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_B177A1B_.png?updatedAt=1768837723406",
    "Adobe Audition": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_C04DA03_.png?updatedAt=1768837723617",
    "Adobe Animate": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_DE488C6_.png?updatedAt=1768837723581",
    "Adobe Dreamweaver": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A940617_.png?updatedAt=1768837723688",
    "Adobe Fresco": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_551D86A_.png?updatedAt=1768837723327",
    "Adobe Media Encoder": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_64C8CFC_.png?updatedAt=1768837723673",
    "Adobe Character Animator": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_0A8896F_.png?updatedAt=1768837723721",
    "Adobe Firefly": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_88B2A40_.png?updatedAt=1768837723447",
    "Adobe Bridge": "https://ik.imagekit.io/dkdlgynlu/ICON%20_A903907_.png?updatedAt=1768903201168",
"Adobe Express": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_F486975_.png?updatedAt=1768837723481",
"Adobe Capture": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_2256076_.png?updatedAt=1768837723698",
"Adobe Aero": "https://ik.imagekit.io/dkdlgynlu/ICON%20_499A5C1_.png?updatedAt=1768903451221",
"Adobe Fonts": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_7EAC5B9_.png?updatedAt=1768837723659",
    // GOOGLE PLAY REGIONS
    "Google Play Turkey": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_C5A9149_.png",
    "Google Play Indonesia": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_9D4756B_.png",
    "Google Play Brazil": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_294445A_.png",
    "Google Play South Korea": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_3A8F735_.png",
    "Google Play India": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_1A15120_.png",
    "Google Play Australia": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_9B033CA_.png",
    "Google Play Germany": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_1AEDA1C_.png",
    "Google Play France": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_8426624_.png",
    "Google Play Italy": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_21CBE50_.png",
    "Google Play Switzerland": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_9A39E21_.png",
    "Google Play Canada": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_E5C533F_.png",
    "Google Play UAE": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_3833C90_.png",
    "Google Play Poland": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_CAAF62D_.png?updatedAt=1767116441268",
    "Google Play Japan": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_42752FB_.png",
    "Google Play US": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_3BDD96E_.png",
    "Google Play UK": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_BD37C1B_.png",
    
"Apple Gift Card": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple United States": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple Japan": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple DenMark": "https://ik.imagekit.io/dkdlgynlu/New%20Project%203%20_3B4A554_.png",
"Apple Norway": "https://ik.imagekit.io/dkdlgynlu/New%20Project%203%20_31456AD_.png",
"Apple Sweden": "https://ik.imagekit.io/dkdlgynlu/New%20Project%203%20_611B85F_.png",
"Apple Poland": "https://ik.imagekit.io/dkdlgynlu/New%20Project%203%20_6F74269_.png",
"Apple UAE": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple Brazil": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple China": "https://ik.imagekit.io/dkdlgynlu/New%20Project%203%20_49F45E3_.png",
"Apple Australia": "https://ik.imagekit.io/dkdlgynlu/New%20Project%203%20_4BBF4AA_.png",
"Apple Switzerland": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple UK": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple Canada": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
"Apple India": "https://ik.imagekit.io/dkdlgynlu/quality_restoration_20260704143415179.png",
    // STEAM IMAGES
    "Steam Gift Card": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_48A1713_.png?updatedAt=1767864363832",
    "Steam Argentina": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_67858F0_.png?updatedAt=1767864363692",
    "Steam Hong Kong": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_FA03D13_.png?updatedAt=1767864363581",
    "Steam Thailand": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_CC0AB44_.png?updatedAt=1767864363831",
    "Steam Philippines": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_BA9D06B_.png?updatedAt=1767864363754",
    "Steam Malaysia": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_DB2E914_.png?updatedAt=1767864363745",
    "Steam Singapore": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_EE0C5A0_.png?updatedAt=1767864363682",
    "Steam Taiwan": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_1095A5F_.png?updatedAt=1767864363591",
    "Steam Vietnam": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_ACECCF0_.png?updatedAt=1767864363623"
  };

  const regionalProducts = {
    "Google Play Gift Card": [{
      name: "Google Play Turkey",
      img: imageFor["Google Play Turkey"]
    }, {
      name: "Google Play Indonesia",
      img: imageFor["Google Play Indonesia"]
    }, {
      name: "Google Play Brazil",
      img: imageFor["Google Play Brazil"]
    }, {
      name: "Google Play South Korea",
      img: imageFor["Google Play South Korea"]
    }, {
      name: "Google Play India",
      img: imageFor["Google Play India"]
    }, {
      name: "Google Play Australia",
      img: imageFor["Google Play Australia"]
    }, {
      name: "Google Play Germany",
      img: imageFor["Google Play Germany"]
    }, {
      name: "Google Play France",
      img: imageFor["Google Play France"]
    }, {
      name: "Google Play Italy",
      img: imageFor["Google Play Italy"]
    }, {
      name: "Google Play Switzerland",
      img: imageFor["Google Play Switzerland"]
    }, {
      name: "Google Play UK",
      img: imageFor["Google Play UK"]
    }, {
      name: "Google Play Canada",
      img: imageFor["Google Play Canada"]
    }, {
      name: "Google Play UAE",
      img: imageFor["Google Play UAE"]
    }, {
      name: "Google Play Poland",
      img: imageFor["Google Play Poland"]
    }, {
      name: "Google Play US",
      img: imageFor["Google Play US"]
    }, {
      name: "Google Play Japan",
      img: imageFor["Google Play Japan"]
    }],
    "Steam Gift Card": [{
        name: "Steam United States",
        img: imageFor["Google Play US"]
      }, {
        name: "Steam Turkey",
        img: imageFor["Google Play Turkey"]
      }, {
        name: "Steam Argentina",
        img: imageFor["Steam Argentina"]
      },
      {
        name: "Steam Thailand",
        img: imageFor["Steam Thailand"]
      }, {
        name: "Steam India",
        img: imageFor["Google Play India"]
      }, {
        name: "Steam Brazil",
        img: imageFor["Google Play Brazil"]
      },
      {
        name: "Steam Europe",
        img: imageFor["Google Play Germany"]
      }, {
        name: "Steam Philippines",
        img: imageFor["Steam Philippines"]
      }, {
        name: "Steam Indonesia",
        img: imageFor["Google Play Indonesia"]
      },
      {
        name: "Steam Singapore",
        img: imageFor["Steam Singapore"]
      }, {
        name: "Steam Malaysia",
        img: imageFor["Steam Malaysia"]
      }, {
        name: "Steam Vietnam",
        img: imageFor["Steam Vietnam"]
      },
      {
        name: "Steam United Kingdom",
        img: imageFor["Google Play UK"]
      }, {
        name: "Steam Hong Kong",
        img: imageFor["Steam Hong Kong"]
      }, {
        name: "Steam Taiwan",
        img: imageFor["Steam Taiwan"]
      }
      ],
    "Apple Gift Card": [{
        name: "Apple United States",
        img: imageFor["Google Play US"]
      }, {
        name: "Apple Japan",
        img: imageFor["Google Play Japan"]
      }, {
        name: "Apple DenMark",
        img: imageFor["Apple DenMark"]
      }, {
        name: "Apple Norway",
        img: imageFor["Apple Norway"]
      }, {
        name: "Apple Sweden",
        img: imageFor["Apple Sweden"]
      }, {
        name: "Apple Poland",
        img: imageFor["Apple Poland"]
     }, {
        name: "Apple UAE",
        img: imageFor["Google Play UAE"]
      }, {
        name: "Apple Brazil",
        img: imageFor["Google Play Brazil"]
      }, {
        name: "Apple China",
        img: imageFor["Apple China"]
      }, {
        name: "Apple Australia",
        img: imageFor["Apple Australia"]
      }, {
      name: "Apple Switzerland",
      img: imageFor["Google Play Switzerland"]
    }, {
      name: "Apple UK",
      img: imageFor["Google Play UK"]
    }, {
      name: "Apple Canada",
      img: imageFor["Google Play Canada"]
    }, {
        name: "Apple India",
        img: imageFor["Google Play India"]
     }
    ]
  };

  const customConfigs = {
    "Google Play US": {
      min: 5,
      max: 200,
      rate: 5000,
      curr: "$"
    },
    "Google Play UK": {
      min: 1,
      max: 500,
      rate: 6500,
      curr: "£"
    },
    "Google Play Australia": {
      min: 1,
      max: 500,
      rate: 6000,
      curr: "A$"
    },
    "Google Play Germany": {
      min: 1,
      max: 500,
      rate: 6000,
      curr: "€"
    },
    "Google Play France": {
      min: 1,
      max: 500,
      rate: 6000,
      curr: "€"
    },
    "Google Play Italy": {
      min: 1,
      max: 500,
      rate: 6000,
      curr: "€"
    },
    "Google Play Switzerland": {
      min: 1,
      max: 1000,
      rate: 6500,
      curr: "CHF"
    },
    "Google Play UAE": {
      min: 5,
      max: 1000,
      rate: 1380,
      curr: "AED"
    },
"Apple UAE": {
  min: 50,
  max: 500,
  rate: 1432,
  curr: "AED"
},
"Apple Canada": {
  min: 5,
  max: 500,
  rate: 3700,
  curr: "CAD"
},
"Apple UK": {
  min: 2,
  max: 200,
  rate: 7000,
  curr: "GBP"
},
"Apple Switzerland": {
  min: 2,
  max: 250,
  rate: 6500,
  curr: "CHF"
},
"Apple Australia": {
  min: 2,
  max: 2000,
  rate: 3550,
  curr: "AUD"
}
  };

  const productData = {
    "CapCut": {
      "Share": [{
        "duration": "1 Month",
        "price": "6,500 Kyats"
      }],
      "Private": [{
        "duration": "1 Week",
        "price": "4,500 Kyats"
      }, {
        "duration": "1 Month",
        "price": "15,000 Kyats"
      }],
      "Private Own Mail": [{
        "duration": "1 Month",
        "price": "18,000 Kyats"
      }]
    },
    "AlightMotion": {
      "Share": [{
        "duration": "9 Months",
        "price": "2,500 Kyats"
      }, {
        "duration": "1 Year",
        "price": "3,000 Kyats"
      }],
      "Private": [{
        "duration": "9 Months",
        "price": "3,500 Kyats"
      }, {
        "duration": "1 Year",
        "price": "4,000 Kyats"
      }],
      "Private (Own Mail)": [{
        "duration": "9 Months",
        "price": "5,500 Kyats"
      }, {
        "duration": "1 Year",
        "price": "6,000 Kyats"
      }]
    },
    "Wink": {
      "Share": [{
        "duration": "1 Month",
        "price": "7,000 Kyats"
      }, {
        "duration": "1 Year",
        "price": "50,000 Kyats"
      }],
      "Private VIP": [{
        "duration": "1 Week",
        "price": "3,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "18,000 Kyats"
      }],
      "Private VIP Plus": [{
        "duration": "1 Week",
        "price": "4,000 Kyats"
      }],
      "Private (Own Mail)": [{
        "duration": "1 Month",
        "price": "20,000 Kyats"
      }]
    },
    "Meitu": {
      "Private": [{
        "duration": "1 Week",
        "price": "Out Of Stocks"
      }, {
        "duration": "1 Month",
        "price": "14,500 Kyats"
      }, {
        "duration": "1 Year",
        "price": "99,000 Kyats"
      }]
    },
    "PicsArt": {
      "Share": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }],
      "Private": [{
        "duration": "1 Week",
        "price": "3,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "7,500 Kyats"
      }]
    },
"Canva": {
     "Share": [{
       "duration": "1 Month",
        "price": "1,500 Kyats"
      }],
    "Own Mail": [{
       "duration": "Lifetime",
       "price": "5,000 Kyats"
     }],
     "Private Business": [{
        "duration": "2 Weeks",
        "price": "3,500 Kyats"
      }, {
        "duration": "1 Month",
        "price": "6,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "18,000 Kyats"
      }],
      "Private Pro": [{
        "duration": "2 Weeks",
        "price": "3,000 Kyats"
      }]
   },
    "PhotoRoom": {
      "Private": [{
        "duration": "1 Week",
        "price": "3,000 Kyats"
      }]
    },
    "VSCO": {
      "Share": [{
        "duration": "1 Year",
        "price": "Out Of Stock"
      }],
      "Private": []
    },
    "Remini": {
      "Private": [{
        "duration": "1 Week",
        "price": "3,000 Kyats"
      }]
    },
    "Express Vpn": {
      "Private": [{
        "duration": "7 Days",
        "price": "Out Of Stock"
      }, {
        "duration": "3 Days",
        "price": "1,000 Kyats"
      }],
      "Share": [{
        "duration": "Phone (1 Month)",
        "price": "Out of stock"
      }, {
        "duration": "WindowsPC / Laptop(1 Month)",
        "price": "Out of stock"
      }, {
        "duration": "MacBook(1 Month)",
        "price": "Out of stock"
      }, {
        "duration": "Linux(1 Month)",
        "price": "Out of stock"
      }]
     
    },
    "NordVpn": {
      "Share": [{
        "duration": "1 Year",
        "price": "20,000 Kyats"
      }],
      "Private": [{
        "duration": "3 Months",
        "price": "18,000 Kyats"
      }]
    },
    "Surfshark Vpn": {
      "Share": [{
        "duration": "2 Months",
        "price": "8,000 Kyats"
      }],
      "Private": [{
        "duration": "2 Months",
        "price": "19,990 Kyats"
      }]
    },
    "Windows License": {
      "Share": [],
      "Redeem Key": [{
        "duration": "Windows 10 Pro",
        "price": "15,000 Kyats"
      }, {
        "duration": "Windows 11 Pro",
        "price": "15,000 Kyats"
      }]
    },
    "Microsoft 365": {
      "Private": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }],
      "Own Mail Invite": [{
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }, {
        "duration": "12 Months",
        "price": "50,000 Kyats"
      }],
      "Private Head": [{
        "duration": "1 Month",
        "price": "12,000 Kyats"
      }]
    },
   "Netflix": {
     "SemiPrivate Premium": [{
       "duration": "(1 Profile 1 Month)",
       "price": "15,000 Kyats"
     }, {
       "duration": "(1 Profile 2 Months)",
       "price": "27,000 Kyats"
     }, {
       "duration": "(1 Profile 3 Months)",
       "price": "39,000 Kyats"
     }],
    "SemiPrivate Standard": [{
       "duration": "(1 Profile 1 Month)",
       "price": "10,000 Kyats"
     }],
     "Whole Account": [{
       "duration": "5 Profiles (1 Month)",
       "price": "55,000 Kyats"
     }]
   },
    "Disney+": {
      "Plan Basic": [{
        "duration": "Sharing 6U (Limited Screen)",
        "price": "Out of stock"
      }],
      "Plan Premium": [{
        "duration": "Sharing 6U (Limited Screen)",
        "price": "Out of stock"
      }, {
        "duration": "Sharing 3U (No Limit)",
        "price": "Out of stock"
      }]
    },
    "HBO Max": {
      "1 Month": [{
        "duration": "1P 2U",
        "price": "8,000 Kyats"
      }, {
        "duration": "Semiprivate",
        "price": "12,000 Kyats"
      }],
      "Whole Account": [{
        "duration": "1 Month",
        "price": "40,000 Kyats"
      }]
    },
    "Prime Video": {
      "Share": [{
        "duration": "1 Month",
        "price": "4,900 Kyats"
      }],
      "Private": [{
        "duration": "1 Month",
        "price": "9,500 Kyats"
      }]
    },
    "Spotify": {
      "Private": [{
        "duration": "2 Months",
        "price": "18,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "25,000 Kyats"
      }],
      "Family Private": [{
        "duration": "2 Months",
        "price": "15,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "20,000 Kyats"
      }]
    },
    "Apple Music": {
      "Private": [{
        "duration": "1 Month (Can renew)",
        "price": "7,500 Kyats"
      }]
    },
    "Qobuz": {
      "Private": [{
        "duration": "1 Month",
        "price": "9,000 Kyats"
      }]
    },
    "Google Drive": {
      "OwnMail invite": [{
        "duration": "3 Months (+ Gemini Pro)",
        "price": "10,000 Kyats"
      },{
        "duration": "6 Months (+ Gemini Pro)",
        "price": "20,000 Kyats"
      },{
      "duration": "9 Months (+ Gemini Pro)",
        "price": "30,000 Kyats"
      },{
      "duration": "12 Months (+ Gemini Pro)",
        "price": "39,500 Kyats"
      }],
      "Share": [],
      "Private": [{
        "duration": "Lifetime",
        "price": "Out Of Stock"
      }]
    },
    "iCloud": {
      "Share": [{
        "duration": "Gift Card — 1 Month (50GB)",
        "price": "Out of stock"
      }, {
        "duration": "Invite Email — 1 Month (100GB)",
        "price": "Out of stock"
      }],
      "Private": []
    },
    "Google One": {
      "OwnMail invite": [{
        "duration": "3 Months (+ Gemini Pro)",
        "price": "10,000 Kyats"
      },{
        "duration": "6 Months (+ Gemini Pro)",
        "price": "20,000 Kyats"
      },{
      "duration": "9 Months (+ Gemini Pro)",
        "price": "30,000 Kyats"
      },{
      "duration": "12 Months (+ Gemini Pro)",
        "price": "39,500 Kyats"
      }],
      "Private": [{
        "duration": "3 Months (+ Gemini Pro)",
        "price": "Out Of Stock"
      }]
    },
    "TeraBox": {
      "Sharing": [{
        "duration": "1 Year (2TB)",
        "price": "Out Of Stock"
      }]
    },
    "ChatGPT": {
      "Private": [{
        "duration": "3 Months",
        "price": "30,000 Kyats"
      }],
      "Personal Plus (Private)": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      },
      {
        "duration": "2 Months",
        "price": "45,000 Kyats"
      },
      {
        "duration": "3 Months",
        "price": "Out Of Stock"
      }],
      "Personal Plus(Full Warrenty)": [{
        "duration": "2 Months",
        "price": "45,000 Kyats"
      }],
      "Business Plus - Invite Own Email": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }],                                     
      "Business Plus Own": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }],
      "Business Plus Own(Full Warranty)": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      },
      {
        "duration": "3 Months",
        "price": "Out Of Stock"
      }]
    },
    "Gemini Pro": {
      "OwnMail Invite": [{
        "duration": "3 Months",
        "price": "10,000 Kyats"
      }, {
        "duration": "6 Months",
        "price": "20,000 Kyats"
      }, {
        "duration": "9 Months",
        "price": "30,000 Kyats"
      }, {
        "duration": "12 Months",
        "price": "39,500 Kyats"
      }],
      "Head(Can Invite 5 Email)": [{
        "duration": "3 Months (+5 TB Storage)",
        "price": "Out Of Stock"
      }]
    },
    "Grok": {
      "Share Plan": [{
        "duration": " 1 Month",
        "price": "Out Of Stock"
      }],
      "Private Plan": [{
        "duration": "3 Days",
        "price": "4,000 Kyats"
        }, {
        "duration": "7 Days",
        "price": "7,000 Kyats"
        }, {
        "duration": "1 Month",
        "price": "Out Of Stock"
      }]
    },
  "Flow AI": {
  "OwnMail Invite": [{
    "duration": "3 Months",
    "price": "10,000 Kyats"
    }, {
    "duration": "6 Months",
    "price": "20,000 Kyats"
    }, {
    "duration": "9 Months",
    "price": "30,000 Kyats"
    }, {
    "duration": "12 Months",
    "price": "39,500 Kyats"
  }],
      "Private": [{
        "duration": "4 Months",
       "price": "Out Of Stock"
      }]
},"NotebookLM": {
  "OwnMail Invite": [{
    "duration": "3 Months",
    "price": "10,000 Kyats"
  }, {
    "duration": "6 Months",
    "price": "20,000 Kyats"
    }, {
    "duration": "9 Months",
    "price": "30,000 Kyats"
    }, {
    "duration": "12 Months",
    "price": "39,500 Kyats"
  }]
},

    "Claude Opus": {
      "50 Million token": [{
        "duration": "3 Days",
        "price": "15,000 Kyats"
      }, {
        "duration": "5 Days",
        "price": "20,000 Kyats"
      }],
      "70 Million token": [{
        "duration": "3 Days",
        "price": "27,000 Kyats"
      }, {
        "duration": "5 Days",
        "price": "32,000 Kyats"
      }],
      "100 Million token": [{
        "duration": "3 Days",
        "price": "29,000 Kyats"
      }, {
        "duration": "5 Days",
        "price": "40,000 Kyats"
      }]
    },
    "ChatGPT API": {
      "50 Million token": [{
        "duration": "3 Days",
        "price": "15,000 Kyats"
      }, {
        "duration": "5 Days",
        "price": "20,000 Kyats"
      }],
      "70 Million token": [{
        "duration": "3 Days",
        "price": "27,000 Kyats"
      }, {
        "duration": "5 Days",
        "price": "32,000 Kyats"
      }],
      "100 Million token": [{
        "duration": "3 Days",
        "price": "29,000 Kyats"
      }, {
        "duration": "5 Days",
        "price": "40,000 Kyats"
      }]
    },

"Claude Sonnet": {
      "1 Billion token": [{
        "duration": "3 Days",
        "price": "15,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "45,000 Kyats"
      }]
    },
"Qwen": {
      "1 Billion token": [{
        "duration": "3 Days",
        "price": "15,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "45,000 Kyats"
      }]
    },
"DeepSeek": {
      "1 Billion token": [{
        "duration": "3 Days",
        "price": "15,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "45,000 Kyats"
      }]
    },
    "Zoom": {
      "Private": [{
        "duration": "14 Days",
        "price": "4,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "8,599 Kyats"
      }, {
        "duration": "38~42 Days",
        "price": "10,000 Kyats"
      }]
    },
    "YouTube Premium": {
      "Private": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }, {
        "duration": "3 Months",
        "price": "20,000 Kyats"
      }],
      "OwnMail": [{
        "duration": "3 Months",
        "price": "18,000 Kyats"
      }] 
    },
     "YouTube Music": {
      "Private": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }, {
        "duration": "3 Months",
        "price": "20,000 Kyats"
      }],
      "OwnMail": [{
        "duration": "3 Months",
        "price": "18,000 Kyats"
      }] 
    },
     "Tidal Music": {
      "Private": [{
        "duration": "1 Month",
        "price": "9,000 Kyats"
      }] 
    },
    "Tinder": {
      "Tinder Plus Share": [{
        "duration": "6 Months",
        "price": "Out of stock"
      }]
    },
    "Telegram Premium": {
      "Login": [{
        "duration": "1 Month",
        "price": "21,000 Kyats"
      }, {
        "duration": "1 Year",
        "price": "112,000 Kyats"
      }],
      "Gift Plan": [{
        "duration": "3 Months",
        "price": "58,500 Kyats"
      }, {
        "duration": "6 Months",
        "price": "76,500 Kyats"
      }, {
        "duration": "12 Months",
        "price": "138,000 Kyats"
      }],
      "Link Plan": [{
        "duration": "3 Months",
        "price": "49,500 Kyats"
      }, {
        "duration": "6 Months",
        "price": "68,500 Kyats"
      }, {
        "duration": "12 Months",
        "price": "124,000 Kyats"
      }]
    },
    "Discord": {
      "Private": [{
        "duration": "3 Months",
        "price": "29,500 Kyats"
      }],
      "Sever Boost": [{
        "duration": "1 Month 14 Boost",
        "price": "36,000 Kyats"
      }, {
        "duration": "3 Months 14 Boost",
        "price": "78,000 Kyats"
      }]
    },
    "Perplexity Ai": {
      "Share": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }],
      "Private": [{
        "duration": "1 Week",
        "price": "15,000 Kyats"
      }],
      "OwnMail Private": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }]
    },
    "BSTATION": {
      "Private": [{
        "duration": "1 Month",
        "price": "13,000 Kyats"
      }],
      "Share": [{
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "14,500 Kyats"
      }, {
        "duration": "12 Months",
        "price": "30,000 Kyats"
      }],
    },
    "INSHOT": {
      "Share": [{
        "duration": "Lifetime",
        "price": "15,000 Kyats"
      }]
    },
    "Duolingo Super": {
      "Family Head": [{
        "duration": "14 Days",
        "price": "Not For Sale"
      }, {
        "duration": "1 Month",
        "price": "Not For Sale"
      }]
    },
    "SCRIBD": {
      "Private": [{
        "duration": "1 Months",
        "price": "6,000 Kyats"
      }]
    },
    "WPS Office": {
      "Share": [{
        "duration": "1 Month",
        "price": "Out Of Stock"
      }, {
        "duration": "1 Year",
        "price": "Out Of Stock"
      }]
    },
    "TradingView": {
      "Private Plus": [{
         "duration": "1 Month",
         "price": "25,000 Kyats"
      }],
        "Private Premium": [{
        "duration": "1 Month",
        "price": "30,000 Kyats"
      }]
    },
    "PaySafeCard": {
      "Account": [{
        "duration": "1 Account",
        "price": "3,000 Kyats"
      }]
    },
    "TikTok Official": {
      "Login method": [{
        "duration": "100 Coin",
        "price": "5,300 Kyats"
      }],
    "NoLoginBoost": [{
      "duration": "100 Coin",
      "price": "5,300 Kyats"
      }]
    },
    "TikTok Non Official": {
      "Views (NoDrop)": [{
        "duration": "10,000 Views",
        "price": "Out Of Stock"
      }, {
        "duration": "100,000 Views",
        "price": "Out Of Stock"
      }, {
        "duration": "1,000,000 Views",
        "price": "Out Of Stock"
      }],
      "Likes (NoDrop)": [{
        "duration": "1,000 Likes",
        "price": "Out Of Stock"
      }, {
        "duration": "10,000 Likes",
        "price": "Out Of Stock"
      }, {
        "duration": "100,000 Likes",
        "price": "Out Of Stock"
      }],
      "Package Plan": [{
        "duration": "100k Views + 10k Likes",
        "price": "Out Of Stock"
      }, {
        "duration": "1M Views + 100k Likes",
        "price": "Out Of Stock"
      }],
      "Livestream Views": [{
        "duration": "1,000 Views (15 min)",
        "price": "Out Of Stock"
      }, {
        "duration": "1,000 Views (30 min)",
        "price": "Out Of Stock"
      }, {
        "duration": "1,000 Views (60 min)",
        "price": "Out Of Stock"
      }, {
        "duration": "10,000 Views (15 min)",
        "price": "Out Of Stock"
      }],
      "Livestream Likes": [{
        "duration": "1,000 Likes",
        "price": "Out Of Stock"
      }, {
        "duration": "10,000 Likes",
        "price": "Out Of Stock"
      }, {
        "duration": "100,000 Likes",
        "price": "Out Of Stock"
      }],
      "Livestream Share": [{
        "duration": "1,000 Shares",
        "price": "Out Of Stock"
      }, {
        "duration": "10,000 Shares",
        "price": "Out Of Stock"
      }]
    },
    "Telegram Boosting": {
      "Post Views": [{
        "duration": "1,000 Views",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Views",
        "price": "1,000 Kyats"
      }, {
        "duration": "100,000 Views",
        "price": "5,000 Kyats"
      }],
      "Positive Reactions": [{
        "duration": "1,000 Reactions",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Reactions",
        "price": "3,500 Kyats"
      }],
      "Negative Reactions": [{
        "duration": "1,000 Reactions",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Reactions",
        "price": "500 Kyats"
      }],
      "Custom Reactions": [{
        "duration": "1,000 Reactions",
        "price": "500 Kyats"
      }],
      "Premium Reactions": [{
        "duration": "1,000 Reactions",
        "price": "1,000 Kyats"
      }],
      "Members (30Days Refill)": [{
        "duration": "1,000 Members",
        "price": "8,000 Kyats"
      }]
    },
    "YouTube Boosting": {
      "Livestream Views": [{
        "duration": "10,000 Views (15 min)",
        "price": "5,000 Kyats"
      }, {
        "duration": "10,000 Views (30 min)",
        "price": "10,000 Kyats"
      }],
      "Comment - Impression Type": [{
        "duration": "1,000 Comment (15 min)",
        "price": "13,500 Kyats"
      }],
      "Comment - Custom Type": [{
        "duration": "1 Comment",
        "price": "90 Kyats"
      }]
    },
    "Facebook Boosting": {
      "Video Views(Lifetime Refill)": [{
        "duration": "1,000 Views",
        "price": "1,000 Kyats"
      }, {
        "duration": "10,000 Views",
        "price": "4,500 Kyats"
      }, {
        "duration": "100,000 Views",
        "price": "40,000 Kyats"
      }, {
        "duration": "1,000,000 Views",
        "price": "390,000 Kyats"
      }],
      "Post Like(30Days Refill)": [{
        "duration": "1,000 Likes",
        "price": "4,500 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "45,000 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "430,000 Kyats"
      }],
      "Post Like(1Year Refill)": [{
        "duration": "1,000 Likes",
        "price": "5,500 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "55,000 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "530,000 Kyats"
      }],
      "Post Like(Lifetime Refill)": [{
        "duration": "1,000 Likes",
        "price": "6,500 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "65,000 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "630,000 Kyats"
      }],
      "Profile Followers(Lifetime Refill)": [{
        "duration": "1,000 Followers",
        "price": "10,000 Kyats"
      }, {
        "duration": "10,000 Followers",
        "price": "100,000 Kyats"
      }],
      "Page follower(No Drop 2Year Warranty)": [{
        "duration": "1,000 Followers",
        "price": "15,000 Kyats"
      }, {
        "duration": "10,000 Followers",
        "price": "150,000 Kyats"
      }],
      "Follower(Page&Profile)(30Days Refill)": [{
        "duration": "1,000 followers",
        "price": "3,000 Kyats"
      }, {
        "duration": "10,000 followers",
        "price": "30,000 Kyats"
      }],
      "Live Stream Views": [{
        "duration": "1,000 Views",
        "price": "10,000 Kyats"
      }]
    },
    "Instagram Boosting": {
      "Video Views & Reels(SLOW)": [{
        "duration": "1,000 Views",
        "price": "400 Kyats"
      }, {
        "duration": "10,000 Views",
        "price": "900 Kyats"
      }, {
        "duration": "100,000 Views",
        "price": "1,800 Kyats"
      }, {
        "duration": "1,000,000 Views",
        "price": "13,000 Kyats"
      }],
      "Video Views & Reels(FAST)": [{
        "duration": "1,000 Views",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Views",
        "price": "1,000 Kyats"
      }, {
        "duration": "100,000 Views",
        "price": "2,700 Kyats"
      }, {
        "duration": "1,000,000 Views",
        "price": "20,000 Kyats"
      }],
      "Likes(FAST & 30DAYS REFILL)": [{
        "duration": "1,000 Likes",
        "price": "1,500 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "15,000 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "140,000 Kyats"
      }],
      "Likes(SUPER FAST & LIFETIME)": [{
        "duration": "1,000 Likes",
        "price": "2,200 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "22,000 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "210,000 Kyats"
      }],
      "Share(Slow but Cheapest)": [{
        "duration": "1,000 Shares",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Shares",
        "price": "1,500 Kyats"
      }, {
        "duration": "100,000 Shares",
        "price": "12,000 Kyats"
      }],
      "Share(FAST)": [{
        "duration": "1,000 Shares",
        "price": "1,000 Kyats"
      }, {
        "duration": "10,000 Shares",
        "price": "2,000 Kyats"
      }, {
        "duration": "100,000 Shares",
        "price": "8,000 Kyats"
      }],
      "Save(FAST)": [{
        "duration": "1,000 Saves",
        "price": "1,000 Kyats"
      }, {
        "duration": "10,000 Saves",
        "price": "7,500 Kyats"
      }, {
        "duration": "100,000 Saves",
        "price": "72,000 Kyats"
      }],
      "Reach+Impression(Normal Speed)": [{
        "duration": "1,000 RI",
        "price": "1,000 Kyats"
      }, {
        "duration": "10,000 RI",
        "price": "8,000 Kyats"
      }, {
        "duration": "100,000 RI",
        "price": "78,000Kyats"
      }],
      "Followers(SLOW)": [{
        "duration": "1,000(30Days Refill)",
        "price": "8,000 Kyats"
      }, {
        "duration": "1,000(1Year Refill)",
        "price": "11,000 Kyats"
      }, {
        "duration": "1,000(Lifetime Refill)",
        "price": "13,500 Kyats"
      }],
      "Followers(FAST)": [{
        "duration": "1,000(30Days Refill)",
        "price": "11,000 Kyats"
      }, {
        "duration": "1,000(1Year Refill)",
        "price": "13,000 Kyats"
      }]
    },
    "Custom Website Service": {
      "Base Service": [{
        "duration": "Fully functional website",
        "price": "100,000 Kyats"
      }],
      "Normal Plan": [{
        "duration": "Custom Design & Fully Functional",
        "price": "150,000 Kyats"
      }]
    },
"Domain": {
  "My.ID/my.id": [{
    "duration": "1 Year",
    "price": "30,000 Kyats"
  }],

  "Global Domain": [{
    "duration": "1 Year (.com)",
    "price": "15,000 Kyats"
  }, {
    "duration": "1 Year (.xyz)",
    "price": "15,000 Kyats"
  }, {
    "duration": "1 Year (.net)",
    "price": "18,000 Kyats"
  }, {
    "duration": "1 Year (.org)",
    "price": "17,000 Kyats"
  }, {
    "duration": "1 Year (.link)",
    "price": "17,000 Kyats"
  }]
},
    "LightRoom": {
      "Share": [{
        "duration": "1 Year",
        "price": "Out Of Stock"
      }],
      "App&Web Private": [{
        "duration": "4 Months",
        "price": "40,000 Kyats"
      }]
    },
    "Photoshop": {
      "Web Private": [{
        "duration": "12 Months",
        "price": "Out Of Stock"
      }],
      "App&Web Private": [{
        "duration": "4 Months",
        "price": "40,000 Kyats"
      }]
    },
    "Adobe Creative Cloud": {
      "Private": [{
        "duration": "4 Months",
        "price": "40,000 Kyats"
      }]
    },
    "Adobe Premiere Pro": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Illustrator": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe After Effects": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Acrobat Pro": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe InDesign": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Audition": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Animate": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Dreamweaver": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Fresco": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Media Encoder": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Character Animator": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
    "Adobe Firefly": { "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }] },
   "Adobe Bridge": {
  "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }]
},
"Adobe Express": {
  "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }]
},
"Adobe Capture": {
  "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }]
},
"Adobe Aero": {
  "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }]
},
"Adobe Fonts": {
  "Private": [{ "duration": "4 Months", "price": "40,000 Kyats" }]
},

    "HMA VPN": {
      "Private": [{
        "duration": "1 Month",
        "price": "8,000 Kyats"
      }],
      "Share": [{
        "duration": "Phone (1 Month)",
        "price": "1,000 Kyats"
      }, {
        "duration": "WindowsPC / Laptop(1 Month)",
        "price": "2,000 Kyats"
      }]
    },
    "Crunchyroll": {
      "Share": [{
        "duration": "2 Months",
        "price": "10,000 Kyats"
      }, {
        "duration": "4 Months",
        "price": "20,000 Kyats"
      }, {
        "duration": "6 Months",
        "price": "28,000 Kyats"
      }, {
        "duration": "12 Months",
        "price": "55,000 Kyats"
      }]
    },
    "Telegram Star": {
      "Stars": [{
        "duration": "50 Stars",
        "price": "4,000 Kyats"
      }, {
        "duration": "100 Stars",
        "price": "8,000 Kyats"
      }]
    },
    "Google Play Gift Card": {
      "Select Region": []
    },
    "Apple Gift Card": {
      "Select Region": []
    },
    // STEAM REGIONS
    "Steam Gift Card": {
      "Select Region": []
    },
    "Steam United States": {
      "United States (USD)": [{
        "duration": "$5",
        "price": "28,950 Kyats"
      }, {
        "duration": "$10",
        "price": "57,500 Kyats"
      }, {
        "duration": "$20",
        "price": "107,500 Kyats"
      }, {
        "duration": "$30",
        "price": "155,000 Kyats"
      }, {
        "duration": "$50",
        "price": "260,000 Kyats"
      }, {
        "duration": "$75",
        "price": "387,500 Kyats"
      }, {
        "duration": "$100",
        "price": "520,000 Kyats"
      }]
    },
    "Steam Turkey": {
      "Turkey (TRY)": [{
        "duration": "50 TL",
        "price": "30,300 Kyats"
      }, {
        "duration": "500 TL",
        "price": "250,000 Kyats"
      }, {
        "duration": "1000 TL",
        "price": "499,950 Kyats"
      }]
    },
    "Steam Argentina": {
      "Argentina (USD)": [{
        "duration": "10 USD",
        "price": "54,700 Kyats"
      }, {
        "duration": "20 USD",
        "price": "105,000 Kyats"
      }, {
        "duration": "30 USD",
        "price": "157,500 Kyats"
      }, {
        "duration": "50 USD",
        "price": "262,600 Kyats"
      }, {
        "duration": "75 USD",
        "price": "375,000 Kyats"
      }]
    },
    "Steam Thailand": {
      "Thailand (THB)": [{
        "duration": "50 THB",
        "price": "13,500 Kyats"
      }, {
        "duration": "75 THB",
        "price": "18,000 Kyats"
      }, {
        "duration": "200 THB",
        "price": "32,000 Kyats"
      }, {
        "duration": "250 THB",
        "price": "40,000 Kyats"
      }]
    },
    "Steam India": {
      "India (INR)": [{
        "duration": "99 INR",
        "price": "6,650 Kyats"
      }, {
        "duration": "150 INR",
        "price": "8,850 Kyats"
      }, {
        "duration": "175 INR",
        "price": "10,150 Kyats"
      }, {
        "duration": "250 INR",
        "price": "14,700 Kyats"
      }, {
        "duration": "500 INR",
        "price": "29,450 Kyats"
      }, {
        "duration": "750 INR",
        "price": "48,900 Kyats"
      }, {
        "duration": "1000 INR",
        "price": "59,200 Kyats"
      }, {
        "duration": "2000 INR",
        "price": "127,550 Kyats"
      }]
    },
    "Steam Brazil": {
      "Brazil (BRL)": [{
        "duration": "27 BRL",
        "price": "25,650 Kyats"
      }, {
        "duration": "55 BRL",
        "price": "52,100 Kyats"
      }, {
        "duration": "110 BRL",
        "price": "103,700 Kyats"
      }, {
        "duration": "165 BRL",
        "price": "156,350 Kyats"
      }, {
        "duration": "275 BRL",
        "price": "260,600 Kyats"
      }]
    },
    "Steam Europe": {
      "Europe (EUR)": [{
        "duration": "5 EUR",
        "price": "30,500 Kyats"
      }, {
        "duration": "10 EUR",
        "price": "57,550 Kyats"
      }, {
        "duration": "20 EUR",
        "price": "112,850 Kyats"
      }, {
        "duration": "25 EUR",
        "price": "148,900 Kyats"
      }, {
        "duration": "30 EUR",
        "price": "168,700 Kyats"
      }, {
        "duration": "35 EUR",
        "price": "208,550 Kyats"
      }]
    },
    "Steam Philippines": {
      "Philippines (PHP)": [{
        "duration": "800 PHP",
        "price": "69,500 Kyats"
      }, {
        "duration": "1,000 PHP",
        "price": "86,875 Kyats"
      }, {
        "duration": "2,200 PHP",
        "price": "199,950 Kyats"
      }]
    },
    "Steam Indonesia": {
      "Indonesia (IDR)": [{
        "duration": "250,000 IDR",
        "price": "78,200 Kyats"
      }, {
        "duration": "400,000 IDR",
        "price": "124,350 Kyats"
      }, {
        "duration": "600,000 IDR",
        "price": "185,700 Kyats"
      }]
    },
    "Steam Singapore": {
      "Singapore (SGD)": [{
        "duration": "5 SGD",
        "price": "19,800 Kyats"
      }, {
        "duration": "10 SGD",
        "price": "39,500 Kyats"
      }, {
        "duration": "20 SGD",
        "price": "79,000 Kyats"
      }, {
        "duration": "30 SGD",
        "price": "138,800 Kyats"
      }, {
        "duration": "50 SGD",
        "price": "198,000 Kyats"
      }]
    },
    "Steam Malaysia": {
      "Malaysia (MYR)": [{
        "duration": "50 MYR",
        "price": "63,500 Kyats"
      }, {
        "duration": "100 MYR",
        "price": "126,800 Kyats"
      }, {
        "duration": "200 MYR",
        "price": "252,500 Kyats"
      }]
    },
    "Steam Vietnam": {
      "Vietnam (VND)": [{
        "duration": "75,000 VND",
        "price": "14,600 Kyats"
      }, {
        "duration": "100,000 VND",
        "price": "19,400 Kyats"
      }, {
        "duration": "120,000 VND",
        "price": "23,300 Kyats"
      }, {
        "duration": "200,000 VND",
        "price": "40,250 Kyats"
      }, {
        "duration": "500,000 VND",
        "price": "97,200 Kyats"
      }]
    },
    "Steam United Kingdom": {
      "United Kingdom (GBP)": [{
        "duration": "5 GBP",
        "price": "37,850 Kyats"
      }, {
        "duration": "10 GBP",
        "price": "75,350 Kyats"
      }, {
        "duration": "20 GBP",
        "price": "150,150 Kyats"
      }, {
        "duration": "25 GBP",
        "price": "187,850 Kyats"
      }]
    },
    "Steam Hong Kong": {
      "Hong Kong (HKD)": [{
        "duration": "40 HKD",
        "price": "26,200 Kyats"
      }, {
        "duration": "50 HKD",
        "price": "32,750 Kyats"
      }, {
        "duration": "80 HKD",
        "price": "52,400 Kyats"
      }, {
        "duration": "100 HKD",
        "price": "65,500 Kyats"
      }, {
        "duration": "200 HKD",
        "price": "130,950 Kyats"
      }, {
        "duration": "300 HKD",
        "price": "196,450 Kyats"
      }]
    },
    "Steam Taiwan": {
      "Taiwan (TWD)": [{
        "duration": "100 TWD",
        "price": "16,150 Kyats"
      }, {
        "duration": "150 TWD",
        "price": "24,450 Kyats"
      }, {
        "duration": "200 TWD",
        "price": "32,200 Kyats"
      }, {
        "duration": "300 TWD",
        "price": "49,000 Kyats"
      }, {
        "duration": "400 TWD",
        "price": "65,250 Kyats"
      }, {
        "duration": "800 TWD",
        "price": "129,700 Kyats"
      }, {
        "duration": "1000 TWD",
        "price": "161,000 Kyats"
      }]
    },
"Apple United States": {
  "United States (USD)": [{
    "duration": "$2",
    "price": "9,700 Kyats"
  }, {
    "duration": "$5",
    "price": "24,300 Kyats"
  }, {
    "duration": "$10",
    "price": "48,500 Kyats"
  }, {
    "duration": "$20",
    "price": "97,000 Kyats"
  }, {
    "duration": "$25",
    "price": "121,300 Kyats"
  }, {
    "duration": "$40",
    "price": "194,000 Kyats"
  }, {
    "duration": "$50",
    "price": "242,500 Kyats"
  }, {
    "duration": "$60",
    "price": "291,000 Kyats"
  }, {
    "duration": "$100",
    "price": "485,000 Kyats"
  }, {
    "duration": "$150",
    "price": "727,600 Kyats"
  }, {
    "duration": "$200",
    "price": "970,000 Kyats"
  }, {
    "duration": "$250",
    "price": "1,210,000 Kyats"
  }, {
    "duration": "$300",
    "price": "1,450,000 Kyats"
  }, {
    "duration": "$400",
    "price": "1,920,000 Kyats"
  }, {
    "duration": "$500",
    "price": "2,400,000 Kyats"
  }]
},
"Apple Japan": {
  "Japan Region (JPY)": [
    {
      "duration": "500 JPY",
      "price": "16,700 Kyats"
    },
    {
      "duration": "1,000 JPY",
      "price": "33,400 Kyats"
    },
    {
      "duration": "2,000 JPY",
      "price": "66,900 Kyats"
    },
    {
      "duration": "3,000 JPY",
      "price": "100,300 Kyats"
    },
    {
      "duration": "4,000 JPY",
      "price": "131,200 Kyats"
    },
    {
      "duration": "5,000 JPY",
      "price": "167,200 Kyats"
    },
    {
      "duration": "10,000 JPY",
      "price": "334,300 Kyats"
    },
    {
      "duration": "30,000 JPY",
      "price": "983,700 Kyats"
    },
    {
      "duration": "50,000 JPY",
      "price": "1,639,000 Kyats"
    },
    {
      "duration": "70,000 JPY",
      "price": "2,295,200 Kyats"
    }
  ]
},
"Apple DenMark": {
  "DenMark Region (DKK)": [{
    "duration": "20 DKK",
    "price": "16,100 Kyats"
  }, {
    "duration": "25 DKK",
    "price": "20,200 Kyats"
  }, {
    "duration": "30 DKK",
    "price": "24,100 Kyats"
  }, {
    "duration": "40 DKK",
    "price": "32,200 Kyats"
  }, {
    "duration": "50 DKK",
    "price": "40,300 Kyats"
  }, {
    "duration": "100 DKK",
    "price": "80,500 Kyats"
  }, {
    "duration": "150 DKK",
    "price": "120,800 Kyats"
  }, {
    "duration": "200 DKK",
    "price": "161,000 Kyats"
  }, {
    "duration": "250 DKK",
    "price": "201,200 Kyats"
  }, {
    "duration": "300 DKK",
    "price": "241,500 Kyats"
  }, {
    "duration": "400 DKK",
    "price": "322,000 Kyats"
  }, {
    "duration": "500 DKK",
    "price": "402,400 Kyats"
  }, {
    "duration": "1000 DKK",
    "price": "804,900 Kyats"
  }]
},
"Apple Norway": {
  "Norway Region (NOK)": [{
    "duration": "20 NOK",
    "price": "10,800 Kyats"
  }, {
    "duration": "30 NOK",
    "price": "16,200 Kyats"
  }, {
    "duration": "40 NOK",
    "price": "21,600 Kyats"
  }, {
    "duration": "50 NOK",
    "price": "27,100 Kyats"
  }, {
    "duration": "100 NOK",
    "price": "54,100 Kyats"
  }, {
    "duration": "150 NOK",
    "price": "81,100 Kyats"
  }, {
    "duration": "200 NOK",
    "price": "108,200 Kyats"
  }, {
    "duration": "250 NOK",
    "price": "135,200 Kyats"
  }, {
    "duration": "300 NOK",
    "price": "161,900 Kyats"
  }, {
    "duration": "500 NOK",
    "price": "270,400 Kyats"
  }, {
    "duration": "1000 NOK",
    "price": "540,800 Kyats"
  }]
},
"Apple Sweden": {
  "Sweden Region (SEK)": [{
    "duration": "20 SEK",
    "price": "10,900 Kyats"
  }, {
    "duration": "25 SEK",
    "price": "13,600 Kyats"
  }, {
    "duration": "30 SEK",
    "price": "16,300 Kyats"
  }, {
    "duration": "40 SEK",
    "price": "21,700 Kyats"
  }, {
    "duration": "50 SEK",
    "price": "27,200 Kyats"
  }, {
    "duration": "100 SEK",
    "price": "54,400 Kyats"
  }, {
    "duration": "150 SEK",
    "price": "81,600 Kyats"
  }, {
    "duration": "200 SEK",
    "price": "108,800 Kyats"
  }, {
    "duration": "250 SEK",
    "price": "136,000 Kyats"
  }, {
    "duration": "300 SEK",
    "price": "162,900 Kyats"
  }, {
    "duration": "400 SEK",
    "price": "217,200 Kyats"
  }, {
    "duration": "500 SEK",
    "price": "272,000 Kyats"
  }, {
    "duration": "750 SEK",
    "price": "406,900 Kyats"
  }, {
    "duration": "1000 SEK",
    "price": "544,000 Kyats"
  }]
},

"Apple Poland": {
  "Poland Region (PLN)": [{
    "duration": "20 PLN",
    "price": "29,400 Kyats"
  }, {
    "duration": "25 PLN",
    "price": "36,900 Kyats"
  }, {
    "duration": "50 PLN",
    "price": "73,900 Kyats"
  }, {
    "duration": "100 PLN",
    "price": "147,400 Kyats"
  }, {
    "duration": "150 PLN",
    "price": "221,500 Kyats"
  }, {
    "duration": "200 PLN",
    "price": "295,300 Kyats"
  }]
},

"Apple China": {
  "China Region (CNY)": [{
    "duration": "20 CNY",
    "price": "15,700 Kyats"
  }, {
    "duration": "30 CNY",
    "price": "23,500 Kyats"
  }, {
    "duration": "50 CNY",
    "price": "39,200 Kyats"
  }, {
    "duration": "68 CNY",
    "price": "53,300 Kyats"
  }, {
    "duration": "100 CNY",
    "price": "78,500 Kyats"
  }, {
    "duration": "200 CNY",
    "price": "156,900 Kyats"
  }, {
    "duration": "300 CNY",
    "price": "226,300 Kyats"
  }, {
    "duration": "500 CNY",
    "price": "392,200 Kyats"
  }, {
    "duration": "1000 CNY",
    "price": "782,700 Kyats"
  }]
},

"Apple Brazil": {
  "Brazil Region (BRL)": [{
    "duration": "20 BRL",
    "price": "21,000 Kyats"
  }, {
    "duration": "30 BRL",
    "price": "31,500 Kyats"
  }, {
    "duration": "40 BRL",
    "price": "42,000 Kyats"
  }, {
    "duration": "50 BRL",
    "price": "52,400 Kyats"
  }, {
    "duration": "75 BRL",
    "price": "78,600 Kyats"
  }, {
    "duration": "100 BRL",
    "price": "104,800 Kyats"
  }, {
    "duration": "150 BRL",
    "price": "155,800 Kyats"
  }, {
    "duration": "200 BRL",
    "price": "207,700 Kyats"
  }]
},

"Apple India": {
  "India Region (INR)": [{
    "duration": "100 INR",
    "price": "6,400 Kyats"
  }, {
    "duration": "200 INR",
    "price": "12,800 Kyats"
  }, {
    "duration": "250 INR",
    "price": "15,900 Kyats"
  }, {
    "duration": "500 INR",
    "price": "31,700 Kyats"
  }, {
    "duration": "1000 INR",
    "price": "63,400 Kyats"
  }, {
    "duration": "1500 INR",
    "price": "95,700 Kyats"
  }, {
    "duration": "2000 INR",
    "price": "126,800 Kyats"
  }, {
    "duration": "2500 INR",
    "price": "158,400 Kyats"
  }, {
    "duration": "3000 INR",
    "price": "191,500 Kyats"
  }, {
    "duration": "4000 INR",
    "price": "255,300 Kyats"
  }, {
    "duration": "5000 INR",
    "price": "316,900 Kyats"
  }, {
    "duration": "7500 INR",
    "price": "419,000 Kyats"
  }, {
    "duration": "10000 INR",
    "price": "633,700 Kyats"
  }]
},
"Apple UAE": {
  "Custom Amount": []
},

"Apple Canada": {
  "Custom Amount": []
},

"Apple UK": {
  "Custom Amount": []
},

"Apple Switzerland": {
  "Custom Amount": []
},

"Apple Australia": {
  "Custom Amount": []
},
    // GOOGLE PLAY
    "Google Play Japan": {
      "Japan Region (¥)": [{
        "duration": "¥500",
        "price": "17,500 Kyats"
      }, {
        "duration": "¥1,000",
        "price": "35,000 Kyats"
      }, {
        "duration": "¥1,500",
        "price": "52,500 Kyats"
      }]
    },
    "Google Play US": {
      "US Region ($)": [{
        "duration": "$5",
        "price": "25,000 Kyats"
      }, {
        "duration": "$10",
        "price": "50,000 Kyats"
      }, {
        "duration": "$50",
        "price": "250,000 Kyats"
      }, {
        "duration": "$100",
        "price": "500,000 Kyats"
      }]
    },
    "Google Play UK": {
      "UK Region (£)": [{
        "duration": "£5",
        "price": "32,500 Kyats"
      }, {
        "duration": "£10",
        "price": "65,000 Kyats"
      }, {
        "duration": "£50",
        "price": "325,000 Kyats"
      }, {
        "duration": "£100",
        "price": "650,000 Kyats"
      }, {
        "duration": "£500",
        "price": "3,250,000 Kyats"
      }]
    },
    "Google Play Turkey": {
      "Turkey Region (TL)": [{
        "duration": "25 TL",
        "price": "3,150 Kyats"
      }, {
        "duration": "50 TL",
        "price": "6,300 Kyats"
      }, {
        "duration": "75 TL",
        "price": "9,450 Kyats"
      }, {
        "duration": "100 TL",
        "price": "12,600 Kyats"
      }]
    },
    "Google Play Indonesia": {
      "Indonesia Region (IDR)": [{
        "duration": "5,000 IDR",
        "price": "1,450 Kyats"
      }, {
        "duration": "10,000 IDR",
        "price": "2,900 Kyats"
      }, {
        "duration": "100,000 IDR",
        "price": "29,000 Kyats"
      }]
    },
    "Google Play Brazil": {
      "Brazil Region (BRL)": [{
        "duration": "15 BRL",
        "price": "14,500 Kyats"
      }, {
        "duration": "20 BRL",
        "price": "19,333 Kyats"
      }, {
        "duration": "25 BRL",
        "price": "24,167 Kyats"
      }, {
        "duration": "30 BRL",
        "price": "29,000 Kyats"
      }, {
        "duration": "40 BRL",
        "price": "38,667 Kyats"
      }, {
        "duration": "50 BRL",
        "price": "48,333 Kyats"
      }, {
        "duration": "75 BRL",
        "price": "72,500 Kyats"
      }, {
        "duration": "150 BRL",
        "price": "145,000 Kyats"
      }, {
        "duration": "250 BRL",
        "price": "241,667 Kyats"
      }, {
        "duration": "300 BRL",
        "price": "290,000 Kyats"
      }]
    },
    "Google Play South Korea": {
      "Korea Region (₩)": [{
        "duration": "5,000 ₩",
        "price": "18,500 Kyats"
      }, {
        "duration": "10,000 ₩",
        "price": "37,000 Kyats"
      }, {
        "duration": "30,000 ₩",
        "price": "111,000 Kyats"
      }]
    },
    "Google Play India": {
      "India Region (₹)": [{
        "duration": "10 ₹",
        "price": "800 Kyats"
      }, {
        "duration": "25 ₹",
        "price": "1,725 Kyats"
      }, {
        "duration": "30 ₹",
        "price": "2,010 Kyats"
      }, {
        "duration": "50 ₹",
        "price": "2,935 Kyats"
      }, {
        "duration": "100 ₹",
        "price": "5,875 Kyats"
      }, {
        "duration": "300 ₹",
        "price": "17,625 Kyats"
      }, {
        "duration": "500 ₹",
        "price": "29,375 Kyats"
      }, {
        "duration": "1000 ₹",
        "price": "58,750 Kyats"
      }]
    },
    "Google Play Australia": {
      "Australia Region (A$)": [{
        "duration": "$5",
        "price": "30,000 Kyats"
      }, {
        "duration": "$10",
        "price": "60,000 Kyats"
      }, {
        "duration": "$50",
        "price": "300,000 Kyats"
      }, {
        "duration": "$100",
        "price": "600,000 Kyats"
      }]
    },
    "Google Play Germany": {
      "Germany Region (€)": [{
        "duration": "€5",
        "price": "30,000 Kyats"
      }, {
        "duration": "€10",
        "price": "60,000 Kyats"
      }, {
        "duration": "€50",
        "price": "300,000 Kyats"
      }, {
        "duration": "€100",
        "price": "600,000 Kyats"
      }]
    },
    "Google Play France": {
      "France Region (€)": [{
        "duration": "€5",
        "price": "30,000 Kyats"
      }, {
        "duration": "€10",
        "price": "60,000 Kyats"
      }, {
        "duration": "€50",
        "price": "300,000 Kyats"
      }, {
        "duration": "€100",
        "price": "600,000 Kyats"
      }]
    },
    "Google Play Italy": {
      "Italy Region (€)": [{
        "duration": "€5",
        "price": "30,000 Kyats"
      }, {
        "duration": "€10",
        "price": "60,000 Kyats"
      }, {
        "duration": "€50",
        "price": "300,000 Kyats"
      }, {
        "duration": "€100",
        "price": "600,000 Kyats"
      }]
    },
    "Google Play Switzerland": {
      "Switzerland Region (CHF)": [{
        "duration": "5 CHF",
        "price": "32,500 Kyats"
      }, {
        "duration": "10 CHF",
        "price": "65,000 Kyats"
      }, {
        "duration": "50 CHF",
        "price": "325,000 Kyats"
      }, {
        "duration": "100 CHF",
        "price": "650,000 Kyats"
      }]
    },
    "Google Play Canada": {
      "Canada Region (C$)": [{
        "duration": "$10",
        "price": "49,300 Kyats"
      }, {
        "duration": "$20",
        "price": "80,000 Kyats"
      }, {
        "duration": "$30",
        "price": "118,850 Kyats"
      }, {
        "duration": "$75",
        "price": "297,150 Kyats"
      }, {
        "duration": "$100",
        "price": "396,200 Kyats"
      }]
    },
    "Google Play Poland": {
      "Poland Region (PLN)": [{
        "duration": "20 PLN",
        "price": "29,500 Kyats"
      }, {
        "duration": "30 PLN",
        "price": "36,650 Kyats"
      }, {
        "duration": "50 PLN",
        "price": "73,400 Kyats"
      }, {
        "duration": "75 PLN",
        "price": "100,400 Kyats"
      }, {
        "duration": "150 PLN",
        "price": "220,000 Kyats"
      }]
    },
    "Google Play UAE": {
      "UAE Region (AED)": []
    }
  };
  const deviceSupport = {
    "CapCut": ["android", "ios", "pc"],
    "AlightMotion": ["android", "ios"],
    "Wink": ["android", "ios"],
    "Meitu": ["android", "ios"],
    "PicsArt": ["android", "ios", "pc"],
    "Canva": ["android", "ios", "pc"],
    "VSCO": ["android", "ios"],
    "PhotoRoom": ["android", "ios"],
    "Remini": ["android", "ios"],
    "NordVpn": ["android", "ios", "pc"],
    "Express Vpn": ["android", "ios", "pc"],
    "Surfshark Vpn": ["android", "ios", "pc"],
    "Windows License": ["pc"],
    "Microsoft 365": ["pc", "android", "ios"],
    "Netflix": ["android", "ios", "pc", "tv"],
    "Disney+": ["android", "ios", "pc", "tv"],
    "HBO Max": ["android", "ios", "pc", "tv"],
    "Prime Video": ["android", "ios", "pc", "tv"],
    "Spotify": ["android", "ios", "pc"],
    "Apple Music": ["android", "pc"],
    "Qobuz": ["android", "ios", "pc"],
    "Google Drive": ["android", "ios", "pc"],
    "iCloud": ["ios", "pc"],
    "Google One": ["android", "ios", "pc"],
    "TeraBox": ["android", "ios", "pc"],
    "ChatGPT": ["android", "ios", "pc"],
    "Grok": ["android", "ios", "pc"],
    "Gemini Pro": ["android", "ios", "pc"],
    "Claude Opus": ["pc", "android", "ios"],
    "Flow AI": ["android", "ios", "pc"],
    "NotebookLM": ["android", "ios", "pc"],
    "Zoom": ["pc", "android", "ios"],
    "YouTube Premium": ["pc", "android", "ios", "tv"],
    "YouTube Music": ["pc", "android", "ios", "tv"],
    "Tidal Music": ["pc", "android", "ios"],
    "Tinder": ["android", "ios"],
    "Telegram Premium": ["android", "ios", "pc"],
    "Discord": ["android", "ios", "pc"],
    "Perplexity Ai": ["android", "ios", "pc"],
    "BSTATION": ["android", "ios", "pc", "tv"],
    "INSHOT": ["android"],
    "Duolingo Super": ["android", "ios", "pc"],
    "SCRIBD": ["android", "ios", "pc"],
    "WPS Office": ["android", "ios", "pc"],
    "TradingView": ["android", "ios", "pc"],
    "PaySafeCard": [],
    "TikTok Official": ["android", "ios", "pc"],
    "TikTok Non Official": ["android", "ios", "pc"],
    "Telegram Boosting": ["android", "ios", "pc"],
    "YouTube Boosting": ["android", "ios", "pc"],
    "Facebook Boosting": ["android", "ios", "pc"],
    "Instagram Boosting": ["android", "ios", "pc"],
    "Custom Website Service": ["pc"],
    "LightRoom": ["android", "ios", "pc"],
    "Photoshop": ["pc"],
    "Adobe Creative Cloud": ["pc", "android", "ios"],
    "Adobe Premiere Pro": ["pc"],
    "Adobe Illustrator": ["pc", "ios"],
    "Adobe After Effects": ["pc"],
    "Adobe Acrobat Pro": ["pc", "android", "ios"],
    "Adobe InDesign": ["pc"],
    "Adobe Audition": ["pc"],
    "Adobe Animate": ["pc"],
    "Adobe Dreamweaver": ["pc"],
    "Adobe Fresco": ["ios", "pc"],
    "Adobe Media Encoder": ["pc"],
    "Adobe Character Animator": ["pc"],
    "Adobe Firefly": ["pc", "android", "ios"],
    "Adobe Bridge": ["pc"],
"Adobe Express": ["android", "ios", "pc"],
"Adobe Capture": ["android", "ios"],
"Adobe Aero": ["ios", "pc"],
"Adobe Fonts": ["pc", "android", "ios"],
    "HMA VPN": ["pc", "android"],
    "Crunchyroll": ["android", "ios", "pc"],
    "Telegram Star": ["android", "ios", "pc"],
    "Google Play Gift Card": [],
    // GOOGLE PLAY REGIONS (EMPTY = NO ICONS)
    "Google Play Turkey": [],
    "Google Play Indonesia": [],
    "Google Play Brazil": [],
    "Google Play South Korea": [],
    "Google Play India": [],
    "Google Play Australia": [],
    "Google Play Germany": [],
    "Google Play France": [],
    "Google Play Italy": [],
    "Google Play Switzerland": [],
    "Google Play Canada": [],
    "Google Play UAE": [],
    "Google Play Poland": [],
    "Google Play Japan": [],
    "Google Play US": [],
    "Google Play UK": [],
    // STEAM REGIONS (EMPTY = NO ICONS)
    "Steam Gift Card": [],
    "Steam United States": [],
    "Steam Turkey": [],
    "Steam Argentina": [],
    "Steam Hong Kong": [],
    "Steam India": [],
    "Steam Brazil": [],
    "Steam Europe": [],
    "Steam Thailand": [],
    "Steam Indonesia": [],
    "Steam Philippines": [],
    "Steam Malaysia": [],
    "Steam Singapore": [],
    "Steam United Kingdom": [],
    "Steam Taiwan": [],
    "Steam Vietnam": []
  };

  const deviceIconMap = {
    "android": '<i class="fa-brands fa-android"></i>',
    "ios": '<i class="fa-brands fa-apple"></i>',
    "pc": '<i class="fa-solid fa-desktop"></i>',
    "tv": '<i class="fa-solid fa-tv"></i>'
  };

  /* =========================
    ADOBE GROUP (shared notes)
    ========================= */
const adobeGroup = [
  "Photoshop",
  "LightRoom",
  "Adobe Creative Cloud",
  "Adobe Premiere Pro",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Adobe Acrobat Pro",
  "Adobe InDesign",
  "Adobe Audition",
  "Adobe Animate",
  "Adobe Dreamweaver",
  "Adobe Fresco",
  "Adobe Media Encoder",
  "Adobe Character Animator",
  "Adobe Firefly"
];
  
  /* =========================
      STATE
      ========================= */
  let cart = [];
  let lastScroll = 0;
  let lastRegionalScroll = 0;
  let lastViewBeforeCheckout = 'home';
  let productCards = [];

  /* =========================
      UTILITY FUNCTIONS
      ========================= */
  const escapeHTML = s => String(s).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);

  const parseKyats = t => {
    const m = (t || "").replace(/,/g, "").replace(/Ks/g, "").replace(/≈/g, "").trim().match(/(\d+(\.\d+)?)/);
    return m ? Number(m[1]) : null;
  };
// =========================
// DOMAIN CHECK (.my.id)
// =========================
async function checkMyIdAvailability(name) {
  const clean = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  if (!clean) return { status: "invalid" };

  const domain = clean + ".my.id";

  try {
    const res = await fetch("https://rdap.org/domain/" + domain);

    if (res.status === 404) return { status: "available", domain };
    if (res.ok) return { status: "taken", domain };

    return { status: "unknown", domain };
  } catch (e) {
    return { status: "error", domain };
  }
}
// =========================
// GLOBAL DOMAIN CHECK
// =========================
async function checkGlobalDomainAvailability(name, extension) {
  const clean = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  const allowedExtensions = [
    ".com",
    ".xyz",
    ".net",
    ".org",
    ".link"
  ];

  if (!clean || !allowedExtensions.includes(extension)) {
    return {
      status: "invalid"
    };
  }

  const domain = clean + extension;

  try {
    const res = await fetch(
      "https://rdap.org/domain/" + domain
    );

    if (res.status === 404) {
      return {
        status: "available",
        domain
      };
    }

    if (res.ok) {
      return {
        status: "taken",
        domain
      };
    }

    return {
      status: "unknown",
      domain
    };
  } catch (e) {
    return {
      status: "error",
      domain
    };
  }
}
  const formatKyats = n => (n || 0).toLocaleString("en-US") + " Kyats";
  // ===============================
  // TOTAL UNITS HELPER (100 Coin x5 → 500 Coins)
  // ===============================
  function computeTotalUnits(duration, qty) {
  if (!duration || !qty || qty <= 1) return null;

  // grab first "<number> <word>" found (e.g. "100 Coin", "10,000 Views", "3 Months")
  const m = String(duration)
    .replace(/,/g, "")
    .match(/\b(\d+(?:\.\d+)?)\s*([A-Za-z]+)\b/);

  if (!m) return null;

  const baseNum = Number(m[1]);
  let unit = m[2];

  // only allow units we actually want to show totals for
  const allowedUnits = new Set([
    "Coin","Coins",
    "Star","Stars",
    "View","Views",
    "Like","Likes",
    "Follower","Followers",
    "Member","Members"
  ]);

  if (!allowedUnits.has(unit)) return null;

  const total = baseNum * qty;

  // normalize plural (Coin -> Coins, Month -> Months, etc.)
  const pluralMap = {
    Coin:"Coins",
    Star:"Stars",
    View:"Views",
    Like:"Likes",
    Follower:"Followers",
    Member:"Members",
    Month:"Months",
    Year:"Years",
    Day:"Days",
    Week:"Weeks"
  };

  if (total !== 1 && pluralMap[unit]) unit = pluralMap[unit];

  return `Total • ${total.toLocaleString("en-US")} ${unit}`;
}
  /* =========================
   PRODUCT HELPER POPUP SYSTEM (ALL PRODUCTS)
   ========================= */
// Products listed here will NOT show the floating helper buttons
const helperDisabledProducts = [
  "Telegram Star",
  "TeraBox",
  "iCloud",
  "WPS Office",
  "Photoshop",
  "LightRoom",
  "Premiere Pro",
  "Illustrator",
  "After Effects",
  "Acrobat Pro",
  "InDesign",
  "Audition",
  "Animate",
  "Dreamweaver",
  "Adobe Bridge",
  "Adobe Express",
  "Adobe Capture",
  "Adobe Aero",
  "Adobe Fonts",
  "Fresco",
  "Media Encoder",
  "Character Animator",
  "Firefly (AI)"
];  

let _helperTimer = null;

const REGIONAL_PARENT_PRODUCTS = [
  "Google Play Gift Card",
  "Steam Gift Card",
  "Apple Gift Card"
];

const HELPER_ONCE_REGIONAL_PARENTS = [
  "Steam Gift Card",
  "Apple Gift Card"
];

let activeRegionalHelperParent = null;
const regionalHelperSeen = new Set();

function getRegionalParent(productName) {
  for (const parentName of REGIONAL_PARENT_PRODUCTS) {
    if (productName === parentName) return parentName;

    const regions = regionalProducts[parentName] || [];
    if (regions.some(region => region.name === productName)) {
      return parentName;
    }
  }

  return null;
}

function isHelperOnceRegionalParent(parentName) {
  return HELPER_ONCE_REGIONAL_PARENTS.includes(parentName);
}

function resetActiveRegionalHelper() {
  if (activeRegionalHelperParent) {
    regionalHelperSeen.delete(activeRegionalHelperParent);
  }

  activeRegionalHelperParent = null;
}

function removeProductHelper() {
  if (_helperTimer) {
    clearTimeout(_helperTimer);
    _helperTimer = null;
  }
  const old = document.getElementById("product-helper-wrap");
  if (old) old.remove();
}
/* =========================
   POPUP TEXT CONFIG (ALL PRODUCTS)
   ========================= */

const popupTextByProduct = {
  "CapCut": {
    title: "CapCut Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်းCapCut မာရ္စေးချယ်စရာPlanသုံးခုရှိပါတယ်။ Share,Private,OwnMail",
    "ဘာကွာလဲဆိုရင်....သိထားရမာကProချင်းတူတူပါပဲ။ အရင်ဆုံးSharePlanကဘယ်လိုလဲဆိုရင်။ သူကဝယ်ရင်တခြားလူ 2ယောက် 2 Devicesဝင်ပီးသားအကောင့်ကိုရမာပါ။ Riskတေရှိတယ်၊ကိုယ်က1 deviceပဲဝင်လို့ရမယ်။ ကိုယ်ကဖြစ်ဖြစ်တခြားနှစ်ယောက်ကဖြစ်ဖြစ် device limit ကျော်ဝင်ခဲ့ရင်အကောင့်ကပျက်သွားမာပါတစ်လမပြည့်ခင်။",
    "Shareအကောင့်မလို့ကျနော့်ဘက်က Warranty 25 ပေးပါတယ်။ 25ရက်က Pro Subscription ကိုပေးတာပါ။ ဥပမာ Pro ပြုတ်သွားတာတေဘာတေဆိုချက်ချင်းလဲပေးပါတယ်။ Device တေ Limit ပြတာကိုတော့ 1 ခါပဲလဲပေးပါတယ်။ အခြေနေအရပိုလဲပေးတာမျိုးရှိနိုင်‌ပေမဲ့ တခုခုဖြစ်လာခဲ့ရင်ဘယ်သူကပိုဝင်လဲမသိနိုင်လို့ Warranty မပေးတာပါနားလည်ပေးပါ။",
    "သူကအကောင့်ကိုအပိုင်ရတာပါ။ ဖုန်းထဲထည့်ထားရတဲ့Gmailမဟုတ်ပါဘူး။ CapCut appထဲမာထည့်သုံးရတဲ့TempEmailပါ။ ကျနော်တို့ဘက်ကအကောင့်ပေးမာပါ။ ပေးတဲ့အကောင့်ကို CapCut appရဲ့ Email sign inမာဝင်သုံးရုံပါပဲ။",
    "သူကဝယ်သူရဲ့ email ကိုလုပ်ပေးတာပါ။ CapCut ဖွင့်ပီးသား Account ရောမဖွင့်ရသေးတာရောရပါတယ်။ OwnMail ရော Private ရောကကုန်ရင်သက်တန်းတိုးသွားလို့ရပါတယ်။",
    "Share Planကဖုန်းတလုံးပဲသုံးလို့ရပါတယ်။ Private and OwnMail က Android, iOS, PC, Laptop All Device ရပါတယ်။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "ဆက်ရန်",
    "Privateကရော?",
    "OwnMailကရော?",
    "All Devices<br>ရလား?"
  ]
  },
"AlightMotion": {
    title: "AlightMotion Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း AlightMotion မာရ္စေးချယ်စရာPlanသုံးခုရှိပါတယ်။ Share,Private,OwnMail",
    "ဘာကွာလဲဆိုရင်....သိထားရမာကProချင်းတူတူပါပဲ။ အရင်ဆုံးSharePlanကဘယ်လိုလဲဆိုရင်။ သူကဝယ်ရင်တခြားလူ 7ယောက်နဲ့တူတူသုံးရမာပါ။ ဒါမဲ့စိတ်မပူပါနဲ့ Project တေကတော့မရောပါဘူး Private ပဲသုံးရမာပါ။",
    "6လအတွင်းတခုခုဖြစ်ခဲ့ရင်တခါပြန်လဲပေးပါတယ်။ Shareမို့လို့တခါပါပဲ။ Device changeလို့လဲမရပါ။ (ဆိုလိုတာကကိုယ်ကဖုန်းတခုနဲ့ဝင်ပီး‌၊နောက်ပိုင်းမဖုန်းလဲတာတေဘာတေမရဘူးပြောတာပါ။)",
    "သူက အကောင့်ကိုအပိုင်ရတာပါ။ ဖုန်းထဲထည့်ထားရတဲ့Gmailမဟုတ်ပါဘူး။ Alight Motion appထဲမာထည့်သုံးရတဲ့TempEmailပါ။ ကျနော်တို့ဘက်ကအကောင့်ပေးမာပါ။ ပေးတဲ့အကောင့်ကို Alight Motion appရဲ့ Email sign inမာဝင်သုံးရုံပါပဲ။ Full Warranty က 1Yearအတွင်းတခုခုဖြစ်ရင်တခါပြန်လဲပေးပါတယ်။ Riskကင်းတဲ့ OwnMail ယူလဲရပါတယ်။",
    "သူကဝယ်သူရဲ့ email ကိုလုပ်ပေးတာပါ။ Gmail/Email and password ပေးရပါတယ်။ အကောင့်ရဲ့ Password ပါ။ Alight Motionမာထားမဲ့ Password မဟုတ်ပါဘူး။ Google အကောင့်ကိုဝင်ပီးလုပ်ပေးမာပါ။ ပီးရင်ပြန်ထွက်မာပါ။ အကောင့်ရှိပီးသားဆိုလဲရပါတယ်။ သက်တန်းတိုးလို့လဲရပါတယ်။ ကိုယ့်Mailနဲ့ကိုယ်မလို့Errorလဲကင်းပါတယ်။ အဲ့တာကြောင့် OwnMail ကပိုပီးရွေးချယ်သင့်ပါတယ်။",
    "Android ရော iOS ရောနှစ်ခုလုံးရပါတယ်။ Playstore & AppStore က official appတေမာပဲသုံးရမာပါ။ နောက်ဆုံးအနေနဲ့ပြောချင်တာက Official Alight Motion PRO ရဲ့ဈေးက 1 Week ကိုဘယ်လောက်ရှိလဲဝင်ကြည့်ရင်သိရပါတယ်။ ခုကျနော်ရောင်းပေးတာတေကအဲ့ဈေးထက်အများရီးသက်သာပါတယ်။ ဒါကြောင့်ရက်လလျော့တာတာတေရှိရင်နားလည်ပေးကြပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "ဆက်ရန်",
    "Privateကရော?",
    "OwnMailကရော?",
    "All Devices<br>ရလား?"
  ]
  },
  "Wink": {
    title: "Wink Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "Winkမာကရ္စေးချယ်စရာPlan 3ခုပဲရှိတာပါ။ Share,Private,OwnMail",
    "ဘာကွာလဲဆိုရင်....သိထားရမာက VIP ချင်းတူတူပါပဲ။ Shareဆိုတာကတော့သိတဲ့အတိုင်း 1Device ပဲဝင်လို့ရမယ်။ တခြားသူတေနဲ့တူတူသုံးရမယ်။ ဒါပေမဲ့ Private ပါ Project တေလုံးဝမရောပါဘူး။<br>(Stockကတော့ရှားတာမလို့အမြဲမရနိုင်ပါ။)",
    "Privateကအကောင့်အပိုင်ရတာပါ။ ပီးတော့ ဘယ်ချိန်ဝယ်ဝယ် ဝယ်လို့ရပါတယ်။ 3 Devices ထိဝင်သုံးလို့ရပါတယ်။",
    "OwnMail ဆိုတာကတော့ Private နဲ့အကုန်တူတူပါပဲ။ ဒါပေမဲ့ကျနော်ပေးတဲ့ Mail password မဟုတ်ပဲဝယ်သူရဲ့ account ကို VIP ဝယ်ပေးတာပါ။",
    "Android ရော iOS ရောနှစ်ခုလုံးရပါတယ်။ Appကတော့ Android ဆိုရင်တော့ကျနော် China version official app ပေးမာပါ။<br>Playstore က App နဲ့က Vip သုံးလိူ့မရလို့ပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "Privateကရော?",
    "OwnMailကရော?",
    "All Devices<br>ရလား?"
  ]
  },
  "Meitu": {
    title: "Meitu Info",
    button: "ဒီနှစ်ခုကရောဘယ်လိုလဲ?",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "ဒါက Meitu ရဲ့ VIP Planပါ။ ရွေးစရာကနှစ်ခုပဲရှိပါတယ်။<br>Share & Private.",
    "VIP ကတူတူပါပဲ။ ကွာတာက Share ဆိုရင် 1Device ပဲဝင်လို့ရမယ်။ တခြားသူတေနဲ့တူတူသုံးရမယ်။<br>(ဒါပေမဲ့ Demand နဲတာကြောင့် Private ပဲရဖို့များပါတယ်။)",
    "Private ကတော့ 3 devices ဝင်သုံးလို့ရမယ်။ ဒီကပေးတဲ့အကောင့်ကို Meitu App မာထည့်သုံးရုံပါပဲ။ သူက Stock ရှားတာမို့လို့အရင်မေးပီးမဝယ်ပါ။ Full warranty.",
    "Android ရော iOS ရောနှစ်ခုလုံးရပါတယ်။ Appကတော့ Android ဆိုရင်တော့ကျနော် China version official app ပေးမာပါ။<br>Playstore က App နဲ့က Vip သုံးလိူ့မရလို့ပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "Private ဆိုတာက?",
    "All Devices<br>ရလား?"
  ]
  },
  "PicsArt": {
    title: "PicsArt Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "PicsArt မာကရ္စေးချယ်စရာ Plan 2 ခုပဲရှိတာပါ။<br>Share & Private",
    "ဘာကွာလဲဆိုရင် Pro ချင်းတူတူပါပဲ။ Shareဆိုတာကတော့သိတဲ့အတိုင်း 1Device ပဲဝင်လို့ရမယ်။ တခြားသူတေနဲ့တူတူသုံးရမယ်။ Edit History တေလဲရောပါတယ်။ သူ Edit တာလဲကိုယ်မြင်နေရမာဖြစ်သလို၊ကိုယ် Edit တာကိုလဲတခြားသူတေမြင်ရမာပါ။<br>Warranty 15Days.",
    "Private ကတော့ Total 5 Devices ထိဝင်သုံးလို့ရမယ်။ Private History. ပီးတော့ Full warranty. ကျနော်ပေးတဲ့အကောင့်ကို PicsArt App မာဝင်သုံးရုံပါပဲ။",
    "Android ရော iOS ရောနှစ်ခုလုံးရပါတယ်။ Playstore & AppStore က official appတေမာပဲသုံးရမာပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "Private ဆိုတာက?",
    "All Devices<br>ရလား?"
  ]
  },
  "Canva": {
    title: "Canva Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း Canva မာရ္စေးချယ်စရာPlan 3 ခုရှိပါတယ်။<br>Share,Private,Educational",
    "ဘာကွာလဲဆိုရင်တော်တော်ကွာပါတယ်။ ဒီထဲက Share Invite ဆိုတာကဝယ်သူရဲ့ Email ကို invite လုပ်ပေးလိုက်မာပါ။ Pro features တေရတယ်ဆိုပေမဲ့ Members အနေနဲ့မို့လို့ Limited access သဘောပါပဲ(ဥပမာFontတေကိုထည့်ချင်တာထည့်မရတာမျိုးလိုပေါ့။)",
    "Total 20~30Daysကြားပဲရမာပါ။ ဒါကဘာကိုပြောတာလဲဆိုရင်ဥပမာကိုယ်က1ရက်နေ့ကဝယ်လိုက်တယ်ဆိုရင် 20 ရက့်နေ့မလဲကုန်နိုင်တယ်အဲ့ကနေ 30 ထိလဲအများဆုံးရနိုင်တယ်။ အနဲဆုံးကတော့ 20 ရက်ပေါ့။",
    "Private ကတော့သူက Pro features ကိုမ full access ရနေမယ်။ ကျနော်ပေးတဲ့အကောင့်ကို Canva app မာဝင်သုံးရုံပါပဲ။ Email အခု 100 ကို Pro ပြန်ပေးလို့ရတယ်။ ဒါကဘာကိုဆိုလဲလဲဆိုရင် Share 1500 တန်အခု 100 ပေါ့။ ကိုယ့်ရဲ့ Email ကိုလဲ Admin အနေနဲ့ပြန် Invite လို့ရတယ်။",
    "Educationalဆိုတာကကျောင်းသားတေအတွက်ပါ။ Lifetime ဆိုတော့ Features တေကလဲကျောင်းမာလိုသလောက်ပဲပါတာပါ။ ပြောရရင် Limited Features ပေါ့။ သူကဝယ်သူရဲ့ Email ကို Invite ပေးတာပါ။ Warranty 5 လပေးထားပါတယ်။",
    "Android ရော iOS ရော PC,laptop အကုန်ရပါတယ်။ Playstore & AppStore က official appတေမာပဲသုံးရမာပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "ဆက်ရန်",
    "Privateကရော?",
    "Educational<br>ကရော?",
    "All Devices<br>ရလား?"
  ]
  },
  "VSCO": {
  title: "VSCO Info",
  button: "ဒါကဘာလဲရှင်းပြပါ",
  doneText: "Aww okok",
  steps: [
    "တကယ်တမ်းပြောရရင်ကျနော်လဲသေချာမသိပါဘူး။ Slow motion videoတေလုပ်လို့‌ရတဲ့ App ပါ။ Instock လဲမရှိလို့ CapCut က Slow motion ပဲသုံးလိုက်တာပိုကောင်းပါတယ်။"
  ]
},
  "PhotoRoom": {
  title: "PhotoRoom Info",
  button: "ဒါကဘာလဲရှင်းပြပါ",
  doneText: "Aww okok",
  steps: [
    "ဒါက Photo editing appပါပဲ Ai ကိုသုံးပီး Background removeတာတေ Generate တာတေလုပ်လို့ရပါတယ်။ Stock ရှားပါတယ်။ သူ့လိုဟာမျိုးထဲကဆို PicsArt ရှိပါမယ်။"
  ]
},
  "Remini": {
  title: "Remini Info",
  button: "ဒါကဘာလဲရှင်းပြပါ",
  doneText: "Aww okok",
  steps: [
    "Remini ဆိုတာက ပုံတေကအကြည်လုပ်တာအရမ်းကောင်းပါတယ်။ သုံးဖူးတဲ့သူတေပိုသိပါတယ်။ ဒါပေမဲ့ Stock ရှားတာမလို့ PicsArt ကလဲသူ့လောက်တော့မကောင်းပေမဲ့သူ့နီးနီးတော့အကြည်လုပ်နိုင်ပါတယ်။"
  ]
},
  "INSHOT": {
  title: "INSHOT Info",
  button: "ဒါကဘာလဲရှင်းပြပါ",
  doneText: "Aww okok",
  steps: [
    "ဘာမရှင်းပြစရာမရှိပါဘူး။ Android ပဲသူံးလိူ့ရပါမယ်။ Playstore က official app ထဲမာပဲသုံးရမာပါ။ Share Planမို့လို့ 1 Device ပဲသုံးလိူ့ရပါမယ် Warranty 3လပေးပါတယ်။"
  ]
},
  "NordVpn": {
  title: "NordVpn Info",
  button: "ဒါကဘာလဲရှင်းပြပါ",
  doneText: "Aww okok",
  steps: [
    "မြန်မာမာသုံးမရဘူး။ အဲ့တော့မဝယ်ပါနဲ့။"
  ]
},
  "Surfshark Vpn": {
  title: "Surfshark Vpn Info",
  button: "ဒါကဘာလဲရှင်းပြပါ",
  doneText: "Aww okok",
  steps: [
    "မြန်မာမာသုံးမရဘူး။ အဲ့တော့မဝယ်ပါနဲ့။"
  ]
},
  "Express Vpn": {
    title: "Express Vpn Info",
    button: "Shareနဲ့Privateဘာကွာလဲ?",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "ဘာကွာလဲဆိုရင်အများကြီးကွာပါတယ်။ Shareဆိုတာကအကျန်အကောင့်ပါ ရှေ့မာ လူတေဝင်ပီးသားအကောင့်မာ 1 Device စာဝယ်ရင်တခုလွတ်တာပေးမာပါ။ အဲ့ထဲမာဝင်သုံးရမာ။ တခါတလေအကောင့်ကထွက်ထွက်သွားဝာာမျိုးဖြစ်တတ်ပေမဲ့ပြန်ဝင်လို့ရပါတယ်။",
    "အများနဲ့တူတူသုံးရတာမို့လို့တစ်ခုစာဝယ်ပီးတစ်ခုထက်ပိုဝင်တဲ့အခါမျိုးတေမာကိုယ်ကဝင်ဝင်တခြား 7 ယောက်ထဲကတယောက်ယောက်ကခိုးသုံးရင်ဖြစ်ဖြစ်အကောင့်ကပျက်သွားမာပါ။ Share ကို warranty 15ရက်ပေးပါတယ်။",
    "1000ထဲနဲ့ရောင်းပေးထားတာက။ လူတိုင်း Vpn သုံးနိုင်အောင် Budget Plan အနေနဲ့ထားပေးထားမလို့ဘာမလဲမမြတ်ပါဘူးဗျ။ အဲ့တာကြောင့်ဖြစ်တိုင်းပြန်လဲမပေးနိုင်တာနားလည်ပေးကြပါ။",
    "Private ဆိုတာကတော့အကောင့်တခုလုံးကိုအပိုင်ရတာမျိုးပါ။ Share လိုမျိုး 8 ‌Devices ပဲသုံးလိူ့ရဝာာမဟုတ်တော့ပဲ ဖုန်းကြီးပဲဆို 9 Devices ထိရပါတယ်။ PC ကြီးပဲဆို 5 PC(Laptop လဲတူတူပဲ)PC 5ခုသုံးရင်တော့ ဖုန်းတော့သုံးလိူ့မရဘူးပေါ့။ ပီးတော့ကိုယ့် အကောင့်အပိုင်ဖြစ်တာမလို့ Password လဲကိုယ်ကြိုက်တာထားလို့ရပါတယ်။",
    "ဘာဝယ်သင့်လဲဆိုတာထက်ကိုယ်က Budget ဘက်မာရှိတယ်သုံးစရာကလဲကိုယ့်ဖုန်းတခုပဲရှိတာဆိုရင် Share Plan ပဲယူပါ။ တခြားသူတေနဲ့လဲ တူတူမသုံးချင်ဘူး တယောက်ထဲ သက်သက်သုံးချင်တယ် ဖုန်းတစ်ခု၊ Laptop တခု၊ PC တခုဆိုရင်တော့ Private ယူချင်ရင်ယူလို့ရပါတယ်။",
    "အိမ်မာလူများတဲ့သူတေ အလုပ်မာလူများတဲ့သူတေကလဲ Private နဲ့ဆိုအဆင်ပြေပါတယ်။ Private account တေကိုတော့ Full warranty ပေးထားပါတယ်။ Share နဲ့ Private မာလိုင်းကသိသိသာသာကြီးကွာသွားတာမရှိပါဘူး။ Warranty နဲ့ device limit ပဲကွာတာပါ။",
    "Combo for Private account<br>9 Phones<br>8 Phones + 1 PCဒါမမဟုတ်Laptop<br>5 Phones + 2 PCဒါမမဟုတ်Laptop<br>5 PCဒါမမဟုတ်Laptop",
    "သူ့ Plan အလိုက်ရွေးဝယ်ပါ။ Android,iOS,PC,Laptopအကုန်ရပါတယ်။"
  ],
    stepButtons: [
    "ဆက်ရန်",
    "ဆက်ရန်",
    "Privateကရော?",
    "ဘာဝယ်သင့်လဲ?",
    "ဆက်ရန်",
    "ဆက်ရန်",
    "All Devices<br>ရလား?"
  ]
  },
  "HMA VPN": {
    title: "HMA VPN Info",
    button: "ဒါကဘာလဲရှင်းပြပါ",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "HMA က Express လိုမဟုတ်ဘူး။ iOS တေမာသုံးလိူ့မရဘူး။ ဒါပေမဲ့ ရွေးချယ်စရာ Region တေ Express ထက်ပိုများများချိတ်လို့ရတယ်။ သုံးလို့လဲရတယ်။",
    "သူ့မာ Budget Plan မရှိပါဘူး။ Private ပဲရပါမယ်။ Android & Windows Devicesတေမာပဲသုံးလိူ့ရမယ်။ 5 to 8 Devicesထိရမယ်။ Full warranty။"
  ],
    stepButtons: [
    "ဆက်ရန်"
  ]
  },
  "ChatGPT": {
    title: "ChatGPT Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း ChatGpt မာရ္စေးချယ်စရာ Plan 4 ခုရှိပါတယ်။<br>Personal Plus, Business Plus Invite, Business Plus Own and Go",
    "ဘာတေကွာလဲဆိုရင်သိထားရမာက Go ကလွဲရင်ကျန်တာတေက Plus ချင်းတူတူပါပဲ။ အရင်ဆုံး Personal Plus ကိုပြောပါမယ်။ သူကဒီကအကောင့်ပေးတာကို ChatGpt app or Website မာထည့်သုံးရတာပါ။ ဖုန်းထဲထည့်ထားစရာမလိူပါဘူး။ Device limit အနေနဲ့ 3 Devices လောက်ထိသုံးလို့ရပါတယ်။",
    "Business Plus invite ဆိုတာက Personal Plus လိုမျိုး ကျနော်ပေးတဲ့အကောင့်ကိုသုံးရတာမဟုတ်ပဲ ဝယ်သူရဲ့ Email ကို Gpt plus ပြောင်းပေးတာပါ။ Email ကနေ Invite ပေးတာမလို့ Password ပေးစရာမလိုပါဘူး။ ဒါမဲ့ Device ကတော့ 1~2 Devices လောက်ပဲသုံးလို့ရပါမယ်။",
    "Business Plus Own ဆိုတာကအလွယ်ပြောရင် 12K invite plan 4ခုရတာကိုပြောတာပါ။ ကျနော်ဒီကပေးတဲ့အကောင့်ကိုဝင်ပီးအဲ့အကောင့်ကနေ ဝယ်သူ ChatGpt Plus လုပ်ချင်တဲ့ email 4ခုကို Plus လုပ်လို့ရသွားမာပါ။",
    "Device အနေနဲ့က ကျနော်ပေးတဲ့ Head account အပါအဝင်နောက် Email 4 ခုမာတခုကို 2 devices သုံးလို့ရတာဆိုတော့ Total 10 Devices ထိရနေမာပါ။",
    "ကျနော်ခုဏပြောသွားတာတေအကုန်လုံးက $20≈$30 နဲ့ဝယ်တဲ့ဟာတေမဟုတ်လို့ Deactivate error ဖြစ်နိုင်ပါတယ်။ Deactivate ဆိုတာကဘာလဲဆိုရင် သုံးနေရင်း Plus features မရတော့တာမျိုး ကိုပြောတာပါ။",
    "Full warranty လို့မရေးထားတဲ့ Personal Plus,Business Plus Invite and Business Plus Own တေက warranty အနေနဲ့တခုခုဖြစ်ခဲ့ရင် 1 ခုအသစ်ပြန်လဲပေးမာပါ။ တခါပဲလဲပေးမာမလို့အဆင်ပြေမယူပေးပါ။ Full Warranty လို့ရေးထားတဲ့ 25,900Ks Plan ကတော့ Warranty အပြည့်ပါပါတယ်။",
    "Go Subscription ကဈေးလဲပိုသက်သာသလို Plus subscription လောက်လဲ Features တေများမာမဟုတ်ပါဘူး။ ဒါပေမဲ့ OwnMail ကိုမ Chat History မပျက်ပဲသူံးချင်တဲ့သူတေ စကားပြောပုံထုတ်အမေးအဖြေစတဲ့ပေါ့ပေါ့ပါးပါးပဲသုံးမယ်ဆိုတဲ့သူတေအတွက်အဆင်ပြေပါမာ။ အသေးစိတ်ကို Checkout Page ရောက်ရင် Extra Information မာထက်ကြည့်လို့ရပါတယ်။",
    "ဒါကသုံးတဲ့သူပေါ်မာမူတည်ပါတယ်။ ဥပမာကိုယ်က Device 2ခု 3ခုလောက်ရှိတယ် OwnMail မဟုတ်လဲရတယ်ဆိုရင် Personal Plus က Deactivate %လဲနဲတာမလို့အဲ့တာယူသင့်ပါတယ်။",
    "တကယ်လို့ကိုယ်က ကိုယ့် Email နဲ့ပဲသုံးချင်တယ် Device ကလဲ ဖုန်း or laptop တခုနှစ်ခုလောက်ပဲရှိတယ်ဆိုရင်တော့ Business Plus Invite ကရွေးချင်သင့်ပါတယ်။ ကျနော်ထည့်မရေးထားပေမဲ့ Business Plus invite မာ Normal Warranty 12K or Full Warranty 15K ဆိုပီးရွေးလို့ရပါတယ်။",
    "အဲ့လိုမမဟုတ်ပဲ ကိုယ်ကပြန်ရောင်းချင်တာဖြစ်ဖြစ်သူငယ်ချင်းတေ အလုပ်ကလူတေကိုပေးချင်တာပဲဖြစ်ဖြစ်ဆိုရင်တော့ Business Plus Own နှစ်ခုက Device limit လဲများသလို Private history တေနဲ့သုံးရတာမလို့ အဲ့တာအတန်ဆုံးပါပဲ။",
    "ရှင်းပြတာတေလဲအကုန်ကြည့်ပီးပီဆိုတော့ကိုယ့်ရဲ့ Budget နဲ့သုံးမဲ့အပေါ်လိုက်ပီးအဆင်ပြေတာရွေးဝယ်ကြပါ။<br>Official App and Official Webတေမာသူံးရမာပါ။ Android, iOS, PC, Laptop အကုန် Support ပါတယ်။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "Business Plus invite<br>ကရော?",
    "Business Plus Own<br>ဆိုတာကရော?",
    "ဆက်ရန်",
    "Full Warranty<br>ကရော?",
    "ဆက်ရန်",
    "Goကရော?",
    "ဘာဝယ်သင့်လဲ?",
    "ဆက်ရန်",
    "ဆက်ရန်",
    "ဆက်ရန်"
  ]
  },
  "Gemini Pro": {
    title: "Gemini Pro Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "Gemini Pro မာကရ္စေးချယ်စရာ Plan 2 ခုပဲရှိတာပါ။<br>OwnMail Invite & Private Head",
    "ဘာကွာလဲဆိုရင် Invite OwnMail ဆိုတာကဝယ်သူရဲ့ Email ကို Pro လုပ်ပေးတာပါ။ Region မတူတေတေဘာတေဖြစ်ပီးဝင်မရရင်ကျနော်ဝင်လုပ်ပေးဖို့လိုပါတယ်။ Password တေပေးရမာပါ။",
    "Privacy တေဘာတေရှိလို့ပေးဝင်လို့မရဘူးဆိုတဲ့သူတေကတော့ခုထဲကမဝယ်လို့ရပါပီ။ ကျနော်ကတော့လုပ်စရာရှိတာလုပ်ပီးပြန်ထွက်မာပါပဲ။ မယုံရင်တော့ Private Head ပဲယူပါ။",
    "Private Head ဆိုတာက ကျနော်ဒီကအကောင့်ပေးမာပါ။ အဲ့အကောင့်ကနေ OwnMail invite plan လိုမျိုး Email 5ခုကိုပြန် Invite လို့ရပါတယ်။ ဒါပေမဲ့ Region တေပြောင်းတတ်မရမာပါ။ ဝင်မဲ့သူတေက Head account နဲ့ Region တူမရမာကိုပြောတာပါ။",
    "ဘာဝယ်သင့်လဲဆိုရင်တော့ Gemini Pro features တေကတူတူပါပဲကွာသွားတာက Ai Credit ကို OwnMail Plan က Share သုံးရတာပါ။ Private ကတော့ကိုယ်တယောက်ထဲသုံးရတာပါ။ အဲ့ Credit ကဘာအတွက်လဲဆိုတာမသိရင်တော့ OwnMail Plan ကိုသာရွေးလိုက်ပါ။",
    "ပီးတော့ Private မာက 5 TB ကိုကိုယ်‌တယောက်ထဲသုံးရမာဖြစ်ပီး၊ OwnMail Planမာတော့ Sharing သဘောပါ။ ဒါပေမဲ့ကိုယ်တိုင်တာတေကိုဘယ်သူမမြင်ရပါဘူး။ Storage ပြည့်ပီးစာမဝင်တော့တဲ့သူတေအတွက်အသုံးဝင်ပါတယ်။",
    "Android, iOS, PC, Laptop အကုန်ရပါတယ်။ Official App တေ Website တေမာပဲသုံးရမာပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "ဆက်ရန်",
    "Private Head<br>ဆိုတာက?",
    "ဘာဝယ်သင့်လဲ?",
    "ဆက်ရန်",
    "All Devices<br>ရလား?"
  ]
  },
  "Claude Opus": {
    title: "Claude Opus Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Desktop Device တေမာပဲ VS Code နဲ့သုံးလိုရပါမယ်။ Laptop or PC တခုထဲကသုံးရတာမျိုးမဟုတ်ဘူး Multiple Laptop and PC API setup ပီးသုံးလိုရပါတယ်။ 3 Devices လောက်ရပေမဲ့ တချိန်ထဲတော့တူတူသူံးလို့မရပါဘူး။ ဟိုလို Claude Website မာသုံးရတဲ့အကောင့်လဲမဟုတ်ပါဘူး။ ကိုယ့် VS Code account ထဲမာ API ထည့်ပီးသုံးရတာမျိုးပါ။",
    "ဒီ API ထဲမာ Claude ရဲ့ Opus, Sonnet, Haiku အပြင် GPT Sol, Terra, Luna ,DeepSeek V3, V4 ,Flash, V4 Pro ,Qwen Max, Plus, Turbo, Flash, Coder Plus ,GLM 5.2 တေလဲအကုန်ပါပါတယ်။ ဒီ API က Sonnet API Type ထက်ပိုပီး Token အစားသက်သာပါတယ်။ အဲ့တော့နှစ်ခုကိုယှဉ်ပီးဟိုဟာကအသာရီးမထင်ပါနဲ့။"
  ]
  },
  "Claude Sonnet": {
    title: "Claude Sonnet Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Desktop Device တေမာပဲ VS Code နဲ့သုံးလိုရပါမယ်။ Laptop or PC တခုထဲကသုံးရတာမျိုးမဟုတ်ဘူး Multiple Laptop and PC API setup ပီးသုံးလိုရပါတယ်။ 3 Devices လောက်ရပေမဲ့ တချိန်ထဲတော့တူတူသူံးလို့မရပါဘူး။ ဟိုလို Claude Website မာသုံးရတဲ့အကောင့်လဲမဟုတ်ပါဘူး။ ကိုယ့် VS Code account ထဲမာ API ထည့်ပီးသုံးရတာမျိုးပါ။",
    "ဒီ API ထဲမာ Claude ရဲ့ Sonnet, Haiku အပြင် DeepSeek V3, V4 ,Flash, V4 Pro ,Qwen Max, Plus, Turbo, Flash, Coder Plus ,GLM 5.2 တေလဲအကုန်ပါပါတယ်။ ဒီ API က 1 Billion ဆိုပေမဲ့ Opus API ထက် Token ပိုစားပါတယ်။ အဲ့တော့နဲနဲလေးအကုန်ပိုမြန်တယ်။"
  ]
  },
  "ChatGPT API": {
    title: "ChatGPT API Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Desktop Device တေမာပဲ VS Code နဲ့သုံးလိုရပါမယ်။ Laptop or PC တခုထဲကသုံးရတာမျိုးမဟုတ်ဘူး Multiple Laptop and PC API setup ပီးသုံးလိုရပါတယ်။ 3 Devices လောက်ရပေမဲ့ တချိန်ထဲတော့တူတူသူံးလို့မရပါဘူး။ ဟိုလို ChatGPT Website မာသုံးရတဲ့အကောင့်လဲမဟုတ်ပါဘူး။ ကိုယ့် VS Code account ထဲမာ API ထည့်ပီးသုံးရတာမျိုးပါ။",
    "ဒီ API ထဲမာ GPT ရဲ့ Sol, Terra, Luna အပြင် Claude Opus, Sonnet, Haiku ,DeepSeek V3, V4 ,Flash, V4 Pro ,Qwen Max, Plus, Turbo, Flash, Coder Plus ,GLM 5.2 တေလဲအကုန်ပါပါတယ်။ ဒီ API က Claude Opus API ပါပဲ။ အဲ့တာကြောင့်ဈေးတေ Plan တေတူနေတာပါ။"
  ]
  },
  "Qwen": {
    title: "Qwen Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Desktop Device တေမာပဲ VS Code နဲ့သုံးလိုရပါမယ်။ Laptop or PC တခုထဲကသုံးရတာမျိုးမဟုတ်ဘူး Multiple Laptop and PC API setup ပီးသုံးလိုရပါတယ်။ 3 Devices လောက်ရပေမဲ့ တချိန်ထဲတော့တူတူသူံးလို့မရပါဘူး။ ဟိုလို Qwen Website မာသုံးရတဲ့အကောင့်လဲမဟုတ်ပါဘူး။ ကိုယ့် VS Code account ထဲမာ API ထည့်ပီးသုံးရတာမျိုးပါ။",
    "ဒီ API ထဲမာ Qwen3 Coder အပြင် DeepSeek 3.2 ,Claude Sonnet, Haiku, Turbo, Flash, Coder Plus ,GLM 5.2 တေလဲအကုန်ပါပါတယ်။ ဒီ API က Claude Sonnet API ပါပဲ။ အဲ့တာကြောင့်ဈေးတေ Plan တေတူနေတာပါ။"
  ]
  },
    "DeepSeek": {
    title: "DeepSeek Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Desktop Device တေမာပဲ VS Code နဲ့သုံးလိုရပါမယ်။ Laptop or PC တခုထဲကသုံးရတာမျိုးမဟုတ်ဘူး Multiple Laptop and PC API setup ပီးသုံးလိုရပါတယ်။ 3 Devices လောက်ရပေမဲ့ တချိန်ထဲတော့တူတူသူံးလို့မရပါဘူး။ ဟိုလို DeepSeek Website မာသုံးရတဲ့အကောင့်လဲမဟုတ်ပါဘူး။ ကိုယ့် VS Code account ထဲမာ API ထည့်ပီးသုံးရတာမျိုးပါ။",
    "ဒီ API ထဲမာ DeepSeek 3.2 အပြင် Qwen3 Coder ,Claude Sonnet, Haiku, Turbo, Flash, Coder Plus ,GLM 5.2 တေလဲအကုန်ပါပါတယ်။ ဒီ API က Claude Sonnet API ပါပဲ။ အဲ့တာကြောင့်ဈေးတေ Plan တေတူနေတာပါ။"
  ]
  },
  "Perplexity Ai": {
    title: "Perplexity Ai Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း Perplexity Ai မာရ္စေးချယ်စရာ Plan 3 ခုရှိပါတယ်။<br>Share,Private,OwnMail",
    "ဘာတေကွာလဲဆိုရင် အရင်ဆုံး Perplexity Ai ဆိုတာဘာလဲပြောပြပါမယ်။ သူက ChatGpt, Gemini, Claude, Grok တို့လို့ Ai အစုံကိုတခုဝယ်ရုံနဲ့သုံးလို့ရမာပါ။ ခုပြောသွားတာတေရဲ့တကယ့် Website တေ App တေမာသုံးရတာတော့မဟုတ်ပါဘူး Model အနေနဲ့သုံးလို့တာကိုပြောတာပါ။",
    "အဲ့တော့ Plan တေအကြောင်းဆက်ပြောပြပါမယ် Share ဆိုတာကသိတဲ့အတိုင်း 1 Device ပဲဝင်လို့ရမယ်။ တခြား User တေနဲ့တူတူ Share သုံးရမယ်။ Chat history တေရောနေမယ်။ Warranty 15ရက်ပေးထားပါတယ်။ ဒီ Ai ကလူသိလဲနဲသလို demand လဲနဲတာမလို့ Share ကရချင်မရမာပါ။",
    "Private ဆိုတာကအကောင့်ကိုအပိုင်ရတာကျနော်ပေးတဲ့ Mail Pass ကို Perplexity App or Web မာထည့်သုံးရုံပဲ။ 5 Devices လောက်ထိသုံးလို့ရပါတယ်။ And Full warranty.",
    "OwnMail ဆိုတာက Private နဲ့အကုန်တူတူပဲ။ ဒါပေမဲ့ကျနော်ပေးတဲ့အကောင့်ကိုသုံးရတာမဟုတ်ပဲ ဝယ်သူရဲ့ Email နဲ့လုပ်ပေးတာပါ။ သူလဲ Full warranty ပါပဲ။",
    "Android ရော iOS ရော PC, Laptop အကုန်ရပါတယ်။ Official App and Website တေမာပဲသုံးရမာပါ"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "ဆက်ရန်",
    "Private ဆိုတာက?",
    "OwnMail ဆိုတာက?",
    "All Devices<br>ရလား?"
  ]
  },
  "Flow AI": {
    title: "Flow AI Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "Flow Ai Plan နှစ်ခုကတော်တော်ကွာပါတယ်။ အဲ့တာတေမပြောခင် Powered By Gemini လို့ရေးထားတာက ဒါဝယ်ရင် Gemini Pro ဝယ်တာနဲ့တူတူပဲလို့ပြောတာပါ။ Gemini Pro အကြောင်းကတော့ Gemini ထဲမာရှင်းပြပေးထားပီးပီမလို့ ဒီမာထက်မပြောတော့ပါဘူး။",
    "အရင်ဆုံး OwnMail Invite Plan ကိုပြောပါမယ်။ သူက Ai Credit တစ်လကို 1000 ရပါတယ်အဲ့ 1000 ကိုကျန်တဲ့ Family Plan ဝယ်ထားတဲ့သူ 5 ယောက်နဲ့တူတူသုံးရမာပါ။ ကိုယ်ကသုံးသုံးတခြားသူကအကုန်သုံးသုံး Credit ကလျှော့နေမာမလို့ သေချာစဉ်းစားပီးမယူပါ။",
    "Private ဆိုတာကကျကျနော်ဒီကနေအကောင့်ပေးမာပါ။ အဲ့အကောင့်က Family Invite လိုမျိုး Email 5 ခုပြန် Share လို့ရတယ်။ ဒါမဲ့ Region ချိန်းတတ်မ။ Invite နဲ့မတူတာက Credit တေကကိုယ်တယောက်ထဲသုံးရတာမို့လို့ အဆင်ပြေပါတယ်။",
    "ဘာဝယ်သင့်လဲဆိုရင်တော့ကိုယ်က Video တေများများထုတ်ချင်ရင် Private ယူပါ။ Invite မာက Credit တေက Share use ရတာမို့လို့။ Official Plan ပဲမို့လို့ Any device ဖြစ်ဖြစ်သုံးလို့ရပါတယ်။ Flow Ai Website မာတော့ Vpn ခံသုံးပေးရပါမယ်။"
  ],
    stepButtons: [
    "ဆက်ရန်",
    "Private ဆိုတာက?",
    "ဘာဝယ်သင့်လဲ?"
  ]
  },
  "NotebookLM": {
  title: "NotebookLM Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "NotebookLM ကကျနော်လဲမသုံးဖူးလို့မပြောတတ်ပါဘူး။ ဒါပေမဲ့ Pro Plan ပါ။ Powered By Gemini ဆိုတာက ဒါဝယ်ရင် Gemini ကိုဝယ်တာနဲ့တူတူပဲလို့ပြောတာပါ။"
  ]
},
  "Windows License": {
  title: "Windows License Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒါက Window Pro Key ပါ။ 10/11 ပဲရပါတယ်။"
  ]
},
  "Microsoft 365": {
    title: "Microsoft 365 Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း Microsoft မာရ္စေးချယ်စရာ Plan 3 ခုရှိပါတယ်။<br>Personal,Invite OwnMail & Family Head",
    "ဘာကွာလဲဆိုရင်သိထားရမာကအကုန်လုံးက Private တေပါပဲ။ အရင်ဆုံး Personal Plan ကိုပြောပါမယ်။ သူကတယောက်ထဲ သုံးတဲ့သူတေအတွက်ပါ Device 5 ခုလောက်ဝင်လို့ရပါတယ်။ Features တေအနေနဲ့ (Word, Excel, PowerPoint, Outlook) စတဲ့ Microsoft မာပါတာတေအပြင် Copilot Ai ပါသုံးလို့ရပါတယ်။",
    "Own Mail Invite ဆိုတာက ခုဏလိုပဲ (Word, Excel, PowerPoint, Outlook) တေသုံးလို့ရတယ်။ ဝယ်သူရဲ့ Email ကို Invite ‌ပီးလုပ်ပေးတာပါ Password ပေးစရာမလိုပါဘူး။ 2 Devices လောက်သုံးလို့ရပါတယ်။ ဒီ Plan မာ 1Month ဆိုတာက 20 ရက်ကနေ 30 ရက်ပါတာရမာကိုပြောတာပါ။",
    "Family Head ဆိုတာက Invite Plan လိုဟာမျိုး 5 ခုရတာကိုပြောတာပါ။ Invite Plan လိုပဲ (Word, Excel, PowerPoint, Outlook) သုံးလို့ရမယ်။ Device အနေနဲ့က Email တစ်ခုကို 2 Devices ဆိုတော့ Total 10 ခုထိရနေမာပါ။",
    "ဘာဝယ်သင့်လဲဆိုရင် Family Plan တေမာက Copilot Ai မပါပါဘူး။ ကွာတာကအဲ့တာရယ် Device Limit ရယ်ပါပဲ။ ကိုယ်သုံးမဲ့အပေါ်ရယ် လူများမများပေါ်ရယ်ကိုလိုက်ပီးအဆင်ပြေတာရွေးယူပါ။ Stock ရှားလို့ရှိမရှိအရင်မေးပီးမဝယ်ပါ။",
    "Android ရော iOS ရော PC, Laptop အကုန်ရပါတယ်။ Official App and Website တေမာပဲသုံးရမာပါ။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "Invite Email<br>ဆိုတာက?",
    "Family Head<br>ဆိုတာက?",
    "ဘာဝယ်သင့်လဲ?",
    "All Devices<br>ရလား?"
  ]
  },
  "Netflix": {
    title: "Netflix Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း Netflix မာရ္စေးချယ်စရာ Plan 3 ခုရှိပါတယ်။<br>Premium UHD,Standard FHD,<br>Whole Account UHD",
    "ဘာကွာလဲဆိုတာမပြောခင်အရင်ဆုံး Semiprivate ဆိုတာကိုရှင်းပြပါမယ်။ Semiprivate ဆိုတာကကိုယ်က Profile တခုလုံးကိုငှားလိုက်တာပါ။ 1 Profile မာက 2 devices သုံးလို့ရပါတယ်။",
    "Standard FHD ဆိုတာက 1080P ကိုပြောတာပါ။ FHD 1080P Plan မာက 2 devices ရပေမဲ့ Tv တော့သုံးလို့မရပါဘူး။ ကျန်တဲ့ Devices တေမာပဲသုံးလို့ရပါမယ်။",
    "Premium UHD ဆိုတာက Ultra High Resolution 4K ထိ Support တယ်လို့ပြောတာပါ။ Netflix ရဲ့အမြင့်ဆုံး Subscription ပါပဲ။ Semiprivate မို့လို့ 2 Devices သုံးလို့ရမယ်။ TV လဲ Support ပါတယ်။",
    "Account တစ်ခုမာက 5 Profile ပါပါတယ်။ Whole Account ဆိုတာက 5 Profile လုံးကိုဝယ်လိုက်တာပါ။ Subscription Plan က Premium UHD Plan ပါ။ Family များတဲ့သူတေ Reseller တေပဲဝယ်သင့်ပါတယ်။",
    "Plan အလိုက် Devices တေက Android, iOS, PC, Laptop, Tv အကုန်ရပါတယ်။ Stocks ရှားတာမို့လို့မဝယ်ခင်အရင်မေးပါ။ လအစတေမာတော့ Stock ရှိတတ်ပါတယ်။ Plan တိုင်းကို Full Warranty ပေးထားပါတယ်။"
  ],
    stepButtons: [
    "ဘာတေကွာလဲ?",
    "Standard FHD<br>ဆိုတာက?",
    "Premium UHD<br>ဆိုတာက?",
    "Whole Account<br>ဆိုတာက?",
    "All Devices<br>ရလား?"
  ]
  },
  "Disney+": {
  title: "Disney+ Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "မြန်မာမာသုံးလို့မရပါဘူး။ VPN နဲ့လဲမရပါဘူးစမ်းပီးပါပီ။ မရပဲဘာလို့ထည့်ထားလဲမေးရင်တော့တချိန်ချိန်ပြန်ရရင်ရောင်းဖို့ထည့်ထားတာပါ။"
  ]
},
  "HBO Max": {
    title: "HBO Max Info",
    button: "Plan 3 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "အရင်ဆုံး Plan တေအကြောင်းမပြောခင် HBO MAX ဆိုတာက Netflix လို Streaming Platform တခုပါ။ ဘာကြီးလဲမသိမာဆိုးလို့ပြောပြတာ။ ပီးတော့ HBO မာ Standard နဲ့ Ultimate Plan ဆိုပီး ရှိပါတယ်။",
    "1P2U Plan ဆိုတာကကိုယ်ကတခြား User 1ယောက်နဲ့ 1 Profile မာတူတူမျှသုံးရမာကိုပြောတာပါ။ Tv ကလွဲရင်ကျန်တဲ့ Device အကုန်ရပါတယ်။ 1 Device ပဲဝင်သုံးလို့ရပါမယ်။ ဒါက Ultimate Plan ပါ။",
    "Semiprivate ဆိုတာကတော့ All Device support ပါတယ်။ Total 2 devices ထိဝင်သုံးလို့ရမယ်။ Tv လဲရပါတယ်။ ဒါလဲ Ultimate Plan ပါပဲ။",
    "Whole Account ဆိုတာက Netflix လိုပဲ ပါလာတဲ့ 5 Profile ကိုအပိုင်ရသွားမာပါ။ 1 Profile မာ 2 devices ဆိုတော့ Total 10 Devices ထိသုံးလို့ရပါတယ်။",
    "1P 2U နဲ့ Semiprivate နှစ်ခုက Ultimate Plan ပါ။ Whole Account ကတော့ Standard Plan ပါ။ HBO က Stock အမြဲနီးပါးရှိပါတယ်။ Official App & Website တေမာပဲသုံးရမာပါ။",
    "Android, iOS, PC, Laptop, Tv သူ့ Plan အလိုက်အကုန်ရပါတယ်။ Plan တိုင်းကို Full Warranty ပေးထားပါတယ်။"
  ],
    stepButtons: [
    "ဆက်ရန်",
    "Semiprivate<br>ဆိုတာက?",
    "Whole Account<br>ဆိုတာက?",
    "ဆက်ရန်",
    "All Devices<br>ရလား?"
  ]
  },
  "Prime Video": {
    title: "Prime Video Info",
    button: "ရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "အရင်ဆုံး Plan တေအကြောင်းမပြောခင် Prime Video ဆိုတာက Netflix တို့ HBO MAX တို့လို့ Streaming Platform တခုပါပဲ။ ဟိုနှစ်ခုနဲ့မတူတာကသူက တချို့တေအတွက် VPN ခံသုံးပေးရပါတယ်။ နဲနဲတော့အလုပ်ရှုပ်တာပေါ့။",
    "Share Plan က သူများတေနဲ့တူတူကြည့်ရတာမျိုးပါ။ Profile သက်သက်စီပါ။ But demand နဲမို့လို့ Share ကရမရမသေချာပါဘူး။ Share Plan ဆိုပေမဲ့ All Device support ပါတယ်။ Tv ကလွဲရင်။ 2 devices ထိဝင်သုံးလို့ရပါတယ်။",
    "Private ကတော့ Profile အကုန်အပိုင်ရတာဖြစ်ပီး All Device Support. Including Tv. device အနေနဲ့လဲ 10 ခုထိဝင်သုံးလို့ရပါတယ်။",
    "Official App & Website တေမာပဲသုံးရမာပါ။ Android, iOS, PC, Laptop, Tv သူ့ Plan အလိုက်အကုန်ရပါတယ်။ Plan တိုင်းကို Full Warranty ပေးထားပါတယ်။"
  ],
    stepButtons: [
    "Share ဆိုတာက?",
    "Private ကရော?",
    "ဆက်ရန်"
  ]
  },
  "Crunchyroll": {
  title: "Crunchyroll Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "Crunchyroll က Anime တေကြည့်တဲ့ App ပါ။ ဒါကသူ့ရဲ့ Mega Fan Subscription ကို‌ Share ရောင်းပေးတာပါ။ 1 Device Only. All devices support except Tv."
  ]
},
  "Spotify": {
    title: "Spotify Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "Individual Plan ဆိုတာကကိုယ်တယောက်ထဲသုံးရတာ။ 2~3 Devices လောက်ထိဝင်သုံးလို့ရတယ်။ ဒါပေမဲ့ဒီကပေးတဲ့အကောင့်ကိုဝင်သုံးရမာ။ ကိုယ့်ရှိပီးသားအကောင့်ကို Premium ဝယ်ပေးတာမဟုတ်ပါဘူး။ သေချာပြောတယ်နော်။",
    "ဒါ‌ပေမဲ့ Old account ရှိရင် Song တေအကုန်ပြောင်းပေးပါတယ်အသစ်ထဲကို။ အဲ့တာကိုမ ကိုယ့်အကောင့်နဲ့ကိုယ် Premium ဘာလို့ဝယ်မရလဲထက်သိချင်ရင်တော့ မရတာမဟုတ်ဘူးရပါတယ်။ တစ်လကို 48K ပေးပီးကိုယ်တိုင် Visa Card နဲ့ဝယ်သုံးရင်ရပါတယ်။",
    "Family Plan ဆိုတာကအကောင့်ထဲမာတော့ကိုယ်ပဲရှိတာ။ ဒါပေမဲ့ Family ထဲကတခြားလူတေရဲ့ Playlist တေ Fav Song ကိုမြင်နေရမာပါ။ Family Plan သုံးမယ်ဆိုရင်ကိုယ်က Playlist တခုသေချာလုပ်ပီးသုံးမအဆင်ပြေမာပါ။ Family Plan ကလဲဒီကအကောင့်ပေးတာပါပဲ။",
    "Family Plan ကကုန်သွားလဲတကောင့်ထဲကိုပဲသက်တန်းတိုးလို့ရပါတယ်။ Individual ကတော့မရပါဘူးသက်တန်းတိုးလို့။ Family Plan ကိုလဲ Full Warranty ပေးထားပါတယ်။ Individual Plan လိုပဲ 2~3 Devices လောက်သုံးလို့ရပါတယ်။",
    "Android ရော iOS ရော PC, Laptop အကုန်ရပါတယ်။ Official App and Website တေမာပဲသုံးရမာပါ"
  ],
    stepButtons: [
    "ဆက်ရန်",
    "Family Plan<div>ကရော?",
    "ဆက်ရန်",
    "All Devices<br>ရလား?"
  ]
  },
  "Google One": {
    title: "Google One Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Google One မာရွေးချယ်စရာနှစ်ခုပဲရှိပါတယ်။ OwnMail invite & Private. ဘာကွာလဲဆိုရင် 5TB ချင်းကတူတူပါပဲ။ OwnMail invite ဆိုတာကဝယ်သူရဲ့ Google Account ထဲကို 5TB ထည့်ပေးတာပါ Family အနေနဲ့။",
    "5TB ကိုတခြား Family Members 5‌ ယောက်နဲ့ Share သုံးရတာဆိုပေမဲ့ကိုယ်သုံးထားတဲ့ Storage တေကိုဘယ်သူမဝင်ကြည့်လို့မရပါဘူး။ Full Private ပါပဲ။ Share လို့ခေါ်ရတာကလဲ 5TB ကိုကိုယ်တယောက်ထဲသုံးနေရတာမဟုတ်ပဲတခြား 4 ယောက်နဲ့တူတူသုံးရတာမလို့ပါ။ ဒါမဲ့ခုဏပြောသလိုပဲ Storage တေကတော့လုံးဝ Private ပါ။",
    "Private ဆိုတာက Invite Plan မာလိုမျိုးတခြားသူတေမပါတော့ပဲကိုယ်တယောက်သုံးရတာပါ။ Invite တုန်းကလိုပဲ Storage တေက Private ဖြစ်နေအုန်းမယ်။ Invite ရော Private ရော Plan နှစ်ခုလူံးကဝယ်ရင် Gemini Pro subscription ပါတခါထဲရမာပါ။",
    "ဘာဝယ်သင့်လဲဆိုရင်ကျနော့်အနေနဲ့ကတော့ Invite Plan ကပိုကောင်းတယ်ထင်ပါတယ်။ Mm region google အကောင့်ဆိုရင်ကျနော့်ကို Mail ပေးလိုက်တာနဲ့ရပါပီ။ mm region မဟုတ်ရင်လဲကျနော်အကောင့်ထဲဝင်ပီးပြောင်းပေးတာဖြစ်ဖြစ် Mail change တာဖြစ်ဖြစ်ကြိုက်တာလုပ်လို့ရပါတယ်။ ကုန်သွားရက်လဲလတိုင်းသက်တန်းဆက်တိုးသွားလို့ရပါတယ်။"
  ],
    stepButtons: [
    "ဆက်ရန်",
    "Private<div>ကရော?",
    "ဘာဝယ်သင့်လဲ?"
  ]
  },
  "Telegram Premium": {
    title: "Telegram Premium Info",
    button: "Planတေအများရီးပဲနားမလည်ဘူး။",
    nextText: "Login Plan<br>ဆိုတာက?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့အတိုင်း Telegram မာရွေးချယ်စရာ Plan 3 ခုရှိပါတယ်။ Login,Gift,Link ဆိုပီး။ 3 ခုလုံးက Premium subscription ချင်းတူတူပါပဲ။ ကွာသွားတာကဝယ်ရတဲ့နည်းတေပါ။",
    "Login Plan ဆိုတာကဝယ်သူရဲ့ Telegram အကောင့်ထဲကိုကျနော်ကဝင်ပီး Premium ဝယ်ပေးတာပါ။ အကောင့်ထဲဝင်ပီးဝယ်ရမာဖြစ်လို့ ကျနော်ကဘာမရှောက်ကြည့်မာမဟုတ်ဘူးဝယ်ပီးပြန်ထွက်မာဆိုပေမဲ့ Spicy တေ Privacy တေရှိတယ် စိတ်မချဘူးဆိုရင်တော့ဒီ Plan မဝယ်သင့်ပါဘူး။",
    "Gift Plan ဆိုတာကကျ ဒီထဲမာအလုပ်မရှုပ်ဆုံး Plan ပါ။ ဝယ်သူရဲ့ Telegram username ပေးရင်ကျနော်က Gift လိုက်မာမလို့ ကျနော်လဲအကောင့်ထဲဝင်စရာမလိုဘူး။ ဝယ်တဲ့သူကိုယ်တိုင်လဲဘာမလုပ်စရာမလိုတော့ဘူး။ ပီးတော့ ဒီ Plan ကလက်ဆောင်တေဘာတေ ပေးဖို့ Surprise လုပ်ချင်တဲ့သူတေအတွက်ရွေးသင့်ပါတယ်။",
    "Link Plan ဆိုတာက ဝယ်ပီးရင်ကျနော်က Link တခုပေးမယ် အဲ့ Link ထဲကိုဝင်ပီးကိုယ်တိုင် Premium ယူရတာပါ။ Link ကလဲ Telegram link ပါပဲဘာ Hack link မမဟုတ်ပါဘူး။ တခါတလေတော့ Stock မရှိရင်စောင့်ရတတ်ပါတယ်။",
    "ဘယ်ဟာဝယ်သင့်လဲဆိုရင် ကိုယ်ကခုမစမ်းသုံးမာဆို Login 1 Month ယူပါ။ စောင့်လဲစောင့်နိုင်တယ် ဈေးလဲသက်သာချင်တယ်ဆိုရင်တော့ Link Plan ယူပါ။ ဘာမမလုပ်ချင်ဘူးမြန်မြန် Premium ရချင်တယ်။ ဒါမမဟုတ် တယောက်ယောက်ကို Gift ချင်တာဆိုရင်တော့ Gift Plan ယူပါ။ Premium ကတူတူပါပဲ။"
  ],
    stepButtons: [
    "Login Plan<br>ဆိုတာက?",
    "Gift Plan<br>ဆိုတာက?",
    "Link Plan<br>ဆိုတာက?",
    "ဘာဝယ်သင့်လဲ?"
  ]
  },
  "Apple Music": {
  title: "Apple Music Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "iOS Device တေမာသုံးလို့မရပါဘူး။ Android Devices‌ တေမာပဲရပါမယ်။ Playstore က Apple Music App မာပဲသုံးလို့ရပါတယ်။ တကောင့်ထဲကိုလတိုင်းသက်တန်းတိုးသွားလို့ရပါတယ်။"
  ]
},
  "YouTube Premium": {
    title: "YouTube Premium Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "OwnMailကရော?",
    backText: "Back",
    steps: [
    "ဒီကအကောင့်ပေးတာပါ။ ပေးတဲ့ Mail and password ကို YouTube official App or Web မာထည့်သုံးရမာပါ။ ရှိပီးသားအကောင့်ကိုလုပ်ပေးတာမဟုတ်ပါဘူးနော်။ အကောင့်ရှိပီးသားကိုပဲ Premium ဝယ်ချင်တာဆိုရင်တော့ YouTube Official Individual Plan ကို $15.99 နဲ့ဝယ်လို့ရပါတယ်။",
    "OwnMail ဆိုတာကလဲ Mail အသစ်ဖွင်ါပေးရမာပါ။ သုံးလက်စအဟောင်းတေမရပါဘူး။ အသစ်ဖွင့်ပေးရင်အဲ့အကောင့်ထဲမာ 3Months ဝယ်ပေးတာပါ။"
  ]
  },
  "YouTube Music": {
  title: "YouTube Music Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "YouTube Music ဆိုတာ YouTube Premium နဲ့တူတူပါပဲ။ YouTube Premium ဝယ်ရင် YouTube Music လဲရပါတယ်။ But VPN ခံသုံးမရမာပါ။"
  ]
},
  "Tidal Music": {
  title: "Tidal Music Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "Tidal ဆိုတာက Spotify တို့ Apple Music တို့လိုပါပဲ။ Android ရော iOS ရောသုံးလို့ရမယ်။ ပြောင်းသုံးကြည့်ချင်တယ်ဆိုတဲ့သူတေအတွက်အဆင်ပြေပါတယ်။ VPN မလို Error Risk မရှိ။ Support Andorid,iOS,Mac/Windows."
  ]
},
  "Qobuz": {
  title: "Qobuz Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "Qobuz ဆိုတာက Spotify တို့ Apple Music တို့လိုပါပဲ။ Android ရော iOS ရောသုံးလို့ရမယ်။ ပြောင်းသုံးကြည့်ချင်တယ်ဆိုတဲ့သူတေအတွက်အဆင်ပြေပါတယ်။ VPN မလို Error Risk မရှိ။ Support Andorid,iOS,Mac/Windows."
  ]
},
  "BSTATION": {
  title: "BSTATION Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "Bstation ရဲ့ Premium Subscription ပါ။ Private အကောင့်ပါဒီကပေးတဲ့ Email and Password ကို Bstation ရဲ့ Official App & Web မာထည့်သူံးရုံပါပဲ။ Support Android,iOS,Mac, Windows."
  ]
},
  "Grok": {
    title: "Grok Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "Private<div>ကရော?",
    backText: "Back",
    steps: [
    "ဒါက Grok ရဲ့ Super Subscription ပါ။ Share Plan ဆိုတာက Phone တခုပဲဝင်သုံးလို့ရမာကိုပြောတာပါ။ 1 Device ထဲပဲသုံးလို့ရပါမယ်။ တခြား Share Plan ဝယ်ထားတဲ့သူတေနဲ့တူတူသုံးရမာပါ။ Warranty ကိုတော့ 20 Days ပေးထားပါတယ်။",
    "Private Plan က 3 Devices ဝင်လို့ရပါတယ်။ Android, iOS, Window, Mac အကုန်ရပါတယ်။ Share ရော Private ရောကဒီကအကောင့်ပေးမာပါ။ ပေးတဲ့အကောင့်ကို Grok App or Website မာဝင်သုံးရုံပါပဲ။ Vpn လိုပါတယ်။ Private Plan ကတော့ Full Warranty ပါ။"
  ]
  },
  "Zoom": {
    title: "Zoom Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "38~42Days ဆိုတာက?",
    backText: "Back",
    steps: [
    "ဒါက Zoom ရဲ့ Pro subscription ပါ။ အဲ့တော့ 100P meeting တေစတဲ့ Pro subscription မာပါတဲ့ Features တေအကုန်ပါပါတယ်။ ပီးတော့ Private အကောင့်ပါ။ ဒီကပေးတဲ့အကောင့်ကို Zoom Official App or Web မာထည့်သုံးရုံပါပဲ။",
    "38~42 Days ဆိုတာက 4,000 တန် 2 Weeks Plan ကို 3 ခါလဲပေးတာပါ။ ဒီ Plan ကိုဝယ်လိုက်ပီဆို ကျနော်က 2 Weeks အကောင့်တခုပေးမယ်။ အဲ့တာကုန်ရင် နောက်ထက် 2 Weeks အကောင့်။ အဲ့လို 14×3 လုပ်ပေးတာပါ။ Android,iOS,Mac,Windows အကုန်လုံးသုံးလို့ရပါတယ်။"
  ]
  },
  "Discord": {
    title: "Discord Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "ဝယ်ရင်ရော?",
    backText: "Back",
    steps: [
    "ဒါက Discord ရဲ့  Nitro Subscription ပါ။ Nitro Basic မဟုတ်ပါဘူး။ ဒါဝယ်ဖို့ဆိုရင် သင့်ရဲ့ Discord account က အနဲဆုံး 1Month သက်တန်းရှိဖို့လိုပါမယ်။ ပီးတော့ Discord Subscription တခါမမဝယ်ဖူးတဲ့အကောင့်ဖြစ်မရမာပါ။",
    "ဝယ်ရင် ကျနော်ကအကောင့်ထဲ Login ဝင်ပီးလုပ်ပေးမာပါ။ လုပ်စရာရှိတာလုပ်ပီးရင်ပြန်ထွက်မာဆိုပေမဲ့ Privacy တေဘာတေရှိလို့အဆင်မပြေဘူးဆိုရင်တော့မဝယ်သင့်ပါဘူး။"
  ]
  },
  "TradingView": {
    title: "TradingView Info",
    button: "ဒါရှင်းပြပေးပါ။",
    nextText: "All Devices<br>ရလား?",
    backText: "Back",
    steps: [
    "ဒါက Trading View ရဲ့ Plus Subscription ပါ။ Private အကောင့်မို့လို့ဝယ်ရင်ဒီက Email & Password ပေးမာပါ။ အဲ့ Email & Password ကို Trading View app or Web မာထည့်သုံးရုံပါပဲ။",
    "Android, iOS, Mac, and Windows အကုန်လုံးမာသုံးလို့ရပါတယ်။ Trading View ရဲ့ Official App & Web တေမာပဲသူံးရမာပါ။ Full warranty."
  ]
  },
  "Duolingo Super": {
    title: "Duolingo Super Info",
    button: "ဝယ်လို့မရဘူးလား",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "Duolingo ကအကောင့်တခုကတစ်ခါပဲ famplan join လို့ရပါတယ်။ ဝယ်ထားတာကုန်လို့နောက်လတေသက်တန်းတိုးချင်ရင်တိုးလို့မရပါဘူး။ နောက်တကောင့်အသစ်ဖြစ်သွားမာမလို့သင်ထားတဲ့ Progress တေကအကုန်အစပြန်ရောက်သွားမာပါ။ စမ်းသုံးတဲ့သူတေအတွက်က တစ်လကုန်သွားလဲဘာမမဖြစ်ပေမဲ့တကယ်သင်တဲ့သူတေအတွက်ဆိုအဆင်မပြေပါဘူး။",
    "အဲ့တာတေကြောင့်မရောင်းပေးတာပါ။ မရောင်းပဲဘာလို့တင်ထားလဲဆိုရင်။ ဒီမာမဝယ်ပဲတခြားစီမာဝယ်ရင်လဲ သေချာမေးပီးဝယ်တတ်အောင်တင်ထားတာပါ။ Seller တေကိုနောက်ပိုင်းသက်တန်းဆက်တိုးလို့ရလား သေချာမေးပီးမဝယ်ကြပါ။"
  ]
  },
  "Google Drive": {
  title: "Google Drive Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒါကကိုယ့်ရဲ့ Google အကောင့်ကိုဝယ်ပေးတာမဟုတ်ပါဘူး။ ဒီကအကောင့်ပေးတာပါ။ Warranty 1Month ပေးထားပါတယ်။ ကိုယ့် Google Account ကို Storage ဝယ်ချင်တာဆိုရင် Google One မာဝယ်ပါ။"
  ]
},
  "SCRIBD": {
  title: "SCRIBD Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒါက Scribd ရဲ့ Premium Subscription ပါ။ Private မို့လို့ဒီက ပေးတဲ့ Email & Password ကို Scribd App or Website မာထည့်သုံးရုံပါပဲ။ Android, iOS, Mac and Windows အကုန်သုံးလို့ရပါတယ်။ Full Warranty."
  ]
},
  "TikTok Non Official": {
  title: "TikTok Non Official Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "Non Official ဆိုတာက Bot တေကိုပြောတာပါ။ လောလောဆယ်ကတော့ဝယ်လို့မရသေးပါဘူး။"
  ]
},
  "Telegram Boosting": {
  title: "Telegram Boosting Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒါက ကိုယ့် Telegram Channel ပဲဖြစ်ဖြစ် Post တခုခုပဲဖြစ်ဖြစ်ရဲ့ Link ကိုပေးတာနဲ့ Boost ပေးတာပါ။ လူအစစ်တေမဟုတ်ပါဘူး။ Bot Boosting ပါ။"
  ]
},
  "YouTube Boosting": {
  title: "YouTube Boosting Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒါက YouTube Video တေရဲ့ View မဟုတ်ပါဘူး။ Live Stream View ပါ။ ပီးတော့ Bot Boosting ပါလူအစစ်တေမဟုတ်ပါဘူး။"
  ]
},
  "Facebook Boosting": {
  title: "Facebook Boosting Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ပြထားတာတေအကုန်လုံးက Bot Boosting တေပါ။ လူအစစ်တေနဲ့ Official Boost တာမဟုတ်ပါဘူး။ Boost မယ်ဆိုကိုယ့် Facebook Page or Profile or Post တေရဲ့ Link ပေးရင်ရပါပီ။"
  ]
},
  "Instagram Boosting": {
  title: "Instagram Boosting Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ပြထားတာတေအကုန်လုံးက Bot Boosting တေပါ။ လူအစစ်တေနဲ့ Official Boost တာမဟုတ်ပါဘူး။ Boost မယ်ဆိုကိုယ့် Instagram Profile or Post တေရဲ့ Link ပေးရင်ရပါပီ။"
  ]
},
  "PaySafeCard": {
  title: "PaySafeCard Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒီကအကောင့်ပေးတာပါ။ အဲ့အကောင့်ကို Playstore ရဲ့ Add account ဆိုတဲ့ထဲမာထည့်သုံးရမာပါ။ အကောင့်ထဲမာ Paysafecard တခုပါပါတယ်။ အကောင့်က 3ရက်နေရင် Expired ဖြစ်ပါတယ်။ အဲ့ 3ရက်အတွင်းသုံးရမာပါ။ Playstore နဲ့တွဲသုံးရတာမလို့ Android Only ပဲရပါမယ်။ iOS လုံးဝမရပါ။"
  ]
},
  "TikTok Official": {
    title: "TikTok Official Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဆက်ရန်",
    backText: "Back",
    steps: [
    "TikTok Video တေမာ Share ကိုနှိပ်လိုက်ရင် Promote ဆိုတာရှိပါတယ်။ TikTok official boosting ဆိုတာကအဲ့ဟာပါ။ ဝင်ရင် Coin တေနဲ့ပြမာမဟုတ်ပါဘူး။ ကိုယ်က Japan Region ပြောင်းထားရင် ¥ နဲ့ပြပီး Normal Account ဆိုရင်တော့ $ နဲ့ပြပါတယ်။",
    "Coin 100 က $1 နဲ့ညီပါတယ်။ Login Method ဆိုရင်ကျနော်ကအကောင့်ထဲဝင်ပီး Coin ထည့်ပေးမာပါ။ အဲ့ Coin တေနဲ့ကိုယ်တိုင် Boost လုပ်လို့ရပါတယ်။ တကယ်လို့အကောင့်ထဲပေးဝင်လို့မဖြစ်ဘူးဆိုရင်လဲ NoLoginBoost ကိုရွေးလို့ရပါတယ်။",
    "No Login Boost ဆိုတာကကျနော့်ကို Video Link ပဲပေးရမာပါ။ ကိုယ်လိုချင်တဲ့ Amount ကိုကိုယ်လိုချင်တဲ့ Boosting Setting အတိုင်း Login ဝင်စရာမလိုပဲ Boost ပေးတာကိုပြောတာပါ။ TikTok ကိုယ်တိုင်က Boost ပေးတာပဲမလို့ Progress တေကိုကိုယ်တိုင်စောင့်ကြည့်နေလို့ရပါတယ်။ Official Boost တာမို့လို့လူအစစ်တေကပဲကြည့်ကြမာပါ။"
  ],
    stepButtons: [
    "ဆက်ရန်",
    "NoLoginBoost<br>ဆိုတာက?"
  ]
  },
  "Tinder": {
  title: "Tinder Info",
  button: "ဝယ်လို့မရဘူးလား",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဟုတ်ပါတယ်ဝယ်လို့မရသေးပါဘူး။ နောင်ပိုင်းတော့ရောက်းပေးပါမယ်။ ခုတော့မရသေးပါဘူး။"
  ]
}
};

function initProductHelper(productName) {
  removeProductHelper();

  let conf = popupTextByProduct[productName] || null;
  const regionalParent = getRegionalParent(productName);

  if (
    regionalParent &&
    productName !== regionalParent &&
    isHelperOnceRegionalParent(regionalParent)
  ) {
    if (regionalHelperSeen.has(regionalParent)) {
      removeProductHelper();
      return;
    }

    regionalHelperSeen.add(regionalParent);

    conf = popupTextByProduct[regionalParent] || {
      title: `${regionalParent} Info`,
      button: "ဒါကဘာလဲရှင်းပြပါ",
      doneText: "နားလည်ပါပီ။",
      steps: [
        `ဒီ ${regionalParent} က Region အလိုက်ဝယ်ရတာပါ။ ကိုယ့် account region နဲ့ကိုက်တဲ့ card ကိုရွေးဝယ်ပေးပါ။ Region မကိုက်ရင် redeem လုပ်လို့မရနိုင်ပါ။`
      ]
    };
  }

  /* Shared helper for all Google Play region products */
  if (!conf && productName.startsWith("Google Play ") && productName !== "Google Play Gift Card") {
    conf = {
      title: "Google Play Gift Card Info",
      button: "ဒါကဘာလဲရှင်းပြပါ",
      doneText: "နားလည်ပါပီ။",
      steps: [
        "ဒီ Google Play Gift Card က Region အလိုက်ဝယ်ရတာပါ။ ကိုယ့် Google Play account region နဲ့ကိုက်တဲ့ card ကိုရွေးဝယ်ပေးပါ။ Region မကိုက်ရင် redeem လုပ်လို့မရနိုင်ပါ။"
      ]
    };
  }

  // ✅ steps support (if not provided, fallback to single body)
  const steps = Array.isArray(conf?.steps) && conf.steps.length
    ? conf.steps
    : [conf?.body || "Tap the button to continue..."];
  const nextLabel = conf?.nextText || "Next";
  const backLabel = conf?.backText || "Back";
  const doneLabel = conf?.doneText || conf?.doneLabel || "နားလည်ပါပီ။";

  let stepIndex = 0;

  const wrap = document.createElement("div");
  wrap.className = "helper-wrap";
  wrap.id = "product-helper-wrap";

  wrap.innerHTML = `
    <div class="helper-panel" id="product-helper-panel">
      <p class="t" id="helper-title">${escapeHTML(conf?.title || (productName + " Helper"))}</p>
      <p class="p" id="helper-body">${escapeHTML(steps[0])}</p>

      <!-- buttons container (hidden at first) -->
    <div class="helper-nav" id="helper-nav" style="display:none; margin-top:10px; gap:8px;">
      <button type="button" class="helper-nav-btn" id="helper-back" disabled>
      ${escapeHTML(conf?.backText || "Back")}
      </button>

      <button type="button" class="helper-nav-btn" id="helper-next">
      ${escapeHTML(conf?.nextText || "Next")}
      </button>
     </div>
    </div>

 <div class="helper-main-stack" id="helper-main-stack">

    <button class="helper-btn anim-neon-bounce" id="product-helper-btn" type="button">
    <span class="dot"></span>
    <span class="label">${escapeHTML(conf?.button || "Still Developing")}</span>
    </button>

    <button class="helper-btn helper-btn-cancel anim-neon-bounce"
          id="product-helper-cancel"
          type="button">
    <span class="dot"></span>
    <span class="label">အကုန်နားလည်ပီးသားပါ။</span>
  </button>

</div>
  `;

  dom.views.product.appendChild(wrap);

  const btn = document.getElementById("product-helper-btn");
  const panel = document.getElementById("product-helper-panel");
  const titleEl = document.getElementById("helper-title");
  const bodyEl  = document.getElementById("helper-body");

  const nav = document.getElementById("helper-nav");
  const backBtn = document.getElementById("helper-back");
  const nextBtn = document.getElementById("helper-next");

  let navTimer = null;
  function updateNavUI() {
  // ✅ if only 1 step → show ONLY "Done" button (no Back)
  if (steps.length <= 1) {
    nav.style.display = "flex";
    backBtn.style.display = "none";
    nextBtn.textContent = doneLabel; // "နားလည်ပါပီ။"
    return;
  }

  backBtn.style.display = "";
  backBtn.disabled = stepIndex === 0;
  backBtn.textContent = backLabel;

  const stepBtnTexts = Array.isArray(conf?.stepButtons) ? conf.stepButtons : [];

  if (stepIndex === steps.length - 1) {
    nextBtn.textContent = doneLabel;
  } else {
    nextBtn.innerHTML = stepBtnTexts[stepIndex] || nextLabel;
  }
  }

  function renderStep() {
    titleEl.textContent = conf?.title || (productName + " Helper");
    bodyEl.innerHTML = steps[stepIndex];
    updateNavUI();
  }

  // Appear after 3 seconds
  const cancelBtn = document.getElementById("product-helper-cancel");

  _helperTimer = setTimeout(() => {
    wrap.classList.add("is-active");
    btn.classList.add("is-visible");
    cancelBtn?.classList.add("is-visible");
  }, 2000);
  // Cancel: remove both buttons + panel
cancelBtn?.addEventListener("click", () => {
  wrap.classList.remove("is-active");
  btn.classList.remove("is-visible");
  cancelBtn.classList.remove("is-visible");
  panel.classList.remove("show");
  nav.classList.remove("show");
  nav.style.display = "none";

  setTimeout(() => removeProductHelper(), 250);
});


  // Click: show/hide panel
  btn.addEventListener("click", () => {
    if (cancelBtn) cancelBtn.classList.remove("is-visible");
    panel.classList.toggle("show");

    // when panel opens → show nav after 1 second (only if multiple steps)
    if (panel.classList.contains("show")) {
      renderStep();

      if (navTimer) clearTimeout(navTimer);
      nav.classList.remove("show");
      nav.style.display = "none";

      navTimer = setTimeout(() => {
      nav.style.display = "flex";
      updateNavUI();
      setTimeout(() => {
      nav.classList.add("show");
      }, 20);
      }, 500);
    } else {
      // panel closed → reset nav timer
      if (navTimer) clearTimeout(navTimer);
      nav.classList.remove("show");
      nav.style.display = "none";
    }
  });

  backBtn.addEventListener("click", () => {
    if (stepIndex > 0) {
      stepIndex--;
      renderStep();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (stepIndex < steps.length - 1) {
      stepIndex++;
      renderStep();
     } else {
     wrap.classList.remove("is-active");
     btn.classList.remove("is-visible");
     panel.classList.remove("show");
     nav.classList.remove("show");
     nav.style.display = "none";

     setTimeout(() => removeProductHelper(), 250);
    }
  });
}


  const cartKey = ({
    product,
    section,
    duration,
    priceText
  }) => [product, section, duration, priceText].join("|");
  // ✅ Convert product name to URL-friendly text
  function toSlug(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')      // spaces -> -
    .replace(/[^\w-]/g, '');   // remove weird symbols
  }

  /* =========================
      CART LOGIC
      ========================= */
  function addToCart(item) {
    const key = cartKey(item);
    const existing = cart.find(x => cartKey(x) === key);
    if (existing) existing.qty += 1;
    else cart.push({
      ...item,
      qty: 1
    });
    renderCart();
    reflectQuantitiesOnRows();
  }

  function decFromCart(item) {
    const key = cartKey(item);
    const index = cart.findIndex(x => cartKey(x) === key);
    if (index > -1) {
      cart[index].qty -= 1;
      if (cart[index].qty <= 0) cart.splice(index, 1);
      renderCart();
      reflectQuantitiesOnRows();
    }
  }

  function removeItemFromCart(key) {
    const index = cart.findIndex(x => cartKey(x) === key);
    if (index > -1) {
      cart.splice(index, 1);
      renderCart();
      reflectQuantitiesOnRows();
    }
  }

  function clearCart() {
    cart = [];
    renderCart();
    reflectQuantitiesOnRows();
  }

  /* =========================
      RENDERING FUNCTIONS
      ========================= */
  function renderCart() {
    if (!cart.length) {
      dom.cart.bar.style.display = "none";
      document.body.style.paddingBottom = "0";
      return;
    }
    dom.cart.bar.style.display = "block";
    dom.cart.list.innerHTML = cart.map(i => {
      const sub = i.unitPrice * i.qty;
      return `<div class="cart-item">
        <div class="meta"><span class="title">${escapeHTML(i.product)} • ${escapeHTML(i.section)}</span>
        <span class="sub">${escapeHTML(i.duration)} • ${escapeHTML(i.priceText)}</span></div>
        <div class="subtotal">${formatKyats(sub)}</div>
        <button class="remove-btn" data-cart-key="${escapeHTML(cartKey(i))}">×</button>
      </div>`;
    }).join("");
    const total = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    dom.cart.total.textContent = formatKyats(total);
    dom.cart.count.textContent = String(cart.reduce((s, i) => s + i.qty, 0));
    requestAnimationFrame(() => {
  // FIX: Avoid massive blank scroll space when cart is expanded.
  // We only reserve the collapsed height.
    const cartBarHeight = 60;
    document.body.style.paddingBottom = cartBarHeight + "px";
    });
  }

  function reflectQuantitiesOnRows() {
    document.querySelectorAll(".qty-val").forEach(el => {
      const key = el.dataset.itemKey;
      const item = cart.find(i => cartKey(i) === key);
      el.textContent = item ? item.qty : 0;
    });
  }
  function showView(viewName) {
  Object.values(dom.views).forEach(v => v.classList.remove('active'));
  if (dom.views[viewName]) {
    dom.views[viewName].classList.add('active');
  }

  // ✅ FIX: Only reserve search-bar space on HOME
  document.body.classList.toggle('no-search-padding', viewName !== 'home');

  if (viewName === 'home') {
    dom.search.container.style.display = 'flex';
  } else {
    dom.search.container.style.display = 'none';
    dom.search.input.value = '';
    filterProducts('');
  }
}

  /* =========================
      SEARCH LOGIC 
      ========================= */
  function filterProducts(query) {
    query = query.toLowerCase().trim();
    dom.search.clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    dom.views.home.classList.toggle('is-searching', query.length > 0);

    if (query.length === 0) {
      productCards.forEach(card => card.classList.remove('search-match'));
      return;
    }

    productCards.forEach(card => {
      const name = card.dataset.productName.toLowerCase();
      // Rule Kron: Enhanced search to check category headers
      const section = card.closest('.grid')?.previousElementSibling?.textContent?.toLowerCase() || '';
      if (name.includes(query) || section.includes(query)) {
        card.classList.add('search-match');
      } else {
        card.classList.remove('search-match');
      }
    });
  }

  /* =========================
      POPULAR SECTION LOGIC
      ========================= */
  const popularList = ["Express Vpn", "ChatGPT", "CapCut", "Netflix", "Wink"];

  function renderPopular(containerId, excludeName) {
    const cont = document.getElementById(containerId);
    if (!cont) return;
    const items = popularList.filter(n => excludeName ? n !== excludeName : true);
    const oneSetHTML = items.map(name => `
      <div class="pop-card" data-product-name="${escapeHTML(name)}">
        <img src="${imageFor[name]}" alt="${escapeHTML(name)}">
        <p>${escapeHTML(name)}</p>
      </div>`).join("");
    const track = document.createElement("div");
    track.className = "pop-track";
    track.innerHTML = oneSetHTML.repeat(3);
    cont.innerHTML = "";
    cont.appendChild(track);
    enableAutoScroll(cont, track);
  }

  const _autoScrollState = new WeakMap();

  function enableAutoScroll(container, track) {
    const SPEED = 120,
      USER_PAUSE_MS = 1200;
    let rafId, lastUserTs = performance.now();
    const singleWidth = track.scrollWidth / 3;
    container.scrollLeft = singleWidth;

    function tick() {
      const now = performance.now();
      if (now - lastUserTs > USER_PAUSE_MS) {
        container.scrollLeft += SPEED;
        if (container.scrollLeft >= singleWidth * 2) container.scrollLeft -= singleWidth;
        if (container.scrollLeft < 0) container.scrollLeft += singleWidth;
      }
      rafId = requestAnimationFrame(tick);
    }
    const prev = _autoScrollState.get(container);
    if (prev && prev.rafId) cancelAnimationFrame(prev.rafId);
    rafId = requestAnimationFrame(tick);
    _autoScrollState.set(container, {
      rafId
    });
    const userActive = () => {
      lastUserTs = performance.now();
    };
    ["wheel", "pointerdown", "pointerup", "touchstart", "touchmove", "scroll"].forEach(ev => container.addEventListener(ev, userActive, {
      passive: true
    }));
  }
  /* =========================
      PRODUCT PAGE LOGIC
      ========================= */
  function openProduct(productName) {
  if (dom.views.home.classList.contains('active')) {
    lastScroll = window.scrollY;
  }

// ✅ Update URL so you can copy/share this product page
history.replaceState(null, "", "#" + toSlug(productName));

const regionalParent = getRegionalParent(productName);

if (regionalParent) {
  activeRegionalHelperParent = regionalParent;
} else {
  resetActiveRegionalHelper();
}

// --- Handle Regional Products ---
if (regionalProducts[productName]) {
      renderRegionalSelector(productName, regionalProducts[productName]);
      return;
    }

    const devices = deviceSupport[productName] || [];
    const deviceIconsHtml = devices.length > 0 ? `
        <div class="supported-devices">
            ${devices.map(device => `<span class="device-icon">${deviceIconMap[device] || ''}</span>`).join('')}
        </div>
    ` : '';

    const pdata = productData[productName] || {};
    let sectionsHTML = '';

    const firstValue = Object.values(pdata)[0];
    const isPlatformNested = firstValue && typeof firstValue === 'object' && !Array.isArray(firstValue) && (Object.keys(firstValue).includes('Share') || Object.keys(firstValue).includes('Private') || Object.keys(firstValue).includes('Pro Share') || Object.keys(firstValue).includes('Pro Private'));

    if (isPlatformNested) {
      sectionsHTML = Object.entries(pdata).map(([platformName, platformData]) => {
        const platformPlansHTML = Object.entries(platformData).map(([sectionName, plans]) => {
          if (!plans || !plans.length) return "";
          const rows = plans.map(p => {
            const unit = parseKyats(p.price);
            const itemBase = {
              product: `${productName} (${platformName})`,
              section: sectionName,
              duration: p.duration || "",
              unitPrice: unit,
              priceText: p.price || ""
            };
            const key = cartKey(itemBase);
            const dataAttr = `data-item='${escapeHTML(JSON.stringify(itemBase))}'`;
            const qty = (cart.find(i => cartKey(i) === key)?.qty) || 0;
            const isDisabled = p.price === "Out of stock";
            return `
                      <div class="plan-row tap-anim-target">
                        <span class="plan-left">${escapeHTML(p.duration || "")}</span>
                        <span class="plan-price">${escapeHTML(p.price || "")}</span>
                        <span class="plan-qty">
                          ${unit == null || isDisabled ? '' : `
                            <span class="qty">
                              <button class="qty-btn" data-action="dec" ${dataAttr} ${isDisabled ? 'disabled' : ''}>−</button>
                              <span class="qty-val" data-item-key="${escapeHTML(key)}">${qty}</span>
                              <button class="qty-btn" data-action="inc" ${dataAttr} ${isDisabled ? 'disabled' : ''}>+</button>
                            </span>`}
                        </span>
                      </div>`;
          }).join("");
          return `<div class="plan-box"><div class="plan-title">${escapeHTML(sectionName)}</div><div class="plan-rows">${rows}</div></div>`;
        }).join("");
        return `<div class="platform-title">${escapeHTML(platformName)}</div>${platformPlansHTML}`;
      }).join("");
    } else {
      sectionsHTML = Object.entries(pdata).map(([sectionName, plans]) => {
        if (!plans || !plans.length) return "";
        const rows = plans.map(p => {
          const unit = parseKyats(p.price);
          const itemBase = {
            product: productName,
            section: sectionName,
            duration: p.duration || "",
            unitPrice: unit,
            priceText: p.price || ""
          };
          const key = cartKey(itemBase);
          const dataAttr = `data-item='${escapeHTML(JSON.stringify(itemBase))}'`;
          const qty = (cart.find(i => cartKey(i) === key)?.qty) || 0;
          const isDisabled = p.price === "Out of stock";
          return `
                  <div class="plan-row tap-anim-target">
                    <span class="plan-left">${escapeHTML(p.duration || "")}</span>
                    <span class="plan-price">${escapeHTML(p.price || "")}</span>
                    <span class="plan-qty">
                      ${unit == null || isDisabled ? '' : `
                        <span class="qty">
                          <button class="qty-btn" data-action="dec" ${dataAttr} ${isDisabled ? 'disabled' : ''}>−</button>
                          <span class="qty-val" data-item-key="${escapeHTML(key)}">${qty}</span>
                          <button class="qty-btn" data-action="inc" ${dataAttr} ${isDisabled ? 'disabled' : ''}>+</button>
                        </span>`}
                    </span>
                  </div>`;
        }).join("");
        let title = sectionName;
        let style = '';
        
        // --- VISUAL LOGIC HANDLERS ---
        if (productName === 'Express Vpn') {
          if (sectionName === 'Share') {
            title = 'Share 1 device Only';
          } else if (sectionName === 'Private') {
            title = 'Private Own 9 Devices';
            style = 'style="color: #ffeb3b;"';
          }
        } else if (productName === 'Photoshop' || productName === 'LightRoom' || productName.startsWith('Adobe ')) {
          if (productName !== 'Adobe Creative Cloud' && sectionName === 'Private') {
            title += ' <span style="background:#ffeb3b; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #ffeb3b;">Powered by CreativeCloud</span>';
          } else if (sectionName === 'App&Web Private') {
             title += ' <span style="background:#ffeb3b; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #ffeb3b;">Powered by CreativeCloud</span>';
          }
        } else if (productName === 'Flow AI' || productName === 'NotebookLM') {
         if (sectionName === 'Invite OwnMail' || sectionName === 'OwnMail Invite' || sectionName === 'Private') {
            title += ' <span style="background:#ffeb3b; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #ffeb3b;">Powered By GoogleOneGemini</span>';
          }
        } else if (productName === 'AlightMotion') {
         if (sectionName === 'Private (Own Mail)') {
            title += ' <span style="background:#00ff9c; color:#002b1f; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 10px #00ff9c;">Recommended</span>';
          }
         if (sectionName === 'Share' || sectionName === 'Private') {
            title += ' <span style="background:#00ff9c; color:#002b1f; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 10px #00ff9c;">Pro Subscription</span>';
          }
        } else if (productName === 'CapCut') {
         if (sectionName === 'Share' || sectionName === 'Private' || sectionName === 'Private Own Mail') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">Pro Subscription</span>';
          }
          } else if (productName === 'Wink') {
         if (sectionName === 'Private VIP') {
            title = 'Private <span style="background:#d4d4d8; color:#18181b; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #d4d4d8;">VIP Subscription</span>';
          } else if (sectionName === 'Private VIP Plus') {
            title = 'Private <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #666666;">VIP+ Subscription</span>';
          } else if (sectionName === 'Share') {
            title = 'Share <span style="background:#d4d4d8; color:#18181b; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #d4d4d8;">VIP Subscription</span>';
          }
        } else if (productName === 'Meitu') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#ff4d8d; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff4d8d;">VIP Subscription</span>';
          }
         } else if (productName === 'PhotoRoom') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#2e1065; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #c084fc;">MAX Subscription</span>';
          }
         } else if (productName === 'Remini') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#ff0000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff0000;">Pro Subscription</span>';
          }
         } else if (productName === 'INSHOT') {
         if (sectionName === 'Share') {
            title += ' <span style="background:#ff3131; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff3131;">Pro Subscription</span>';
          }
         } else if (productName === 'PicsArt') {
         if (sectionName === 'Share' || sectionName === 'Private') {
            title += ' <span style="background:#a5b4fc; color:#1e1b4b; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #a5b4fc;">Pro Subscription</span>';
          }
        } else if (productName === 'NordVpn') {
         if (sectionName === 'Share' || sectionName === 'Private') {
            title += ' <span style="background:#1e90ff; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #1e90ff;">Myanmarမာသုံးမရပါ</span>';
          }
         } else if (productName === 'Surfshark Vpn') {
         if (sectionName === 'Share' || sectionName === 'Private') {
            title += ' <span style="background:#5eead4; color:#042f2e; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #5eead4;">Myanmarမာသုံးမရပါ</span>';
          }
          } else if (productName === 'Grok') {
         if (sectionName === 'Share Plan' || sectionName === 'Private Plan') {
            title += ' <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #666666;">Super Subscription</span>';
          }
        } else if (productName === 'ChatGPT') {
         if (sectionName === 'Personal Plus (Private)' || sectionName === 'Business Plus - Invite Own Email' || sectionName === 'Personal Plus(Full Warrenty)' || sectionName === 'Business Plus Own' || sectionName === 'Business Plus Own(Full Warranty)') {
            title += ' <span style="background:#000000; color:#00ff9c; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #00ff9c;">Plus</span>';
          }
        if (sectionName === 'Private') {
            title += ' <span style="background:#000000; color:#00ff9c; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #00ff9c;">Go Subscription</span>';
          }
          } else if (productName === 'Gemini Pro') {
         if (sectionName === 'Head(Can Invite 5 Email)' || sectionName === 'OwnMail Invite') {
            title += ' <span style="background:#67e8f9; color:#083344; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #67e8f9;">Pro Subscription</span>';
          }
          } else if (productName === 'Claude Opus') {
         if (sectionName === '50 Million token' || sectionName === '70 Million token' || sectionName === '100 Million token') {
            title += ' <span style="background:#f97316; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #f97316;">Private API Key</span>';
          }
          } else if (productName === 'ChatGPT API') {
         if (sectionName === '50 Million token' || sectionName === '70 Million token' || sectionName === '100 Million token') {
            title += ' <span style="background:#000000; color:#00ff9c; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #00ff9c;">Private API Key</span>';
          }
          } else if (productName === 'Claude Sonnet') {
         if (sectionName === '1 Billion token') {
            title += ' <span style="background:#f97316; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #f97316;">Private API Key</span>';
          }
          } else if (productName === 'Qwen') {
         if (sectionName === '1 Billion token') {
            title += ' <span style="background:#2e1065; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #c084fc;">Private API Key</span>';
          }
          } else if (productName === 'DeepSeek') {
         if (sectionName === '1 Billion token') {
            title += ' <span style="background:#1e90ff; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #1e90ff;">Private API Key</span>';
          }
          } else if (productName === 'Perplexity Ai') {
         if (sectionName === 'Share' || sectionName === 'Private' || sectionName === 'OwnMail Private') {
            title += ' <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #666666;">Pro Subscription</span>';
          }
          } else if (productName === 'Telegram Premium') {
         if (sectionName === 'Login' || sectionName === 'Gift Plan' || sectionName === 'Link Plan') {
            title += ' <span style="background:#bae6fd; color:#082f49; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #bae6fd;">Premium Subscription</span>';
          }
          } else if (productName === 'Microsoft 365') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#f1f5f9; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #e2e8f0;">Personal Subscription</span>';
          }
         if (sectionName === 'Own Mail Invite' || sectionName === 'Private Head') {
            title += ' <span style="background:#cffafe; color:#164e63; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #a5f3fc;">Family Subscription</span>';
          }
          } else if (productName === 'Netflix') {
         if (sectionName === 'SemiPrivate Premium') {
            title = 'SemiPrivate <span style="background:#000000; color:#ff3131; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff3131;">Premium Subscription</span>';
          } else if (sectionName === 'SemiPrivate Standard') {
            title = 'SemiPrivate <span style="background:#000000; color:#ff3131; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff3131;">Standard Subscription</span>';
          } else if (sectionName === 'Whole Account') {
            title = 'Whole Account <span style="background:#000000; color:#ff3131; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff3131;">Premium Subscription</span>';
          }
          } else if (productName === 'Canva') {
         if (sectionName === 'Private Pro') {
            title = 'Private <span style="background:#38bdf8; color:#020617; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #38bdf8;">Pro Subscription</span>';
          } else if (sectionName === 'Private Business') {
            title = 'Private <span style="background:#38bdf8; color:#020617; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #38bdf8;">Business Subscription</span>';
          } else if (sectionName === 'Own Mail') {
            title = 'Own Mail(Invite) <span style="background:#38bdf8; color:#020617; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #38bdf8;">Educational</span>';
          } else if (sectionName === 'Share') {
            title = 'Share <span style="background:#38bdf8; color:#020617; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #38bdf8;">Business Subscription</span>';
          }
          } else if (productName === 'HBO Max') {
         if (sectionName === '1 Month') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">Ultimate</span>';
          }
         if (sectionName === 'Whole Account') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">Standard</span>';
          }
          } else if (productName === 'Prime Video') {
         if (sectionName === 'Share' || sectionName === 'Private') {
            title += ' <span style="background:#2563eb; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #60a5fa;">Prime</span>';
          }
          } else if (productName === 'TikTok Official') {
         if (sectionName === 'Login method' || sectionName === 'NoLoginBoost') {
            title += ' <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #9d4edd;">Boosting</span>';
          }
          } else if (productName === 'Crunchyroll') {
         if (sectionName === 'Share') {
            title += ' <span style="background:#ff7a18; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff7a18;">Mega Fan</span>';
          }
          } else if (productName === 'Apple Music') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#ef4444; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ef4444;">Individual Subscription</span>';
          }
          } else if (productName === 'YouTube Premium') {
         if (sectionName === 'Private' || sectionName === 'OwnMail') {
            title += ' <span style="background:#ff0000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff0000;">Individual Subscription</span>';
          }
          } else if (productName === 'YouTube Music') {
         if (sectionName === 'Private' || sectionName === 'OwnMail') {
            title += ' <span style="background:#ff0000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #ff0000;">Individual Subscription</span>';
          }
          } else if (productName === 'Tidal Music') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#020617; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #38bdf8;">Individual Subscription</span>';
          }
          } else if (productName === 'Qobuz') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #666666;">Individual Subscription</span>';
          }
          } else if (productName === 'Zoom') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#2563eb; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #2563eb;">Pro Subscription</span>';
          }
          } else if (productName === 'BSTATION') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#0284c7; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #0284c7;">Premium Subscription</span>';
          }
          } else if (productName === 'SCRIBD') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#0f766e; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #2dd4bf;">Premium Subscription</span>';
          }
          } else if (productName === 'TradingView') {
         if (sectionName === 'Private Plus') {
            title = 'Private <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #666666;">Plus Subscription</span>';
          } else if (sectionName === 'Private Premium') {
            title = 'Private <span style="background:#000000; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #666666;">Premium Subscription</span>';
          }
          } else if (productName === 'WPS Office') {
         if (sectionName === 'Share') {
            title += ' <span style="background:#dc2626; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #dc2626;">Pro Subscription</span>';
          }
          } else if (productName === 'Google Drive') {
         if (sectionName === 'OwnMail invite') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">5,000 GB</span>';
          }
          } else if (productName === 'Google Drive') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">1,000 GB</span>';
          }
          } else if (productName === 'Duolingo Super') {
         if (sectionName === 'Family Head') {
            title += ' <span style="background:#2e1065; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #c084fc;">Super Subscription</span>';
          }
          } else if (productName === 'Spotify') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#000000; color:#00ff9c; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #00ff9c;">Individual Subscription</span>';
          }
         if (sectionName === 'Family Private') {
            title += ' <span style="background:#000000; color:#00ff9c; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #00ff9c;">Family Subscription</span>';
          }
          } else if (productName === 'Google One') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">5,000 GB</span>';
          }
         if (sectionName === 'OwnMail invite') {
            title += ' <span style="background:#cbd5e1; color:#0f172a; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #cbd5e1;">5,000 GB</span>';
          }
          } else if (productName === 'Discord') {
         if (sectionName === 'Private') {
            title += ' <span style="background:#a855f7; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #a855f7;">Nitro Subscription</span>';
          }
         if (sectionName === 'Sever Boost') {
            title += ' <span style="background:#a855f7; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #a855f7;">Nitro</span>';
          }
        } else if (productName === 'Gemini Pro') {
          if (sectionName.includes('OwnMail')) {
            title = 'OwnMail Invite';
            style = 'style="color: #ffeb3b;"';
          }
        }
        return `<div class="plan-box"><div class="plan-title" ${style}>${title}</div><div class="plan-rows">${rows}</div></div>`;
      }).join("");
    }

let heroImageSrc = imageFor[productName];

if (productName.startsWith("Google Play ") && productName !== "Google Play Gift Card") {
  heroImageSrc = imageFor["Google Play Gift Card"];
}

if (productName.startsWith("Steam ") && productName !== "Steam Gift Card") {
  heroImageSrc = imageFor["Steam Gift Card"];
}
if (
  productName.startsWith("Apple ") &&
  productName !== "Apple Gift Card" &&
  productName !== "Apple Music"
) {
  heroImageSrc = imageFor["Apple Gift Card"];
}
    const pageHTML = `
      <button class="back-btn" id="product-back-btn">← Back</button>
      <div class="product-hero">
        <div class="hero-img-wrap"><img src="${heroImageSrc || imageFor['Google Play Gift Card']}" alt="${escapeHTML(productName)} logo" /></div>
        <div class="hero-title">${escapeHTML(productName)}</div>
        ${deviceIconsHtml} 
        <div class="button-container">
            <button class="btn btn-outline hero-more" data-product-name="${escapeHTML(productName)}">More Details</button>
            <button class="btn btn-outline" id="why-buy-btn">ဘာကြောင့်ဝယ်သင့်တာလဲ</button>
        </div>
      </div>
      ${sectionsHTML}
      <section class="popular-section">
        <div class="popular-head">
          <h2 class="popular-title">Popular</h2>
          <div class="popular-underline"></div>
        </div>
        <div class="pop-scroller" id="popular-product"></div>
      </section>`;

    dom.views.product.innerHTML = pageHTML;

    if (helperDisabledProducts.includes(productName)) {
      removeProductHelper();
    } else {
      initProductHelper(productName);
    }

// =========================
// DOMAIN CHECKERS
// .my.id + Global Domains
// =========================
if (productName === "Domain") {
  // =========================
  // DOMAIN PRICES
  // =========================
  const MY_ID_PRICE_TEXT = "30,000 Kyats";
  const MY_ID_PRICE = 30000;

  const GLOBAL_DOMAIN_PRICES = {
    ".com": {
      text: "15,000 Kyats",
      value: 15000
    },
    ".xyz": {
      text: "15,000 Kyats",
      value: 15000
    },
    ".net": {
      text: "18,000 Kyats",
      value: 18000
    },
    ".org": {
      text: "17,000 Kyats",
      value: 17000
    },
    ".link": {
      text: "17,000 Kyats",
      value: 17000
    }
  };

  // Store the original plan boxes before adding checker boxes.
  const domainPlanBoxes =
    dom.views.product.querySelectorAll(".plan-box");

  const myIdPlanBox =
    domainPlanBoxes.length > 0
      ? domainPlanBoxes[0]
      : null;

  const globalPlanBox =
    domainPlanBoxes.length > 1
      ? domainPlanBoxes[domainPlanBoxes.length - 1]
      : null;

  // =========================
  // .MY.ID CHECKER HTML
  // =========================
  const myIdCheckerHTML = `
    <div class="plan-box" id="domain-checker-box">
      <div class="plan-title">
        Check .my.id Availability
      </div>

      <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
        <label style="font-size:14px; color:#ccc;">
          Enter Domain Name
        </label>

        <div style="display:flex; gap:10px; align-items:center;">
          <input
            id="domain-check-input"
            placeholder="example: bluelamp"
            style="flex:1; min-width:0; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
          />

          <div style="font-weight:800; opacity:.8;">
            .my.id
          </div>
        </div>

        <div style="font-size:14px; font-weight:800; opacity:.85;">
          1 Year — 30,000 Kyats
        </div>

        <button
          id="domain-check-btn"
          class="btn btn-primary"
          style="width:100%;"
        >
          Check
        </button>

        <div
          id="domain-check-result"
          style="font-size:14px;"
        ></div>

        <button
          id="domain-add-btn"
          class="btn btn-primary"
          style="width:100%; display:none;"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `;

  // =========================
  // GLOBAL CHECKER HTML
  // =========================
  const globalCheckerHTML = `
  <style>
  #global-domain-extension-btn,
  .global-domain-option {
    -webkit-tap-highlight-color: transparent;
    outline: none;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
  }

  #global-domain-extension-btn:focus,
  #global-domain-extension-btn:focus-visible,
  #global-domain-extension-btn:active,
  .global-domain-option:focus,
  .global-domain-option:focus-visible,
  .global-domain-option:active {
    outline: none;
    box-shadow: none;
  }
</style>
    <div class="plan-box" id="global-domain-checker-box">
      <div class="plan-title">
        Check Global Domain Availability
      </div>

      <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
        <label style="font-size:14px; color:#ccc;">
          Enter Domain Name
        </label>

<div style="display:flex; gap:10px; align-items:center;">
  <input
    id="global-domain-check-input"
    placeholder="example: bluelamp"
    style="flex:1; min-width:0; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
  />

  <div
    id="global-domain-extension-wrap"
    style="position:relative; width:110px; flex-shrink:0;"
  >
    <button
      type="button"
      id="global-domain-extension-btn"
      style="
        width:100%;
        padding:12px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        border-radius:8px;
        border:1px solid rgba(255,255,255,0.2);
        background:#111;
        color:white;
        font-size:16px;
        cursor:pointer;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        box-shadow: none;
      "
    >
      <span id="global-domain-extension-text">.com</span>
      <span
        id="global-domain-extension-arrow"
        style="
          display:inline-block;
          font-size:12px;
          opacity:.75;
          transition:transform .2s ease;
        "
      >
        ▼
      </span>
    </button>

    <div
      id="global-domain-extension-menu"
      style="
        position:absolute;
        top:calc(100% + 7px);
        right:0;
        width:100%;
        display:none;
        overflow:hidden;
        z-index:1000;
        border-radius:10px;
        border:1px solid rgba(255,255,255,0.18);
        background:#090f1f;
        box-shadow:0 12px 30px rgba(0,0,0,.55);
      "
    >
      <button
        type="button"
        class="global-domain-option"
        data-extension=".com"
        style="width:100%; padding:12px; border:0; border-bottom:1px solid rgba(255,255,255,.08); background:rgba(0,191,255,.16); color:#37c9ff; text-align:left; font-size:15px; cursor:pointer;"
      >
        .com <span style="float:right;">✓</span>
      </button>

      <button
        type="button"
        class="global-domain-option"
        data-extension=".xyz"
        style="width:100%; padding:12px; border:0; border-bottom:1px solid rgba(255,255,255,.08); background:transparent; color:white; text-align:left; font-size:15px; cursor:pointer;"
      >
        .xyz
      </button>

      <button
        type="button"
        class="global-domain-option"
        data-extension=".net"
        style="width:100%; padding:12px; border:0; border-bottom:1px solid rgba(255,255,255,.08); background:transparent; color:white; text-align:left; font-size:15px; cursor:pointer;"
      >
        .net
      </button>

      <button
        type="button"
        class="global-domain-option"
        data-extension=".org"
        style="width:100%; padding:12px; border:0; border-bottom:1px solid rgba(255,255,255,.08); background:transparent; color:white; text-align:left; font-size:15px; cursor:pointer;"
      >
        .org
      </button>

      <button
        type="button"
        class="global-domain-option"
        data-extension=".link"
        style="width:100%; padding:12px; border:0; background:transparent; color:white; text-align:left; font-size:15px; cursor:pointer;"
      >
        .link
      </button>
    </div>
  </div>
</div>

        <div
          id="global-domain-selected-price"
          style="font-size:14px; font-weight:800; opacity:.85;"
        >
          1 Year — 15,000 Kyats
        </div>

        <button
          id="global-domain-check-btn"
          class="btn btn-primary"
          style="width:100%;"
        >
          Check
        </button>

        <div
          id="global-domain-check-result"
          style="font-size:14px;"
        ></div>

        <button
          id="global-domain-add-btn"
          class="btn btn-primary"
          style="width:100%; display:none;"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `;

  // =========================
  // INSERT CHECKER BOXES
  // =========================
  if (myIdPlanBox) {
    myIdPlanBox.insertAdjacentHTML(
      "afterend",
      myIdCheckerHTML
    );
  }

  if (globalPlanBox) {
    globalPlanBox.insertAdjacentHTML(
      "afterend",
      globalCheckerHTML
    );
  }

  // =========================
  // .MY.ID ELEMENTS
  // =========================
  const myIdInput =
    document.getElementById("domain-check-input");

  const myIdCheckBtn =
    document.getElementById("domain-check-btn");

  const myIdAddBtn =
    document.getElementById("domain-add-btn");

  const myIdResult =
    document.getElementById("domain-check-result");

  let lastAvailableMyIdDomain = null;

  const renderMyIdResult = (type, text) => {
    const colours = {
      ok: "#00e676",
      bad: "#ff5252",
      warn: "#ffd54f",
      info: "#b0bec5"
    };

    myIdResult.innerHTML = `
      <span style="color:${colours[type] || colours.info}; font-weight:800;">
        ${text}
      </span>
    `;
  };

  const resetMyIdCheck = () => {
    myIdAddBtn.style.display = "none";
    lastAvailableMyIdDomain = null;
  };

  // =========================
  // .MY.ID CHECK BUTTON
  // =========================
  myIdCheckBtn.addEventListener("click", async () => {
    resetMyIdCheck();

    myIdCheckBtn.textContent = "Checking...";
    myIdCheckBtn.disabled = true;
    myIdResult.textContent = "";

    const checkResult =
      await checkMyIdAvailability(myIdInput.value);

    if (checkResult.status === "invalid") {
      renderMyIdResult(
        "warn",
        "Type a valid domain name first"
      );
    } else if (checkResult.status === "available") {
      lastAvailableMyIdDomain = checkResult.domain;

      renderMyIdResult(
        "ok",
        `${checkResult.domain} is Available ✓`
      );

      myIdAddBtn.style.display = "block";
    } else if (checkResult.status === "taken") {
      renderMyIdResult(
        "bad",
        `${checkResult.domain} is Taken ✕`
      );
    } else {
      renderMyIdResult(
        "warn",
        "Can't check right now (blocked/offline)"
      );
    }

    myIdCheckBtn.textContent = "Check";
    myIdCheckBtn.disabled = false;
  });

  myIdInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      myIdCheckBtn.click();
    }
  });

  myIdInput.addEventListener("input", () => {
    resetMyIdCheck();
    myIdResult.textContent = "";
  });

  // =========================
  // .MY.ID ADD TO CART
  // =========================
  myIdAddBtn.addEventListener("click", () => {
    if (!lastAvailableMyIdDomain) {
      return;
    }

    const item = {
      product: "Domain",
      section: "My.ID/my.id",
      duration: `${lastAvailableMyIdDomain} (1 Year)`,
      unitPrice: MY_ID_PRICE,
      priceText: MY_ID_PRICE_TEXT
    };

    addToCart(item);

    myIdAddBtn.textContent = "Added!";

    setTimeout(() => {
      myIdAddBtn.textContent = "Add to Cart";
    }, 900);
  });

  // =========================
  // GLOBAL DOMAIN ELEMENTS
  // =========================
  const globalInput =
    document.getElementById("global-domain-check-input");

const globalExtensionWrap =
  document.getElementById(
    "global-domain-extension-wrap"
  );

const globalExtensionBtn =
  document.getElementById(
    "global-domain-extension-btn"
  );

const globalExtensionText =
  document.getElementById(
    "global-domain-extension-text"
  );

const globalExtensionArrow =
  document.getElementById(
    "global-domain-extension-arrow"
  );

const globalExtensionMenu =
  document.getElementById(
    "global-domain-extension-menu"
  );

const globalExtensionOptions =
  document.querySelectorAll(
    ".global-domain-option"
  );

const globalPriceDisplay =
  document.getElementById(
    "global-domain-selected-price"
  );

let selectedGlobalExtension = ".com";

  const globalCheckBtn =
    document.getElementById("global-domain-check-btn");

  const globalAddBtn =
    document.getElementById("global-domain-add-btn");

  const globalResult =
    document.getElementById("global-domain-check-result");

  let lastAvailableGlobalDomain = null;
  let lastAvailableGlobalExtension = null;

  const renderGlobalResult = (type, text) => {
    const colours = {
      ok: "#00e676",
      bad: "#ff5252",
      warn: "#ffd54f",
      info: "#b0bec5"
    };

    globalResult.innerHTML = `
      <span style="color:${colours[type] || colours.info}; font-weight:800;">
        ${text}
      </span>
    `;
  };

  const resetGlobalCheck = () => {
    globalAddBtn.style.display = "none";
    lastAvailableGlobalDomain = null;
    lastAvailableGlobalExtension = null;
  };

const updateGlobalPrice = () => {
  const selectedPrice =
    GLOBAL_DOMAIN_PRICES[
      selectedGlobalExtension
    ];

  globalPriceDisplay.textContent =
    `1 Year — ${selectedPrice.text}`;

  resetGlobalCheck();
  globalResult.textContent = "";
};

// =========================
// CUSTOM EXTENSION DROPDOWN
// =========================
const closeGlobalExtensionMenu = () => {
  globalExtensionMenu.style.display = "none";
  globalExtensionArrow.style.transform =
    "rotate(0deg)";
  
  globalExtensionBtn.blur();
};

const openGlobalExtensionMenu = () => {
  globalExtensionMenu.style.display = "block";
  globalExtensionArrow.style.transform =
    "rotate(180deg)";
};

globalExtensionBtn.addEventListener(
  "click",
  event => {
    event.stopPropagation();

    const isOpen =
      globalExtensionMenu.style.display ===
      "block";

    if (isOpen) {
      closeGlobalExtensionMenu();
    } else {
      openGlobalExtensionMenu();
    }
  }
);

globalExtensionOptions.forEach(option => {
  option.addEventListener("click", event => {
    event.stopPropagation();

    selectedGlobalExtension =
      option.dataset.extension;

    globalExtensionText.textContent =
      selectedGlobalExtension;

    globalExtensionOptions.forEach(item => {
      const isSelected =
        item.dataset.extension ===
        selectedGlobalExtension;

      item.style.background = isSelected
        ? "rgba(0,191,255,.16)"
        : "transparent";

      item.style.color = isSelected
        ? "#37c9ff"
        : "white";

      item.innerHTML = isSelected
        ? `${item.dataset.extension}<span style="float:right;">✓</span>`
        : item.dataset.extension;
    });

    closeGlobalExtensionMenu();
    updateGlobalPrice();
    option.blur();
  });
});

document.addEventListener("click", event => {
  if (
    !globalExtensionWrap.contains(event.target)
  ) {
    closeGlobalExtensionMenu();
  }
});
  // =========================
  // GLOBAL CHECK BUTTON
  // =========================
  globalCheckBtn.addEventListener("click", async () => {
    resetGlobalCheck();

    globalCheckBtn.textContent = "Checking...";
    globalCheckBtn.disabled = true;
    globalResult.textContent = "";

const selectedExtension =
  selectedGlobalExtension;

const checkResult =
  await checkGlobalDomainAvailability(
    globalInput.value,
    selectedExtension
  );

    if (checkResult.status === "invalid") {
      renderGlobalResult(
        "warn",
        "Type a valid domain name first"
      );
    } else if (checkResult.status === "available") {
      lastAvailableGlobalDomain =
        checkResult.domain;

      lastAvailableGlobalExtension =
        selectedExtension;

      renderGlobalResult(
        "ok",
        `${checkResult.domain} is Available ✓`
      );

      globalAddBtn.style.display = "block";
    } else if (checkResult.status === "taken") {
      renderGlobalResult(
        "bad",
        `${checkResult.domain} is Taken ✕`
      );
    } else {
      renderGlobalResult(
        "warn",
        "Can't check right now (blocked/offline)"
      );
    }

    globalCheckBtn.textContent = "Check";
    globalCheckBtn.disabled = false;
  });

  globalInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      globalCheckBtn.click();
    }
  });

  globalInput.addEventListener("input", () => {
    resetGlobalCheck();
    globalResult.textContent = "";
  });

  // =========================
  // GLOBAL ADD TO CART
  // =========================
  globalAddBtn.addEventListener("click", () => {
    if (
      !lastAvailableGlobalDomain ||
      !lastAvailableGlobalExtension
    ) {
      return;
    }

    const selectedPrice =
      GLOBAL_DOMAIN_PRICES[
        lastAvailableGlobalExtension
      ];

    const item = {
      product: "Domain",
      section: "Global Domain",
      duration:
        `${lastAvailableGlobalDomain} (1 Year)`,
      unitPrice: selectedPrice.value,
      priceText: selectedPrice.text
    };

    addToCart(item);

    globalAddBtn.textContent = "Added!";

    setTimeout(() => {
      globalAddBtn.textContent = "Add to Cart";
    }, 900);
  });
}

    // --- CUSTOM CALCULATOR LOGIC ---
    const customConf = customConfigs[productName];
    if (customConf) {
      const customHTML = `
        <div class="plan-box">
          <div class="plan-title">Custom Amount (${customConf.min} - ${customConf.max} ${customConf.curr})</div>
          <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
              <label style="font-size:14px; color:#ccc;">Enter Amount</label>
              <div style="display:flex; gap:10px;">
                <input type="number" id="custom-amount-input" min="${customConf.min}" max="${customConf.max}" placeholder="${customConf.min}-${customConf.max}" 
                       style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;">
                <div id="custom-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:100px; text-align:right;">0 Kyats</div>
              </div>
              <button id="btn-add-custom" class="btn btn-primary" style="width:100%;">Add to Cart</button>
          </div>
        </div>`;
      const popularSection = dom.views.product.querySelector('.popular-section');
      popularSection.insertAdjacentHTML('beforebegin', customHTML);
      const input = document.getElementById('custom-amount-input');
      const priceDisplay = document.getElementById('custom-calc-price');
      const addBtn = document.getElementById('btn-add-custom');
      input.addEventListener('input', () => {
        const val = parseFloat(input.value);
        if (!val || val < customConf.min || val > customConf.max) {
          addBtn.style.backgroundColor = '#ff4444';
          addBtn.textContent = `⚠️ Limit: ${customConf.min} - ${customConf.max}`;
          priceDisplay.textContent = "0 Kyats";
        } else {
          addBtn.style.removeProperty('background-color');
          addBtn.textContent = "Add to Cart";
          const price = Math.floor(val * customConf.rate);
          priceDisplay.textContent = formatKyats(price);
        }
      });
      addBtn.addEventListener('click', () => {
        const val = parseFloat(input.value);
        if (!val || val < customConf.min || val > customConf.max) return;
        const price = Math.floor(val * customConf.rate);
        const item = {
          product: productName,
          section: "Custom Amount",
          duration: `${customConf.curr}${val}`,
          unitPrice: price,
          priceText: formatKyats(price)
        };
        addToCart(item);
        addBtn.textContent = "Added!";
        setTimeout(() => addBtn.textContent = "Add to Cart", 1000);
      });
    }
    // --- NETFLIX: CUSTOM MONTHS (UHD ONLY) ---
if (productName === "Netflix") {

  // ✅ EXACT section name from productData
  const UHD_SECTION = "SemiPrivate Premium";
  const FHD_SECTION = "SemiPrivate Standard";

  function getNetflixUhdCustomPrice(months) {
    if (months === 1) return 15000;
    if (months === 2) return 27000;
    if (months === 3) return 39000;
    if (months >= 4) return months * 13000;
    return 0;
  }
  function getNetflixFhdCustomPrice(months) {
  if (months >= 1) return months * 10000;
  return 0;
}
  function mountNetflixUhdMonthsBox() {
    const html = `
      <div class="plan-box">
        <div class="plan-title">More Months (1 Profile UHD 4K)</div>
        <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
          <label style="font-size:14px; color:#ccc;">Enter Months (1 - 12)</label>

          <div style="display:flex; gap:10px;">
            <input
              type="number"
              id="netflix-uhd-months-input"
              min="1"
              max="12"
              placeholder="1-12"
              style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
            />
            <div id="netflix-uhd-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:120px; text-align:right;">
              0 Kyats
            </div>
          </div>

          <button id="btn-add-netflix-uhd-months" class="btn btn-primary" style="width:100%;">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    const popularSection = dom.views.product.querySelector(".popular-section");
    if (!popularSection) return;
    popularSection.insertAdjacentHTML("beforebegin", html);

    const input = document.getElementById("netflix-uhd-months-input");
    const priceDisplay = document.getElementById("netflix-uhd-calc-price");
    const addBtn = document.getElementById("btn-add-netflix-uhd-months");

    input.addEventListener("input", () => {
      const months = parseInt(input.value, 10);

      if (!months || months < 1 || months > 12) {
        addBtn.style.backgroundColor = "#ff4444";
        addBtn.textContent = "⚠️ Limit: 1 - 12";
        priceDisplay.textContent = "0 Kyats";
      } else {
        addBtn.style.removeProperty("background-color");
        addBtn.textContent = "Add to Cart";
        priceDisplay.textContent = formatKyats(getNetflixUhdCustomPrice(months));
      }
    });

    addBtn.addEventListener("click", () => {
      const months = parseInt(input.value, 10);
      if (!months || months < 1 || months > 12) return;

      const totalPrice = getNetflixUhdCustomPrice(months);

      const item = {
        product: "Netflix",
        section: UHD_SECTION,
        duration: `${months} Month${months > 1 ? "s" : ""}`,
        unitPrice: totalPrice,
        priceText: formatKyats(totalPrice)
      };

      addToCart(item);

      input.value = "";
      priceDisplay.textContent = "0 Kyats";
      addBtn.style.removeProperty("background-color");

      addBtn.textContent = "Added!";
      setTimeout(() => (addBtn.textContent = "Add to Cart"), 1000);
    });
  }
    function mountNetflixFhdMonthsBox() {
  const html = `
    <div class="plan-box">
      <div class="plan-title">More Months (1 Profile FHD 1080P)</div>
      <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
        <label style="font-size:14px; color:#ccc;">Enter Months (1 - 12)</label>

        <div style="display:flex; gap:10px;">
          <input
            type="number"
            id="netflix-fhd-months-input"
            min="1"
            max="12"
            placeholder="1-12"
            style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
          />
          <div id="netflix-fhd-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:120px; text-align:right;">
            0 Kyats
          </div>
        </div>

        <button id="btn-add-netflix-fhd-months" class="btn btn-primary" style="width:100%;">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  const popularSection = dom.views.product.querySelector(".popular-section");
  if (!popularSection) return;
  popularSection.insertAdjacentHTML("beforebegin", html);

  const input = document.getElementById("netflix-fhd-months-input");
  const priceDisplay = document.getElementById("netflix-fhd-calc-price");
  const addBtn = document.getElementById("btn-add-netflix-fhd-months");

  input.addEventListener("input", () => {
    const months = parseInt(input.value, 10);

    if (!months || months < 1 || months > 12) {
      addBtn.style.backgroundColor = "#ff4444";
      addBtn.textContent = "⚠️ Limit: 1 - 12";
      priceDisplay.textContent = "0 Kyats";
    } else {
      addBtn.style.removeProperty("background-color");
      addBtn.textContent = "Add to Cart";
      priceDisplay.textContent = formatKyats(getNetflixFhdCustomPrice(months));
    }
  });

  addBtn.addEventListener("click", () => {
    const months = parseInt(input.value, 10);
    if (!months || months < 1 || months > 12) return;

    const totalPrice = getNetflixFhdCustomPrice(months);

    const item = {
      product: "Netflix",
      section: FHD_SECTION,
      duration: `${months} Month${months > 1 ? "s" : ""}`,
      unitPrice: totalPrice,
      priceText: formatKyats(totalPrice)
    };

    addToCart(item);

    input.value = "";
    priceDisplay.textContent = "0 Kyats";
    addBtn.style.removeProperty("background-color");

    addBtn.textContent = "Added!";
    setTimeout(() => (addBtn.textContent = "Add to Cart"), 1000);
  });
}
  mountNetflixUhdMonthsBox();
  mountNetflixFhdMonthsBox();
}
   
    // --- TIKTOK OFFICIAL: CUSTOM COINS (like Google Play custom amount) ---
if (productName === "TikTok Official") {
  // Use your existing price as base: 100 Coin = 5,300 Kyats
  const basePriceText = productData["TikTok Official"]?.["Login method"]?.[0]?.price;
  const baseCoinsText = productData["TikTok Official"]?.["Login method"]?.[0]?.duration;

  const basePrice = parseKyats(basePriceText) || 5300; // fallback
  const baseCoinsMatch = String(baseCoinsText || "").match(/(\d+)/);
  const baseCoins = baseCoinsMatch ? parseInt(baseCoinsMatch[1], 10) : 100; // fallback

  // Kyats per coin (example: 5300/100 = 53)
  const kyatsPerCoin = Math.max(1, Math.round(basePrice / baseCoins));

  // You can change these limits if you want
  const MIN_COINS = 100;
  const MAX_COINS = 100000;

  const tiktokCoinsHTML = `
    <div class="plan-box">
      <div class="plan-title">Custom Coins (TikTok Official)</div>
      <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
        <label style="font-size:14px; color:#ccc;">Enter Coins (${MIN_COINS} - ${MAX_COINS})</label>

        <div style="display:flex; gap:10px;">
          <input
            type="number"
            id="tiktok-coins-input"
            min="${MIN_COINS}"
            max="${MAX_COINS}"
            placeholder="${MIN_COINS}-${MAX_COINS}"
            style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
          />
          <div id="tiktok-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:120px; text-align:right;">
            0 Kyats
          </div>
        </div>

        <div style="font-size:12px; opacity:.75; line-height:1.4;">
          Rate: ~${kyatsPerCoin} Kyats / Coin
        </div>

        <button id="btn-add-tiktok-coins" class="btn btn-primary" style="width:100%;">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  const popularSection = dom.views.product.querySelector(".popular-section");
  if (popularSection) {
    popularSection.insertAdjacentHTML("beforebegin", tiktokCoinsHTML);

    const input = document.getElementById("tiktok-coins-input");
    const priceDisplay = document.getElementById("tiktok-calc-price");
    const addBtn = document.getElementById("btn-add-tiktok-coins");

    input.addEventListener("input", () => {
      const coins = parseInt(input.value, 10);

      if (!coins || coins < MIN_COINS || coins > MAX_COINS) {
        addBtn.style.backgroundColor = "#ff4444";
        addBtn.textContent = `⚠️ Limit: ${MIN_COINS} - ${MAX_COINS}`;
        priceDisplay.textContent = "0 Kyats";
        return;
      }

      addBtn.style.removeProperty("background-color");
      addBtn.textContent = "Add to Cart";

      const totalPrice = coins * kyatsPerCoin;
      priceDisplay.textContent = formatKyats(totalPrice);
    });

    addBtn.addEventListener("click", () => {
      const coins = parseInt(input.value, 10);
      if (!coins || coins < MIN_COINS || coins > MAX_COINS) return;

      const totalPrice = coins * kyatsPerCoin;

      const item = {
        product: "TikTok Official",
        section: "Login method",
        duration: `${coins} Coin`,
        unitPrice: totalPrice,
        priceText: formatKyats(totalPrice)
      };

      addToCart(item);

      // ✅ RESET after add
      input.value = "";
      priceDisplay.textContent = "0 Kyats";
      addBtn.style.removeProperty("background-color");

      addBtn.textContent = "Added!";
      setTimeout(() => (addBtn.textContent = "Add to Cart"), 1000);
    });
  }
}
    // --- TELEGRAM STAR: CUSTOM STARS (like TikTok custom coins) ---
if (productName === "Telegram Star") {
  // Base: use your existing "50 Stars" price as reference
  const basePriceText = productData["Telegram Star"]?.["Stars"]?.[0]?.price;      // e.g. "3,800 Kyats"
  const baseStarsText = productData["Telegram Star"]?.["Stars"]?.[0]?.duration;   // e.g. "50 Stars"

  const basePrice = parseKyats(basePriceText) || 3800; // fallback
  const baseStarsMatch = String(baseStarsText || "").match(/(\d+)/);
  const baseStars = baseStarsMatch ? parseInt(baseStarsMatch[1], 10) : 50; // fallback

  // Kyats per star (3800/50 = 76)
  const kyatsPerStar = Math.max(1, Math.round(basePrice / baseStars));

  // Limits (you can adjust)
  const MIN_STARS = 50;
  const MAX_STARS = 100000;

  const tgStarsHTML = `
    <div class="plan-box">
      <div class="plan-title">Custom Stars Amount</div>
      <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
        <label style="font-size:14px; color:#ccc;">Enter Stars (${MIN_STARS} - ${MAX_STARS})</label>

        <div style="display:flex; gap:10px;">
          <input
            type="number"
            id="tg-stars-input"
            min="${MIN_STARS}"
            max="${MAX_STARS}"
            placeholder="${MIN_STARS}-${MAX_STARS}"
            style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
          />
          <div id="tg-stars-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:120px; text-align:right;">
            0 Kyats
          </div>
        </div>

        <div style="font-size:12px; opacity:.75; line-height:1.4;">
          Rate: ~${kyatsPerStar} Kyats / Star (based on ${baseStars} Stars = ${basePrice.toLocaleString("en-US")} Kyats)
        </div>

        <button id="btn-add-tg-stars" class="btn btn-primary" style="width:100%;">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  const popularSection = dom.views.product.querySelector(".popular-section");
  if (popularSection) {
    popularSection.insertAdjacentHTML("beforebegin", tgStarsHTML);

    const input = document.getElementById("tg-stars-input");
    const priceDisplay = document.getElementById("tg-stars-calc-price");
    const addBtn = document.getElementById("btn-add-tg-stars");

    input.addEventListener("input", () => {
      const stars = parseInt(input.value, 10);

      if (!stars || stars < MIN_STARS || stars > MAX_STARS) {
        addBtn.style.backgroundColor = "#ff4444";
        addBtn.textContent = `⚠️ Limit: ${MIN_STARS} - ${MAX_STARS}`;
        priceDisplay.textContent = "0 Kyats";
        return;
      }

      addBtn.style.removeProperty("background-color");
      addBtn.textContent = "Add to Cart";

      const totalPrice = stars * kyatsPerStar;
      priceDisplay.textContent = formatKyats(totalPrice);
    });

    addBtn.addEventListener("click", () => {
      const stars = parseInt(input.value, 10);
      if (!stars || stars < MIN_STARS || stars > MAX_STARS) return;

      const totalPrice = stars * kyatsPerStar;

      const item = {
        product: "Telegram Star",
        section: "Stars",
        duration: `${stars} Stars`,
        unitPrice: totalPrice,
        priceText: formatKyats(totalPrice)
      };

      addToCart(item);

      // ✅ RESET after add
      input.value = "";
      priceDisplay.textContent = "0 Kyats";
      addBtn.style.removeProperty("background-color");

      addBtn.textContent = "Added!";
      setTimeout(() => (addBtn.textContent = "Add to Cart"), 1000);
    });
  }
}
    renderPopular("popular-product", productName);
    showView('product');
    window.scrollTo(0, 0);
  }

  // --- Render Region Grid for Gift Cards ---
  function renderRegionalSelector(productName, regions) {
    const pageHTML = `
      <button class="back-btn" id="product-back-btn">← Back</button>
      <div class="product-hero">
        <div class="hero-img-wrap"><img src="${imageFor[productName]}" alt="${escapeHTML(productName)} logo" /></div>
        <div class="hero-title">${escapeHTML(productName)}</div>
        <div class="hero-subtitle" style="opacity:0.8; margin-bottom:10px;">Select Region</div>
      </div>
        
      <div class="grid region-grid">
        ${regions.map(region => `
            <div class="card tap" data-product-name="${escapeHTML(region.name)}">
                <img src="${region.img}" alt="${escapeHTML(region.name)}">
            </div>
        `).join('')}
      </div>
      `;

    dom.views.product.innerHTML = pageHTML;
    showView('product');
    window.scrollTo(0, 0);
  }

  /* =========================
      CHECKOUT FLOW
      ========================= */
  const paymentInfoBlock = `\n\nWe only accept KBZpay & Wave pay\nWe only use this number for both Payments\nKBZpay-09771664207\n(Name MyinMyintMaw)\nWave - 09771664207\n(Name MyinMyintMaw)\n\nWATCH OUT FOR SCAMMER!!`;
  const generalDetailsBlock = `\n\nWe only accept KBZpay & Wave pay\nWe only use this number for both Payments\nKBZpay-09771664207\n(Name MyinMyintMaw)\nWave - 09771664207\n(Name MyinMyintMaw)\n\nWATCH OUT FOR SCAMMER!!`;
  
  const expressVpnShareNoteBase = `
တခါတလေအကောင့်ကထွက်တာမျိုးနေဖြစ်နိုင်တယ်but ပြန်ဝင်လို့ရပါတယ်

ပီးတော့စဝယ်တဲ့ရက်ကနေ premium ရက် 25ကနေ 31ရက်ကြားက stock ရှိတာရမာပါ။
`;
  const chatGptWarrantyNote = `$20≈$30နဲ့ဝယ်တဲ့ဟာတေမမဟုတ်ရင် Deactivate errorဖြစ်နိုင်လို့ warranty အနေနဲ့ဖြစ်ခဲ့ရင် 1ခုအသစ်ပြန်လဲပေးမာပါ တခါပဲလဲပေးမာမလို့အဆင်ပြေမယူပေးပါ။`;
  const netflixUhdNote = `Subscription: Premium UHD
•Ultra HD (4K) video quality
•HDR support (on compatible titles/devices)
•Best audio quality (including Dolby Atmos on some titles/devices)
•Download on multiple devices (highest limit vs other plans)
•Works on all devices (TV, phone, tablet, laptop)
•Includes full Netflix library (movies, series, originals)`;

  const moreDetailsByProduct = {
    "CapCut": `Share
One device only
ဖုန်းတလုံးပဲသုံးလို့ရပါတယ် Android & iOS
• Sharing အကောင့်တေက Pro ပြုတ်တယ်ပါတယ်။
Device limit ကျော်သုံးရင်တခြားလူနဲ့ Shareသုံးရတာမလို့ဖြစ်လာရင်ဘယ်သူလုပ်လဲမသိရတာမလို့ warranty 15ရက်ပဲ ပေးပါတယ်။
(we fully renew if Pro stops)

Private
2 to 3 devices. Full warranty for the entire plan duration.

Private Own Mail
2 to 3 devices. Full warranty for the entire plan duration.` + generalDetailsBlock,
    "AlightMotion": `Share
Full warranty for 6Months
Covers premium subscription errors.
Share Plan ရော Private Plan တေရောကဝင်ရတာရှုပ်ပါတယ်။ တချို့ဖုန်းတေဆိုဝင်မရတာတေဘာတေထိဖြစ်တတ်ပါတယ်။ အဲ့တာကအကောင့်ကဖြစ်တာမဟုတ်ပဲ Device တေကလက်မခံတာမလို့ပြန်မလဲပေးပါဘူး။ အဲ့တာကြောင့် No Error ဖြစ်တဲ့ OwnMail ဝယ်တာကပိုကောင်းပါတယ်။


Private
Full warranty for full duration
8 devices max
Private က Tempmailနဲ့လုပ်ထားတာပါ။
Full Warranty က 1Yearအတွင်းတခုခုဖြစ်ရင်တခါပြန်လဲပေးပါတယ်။
Share Plan ရော Private Plan တေရောကဝင်ရတာရှုပ်ပါတယ်။ တချို့ဖုန်းတေဆိုဝင်မရတာတေဘာတေထိဖြစ်တတ်ပါတယ်။ အဲ့တာကအကောင့်ကဖြစ်တာမဟုတ်ပဲ Device တေကလက်မခံတာမလို့ပြန်မလဲပေးပါဘူး။ အဲ့တာကြောင့် No Error ဖြစ်တဲ့ OwnMail ဝယ်တာကပိုကောင်းပါတယ်။

Private (Own Mail)
Full warranty for full duration
8 devices max
Gmail/Email and password ပေးရပါတယ်။
အကောင့်ရဲ့ Password ပါ။
Alight Motionမာထားမဲ့ Password မဟုတ်ပါဘူး။
Google အကောင့်ကိုဝင်ပီးလုပ်ပေးမာပါ။
ပီးရင်ပြန်ထွက်မာပါ။` + generalDetailsBlock,
    "Wink": `Share
One device only
Full warranty for full duration.

Private VIP
Full warranty for full duration.
3 devices max.

Private VIP Plus
Full warranty for full duration.
3 devices max.

Private (Own Mail)
Full warranty for full duration` + generalDetailsBlock,
"Grok": `Share Plan
One device only
20 Days warranty.

Private Plan
Full warranty for full duration.
3 devices max.

Private (Own Mail)
Full warranty for full duration` + generalDetailsBlock,
    "Meitu": `Share\nOne device only\nFull warranty.\n\nPrivate\nFull warranty.\n3 devices max` + generalDetailsBlock,
    "PicsArt": `Share
Full warranty for full duration
One device only
Sharingမို့လို့ Edit history တေတခြား Shareဝယ်တဲ့သူတေနဲ့အကုန်မြင်နေမာပါ။
အဆင်ပြေတယ်ဆိုမသာယူပါ။

Private
Full warranty for full duration
Up to 5 devices` + generalDetailsBlock,
    "Canva": `Share Business
15 Days warranty

Own Mail
Education edition (limited features). 5 Months Warranty.

Private Business
Full warranty
Up to 100 accounts via invite email
Canva Account တေက device limit ကန့်သတ်ချက်မရှိလို့ကြိုက်သလောက်သုံးလို့ရပါတယ် email တခုကို။

Private Pro
Full warranty` + generalDetailsBlock,
    "VSCO": `Share\nFull warranty for full duration\nOne device only` + generalDetailsBlock,
    "PhotoRoom": `Share\n6-months warranty\nNo warranty ≠ will fail\nOne device only` + generalDetailsBlock,
    "Remini": `Share
Website 1-Month: full warranty
APK 1-Year: 6-months warranty
One device only

Private
1 Month (Web)
5 devices maxသုံးလို့ရပါတယ်။
Support All device
Full Warranty` + generalDetailsBlock,
    "NordVpn": `Share\n1-Year: 6-months warranty\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 6 devices` + generalDetailsBlock,
    "Express Vpn": `Share\n15 Days Warranty.\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 9 devices: 8 Phones & 1 PC or Laptop\nCustom Password` + generalDetailsBlock,
    "Surfshark Vpn": `Share
Full warranty for full duration
One device only

Private
10 Devices can use. 
Support all device.
Full warranty` + generalDetailsBlock,
    "Windows License": `100% original license\nSupports 32/64-bit\nOriginal retail key` + generalDetailsBlock,
    "Microsoft 365": `Private
Microsoft 365 ရဲ့ Personal Subscription ပါ။ OwnMail လို့ရေးမထားတာမလို့ဒီကအကောင့်ပေးတာပါ။ စာသေချာဖတ်ပီးမယူပေးကြပါဗျ။ Max 5 Devices လောက်ထိသုံးလို့ရပါတယ်။

Own Mail Invite
ဝယ်သူရဲ့ Email ကို Invite ပေးတာပါ။ Family Subscription ပါ။ Share သဘောပုံစံပဲဖြစ်လို့ 1 Month ဆိုရင် 20 Days to 30Days အထိ Random ရမာပါ။ ဥပမာ ကိုယ်က 1 ရက်နေ့ကဝယ်တာဆိုရင် 20 ရက်နေ့ကနေ 30 ရက်နေ့ထိကြားကပဲရမယ်ပြောတာပါ။

Private Head
Microsoft 365 ရဲ့ Family Subscription ပါ။ ကျနော်ပေးမဲ့ Head အကောင့်အပါအဝင်တခြား email 5ခုလုံးက(Word, Excel, etc.) and 1TB of OneDrive storageစတဲ့ Microsoft Family မာပါတဲ့ features တေအကုန်သုံးလို့ရသွားမာပါ။` + generalDetailsBlock,
    "Netflix": `SemiPrivate Premium
Own 1 profile you can use 2 devices.Tv Support.
Full Warranty.

SemiPrivate Standard
Own 1 profile you can use 2 devices.Tv Support.
Full Warranty.

Whole Account
Own 5 profiles you can use 10 devices` + generalDetailsBlock,
    "Disney+": `Plan Basic (Limited Screen)
Sharing up to 6 users.

Plan Premium (No Limit)
Sharing up to 3 users with full control, no screen limits.` + generalDetailsBlock,
    "HBO Max": `HBO MAX (ULTIMATE) 1 Month
1P 2U: 1 Profile / 2 Users
Semiprivate: 1 Profile / Semi-Private

Private Whole Account (1 Month)
5 Profile` + generalDetailsBlock,
    "Prime Video": `Share\nFull warranty • One device only\n\nPrivate\nFull warranty • Up to 3 devices` + generalDetailsBlock,
    "Spotify": `Private
• Private Plan မို့လို့ 1 person 1 device ပဲသုံးသင့်ပါတယ်။ Official appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။ Old account က Playlist, Favorite Artist, Favorite Songs, Favorite albums,Liked Songsအကုန်အကာင့်အသစ်ကိုပြောင်းပေးပါတယ်။ 2 Months အတွင်း full warranty ဖြစ်လို့တခုခုဖြစ်ခဲ့ရင် warranty အနေနဲ့တခုပြန်လဲ ပေးမာပါ တခါပဲလဲ ပေးမာပါ။ Setting ထဲသွားပီး account delete တာတို့တော့မပါပါဘူး။

Family Private
• Official appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။ ဝယ်ထားတဲ့အကောင့်ကိုပဲကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။ Full warranty.` + generalDetailsBlock,
    "Apple Music": `Individual Plan
Only for Android.
This did not work on iOS.
Full warranty.
Renewလို့ရပါတယ်။သက်တန်းတိုးရင်တော့တစ်လကို8,500Ksပါ။` + generalDetailsBlock,
    "Qobuz": `Private
Recommend for iOS device
Full warranty.` + generalDetailsBlock,
    "Tidal Music": `Private
Full warranty.` + generalDetailsBlock,
    "Google One": `Private (own mail)\nIncludes GeminiVeo3 AI + premium features\nFull warranty` + generalDetailsBlock,
    "Google Drive": `Private (own mail)\nFull warranty` + generalDetailsBlock,
    "TeraBox": `Sharing (2TB)
Shared account. One device only.
Full warranty for plan duration.` + generalDetailsBlock,
    "ChatGPT": `Personal Plus (Private)
Up to 5 devices (not recommended)
${chatGptWarrantyNote}

Business Plus - Invite Own Email
1 device
ဒါကကိုယ်သုံးနေတဲ့ Emailကို GPT Plus ပြောင်းပေးတာဖြစ်ပီး history ကလဲကိုယ့်အကောင့်ပဲမို့ private history နဲ့သုံးရမာပါ။
${chatGptWarrantyNote}

Business Plus Own
Can invite 4 Email
${chatGptWarrantyNote}

Business Plus Own(Full Warranty)
Full Warranty for full duration. Deactivateဖြစ်လဲတစ်လပြည့်တဲ့ထိလဲပေးမာပါ။` + generalDetailsBlock,
    "Gemini Pro": `Head(Can Invite 5 Email)
Includes 5,000GB Google storage• Unlimited devices
ဒါမဲ့ဝယ်ရင်စစချင်းသိထားရမာတေရှိပါတယ်။ Admin ပြောပြပါလိမ့်မယ်။
3 Months (Full Warranty) — 3 Months လုံး Full Warranty ပေးပါတယ်။

OwnMail Invite
ဒါကကိုယ့်ရဲ့GmailကိုပဲProလုပ်ပေးတာမလို့။အလုပ်လဲမရှုပ်ပါဘူး။ Password လဲပေးစရာမလိုပါဘူး။ Device ကလဲဝင်ထားသလောက်သုံးလို့ရနေမာပါ။ Full Warranty.` + generalDetailsBlock,
    "Flow AI": `OwnMail Invite
ဒီဟာကGoogle One Pro,Gemini Proဝယ်ရင်ပါတဲ့ဟာပါ။
Invite Planမို့လို့Ai Credit တစ်လ 1000ကိုတော့ Share Useရမာပါ။
ဆိုလိုတာကတခြားFamily Membersတေသုံးရင်လဲCreditsတေကလျှော့နိုင်ပါတယ်။
ဒီဟာဝယ်ရင်
Google One Storage 5 TB 3 Months(Share)
Gemini Pro 3 Monthsပါရမာပါ။` + generalDetailsBlock,

"NotebookLM": `OwnMail Invite
ဒီဟာကGoogle One Pro,Gemini Proဝယ်ရင်ပါတဲ့ဟာပါ။
ဒီဟာဝယ်ရင်
Google One Storage 5 TB 3 Months(Share)
Gemini Pro 3 Monthsပါရမာပါ။` + generalDetailsBlock,
    "Claude Opus": `Private API Key\nFull warranty` + generalDetailsBlock,
    "Zoom": `Full warranty.\nAll pro features unlock.\nCan use 2-5 devices.` + generalDetailsBlock,
    "YouTube Premium": `Private (Individual Plan)
Full warranty.
No ads with all YouTube premium features.
Including YouTube music.
ဒီက ပေးတဲ့အကောင့်ကို ဝင်သုံးရမာပါ။
မရှင်းတာရှိရင် Plan section မာရှင်းပြထားတာကိုသေချာပြန်ကြည့်ပေးပါ။` + generalDetailsBlock,
    "YouTube Music": `Private (Individual Plan)
Full warranty.
No ads with all YouTube premium features.
ဒီက ပေးတဲ့အကောင့်ကို ဝင်သုံးရမာပါ။
မရှင်းတာရှိရင် Plan section မာရှင်းပြထားတာကိုသေချာပြန်ကြည့်ပေးပါ။` + generalDetailsBlock,

    "Tinder": `Code redeem use.\n1× warranty. Can only use one devices` + generalDetailsBlock,
    "Telegram Premium": `Login
• 1 Month — 21,000 Kyats
• 1 Year — 112,000 Kyats
• Login planကကျနော်တို့ဘက်ကအကောင့်ထဲဝင်ပီး Premium ဝယ်ပေးမာပါ။2 to 3Minလောက်ကြာနိုင်ပါတယ်။

Gift Plan & Link Plan
GiftPlan and Link Plan are same premium features.
Contact admin for more details.` + generalDetailsBlock,
    "Discord": `Nitro (Key)
This code can only be used on accounts that are at least one month old and have never subscribed to Discord Nitro. 
An active payment method is required to activate the code. 
The code can only be activated once per IP address or payment method. 
The code must be used within 1 week. 
The code must be activated via the https://discord.com/billing/promotions/(YOURKEY)` + generalDetailsBlock,
    "Perplexity Ai": `Share
One device only
Full warranty.

Private
Can use up to 5 devices.
Full warranty.
ကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။

OwnMail Private
Can use up to 5 devices.
Full warranty.
ကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။` + generalDetailsBlock,
    "BSTATION": `Private\nFull warranty.` + generalDetailsBlock,
    "INSHOT": `Lifetime Premium
Mod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။
Warranty 3လပေးပါတယ်။
Share plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။` + generalDetailsBlock,
    "Duolingo Super": `Family Head(Can Invite 5 email)\nFull warranty for plan duration.\n\nInvite Private\nFull warranty for plan duration.` + generalDetailsBlock,
    "SCRIBD": `Private\nFull warranty for plan duration.` + generalDetailsBlock,
    "WPS Office": `Share
Full warranty for full duration.
One device only.
Includes all premium features in WPS. (Word, Spreadsheets, Presentation, PDF tools)` + generalDetailsBlock,
    "TradingView": `Private
Full warranty for full duration.
Supports all devices.` + generalDetailsBlock,
    "PaySafeCard": `Account
Expires in 3 Days.
Please contact admin for usage details.` + generalDetailsBlock,
    "Domain": `My.ID/my.id
    1 Year — 30,000 Kyats
    ဒါကကိုယ့်မာ Website ရှိပီး Domain မရှိရင်သုံးဖို့အတွက်ပါ။ နှစ်တိုင်းသက်တန်းတိုးသွားလို့ရပါတယ်။` + generalDetailsBlock,

    "TikTok Official": `Login method
     Coinက TikTok official boostတဲ့နေရာမာ Coin တေကိုသုံးရတာပါ။ Login ဝင်ပီးဝယ်ရတာပါ။ buttt email password ဘာမပေးစရာမလိုပါဘူး။

     NoLoginBoost
     ဒါကအကောင့်ဝင်မရတာတေ။မဝင်စေချင်တာတေအတွက်Video Linkပေးရုံနဲ့ Boost ပေးတာပါ။`
     + generalDetailsBlock,

    "TikTok Non Official": `Views (NoDrop)
    No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။
        
    Likes (NoDrop)
    No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။
        
    Package Plan
    No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။` + generalDetailsBlock,
    "Telegram Boosting": `Post Reactions are Lifetime No-Drop. Members have a 30-day refill guarantee.` + generalDetailsBlock,
    "YouTube Boosting": `Livestream Views are Impression type, please contact admin for specific details before purchasing.` + generalDetailsBlock,
    "Facebook Boosting": `Various boosting services for views, likes, and followers. Please provide the correct link/URL for the service.` + generalDetailsBlock,
    "Instagram Boosting": `Views, Likes, and Followers services. Please provide the correct link/URL for the service.` + generalDetailsBlock,
    "Custom Website Service": `Base Service
ဒါက Any kinds of Website ကိုလိုချင်တဲ့ functionတေfully functionalဖြစ်တဲ့ထိလုပ်ပေးမာပါ။ Inspired design request လို့ရပါတယ်။ Custom Design package မဟုတ်လို့အရမ်း complex ဖြစ်တာတေတော့‌ Request လို့မရပါဘူး။ Website Codeတေလဲအပိုင်မရပါဘူး။ Domains ရှိရင်ထည့်ပေးပါတယ်။ မထည့်ပဲကျနော်လုပ်ပေးတဲ့အတိုင်းဆို lifetime ဘာhosting feeမပေးစရာမလိုပဲသူံးလို့ရပါတယ်။
More information on DM. Price may vary based on complexity.

Normal Plan
ဒါက Any kinds of Website ကိုလိုချင်တဲ့ functionတေfully functionalဖြစ်တဲ့ထိလုပ်ပေးမာပါ။ Custom Design packageဖြစ်လို့ Inspired Design တေစိတ်ကြိုက်ဖြစ်တဲ့ထိလုပ်‌ပေးမာပါ။ Website Codeတေက‌တော့အပိုင်မရပါဘူး။` + generalDetailsBlock,
    "LightRoom": `Share
One device only
Sharing account will mix projects with others user.

App&Web Private
ဒါတေအကုန်လုံးပါမာပါ။သုံးလို့ရတဲ့ထဲမာ။
Include Adobe Creative Cloud Pro
With All Supported other apps like
Photoshop — Photo Editing
Lightroom / Lightroom Classic — Photo Editing
Illustrator — Vector Design
InDesign — Page Layout
Premiere Pro — Video Editing
After Effects — Motion Graphics
Audition — Audio Editing
Adobe Animate — Animation
Character Animator — Animation
Media Encoder — Media Encoding
Adobe Fresco — Digital Drawing
Adobe Express — Quick Design
Adobe Capture — Asset Capture
Dreamweaver — Web Development
Adobe XD — UI/UX Design
Acrobat Pro — PDF & Documents
Adobe Firefly — Generative AI
Adobe Fonts — Fonts
Creative Cloud Libraries — Asset Management
Adobe Portfolio — Portfolio Websites
Behance — Creative Community` + generalDetailsBlock,
    "Photoshop": `Web Private
warranty back free only.

App&Web Private
ဒါတေအကုန်လုံးပါမာပါ။သုံးလို့ရတဲ့ထဲမာ။
Include Adobe Creative Cloud Pro
With All Supported other apps like
Photoshop — Photo Editing
Lightroom / Lightroom Classic — Photo Editing
Illustrator — Vector Design
InDesign — Page Layout
Premiere Pro — Video Editing
After Effects — Motion Graphics
Audition — Audio Editing
Adobe Animate — Animation
Character Animator — Animation
Media Encoder — Media Encoding
Adobe Fresco — Digital Drawing
Adobe Express — Quick Design
Adobe Capture — Asset Capture
Dreamweaver — Web Development
Adobe XD — UI/UX Design
Acrobat Pro — PDF & Documents
Adobe Firefly — Generative AI
Adobe Fonts — Fonts
Creative Cloud Libraries — Asset Management
Adobe Portfolio — Portfolio Websites
Behance — Creative Community` + generalDetailsBlock,
    "Adobe Creative Cloud": `Adobe Creative Cloud မာဆိုရင်

Photoshop → edit photos & images

Illustrator → make logos & vector designs

Premiere Pro → edit videos

After Effects → add animations & effects

InDesign → design posters, books, layouts

Acrobat Pro → edit & sign PDFs

စတဲ့ App တေရဲ့ Pro version တေအပြင်တခြား audio, animation, UI design, and content creationလုပ်ဖို့လိုတဲ့ Appတေပါပါမာပါ။` + generalDetailsBlock,
    "HMA VPN": `Can use 5 to 10 devices.
Can't use on iOS devices.` + generalDetailsBlock,
    "Crunchyroll": `Share\n5-Months warranty • One device only` + generalDetailsBlock,
    "Telegram Star": `Usernameပဲလိုပါမယ်` + generalDetailsBlock,
    "Google Play Turkey": "Region: Turkey (TL)\nBuy specific amounts for Turkey Region accounts." + generalDetailsBlock,
    "Google Play Indonesia": "Region: Indonesia (IDR)\nBuy specific amounts for Indonesia Region accounts." + generalDetailsBlock,
    "Google Play Brazil": "Region: Brazil (BRL)\nBuy specific amounts for Brazil Region accounts." + generalDetailsBlock,
    "Google Play South Korea": "Region: South Korea (Won)\nBuy specific amounts for Korea Region accounts." + generalDetailsBlock,
    "Google Play India": "Region: India (INR)\nBuy specific amounts for India Region accounts." + generalDetailsBlock,
    "Google Play Australia": "Region: Australia (AUD)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Germany": "Region: Germany (EUR)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play France": "Region: France (EUR)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Italy": "Region: Italy (EUR)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Switzerland": "Region: Switzerland (CHF)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Canada": "Region: Canada (CAD)\nBuy specific amounts." + generalDetailsBlock,
    "Google Play UAE": "Region: UAE (AED)\nCustom amount only." + generalDetailsBlock,
    "Google Play Poland": "Region: Poland (PLN)\nBuy specific amounts." + generalDetailsBlock,
    "Steam Gift Card": "Region: Global/Specific\nSelect your region to view available Steam Wallet Code amounts." + generalDetailsBlock
  };

  function getNoteForCartItem(item) {
    const productName = item.product.replace(/ \(.+\)$/, '');
    // ChatGPT Plus - 3 Months custom notes
if (productName === "ChatGPT" && item.duration === "3 Months") {
  if (item.section === "Personal Plus (Private)") {
    return `<div class="burmese-font">ChatGpt Plus Plan ကတစ်လကို Official Price $20 ရှိပါတယ်။ 3months ဆိုရင် 240K ပါ။ ဒါကအဲ့လိုဝယ်တာလဲမဟုတ်လို့ Deactivate ဖြစ်နိုင်ချေအနဲအများတော့ရှိမာပါ။ But full warranty ပေးထားပါတယ်။ ဖြစ်တာနဲ့ချက်ချင်းကြီးပြန်လုပ်ပေးလို့မရပါဘူး Max 1 Day လောက်စောင့်ရရင်လဲစောင့်ရနိုင်ပါတယ်။ စောင့်နိုင်မယူပေးပါ။</div>`;
  }

  if (item.section === "Business Plus - Invite Own Email") {
    return `<div class="burmese-font">$20≈$30နဲ့ဝယ်တဲ့ဟာတေမမဟုတ်ရင် Deactivate errorဖြစ်တတ်ပါတယ်။ ဒါပေမဲ့ 3months အတွင်း Full warranty ပေးထားပါတယ်။ ဖြစ်တာနဲ့ချက်ချင်းကြီးပြန်လုပ်ပေးလို့မရပါဘူး Max 1 Day လောက်စောင့်ရရင်လဲစောင့်ရနိုင်ပါတယ်။ စောင့်နိုင်မယူပေးပါ။</div>`;
  }

  if (item.section === "Business Plus Own(Full Warranty)") {
    return `<div class="burmese-font">Full Warranty For Full 3Months.</div>`;
  }
}
    // ChatGPT Plus - Business Plus Own (Full Warranty) 1 Month note
if (
  productName === "ChatGPT" &&
  item.section === "Business Plus Own(Full Warranty)" &&
  item.duration === "1 Month"
) {
  return `<div class="burmese-font">Full Warranty for full duration. Deactivateဖြစ်လဲတစ်လပြည့်တဲ့ထိလဲပေးမာပါ။</div>`;
}
    // ✅ Spotify checkout notes
    if (productName === "Spotify" && item.section === "Private") {
    return `<div class="burmese-font">• Private Plan မို့လို့ 1 person 1 device ပဲသုံးသင့်ပါတယ်။ Official appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။ Old account က Playlist, Favorite Artist, Favorite Songs, Favorite albums,Liked Songsအကုန်အကာင့်အသစ်ကိုပြောင်းပေးပါတယ်။ 2 Months အတွင်း full warranty ဖြစ်လို့တခုခုဖြစ်ခဲ့ရင် warranty အနေနဲ့တခုပြန်လဲ ပေးမာပါ တခါပဲလဲ ပေးမာပါ။ Setting ထဲသွားပီး account delete တာတို့တော့မပါပါဘူး။</div>`;
    }
 
    if (productName === "Spotify" && item.section === "Family Private") {
    return `<div class="burmese-font">• Official appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။ ဝယ်ထားတဲ့အကောင့်ကိုပဲကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။ Full warranty.</div>`;
    }

if (
  productName === "Domain" &&
  item.section === "My.ID/my.id"
) {
  return "ဒါကကိုယ့်မာ Website ရှိပီး Domain မရှိရင်သုံးဖို့အတွက်ပါ။ နှစ်တိုင်းသက်တန်းတိုးသွားလို့ရပါတယ်။";
}

if (
  productName === "Domain" &&
  item.section === "Global Domain"
) {
  return `<div class="burmese-font">
ဒီ Domain က .com, .xyz, .net, .org, .link တို့အတွက်ဖြစ်ပါတယ်။
Domain Name နဲ့ Extension ကိုသေချာစစ်ဆေးပြီးမှ ဆက်လုပ်ပေးပါ။
ဝယ်ပြီးသွားတဲ့ Domain Name ကို ပြန်ပြောင်းပေးလို့မရပါဘူး။
Domain type nonrenewable
</div>`;
}

    // --- TikTok Official: NoLoginBoost checkout note ---
    if (productName === "TikTok Official" && item.section === "NoLoginBoost") {
    return `<div class="burmese-font">ဒါကအကောင့်ဝင်မရတာတေ။မဝင်စေချင်တာတေအတွက်Video Linkပေးရုံနဲ့ Boost ပေးတာပါ။</div>`;
    }

    if (productName === "AlightMotion") {
    if (item.section === "Share") {
    return `Full warranty for 6Months
    Covers premium subscription errors.
    Share Plan ရော Private Plan တေရောကဝင်ရတာရှုပ်ပါတယ်။ တချို့ဖုန်းတေဆိုဝင်မရတာတေဘာတေထိဖြစ်တတ်ပါတယ်။ အဲ့တာကအကောင့်ကဖြစ်တာမဟုတ်ပဲ Device တေကလက်မခံတာမလို့ပြန်မလဲပေးပါဘူး။ အဲ့တာကြောင့် No Error ဖြစ်တဲ့ OwnMail ဝယ်တာကပိုကောင်းပါတယ်။`;
    }
    if (item.section === "Private") {
    return `Full warranty for full duration
    8 devices max
    Private က Tempmailနဲ့လုပ်ထားတာပါ။
    Full Warranty က 1Yearအတွင်းတခုခုဖြစ်ရင်တခါပြန်လဲပေးပါတယ်။
    Share Plan ရော Private Plan တေရောကဝင်ရတာရှုပ်ပါတယ်။ တချို့ဖုန်းတေဆိုဝင်မရတာတေဘာတေထိဖြစ်တတ်ပါတယ်။ အဲ့တာကအကောင့်ကဖြစ်တာမဟုတ်ပဲ Device တေကလက်မခံတာမလို့ပြန်မလဲပေးပါဘူး။ အဲ့တာကြောင့် No Error ဖြစ်တဲ့ OwnMail ဝယ်တာကပိုကောင်းပါတယ်။`;
    }
    if (item.section === "Private (Own Mail)" || item.section === "Private (Own Mail)") {
    return `Full warranty for full duration
    8 devices max
    Gmail/Email and password ပေးရပါတယ်။
    အကောင့်ရဲ့ Password ပါ။
    Alight Motionမာထားမဲ့ Password မဟုတ်ပါဘူး။
    Google အကောင့်ကိုဝင်ပီးလုပ်ပေးမာပါ။
    ပီးရင်ပြန်ထွက်မာပါ။`;
    }
    }

    // ================= CAPCUT CHECKOUT NOTES =================
    if (productName === "CapCut") {
      // Private 1 Month
   if (item.section === "Private" && item.duration.includes("1 Month")) {
    return `<div class="burmese-font"> 2 to 3 devices. Full warranty for the entire plan duration.
    </div>`;
   }
     
     // Own Mail 1 Month
   if (item.section === "Private Own Mail" && item.duration.includes("1 Month")) {
    return `<div class="burmese-font"> 2 to 3 devices. Full warranty for the entire plan duration.
    </div>`;
   }
   }
   // ================= END CAPCUT NOTES ================= 
   
   if (productName === "Wink")
   if (item.section === "Private" && item.duration.includes("1 Week")) {
    return `<div class="burmese-font">
    Full warranty for full duration.
    3 devices max.
    1 Week Plan ဆိုတာက 5 To 7Days ရမာပါ။ အမြဲ 7Days မပြည့်နိုင်ပါဘူး။ ပီးတော့ Android Only ပဲသုံးလို့ရပါတယ်။ Month Plan တေမာပဲ iOS ရတာပါ။ စာသေချာဖတ်ပီးမယူကြပါဗျ။
</div>`;
   }
    if (productName === "CapCut")
   if (item.section === "Private" && item.duration.includes("1 Week")) {
    return `<div class="burmese-font">
    Full warranty for full duration.
    3 devices max.
    1 Week Plan ဆိုတာက 5 To 7Days ရမာပါ။ အမြဲ 7Days မပြည့်နိုင်ပါဘူး။ 1 Month ထိပိုက်ဆံမသုံးချင်ပဲခု Project Export လုပ်ဖို့လိုတဲ့သူတေ Budget Plan အနေနဲ့ယူဖို့ထားပေးထားတာပါ။
</div>`;
   }

    if (productName === "Canva")
   if (item.section === "Private business" && item.duration.includes("2 Weeks")) {
    return `<div class="burmese-font">
    Full warranty
    Up to 100 accounts via invite email
    Canva Account တေက device limit ကန့်သတ်ချက်မရှိလို့ကြိုက်သလောက်သုံးလို့ရပါတယ် email တခုကို။
</div>`;
   }
    if (productName === "Canva")
   if (item.section === "Private Pro" && item.duration.includes("2 Weeks")) {
    return `<div class="burmese-font">
    Full warranty
</div>`;
   }
    if (productName === "ChatGPT")
   if (item.section === "Personal Plus (Private)" && item.duration.includes("2 Months")) {
    return `<div class="burmese-font">
    2 Months လုံး Full Warranty ပေးပါတယ်။ Private account ပါ။ ဒီကပေးတဲ့ Email and Password ကို ChatGpt မာထည့်သုံးရုံပါပဲ။ OwnMail မဟုတ်ပါဘူး။
</div>`;
   }
    if (productName === "ChatGPT") {
    if (item.section === "Private") {
    return `Private ယူခဲ့ရင်ဒီကနေ Email & Password ပေးမာပါ။ အဲ့ဟာကို ChatGpt App or Web မာထည့်သုံးရုံပါပဲ။ Full 2 months Warranty.
    Extra Information 
    https://t.me/BLUELAMP1/329`;
    }
    }
    if (productName === "ChatGPT") {
    if (item.section === "Personal Plus(Full Warrenty)") {
    return `Full Warranty Plan မို့လို့ 1 Months လုံး Full Warranty ပေးပါတယ်။ Private account ပါ။ ဒီကပေးတဲ့ Email and Password ကို ChatGpt မာထည့်သုံးရုံပါပဲ။ OwnMail မဟုတ်ပါဘူး။`;
    }
    }
    if (productName === "Canva") {
    if (item.section === "Own Mail") {
    return `Education edition (limited features). 5 Months Warranty.`;
    }
    }
     if (productName === "Microsoft 365") {
    if (item.section === "Private") {
    return `Microsoft 365 ရဲ့ Personal Subscription ပါ။ OwnMail လို့ရေးမထားတာမလို့ဒီကအကောင့်ပေးတာပါ။ စာသေချာဖတ်ပီးမယူပေးကြပါဗျ။ Max 5 Devices လောက်ထိသုံးလို့ရပါတယ်။`;
    }
    }
    
    
   // ================= YOUTUBE PREMIUM CHECKOUT NOTES =================
   if (productName === "YouTube Premium") {

   if (item.section === "OwnMail Invite(Family Plan)" && item.duration.includes("1 Month")) {
    return `<div class="burmese-font">
    YouTube Account ပေးရမာပါ။
    ဝင်ပီး Region Changeပေးမာပါ။Gmail&Passwordလိုပါတယ်။
    လုပ်ပီးရင်ပြန်ထွက်မာပါ။
    လတိုင်းသက်တန်းတိုးလို့ရပါတယ်။
    Warranty ကတခုခုဖြစ်ခဲ့ရင်တခါပြန်လဲပေးပါတယ်။
</div>`;
  }

}
// ================= END YOUTUBE PREMIUM NOTES =================
        // ✅ Express VPN Share (Phone 1 Month) - Dynamic checkout note by quantity
if (productName === "Express Vpn" && item.section === "Share" && /^phone/i.test(item.duration)) {
  const qty = Number(item.qty || 1);
  const alreadyJoined = 8 - qty; // Total 8 capacity rule (we won't allow 8)

  // Safety: if qty is out of expected range, still show a sensible message
  if (qty < 1) {
    return `<div class="burmese-font">အခုယူ Share Plan ကို 1 ခုယူလိုက်တာမို့လို့ 1 devicesလွတ်တဲ့ 7 ယောက်ဝင်ပီးသားအကောင့်ပေးမာပါ။ 1 device only.<br>15 Days Warranty.</div>`;
  }
  if (qty >= 8) { 
    return `<div class="burmese-font">Share Plan ကို 8 ခု မရွေးပါနဲ့။ Private သာယူလိုက်ပါတော့။</div>`;
  }

  return `<div class="burmese-font">အခုယူ Share Plan ကို ${qty} ခုယူလိုက်တာမို့လို့ ${qty} devicesလွတ်တဲ့ ${alreadyJoined} ယောက်ဝင်ပီးသားအကောင့်ပေးမာပါ။ ${qty} device only.<br>15 Days Warranty.</div>`;
}
         // Express VPN Windows plan note (Share → WindowsPC/Laptop)
   if (productName === "Express Vpn" && /windowspc/i.test(item.duration)) {
    return "Windows deviceတေမာပဲသုံးလို့ရပါမယ်။15 Days warranty.";
   }
   if (/macbook/i.test(item.duration)) {
    return "MacBookမာပဲသုံးလို့ရပါမယ်။15 Days Warranty.";
   }
   if (/linux/i.test(item.duration)) {
    return "Linux deviceတေမာပဲသုံးလို့ရပါမယ်။15 Days Warranty.";
   }

      // --- Flow AI / NotebookLM Checkout Notes ---
   if ((productName === 'Flow AI' || productName === 'NotebookLM') && item.section === 'Private') {
    return `Includes 5,000GB Google storage• Unlimited devices
    ဒါမဲ့ဝယ်ရင်စစချင်းသိထားရမာတေရှိပါတယ်။ Admin ပြောပြပါလိမ့်မယ်။`;
   }
      const isAdobeProduct = adobeGroup.includes(productName);
  const forceNoteProductName =
    isAdobeProduct && productName !== "LightRoom"
      ? "LightRoom"
      : productName;

  const forceNoteSectionName =
    isAdobeProduct ? "App&Web Private" : item.section;

    if (productName === 'Gemini Pro') {
        const standardNote = `Includes 5,000GB Google storage• Unlimited devices\nဒါမဲ့ဝယ်ရင်စစချင်းသိထားရမာတေရှိပါတယ်။ Admin ပြောပြပါလိမ့်မယ်။`;
        if (item.section.includes('OwnMail')) return `ဒါကကိုယ့်ရဲ့GmailကိုပဲProလုပ်ပေးတာမလို့။အလုပ်လဲမရှုပ်ပါဘူး။ Password လဲပေးစရာမလိုပါဘူး။ Device ကလဲဝင်ထားသလောက်သုံးလို့ရနေမာပါ။ Full Warranty.`;
        if (item.duration.includes('Full Warranty')) return `${standardNote}\n3 Months (Full Warranty) — 3 Months လုံး Full Warranty ပေးပါတယ်။`;
        return standardNote;
    }
    if (productName === "TikTok Non Official" && item.section.toLowerCase().includes("livestream")) return null;
    const fullText = moreDetailsByProduct[forceNoteProductName];
        if (productName === "INSHOT") return `Mod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။\nWarranty 3လပေးပါတယ်။\nShare plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။`;
    if (!fullText) return null;
    const rawDetails = fullText.trim();
    const sectionHeaders = /^(Share|Own Mail|Private Business|Private Pro|Private|SemiPrivate Premium|SemiPrivate Standard|SemiPrivate|FullPrivate|Tinder Plus Share|Login|Gift Plan & Link Plan|Gift Plan|Link Plan|Views \(NoDrop\)|Likes \(NoDrop\)|Comment - Emoji Type|Comment - Custom Type|Package Plan|Livestream Views|Livestream Likes|Livestream Share|Post Views|Positive Reactions|Negative Reactions|Custom Reactions|Premium Reactions|Members \(30Days Refill\)|Livestream Views|Comment - Impression Type|Comment - Custom Type|Video Views|Video Likes|Post Likes|Profile Followers|Page Followers|Live Stream Views|Video Views & Reels|Likes|Followers|Personal Plus \(Share\)|Personal Plus \(Private\)|Business Plus - Invite Own Email|Business - Own|Private Own Mail|Private \(Own Mail\)|Base Service|1 Profile\(Semiprivate\)|5 Profiles\(Whole Account\)|Nitro Basic \(Key\)|Individual|Own Mail Invite|Sharing Pro|Plan Basic|Plan Premium|HBO MAX \(ULTIMATE\) 1 Month|Private Whole Account \(1 Month\)|1 Profile|Whole Account|OwnMail Private|OwnMail Invite|Individual Plan|Business Own\(Full Warranty\)|Business Plus Own\(Full Warranty\)|Business Plus Own|Normal Plan|Family Head\(Can Invite 5 email\)|Invite Private|Web Private|App&Web Private|Pro Share|Pro Private|Lifetime Premium|Educational\(Invite\)|Individual Plan\(Private\)|Stars|Japan Region \(¥\)|US Region \(\$\)|UK Region \(£\)|Custom Amount|Turkey Region \(TL\)|Indonesia Region \(IDR\)|Brazil Region \(BRL\)|Korea Region \(₩\)|India Region \(₹\)|Australia Region \(A\$\)|Germany Region \(€\)|France Region \(€\)|Italy Region \(€\)|Switzerland Region \(CHF\)|Canada Region \(C\$\)|UAE Region \(AED\)|Poland Region \(PLN\)|Nitro \(Key\))/i;
    const lines = rawDetails.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let targetSection = String(forceNoteSectionName).replace(/\s*\(.*\)/, '');
    if (productName === 'HBO Max') targetSection = item.section;
    const sectionStartIndex = lines.findIndex(line => line.toLowerCase().includes(targetSection.toLowerCase()));
    if (productName === 'Telegram Premium' && (item.section === 'Gift Plan' || item.section === 'Link Plan')) targetSection = 'Gift Plan & Link Plan';
    const sectionStartIndex_fixed = lines.findIndex(line => line.toLowerCase().includes(targetSection.toLowerCase()));
    if (sectionStartIndex_fixed !== -1) {
      let sectionEndIndex = lines.findIndex((line, index) => index > sectionStartIndex_fixed && (sectionHeaders.test(line) || line.includes("We only accept KBZpay")));
      if (sectionEndIndex === -1) sectionEndIndex = lines.length;
      let noteLines = lines.slice(sectionStartIndex_fixed + 1, sectionEndIndex).filter(l => l.length > 0);
      let noteText = noteLines.join('\n');
      if (productName === "NordVpn" || productName === "Surfshark Vpn") {
        noteText = "CAN'T USE IN MYANMAR\n" + noteText;
      }
      let filteredNotes = noteText.split('\n').filter(line => line.trim().length > 0 && !line.includes("CAN'T USE IN MYANMAR"));
      if (productName === 'Telegram Premium') {
        const durationLine = `• ${item.duration} — ${item.priceText}`;
        if (item.section === 'Gift Plan' || item.section === 'Link Plan') {
          filteredNotes = [durationLine, 'GiftPlan and Link Plan are same premium features.', 'Contact admin for more details.'];
        } else if (item.section === 'Login') {
          filteredNotes = [durationLine, '• Login planကကျနော်တို့ဘက်ကအကောင့်ထဲဝင်ပီး Premium ဝယ်ပေးမာပါ။2 to 3Minလောက်ကြာနိုင်ပါတယ်။'];
        }
      } else if (productName === 'HBO Max') {
        if (item.duration === "1P 2U") {
          filteredNotes = filteredNotes.filter(line => line.includes("1P 2U") || line.includes("1 Profile / 2 Users"));
          filteredNotes.push("ဒါက ကိုယ်ကတခြားတယောက်နဲ့သုံးရတာကိုပြောတာပါ။");
        } else if (item.duration === "Semiprivate") {
          filteredNotes = filteredNotes.filter(line => line.includes("Semiprivate") || line.includes("1 Profile / Semi-Private"));
          filteredNotes.push("ဒါကကိုယ့် device နှစ်ခုသုံးလို့ရပါတယ်။");
        } else if (item.section.includes("Private Whole Account")) {
          filteredNotes = filteredNotes.filter(line => line.includes("Private") || line.includes("5 Profile"));
        }
      } else if (productName === 'CapCut') {
        if (item.section === "Private") filteredNotes = filteredNotes.filter(line => !line.toLowerCase().includes("own mail"));
      } else if (productName === 'Netflix') {
        if (item.section === "Whole Account") filteredNotes = filteredNotes.filter(line => !line.includes("warrantyအပြည့်ပေး"));
        // ✅ Spotify Family Plan checkout note
        if (productName === "Spotify" && item.section === "Family Private") {
        return "Full Warranty.";
        }
      } else {
        const durationRegex = /\b(\d+\s*(?:Month|Months|Year|Week|Lifetime|Days|Stars|TL|IDR|BRL|₹|₩|\$|£|€|CHF|C\$|AED|PLN)):?.*|6-Months accounts are rare.*/gi;
        filteredNotes = filteredNotes.filter(line => {
          if (line.toLowerCase().includes('device') || line.toLowerCase().includes('warranty') || line.toLowerCase().includes('guarantee') || line.toLowerCase().includes('profile') || line.toLowerCase().includes('account') || line.toLowerCase().includes('users') || line.toLowerCase().includes('screen') || line.toLowerCase().includes('phones') || line.toLowerCase().includes('sharing') || line.toLowerCase().includes('history') || line.toLowerCase().includes('အဆင်ပြေ') || line.includes('သက်တန်းတိုး') || line.includes('Official app') || line.includes('Username') || line.includes('Region') || line.includes('Buy specific')) return true;
          if (durationRegex.test(line)) return line.includes(item.duration);
          return true;
        });
      }
      return filteredNotes.filter(l => l.trim().length > 0).join('\n').trim();
    }
    return rawDetails.replace(generalDetailsBlock.trim(), '');
  }

  function goCheckoutView() {
    if (!cart.length) { alert("Your cart is empty."); return; }
    lastViewBeforeCheckout = dom.views.product.classList.contains('active') ? 'product' : 'home';
    try { localStorage.setItem('blp_cart', JSON.stringify(cart)); } catch {}
    const copyBtn = dom.checkout.copyReceiptBtn;
    copyBtn.textContent = 'Copy';
    copyBtn.classList.remove('copied');
    copyBtn.disabled = false;
    let quantityWarning = '';
    const multiQuantityItem = cart.find(item => item.qty > 1 && item.product === 'Express Vpn' && item.section === 'Share');
    if (multiQuantityItem) {
      let burmeseQtyText = `ဒါက${multiQuantityItem.qty}လစာဝယ်တာမဟုတ်ပါဘူး။1လစာကိုမ Phone ${multiQuantityItem.qty}လုံးစာယူတဲ့သဘောပါ။`.replace(/(\d+)/g, '<span class="warning-num">$1</span>');
      quantityWarning = `<div class="payment-warning-block"><div class="nt-line" style="color:#ffca28;font-weight:700;text-transform:uppercase;">ATTENTION: MULTI-QUANTITY</div><div class="nt-line burmese-font">${burmeseQtyText}</div></div>`;
    }
    const netflixMultiItem = cart.find(item =>
    item.product === 'Netflix' &&
    ['SemiPrivate Premium', 'SemiPrivate Standard'].includes(
    item.section.replace(/\s*\(.*\)/, '').trim()
  ) &&
    item.qty > 1
    );
    if (netflixMultiItem) {
      let burmeseText = `ဒါက ${netflixMultiItem.qty} Profiles ဝယ်လိုက်တဲ့သဘောပါ။ လများများယူတာမဟုတ်ပါဘူး။ ယူချင်ရင်အောက်မာ More Months Option တေရှိပါတယ်ဗျ။`.replace(/(\d+)/g, '<span class="warning-num">$1</span>');
      quantityWarning += `<div class="payment-warning-block"><div class="nt-line" style="color:#ffca28;font-weight:700;text-transform:uppercase;">ATTENTION: MULTIPLE MONTHS</div><div class="nt-line burmese-font">${burmeseText}</div></div>`;
    }
    const uniqueProductNotes = new Map();
    cart.forEach(item => {
      const productKey = item.product + item.section;
      let noteContent = getNoteForCartItem(item);
      if (noteContent) uniqueProductNotes.set(productKey, { item, noteContent });
    });
    const noteBlocks = Array.from(uniqueProductNotes.values()).map(({ item, noteContent }) => {
      return `<div style="margin-bottom:12px"><strong>${escapeHTML(item.product + ' • ' + item.section)}</strong>${noteContent.split('\n').filter(l => l.trim()).map(l => {
          const t = l.trim();
          const isBurmese = /[\u1000-\u109F]/.test(t) || t.includes('•') || t.includes('Kyats') || t.includes('renew');
          return `<div class="nt-line${isBurmese ? ' burmese-font' : ''}" style="font-weight:400;opacity:.95;">${t.replace(/(\d+)\s*(‌ယောက်)/g, '$1 $2')}</div>`;
      }).join('')}</div>`;
    }).join('');
    let netflixBlock = '';
    dom.checkout.noteText.innerHTML = quantityWarning + noteBlocks + netflixBlock + formatNotes(paymentInfoBlock.trim());
    const telegramCustom = cart.some(i => i.product === 'Telegram Premium' && (i.duration.includes('1 Year') || i.section.includes('Gift') || i.section.includes('Link')));
    dom.checkout.nextBtn.href = telegramCustom ? 'https://t.me/Fury_edtz' : 'https://t.me/leokron';
    dom.checkout.noteStep.style.display = 'block';
    dom.checkout.receiptStep.style.display = 'none';
    dom.checkout.nextBtn.style.display = 'none';
    showView('checkout');
    window.scrollTo(0, 0);
    dom.cart.bar.style.display = 'none';
  }
  // =======================
// SAFE UNIT CALCULATOR
// (prevents crash)
// =======================
function computeTotalUnits(duration, qty) {
  if (!duration || !qty || qty <= 1) return "";

  const t = String(duration);
  const m = t.match(/([\d,]+)\s*([A-Za-z]+)/);
  if (!m) return "";

  const num = parseInt(m[1].replace(/,/g, ""), 10);
  if (!Number.isFinite(num)) return "";

  const unit = m[2];
  return `${num * qty} ${unit}`;
}
  
function getReceiptExtraLine(product, plan, duration, qty, unitPrice) {
  if (qty <= 1) return "";
  if (plan !== "Share") return "";

  // Express VPN: apply to ALL Share plans (Phone / Windows / Mac / Linux etc.)
  if (product === "Express Vpn") {
    return `${qty} Devices (Not ${qty} Months)`;
  }

  // CapCut: ONLY Share 6,000Ks plan
  if (product === "CapCut" && unitPrice === 6000) {
    return `${qty} Account (Not ${qty} Months)`;
  }

  return "";
}

  function buildReceipt() {
    const c = JSON.parse(localStorage.getItem('blp_cart') || '[]');
    if (!c.length) { dom.checkout.receiptStep.innerHTML = '<p>Your cart is empty.</p>'; return; }
    const items = c.map(i => ({
    name: i.product,
    plan: i.section,
    duration: i.duration,
    qty: i.qty,
    unitPrice: i.unitPrice,
    sub: i.unitPrice * i.qty
}));
    const total = items.reduce((s, x) => s + x.sub, 0);
    if (items.length === 1) {
      const x = items[0];
      dom.checkout.receipts.single.style.display = 'block';
      dom.checkout.receipts.multi.style.display = 'none';
      dom.checkout.receipts.r1_item.textContent = x.name;
      dom.checkout.receipts.r1_plan.textContent = x.plan;
      dom.checkout.receipts.r1_duration.textContent = x.duration + (x.qty > 1 ? ` × ${x.qty}` : '');
      dom.checkout.receipts.r1_price.textContent = formatKyats(x.sub);
    } else {
      dom.checkout.receipts.single.style.display = 'none';
      dom.checkout.receipts.multi.style.display = 'block';
      dom.checkout.receipts.rm_itemList.innerHTML = items.map(item => {
  const extraLine = getReceiptExtraLine(item.name, item.plan, item.duration, item.qty, item.unitPrice);

  return `<div class="receipt-line-item">
    <div class="title">${escapeHTML(item.name)}${item.qty > 1 ? ` (x${item.qty})` : ''}</div>
    <div class="details">
      ${escapeHTML(item.plan)} • ${escapeHTML(item.duration)}
      ${extraLine ? `<br>${escapeHTML(extraLine)}` : ''}
    </div>
    <div class="price">${formatKyats(item.sub)}</div>
  </div>`;
}).join('');

      dom.checkout.receipts.rm_total.textContent = formatKyats(total);
    }
    const clipboardText =
    items.map(i => {
    const qtyPart = i.qty > 1 ? ` x${i.qty}` : '';
    const extraLine = getReceiptExtraLine(i.name, i.plan, i.duration, i.qty, i.unitPrice);

    return `- ${i.name} (${i.plan} • ${i.duration})${qtyPart}`
      + (extraLine ? `\n  ${extraLine}` : '')
      + `\n  Price: ${formatKyats(i.sub)}`;
  }).join('\n\n')
  + `\n-------------------\nTotal: ${formatKyats(total)}`;
  dom.checkout.receiptText.value = clipboardText;

  }

  function formatDetails(raw) {
    const headers = /^(Share|Private|SemiPrivate|FullPrivate|Tinder Plus Share|Login|Gift Plan & Link Plan|Gift Plan|Link Plan|Views \(NoDrop\)|Likes \(NoDrop\)|Package Plan|Livestream Views|Livestream Likes|Livestream Share|Post Views|Positive Reactions|Negative Reactions|Members \(30Days Refill\)|Comment - Impression Type|Comment - Custom Type|Video Views|Post Like|Profile Followers|Page follower|Live Stream Views|Video Views & Reels|Likes|Share|Save|Reach|Followers|Personal Plus|Business|Private Own Mail|Private \(Own Mail\)|Base Service|Normal Plan|Family Head|Invite Private|Web Private|App&Web Private|Pro Share|Pro Private|Lifetime Premium|Educational|Individual|Stars|Japan Region|US Region|UK Region|Custom Amount|Turkey Region|Indonesia Region|Brazil Region|Korea Region|India Region|Australia Region|Germany Region|France Region|Italy Region|Switzerland Region|Canada Region|Poland Region|UAE Region|Nitro)/i;
    let mainDetails = raw.replace(/CAN'T USE IN MYANMAR/g, '').replace(generalDetailsBlock, '').trim();
    const mainHtml = mainDetails.split(/\n+/).map(line => {
      let t = line.trim(); if (!t) return "";
      if (headers.test(t)) return `<div class="md-h">${escapeHTML(t)}</div>`;
      const isBurmese = /[\u1000-\u109F]/.test(t) || t.includes('Kyats') || t.includes('Login');
      return `<div class="md-p${isBurmese ? ' burmese-font' : ''}">${escapeHTML(t)}</div>`;
    }).join("");
    return mainHtml + `<div class="payment-warning-block">${generalDetailsBlock.trim().split(/\n+/).map(l => `<div class="md-p">${escapeHTML(l.trim())}</div>`).join("")}</div>`;
  }

  function formatNotes(raw) {
    const containsPayment = raw.includes(paymentInfoBlock.trim());
    const lines = String(raw).split(/\n+/).map(line => {
      const t = line.trim(); if (!t) return "";
      if (t.includes('CAN\'T USE IN MYANMAR')) return `<div class="vpn-alert">${t}</div>`;
      const isBurmese = /[\u1000-\u109F]/.test(t) || t.includes('multi-device') || t.includes('•') || t.includes('Share ကတခြားလူ') || t.includes('Deactivate');
      return `<div class="nt-line${isBurmese ? ' burmese-font' : ''}" style="font-weight:400;opacity:.95;">${t.replace(/(\d+)\s*(‌ယောက်)/g, '$1 $2')}</div>`;
    }).join("");
    return containsPayment ? `<div class="payment-warning-block">${lines}</div>` : lines;
  }

  /* =========================
      EVENT LISTENERS
      ========================= */
  dom.search.input.addEventListener('input', (e) => { if (dom.views.home.classList.contains('active')) filterProducts(e.target.value); });
  dom.search.clearBtn.addEventListener('click', () => { dom.search.input.value = ''; dom.search.input.focus(); filterProducts(''); });
  document.addEventListener('DOMContentLoaded', () => { productCards = Array.from(dom.views.home.querySelectorAll('.card[data-product-name]')); renderPopular("popular-home"); dom.search.container.style.display = 'flex'; });
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goCheckoutView(); });

  document.body.addEventListener('click', async (e) => {
    const target = e.target;
    const productCard = target.closest('[data-product-name]');
    if (productCard && (productCard.classList.contains('card') || productCard.classList.contains('pop-card'))) {
      productCard.classList.add('tap-anim');
      setTimeout(() => productCard.classList.remove('tap-anim'), 120);

const currentTitle = document.querySelector('.hero-title')?.innerText || '';
const currentRegionalParent = getRegionalParent(currentTitle);

if (
  dom.views.product.classList.contains('active') &&
  currentRegionalParent &&
  currentTitle === currentRegionalParent
) {
  lastRegionalScroll = window.scrollY;
}

openProduct(productCard.dataset.productName);
return;
    }
if (target.id === 'product-back-btn') {
  const title = document.querySelector('.hero-title')?.innerText || '';
  const parentName = getRegionalParent(title);

  if (parentName && title !== parentName) {
    renderRegionalSelector(parentName, regionalProducts[parentName]);

    requestAnimationFrame(() => {
      window.scrollTo(0, lastRegionalScroll);
    });

    return;
  }

  resetActiveRegionalHelper();
  showView('home');
  window.scrollTo(0, lastScroll);
  return;
}
    const moreDetailsBtn = target.closest('.hero-more');
    if (moreDetailsBtn) {
      moreDetailsBtn.classList.add('tap-anim'); setTimeout(() => moreDetailsBtn.classList.remove('tap-anim'), 120);
      dom.explain.text.innerHTML = formatDetails(moreDetailsByProduct[moreDetailsBtn.dataset.productName] || "Coming soon.");
      dom.explain.overlay.style.display = "grid"; return;
    }
    const whyBuyBtn = target.closest('#why-buy-btn');
    if (whyBuyBtn) {
      whyBuyBtn.classList.add('tap-anim'); setTimeout(() => whyBuyBtn.classList.remove('tap-anim'), 120);
      dom.whyBuy.overlay.style.display = "grid"; return;
    }
    if (target.id === 'explain-ok-btn' || target.closest('#explain-ok-btn')) { dom.explain.overlay.style.display = "none"; return; }
    if (target.id === 'why-buy-back-btn' || target.closest('#why-buy-back-btn')) { dom.whyBuy.overlay.style.display = "none"; return; }
    const tapTarget = target.closest('.tap-anim-target');
    if (tapTarget) { tapTarget.classList.add('tap-anim'); setTimeout(() => tapTarget.classList.remove('tap-anim'), 120); }
    const qtyBtn = target.closest('.qty-btn');
    if (qtyBtn) { try { const item = JSON.parse(qtyBtn.dataset.item); if (qtyBtn.dataset.action === "inc") addToCart(item); else decFromCart(item); } catch {} return; }
    const removeBtn = target.closest('.remove-btn');
    if (removeBtn) { removeItemFromCart(removeBtn.dataset.cartKey); return; }
    if (target.id === 'cart-toggle-btn') {
      dom.cart.bar.classList.toggle('collapsed');
      requestAnimationFrame(() => { let h = dom.cart.bar.classList.contains('collapsed') ? 60 : dom.cart.bar.offsetHeight; document.body.style.paddingBottom = h + "px"; });
      return;
    }
    if (target.id === 'clear-cart-btn') { clearCart(); return; }
    if (target.id === 'checkout-back-btn') { if (cart.length) dom.cart.bar.style.display = 'block'; showView(lastViewBeforeCheckout); return; }
    if (target.id === 'note-ok-btn' || target.closest('#note-ok-btn')) { dom.checkout.noteStep.style.display = 'none'; dom.checkout.receiptStep.style.display = 'block'; buildReceipt(); return; }
    if (target.id === 'copy-receipt-btn' || target.closest('#copy-receipt-btn')) {
      const ta = dom.checkout.receiptText; const btn = dom.checkout.copyReceiptBtn;
      try {
        if (navigator.clipboard) await navigator.clipboard.writeText(ta.value);
        else { ta.select(); document.execCommand('copy'); }
        btn.textContent = 'Copied!'; btn.classList.add('copied'); btn.disabled = true;
        dom.checkout.nextBtn.style.display = 'inline-block';
      } catch (err) { console.error(err); }
    }
  });
     // ✅ Auto open product when user comes from shared link (example: #capcut)
     window.addEventListener("load", () => {
     const slug = location.hash.replace("#", "");
     if (!slug) return;

     // find the matching product card using slug
     const card = [...document.querySelectorAll('[data-product-name]')].find(el => {
     return toSlug(el.dataset.productName) === slug;
  });

     if (card) {
     card.click();
  }
});

})();
