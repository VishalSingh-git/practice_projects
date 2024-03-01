const calculatePaginationValues = (
  data: any[],
  itemsPerPage: number,
  currentPage: number
): { currentItems: any[]; totalPages: number } => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { currentItems, totalPages };
};

export default calculatePaginationValues;
