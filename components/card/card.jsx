"use server";

import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import DeleteJob from "@/components/deleteJob/deleteJob";

const Card = ({ searchParams, info }) => {
  const param = { ...searchParams };
  delete param.display;

  return (
    <div className={styles.cardContainer}>
      <Image
        className={styles.imageContainer}
        width={130}
        height={130}
        src={info.image}
        alt="jobImage"
      />
      <div className={styles.cardControls}>
        <DeleteJob id={info.id} />
        <Link
          className={styles.eyeWrapper}
          href={{
            pathname: "/",
            query: {
              ...(param ? param : {}),
              display: info.id,
            },
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
          </svg>
        </Link>
      </div>
      <div className={styles.infoContainer}>
        <strong className={styles.title}>{info.title}</strong>
        <p className={styles.location}>{`${info.country}, ${info.city}`}</p>
        <p className={styles.sector}>{info.sector}</p>
        <p className={styles.description}>{info.description}</p>
      </div>
      {typeof searchParams.display === "string" &&
        searchParams.display === `${info.id}` && (
          <div className={styles.modalContainer}>
            <div className={styles.overlay} />
            <div className={styles.modal}>
              <div className={styles.propertyWrapper}>
                <h2>Job Title:</h2>
                <h2 className={styles.jobProperty}>{info.title}</h2>
              </div>
              <div className={styles.propertyWrapper}>
                <strong>Sector: </strong>
                <p className={styles.jobProperty}>{info.sector}</p>
              </div>
              <div className={styles.propertyWrapper}>
                <strong>Country: </strong>
                <p className={styles.jobProperty}>{info.country}</p>
              </div>
              <div className={styles.propertyWrapper}>
                <strong>City: </strong>
                <p className={styles.jobProperty}>{info.city}</p>
              </div>
              <div className={styles.propertyWrapper}>
                <strong>Description: </strong>
                <p className={styles.jobProperty}>{info.description}</p>
              </div>

              <Link
                href={{
                  pathname: "/",
                  query: {
                    ...(param ? param : {}),
                  },
                }}
                className={styles.closeButton}
              >
                close
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};

export default Card;
