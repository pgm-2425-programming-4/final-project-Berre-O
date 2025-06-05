export function Pagination({ currentPage, pageCount, onPageChanged }) {
  let pageNumberArray;

  if (pageCount <= 6) {
    pageNumberArray = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumberArray.push(i + 1);
    }
  } else if (currentPage > 3 && currentPage < pageCount - 2) {
    pageNumberArray = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      pageCount,
    ];
  } else if (currentPage <= 3) {
    pageNumberArray = [1, 2, 3, 4, null, pageCount];
  } else {
    pageNumberArray = [
      1,
      null,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  const pageLinks = [];
  pageNumberArray.forEach((pageNumber, index) => {
    if (pageNumber === null) {
      pageLinks.push(
        <li key={index} class="p">
          <span className="pagination__ellipsis">&hellip;</span>
        </li>
      );
    } else {
      pageLinks.push(
        <li key={index} className="pagination__item">
          <button
            className={
              "pagination__link " +
              (pageNumber === currentPage ? "is-current" : "")
            }
            aria-label={`Go to page ${pageNumber}`}
            onClick={() => onPageChanged(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    }
  });

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination__previous"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="pagination__next"
        disabled={currentPage === pageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next page
      </button>
      <ul className="pagination__list">{pageLinks}</ul>
    </nav>
  );
}