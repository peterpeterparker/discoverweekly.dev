# Contributing

A playlist is a post written in Markdown. It contains `meta` section, which describe the author, and the `content` itself, the playlist.

## Table of contents

- [Meta](#meta)
- [Playlist](#playlist)

## Meta

The meta information are displayed on the site, to present the author of the playlist, but also injected in the `<head/>` of the generated page.

If you develop further the site, these are referenced as `frontmatter`.

| Field | Mandatory | Description |
|---|---|---|
| name | ✅ | Your name. |
| profile | ✅ | A social image. The url to your Twitter (`https://pbs.twimg.com/profile_images/...`) or GitHub (`https://avatars.githubusercontent.com/u/...`) profile image). |
| description |   | Your description which will be featured on the post page. For example "Hello, I am David. I am a freelance web developer. I build DeckDeckGo on my spare time it is a super editor for slides etc.".  |
| twitter | | Your Twitter username (for example `daviddalbusco`). |
| github | | Your GitHub username (for example `peterpeterparker`). |
| website | | Your website (for example `https://daviddalbusco.com`). |
| project | | Your (side or main) project (for example `https://deckdeckgo.com`). |
| tags | | A couple of tags describing the playlist style (`#rock #hiphop #salsa #blackmetal`) |

## Playlist

It is recommended to submit at least three music tips but, you can add less or more. Each of these contain a `title`, a small `description` and a link to `Youtube` or `Spotify`.

The `title`, `description` and a music material pro playlist are mandatory  ✅.

### Example

```
# Deafheaven

Their black metal in major cord is epic! Perfect to write a zillion lines of code 😉.

{% youtube sC3V6DU-o9k %}
```

### Title

The title of the music tips can either be a band ("AC/DC") or, a song ("AC/DC - Let the be rock").

### Description

Why do you love that band or song? Or any particular fun fact about it? Or a short story?

### Youtube Or Spotify

The music material can either be a `Youtube` video or a `Spotify` link. Please provide these as following:

- Youtube: `{% youtube dQw4w9WgXcQ %}`
- Spotify (artist): `{% spotify artist 65EXuYHVoehCKqp0kOS6px %}`
- Spotify (track): `{% spotify track 2u8NmvhYX6wiviyxJTOhEi %}`
- Spotify (playlist): `{% spotify playlist 37i9dQZF1DX9RwfGbeGQwP %}`
