const SuccessModal = ({ isOpen, onClose, isError = false, message }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full ${isError ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {isError ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <h2 className={`text-2xl font-semibold ${isError ? 'text-red-600' : 'text-blue-700'}`}>
                        {isError ? 'Oops! Something went wrong' : 'Success!'}
                    </h2>
                </div>

                <p className="text-gray-600 mb-6">
                    {typeof message === 'string' ? message : JSON.stringify(message)}
                </p>

                <div className="text-right">
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 rounded-lg font-semibold shadow-md transition duration-300 ${isError ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800'
                            } text-white`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
