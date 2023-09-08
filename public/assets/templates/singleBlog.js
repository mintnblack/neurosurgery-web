
import { BASE_URL } from "../utils/applicationConstants.js";

const params = new URLSearchParams(window.location.search);
const blogId = params.get("blogId");

console.log(blogId)

const fetchSingleBlog = async () => {
    const response = await fetch(`${BASE_URL}/blog/${blogId}`);
    const data = await response.json();
    const singleBlogData = data.data;
    console.log(singleBlogData)

    document.getElementById('postDescription').innerHTML = singleBlogData.html;

};

fetchSingleBlog();