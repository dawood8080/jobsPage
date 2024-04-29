"use client";

import Link from "next/link";
import styles from "./pagination.module.css";
import { useSearchParams } from "next/navigation";

export default function Pagination({ totalPages = 1 }) {
  const searchParams = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;

  console.log(totalPages);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <Link
          href={`?page=${currentPage === 1 ? 1 : currentPage - 1}`}
          className={`${styles.paginationButton} ${
            currentPage === 1 ? styles.disabledButton : ""
          }`}
        >
          Previous
        </Link>
        <p
          className={styles.numbersContainer}
        >{`Page ${currentPage} of ${totalPages} pages`}</p>
        <Link
          href={`?page=${
            currentPage < totalPages ? currentPage + 1 : totalPages
          }`}
          className={`${styles.paginationButton} ${
            currentPage >= totalPages ? styles.disabledButton : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
