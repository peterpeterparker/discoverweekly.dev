import {Social} from '../social/Social';

export const Footer = () => {
  return (
    <footer className="w-screen bg-black p-10 text-white text-sm flex flex-col items-center">
      <hr className="w-24 mt-2 border-t-2 border-gray-600" />

      <Social margin="my-16"></Social>

      <div className="max-w-screen-md m-auto grid grid-cols-2">
        {renderAbout()}

        {renderMore()}
      </div>
    </footer>
  );

  function renderAbout() {
    return (
      <div className="mr-4">
        <p className="text-xl mb-2">About</p>
        <p className="font-light">
          Developed with passion by{' '}
          <a
            href="https://daviddalbusco.com"
            rel="noopener norefferer"
            aria-label={`David Dal Busco website`}
            className={`hover:text-purple-300 underline`}>
            David Dal Busco
          </a>
        </p>

          <div className={`flex`}>
              <a href="https://github.com/peterpeterparker/" rel="noopener norefferer" aria-label="GitHub" className="my-2 text-white hover:text-purple-600">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 512 512"><path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"/></svg>
              </a>

              <a href="https://twitter.com/daviddalbusco" rel="noopener norefferer" aria-label="Twitter @daviddalbusco" className="ml-2 mt-2 text-white hover:text-purple-600">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 512 512"><path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"/></svg>
              </a>

              <a href="https://dev.to/daviddalbusco/" rel="noopener norefferer" aria-label="The Practical DEV @daviddalbusco" className="ml-2 mt-2 text-white hover:text-purple-600">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 448 512"><path fill="currentColor" d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"></path></svg>
              </a>
          </div>
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
                className={`hover:text-purple-300 underline`}>
                DeckDeckGo
            </a>{' '}
            for your next presentations!{' '}The web open source editor for slides{' '}
            <img
                src="https://deckdeckgo.com/assets/img/deckdeckgo-logo.svg"
                className="w-4 inline-block align-middle"
                loading="lazy"
                aria-hidden={true}
                alt="DeckDeckGo logo"
            />
        </p>

        <p className="font-light">
          Looking for a simple and free time tracking app ⏱️? Try{' '}
          <a
            href="http://tietracker.app.link"
            rel="noopener norefferer"
            aria-label={`Tie Tracker`}
            className={`hover:text-purple-300 underline`}>
            Tie Tracker
          </a>{' '}
          <img src="https://tietracker.com/assets/icon/logo.svg" loading="lazy" aria-hidden={true} alt="Tie Tracker logo" className="w-4 inline-block align-middle" />
        </p>
      </div>
    );
  }
};
