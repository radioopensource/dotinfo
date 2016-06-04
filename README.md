# Summary
Publicradio.info is a [homepage](http://www.publicradio.info) for listening to noncommercial news, culture, and art. The web app offers a variety of newscasts, internet radio stations, and podcasts. Podcasts are accessible by [RSS](http://publicradio.info/feed.xml).

# User keyboard controls
`spacebar:` play and pause

`left key:` skip back 15 seconds

`right key:` skip forward 15 seconds

# Contact
contact@publicradio.info

# Content
Content is sourced from **dotinfo/_cYYYYMM/** and **dotinfo/_data/** folders.

Podcast items (`Main Program`, `Selected Audio`, `Playlist`) come from Markdown files located in the **_cYYYYMM** folder. They adhere to this syntax:

```Markdown
---
  date: YYYY-MM-DD HH:MM:SS (our own publishing date)
  image: http://….png (only necessary if main program)
  
  audio: http://….mp3
  title: TITLE OF EPISODE
  description: DESCRIPTION.
  series: SERIES
  genre: GENRE
  duration: 'HH:MM'
  explicit: true/false
  website: http://…
  feed: http://….xml
  rss: >
    <title>C00 TITLE [GENRE] (where C00 = collection number)</title>
    <link>http://.../</link>
    <guid isPermaLink="true">http://…/</guid> (FALSE IF NON-LINK)
    <dc:creator>PRODUCER/SERIES</dc:creator>
    <description>DESCRIPTION</description>
  
    <enclosure url="http://….mp3" length="0 (LENGTH IN BYTES)" type="audio/mpeg" />
  
    <itunes:duration>HH:MM:SS</itunes:duration>
    <itunes:subtitle>DESCRIPTION</itunes:subtitle>
    <itunes:summary>DESCRIPTION (longer if you want)</itunes:summary>
    <itunes:author>SERIES</itunes:author>
    <itunes:explicit>yes/no</itunes:explicit>

---
```

News items (`News & Analysis`) are served by a separate aggregating service. The code for the service lives in the [public-radio-services](https://github.com/ags2121/public-radio-services) github repo. News podcasts with static urls can bypass the service and be hardcoded in **feeds.yml** in the **_data** folder. They adhere to this syntax:

```YAML
- title: TITLE OF PROGRAM [HH:MM:SS]
  frequency: UPDATE RATE
  audio: http://….mp3 (leave blank if news resource is served by the public-radio-services)
  type: TYPE
```

# License
Software issued under the MIT License. Graphics issued under Creative Commons (CC BY-SA 4.0). No copyright claimed for selected and automated audio, which should be assumed to fall under audio creators.

:radio:
