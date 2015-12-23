# Summary
[Publicradio.info](http://www.publicradio.info) is a homepage for listening to noncommercial news, culture, and art. The project includes:

- A monthly, handpicked collection of podcast items.
  - `Main Program`,
  - `Selected Audio`

- An [RSS feed](http://publicradio.info/feed.xml) that updates with the current month's collection (no news).
  - `Playlist`

- A handpicked list of leading news and analysis podcasts.
  - `News & Analysis`

- Misc. broadcast elements 
  - name and URL, 
  - RSS items,
  - titles and description copy,
  - user controls,
  - sound,
  - overall [homepage](http://publicradio.info) look and feel,
  - etc.

# Purpose
Create a place for people to discover and experience audio. Contributors work to develop a decent web experience of good and unusual sounds, incl. news, analysis, music mixes, documentaries, comedies, investigative reports, stories, and audio experiments. Publicradio.info exists to highlight independent, noncommercial, listener-supported radio, plus encourage consumers to become active supporters of public media. Content and other things for the homepage and podcast come monthly, as in a small audio magazine or mixtape.

# User keyboard controls
`spacebar:` play and pause

`left key:` skip back 15 seconds

`right key:` skip forward 15 seconds

# Task list
In prep for the new year...

1. [ ] Create "Internet Radio" (live stream) module
  - try with KCRW or BCR or WMBR streams
2. [ ] Add visitor counter
  - no cookies, tracking
3. [ ] Update gradient background so it follows local time of day
4. [ ] Design/implementation of Twitter bot @publicradio_bot (who is it for?)
  - broadcasts homepage content plus @mentions? translates BBC headlines audio to text and broadcasts that?
5. [ ] Create "donate" page to support one person/thing for 2016
6. [ ] Think unusual ways for listeners to interact with the site...
  - chat room/comments section? upvote/downvote system?

# Contributors
A handful of producers and programmers in and around public radio at the moment. Looking for: publishing partners and anyone with a good sound or software idea who wants to help.

# Communication
Email contact@publicradio.info and your message will be answered by a contributing editor or programmer. We also communicate internally via a Slack team (ask for an invite).

# Podcast and homepage syntax (text)
For feature content (`Main Program` and `Selected Audio`), follow this syntax:
> "TITLE OF EPISODE" [HH:MM:SS] from SERIES (GENRE)

 followed by
> DESCRIPTION (one or two sentences, longer if main program).

 followed by a listen link plus other relevant information.

For main program (**001.md** in current month's collection), select an accompanying [creative commons image](IMAGE SEARCH).

For news content (`News & Analysis`), follow this syntax:

  *"TITLE OF PROGRAM" [HH:MM:SS], UPDATE RATE*
 
 followed by a listen link plus other relevant information.

# Internal syntax
The homepage and podcast content is sourced from **dotinfo/_cYYMMDD** and **dotinfo/_data/** folders.

The podcast items (for `'Main Program'` and `'Selected Audio'`), come from Markdown files located in *_cYYMMDD* folder, and they follow this syntax:

```Markdown
  <title>TITLE [GENRE]</title>
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
```

News items (for `News & Analysis`), come from a YAML file (**feeds.yml**) in the **/_data/** folder, and follow this syntax:

```YAML
- title: TITLE OF PROGRAM [HH:MM:SS]
  frequency: UPDATE RATE
  audio: http://….mp3 (leave blank if auto-updating)
  type: LABEL
```

# All 'publicradio.info' components, in table form

| User          | Developer             |
| ------------- | --------------------: |
| Podcast       | RSS Feed              |
| News homepage | UX Design, items      |
| Twitter       | Robot                 |

:radio:

# License
Software issued under the MIT License. Graphics, design, intellectual property, etc. issued under Creative Commons (CC BY-SA 4.0). No copyright claimed for selected and automated audio, which should be assumed to fall under audio creators.
