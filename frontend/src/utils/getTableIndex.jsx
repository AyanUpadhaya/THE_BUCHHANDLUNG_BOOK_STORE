const getTableIndex = (currentPage, rowsPerPage, index) => {
  
  return rowsPerPage * (currentPage - 1) + index + 1;
};

export default getTableIndex;
