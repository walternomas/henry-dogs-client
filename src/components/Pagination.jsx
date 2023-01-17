import style from "./paginado.module.css";

export default function Pagination({ dogsPerPage, currentPage, allDogs, paginado }) {
  const pagesCount = Math.ceil(allDogs / dogsPerPage);

  let firstNumber = 1;
  let lastNumber = 1;

  let adicionalNumbers = 2;
  if (window.screen.width < 500) adicionalNumbers = 1;
  if (window.screen.width > 650) adicionalNumbers = 3;
  if (window.screen.width > 1000) adicionalNumbers = 4;

  let countOfNumbers = adicionalNumbers * 2 + 1;

  if (countOfNumbers >= pagesCount) {
    countOfNumbers = pagesCount;
  } else {
    firstNumber = Math.max(currentPage - adicionalNumbers, 1);
    lastNumber = Math.min(currentPage + adicionalNumbers, pagesCount);
    if (lastNumber === pagesCount) {
      firstNumber += lastNumber - firstNumber - adicionalNumbers * 2;
    }
  }

  const pageNumbers = new Array(countOfNumbers)
    .fill()
    .map((d, i) => i + firstNumber);

  if (currentPage > pagesCount) paginado(1);

  return (
    <ul className={style.paginated}>
      <li
        onClick={() => paginado(1)}
        className={currentPage === 1 ? style.disabled : ""}
        title="First Page"
      >First</li>
      <li
        onClick={() => paginado(currentPage - 1)}
        className={currentPage === 1 ? style.disabled : ""}
        title="Previous"
      >Prev</li>
      {pageNumbers?.map((number) => (
        <li
          className={currentPage === number ? style.active : ""}
          key={number}
          onClick={() => paginado(number)}
        ><p>{number}</p></li>
      ))}
      <li
        onClick={() => paginado(currentPage + 1)}
        className={pagesCount === currentPage ? style.disabled : ""}
        title="Next"
      >Next</li>
      <li
        onClick={() => paginado(pagesCount)}
        className={pagesCount === currentPage ? style.disabled : ""}
        title="Last Page"
      >Last</li>
    </ul>
  );
}