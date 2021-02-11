export const SecondaryButton = ({children}) => {
    return <button
        type="button"
        className="border-2 bg-dark bg-opacity-80 border-indigo-600 text-white capitalize rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
    >
        {children}
    </button>
}
