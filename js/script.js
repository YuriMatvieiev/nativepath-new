$(document).ready(function () {
  // === Render star ratings ===
  function renderStarRatings() {
    $(".js-stars").each(function () {
      const stars = parseFloat($(this).attr("data-stars"));
      if (isNaN(stars) || stars < 0 || stars > 5) return;

      const full = Math.floor(stars);
      const half = stars % 1 !== 0;
      const empty = 5 - full - (half ? 1 : 0);

      const fullIcon = '<i class="fa-sharp-duotone fa-thin fa-star-sharp"></i>';
      const halfIcon =
        '<i class="fa-sharp-duotone fa-thin fa-star-sharp-half-stroke"></i>';
      const emptyIcon = '<i class="fa-sharp fa-light fa-star-sharp"></i>';

      let html = fullIcon.repeat(full);
      if (half) html += halfIcon;
      html += emptyIcon.repeat(empty);

      $(this).html(html);
    });
  }

  try {
    renderStarRatings();
  } catch (err) {
    console.error("Error rendering star ratings:", err);
  }

  //====== Change in the number of customers ==================================================================================================================================================

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateCounters() {
    $(".js-counter-sold").each(function () {
      const $el = $(this);
      const currentText = $el.text();
      const numberMatch = currentText.match(/(\d+)/);

      if (numberMatch) {
        const currentNumber = parseInt(numberMatch[1], 10);
        const increment = getRandomInt(4, 16);
        const newNumber = currentNumber + increment;

        const newText = currentText.replace(/\d+/, newNumber);

        $el.animate({ opacity: 0 }, 200, function () {
          $el.text(newText).animate({ opacity: 1 }, 800);
        });
      }
    });

    const nextInterval = getRandomInt(5000, 15000);
    setTimeout(updateCounters, nextInterval);
  }

  $(document).ready(function () {
    setTimeout(updateCounters, getRandomInt(5000, 15000));
  });

  //====== price toggle ==================================================================================================================================================

  $(document).ready(function () {
    const $toggle = $(".js-billing-switcher");
    const $labels = $(".js-billing-label");

    if ($toggle.length === 0) return;

    $labels.on("click", function () {
      const value = $(this).data("value");
      const isDiscounted = value === "on";
      $toggle.prop("checked", isDiscounted);
      $toggle.trigger("change");
    });

    $toggle.on("change", function () {
      if ($(this).is(":checked")) {
        console.log("discounted prices");
      } else {
        console.log("subscribe");
      }
    });
  });

  //====== Fixed section visibility ==================================================================================================================================================

  const $fixedSection = $(".js-fixed-section");
  const $showButton = $(".js-show-button");
  const $hideButton = $(".js-hide-button");

  // Initially hide the fixed section
  $fixedSection.hide();

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const showButtonTop = $showButton.offset().top;
    const hideButtonTop = $hideButton.offset().top;

    // Show fixed section only between show and hide buttons
    if (scrollTop >= showButtonTop && scrollTop <= hideButtonTop) {
      $fixedSection.fadeIn();
    } else {
      $fixedSection.fadeOut();
    }
  });
});
