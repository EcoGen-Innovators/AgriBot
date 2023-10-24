// document.addEventListener("DOMContentLoaded", function() {
//     const mapInfos = document.querySelector(".map-infos");
//     const imap = document.querySelector(".map");
//     const landImg = document.querySelector(".landImg");
//     document.querySelector(".map").addEventListener("click", function(event) {
//       if (event.target.classList.contains("land")) {
//         // mapInfos.classList.remove("d-none");
//         imap.classList.remove("d-none");
//         landImg.classList.toggle("d-none");
//         landImg.classList.add("exlandImg", "text-center");
//         setTimeout(function() {
//             landImg.classList.remove("exlandImg");            
//             landImg.classList.add("animate__animated", "animate__backInUp");            
//         }, 3000);
//         setTimeout(function() {
//             mapInfos.classList.toggle("d-none");
//         }, 5000);
//       }
//     });
//   });
  

// ****************************

document.addEventListener("DOMContentLoaded", function() {
    const imap = document.querySelector(".map");
    const cic = document.querySelector(".cic");
    document.querySelector(".map").addEventListener("click", function(event) {
      if (event.target.classList.contains("land")) {
            imap.classList.toggle("d-none");
            cic.classList.toggle("d-none");
      }
    });
  });