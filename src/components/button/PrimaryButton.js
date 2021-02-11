export const PrimaryButton = ({children}) => {
    return <button
        type="button"
        className="border border-purple-600 bg-purple-600 text-white capitalize rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-purple-700 focus:outline-none focus:shadow-outline"
    >
        {children}
    </button>
}
