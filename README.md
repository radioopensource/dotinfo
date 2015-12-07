# Summary
[Publicradio.info](http://www.publicradio.info) is a home page for noncommercial news, culture, and art. The project includes:

1. A handpicked, ephemeral list of podcast items, updated monthly.
2. A list of leading news and analysis podcasts, updated automatically to the most recent episode.
3. An aggregator podcast playlist (publicradio.info/feed.xml) that updates concurrently with homepage features, compiling enclosure URLs and other relevant metadata from the selected podcast items each month.

# Purpose
This is a place for people to discover and experience audio from around the world. Contributors work to create a decent web experience of good and unusual sounds: news, analysis, music mixes, documentaries, comedies, investigative reports, stories, audio experiments, and all else. The project exists to highlight independent, noncommercial, listener-supported radio—and to encourage consumers to become active supporters of public media.

# User keyboard controls
`spacebar`: play and pause

`left key`: skip back 15 seconds

`right key`: skip forward 15 seconds

# To-do

1. Create "Internet Radio" module
  * try it out with KCRW or BCR streams
2. Add visitor counter at bottom?
  * no cookies, tracking
3. Update gradient background so it follows local time of day
4. Design/implementation of Twitter bot @publicradio_bot
5. Upload news feed code to new repo
  * See if lambda service integrates with github
6. Create a "donate" page, to support an "artist in residence" for 2016
7. Think unusual ways for listeners to interact with the site...
  * chat room/comments section? upvote/downvote system?

# Contributors
A handful of producers and programmers in and around public radio at the moment. Looking for: publishing partners, and anyone with a good sound or software idea who wants to help. 

# Contact
Email contact@publicradio.info, and your email will be answered by a contributing editor or programmer.

# Homepage Syntax
Text for selected audio on the web app follows this syntax:

  "TITLE OF EPISODE" [HH:MM:SS] from SERIES (GENRE)

  [followed by]

  DESCRIPTION (one or two sentences, longer if main program).

  [followed by relevant links]

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
Software issued under the MIT License. Graphics, design, intellectual property, etc. issued under Creative Commons (CC BY-SA 4.0). We claim no copyright to selected and automated audio, which should be assumed to fall under audio creators.
