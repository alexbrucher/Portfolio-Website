(function () {
  const projects = window.portfolioProjects || [];
  const grid = document.getElementById('project-grid');

  if (grid) {
    grid.innerHTML = projects.map((project, index) => {
      const firstProjectImage = Array.isArray(project.images) && project.images.find((item) => item.src);
      const projectImage = firstProjectImage ? firstProjectImage.src : project.image;
      return `
      <a class="project-card" href="project.html?project=${project.slug}">
        <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
        <div class="project-card-visual${projectImage ? ' has-image' : ''}" aria-hidden="true">${projectImage ? `<img src="${projectImage}" alt="" />` : `<span>Project image<br />placeholder</span>`}</div>
        <div class="project-card-main"><p>${project.category}</p><h2>${project.title}</h2><span>${project.client}</span></div>
        <div class="project-card-end"><span>${project.date}</span><b aria-hidden="true">↗</b></div>
      </a>`;
    }).join('');
  }

  const root = document.querySelector('.project-page');
  if (root) {
    const slug = new URLSearchParams(window.location.search).get('project');
    const project = projects.find((item) => item.slug === slug) || projects[0];
    document.title = `${project.title} | Alex Brucher`;
    const images = Array.isArray(project.images) && project.images.length
      ? project.images.filter((item) => item.src)
      : project.image
        ? [{ src: project.image, caption: project.imageCaption, alt: project.title }]
        : [];
    const renderProjectSection = (label, lead, body) => lead
      ? `<section><p class="label">${label}</p><p class="project-copy"><strong>${lead}</strong>${body ? `<span>${body}</span>` : ''}</p></section>`
      : '';
    const renderSkills = (skills) => Array.isArray(skills) && skills.length
      ? `<section><p class="label">Skills used</p><ul class="skills-list">${skills.map((skill) => `<li>${skill}</li>`).join('')}</ul></section>`
      : '';
    const interactiveCadCaption = 'Interactive cad render';
    const modelCaption = project.modelLabel || interactiveCadCaption;
    const cadMedia = project.model
      ? `<div class="model-panel"><div class="model-toolbar"><span>${interactiveCadCaption}</span><span>Drag to rotate · scroll to zoom</span></div><model-viewer src="${project.model}"${project.modelOrientation ? ` orientation="${project.modelOrientation}"` : ''} alt="${modelCaption}" camera-controls auto-rotate rotation-per-second="18deg" shadow-intensity=".35" exposure=".9" interaction-prompt="auto"><div slot="poster" class="model-loading">Loading CAD model...</div></model-viewer><p class="media-caption">${modelCaption}</p></div>`
      : `<div class="model-panel image-placeholder"><span>CAD render placeholder</span><small>Add a model or render in content/projects.js</small><p class="media-caption">${interactiveCadCaption}</p></div>`;
    const projectMedia = images.length
      ? images.length > 1
        ? `<div class="project-image image-carousel" data-carousel><div class="carousel-track">${images.map((item) => `<figure><img src="${item.src}" alt="${item.alt || project.title}" /><figcaption>${item.caption || ''}</figcaption></figure>`).join('')}</div><div class="carousel-controls"><button type="button" data-carousel-prev aria-label="Previous project image">←</button><span data-carousel-count>1 / ${images.length}</span><button type="button" data-carousel-next aria-label="Next project image">→</button></div></div>`
        : `<figure class="project-image"><img src="${images[0].src}" alt="${images[0].alt || project.title}" /><figcaption>${images[0].caption || ''}</figcaption></figure>`
      : `<figure class="project-image image-placeholder"><span>Project image placeholder</span><small>Add an image in content/projects.js</small><figcaption>${project.imageCaption || ''}</figcaption></figure>`;
    const media = project.model
      ? `<section class="media-stage" aria-label="Project media">${cadMedia}${projectMedia}</section>`
      : `<section class="media-stage media-stage-single" aria-label="Project image">${projectMedia}</section>`;
    root.innerHTML = `
      <a class="back-link" href="index.html#projects">← All projects</a>
      <header class="project-header"><div><p class="label">${project.category}</p><h1>${project.title}</h1></div><dl><div><dt>Organization</dt><dd>${project.client}</dd></div><div><dt>Year</dt><dd>${project.date}</dd></div></dl></header>
      ${media}
      <div class="project-template">
        ${renderProjectSection('Project overview', project.overviewLead, project.overview)}
        ${renderProjectSection('My role', project.roleLead, project.role)}
        ${renderSkills(project.skills)}
        ${renderProjectSection('Outcomes', project.outcomesLead, project.outcomes)}
      </div>
      <p class="editor-note">Edit this project in <code>content/projects.js</code>. The full how-to is in <code>README.md</code>.</p>`;
    root.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const count = carousel.querySelector('[data-carousel-count]');
      const total = images.length;
      let current = 0;
      const updateCarousel = (nextIndex) => {
        current = (nextIndex + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        count.textContent = `${current + 1} / ${total}`;
      };
      carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => updateCarousel(current - 1));
      carousel.querySelector('[data-carousel-next]').addEventListener('click', () => updateCarousel(current + 1));
    });
  }

  document.querySelectorAll('#year').forEach((item) => item.textContent = new Date().getFullYear());
})();
