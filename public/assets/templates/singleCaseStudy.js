
import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js"

const params = new URLSearchParams(window.location.search);
const caseId = params.get("caseId");

const fetchSingleBlog = async () => {
    const response = await fetch(`${BASE_URL}/case/${caseId}`);
    const data = await response.json();
    const singleBlogData = data.data;
    console.log(singleBlogData)
    const date = formatDateToDDMMYY(singleBlogData.updated);
    console.log(date);
    document.getElementById('breadcrumbTitle').innerHTML = singleBlogData.title;
    document.getElementById('blogImage').src = singleBlogData.image;
    document.getElementById('postDate').innerHTML = `${date.monthNameShort} ${date.day}, ${date.year}`;
    document.getElementById('postAuthor').innerHTML = singleBlogData.author;
    document.getElementById('postTitle').innerHTML = singleBlogData.title;
    document.getElementById('postDescription').innerHTML = singleBlogData.html;
};

fetchSingleBlog();