"use server";

import styles from "./page.module.css";
import { getJobs, getFilterOptions } from "@/actions/jobs";
import Card from "@/components/card/card";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import AddNewJob from "@/components/addNewJob/addNewJob";
import Filters from "@/components/filters/filters";

export default async function Home({ searchParams }) {
  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const search = searchParams.search;
  const sectors = searchParams.sectors;
  const countries = searchParams.countries;
  const cities = searchParams.cities;

  const { data, totalPages } = await getJobs(
    page,
    10,
    search,
    sectors,
    countries,
    cities
  );
  const { jobsOptions } = await getFilterOptions();

  return (
    <main className={styles.main}>
      <Filters options={jobsOptions} />
      <div className={styles.contentContainer}>
        <div className={styles.searchBarContainer}>
          <Search />
          <AddNewJob searchParams={searchParams} />
        </div>
        <div className={styles.jobCardsContainer}>
          {data.map((job) => (
            <Card info={job} searchParams={searchParams} key={job.id} />
          ))}
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
