const Pagination = ({ page=1, setPage, totalPage=10, setTotalPage }) => {
    const handleNext = () => {
        if (page < totalPage) {
            setPage(page + 1)
            window.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }
    }
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
            window.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between sm:hidden">
                {page>1 &&
                    <a href="" onClick={() => handlePrev()}
                        className="relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Previous
                    </a>
                }
                {page < totalPage &&
                    <a href="" onClick={() => handleNext()}
                        className="relative ml-3 inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Next
                    </a>
                }
            </div>
            <div className="hidden md:flex justify-center items-center w-full">
                <nav>
                    {/* <a onClick={() => handlePrev()}
                        className={`${page === 1 ? 'opacity-40' : 'cursor-pointer hover:bg-gray-50'} relative inline-flex items-center rounded-r-md border bg-white px-2 py-2 text-sm font-medium text-gray-500  focus:z-20`}>
                        <span className="sr-only">Previous</span>
                    </a> */}
                    {
                        Array.from({ length: totalPage }, (_, index) => index + 1).map((item) => 
                            <p aria-current="page" key={item}
                                onClick={()=> setPage(item)}
                                className={`relative z-10 inline-flex items-center
                                    ${page === item ? 'bg-primary-200 bg-opacity-30 rounded-lg cursor-default z-20' : 'cursor-pointer hover:text-primary-200'}  px-4 py-2 text-sm font-medium  focus:z-20`}>{item}
                            </p>
                        )
                    }
                    {/* <a onClick={() => handleNext()}
                        className={`${page === totalPage ? 'opacity-40' : 'cursor-pointer hover:bg-gray-50'} relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium text-gray-500  focus:z-20`}>
                        <span className="sr-only">Next</span>
                    </a> */}
                </nav>
            </div>
        </div>
    )
}

export default Pagination;
