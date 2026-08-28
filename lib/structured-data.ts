import { FAQ } from "./landing";
import { DATE_POSTED, JOBS, REQUIREMENTS, VALID_THROUGH, type Job } from "./jobs";
import { ORG, SITE_URL, absoluteUrl } from "./site";

/**
 * schema.org graphs for the two pages. Google reads `JobPosting` into the jobs
 * experience and `FAQPage` into the search result itself, so these are the
 * highest-leverage SEO surface on the site.
 */

/** `@id` for the organization node, so other nodes can reference it by URI. */
const ORG_ID = `${SITE_URL}/#organization`;

export const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: ORG.name,
  legalName: ORG.legalName,
  url: SITE_URL,
  description: ORG.description,
  email: ORG.talentEmail,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(ORG.logo),
    width: ORG.logoWidth,
    height: ORG.logoHeight,
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: ORG.region,
    addressCountry: ORG.country,
  },
} as const;

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORG.name,
  publisher: { "@id": ORG_ID },
} as const;

/**
 * Google wants `description` as an HTML string, and rewards postings that list
 * responsibilities and requirements rather than a bare sentence.
 */
const jobDescriptionHtml = (job: Job) =>
  `<p>${job.description}</p><p><strong>What we ask for:</strong></p><ul>${REQUIREMENTS.map(
    (r) => `<li>${r}</li>`,
  ).join("")}</ul>`;

const jobPosting = (job: Job) => ({
  "@type": "JobPosting",
  "@id": `${absoluteUrl("/careers")}#${job.id}`,
  identifier: {
    "@type": "PropertyValue",
    name: ORG.name,
    value: job.id,
  },
  title: `${job.title}, ${job.track.toLowerCase()}`,
  description: jobDescriptionHtml(job),
  datePosted: DATE_POSTED,
  validThrough: VALID_THROUGH,
  employmentType: [...job.employmentType],
  hiringOrganization: { "@id": ORG_ID },
  // Fully remote: Google requires TELECOMMUTE plus an applicant location
  // requirement instead of a physical `jobLocation`.
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "United States",
  },
  directApply: true,
  industry: "Talent management",
  qualifications: REQUIREMENTS.join(" "),
});

export const landingGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    website,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export const careersGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    website,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: absoluteUrl("/careers"),
        },
      ],
    },
    ...JOBS.map(jobPosting),
  ],
};
