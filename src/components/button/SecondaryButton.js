export const SecondaryButton = ({children}) => {
    return <button
        type="button"
        className="border-2 bg-black bg-opacity-80 border-purple-600 text-white capitalize rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-purple-700 focus:outline-none focus:shadow-outline"
    >
        {children}
    </button>
}
