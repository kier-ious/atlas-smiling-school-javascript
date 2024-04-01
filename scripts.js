$(document).ready(function() {
  function showLoader() {
    $(".loader").show();
  }

  function hideLoader() {
    $(".loader").hide();
  }

  function fetchCarouselData() {
    $.ajax({
      url:  "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();

        var carouselHtml = "";

        $.each(response, function(index, item) {
          console.log(item);
          carouselHtml += `
            <div class="carousel-item">
              <div class="row mx-auto align-items-center">
                <div class="">
                  <img src="${item.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
                </div>
                <div class="">
                  <div class="quote-text">
                    <p class="text-white text-wrap">${item.text}</p>
                    <h4 class="text-white font-weight-bold">${item.name}</h4>
                    <span class="text-white">${item.title}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        $(".carousel").html(carouselHtml);
        $(".carousel-item:first").addClass("active");

        $(".carousel").slick({
          arrows: false
        });

        $(".carousel-control-prev, .carousel-control-next").click(function(e) {
          e.preventDefault();
        });

        $(".arrow-left").click(function() {
          $(".carousel").slick("slickPrev");
        });

        $(".arrow-right").click(function() {
          $(".carousel").slick("slickNext");
        });

        $(".carousel").show();
      },
      error: function() {
        hideLoader();
        console.log("error getting api");
      }
    });
  }
  fetchCarouselData();



  // Popular Section
  function fetchPopularData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      beforeSend: function() {
          $(".loader").show();
      },
      success: function(data) {
        $(".loader").hide();
        var carouselHtml = "";

        $.each(data, function(index, item) {
          carouselHtml += `
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div class="card position-relative style="padding: 12.5px;">
              <div class="col-12">
                <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail">
                <div class="play-overlay position-absolutetranslate-middle">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center">
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${item.title}</h5>
                  <p class="card-text text-muted">${item['sub-title']}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${item.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                    <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="star-rating">
                      ${generateStarRating(item.star)}
                    </div>
                    <span class="main-color">${item.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        });

        $("#popularCarousel .carousel-inner").html(carouselHtml);
        $("#popularCarousel").slick({
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 1
        });
      },
      error: function() {
        $(".loader").hide();
        console.log("Error getting API data");
      }
    });
  }

  function generateStarRating(stars) {
    var starHtml = "<div class='star-rating'>";
    for (var i = 0; i < stars; i++) {
      starHtml += `<img src="images/star_on.png" alt="star on" width="15px">`;
    }
    for (var j = stars; j < 5; j++) {
      starHtml += `<img src="images/star_off.png" alt="star off" width="15px">`;
    }
    starHtml += "</div>";
    return starHtml;
  };

  fetchPopularData();
});
