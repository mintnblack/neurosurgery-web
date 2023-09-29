import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js";

const fetchAllBlogs = async () => {

    const blogContainer = document.getElementById('blogContainer');

    const response = await fetch(`${BASE_URL}/blog/`);
    const data = await response.json();
    const blogData = data.data;
    let blogHtml = "";

    blogData.forEach(blog => {
      const date = formatDateToDDMMYY(blog.updated);
        blogHtml += `
        <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="post-item" style="background-color: rgba(252, 247, 247, 0.6)">
          <div class="post__img">
            <a href="blog-single-post.html?blogId=${blog.id}">
              <img src="assets/images/blog/grid/1.jpg" alt="post image" loading="lazy">
            </a>
          </div><!-- /.post__img -->
          <div class="post__body">
            <div class="post__meta-cat">
              <a href="#">${blog.category}</a>
            </div><!-- /.blog-meta-cat -->
            <div class="post__meta d-flex">
              <span class="post__meta-date">${date.monthNameShort} ${date.day}, ${date.year}</span>
              <a class="post__meta-author" href="#">${blog.author}</a>
            </div>
            <h4 class="post__title"><a href="#">${blog.title}</a></h4>

            <p class="post__desc">${blog.desc}</p>
            <a href="blog-single-post.html?blogId=${blog.id}" class="btn btn__secondary btn__link btn__rounded">
              <span>Read More</span>
              <i class="icon-arrow-right"></i>
            </a>
          </div><!-- /.post__body -->
        </div><!-- /.post-item -->
      </div><!-- /.col-lg-4 -->
        `;
    });

    blogContainer.innerHTML = blogHtml;
};

fetchAllBlogs();