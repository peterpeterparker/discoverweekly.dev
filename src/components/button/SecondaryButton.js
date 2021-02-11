export const SecondaryButton = ({children}) => {
    return <button
        type="button"
        className="border-2 border-indigo-500 hover:text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
    >
        {children}
    </button>
}
