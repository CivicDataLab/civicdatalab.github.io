# The new CivicDataLab website

## Architecture/Tech Stack

🖼️ Framework: [Gatsby](https://www.gatsbyjs.com/)

🎨 Styling: [styled-components](https://styled-components.com/)

✏️ Content source: markdown files inside the `content` folder

📊 Analytics: [Plausible](https://plausible.io/)

## Run it locally

Prerequisites: NodeJS must be installed on your machine.
1. Clone this repo.
2. Run `npm start` command inside the root folder of the project.
3. To build the website, run `npm run build`.
4. To run the local build, run the following command: `npm run serve`.

## Adding/Updating content

### How to add a bandhu
1. Create a new branch.
2. Navigate to `content/team` folder.
3. Create a new folder with the bandhu's first name in lowercase. Include the last name if there's another bandhu with the same first name.
4. Create an index.md file inside the folder and the details like in the below template:
```
---
name: 
role:
description: 
quote:
medium:
github:
twitter: 
linkedin:
behance:
image: image.jpg
sectors: Sector 1, Sector 2
projects: Project 1, Project 2
---
```
5. If the description has more than one paragraph, add it is raw text below the metadata of the `index.md` file.
```
---
name: 
role:
description: 
quote:
medium:
github:
twitter: 
linkedin:
behance:
image: image.jpg
sectors: Sector 1, Sector 2
projects: Project 1, Project 2
---

Paragraph 1 of the bandhu's description.

This is paragraph 2.
```
6. Follow the same pattern for updating an existing bandhu's details.
7. Create a pull request when you are done.


### How to add a sector
1. Create a new branch.
2. Navigate to `content/work/` folder.
3. Create a new folder with the sector's name in lowercase and without spaces.
4. Create an `index.md` file inside the folder and add the details like in the below template:
```
---
name:
description:
image: ./image.jpg
color: '#FBC740'
type: sector
projects: Project 1, Project 2
events:
  - {
      url: '',
      title: '',
      project: '',
      type: ''
    }
  - {
    url: '',
    title: '',
    project: '',
    type: ''
  }
---

```
5. The sector's image must be inside the same folder and its name should match what's written in the `index.md` file's metadata.
6. To update an existing sector, simply edit the metadata of its `index.md` file.
7. Create a pull request with your changes.

### How to add a project
1. Create a new branch.
2. Navigate to `content/work/sectorone` folder, where `sectorone` is the name of the sector to which the project belongs.
3. Create a new folder with the project's name in lowercase and without spaces.
4. Create an `index.md` file inside the folder and add the details like in the below template:
```
---
name:
image: ./image.jpg
summary: A 1-2 lines summary here.
context:
solution:
aim:
url:
twitter:
linkedin:
github:
newsletter:
sector: Sector 1
type: project
resources:
  - {
      link: '',
      title: '',
      type: ''
    }
  - {
    link: '',
    title: '',
    type: ''
  }
---

```
5. The project's image must be inside the same folder and its name should match what's written in the `index.md` file's metadata.
6. To update an existing project, simply edit the metadata of its `index.md` file.
7. Create a pull request with your changes.

### How to add a job opening
1. Create a new branch.
2. Navigate to `content/openings` folder.
3. Create a markdown file with its name as the title of the job in lowercase.
4. Add a url where the job post is listed and the proper title of the job inside the markdown file created in the previous step.
```
---
title: Front-end Engineer
url: https://angel.co/company/civicdatalab/jobs/1279092-front-end-engineer
---
```
5. Create a pull request with the changes.
