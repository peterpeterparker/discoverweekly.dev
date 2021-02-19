import {useEffect, useState} from 'react';

const Theme = () => {
  const initTheme =
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';

  const [theme, setTheme] = useState(initTheme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.theme = theme;
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="absolute cursor-pointer top-1/2 right-0 sm:right-auto sm:left-1/2 transform -translate-y-2/4 sm:-translate-x-2/4">
      <div className={`block w-10 h-6 rounded-full shadow-inner bg-gray-50 dark:bg-black`}></div>

      <span
        className={`${
          theme === 'light' ? 'bg-purple-600 transform translate-x-full' : 'bg-gray-600'
        } absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`}>
        <input type="checkbox" className="absolute opacity-0 w-0 h-0" />

        <svg
          className={`h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={true}
          alt=""
          viewBox="0 0 512 512">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
          />
          <circle
            cx="256"
            cy="256"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke-width="32"
          />
        </svg>

        <svg
          className={`h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={true}
          alt=""
          viewBox="0 0 512 512">
          <path
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
      </span>
    </button>
  );
};

export default Theme;
