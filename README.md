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
2. Run `npm install --legacy-peer-deps` to install dependencies.
3. Run `npm start` to start the development server at `http://localhost:8000`.
4. To build the website, run `npm run build`.
5. To run the local build, run the following command: `npm run serve`.

## Content Management (Decap CMS)

The website uses [Decap CMS](https://decapcms.org/) for managing content through a UI without editing markdown files directly.

### Running the CMS locally

1. Start the Gatsby dev server: `npm start`
2. In a separate terminal, start the Decap proxy server: `npx decap-server`
3. Open `http://localhost:8000/admin/index.html` in your browser
4. Click **Login** — no GitHub auth needed locally, it connects directly to your local files

### Accessing the CMS in production

Visit `https://civicdatalab.in/admin/` and log in with your GitHub account.

> You must have **Write** access to the `CivicDataLab/civicdatalab.github.io` repo to save content.

### Giving someone CMS access

1. Go to the repo on GitHub → **Settings → Collaborators and teams**
2. Add the person's GitHub account with **Write** access
3. They can now log into the CMS using their GitHub account

### Setting up the GitHub OAuth App (one-time, for production)

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
2. Set **Homepage URL** to `https://civicdatalab.in`
3. Set **Authorization callback URL** to `https://civicdatalab.in/admin/`
4. Copy the **Client ID** and update `app_id` in `static/admin/config.yml`

### CMS collections available

| Collection | Content folder |
|---|---|
| Team Members | `content/team/` |
| Alumni | `content/alumnus/` |
| Work (by sector) | `content/work/` |
| Events | `content/events/` |
| Job Openings | `content/openings/` |
| Values | `content/values/` |
| Project Partners | `content/projectpart/` |

## Wiki
You can find guides on how to add/update project and bandhu level info [here](https://github.com/CivicDataLab/civicdatalab.github.io/wiki).

## License

The code is licensed under [MIT License](https://mit-license.org/) while the contents inside the `content` folder are licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
