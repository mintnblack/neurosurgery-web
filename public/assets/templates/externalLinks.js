import { BASE_URL } from "../utils/applicationConstants.js";

const fetchAllExternalLinks = async () => {
  const externalLinksContainer = document.getElementById(
    "externalLinksContainer"
  );

  const response = await fetch(`${BASE_URL}/external/`);
  const data = await response.json();
  const externallinksData = data.data;

  let externalLinksHtml = "";

  externallinksData.forEach((externallinks) => {
    externalLinksHtml += `
        <li>
        <div class="external-link">
          <a href=${externallinks.url}><h5>${externallinks.title}</h5></a>
        </div>
    </li>
        `;
  });

  externalLinksContainer.innerHTML = externalLinksHtml;
};

fetchAllExternalLinks();
