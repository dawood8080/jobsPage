"use client";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import styles from "./submitButtons.module.css";
import { useRouter } from "next/navigation";

const SubmitButtons = () => {
  const { pending, data } = useFormStatus();
  const [error, setError] = useState("");
  const route = useRouter();

  useEffect(() => {
    if (data) {
      for (const value of data?.values()) {
        if (!value.length) {
          console.log("ddd");
          setError("Please fill all fields");
          break;
        }
      }
    }
  }, [pending]);

  return (
    <div className={styles.bottomPart}>
      <div className={styles.buttonsWrapper}>
        <button
          className={`${styles.button} ${styles.submit}`}
          type="submit"
          aria-disabled={pending}
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
        <button
          onClick={() => route.push("/")}
          className={`${styles.button} ${styles.submitButton}`}
        >
          Cancel
        </button>
      </div>

      {!!error.length && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SubmitButtons;
