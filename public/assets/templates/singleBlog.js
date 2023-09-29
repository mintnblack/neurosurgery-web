
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
    document.getElementById('blogImage').src = singleBlogData.image;
    document.getElementById('postDate').innerHTML = `${date.monthNameShort} ${date.day}, ${date.year}`;
    document.getElementById('postAuthor').innerHTML = singleBlogData.author;
    document.getElementById('postTitle').innerHTML = singleBlogData.title;
    document.getElementById('postDescription').innerHTML = singleBlogData.html;
    const postTags = document.getElementById('postTags');
    let tagInnerHtml = '';
    singleBlogData.tags.forEach(tag => {
        tagInnerHtml += `<span class="blog_tag_item">${tag}</span>`;
    });
    postTags.innerHTML = tagInnerHtml;
};

fetchSingleBlog();