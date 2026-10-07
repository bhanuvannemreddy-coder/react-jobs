# React Jobs — Completed Project

## Run the project

Open two terminals in this folder.

### Terminal 1 — JSON Server
```bash
npm install
npm run server
```

The API runs at `http://localhost:8000`.

### Terminal 2 — React/Vite
```bash
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:3000`).

## Completed flows

- Home page
- Recent Jobs (first 3 jobs using JSON Server v1 pagination)
- Browse Jobs (all jobs)
- Job card More/Less description toggle
- Job Details page using React Router loader + `useLoaderData`
- Back to Jobs navigation
- Add Job page with validation
- Add Job POST to JSON Server
- After creating a job, navigation to its Job Details page
- Navbar Home / Jobs / Add Job navigation
- Home Browse Jobs button
- Home Add Job button
- View All Jobs button
- 404 page and invalid-job loader error handling
- Email and phone links on the Job Details page
