// All stream URLs verified live over https (2026-07-05) — http streams are
// mixed-content-blocked on the https site, so only https mounts are listed.
var streams = [

{ title: 'WMBR',
description: 'Music and public affairs out of MIT.',
url: 'http://wmbr.org/',
donateurl: 'https://wmbr.org/fundraising.php',
streamurl: 'https://wmbr.org:8002/hi' },

{ title: 'WFMU',
description: 'New York\'s legendary freeform station.',
url: 'https://wfmu.org/',
donateurl: 'https://wfmu.org/support',
streamurl: 'https://stream0.wfmu.org/freeform-128k' },

{ title: 'Resonance FM',
description: 'London\'s groundbreaking art radio station.',
url: 'https://resonancefm.com/',
donateurl: 'https://resonancefm.com/donate',
streamurl: 'https://stream.resonance.fm/resonance' },

{ title: 'WXYC',
description: 'Student radio from Chapel Hill, NC.',
url: 'http://www.wxyc.org/',
donateurl: 'http://www.wxyc.org/merch',
streamurl: 'https://audio-mp3.ibiblio.org/wxyc.mp3' },

{ title: 'Wave Farm Radio',
description: 'Transmission art out of Hudson, NY.',
url: 'https://wavefarm.org/',
donateurl: 'https://wavefarm.org/wgxc/donate',
streamurl: 'https://audio.wavefarm.org/wgxc.mp3'
},

{ title: 'WKCR',
description: 'NYC\'s traditional and art music station.',
url: 'https://www.wkcr.org',
donateurl: 'https://giving.columbia.edu/giveonline/?schoolstyle=411',
streamurl: 'https://wkcr.streamguys1.com/live'
},

{title: "KPFA",
description: "Berkeley's listener-supported Pacifica radio.",
url: "https://kpfa.org/",
donateurl: "https://secure.kpfa.org/support/",
streamurl: "https://streams.kpfa.org/kpfa_64"
},

{ title: 'Dublab',
description: 'Arty non-profit music station in LA.',
url: 'https://dublab.com/',
donateurl: 'https://dublab.com/membership/',
streamurl: 'https://dublab.out.airtime.pro:8443/dublab_a'
},

{
title: "C-SPAN",
description: "This is what Democracy sounds like.",
url: "https://www.c-span.org",
donateurl: null,
streamurl: "https://playerservices.streamtheworld.com/api/livestream-redirect/CSPANRADIO.mp3"
},

{
title: "Rinse FM",
description: "Uncompromising and innovative music out of East London since 1994.",
url: "https://rinse.fm/",
donateurl: null,
streamurl: "https://admin.stream.rinse.fm/proxy/rinse_uk/stream"
},

{
title: "NTS 1",
description: "Stream 1 from the eclectic worldwide music platform.",
url: "https://www.nts.live/",
donateurl: "https://www.nts.live/supporters",
streamurl: "https://stream-relay-geo.ntslive.net/stream"
},

{
title: "NTS 2",
description: "Stream 2 from the eclectic worldwide music platform.",
url: "https://www.nts.live/",
donateurl: "https://www.nts.live/supporters",
streamurl: "https://stream-relay-geo.ntslive.net/stream2"
},

{title: "WAMU",
description: "NPR in Washington, D.C.",
url: "https://wamu.org/",
donateurl: "https://wamu.org/support/donate/",
streamurl: "https://wamu.cdnstream1.com/wamu.mp3"
},

{title: "KALW",
description: "San Francisco's local public radio.",
url: "https://kalw.org/",
donateurl: "https://donate.nprstations.org/kalw",
streamurl: "https://kalw-live.streamguys1.com/kalw"
},

{ title: 'Sveriges Radio P2',
description: 'Classical and jazz from Sweden.',
url: 'https://sverigesradio.se/p2',
donateurl: null,
streamurl: 'https://www.sverigesradio.se/topsy/direkt/srapi/2562.mp3'
},

{ title: 'Worldwide FM',
description: 'International music from Gilles Peterson and fellow London DJs.',
url: 'https://worldwidefm.net/',
donateurl: null,
streamurl: 'https://worldwide-fm.radiocult.fm/stream'
},

{title: "Lumpen Radio",
description: "Art radio in Chicago.",
url: "https://lumpenradio.com/",
donateurl: "https://www.lumpenradio.com/donate.html",
streamurl: "https://radio.mensajito.mx/lumpenradio"
},

{
title: "n10.as",
description: "Internet community radio based in Montreal, Quebec.",
url: "http://n10.as/",
donateurl: null,
streamurl: "https://n10as.radiocult.fm/stream"
},

{ title: 'Radio Africa Online',
description: 'African and Caribbean music.',
url: 'http://soukous.org/',
donateurl: 'http://soukous.org/donate.htm',
streamurl: 'https://ssl.rockhost.com/proxy/radioafr?mp=/stream'
},

{
title: "WHBC",
description: "Howard University's Student Operated Radio Station for 40+ years.",
url: "http://www.whbc963hd3.com/",
donateurl: null,
streamurl: "https://whurhd3.streamon.fm/WHURHD3-48k.aac"
},

{ title: 'BBC Radio 3',
description: 'New and classical music.',
url: 'https://www.bbc.co.uk/radio3',
donateurl: null,
streamurl: 'https://as-hls-ww-live.akamaized.net/pool_23461179/live/ww/bbc_radio_three/bbc_radio_three.isml/bbc_radio_three-audio%3d128000.norewind.m3u8'},

{ title: 'BBC Radio 4',
description: 'Documentaries and spoken word programs.',
url: 'https://www.bbc.co.uk/radio4',
donateurl: null,
streamurl: 'https://as-hls-ww-live.akamaized.net/pool_55057080/live/ww/bbc_radio_fourfm/bbc_radio_fourfm.isml/bbc_radio_fourfm-audio%3d128000.norewind.m3u8' },

{ title: 'BBC Radio 6',
description: 'BBC\'s alternative music station.',
url: 'https://www.bbc.co.uk/6music',
donateurl: null,
streamurl: 'https://as-hls-ww-live.akamaized.net/pool_81827798/live/ww/bbc_6music/bbc_6music.isml/bbc_6music-audio%3d320000.norewind.m3u8' },

// The Lot Radio: no third-party-playable stream found (2026-07-05). Their livepeer
// HLS is video-muxed + tokenized; redirector segments 404 and the catalyst node
// (https://nyc-prod-catalyst-0.lp-playback.studio/hls/video+85c28sa2o8wppm58/5_0/index.m3u8)
// never starts in WebKit native HLS. Re-add if they publish an audio mount.

{ title: 'WERU',
description: 'Small community station serving Midcoast Maine.',
url: 'https://weru.org/',
donateurl: 'https://weru.org/donate',
streamurl: 'https://stream.pacificaservice.org:9000/weru_128' },

{ title: 'RFI 中文',
description: 'Radio France Internationale in Chinese.',
url: 'https://www.rfi.fr/cn/',
donateurl: null,
streamurl: 'https://rfienchinois64k.ice.infomaniak.ch/rfienchinois-64.mp3' },

{ title: 'Radio Alhara',
description: 'Community radio from Bethlehem, Palestine.',
url: 'https://www.radioalhara.net/',
donateurl: null,
streamurl: 'https://stream.radiojar.com/78cxy6wkxtzuv' },

{title: "Scratch Radio",
description: "Vancouver-based station spinning dub and reggae.",
url: "http://www.scratchradio.ca/",
donateurl: null,
streamurl: "https://scratchradio.ca/stream"
}

];
