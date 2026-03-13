import { useQueryState, parseAsInteger } from "nuqs";

export const usePagination = () => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      history: "push",
    }),
  );

  return { page, setPage };
};
