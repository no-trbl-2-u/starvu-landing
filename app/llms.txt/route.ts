import { FAQ, STEPS, WHO_WE_SIGN } from "@/lib/landing";
import { JOBS, REQUIREMENTS } from "@/lib/jobs";
import { AFFILIATION_DISCLAIMER, ORG, absoluteUrl } from "@/lib/site";

/**
 * /llms.txt — a plain-text brief for LLMs and agents, per llmstxt.org.
 *
 * Generated from the same `lib/` data the pages render, so it cannot describe a
 * role that is no longer posted or miss one that is.
 */

// Static at build time: nothing here reads the request.
export const dynamic = "force-static";

function body(): string {
  const roles = JOBS.map(
    (job) =>
      `### ${job.title} — ${job.track}\n` +
      `- Terms: ${job.terms.join(", ")}\n` +
      `- Apply: ${absoluteUrl("/careers")}#${job.id}\n\n` +
      `${job.description}`,
  ).join("\n\n");

  return `# ${ORG.name}

> ${ORG.description}

${ORG.legalName} is based in ${ORG.region}, USA. Everything on this site is for adults: all applicants, talent and staff must be 18 or older and complete identity verification.

${AFFILIATION_DISCLAIMER}

## Pages

- [Home](${absoluteUrl("/")}): For creators. What Starvu handles, the 90-day trial, how signing works, and the application form.
- [Careers](${absoluteUrl("/careers")}): For job seekers. Open remote roles, requirements, and the application form.

## For creators

Starvu signs solo creators and couples. The creator makes the content; Starvu runs promotion, chatting, scheduling and brand deals. Talent set their own filming and posting hours and meet their manager weekly.

The engagement starts with a 90-day trial and no long-term commitment. If it is not the right fit, the creator keeps their page, their content and their audience. Commission and terms are not published; they are covered on a free 1:1 call and set out in the Talent Management Agreement, which the creator receives to read before signing.

How signing works:

${STEPS.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`).join("\n")}

Who Starvu signs:

${WHO_WE_SIGN.map((w) => `- ${w}`).join("\n")}

## Open roles

Starvu is hiring client engagement specialists. All roles are remote, part-time or full-time, and involve working with adult content.

${roles}

### Requirements for all roles

${REQUIREMENTS.map((r) => `- ${r}`).join("\n")}

## Questions

${FAQ.map(({ q, a }) => `**${q}**\n${a}`).join("\n\n")}

## Contact

- Talent enquiries: ${ORG.talentEmail}
- Job applications: ${ORG.careersEmail}
- Social: DM ${ORG.social}

Starvu replies to applications within 24 hours.
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
