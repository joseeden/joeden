---
Comment: This is used for the project "Probably Important"
Link: https://github.com/joseeden/Probably-Important
--- 

## Prompt

I want to build a note-taking app called "Probably Important" using Next.js.

The app should allow users to create, edit, and delete notes.

Each note should have a title and content. The note should be created with a timestamp and should be displayed in a list of notes.

Notes should be created and edited using a rich text editor (using TipTap) that allows users to format their notes with bold, italic, and underline options.

The app should also have a search functionality to find notes by title or content.

Additionally, I want to implement user authentication so that users can only access their own notes.

Authenticated users should be able to:

- Login and log out
- Create new notes
- View, update, and delete their existing notes
- Search through their notes
- Share notes publicly with a unique URL

The app should be built using Next.js with Bun as the runtime.

Typescript should be used for type safety, and Tailwind CSS should be used for styling.

The backend should be implemented using Next.js API routes, and the frontend should be built with React components.

Authentication should be implemented using better-auth, and the database should be managed with Prisma and Neon PostgreSQL.

The rich editor should be implemented using TipTap, and the search functionality should be implemented using a simple text search on the database.

The basic rich text editor should support the following formatting options:

- Bold
- Italic
- Underline
- Headings
- Bullet list
- Numbered list
- Links
- Blockquote
- Horizontal separator lines

The data will be stored in a Neon PostgreSQL database, and Prisma will be used as the ORM to interact with the database.

Before implementing any code, create a `SPEC.md` document and wait for approval.

DO NOT generate application code, database migrations, configuration files, or project scaffolding until the specifications in `SPEC.md` have been reviewed and approved.

The specification should define:

- Project overview
- Functional requirements
- Non-functional requirements
- User flows
- Database schema
- Authentication flow
- API endpoints
- Frontend pages and components
- Folder structure
- Third-party dependencies
- Implementation phases

The specification should be concise, practical, and focused on the requirements described above. Avoid adding unnecessary features that are not part of the project scope.

Keep the implementation simple and production-ready. Favor straightforward solutions over advanced patterns unless they are required by the project requirements.