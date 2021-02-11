export const PrimaryButton = ({children}) => {
    return <button
        type="button"
        className="border border-indigo-500 bg-indigo-500 text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
    >
        {children}
    </button>
}
