'use strict';

const div = document.getElementById("api-users");
const ulElement = document.getElementById("ul-lists");
const btnLoad = document.getElementById("Load_More");
const btnloadprev = document.getElementById("Load_Prev");
let currentPage = 1;
let total_pages;

function AboutUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })

    .then(function (responsedata) {
      console.log(responsedata);
      const fragment = document.createDocumentFragment();
      responsedata.data.forEach((element) => {
        const li = document.createElement("li");
        li.textContent = `${element.first_name} ${element.last_name}`;
        const UsPic = document.createElement("img");
        UsPic.setAttribute("src", element.avatar);
        UsPic.setAttribute("alt", "face");
        li.appendChild(UsPic);
        fragment.appendChild(li);
      });
      ulElement.innerHTML = "";
      ulElement.appendChild(fragment);
      total_pages = responsedata.total_pages;
      if (currentPage === total_pages) {
        btnLoad.disabled = true;
      }

      if (currentPage === 1 ) {
        btnloadprev.disabled = true;
      } else  {
        btnloadprev.disabled = false;
      }
      
      if (currentPage ===2) {
        btnLoad.disabled=true;
      } else {
        btnLoad.disabled=false;
      }
   
    })

    .catch(function (error) {
      console.log(error);
      if (error == 404) {
        const errordescr = document.createElement("p");
        errordescr.textContent = "Page Not Found";
        div.appendChild(errordescr);
      } else if (error == 500) {
        const errordescr = document.createElement("p");
        errordescr.textContent = "Internal Server Error";
        div.appendChild(errordescr);
      }
    });
}
btnloadprev.addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage = currentPage - 1;
  AboutUsers(currentPage);
});
btnLoad.addEventListener("click", function () {
  if (currentPage === 2) {
    return;
  }
  currentPage = currentPage + 1;
  AboutUsers(currentPage);
});

AboutUsers(currentPage);
