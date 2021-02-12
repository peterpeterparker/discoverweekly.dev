import {Social} from '../social/Social';

export const Footer = () => {
  return (
    <footer className="w-screen bg-gray-50 dark:bg-black pt-8 pb-10 px-10 dark:text-white text-sm flex flex-col items-center">
      <hr className="w-24 mt-2 border-t-2 border-gray-200 dark:border-gray-600" />

      <div className="max-w-screen-md m-auto flex flex-col-reverse md:grid md:grid-cols-2 mt-16">
        {renderAbout()}

        {renderMore()}
      </div>
    </footer>
  );

  function renderAbout() {
    return (
      <div className="md:mr-4 flex flex-col justify-between">
        <div>
          <p className="text-xl mb-2">About</p>
          <p className="font-light">
            Developed with passion by{' '}
            <a
              href="https://daviddalbusco.com"
              rel="noopener norefferer"
              aria-label={`David Dal Busco website`}
              className={`hover:text-purple-600 dark:hover:text-purple-300 underline`}>
              David Dal Busco
            </a>
          </p>
        </div>

        <Social margin="mb-6"></Social>
      </div>
    );
  }

  function renderMore() {
    return (
      <div>
        <p className="text-xl mb-2">More projects</p>

        <p className="font-light mb-4">
          Give a try to{' '}
          <a
            href="https://deckdeckgo.com"
            rel="noopener norefferer"
            aria-label={`DeckDeckGo`}
            className={`hover:text-purple-600 dark:hover:text-purple-300 underline`}>
            DeckDeckGo
          </a>{' '}
          for your next presentations! The web open source editor for slides{' '}
          <img
            src="https://deckdeckgo.com/assets/img/deckdeckgo-logo.svg"
            className="w-4 inline-block align-middle"
            loading="lazy"
            aria-hidden={true}
            alt="DeckDeckGo logo"
          />
        </p>

        <p className="font-light mb-8">
          Looking for a simple and free time tracking app ⏱️? Try{' '}
          <a
            href="http://tietracker.app.link"
            rel="noopener norefferer"
            aria-label={`Tie Tracker`}
            className={`hover:text-purple-600 dark:hover:text-purple-300 underline`}>
            Tie Tracker
          </a>{' '}
          <img
            src="https://tietracker.com/assets/icon/logo.svg"
            loading="lazy"
            aria-hidden={true}
            alt="Tie Tracker logo"
            className="w-4 inline-block align-middle"
          />
        </p>
      </div>
    );
  }
};
