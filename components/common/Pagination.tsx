import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Options } from "nuqs";

export function CommonPagination({
  page,
  setPage,
}: {
  page: number;
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) setPage((old) => (old ? old - 1 : 1));
            }}
            className={
              page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={page === p}
              onClick={() => setPage(p)}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((old) => (old ? old + 1 : 1))}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
