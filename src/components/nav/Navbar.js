export const Navbar = () => {

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block sm:hidden h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                            <img
                                className="hidden sm:block h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Workflow"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 items-center pr-2 hidden sm:flex">
                        <button
                            type="button"
                            className="border border-indigo-500 bg-indigo-500 text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                        >
                            Add your playlist
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    );
};
