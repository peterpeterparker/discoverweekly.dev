import '../styles/globals.scss';

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}

export default MyApp;

// Easter egg
console.log(`______ _                             _    _           _    _            _            
|  _  (_)                           | |  | |         | |  | |          | |           
| | | |_ ___  ___ _____   _____ _ __| |  | | ___  ___| | _| |_   _   __| | _____   __
| | | | / __|/ __/ _ \\ \\ / / _ \\ '__| |/\\| |/ _ \\/ _ \\ |/ / | | | | / _\` |/ _ \\ \\ / /
| |/ /| \\__ \\ (_| (_) \\ V /  __/ |  \\  /\\  /  __/  __/   <| | |_| || (_| |  __/\\ V / 
|___/ |_|___/\\___\\___/ \\_/ \\___|_|   \\/  \\/ \\___|\\___|_|\\_\\_|\\__, (_)__,_|\\___| \\_/  
                                                              __/ |                  
                                                             |___/                   `);
console.log('Contribute now, share your best music tips!');
console.log('https://github.com/peterpeterparker/discoverweekly.dev#contributing');
