# Summary
Publicradio.info is a home for noncommercial news, culture, and art. The project includes:

1. A monthly updated, handpicked, ephemeral list of podcast items.
2. A list of leading news and analysis podcasts, updated to the most recent episode.
3. A supplementary, aggregator podcast playlist (publicradio.info/feed.xml) that updates concurrently with homepage features (compiling enclosure URLs and other relevant metadata from the selected podcast item list each month).

# Purpose
This is a place for listeners and citizens to discover and experience good audio from across the world. Contributors work to create a decent, clear web experience of high-quality sounds: news, analysis, music mixes, documentaries, comedies, investigative reports, audio experiments, and beyond. The project exists to highlight independent, noncommercial, and listener-supported radio—and to encourage consumers to become supporters of public media.

# Contributors
A handful of producers and programmers in and around public radio at the moment. Looking for: web artists, publishing partners, and anyone with a good idea who wants to help. 

# Contact
Email contact@publicradio.info, and your email will be answered by a contributing editor or programmer.

# License
Software issued under the MIT License. Graphics, design, intellectual property, etc. issued under Creative Commons (CC BY-SA 4.0). We claim no copyright to selected and automated audio, which should be assumed to fall under audio creators.

# Homepage Syntax
Selected audio on the web app follow this syntax:

  "TITLE OF EPISODE" [HH:MM:SS] from SERIES (GENRE)

  [followed by]

  DESCRIPTION (one or two sentences, longer if main program).

  [followed by relevant links]

Main program image must be Creative Commons.

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
