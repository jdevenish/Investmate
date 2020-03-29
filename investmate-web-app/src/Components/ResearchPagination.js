import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function ResearchPagination({maxStocks, setCurrentPage}) {
    const [pageRange, setPageRange] = useState(1)

    return (
        <div className="research-pagination">
        <Pagination aria-label="Page navigation example">
            <PaginationItem >
                <PaginationLink first onClick={() => setPageRange(1)} />
            </PaginationItem>
            <PaginationItem >
                <PaginationLink previous onClick={() => setPageRange(pageRange-5)} />
            </PaginationItem>
            <PaginationItem active>
                <PaginationLink onClick={() => setCurrentPage(pageRange)}>
                    {pageRange}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(pageRange+1)}>
                    {pageRange + 1}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(pageRange+2)}>
                    {pageRange + 2}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(pageRange+3)}>
                    {pageRange + 3}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(pageRange+4)}>
                    {pageRange + 4}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem >
                <PaginationLink next onClick={() => setPageRange(pageRange+5)} />
            </PaginationItem>
            <PaginationItem >
                <PaginationLink last onClick={() => setPageRange(Math.round((maxStocks/24)-5))} />
            </PaginationItem>
        </Pagination>
        </div>
    );
}

export default ResearchPagination;
