export function Pagination ({page, setPage, list}) {

    function changePage (event) {
        setPage((currPage) => {
            if(event.target.id === 'previous'){
                return currPage > 1 ? currPage - 1 : 1
            }
            if(event.target.id === 'next' ){
                return list[currPage+1].length > 0 ? currPage + 1 : currPage
            }
        })
    }

    return (
        <nav className="page">
            <button id='previous' onClick={changePage}>Previous</button>
            <p>Page: {page}</p>
            <button id='next' onClick={changePage}>Next</button>
        </nav>
    )
}