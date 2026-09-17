# The new CivicDataLab website
![website-video](https://user-images.githubusercontent.com/7601150/135970492-6346bb9a-7142-40e4-a31e-79230358e59d.gif)

## About Us!

We are a research lab working with the goal of using data, tech, design and social science to strengthen the course of civic engagements in India. We work to harness the potential of open-source movement  to enable citizens  to engage better with public reforms. We aim to grow data and tech capacity of governments, nonprofits, think-tanks, media houses, universities etc to enable data-driven decision making at scale.

## Background

#### Challenges w/ the Old Website
- Single landing page, with limited information around the work we do and the solutions we build.
- Someone with no prior knowledge of CivicDataLab can guage very little about our work and offerings.
- Lack of brand identity, only the company logo was accessible with limited information on our background and values.
- Our Bandhus didn't have a place to express themselves and showcase their work on the website.

#### How does `v2.0` of the website solve this?

- Multiple pages dedicated to different aspects or our offerings and work with a sector level classification.
- An about page explaining our approach the the work bringing in the 4 pillars; data, tech, desing and social science.
- Project level pages to share all the resources and context for individual projects.
- Individual pages for each Bandhu where they can highlight their work, favourite quotes and select accent colours.


## Architecture/Tech Stack

🖼️ Framework: [Gatsby](https://www.gatsbyjs.com/)

🎨 Styling: [styled-components](https://styled-components.com/)

✏️ Content source: markdown files inside the `content` folder

📊 Analytics: [Google](https://analytics.google.com/)

## Run it locally

Prerequisites: NodeJS must be installed on your machine.

1. Clone this repo.
2. Run `npm start` command inside the root folder of the project.
3. To build the website, run `npm run build`.
4. To run the local build, run the following command: `npm run serve`.

## Content Management (CMS)

Non-technical editors can update site content (team, alumni, partners, projects, events, openings) through a browser UI at `/admin/` instead of editing markdown by hand, powered by [Decap CMS](https://decapcms.org/) reading `static/admin/config.yml`.

**In production:** visit `https://civicdatalab.in/admin/`, sign in with your **CivicDataLab Keycloak account** — the same one you use for other CDL products, no GitHub account needed — then edit an entry and save. With `editorial_workflow` on, saving opens a PR against `main` for a reviewer to check before it goes live.

Sign-in and all GitHub access go through [`cms-auth-proxy`](cms-auth-proxy/) at `cms-auth.civicdatalab.in`, which verifies your Keycloak token and commits on your behalf using a GitHub App. See `cms-keycloak-design.md` for the architecture.

**Local development.** The CMS talks to `cms-auth-proxy` in every environment, including localhost — there is no separate offline mode. The committed `config.yml` points at production, so switch it over first:

```bash
npm run cms:local      # point config.yml at a locally-run proxy
npm run develop        # site on :8000  (proxy: cd cms-auth-proxy && npm start)
npm run cms:prod       # ALWAYS restore before committing
npm run cms:status     # which mode am I in?
```

`cms:local` reads the repo and URL from `cms-auth-proxy/.env`, so `base_url` cannot drift from the proxy's `PUBLIC_URL` — a mismatch there makes the login hang silently. Full walkthrough in [`cms-auth-proxy/README.md`](cms-auth-proxy/README.md) under *Testing*.

> Decap's `local_backend` option is deliberately **not** used. On localhost it makes Decap prefer its own git proxy and skip `cms-auth-proxy` entirely — so a local test would silently exercise none of the real auth path. Editing markdown directly in the `content/` folder covers the offline case it was there for.

See `cms-strategy.md` for the overall plan and `cms-keycloak-design.md` for the authentication architecture.

## Wiki
You can find guides on how to add/update project and bandhu level info [here](https://github.com/CivicDataLab/civicdatalab.github.io/wiki).

## License

The code is licensed under [MIT License](https://mit-license.org/) while the contents inside the `content` folder are licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
