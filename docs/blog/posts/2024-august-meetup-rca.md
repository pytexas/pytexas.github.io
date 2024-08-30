---
title: August 2024 Meetup Incident Report
description: This post details an incident that occurred at the PyTexas Meetup on August 6, 2024.
date: 2024-08-30
categories: 
    - Incident Reports
authors:
    - masonegger
---

This post details an incident that occurred at the PyTexas Meetup on August 6, 2024.

<!-- more -->

On August 6, 2024, during the monthly PyTexas Meetup, an incident involving Code 
of Conduct violations occurred. This incident is severe enough that the PyTexas 
Foundation and Organizers met to hold an RCA(1) in the attempts to understand what 
happened and prevent it from happening again. In the spirit of full transparency, 
we are releasing this report.
{.annotate}

1. RCA = Root Cause Analysis

## The Incident
Below is a rough timeline of the events that transpired. As precise times as possible
are given, although estimates are provided where we don't have exact times. 

* *Between 7:00pm - 7:30pm*: Two previously-unknown users joined the PyTexas
    Discord server, presumably to attend the Meetup.
* *~7:30pm*: During the pre-meetup hangout in a Discord voice channel,
    the above two users joined the channel. They then shared streamed their video,
    which contained explicit pornographic material. The PyTexas Organizers immediately 
    reacted by banning the users from the server. After the incident, the pre-meetup
    hangout continued.
* *8:01pm*: The Meetup starts on time in the Meetup stage in Discord.
* *8:02pm*: Links to the monthly attendance survey and Slido were
    distributed in the text chat.
* *8:06pm*: An emoji appeared on a message in the stage chat very
    briefly. The emoji was an antisemitic symbol. It appeared and was immediately 
    removed. We are unsure who removed it, either the poster or Discord's auto-moderation
    tooling.
* *8:08pm*: The first report of someone spamming the Slido was reported.
    The messages being sent were racist and antisemitic in nature. 
* *8:09pm*: The PyTexas Organizers began attempting to moderate. It was during
    this time that it was discovered that moderation tools for Slido are behind 
    a paywall.
* *8:12pm*: A PyTexas organizer instructed the attendees to leave the Slido and
    instead ask questions in the Discord chat for the time being.
* *8:13pm*: A PyTexas Organizer purchased a Slido plan in an attempt to get some
    form of moderation tooling.
* *8:13pm*: A PyTexas Organizer deleted all posted links to the Slido.
* *8:20pm*: It is discovered that the Slido plan did not contain the necessary 
    content moderation tooling. Those options are only available at a higher priced
    plan.
* *8:31pm*: Slido is deemed irrecoverable, the decision is made to just use a
    Google Form for the time being.
* *8:33pm*: Attendees were directed to submit questions to the speaker via a Google
    form instead. Meetup proceeds without further incident.

## The Response

As shown above, the response from our organizers was swift. The organizers 
immediately reacted by banning accounts that were putting the community in harms
way, and began triaging and investigating the attack, while also attempting to 
moderate the messages being sent in. In the days that followed, a full audit of our
process was done, with discussions happening between the PyTexas Foundation Board
of Directors, and the PyTexas Organizers. The individuals responsible have not
been identified, and based on our investigation, it probably will not be possible.

## Root Cause Analysis & Corrective Actions

After a thorough investigation, here are the factors we have identified as issues
and how we intend to resolve them

### Discord Verification Level was set too low
At the beginning of this year the Discord Verification of users was set from **High** to **Low**. 

* **Low** Verification Level - Users must have a verified email on their
Discord Account
* **High** Verification Level - Users must have a verified email on their
Discord Account, must be registered on Discord for more than 5 minutes,
and must have been a member of the PyTexas Discord Server for longer than
10 minutes

This decision was made to allow users who were new to our Meetup and had never 
used Discord to be able to create an account and join the Meetup immediately. 
We had experienced users trying to join a few minutes before the Meetup and being 
unable to join the Discord Stage and had to wait 10 minutes before being able to
participate.

**Corrective Action** - The Discord Verification has been set back to **High**.
We will communicate the need to join 10 minutes prior to the Meetup in future
communications.

### External Emojis were enabled
At the creation of the server, a setting was enabled to allow users to use external 
emojis and stickers in the server. This decision was made to promote cross Discord 
server communities and is a typical setting to have enabled.

**Corrective Action** - These settings have been disabled. The potential for 
abuse massively outweighs the good.

### Video permissions are enabled for all users
At the creation of the server, a setting was enabled to allow users to be able 
to join chats and share their videos and screens. This decision was made so that 
people could collaborate in voice chats, bringing that in-person touch to the 
meetup if they want. Also, sharing screens allows for community members to join 
and have debugging sessions, which we have observed in the community.

**Corrective Action** - Currently none. We are going to continue to allow users 
to share their video and screen. Doing so would inhibit how users are currently 
using the Discord server for good. However, we are exploring verification methods 
for users so the option isn't available for anyone who joins, but members would 
have to earn the permission.

### Slido not providing moderation tooling in its free tier
Slido moderation tools only exist at a high tier of their product. This is honestly,
annoying. Basic moderation tools shouldn't be behind a pay wall. We used Slido 
at the 2024 PyTexas Conference, but had purchased a multi-day premium plan. 
This is not cheap, and currently is not an option for us financially.

**Corrective Action** - We are currently moving off of Slido to Google Forms.
This removes the ability for users to be able to up-vote each other's questions,
but the safety of the community takes precedence until we have a safer alternative.

### Announcing the Meetup on social media with certain hashtags
We currently announce all of our events on Twitter, Mastodon, and LinkedIn
In order to reach as many community members as possible, we market our events
on social media. We have a few theories on what may have led to us being targeted
through there:

1. The degradation of Twitter/X: Tech Twitter isn't what it once was. 
   Certain communities who are gaining prevalence on the platform may have
   led to us being targeted. 
2. The current Python discourse: There has been a lot of drama in the Python
    community lately regarding Code of Conduct, elections, and core members. 
    When we post we use various hashtags (such as #PyTexas, #Python, and
    #pythonprogramming) that may have drawn the attention of those participating
    in the current discourse.

**Corrective Action** - Currently none. We need to explore if users in Discord
can be tracked based on the link they join with. If so, we can implement per-social
media based invites and see if future offenders are coming from a certain platform.
However, for the time being, we need to be able to continue promoting our events, 
and this requires social media.

## Additional Efforts

In addition to the **Corrective Actions** listed above, we are continuing to explore
options to better moderate and keep our community safe.

### Find a long-term alternative to Slido
While Slido is a great tool, it is currently not financially reasonable for us to
pay close to $1000 a year for a question tool that has moderation. If we were to 
get a few monetary sponsors for our Meetup, this could be a viable option. But
so far we haven't. 

However, this is a community full of developers. We are discussing in the community
to build an open-source version of this. We will also explore current open-source
products, but preliminary findings haven't resulted in a product we're happy with.

### Requiring verification for video permissions

After discussing with a member of the Python Discord team, we may implement a system
similar to theirs. To gain access to certain features in the Discord, you have
to engage with the community X amount in Y time frame, and the engagement has
to be meaningful, not spam. Luckily, their bot is open-source, so we will be 
exploring this option further, possibly in our sprint nights as well.

## Conclusion

The PyTexas Foundation sincerely apologizes to the community and our speaker for
the evening. We are dedicated to providing a safe, inclusive environment to all
of our attendees. While incidents like this are upsetting, they are a learning 
experience. We remain committed to our community, and we thank you for your support
and understanding.
