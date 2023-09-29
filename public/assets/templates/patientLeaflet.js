
import { BASE_URL } from "../utils/applicationConstants.js";
import { formatDateToDDMMYY } from "../utils/functions/dateFormatter.js";

const fetchAllPatientLeaflets = async () => {

    const patientLeafletContainer = document.getElementById('patientLeafletContainer');

    const response = await fetch(`${BASE_URL}/case/`);
    const data = await response.json();
    const patientLeafletData = data.data;

    let caseStudyHtml = "";

    patientLeafletData.forEach(caseStudy => {
      const date = formatDateToDDMMYY(caseStudy.updated);
        caseStudyHtml += `
        <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="post-item" style="background-color: rgba(252, 247, 247, 0.6)">
          <div class="post__img">
            <a href="case-study-single.html?caseId=${caseStudy.id}">
              <img src="assets/images/blog/grid/1.jpg" alt="post image" loading="lazy">
            </a>
          </div><!-- /.post__img -->
          <div class="post__body">
            <div class="post__meta-cat">
              <a href="#">${caseStudy.category}</a>
            </div><!-- /.blog-meta-cat -->
            <div class="post__meta d-flex">
              <span class="post__meta-date">${date.monthNameShort} ${date.day}, ${date.year}</span>
              <a class="post__meta-author" href="#">${caseStudy.author}</a>
            </div>
            <h4 class="post__title"><a href="#">${caseStudy.title}</a></h4>

            <p class="post__desc">${caseStudy.desc}</p>
            <a href="case-study-single.html?caseId=${caseStudy.id}" class="btn btn__secondary btn__link btn__rounded">
              <span>Read More</span>
              <i class="icon-arrow-right"></i>
            </a>
          </div><!-- /.post__body -->
        </div><!-- /.post-item -->
      </div><!-- /.col-lg-4 -->
        `;
        console.log("caseStudy : ",caseStudy)
        
    });

    patientLeafletContainer.innerHTML = caseStudyHtml;

};

fetchAllPatientLeaflets();