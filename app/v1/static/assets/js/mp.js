document.addEventListener("DOMContentLoaded", function() {
    const imap = document.querySelector(".map");
    const cic = document.querySelector(".cic");
    const cropChart = document.getElementById("crop-chart");
    const cancelButton = document.getElementById("cancelMapInfo");
    document.querySelector(".map").addEventListener("click", function(event) {
      if (event.target.classList.contains("land")) {
            imap.classList.toggle("d-none");
            cic.classList.toggle("d-none");
            cropChart.classList.toggle("d-none");
            cancelButton.classList.toggle("d-none");
            document.querySelector('#flag-img').classList.toggle("d-none");
      }
    });
    cancelButton.addEventListener("click", function () {
      imap.classList.toggle("d-none");
      cic.classList.toggle("d-none");
      cropChart.classList.toggle("d-none");
      cancelButton.classList.toggle("d-none");
      document.querySelector('#flag-img').classList.toggle("d-none");
    }); 
  });

  