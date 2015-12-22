# Summary
[Publicradio.info](http://www.publicradio.info) is a homepage for noncommercial news, culture, and art. The project includes:

* A handpicked collection of podcast items.
  * `Main Program`
  * `Selected Audio`

* An [RSS feed](http://publicradio.info/feed.xml) that updates with collections of podcast items (no news).
  * `Playlist`

* A handpicked collection of leading news and analysis podcast feeds that updates with most recent episode.
  * `News & Analysis`

* misc. broadcast elements (URL(s), RSS image(s), titles and copy, sound, [homepage](http://publicradio.info) look and feel, etc.) 

# Purpose
Create a place for people to discover and experience audio. Contributors work to develop a decent web experience of good and unusual sounds, incl. news, analysis, music mixes, documentaries, comedies, investigative reports, stories, and audio experiments. The project exists to highlight independent, noncommercial, listener-supported radio—and to encourage consumers to become active supporters of public media.

# User keyboard controls
`spacebar:` play and pause

`left key:` skip back 15 seconds

`right key:` skip forward 15 seconds

# To do

1. Create "Internet Radio" (live stream) module
  * try it out with KCRW or BCR streams
2. Add visitor counter at bottom?
  * no cookies, tracking
3. Update gradient background so it follows local time of day
4. Design/implementation of Twitter bot @publicradio_bot
  *broadcasts homepage content plus @mentions? translates BBC headlines audio to text and broadcasts that?
5. Create "donate" page to support an "artist in residence" for 2016
6. Think unusual ways for listeners to interact with the site...
  * chat room/comments section? upvote/downvote system?

# Contributors
A handful of producers and programmers in and around public radio at the moment. Looking for: publishing partners and anyone with a good sound or software idea who wants to help. 

# Contact
Email contact@publicradio.info and your message will be answered by a contributing editor or programmer.

# Homepage Syntax
Text for selected audio on the web app follows this syntax:

  `"TITLE OF EPISODE" [HH:MM:SS] from SERIES (GENRE)`

  followed by

  `DESCRIPTION (one or two sentences, longer if main program).`

  followed by relevant links

Main program image is Creative Commons.

# RSS Feed Syntax
Feed.xml RSS channel items (aka selected audio) follow this syntax:

```
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

# License
Software issued under the MIT License. Graphics, design, intellectual property, etc. issued under Creative Commons (CC BY-SA 4.0). No copyright claimed for selected and automated audio, which should be assumed to fall under audio creators.
