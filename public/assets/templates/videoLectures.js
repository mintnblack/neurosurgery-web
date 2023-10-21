import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js";
import { extractVideoId } from "../utils/functions/video.js";

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
    const videoId = extractVideoId(videos.url);
    videoLectureHtml += `
        <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="post-item" style="background-color: rgba(252, 247, 247, 0.6)">
          <div class="post__img">
              <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg"/>
          </div><!-- /.post__img -->
          <div class="post__body">
            <div class="post__meta-cat">
              <a href="#">${videos.category}</a>
            </div><!-- /.blog-meta-cat -->
            <div class="post__meta d-flex">
              <span class="post__meta-date">${date.monthNameShort} ${date.day}, ${date.year}</span>
            </div>
            <h4 class="post__title"><a href="#">${videos.title}</a></h4>
            <p class="post__desc postDescription">${videos.desc}</p>
          </div><!-- /.post__body -->
        </div><!-- /.post-item -->
      </div><!-- /.col-lg-4 -->
        `;
  });

  videoLectureContainer.innerHTML = videoLectureHtml;
};

fetchAllVideoLectures();
