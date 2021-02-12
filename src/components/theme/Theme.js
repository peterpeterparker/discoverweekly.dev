import {useEffect, useState} from 'react';

import {useTheme} from 'next-themes';

export const Theme = () => {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="absolute cursor-pointer top-1/2 right-0 sm:right-auto sm:left-1/2 transform -translate-y-2/4 sm:-translate-x-2/4">
      <div className={`block w-10 h-6 rounded-full shadow-inner ${theme === 'light' ? 'bg-black' : 'bg-black'}`}></div>

      <span
          className={`${
              theme === 'light' ? 'bg-purple-600 transform translate-x-full' : 'bg-gray-600'
          } absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`}>
          <input type="checkbox" className="absolute opacity-0 w-0 h-0"/>
        </span>
    </button>
  );
};
