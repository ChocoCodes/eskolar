export type ScholarshipApplication = {
  name: string;
  provider: string;
  status: "Completed" | "Under Review" | "Pending";
  result: "Accepted" | "Rejected" | "Pending";
};

export const dummyScholarships: ScholarshipApplication[] = [
  {
    name: "STEM Octavio Grant Scholarship",
    provider: "Mr. John Roland Octavio",
    status: "Completed",
    result: "Accepted",
  },
  {
    name: "Law Scholarship",
    provider: "Labistre Foundation",
    status: "Completed",
    result: "Rejected",
  },
  {
    name: "DOST SEI Undergraduate",
    provider: "DOST",
    status: "Under Review",
    result: "Pending",
  },
  {
    name: "Fukujin Kisen Oration Scholar",
    provider: "JBLCF",
    status: "Under Review",
    result: "Pending",
  },
  {
    name: "Nixar Academic Scholar",
    provider: "Nixar Group of Companies",
    status: "Under Review",
    result: "Pending",
  },
  {
    name: "Global Excellence Scholarship",
    provider: "UNESCO",
    status: "Completed",
    result: "Accepted",
  },
  {
    name: "Tech Innovators Bursary",
    provider: "Google Foundation",
    status: "Completed",
    result: "Rejected",
  },
  {
    name: "Young Leaders Program",
    provider: "Rotary International",
    status: "Under Review",
    result: "Pending",
  },
  {
    name: "Future Scholars Grant",
    provider: "EduFund Organization",
    status: "Completed",
    result: "Accepted",
  },
  {
    name: "Community Builders Scholarship",
    provider: "LocalGov Support Fund",
    status: "Under Review",
    result: "Pending",
  },
];
