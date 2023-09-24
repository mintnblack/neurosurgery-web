
import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js"

const params = new URLSearchParams(window.location.search);
const blogId = params.get("blogId");

const fetchSingleBlog = async () => {
    const response = await fetch(`${BASE_URL}/blog/${blogId}`);
    const data = await response.json();
    const singleBlogData = data.data;
    console.log(singleBlogData)
    const date = formatDateToDDMMYY(singleBlogData.updated);
    console.log(date)
    document.getElementById('postDate').innerHTML = `${date.monthNameShort} ${date.day}, ${date.year}`;
    document.getElementById('postDescription').innerHTML = singleBlogData.html;
    document.getElementById('postAuthor').innerHTML = singleBlogData.author;
    document.getElementById('postTitle').innerHTML = singleBlogData.title;
    const postTags = document.getElementById('postTags');
    let tagInnerHtml = '';
    singleBlogData.tags.forEach(tag => {
        tagInnerHtml += `<li><a href="#">${tag}</a></li>`
    });
    postTags.innerHTML = tagInnerHtml;
};

fetchSingleBlog();