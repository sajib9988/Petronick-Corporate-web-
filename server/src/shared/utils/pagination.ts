type PaginationQuery = {
  page?: string | number;
  limit?: string | number;
  search?: string;
};

export function getPagination(query: PaginationQuery) {
  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const limit = Math.min(100, parseInt(String(query.limit || "10"), 10) || 10);
  const search = query.search ? String(query.search) : undefined;
  const skip = (page - 1) * limit;
  return { page, limit, skip, take: limit, search };
}
