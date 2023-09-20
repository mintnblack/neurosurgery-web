import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js";

const fetchAllVideoLectures = async () => {
  const videoLectureContainer = document.getElementById(
    "videoLectureContainer"
  );

  const response = await fetch(`${BASE_URL}/video/`);
  const data = await response.json();
  const videoLectureData = data.data;
  console.log("videoLectureData : ", videoLectureData);
  let videoLectureHtml = "";

  videoLectureData.forEach((videos) => {
    const date = formatDateToDDMMYY(videos.updated);
    videoLectureHtml += `
        <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="post-item" style="background-color: rgba(252, 247, 247, 0.2)">
          <div class="post__img">
            <a href="blog-single-post.html">
            <video width="100%" height="auto" controls>
            <source src=${videos.url} type="video/mp4">
            Your browser does not support the video tag.
        </video>
            </a>
          </div><!-- /.post__img -->
          <div class="post__body">
            <div class="post__meta-cat">
              <a href="#">${videos.category}</a>
            </div><!-- /.blog-meta-cat -->
            <div class="post__meta d-flex">
              <span class="post__meta-date">${date.monthNameShort} ${date.day}, ${date.year}</span>
            </div>
            <h4 class="post__title"><a href="#">${videos.title}</a></h4>
            <p class="post__desc">${videos.desc}</p>
          </div><!-- /.post__body -->
        </div><!-- /.post-item -->
      </div><!-- /.col-lg-4 -->
        `;
  });

  videoLectureContainer.innerHTML = videoLectureHtml;
};

fetchAllVideoLectures();
