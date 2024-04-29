"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import styles from "./search.module.css";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const [text, setText] = useState("");
  const [debounce] = useDebounce(text);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (!debounce) {
      params.delete("search");
    } else {
      params.set("search", debounce);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debounce]);

  return (
    <div className={styles.searchContainer}>
      <input
        value={text}
        placeholder="Search jobs by title..."
        onChange={(e) => setText(e.target.value)}
        className={styles.inputWrapper}
      />
    </div>
  );
};

export default Search;
