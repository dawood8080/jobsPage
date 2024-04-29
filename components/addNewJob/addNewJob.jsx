"use server";
import Link from "next/link";
import styles from "./addNewJob.module.css";
import { addNewJob } from "@/actions/jobs";
import SubmitButtons from "@/components/submitButtons/submitButtons";

const AddNewJob = ({ searchParams }) => {
  return (
    <>
      <Link
        className={`${styles.button} ${styles.addNewButton}`}
        href={{
          pathname: "/",
          query: {
            newJob: 1,
          },
        }}
      >
        Add new job
      </Link>
      {typeof searchParams.newJob === "string" && (
        <div className={styles.modalContainer}>
          <div className={styles.overlay} />
          <div className={styles.modal}>
            <div className={styles.modelHeader}>
              <h2>Add New Job Post</h2>
            </div>
            <form action={addNewJob} className={styles.modalContent}>
              <div className={styles.formRow}>
                <div className={styles.formInputWrapper}>
                  <label htmlFor="jobTitle">Job Title:</label>
                  <input
                    name="title"
                    className={styles.textInput}
                    id="jobTitle"
                  />
                </div>
                <div className={styles.formInputWrapper}>
                  <label htmlFor="sector">Sector:</label>
                  <input
                    name="sector"
                    className={styles.textInput}
                    id="sector"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formInputWrapper}>
                  <label htmlFor="country">Country:</label>
                  <input
                    className={styles.textInput}
                    id="country"
                    name="country"
                  />
                </div>
                <div className={styles.formInputWrapper}>
                  <label htmlFor="city">City:</label>
                  <input className={styles.textInput} id="city" name="city" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formInputWrapper}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    className={styles.descriptionInput}
                    id="description"
                    name="description"
                  />
                </div>
              </div>
              <SubmitButtons />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewJob;
