document.addEventListener("DOMContentLoaded",() =>{
  let userName = document.getElementById("userName");
let userId = document.getElementById("userId");
let userNum = document.getElementById("userNum");
let n = false;
let e = false;
let no = false;
//append error text
let errName = document.getElementById("errName");
let errId = document.getElementById("errId");
let errNumber = document.getElementById("errNumber");

userName.addEventListener("input", () => {
  let reg = /^[a-zA-Z]{3,}\ ?[a-zA-Z]*$/g;
  if (userName.value.trim() == "") {
    errName.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Name cannot be empty!`;
    userName.style.borderColor = `red`;
    errName.style.color = "red";
    userName.style.outlineColor = "#DE0F0F45";
    n = false;
    validAll();
  } else if (userName.value.length < 3) {
    errName.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Name must be greater than or equal of 3`;
    userName.style.borderColor = `red`;
    errName.style.color = "red";
    userName.style.outlineColor = "#DE0F0F45";
    n = false;
    validAll();
  } else if (!reg.test(userName.value.trim())) {
    errName.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Num, symbol ,sp chars can't be use!`;
    userName.style.borderColor = `red`;
    errName.style.color = "red";
    userName.style.outlineColor = "#DE0F0F45";
    n = false;
    validAll();
  } else {
    errName.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    errName.style.color = "#1FC975";
    userName.style.borderColor = `#1FC975`;
    userName.style.outlineColor = "transparent";
    n = true;
    validAll();
  }
})

userId.addEventListener("input", () => {
  let re = /[a-zA-Z0-9._+%]{2,64}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/;
  if (userId.value.trim() === "") {
    errId.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> email cannot be empty!`;
    userId.style.borderColor = `red`;
    errId.style.color = "red";
    userId.style.outlineColor = "#DE0F0F45";
    e = false;
    validAll();
  } else if (!(re.test(userId.value.trim()))) {
    errId.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> enter valid email`;
    userId.style.borderColor = `red`;
    errId.style.color = "red";
    userId.style.outlineColor = "#DE0F0F45";
    e = false;
    validAll();
  } else {
    errId.innerHTML = `<i class="fa-solid fa-circle-check"></i> valid`;
    errId.style.color = "#1FC975";
    userId.style.borderColor = `#1FC975`;
    userId.style.outlineColor = "transparent";
    
    e = true;
    validAll();
  }
})
userNum.addEventListener("input", () => {
  let reg = /[0-9]{10}/;
  if (userNum.value.trim() == "") {
    errNumber.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> phone number cannot be empty!`;
    userNum.style.borderColor = `red`;
    errNumber.style.color = "red";
    userNum.style.outlineColor = "#DE0F0F45";
    no = false;
    validAll();
  } else if (!reg.test(userNum.value.trim()) || userNum.value.trim().length > 10) {
    errNumber.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> wrong number`;
    userNum.style.borderColor = `red`;
    errNumber.style.color = "red";
    userNum.style.outlineColor = "#DE0F0F45";
    no = false;
    validAll();
  } else {
    errNumber.innerHTML = `<i class="fa-solid fa-circle-check"></i> valid`;
    errNumber.style.color = "#1FC975";
    userNum.style.borderColor = `#1FC975`;
    userNum.style.outlineColor = "transparent";
    no = true;
    validAll();
  }
})

const regis = document.getElementById("regis");

function validAll() {
  if (n && e && no) {
    regis.disabled = false;
    regis.style.background = "green";
    localStorage.setItem("name", userName.value);
    localStorage.setItem("email", userId.value);
    setTimeout(() => {
      document.querySelector(".signUp").style.display = "none";
      document.querySelector(".dashboardAi").style.display = "grid";
    }, 1000)
  } else {
    regis.disabled = true;
    regis.style.background = "#89ADC9";
  }
}

})
