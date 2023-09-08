import { BASE_URL } from "../utils/applicationConstants.js";

const fetchAllBlogs = async () => {

    const blogScrollContainer = document.getElementById('blogScrollContainer');

    const response = await fetch(`${BASE_URL}/blog/1000/1`);
    const data = await response.json();
    const blogData = data.data;

    let blogHtml = "";

    console.log(data)
    blogData.forEach(blog => {
        console.log(blog)
        blogHtml += `

        <div class="blog-container-card">
              <div class="post-item blog-container-card-item">
                <div class="post__img" style="width: 100%;">
                  <a href="blog-single-post.html?blogId=${blog.id}">
                    <img src=${blog.image} alt="post image" loading="lazy">
                  </a>
                </div><!-- /.post__img -->
                <div class="post__body">
                  <div class="post__meta-cat">
                    <a href="#">Mental Health</a>
                  </div><!-- /.blog-meta-cat -->
                  <div class="post__meta d-flex">
                    <span class="post__meta-date">Jan 30, 2022</span>
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

    blogScrollContainer.innerHTML = blogHtml;
};

fetchAllBlogs();