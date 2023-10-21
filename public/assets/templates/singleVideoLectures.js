import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js";
import { extractVideoId } from "../utils/functions/video.js";

const params = new URLSearchParams(window.location.search);
const videoId = params.get("videoId");

const fetchSingleBlog = async () => {
    const response = await fetch(`${BASE_URL}/video/${videoId}`);
    const data = await response.json();
    const singleVideoData = data.data;

    const date = formatDateToDDMMYY(singleVideoData.updated);
    const videoUrlId = extractVideoId(singleVideoData.url);

    document.getElementById('breadcrumbTitle').innerHTML = singleVideoData.title;
    document.getElementById("videoIframe").src = "https://www.youtube.com/embed/" + videoUrlId;
    document.getElementById('postDate').innerHTML = `${date.monthNameShort} ${date.day}, ${date.year}`;
    document.getElementById('postAuthor').innerHTML = "Ramesh Nair";
    document.getElementById('postTitle').innerHTML = singleVideoData.title;
    document.getElementById('postDescription').innerHTML = singleVideoData.desc;
   
};

fetchSingleBlog();