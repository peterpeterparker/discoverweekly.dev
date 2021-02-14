const {existsSync} = require('fs');
const {readFile, writeFile} = require('fs').promises;

const inquirer = require('inquirer');
const path = require('path');
const format = require('date-fns/format');

const addPlaylist = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter your name:',
      validate: (input) => {
        if (input && input.length > 0) {
          return true;
        } else {
          return "Please provide a name. It is use to create a file and will be also displayed on your contribution's page.";
        }
      },
    },
  ]);

  const name = answer.name;

  const date = format(new Date(), 'yyyy-MM-dd').toLowerCase();

  const content = await readPlaylistTemplate();

  const filePath = await writePlaylist(name, content.replace('{name}', name).replace('{date}', date));

  return filePath;
};

const readPlaylistTemplate = () => {
  const filePath = path.join('content', 'templates', `playlist.md`);
  return readFile(filePath, 'utf8');
};

const formatNameForUrl = (name) => {
  return encodeURI(name.toLowerCase().trim().replace(/ /g, '-'));
};

const writePlaylist = async (name, content) => {
  const date = format(new Date(), 'MMMM-yyyy').toLowerCase();
  const filePath = path.join('content', 'playlists', `${formatNameForUrl(name)}-${date}.md`);

  if (existsSync(filePath)) {
    console.log(
      '\n❌ It seems that there has already been a contribution with your name for current month️. To avoid its overwrite, no file was created.\n'
    );
    console.log(
      '👉 Instead, please copy the template from ./content/templates/playlist.md to ./content/playlists/[NAME]-[MONTH]-[COUNTER].md'
    );
    return undefined;
  }

  await writeFile(filePath, content);

  return filePath;
};

(async () => {
  try {
    console.log('Hey, hi! Thank you for contributing to DiscoverWeekly.dev 🙏\n');

    const filePath = await addPlaylist();

    if (filePath) {
      console.log('\n✅ Cool! A new playlist has been initialized.\n');
      console.log(`👉 Continue by editing the Markdown file ${filePath}.\n`);
    }
  } catch (error) {
    console.error(error);
  }
})();
