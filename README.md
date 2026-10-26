# Stillwater — Gospel Study

Independent, unofficial scripture and General Conference study companion. Not affiliated with or endorsed by The Church of Jesus Christ of Latter-day Saints.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. If another local app occupies that port, run `npm run dev -- --port 3010`.

## Content integrations

The site reads the Open Scripture API catalog, chapters, scripture search, conference archive, talk metadata, and talk text endpoints. The API is documented as beta and English-only. It does not document a license that grants redistribution of the underlying Church scripture or conference text. The Church’s Terms of Use restrict other use of site materials without prior written permission. For that reason Stillwater fetches actual chapter/talk data but hides full text unless permission has been verified. Reader pages include source links and retain only local reference bookmarks, reading position, highlights, and notes—not source text.

Do not set `REDISTRIBUTION_PERMISSION_VERIFIED=true` until written permission covers the intended website, text types, territories, and display/storage use. API availability is not treated as a content license. Conference search snippets are brief excerpts with speaker/title attribution and source links; confirm permissions for sustained public use.

Open Scripture docs: https://openscriptureapi.org/docs
- Scripture base: `https://openscriptureapi.org/api/scriptures/v1/lds/en`
- Conference base: `https://openscriptureapi.org/api/conference/v1/lds/en`

The scripture catalog supports volumes, books, chapters, verses, and paginated full-text search. Conference endpoints provide conference lists, metadata, speakers, talk content, and full-text search. A second, legally usable Spanish Bible source was verified: Reina-Valera 1909 is identified as public domain by Midvash and CC0 in BibleAquifer's distribution. The reader can show RVR1909 for the Bible only, clearly labeled as the public-domain 1909 Spanish text (not the Church's 2015 Spanish Bible edition). It does not provide Spanish Book of Mormon, Doctrine and Covenants, or Pearl of Great Price text.

## Language and AI

Open Scripture documents only the `en` language code at present. This app does not send Spanish requests to that API or claim Spanish scripture text. Spanish questions are accepted; when `OPENAI_API_KEY` is configured, retrieved English source material is used for a Spanish-language explanation. This is a paraphrase, not an official translation. No Spanish API covering all LDS standard works with verified redistribution permissions was identified. The official Spanish Bible is a 2015 Church edition based on Reina-Valera 1909; the public-domain RVR1909 source is not a substitute for that Church edition.

`OPENAI_API_KEY` and optional `OPENAI_MODEL` are server-only. The study endpoint retrieves scripture search matches and conference excerpts before generation. If source retrieval fails, the app reports no fabricated content.

## Personal study

Bookmarks, verse highlights, study notes, and reading progress currently use browser local storage. No account, cloud sync, Supabase, or vector database is connected. Source text is never stored in local storage.

## Lesson & Talk Builder

Open `/builder` to create a lesson, talk, personal study outline, or custom presentation. The builder uses React Flow and dagre for editable, connected sections and automatic layout. It supports branches, source recommendations from the live Open Scripture API, local autosave, versions, undo/redo, outline and presentation views, PDF and Word export, and print. Projects preserve nodes, edges, positions, notes, and private writing when reopened. A sign-in and cloud sync panel appears only when Supabase is configured.

`OPENAI_API_KEY` enables generated section suggestions and AI editing previews. The edit assistant does not apply changes until the user accepts them. Without a key, the builder creates a plainly labeled, source-backed starting outline; AI editing reports that configuration is needed. Personal experience text is withheld from AI editing requests. Source-backed nodes are tied to verified API results. The builder stores references and user writing, not Church full text.

To enable account sync, create a Supabase project, run [supabase/schema.sql](supabase/schema.sql) in its SQL editor, and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`. Configure the Supabase email sign-in redirect URL for the deployed `/builder` route. Row-level security policies restrict each signed-in account to its own projects. Until configured, all builder saves remain in the current browser.

## Copyright and permission references

- [Church Terms of Use](https://www.churchofjesuschrist.org/learn/legal/terms-of-use/go?lang=eng) says other use of site materials by organizations or legal entities requires prior written permission.
- [Church permissions portal](https://permissions.churchofjesuschrist.org/) for requesting use of Church-owned materials.
- [Open Scripture API documentation](https://openscriptureapi.org/docs) documents endpoints but does not state a downstream redistribution license for underlying Church text.
