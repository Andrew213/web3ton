import { MAX_VISIBLE_PAGES } from "@/constants";

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = MAX_VISIBLE_PAGES,
) {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const end = Math.min(totalPages, start + maxVisiblePages - 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
