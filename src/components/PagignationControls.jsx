import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PaginationControls = memo(({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 1) return pages;

        pages.push(1); // Always show the first page

        if (currentPage > 3) {
            pages.push('...'); // Ellipsis for skipped pages
        }

        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...'); // Ellipsis for skipped pages
        }

        pages.push(totalPages); // Always show the last page

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex justify-center mt-5 space-x-2">
            <button
                className="px-4 py-2 bg-gray-300 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                Previous
            </button>
            {pages.map((page, index) =>
                page === '...' ? (
                    <span key={index} className="px-4 py-2 mx-1 bg-gray-200 rounded-full shadow-md">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`px-4 py-2 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-full shadow-md hover:shadow-lg transition-all duration-200`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}
            <button
                className="px-4 py-2 bg-gray-300 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </button>
        </div>
    );
});

export default PaginationControls;