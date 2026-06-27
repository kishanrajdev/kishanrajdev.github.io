// Load and render portfolio data from JSON
fetch('data.json')
  .then(res => res.json())
  .then(data => {

    /* =====================
       Profile Section
    ===================== */
    profileImg.src = data.personal.profileImage;
    profileImg.alt = data.personal.name;
    profileName.textContent = data.personal.name;
    profileTitle.textContent = data.personal.title;
    profileBio.textContent = data.personal.bio;

    const profileLinksContainer = document.getElementById('profileLinks');
    profileLinksContainer.innerHTML = '';

    for (const link of Object.values(data.personal.links)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'button';
      a.textContent = link.label;
      li.appendChild(a);
      profileLinksContainer.appendChild(li);
    }

    /* =====================
       Research Section
    ===================== */
    researchIntro.textContent = data.research.intro;
    researchAreas.className = 'research-areas';
    researchAreas.innerHTML = '';

    data.research.areas.forEach((area, i) => {
      const div = document.createElement('div');
      div.className = 'research-area';
      if (i < data.research.areas.length - 1) {
        div.classList.add('with-border');
      }

      const title = document.createElement('h3');
      title.textContent = area.title;

      const description = document.createElement('p');
      const urlPattern = /(https?:\/\/[^\s)]+)([.)]?)?/g;
      let lastIndex = 0;
      let match;

      while ((match = urlPattern.exec(area.description)) !== null) {
        const [fullMatch, url, trailingPunctuation = ''] = match;
        const startIndex = match.index;

        if (startIndex > lastIndex) {
          description.appendChild(
            document.createTextNode(area.description.slice(lastIndex, startIndex))
          );
        }

        const link = document.createElement('a');
        link.href = url;
        link.textContent = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        description.appendChild(link);

        if (trailingPunctuation) {
          description.appendChild(document.createTextNode(trailingPunctuation));
        }

        lastIndex = startIndex + fullMatch.length;
      }

      if (lastIndex < area.description.length) {
        description.appendChild(
          document.createTextNode(area.description.slice(lastIndex))
        );
      }

      div.appendChild(title);
      div.appendChild(description);

      researchAreas.appendChild(div);
    });

    /* =====================
       Experience Section
    ===================== */
    experienceContainer.innerHTML = '';

    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    const line = document.createElement('div');
    line.className = 'timeline-line';
    timeline.appendChild(line);

    data.experience.forEach((exp, i) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      if (i === data.experience.length - 1) {
        item.classList.add('last');
      }

      item.innerHTML = `
        <div class="timeline-circle">
          <i class="fas fa-laptop-code timeline-icon"></i>
        </div>

        <div class="timeline-content">
          <div class="timeline-header">
            <h3>${exp.title}</h3>
            <span>${exp.period}</span>
          </div>
          <p class="timeline-company">${exp.company}</p>
          <p class="timeline-description">${exp.description}</p>
        </div>
      `;

      timeline.appendChild(item);
    });

    experienceContainer.appendChild(timeline);

    /* =====================
       Footer
    ===================== */
    copyrightText.textContent =
      `© ${data.footer.copyright}. All rights reserved.`;
  })
  .catch(console.error);
