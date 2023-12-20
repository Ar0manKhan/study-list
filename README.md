# This is a simple note taking app except, here it keeps url and description of the url instead of notes.

It is build using following:

- NextJs
- Next Auth
- TypeScript
- TailwindCSS
- DaisyUI
- PostgreSQL
- PgCore
- Drizzle
- [IconPacks.net](https://iconpacks.net/)
- Docker

### How to run

- Clone the repo
- Setup the postgres database
- Get OAuth credentials from Github
- Add these credentials to `.env.local` file
  - `GITHUB_ID`
  - `GITHUB_SECRET`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - `DATABASE_URL`
- Run `npm install`
- Run `npm run dev`
- Open `http://localhost:3000` in browser
- Run this command to setup database
  - `curl -X GET http://localhost:3000/api/db`

### How to contribute

- Fork the repo
- Clone the repo
- Create a new branch
- Make changes
- Push the changes
- Create a PR

### What can be improved or added (If by any chance someone is interested in contributing)

- There are a lot of TODOs and few bugs in the code
- Try to make the UI better
- Add any other feature you want
- Add pagination
- Add reordering of posts and topics
- Add search
- Add notes feature as well which will be different from links
- Add docker file for auto-setup
