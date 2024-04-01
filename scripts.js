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
          <div class="slick-slide">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${item.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">${item.text}</p>
                  <h4 class="text-white font-weight-bold">${item.name}</h4>
                  <span class="text-white">${item.title}</span>
                </div>
              </div>
            </div>
          </div>
        `;
        });

        $("#quotesCarousel").html(carouselHtml);
        // $(".carousel-item:first").addClass("active");

        $(".slick-carousel-quotes").slick({
          arrows: false
        });

        $(".slick-prev-quotes, .slick-next-quotes").click(function(e) {
          e.preventDefault();
        });

        $(".arrow-left-quotes").click(function() {
          $(".slick-carousel-quotes").slick("slickPrev");
        });

        $(".arrow-right-quotes").click(function() {
          $(".slick-carousel-quotes").slick("slickNext");
        });

        $(".slick-carousel-quotes").show();
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
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center zindex-1">
            <div class="card position-relative">
              <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail">
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
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
          </div>`;
        });

        $("#popularCarousel").html(carouselHtml);
        $(".slick-carousel-popular").slick({
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
        $(".arrow-left-popular, .arrow-right-popular").click(function(e) {
          e.preventDefault();
        });

        $(".slick-prev-popular").click(function() {
          $(".slick-carousel-popular").slick("slickPrev");
        });

        $(".slick-next-popular").click(function() {
          $(".slick-carousel-popular").slick("slickNext");
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
