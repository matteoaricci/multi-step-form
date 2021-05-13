$(document).ready(function () {
  let current_fs, next_fs, previous_fs; //fieldsets
  let opacity;
  let current = 1;
  let steps = 3;

  setProgressBar(current);

  $(".continue").click(function (e) {
    e.preventDefault();
    current_fs = $(this).parent().parent();
    next_fs = $(this).parent().parent().next();

    next_fs.show();

    $("h3.step-title").text(next_fs.data().title);

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

  function setProgressBar(curStep) {
    let percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  function changeTitleNext() {
    let newTitle;
    let currentTitle = $("h3.step-title").text();

    switch (currentTitle) {
      case "Select Gasket":
        newTitle = "Add configuration details";
        break;
      case "Add configuration details":
        newTitle = "Select torque values";
        break;
      case "Select torque values":
        newTitle = "Torque sheet printing options";
        break;
      default:
        break;
    }
    $("h3.step-title").text(newTitle);
  }

  function changeTitlePrev() {
    let newTitle;
    let currentTitle = $("h3.step-title").text();
    switch (currentTitle) {
      case "Add configuration details":
        newTitle = "Select Gasket";
        break;
      case "Select torque values":
        newTitle = "Add configuration details";
        break;
      case "Torque sheet printing options":
        newTitle = "Select torque values";
        break;
      default:
        break;
    }
    $("h3.step-title").text(newTitle);
  }
});
