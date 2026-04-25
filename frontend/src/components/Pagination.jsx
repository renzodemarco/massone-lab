function buildPages(currentPage, totalPages) {
  if (totalPages <= 1) return [1];

  const pages = new Set([1, totalPages, currentPage]);

  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  return [...pages].sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className="link-button rounded-lg border border-[#dce0e5] bg-white px-3 py-2 text-sm font-semibold text-[#111418] disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </button>
      {pages.map((pageNumber, index) => {
        const previous = pages[index - 1];
        const showGap = previous && pageNumber - previous > 1;

        return (
          <div key={pageNumber} className="flex items-center gap-2">
            {showGap ? <span className="px-1 text-sm text-[#637588]">...</span> : null}
            <button
              type="button"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                pageNumber === page
                  ? "bg-[#632b91] text-white"
                  : "link-button border border-[#dce0e5] bg-white text-[#111418]"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="link-button rounded-lg border border-[#dce0e5] bg-white px-3 py-2 text-sm font-semibold text-[#111418] disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}
