export const GetPlaylists = ({children, action, color = 'dark:bg-black dark:bg-opacity-80 dark:text-white  hover:bg-purple-200 dark:hover:bg-purple-700'}) => {
    return <button onClick={action}
        type="button"
        className={`${color} border-2 border-purple-600 capitalize rounded-full px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline`}
    >
        {children}
    </button>
}
