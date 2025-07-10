import { useUnit } from "effector-react";
import { useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GAMES_PER_PAGE } from "@/constants";
import { getVisiblePages } from "@/utils/getVisiblePages";

import {
  $gamesGlobalRating,
  $globalRatingCurrentPage,
  setGlobalRatingPage,
} from "../model";

interface Props {
  className?: string;
}

const LeaderboardPagination: React.FC<Props> = ({ className }) => {
  const [gamesGlobalRating, globalRatingCurrentPage] = useUnit([
    $gamesGlobalRating,
    $globalRatingCurrentPage,
  ]);

  const TOTAL_PAGES = Math.ceil(gamesGlobalRating!.total / GAMES_PER_PAGE);

  const visiblePages = useMemo(() => {
    return getVisiblePages(globalRatingCurrentPage, TOTAL_PAGES);
  }, [TOTAL_PAGES, globalRatingCurrentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
      setGlobalRatingPage(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (globalRatingCurrentPage > 1) {
      setGlobalRatingPage(globalRatingCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (globalRatingCurrentPage < TOTAL_PAGES) {
      setGlobalRatingPage(globalRatingCurrentPage + 1);
    }
  };

  if (gamesGlobalRating && gamesGlobalRating.total <= GAMES_PER_PAGE) {
    return null;
  }

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              disabled={globalRatingCurrentPage === 1}
            />
          </PaginationItem>
          {visiblePages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={pageNumber === globalRatingCurrentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              disabled={globalRatingCurrentPage === TOTAL_PAGES}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default LeaderboardPagination;
