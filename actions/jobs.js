"use server";
import { promises as fs } from "fs";
import { redirect } from "next/navigation";
import path from "path";

async function getJobs(
  page = 1,
  limit = 4,
  search = "",
  sectors = "",
  countries = "",
  cities = ""
) {
  const allCountries = !!countries ? countries.split(",") : [];
  const allCities = !!cities ? cities.split(",") : [];
  const allSectors = !!sectors ? sectors.split(",") : [];
  const file = await fs.readFile(
    process.cwd() + "/app/data.json",
    "utf8",
    "utf8"
  );
  const data = JSON.parse(file).data;

  let filteredData = data;

  // Apply filters
  if (search) {
    filteredData = filteredData.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (allSectors.length > 0) {
    filteredData = filteredData.filter((job) =>
      allSectors.includes(job.sector)
    );
  }
  if (allCountries.length > 0) {
    filteredData = filteredData.filter((job) =>
      allCountries.includes(job.country)
    );
  }
  if (allCities.length > 0) {
    filteredData = filteredData.filter((job) => allCities.includes(job.city));
  }

  const totalPages = Math.ceil(filteredData.length / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return { data: filteredData.slice(startIndex, endIndex), totalPages };
}

async function getFilterOptions() {
  const file = await fs.readFile(
    process.cwd() + "/app/data.json",
    "utf8",
    "utf8"
  );
  const data = JSON.parse(file).data;

  const filteredData = {
    sectors: [],
    countries: {},
  };

  data.forEach((job) => {
    if (!filteredData.sectors.includes(job.sector)) {
      filteredData.sectors.push(job.sector);
    }

    if (!filteredData.countries[job.country]) {
      filteredData.countries[job.country] = [];
    }

    if (!filteredData.countries[job.country].includes(job.city)) {
      filteredData.countries[job.country].push(job.city);
    }
  });

  return { jobsOptions: filteredData };
}

async function addNewJob(jobInfo) {
  if (
    !jobInfo.get("city") ||
    !jobInfo.get("country") ||
    !jobInfo.get("sector") ||
    !jobInfo.get("title") ||
    !jobInfo.get("description")
  ) {
    return { success: false, message: "Please fill all fields" };
  }
  const info = {
    city: jobInfo.get("city"),
    country: jobInfo.get("country"),
    description: jobInfo.get("description"),
    image: "https://picsum.photos/500/500",
    sector: jobInfo.get("sector"),
    title: jobInfo.get("title"),
  };
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  const jobs = JSON.parse(file);

  info.id = `${jobs.data.length + 1}`;

  jobs.data.push(info);

  console.log(JSON.stringify(jobs));

  await fs.writeFile(process.cwd() + "/app/data.json", JSON.stringify(jobs));

  redirect("/");
}

async function deleteJob(id) {
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  const jobs = JSON.parse(file);

  // Find the index of the job with the specified ID
  const index = jobs.data.findIndex((job) => job.id === id);

  // Remove the job from the array
  jobs.data.splice(index, 1);

  // Write the updated data back to the JSON file
  await fs.writeFile(process.cwd() + "/app/data.json", JSON.stringify(jobs, null, 2));

  redirect("/");
}

async function getJobById(id) {
  const filePath = path.join(process.cwd(), "app", "data.json");

  const fileContent = await fs.readFile(filePath, "utf8");
  const jobs = JSON.parse(fileContent).data;

  const job = jobs.find((job) => job.id === id);

  if (job) {
    return job;
  } else {
    console.log(`Job with ID ${id} not found.`);
    return null;
  }
}

export { getFilterOptions, getJobs, addNewJob, deleteJob, getJobById };
