# Alex Brucher Portfolio

A plain HTML, CSS, and JavaScript portfolio. It has no build step and can be opened directly in a browser or edited in VS Code.

## Start locally

1. Open this folder in VS Code.
2. Install the **Live Server** extension if you want instant browser refreshes.
3. Right-click `index.html` and choose **Open with Live Server**. Opening the file directly also works.

## Edit the portfolio

Most project edits happen in [`content/projects.js`](content/projects.js). Each project is one clearly labeled object. The pages intentionally contain only placeholders so you can add your own words.

### Add a project

1. In `content/projects.js`, copy one project object (from `{` through its matching `}`) and paste it before the closing `];`.
2. Give it a unique lowercase `slug`, such as `solar-charger`.
3. Update the title, organization, category, and date.
4. The new card will automatically link to `project.html?project=solar-charger`.

## Add project images

The current project visuals are intentionally neutral placeholders. They keep the layout clean until you choose the right photos or renders.

1. Create an `images` folder inside `assets`.
2. Put an image in it, using a simple filename such as `cookstove-test.jpg`.
3. Open `content/projects.js` and set the project's `image` value to `assets/images/cookstove-test.jpg`.
4. Update `imageCaption` with a short description of what the image shows.
5. The image will replace the placeholder on the home page and the project page. Leave `image: ""` until you have an approved image.

For best results, use landscape images at least 1600px wide. Keep only images and information you have permission to share.

## Add interactive CAD

The perfusion-system page includes your `Organ Rack V1.1` model as a real interactive CAD model in `assets/models`. Open **Organ Perfusion System** from the home page, then drag to rotate and scroll to zoom.

To add another model later, convert your STL to `.glb` (Blender can do this) and add `model: "assets/models/your-model.glb"` plus `modelLabel: "Your model name"` to the right project in `content/projects.js`.

## Write project content

1. Open the relevant object in `content/projects.js`.
2. Replace each section's lead and supporting text: `overviewLead` + `overview`, `roleLead` + `role`, and `outcomesLead` + `outcomes`.
3. Update `skills` with an array of the skills used on the project, such as `skills: ["CAD modeling", "Prototype testing"]`.
4. Keep each section concise and specific: explain the problem, your contribution, evidence of the result, and the tools or tests that got you there.
5. Update the project's title, organization, category, date, image, and model in the same object when those details change.

## Add project media

Each project object also controls the media stage at the top of its page:

- `model`: path to a `.glb` CAD model. Use an empty string when there is no model.
- `modelOrientation`: optional initial model rotation, written as three degrees values for the x, y, and z axes.
- `image`: path to the project image.
- `imageCaption`: caption shown below the project image or placeholder.
- `images`: optional array of `{ src, caption, alt }` objects for multiple top-of-page images. One image fills the image stage; two or more become a carousel.
- `date`: the project date shown as a month and year, or a month-year range when the project spans multiple months.
- A project with no CAD model and one image uses a full-width image stage. A project with a CAD model uses a half-width image stage alongside the CAD viewer.

When a project has both `model` and one or more `images`, the CAD viewer and image stage each occupy half of the media area. The `images` array takes precedence over the older single `image` field. The old `mediaLayout` field is no longer needed.

Each lead is shown on its own bold line above the supporting text. Leave a lead field blank (`""`) to remove that section from the project page.

## Personal details

- `about.html`: personal story, photo, location, and current-status placeholders.
- `contact.html`: email, LinkedIn, and availability copy.
- `index.html`: headline and homepage introduction.

## Publish free later

This structure works well with GitHub Pages, Netlify, or Vercel. GitHub Pages is a particularly simple free choice for a static portfolio once the folder is in a GitHub repository.

For GitHub Pages, open the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. Because this site has no build step, the existing HTML, CSS, JavaScript, images, and models publish directly.

## Design choices

The site uses a minimal engineering-portfolio direction: midnight blue panels, high-contrast cobalt, cyan CAD highlights, and signal-orange accents. Motion is limited to small navigation and card interactions.
