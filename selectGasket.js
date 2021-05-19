$(document).ready(function () {
  let current_fs, next_fs, previous_fs; //fieldsets
  let opacity;
  let current = 1;
  let steps = 3;

  setProgressBar(current);

  $(".from-gasket").click(function () {
    current = 2;
    setProgressBar(current);
    $("#myModal").on("show.bs.modal", function (e) {
      $(".step-count").text("2");
      let stepOneDiv = $("div.fieldset.step-one");
      let stepTwoDiv = $("div.fieldset.step-two");
      stepOneDiv.css("opacity", 0);
      stepOneDiv.css("display", "none");
      stepTwoDiv.css("opacity", 100);
      stepTwoDiv.css("display", "flex");
    });
    $("#myModal").modal("toggle");
  });

  $(".from-map").click(function () {
    current = 1;
    setProgressBar(current);
    $("#myModal").on("show.bs.modal", function (e) {
      $(".step-count").text("1");
      let stepOneDiv = $("div.fieldset.step-one");
      let stepTwoDiv = $("div.fieldset.step-two");
      stepTwoDiv.css("opacity", 0);
      stepTwoDiv.css("display", "none");
      stepOneDiv.css("opacity", 100);
      stepOneDiv.css("display", "flex");
    });
    $("#myModal").modal("toggle");
  });

  $(".continue").click(function (e) {
    e.preventDefault();
    current_fs = $(this).parent().parent();
    next_fs = $(this).parent().parent().next();

    next_fs.show();

    $("h3.step-title").text(next_fs.data().title);
    $(".step-count").text(next_fs.data().step);

    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
  });

  $(".previous").click(function (e) {
    e.preventDefault();
    current_fs = $(this).parent().parent();
    previous_fs = $(this).parent().parent().prev();

    previous_fs.show();
    $("h3.step-title").text(previous_fs.data().title);
    $(".step-count").text(previous_fs.data().step);
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
  });

  $(".next-step").click(function (e) {
    e.preventDefault();
    current = current + 1;
    setProgressBar(current);
    current_fs = $(this).parent().parent();
    next_fs = current_fs.next();
  });

  $(".prev-step").click(function (e) {
    e.preventDefault();
    current = current - 1;
    setProgressBar(current);
  });

  $(".find-gasket-btn").click(function (e) {
    e.preventDefault();
    fetch("http://localhost:3000/gaskets")
      .then((res) => res.json())
      .then((gaskets) => formatGasketsTable(gaskets));
  });

  function setProgressBar(curStep) {
    curStep === 3
      ? $(".progress-bar").css("border-radius", "4px")
      : $(".progress-bar").css("border-radius", "4px 0px 0px 4px");
    let percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  function formatGasketsTable(gaskets) {
    let numEntries = gaskets.length;
    let pluralGask;
    let resultsText;
    numEntries == 1 ? (pluralGask = "gasket") : (pluralGask = "gaskets");

    resultsText = `${numEntries} ` + pluralGask + " found";

    $(".number-of-entries").text(resultsText);

    gaskets.forEach((gasket, index) => {
      console.log(index);
      let rowDiv = `<div class="row table-row" id=${"row-" + index}>`;
      let col1 = `<div class="form-check d-flex col align-items-center">
      <input name="selected-gasket" value="${gasket.id}" type="radio" id=${
        "gasket-" + gasket.id
      } /><label for="${"gasket-" + gasket.id}">${
        gasket.part_number
      }</label></div>`;
      let col2 = `<div class="col">${gasket.material}</div>`;
      let col3 = `<div class="col">${gasket.thickness}</div>`;
      let col4 = `<div class="col">Action</div>`;

      let newRow = rowDiv + col1 + col2 + col3 + col4 + "</div>";
      $(".table-container").append(newRow);
    });
    $(".table-section").show();
    $(".button-container").css("display", "flex");
  }
});
