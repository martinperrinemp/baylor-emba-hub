# Manual semester import

No Canvas integration or personalized calendar feed is used. A designated volunteer prepares a reviewable summary from current, authorized syllabi, student-visible instructions, and instructor guidance.

## Safe import procedure
1. Obtain documents through authorized student access, **not** via an automated Canvas integration, feed, Duo workaround, or scraping service.
2. Extract **metadata only**: course, concise assignment title, date/time with timezone, distinct presentation and submission dates, links that are safe to share, dependencies, broad rubric/AI restrictions where redistribution is permitted.
3. Remove private names, email addresses, links with embedded tokens, proprietary material, full case text, graded work, private instructor correspondence, and restricted screenshots. Do not upload raw originals into the public repo.
4. Label source type and verification status. Store only *safe* citations/reference descriptions; a source may be checked privately by reviewers without posting it publicly.
5. A reviewer checks the structured record against official materials. Merge the approved metadata via PR; increment `knowledge_revision`, append a `changes.json` record, update manifest.
6. If the presentation date and Canvas submission deadline differ or one is unknown, keep them separate. Unknown is `null`, never guessed.

## Assignment example (documentation only; not real coursework)
```json
{
  "id": "SAMPLE101-project-presentation",
  "course_id": "SAMPLE101",
  "title": "Illustrative project presentation",
  "presentation_at": "2027-03-05T18:00:00-06:00",
  "submission_due_at": null,
  "official_due_at": null,
  "verification_status": "needs_verification",
  "source_type": "syllabus",
  "source_reference": "Student-verified page reference, no private URL",
  "dependencies": ["Coordinate team availability", "Rehearse"],
  "last_verified_at": null
}
```
