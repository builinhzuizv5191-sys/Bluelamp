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
    "Apple Music": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-53-CD4-A0.png",
    "Qobuz": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-953E931.png",
    "Google Drive": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-A43-DD6.png",
    "Google One": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-009-BD4-E.png",
    "iCloud": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-30-EDAEA.png",
    "ChatGPT Plus": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6-CB3-A91-1.png",
    "Gemini Veo 3": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-906-D5-F0.png",
    "Flow AI": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A4B3FC6_.png?updatedAt=1768837724112",
    "NotebookLM": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_363313A_.png?updatedAt=1768837724010",
    "Grammarly AI": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-087-AC47.png",
    "Zoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-5270010.png",
    "YouTube Premium": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-DCD6-D5.png",
    "Tinder": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-DCDE0-B9.png",
    "Telegram Premium": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A162-FC1.png",
    "Discord": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D060367.png",
    "Perplexity Ai": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-F59-EE5-A.png",
    "Flow AI": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A4B3FC6_.png?updatedAt=1768837724112",
    "NotebookLM": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_363313A_.png?updatedAt=1768837724010",
    "GAGAOOLALA": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B18851-D.png",
    "BSTATION": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-631-CC84.png",
    "INSHOT": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-16-13-54-58-884.png",
    "Duolingo Super": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E560-B70.png",
    "SCRIBD": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-FA4502.png",
    "WPS Office": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-49DAE75.png",
    "TradingView": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-02-36-751.png",
    "TeraBox": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-01-52-861.png",
    "PlaySafeCard": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-478-B983.png",
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
      name: "Google Play UK",
      img: imageFor["Google Play UK"]
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
    }
  };

  const productData = {
    "CapCut": {
      "Share": [{
        "duration": "1 Month",
        "price": "6,000 Kyats"
      }],
      "Private": [{
        "duration": "7 Days",
        "price": "3,000 Kyats"
      }, {
        "duration": "1 Month (30~35 Days)",
        "price": "10,000 Kyats"
      }],
      "Private Own Mail": [{
        "duration": "7 Days",
        "price": "4,000 Kyats"
      }, {
        "duration": "1 Month (30~35 Days)",
        "price": "12,000 Kyats"
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
      "Private": [{
        "duration": "1 Week",
        "price": "3,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "18,000 Kyats"
      }],
      "Private (Own Mail)": [{
        "duration": "1 Month",
        "price": "20,000 Kyats"
      }]
    },
    "Meitu": {
      "Private": [{
        "duration": "20 Days",
        "price": "8,000 Kyats"
      }],
      "Share": [{
        "duration": "20 Days",
        "price": "4,500 Kyats"
      }]
    },
    "PicsArt": {
      "Share": [{
        "duration": "1 Month",
        "price": "3,000 Kyats"
      }],
      "Private": [{
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }]
    },
    "Canva": {
      "Pro Share": [{
        "duration": "1 Month",
        "price": "1,500 Kyats"
      }],
      "Educational(Invite)": [{
        "duration": "Lifetime",
        "price": "5,000 Kyats"
      }],
      "Pro Private": [{
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "15,000 Kyats"
      }]
    },
    "PhotoRoom": {
      "Share": [{
        "duration": "1 Year",
        "price": "6,500 Kyats"
      }],
      "Private": []
    },
    "VSCO": {
      "Share": [{
        "duration": "1 Year",
        "price": "6,500 Kyats"
      }],
      "Private": []
    },
    "Remini": {
      "Share": [{
        "duration": "1 Month (Web)",
        "price": "3,000 Kyats"
      }, {
        "duration": "1 Year (APK Lite)",
        "price": "14,000 Kyats"
      }, {
        "duration": "1 Year (APK Pro)",
        "price": "19,000 Kyats"
      }],
      "Private": [{
        "duration": "1 Month (Web)",
        "price": "6,500 Kyats"
      }]
    },
    "Express Vpn": {
      "Private": [{
        "duration": "1 Month",
        "price": "7,900 Kyats"
      }],
      "Share": [{
        "duration": "Phone (1 Month)",
        "price": "1,000 Kyats"
      }, {
        "duration": "WindowsPC / Laptop(1 Month)",
        "price": "2,000 Kyats"
      }, {
        "duration": "MacBook(1 Month)",
        "price": "2,000 Kyats"
      }, {
        "duration": "Linux(1 Month)",
        "price": "2,000 Kyats"
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
        "duration": "1 Month",
        "price": "6,500 Kyats"
      }, {
        "duration": "2 Months",
        "price": "8,000 Kyats"
      }],
      "Private": [{
        "duration": "2 Months",
        "price": "24,000 Kyats"
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
      "Individual": [{
        "duration": "1 Month",
        "price": "10,000 Kyats"
      }],
      "Invite with email": [{
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }],
      "Family Head(Can Invite 5 email)": [{
        "duration": "1 Month",
        "price": "12,000 Kyats"
      }]
    },
    "Netflix": {
      "1 Profile(UHD 4K)": [{
        "duration": "(Semiprivate 2 devices 1Month)",
        "price": "15,000 Kyats"
      }],
      "1 Profile(FHD 1080P)": [{
        "duration": "(Semiprivate 2 devices 1Month)",
        "price": "10,000 Kyats"
      }],
      "Whole Account(UHD 4K)": [{
        "duration": "5 Profiles (1 Month)",
        "price": "5,5000 Kyats"
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
      "HBO MAX (ULTIMATE) 1 Month": [{
        "duration": "1P 2U",
        "price": "8,000 Kyats"
      }, {
        "duration": "Semiprivate",
        "price": "12,000 Kyats"
      }],
      "Private Whole Account (1 Month)": [{
        "duration": "5 Profile",
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
      "Individual Plan(Private)": [{
        "duration": "2 Months",
        "price": "18,000 Kyats"
      }],
      "Family Plan": [{
        "duration": "2 Months",
        "price": "15,000 Kyats"
      }]
    },
    "Apple Music": {
      "Individual Plan": [{
        "duration": "1 Month (Can renew)",
        "price": "5,000 Kyats"
      }]
    },
    "Qobuz": {
      "Individual Plan": [{
        "duration": "1 Month",
        "price": "9,000 Kyats"
      }]
    },
    "Google Drive": {
      "Share": [],
      "Private": [{
        "duration": "Lifetime (1000GB)",
        "price": "30,000 Kyats"
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
        "duration": "3 Months (2000GB + Veo3 Gemini AI)",
        "price": "10,000 Kyats"
      }],
      "Private": [{
        "duration": "3 Months (2000GB + Veo3 Gemini AI)",
        "price": "15,000 Kyats"
      }]
    },
    "TeraBox": {
      "Sharing": [{
        "duration": "1 Year (2TB)",
        "price": "15,000 Kyats"
      }]
    },
    "ChatGPT Plus": {
      "Personal Plus (Private)": [{
        "duration": "1 Month",
        "price": "15,000 Kyats"
      }],
      "Business Plus - Invite Own Email": [{
        "duration": "1 Month",
        "price": "12,000 Kyats"
      }],
      "Business Plus Own": [{
        "duration": "1 Month",
        "price": "20,000 Kyats"
      }],
      "Business Plus Own(Full Warranty)": [{
        "duration": "1 Month",
        "price": "25,900 Kyats"
      }]
    },
    "Gemini Veo 3": {
      "Private(Can Invite 5 Email)": [{
        "duration": "1 Month (+2000GB storage)",
        "price": "9,500 Kyats"
      }, {
        "duration": "3 Months (+2000GB storage)",
        "price": "15,000 Kyats"
      }],
      "OwnMail Invite": [{
        "duration": "1Month",
        "price": "5,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "10,000 Kyats"
      }]
    },"Flow AI": {
  "OwnMail Invite": [{
    "duration": "3 Months",
    "price": "10,000 Kyats"
  }],
      "Private": [{
        "duration": "3 Months",
       "price": "15,000 Kyats"
      }]
},"NotebookLM": {
  "OwnMail Invite": [{
    "duration": "3 Months",
    "price": "10,000 Kyats"
  }]
},

    "Grammarly AI": {
      "Share": [{
        "duration": "1 Month",
        "price": "4,500 Kyats"
      }],
      "Private": []
    },
    "Zoom": {
      "Private": [{
        "duration": "14 Days",
        "price": "4,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "8,599 Kyats"
      }]
    },
    "YouTube Premium": {
      "Private": [{
        "duration": "1 Month",
        "price": "6,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "16,500 Kyats"
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
      "Nitro (Key)": [{
        "duration": "3 Months",
        "price": "29,500 Kyats"
      }]
    },
    "Perplexity Ai": {
      "Share": [{
        "duration": "1 Month",
        "price": "8,000 Kyats"
      }],
      "Private": [{
        "duration": "1 Month",
        "price": "15,000 Kyats"
      }],
      "OwnMail Private": [{
        "duration": "1 Month",
        "price": "17,000 Kyats"
      }]
    },
    "GAGAOOLALA": {
      "Private": [{
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }]
    },
    "BSTATION": {
      "Private": [{
        "duration": "1 Month",
        "price": "15,000 Kyats"
      }]
    },
    "INSHOT": {
      "Lifetime Premium": [{
        "duration": "Lifetime",
        "price": "15,000 Kyats"
      }]
    },
    "Duolingo Super": {
      "Family Head(Can Invite 5 email)": [{
        "duration": "14 Days",
        "price": "5,000 Kyats"
      }, {
        "duration": "1 Month",
        "price": "10,000 Kyats"
      }],
      "Invite Private": [{
        "duration": "14 Days",
        "price": "2,500 Kyats"
      }, {
        "duration": "1 Month",
        "price": "5,000 Kyats"
      }]
    },
    "SCRIBD": {
      "Private": [{
        "duration": "2 Months",
        "price": "6,000 Kyats"
      }]
    },
    "WPS Office": {
      "Sharing Pro": [{
        "duration": "1 Month",
        "price": "8,000 Kyats"
      }, {
        "duration": "1 Year",
        "price": "34,500 Kyats"
      }]
    },
    "TradingView": {
      "Private": [{
        "duration": "1 Month",
        "price": "25,000 Kyats"
      }]
    },
    "PlaySafeCard": {
      "Voucher": [{
        "duration": "1 Card",
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
        "price": "1,000 Kyats"
      }, {
        "duration": "100,000 Views",
        "price": "1,590 Kyats"
      }, {
        "duration": "1,000,000 Views",
        "price": "15,000 Kyats"
      }],
      "Likes (NoDrop)": [{
        "duration": "1,000 Likes",
        "price": "1,000 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "9,500 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "80,000 Kyats"
      }],
      "Package Plan": [{
        "duration": "100k Views + 10k Likes",
        "price": "10,000 Kyats"
      }, {
        "duration": "1M Views + 100k Likes",
        "price": "85,000 Kyats"
      }],
      "Livestream Views": [{
        "duration": "1,000 Views (15 min)",
        "price": "8,000 Kyats"
      }, {
        "duration": "1,000 Views (30 min)",
        "price": "15,000 Kyats"
      }, {
        "duration": "1,000 Views (60 min)",
        "price": "30,000 Kyats"
      }, {
        "duration": "10,000 Views (15 min)",
        "price": "80,000 Kyats"
      }],
      "Livestream Likes": [{
        "duration": "1,000 Likes",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Likes",
        "price": "1,000 Kyats"
      }, {
        "duration": "100,000 Likes",
        "price": "10,000 Kyats"
      }],
      "Livestream Share": [{
        "duration": "1,000 Shares",
        "price": "500 Kyats"
      }, {
        "duration": "10,000 Shares",
        "price": "5,000 Kyats"
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
      }]
    },
    "LightRoom": {
      "Share": [{
        "duration": "1 Year",
        "price": "10,599 Kyats"
      }],
      "App&Web Private": [{
        "duration": "4 Months",
        "price": "20,000 Kyats"
      }]
    },
    "Wattpad": {
      "Sharing": [{
        "duration": "1 Month",
        "price": "3,000 Kyats"
      }, {
        "duration": "3 Months",
        "price": "7,000 Kyats"
      }, {
        "duration": "6 Months",
        "price": "12,000 Kyats"
      }, {
        "duration": "1 Year",
        "price": "22,000 Kyats"
      }]
    },
    "Photoshop": {
      "Web Private": [{
        "duration": "12 Months",
        "price": "12,000 Kyats"
      }],
      "App&Web Private": [{
        "duration": "4 Months",
        "price": "20,000 Kyats"
      }]
    },
    "Adobe Creative Cloud": {
      "Private": [{
        "duration": "4 Months",
        "price": "20,000 Kyats"
      }],
      "OwnMail Private": [{
        "duration": "4 Months",
        "price": "25,000 Kyats"
      }]
    },
    "Adobe Premiere Pro": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Illustrator": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe After Effects": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Acrobat Pro": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe InDesign": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Audition": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Animate": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Dreamweaver": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Fresco": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Media Encoder": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Character Animator": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
    "Adobe Firefly": { "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }] },
   "Adobe Bridge": {
  "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }]
},
"Adobe Express": {
  "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }]
},
"Adobe Capture": {
  "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }]
},
"Adobe Aero": {
  "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }]
},
"Adobe Fonts": {
  "Private": [{ "duration": "4 Months", "price": "20,000 Kyats" }]
},

    "HMA VPN": {
      "Private": [{
        "duration": "1 Month",
        "price": "8,000 Kyats"
      }]
    },
    "Crunchyroll": {
      "Share": [{
        "duration": "9 Months",
        "price": "20,000 Kyats"
      }]
    },
    "Telegram Star": {
      "Stars": [{
        "duration": "50 Stars",
        "price": "3,800 Kyats"
      }, {
        "duration": "100 Stars",
        "price": "7,600 Kyats"
      }]
    },
    "Google Play Gift Card": {
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
    "ChatGPT Plus": ["android", "ios", "pc"],
    "Gemini Veo 3": ["android", "ios", "pc"],
    "Grammarly AI": ["pc", "android", "ios"],
    "Flow AI": ["android", "ios", "pc"],
    "NotebookLM": ["android", "ios", "pc"],
    "Zoom": ["pc", "android", "ios"],
    "YouTube Premium": ["pc", "android", "ios", "tv"],
    "Tinder": ["android", "ios"],
    "Telegram Premium": ["android", "ios", "pc"],
    "Discord": ["android", "ios", "pc"],
    "Perplexity Ai": ["android", "ios", "pc"],
    "GAGAOOLALA": ["android", "ios", "pc", "tv"],
    "BSTATION": ["android", "ios", "pc", "tv"],
    "INSHOT": ["android"],
    "Duolingo Super": ["android", "ios", "pc"],
    "SCRIBD": ["android", "ios", "pc"],
    "WPS Office": ["android", "ios", "pc"],
    "TradingView": ["android", "ios", "pc"],
    "PlaySafeCard": [],
    "TikTok Official": ["android", "ios", "pc"],
    "TikTok Non Official": ["android", "ios", "pc"],
    "Telegram Boosting": ["android", "ios", "pc"],
    "YouTube Boosting": ["android", "ios", "pc"],
    "Facebook Boosting": ["android", "ios", "pc"],
    "Instagram Boosting": ["android", "ios", "pc"],
    "Custom Website Service": ["pc"],
    "LightRoom": ["android", "ios", "pc"],
    "Wattpad": ["android", "ios", "pc"],
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

let _helperTimer = null;

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
    "Shareအကောင့်မလို့ကျနော့်ဘက်က Warranty 15ရက်ပဲပေးပါတယ်။ တခုခုဖြစ်လာခဲ့ရင်ဘယ်သူကပိုဝင်လဲမသိနိုင်လို့ Warranty မပေးတာပါနားလည်ပေးပါ။",
    "သူကအကောင့်ကိုအပိုင်ရတာပါ။ ဖုန်းထဲထည့်ထားရတဲ့Gmailမဟုတ်ပါဘူး။ CapCut appထဲမာထည့်သုံးရတဲ့TempEmailပါ။ ကျနော်တို့ဘက်ကအကောင့်ပေးမာပါ။ ပေးတဲ့အကောင့်ကို CapCut appရဲ့ Email sign inမာဝင်သုံးရုံပါပဲ။",
    "သူကဝယ်သူရဲ့ email ကိုလုပ်ပေးတာပါ။ ဒါပေမဲ့ CapCut မဖွင့်ရသေးတဲ့ email မပဲရပါမယ်။ ပြောရရင် Private ကပိုပီးရွေးချယ်သင့်တာပါ။ ဘာလို့ဆို CapCut ကအကောင့်ပြောင်းလဲ Project တေမပျက်ပါဘူး။",
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
    "Android ရော iOS ရောနှစ်ခုလုံးရပါတယ်။ Playstore & AppStore က official appတေမာပဲသုံးရမာပါ။"
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
    "ဘာကွာလဲဆိုရင် Pro ချင်းတူတူပါပဲ။ Shareဆိုတာကတော့သိတဲ့အတိုင်း 1Device ပဲဝင်လို့ရမယ်။ တခြားသူတေနဲ့တူတူသုံးရမယ်။ Edit History တေလဲရောပါတယ်။ သူ Edit တာလဲကိုယ်မြင်နေရမာဖြစ်သလို၊ကိုယ် Edit တာကိုလဲတခြားသူတေမြင်ရမာပါ။<br>Warrenty 15Days.",
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
  "ChatGPT Plus": {
    title: "ChatGPT Plus Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း ChatGpt မာရ္စေးချယ်စရာ Plan 3 ခုရှိပါတယ်။<br>Personal Plus, Business Plus Invite and Business Plus Own",
    "ဘာတေကွာလဲဆိုရင်သိထားရမာပါ Plus ချင်းတူတူပါပဲ။ အရင်ဆုံး Personal Plus ကိုပြောပါမယ်။ သူကဒီကအကောင့်ပေးတာကို ChatGpt app or Website မာထည့်သုံးရတာပါ။ ဖုန်းထဲထည့်ထားစရာမလိူပါဘူး။ Device limit အနေနဲ့ 3 Devices လောက်ထိသုံးလို့ရပါတယ်။",
    "Business Plus invite ဆိုတာက Personal Plus လိုမျိုး ကျနော်ပေးတဲ့အကောင့်ကိုသုံးရတာမဟုတ်ပဲ ဝယ်သူရဲ့ Email ကို Gpt plus ပြောင်းပေးတာပါ။ Email ကနေ Invite ပေးတာမလို့ Password ပေးစရာမလိုပါဘူး။ ဒါမဲ့ Device ကတော့ 1~2 Devices လောက်ပဲသုံးလို့ရပါမယ်။",
    "Business Plus Own ဆိုတာကအလွယ်ပြောရင် 12K invite plan 4ခုရတာကိုပြောတာပါ။ ကျနော်ဒီကပေးတဲ့အကောင့်ကိုဝင်ပီးအဲ့အကောင့်ကနေ ဝယ်သူ ChatGpt Plus လုပ်ချင်တဲ့ email 4ခုကို Plus လုပ်လို့ရသွားမာပါ။",
    "Device အနေနဲ့က ကျနော်ပေးတဲ့ Head account အပါအဝင်နောက် Email 4 ခုမာတခုကို 2 devices သုံးလို့ရတာဆိုတော့ Total 10 Devices ထိရနေမာပါ။",
    "ကျနော်ခုဏပြောသွားတာတေအကုန်လုံးက $20≈$30 နဲ့ဝယ်တဲ့ဟာတေမဟုတ်လို့ Deactivate error ဖြစ်နိုင်ပါတယ်။ Deactivate ဆိုတာကဘာလဲဆိုရင် သုံးနေရင်း Plus features မရတော့တာမျိုး ကိုပြောတာပါ။",
    "Full warranty လို့မရေးထားတဲ့ Personal Plus,Business Plus Invite and Business Plus Own တေက warranty အနေနဲ့တခုခုဖြစ်ခဲ့ရင် 1 ခုအသစ်ပြန်လဲပေးမာပါ။ တခါပဲလဲပေးမာမလို့အဆင်ပြေမယူပေးပါ။ Full Warranty လို့ရေးထားတဲ့ 25,900Ks Plan ကတော့ Warranty အပြည့်ပါပါတယ်။",
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
    "ဘာဝယ်သင့်လဲ?",
    "ဆက်ရန်",
    "ဆက်ရန်",
    "ဆက်ရန်"
  ]
  },
  "Gemini Veo 3": {
    title: "Gemini Veo 3 Info",
    button: "Plan 2 ခုကိုရှင်းပြပေးပါ။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "Gemini Pro မာကရ္စေးချယ်စရာ Plan 2 ခုပဲရှိတာပါ။<br>OwnMail Invite & Private Head",
    "ဘာကွာလဲဆိုရင် Invite OwnMail ဆိုတာကဝယ်သူရဲ့ Email ကို Pro လုပ်ပေးတာပါ။ Region မတူတေတေဘာတေဖြစ်ပီးဝင်မရရင်ကျနော်ဝင်လုပ်ပေးဖို့လိုပါတယ်။ Password တေပေးရမာပါ။",
    "Privacy တေဘာတေရှိလို့ပေးဝင်လို့မရဘူးဆိုတဲ့သူတေကတော့ခုထဲကမဝယ်လို့ရပါပီ။ ကျနော်ကတော့လုပ်စရာရှိတာလုပ်ပီးပြန်ထွက်မာပါပဲ။ မယုံရင်တော့ Private Head ပဲယူပါ။",
    "Private Head ဆိုတာက ကျနော်ဒီကအကောင့်ပေးမာပါ။ အဲ့အကောင့်ကနေ OwnMail invite plan လိုမျိုး Email 5ခုကိုပြန် Invite လို့ရပါတယ်။ ဒါပေမဲ့ Region တေပြောင်းတတ်မရမာပါ။ ဝင်မဲ့သူတေက Head account နဲ့ Region တူမရမာကိုပြောတာပါ။",
    "ဘာဝယ်သင့်လဲဆိုရင်တော့ Gemini Pro features တေကတူတူပါပဲကွာသွားတာက Ai Credit ကို OwnMail Plan က Share သုံးရတာပါ။ Private ကတော့ကိုယ်တယောက်ထဲသုံးရတာပါ။ အဲ့ Credit ကဘာအတွက်လဲဆိုတာမသိရင်တော့ OwnMail Plan ကိုသာရွေးလိုက်ပါ။",
    "ပီးတော့ Private မာက 2TB ကိုကိုယ်‌တယောက်ထဲသုံးရမာဖြစ်ပီး၊ OwnMail Planမာတော့ Sharing သဘောပါ။ ဒါပေမဲ့ကိုယ်တိုင်တာတေကိုဘယ်သူမမြင်ရပါဘူး။ Storage ပြည့်ပီးစာမဝင်တော့တဲ့သူတေအတွက်အသုံးဝင်ပါတယ်။",
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
  "Grammarly AI": {
  title: "Grammarly AI Info",
  button: "ဒါရှင်းပြပေးပါ။",
  doneText: "ဟုတ်ပီဟုတ်ပီ",
  steps: [
    "ဒါကလောလောဆယ်ကျနော်မရောင်းသေးပါဘူးဗျ။ လုပ်လို့မရတာလဲပါပါတယ်။ အဲ့တာကြောင့်တခြားတခုခုရှာယူကြည့်ပါ။"
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
    "ဒါက Window Pro Key ပါ။ 10/11 ပဲရပါတယ်။ ပီးတော့ order confirm ပီးရင် အများဆုံး 3 ရက်လောက်စောင့်ရနိုင်ပါတယ်။"
  ]
},
  "Microsoft 365": {
    title: "Microsoft 365 Info",
    button: "Planတေကအများရီးပဲနားမလည်ဘူး။",
    nextText: "ဘာတေကွာလဲ?",
    backText: "Back",
    steps: [
    "တွေ့ရတဲ့တိုင်း Microsoft မာရ္စေးချယ်စရာ Plan 3 ခုရှိပါတယ်။<br>Individual,Invite email,Family Head",
    "ဘာကွာလဲဆိုရင်အရင်ဆုံး Individual Plan ကိုပြောပါမယ်။ သူကတယောက်ထဲ သုံးတဲ့သူတေအတွက်ပါ Device 5 ခုလောက်ဝင်လို့ရပါတယ်။ Features တေအနေနဲ့ (Word, Excel, PowerPoint, Outlook) စတဲ့ Microsoft မာပါတာတေအပြင် Copilot Ai ပါသုံးလို့ရပါတယ်။",
    "Invite with email ဆိုတာက ခုဏလိုပဲ (Word, Excel, PowerPoint, Outlook) တေသုံးလို့ရတယ်။ ဝယ်သူရဲ့ Email ကို Invite ‌ပီးလုပ်ပေးတာပါ Password ပေးစရာမလိုပါဘူး။ 2 Devices လောက်သုံးလို့ရပါတယ်။ ဒီ Plan မာ 1Month ဆိုတာက 25 ရက်ကနေ 30 ရက်ပါတာရမာကိုပြောတာပါ။",
    "Family Head ဆိုတာက Invite Plan လိုဟာမျိုး 4 ခုရတာကိုပြောတာပါ။ Invite Plan လိုပဲ (Word, Excel, PowerPoint, Outlook) သုံးလို့ရမယ်။ Device အနေနဲ့က Email တစ်ခုကို 2 Devices ဆိုတော့ Total 10 ခုထိရနေမာပါ။",
    "ဘာဝယ်သင့်လဲဆိုရင် Family Plan တေမာက Copilot Ai မပါပါဘူး။ ကွာတာကအဲ့တာရယ် Device Limit ရယ်ပါပဲ။ ကိုယ်သုံးမဲ့အပေါ်ရယ် လူများမများပေါ်ရယ်ကိုလိုက်ပီးအဆင်ပြေတာရွေးယူပါ။ Stock ရှားလို့ရှိမရှိအရင်မေးပီးမဝယ်ပါ။",
    "Android ရော iOS ရော PC, Laptop အကုန်ရပါတယ်။ Official App and Website တေမာပဲသုံးရမာပါ"
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
    body: "hi"
  },

  "TikTok Official": {
    title: "TikTok Boost",
    body: "hi"
  }
};
  
function initProductHelper(productName) {
  removeProductHelper();

  const conf = popupTextByProduct[productName] || null;

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
    nextBtn.innerHTML = stepBtnTexts[stepIndex] || escapeHTML(nextLabel);
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
  const popularList = ["Express Vpn", "ChatGPT Plus", "CapCut", "Netflix", "Wink"];

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
    lastScroll = window.scrollY;
    // ✅ Update URL so you can copy/share this product page
    history.replaceState(null, "", "#" + toSlug(productName));

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
            title += ' <span style="background:#ffeb3b; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #ffeb3b;">Powered by AdobeCreativeCloud</span>';
          } else if (sectionName === 'App&Web Private') {
             title += ' <span style="background:#ffeb3b; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #ffeb3b;">Powered by AdobeCreativeCloud</span>';
          }
        } else if (productName === 'Flow AI' || productName === 'NotebookLM') {
         if (sectionName === 'Invite OwnMail' || sectionName === 'OwnMail Invite' || sectionName === 'Private') {
            title += ' <span style="background:#ffeb3b; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #ffeb3b;">Powered By GoogleOneGemini</span>';
          }
        } else if (productName === 'AlightMotion') {
         if (sectionName === 'Private (Own Mail)') {
            title += ' <span style="background:#00ff9c; color:#002b1f; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 10px #00ff9c;">Recommended</span>';
          }
        } else if (productName === 'NordVpn' || productName === 'Surfshark Vpn') {
         if (sectionName === 'Share' || sectionName === 'Private' || sectionName === 'Share' || sectionName === 'Private') {
            title += ' <span style="background:#1e90ff; color:#ffffff; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 6px #1e90ff;">Myanmarမာသုံးမရပါ</span>';
          }

        } else if (productName === 'HBO Max') {
          if (sectionName.includes('(ULTIMATE)')) {
            title = 'HBO MAX (ULTIMATE) 1 Month';
          } else if (sectionName.includes('Private Whole Account')) {
            title = 'Private Whole Account (1 Month)';
          }
        } else if (productName === 'Netflix') {
          if (sectionName.includes('1 Profile(UHD 4K)')) {
            title = '1 Profile(UHD 4K)';
          } else if (sectionName.includes('Whole Account')) {
            title = 'Whole Account(UHD 4K)';
          }
        } else if (productName === 'Spotify') {
          title += ' <span style="background:#39ff14; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #39ff14;">VPNမလို</span>';
        } else if (productName === 'Gemini Veo 3') {
          if (sectionName.includes('OwnMail')) {
            title = 'OwnMail Invite';
            style = 'style="color: #ffeb3b;"';
          }
        }
        return `<div class="plan-box"><div class="plan-title" ${style}>${title}</div><div class="plan-rows">${rows}</div></div>`;
      }).join("");
    }

    let heroImageSrc = imageFor[productName];
    if (productName.startsWith("Google Play")) {
      heroImageSrc = imageFor["Google Play Gift Card"];
    }
    if (productName.startsWith("Steam")) {
      heroImageSrc = imageFor["Steam Gift Card"];
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
    initProductHelper(productName);

    // =========================
    // =========================
// DOMAIN CHECK UI (under 1 Year 30k) + ADD TO CART WHEN AVAILABLE
// =========================
if (productName === "Domain") {
  const DOMAIN_PRICE_TEXT = "30,000 Kyats";
  const DOMAIN_PRICE = parseKyats(DOMAIN_PRICE_TEXT) || 30000;

  const checkerHTML = `
    <div class="plan-box" id="domain-checker-box">
      <div class="plan-title">Check Domain Availability</div>

      <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
        <label style="font-size:14px; color:#ccc;">Enter Domain Name</label>

        <div style="display:flex; gap:10px; align-items:center;">
          <input
            id="domain-check-input"
            placeholder="example: bluelamp"
            style="flex:1;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.05);color:white;font-size:16px;"
          />
          <div style="font-weight:800; opacity:.8;">.my.id</div>
        </div>

        <button id="domain-check-btn" class="btn btn-primary" style="width:100%;">
          Check
        </button>

        <div id="domain-check-result" style="font-size:14px;"></div>

        <!-- Hidden by default, only appears when available -->
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

  // Put it right after the first plan-box (My.ID/my.id)
  const planBoxes = dom.views.product.querySelectorAll(".plan-box");
  if (planBoxes.length > 0) {
    planBoxes[0].insertAdjacentHTML("afterend", checkerHTML);
  } else {
    const popularSection = dom.views.product.querySelector(".popular-section");
    if (popularSection) popularSection.insertAdjacentHTML("beforebegin", checkerHTML);
  }

  const input = document.getElementById("domain-check-input");
  const btn = document.getElementById("domain-check-btn");
  const addBtn = document.getElementById("domain-add-btn");
  const result = document.getElementById("domain-check-result");

  let lastAvailableDomain = null; // store "name.my.id" when available

  const renderResult = (type, text) => {
    const map = {
      ok: "#00e676",
      bad: "#ff5252",
      warn: "#ffd54f",
      info: "#b0bec5"
    };
    result.innerHTML = `<span style="color:${map[type] || map.info};font-weight:800;">${text}</span>`;
  };

  const hideAdd = () => {
    addBtn.style.display = "none";
    lastAvailableDomain = null;
  };

  btn.addEventListener("click", async () => {
    hideAdd();
    btn.textContent = "Checking...";
    btn.disabled = true;
    result.textContent = "";

    const raw = input.value;
    const r = await checkMyIdAvailability(raw);

    if (r.status === "invalid") {
      renderResult("warn", "Type a name first");
    } else if (r.status === "available") {
      lastAvailableDomain = r.domain; // e.g. "hello.my.id"
      renderResult("ok", `${r.domain} is Available ✓`);
      addBtn.style.display = "block";
    } else if (r.status === "taken") {
      renderResult("bad", `${r.domain} is Taken ✕`);
    } else {
      renderResult("warn", "Can't check right now (blocked/offline)");
    }

    btn.textContent = "Check";
    btn.disabled = false;
  });

  // Optional: press Enter to check
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") btn.click();
  });

  // If user changes input after availability, hide the add button again
  input.addEventListener("input", () => {
    hideAdd();
    result.textContent = "";
  });

  // Add to cart when available
  addBtn.addEventListener("click", () => {
    if (!lastAvailableDomain) return;

    const item = {
      product: "Domain",
      section: "My.ID/my.id",
      duration: `${lastAvailableDomain} (1 Year)`,
      unitPrice: DOMAIN_PRICE,
      priceText: DOMAIN_PRICE_TEXT
    };

    addToCart(item);

    addBtn.textContent = "Added!";
    setTimeout(() => (addBtn.textContent = "Add to Cart"), 900);
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
    // --- NETFLIX: CUSTOM MONTHS (UHD + FHD) ---
if (productName === "Netflix") {

  // helper to find monthly price from productData by matching section text
  function getNetflixMonthlyPrice(sectionName, fallback) {
    const plans = productData["Netflix"]?.[sectionName];
    const first = Array.isArray(plans) ? plans[0] : null;
    const p = parseKyats(first?.price);
    return p || fallback;
  }

  // ✅ set your section names EXACTLY like in productData
  const UHD_SECTION = "1 Profile (UHD 4K)";
  const FHD_SECTION = "1 Profile (FHD 1080P)";

  // ✅ monthly prices (fallback if parse fails)
  const uhdMonthly = getNetflixMonthlyPrice(UHD_SECTION, 15000);
  const fhdMonthly = getNetflixMonthlyPrice(FHD_SECTION, 10000); // change fallback if needed

  function mountNetflixMonthsBox({ title, inputId, priceId, btnId, monthlyPrice, sectionName }) {
    const html = `
      <div class="plan-box">
        <div class="plan-title">${escapeHTML(title)}</div>
        <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
          <label style="font-size:14px; color:#ccc;">Enter Months (1 - 12)</label>

          <div style="display:flex; gap:10px;">
            <input
              type="number"
              id="${inputId}"
              min="1"
              max="12"
              placeholder="1-12"
              style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;"
            />
            <div id="${priceId}" style="align-self:center; font-weight:bold; color:#00e676; min-width:120px; text-align:right;">
              0 Kyats
            </div>
          </div>

          <button id="${btnId}" class="btn btn-primary" style="width:100%;">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    const popularSection = dom.views.product.querySelector(".popular-section");
    if (!popularSection) return;
    popularSection.insertAdjacentHTML("beforebegin", html);

    const input = document.getElementById(inputId);
    const priceDisplay = document.getElementById(priceId);
    const addBtn = document.getElementById(btnId);

    input.addEventListener("input", () => {
      const months = parseInt(input.value, 10);

      if (!months || months < 1 || months > 12) {
        addBtn.style.backgroundColor = "#ff4444";
        addBtn.textContent = "⚠️ Limit: 1 - 12";
        priceDisplay.textContent = "0 Kyats";
      } else {
        addBtn.style.removeProperty("background-color");
        addBtn.textContent = "Add to Cart";
        priceDisplay.textContent = formatKyats(monthlyPrice * months);
      }
    });

    addBtn.addEventListener("click", () => {
      const months = parseInt(input.value, 10);
      if (!months || months < 1 || months > 12) return;

      const totalPrice = monthlyPrice * months;

      const item = {
        product: "Netflix",
        section: sectionName, // ✅ IMPORTANT: UHD or FHD plan name
        duration: `${months} Month${months > 1 ? "s" : ""}`,
        unitPrice: totalPrice,
        priceText: formatKyats(totalPrice)
      };

      addToCart(item);

      // reset
      input.value = "";
      priceDisplay.textContent = "0 Kyats";
      addBtn.style.removeProperty("background-color");

      addBtn.textContent = "Added!";
      setTimeout(() => (addBtn.textContent = "Add to Cart"), 1000);
    });
  }

  // ✅ Box 1: UHD
  mountNetflixMonthsBox({
    title: "More Months (1 Profile UHD 4K)",
    inputId: "netflix-uhd-months-input",
    priceId: "netflix-uhd-calc-price",
    btnId: "btn-add-netflix-uhd-months",
    monthlyPrice: uhdMonthly,
    sectionName: UHD_SECTION
  });

  // ✅ Box 2: FHD
  mountNetflixMonthsBox({
    title: "More Months (1 Profile FHD 1080P)",
    inputId: "netflix-fhd-months-input",
    priceId: "netflix-fhd-calc-price",
    btnId: "btn-add-netflix-fhd-months",
    monthlyPrice: fhdMonthly,
    sectionName: FHD_SECTION
  });
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
          Rate: ~${kyatsPerCoin} Kyats / Coin (based on ${baseCoins} Coin = ${basePrice.toLocaleString("en-US")} Kyats)
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
      <div class="plan-title">Custom Stars (Telegram)</div>
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
        
      <div class="grid region-grid" style="grid-template-columns: repeat(3, 1fr); gap: 10px;">
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
  const chatGptWarrantyNote = `$20≈$30နဲ့ဝယ်တဲ့ဟာတေမမဟုတ်ရင် Deactivate errorဖြစ်နိုင်လို့ warranty အနေနဲ့ဖြစ်ခဲ့ရင် 1ခုအသစ်ပြန်လဲပေးမာပါ တခါပဲလဲပေးမာမလို့အဆင်ပြေမယူပေးပါ`;
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
Covers premium subscription errors
We'll renew a new one if any error occurs

Private
Full warranty for full duration
8 devices max
Private က Tempmailနဲ့လုပ်ထားတာပါ။
Full Warranty က 1Yearအတွင်းတခုခုဖြစ်ရင်တခါပြန်လဲပေးပါတယ်။
Riskကင်းတဲ့ OwnMail ယူလဲရပါတယ်။

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
Full warranty for full duration

Private
Full warranty for full duration
3 devices max

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
    "Canva": `Pro Share
Full warranty

Educational(Invite)
Is education edition (limited features)
15 Days Warranty.

Pro Private
Full warranty
Up to 100 accounts via invite email
Canva Account တေက device limit ကန့်သတ်ချက်မရှိလို့ကြိုက်သလောက်သုံးလို့ရပါတယ် email တခုကို။` + generalDetailsBlock,
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
    "Microsoft 365": `Individual
Up to 5 devices

Invite with email
Only 1 device per invite

Family Head(Can Invite 5 email)
ကျနော်ပေးမဲ့ Head အကောင့်အပါအဝင်တခြား email 5ခုလုံးက(Word, Excel, etc.) and 1TB of OneDrive storageစတဲ့ Microsoft Copilot Proမာပါတဲ့ features တေအကုန်သုံးလို့ရသွားမာပါ။` + generalDetailsBlock,
    "Netflix": `1 Profile
Own 1 profile you can use 2 devices.Tv Support.
Full Warrenty.

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
    "Spotify": `Individual Plan(Private)
• Private Plan မို့လို့ 1 person 1 device ပဲသုံးသင့်ပါတယ်။ Visa Card payment နဲ့လုပ် ပေးမာပါ။ 2 Months အတွင်း full warranty ဖြစ်လို့တခုခုဖြစ်ခဲ့ရင် warranty အနေနဲ့အခုပြန်လဲ ပေးမာပါ တခါပဲလဲ ပေးမာပါ။ Setting ထဲသွားပီး account delete တာတို့တော့မပါပါဘူး။

Family Plan
• Full Warranty.

Official appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။

Old account က Playlist, Favorite Artist, Favorite Songs, Favorite albums,Liked Songsအကုန်အကာင့်အသစ်ကိုပြောင်းပေးပါတယ်။` + generalDetailsBlock,
    "Apple Music": `Individual Plan
Only for Android.
This did not work on iOS.
Full warranty.
Renewလို့ရပါတယ်။သက်တန်းတိုးရင်တော့တစ်လကို6,000Ksပါ။` + generalDetailsBlock,
    "Qobuz": `Individual Plan
Recommend for iOS device
Full warranty.` + generalDetailsBlock,
    "Google One": `Private (own mail)\nIncludes GeminiVeo3 AI + premium features\nFull warranty` + generalDetailsBlock,
    "Google Drive": `Private (own mail)\n30-days warranty` + generalDetailsBlock,
    "TeraBox": `Sharing (2TB)
Shared account. One device only.
Full warranty for plan duration.` + generalDetailsBlock,
    "ChatGPT Plus": `Personal Plus (Private)
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
    "Gemini Veo 3": `Private(Can Invite 5 Email)
Includes 2000GB Google storage• Unlimited devices
ဒါမဲ့ဝယ်ရင်စစချင်းသိထားရမာတေရှိပါတယ်။ Admin ပြောပြပါလိမ့်မယ်။
1 Month (Full Warranty) — 1 Month လုံး Full Warranty ပေးပါတယ်။
3 Months (Full Warranty) — 3 Months လုံး Full Warranty ပေးပါတယ်။

OwnMail Invite
ဒါကကိုယ့်ရဲ့GmailကိုပဲProလုပ်ပေးတာမလို့။အလုပ်လဲမရှုပ်ပါဘူး။ Password လဲပေးစရာမလိုပါဘူး။ Device ကလဲဝင်ထားသလောက်သုံးလို့ရနေမာပါ။` + generalDetailsBlock,
    "Flow AI": `OwnMail Invite
ဒီဟာကGoogle One Pro,Gemini Proဝယ်ရင်ပါတဲ့ဟာပါ။
Invite Planမို့လို့Ai Credit တစ်လ 1000ကိုတော့ Share Useရမာပါ။
ဆိုလိုတာကတခြားFamily Membersတေသုံးရင်လဲCreditsတေကလျှော့နိုင်ပါတယ်။
ဒီဟာဝယ်ရင်
Google One Storage2TB 3 Months(Share)
Gemini Veo 3 Pro 3 Monthsပါရမာပါ။` + generalDetailsBlock,

"NotebookLM": `OwnMail Invite
ဒီဟာကGoogle One Pro,Gemini Proဝယ်ရင်ပါတဲ့ဟာပါ။
ဒီဟာဝယ်ရင်
Google One Storage2TB 3 Months(Share)
Gemini Veo 3 Pro 3 Monthsပါရမာပါ။` + generalDetailsBlock,
    "Grammarly AI": `Share\nFull warranty • One device only` + generalDetailsBlock,
    "Zoom": `Full warranty.\nAll pro features unlock.\nCan use 2-5 devices.` + generalDetailsBlock,
    "YouTube Premium": `Private (Individual Plan)
Full warranty.
No ads with all YouTube premium features.
Including YouTube music.` + generalDetailsBlock,

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
    "GAGAOOLALA": `Private\nFull warranty.` + generalDetailsBlock,
    "BSTATION": `Private\nFull warranty.` + generalDetailsBlock,
    "INSHOT": `Lifetime Premium
Mod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။
Warranty 3လပေးပါတယ်။
Share plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။` + generalDetailsBlock,
    "Duolingo Super": `Family Head(Can Invite 5 email)\nFull warranty for plan duration.\n\nInvite Private\nFull warranty for plan duration.` + generalDetailsBlock,
    "SCRIBD": `Private\nFull warranty for plan duration.` + generalDetailsBlock,
    "WPS Office": `Sharing Pro
Full warranty for full duration.
One device only.
Includes all premium features in WPS. (Word, Spreadsheets, Presentation, PDF tools)` + generalDetailsBlock,
    "TradingView": `Private
Full warranty for full duration.
Supports all devices.` + generalDetailsBlock,
    "PlaySafeCard": `Voucher Code
Expires in 7 Days.
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
    "Wattpad": `Sharing\nOne device only\nFull warranty.` + generalDetailsBlock,
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
    // ✅ Spotify Family Plan: ONLY show Full Warranty (no extra text)
    if (productName === "Spotify" && item.section === "Family Plan") {
    return "Full Warranty.";
    }
    if (productName === "Domain") {
    return "ဒါကကိုယ့်မာ Website ရှိပီး Domain မရှိရင်သုံးဖို့အတွက်ပါ။ နှစ်တိုင်းသက်တန်းတိုးသွားလို့ရပါတယ်။";
    }

    // --- TikTok Official: NoLoginBoost checkout note ---
    if (productName === "TikTok Official" && item.section === "NoLoginBoost") {
    return `<div class="burmese-font">ဒါကအကောင့်ဝင်မရတာတေ။မဝင်စေချင်တာတေအတွက်Video Linkပေးရုံနဲ့ Boost ပေးတာပါ။</div>`;
    }

    if (productName === "AlightMotion") {
    if (item.section === "Share") {
    return `Full warranty for 6Months
    Covers premium subscription errors
    We'll renew a new one if any error occurs`;
    }
    if (item.section === "Private") {
    return `Full warranty for full duration
    8 devices max
    Private က Tempmailနဲ့လုပ်ထားတာပါ။
    Full Warranty က 1Yearအတွင်းတခုခုဖြစ်ရင်တခါပြန်လဲပေးပါတယ်။
    Riskကင်းတဲ့ OwnMail ယူလဲရပါတယ်။`;
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
    return `<div class="burmese-font">30~35 ဆိုတာက ကျနော်က တစ်လလို့ရေးထားပေမဲ့။
    30ရက်တစ်လအတိလဲပါနိုင်တယ်၊အများဆုံး 35 ရက်ထိပါနိုင်တာကိုပြောချင်တာပါ။  
    2 to 3 devices. Full warranty for the entire plan duration.
    </div>`;
   }
     
     // Own Mail 1 Month
   if (item.section === "Private Own Mail" && item.duration.includes("1 Month")) {
    return `<div class="burmese-font">OwnMail နဲ့လုပ်ဖို့ဆို CapCut တခါမမဖွင့်ဖူးတဲ့ Email လိုပါမယ်။ အဲ့တာနဲ့မရမာပါ။
    CapCut က အကောင့်ပြောင်းလဲ Project တေမပျက်တာမလို့ Private ကပိုရွေးချယ်သင့်ပါတယ်။  
    30~35 ဆိုတာက ကျနော်က တစ်လလို့ရေးထားပေမဲ့။
    30ရက်တစ်လအတိလဲပါနိုင်တယ်၊အများဆုံး 35 ရက်ထိပါနိုင်တာကိုပြောချင်တာပါ။  
    2 to 3 devices. Full warranty for the entire plan duration.
    </div>`;
   }

     // Own Mail 1 Week
   if (item.section === "Private Own Mail" && item.duration.includes("7 Days")) {
    return `<div class="burmese-font">OwnMail နဲ့လုပ်ဖို့ဆို CapCut တခါမမဖွင့်ဖူးတဲ့ Email လိုပါမယ်။ အဲ့တာနဲ့မရမာပါ။
    CapCut က အကောင့်ပြောင်းလဲ Project တေမပျက်တာမလို့ Private ကပိုရွေးချယ်သင့်ပါတယ်။   
    2 to 3 devices. Full warranty for the entire plan duration.
    </div>`;
   }
      
   }
   // ================= END CAPCUT NOTES ================= 
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

      // Express VPN Windows plan note (Share → WindowsPC/Laptop)
   if (productName === "Express Vpn" && /windowspc/i.test(item.duration)) {
    return "Windows deviceတေမာပဲသုံးလို့ရပါမယ်။15 Days warrenty.";
   }
   if (/macbook/i.test(item.duration)) {
    return "MacBookမာပဲသုံးလို့ရပါမယ်။15 Days Warranty.";
   }
   if (/linux/i.test(item.duration)) {
    return "Linux deviceတေမာပဲသုံးလို့ရပါမယ်။15 Days Warranty.";
   }

      // --- Flow AI / NotebookLM Checkout Notes ---
   if ((productName === 'Flow AI' || productName === 'NotebookLM') && item.section === 'Private') {
    return `Includes 2000GB Google storage• Unlimited devices
    ဒါမဲ့ဝယ်ရင်စစချင်းသိထားရမာတေရှိပါတယ်။ Admin ပြောပြပါလိမ့်မယ်။`;
   }
      const isAdobeProduct = adobeGroup.includes(productName);
  const forceNoteProductName =
    isAdobeProduct && productName !== "LightRoom"
      ? "LightRoom"
      : productName;

  const forceNoteSectionName =
    isAdobeProduct ? "App&Web Private" : item.section;

    if (productName === 'Gemini Veo 3') {
        const standardNote = `Includes 2000GB Google storage• Unlimited devices\nဒါမဲ့ဝယ်ရင်စစချင်းသိထားရမာတေရှိပါတယ်။ Admin ပြောပြပါလိမ့်မယ်။`;
        if (item.section.includes('OwnMail')) return `ဒါကကိုယ့်ရဲ့GmailကိုပဲProလုပ်ပေးတာမလို့။အလုပ်လဲမရှုပ်ပါဘူး။ Password လဲပေးစရာမလိုပါဘူး။ Device ကလဲဝင်ထားသလောက်သုံးလို့ရနေမာပါ။`;
        if (item.duration.includes('1 Month')) return `${standardNote}\n1 Month (Full Warranty) — 1 Month လုံး Full Warranty ပေးပါတယ်။`;
        if (item.duration.includes('Full Warranty')) return `${standardNote}\n3 Months (Full Warranty) — 3 Months လုံး Full Warranty ပေးပါတယ်။`;
        return standardNote;
    }
    if (productName === "TikTok Non Official" && item.section.toLowerCase().includes("livestream")) return null;
    const fullText = moreDetailsByProduct[forceNoteProductName];
        if (productName === "INSHOT") return `Mod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။\nWarranty 3လပေးပါတယ်။\nShare plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။`;
    if (!fullText) return null;
    const rawDetails = fullText.trim();
    const sectionHeaders = /^(Share|Private|SemiPrivate|FullPrivate|Tinder Plus Share|Login|Gift Plan & Link Plan|Gift Plan|Link Plan|Views \(NoDrop\)|Likes \(NoDrop\)|Comment - Emoji Type|Comment - Custom Type|Package Plan|Livestream Views|Livestream Likes|Livestream Share|Post Views|Positive Reactions|Negative Reactions|Custom Reactions|Premium Reactions|Members \(30Days Refill\)|Livestream Views|Comment - Impression Type|Comment - Custom Type|Video Views|Video Likes|Post Likes|Profile Followers|Page Followers|Live Stream Views|Video Views & Reels|Likes|Followers|Personal Plus \(Share\)|Personal Plus \(Private\)|Business Plus - Invite Own Email|Business - Own|Private Own Mail|Private \(Own Mail\)|Base Service|1 Profile\(Semiprivate\)|5 Profiles\(Whole Account\)|Nitro Basic \(Key\)|Individual|Invite with email|Sharing Pro|Plan Basic|Plan Premium|HBO MAX \(ULTIMATE\) 1 Month|Private Whole Account \(1 Month\)|1 Profile|Whole Account|OwnMail Private|OwnMail Invite|Individual Plan|Business Own\(Full Warranty\)|Business Plus Own\(Full Warranty\)|Business Plus Own|Normal Plan|Family Head\(Can Invite 5 email\)|Invite Private|Web Private|App&Web Private|Pro Share|Pro Private|Lifetime Premium|Educational\(Invite\)|Individual Plan\(Private\)|Stars|Japan Region \(¥\)|US Region \(\$\)|UK Region \(£\)|Custom Amount|Turkey Region \(TL\)|Indonesia Region \(IDR\)|Brazil Region \(BRL\)|Korea Region \(₩\)|India Region \(₹\)|Australia Region \(A\$\)|Germany Region \(€\)|France Region \(€\)|Italy Region \(€\)|Switzerland Region \(CHF\)|Canada Region \(C\$\)|UAE Region \(AED\)|Poland Region \(PLN\)|Nitro \(Key\))/i;
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
        if (productName === "Spotify" && item.section === "Family Plan") {
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
    item.section.replace(/\s*\(.*\)/, '').trim() === '1 Profile' &&
    item.qty > 1
    );
    if (netflixMultiItem) {
      let burmeseText = `ဒါက${netflixMultiItem.qty}Profile စာဝယ်တာပါ။${netflixMultiItem.qty}လစာသဘောမျိုးမဟုတ်ပါဘူး။စာသေချာဖတ်ပေးပါ။`.replace(/(\d+)/g, '<span class="warning-num">$1</span>');
      quantityWarning += `<div class="payment-warning-block"><div class="nt-line" style="color:#ffca28;font-weight:700;text-transform:uppercase;">ATTENTION: MULTIPLE MONTHS</div><div class="nt-line burmese-font">${burmeseText}</div></div>`;
    }
    const uniqueProductNotes = new Map();
    cart.forEach(item => {
      const productKey = item.product + item.section;
      let noteContent = getNoteForCartItem(item);
      if (item.product === 'YouTube Premium' && noteContent && !noteContent.includes("Renew")) {
      noteContent += "\nRenew လို့ရပါတယ်။သက်တန်းတိုးရင်တော့ 1Month ကို 6000ပါ။";
      }
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
      openProduct(productCard.dataset.productName);
      return;
    }
    if (target.id === 'product-back-btn') {
      const title = document.querySelector('.hero-title').innerText;
      if ((title.includes('Google Play') || title.includes('Steam')) && !title.includes('Gift Card')) {
          const cat = title.includes('Google Play') ? "Google Play Gift Card" : "Steam Gift Card";
          renderRegionalSelector(cat, regionalProducts[cat]);
          return;
      }
      showView('home'); window.scrollTo(0, lastScroll); return;
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
