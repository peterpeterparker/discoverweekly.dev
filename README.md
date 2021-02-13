#  DiscoverWeekly.dev

The playlists made by devs, every Wednesday.

## Table of contents

- [Contributing](#contributing)
- [Add a new playlist](#add-a-new-playlist)
- [Run the project locally](#run-the-project-locally)
- [License](#license)

## Contributing

Make sure you have a recent version of [Node.js installed](https://nodejs.org/en/) (LTS recommended).

Fork and clone this repository. Head over to your terminal and run the following command:

```
git clone git@github.com:[YOUR_USERNAME]/discoverweekly.git
cd discoverweekly
npm ci
npm run add:playlist
```

## Add a new playlist

`npm run add:playlist` will ask for your name and create a file in `./content/playlists/`.

Continue by editing this generated `Markdown` file.

Have a look at the [CONTRIBUTING.md](./CONTRIBUTING.md) for further information about the edition of your playlist details.

Commit the changes and [open a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Run the project locally

This project is a [Next.js](https://nextjs.org/) project.

```
npm run dev
```

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com)

