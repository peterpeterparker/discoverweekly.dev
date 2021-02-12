// Source: https://github.com/pmndrs/react-three-next/blob/main/next.config.js
const debug = false;

const match = (path) => {
    if (!path.includes('three/examples/jsm')) return false
    if (debug) {
        // should be around 3/4 seconds the first time and then 200ms after using Webpack 5 built-in loader cache
        let end = start ? new Date() - start : 0
        console.log(
            `\x1b[37m`,
            `🚄 ${end}ms - The transpilation ${path} in process`
        )
        if (i === 1) {
            start = new Date()
        }
        i++
    }
    return true
}

const withTM = require('next-transpile-modules')(
    ['three', '@react-three/drei'], // '@react-three/postprocessing'
    { debug: debug, __unstable_matcher: match } // symlink-caused loops which cause memory to get bloated exponentially.
)

module.exports = withTM({
    images: {
        domains: ['pbs.twimg.com'],
    },
});
