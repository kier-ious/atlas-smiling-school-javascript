// JavaScript for Web App

// Quotes Section

$(document).ready(function() {
  function showLoader() {
    $(".loader").show();
  }
  function hideLoader() {
    $(".loader").hide();
  }
  function fetchCarouselData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(data) {
        hideLoader();

        var carouselHtml = "";

        $.each(data, function(index, item) {
          carouselHtml += `
          <div class="carousel-item zindex-1">
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
          </div>`;
        });

        $(".carousel").html(carouselHtml);
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
        console.log("Error getting API data");
      }
    });
  }

fetchCarouselData();
});
