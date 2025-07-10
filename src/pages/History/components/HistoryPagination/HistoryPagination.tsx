import { useUnit } from "effector-react";
import { useEffect, useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  $historyCurrentPage,
  $totalPages,
  setHistoryPage,
} from "@/pages/History/model";
import { getVisiblePages } from "@/utils/getVisiblePages";

interface Props {
  className?: string;
}

const HistoryPagination: React.FC<Props> = ({ className }) => {
  const [historyCurrentPage, totalPages] = useUnit([
    $historyCurrentPage,
    $totalPages,
  ]);

  const visiblePages = useMemo(() => {
    return getVisiblePages(historyCurrentPage, totalPages);
  }, [totalPages, historyCurrentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setHistoryPage(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (historyCurrentPage > 1) {
      setHistoryPage(historyCurrentPage - 1);
    }
  };

  useEffect(() => {
    return () => {
      setHistoryPage(1);
    };
  }, []);

  const handleNext = () => {
    if (historyCurrentPage < totalPages) {
      setHistoryPage(historyCurrentPage + 1);
    }
  };
  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              disabled={historyCurrentPage === 1}
            />
          </PaginationItem>
          {visiblePages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={pageNumber === historyCurrentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              disabled={historyCurrentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HistoryPagination;
