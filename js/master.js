
let mainColors = localStorage.getItem("color_option");
if (mainColors!== null){
    document.documentElement.style.setProperty('--main--color', localStorage.getItem("color_option"));
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
        
    });
}

let backgroundOption = true;
let backgroundInterval;

let backgroundLocation = localStorage.getItem("background_option");

if (backgroundLocation !== null){
    if (backgroundLocation === 'true'){
        backgroundOption = true ;
    } else {
        backgroundOption = false;
    }
    document.querySelectorAll(".random-background span").forEach(element => {
            element.classList.remove("active");
    });
    if (backgroundLocation === 'true'){
        document.querySelector(".random-background .yes").classList.add("active");

    } else {
        document.querySelector(".random-background .no").classList.add("active");
    }

}

document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box ").classList.toggle("open");
};

const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach(li=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
        localStorage.setItem("color_option",e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

const randomBackgroundElement = document.querySelectorAll(".random-background  span");
randomBackgroundElement.forEach(span => {
    span.addEventListener("click", (e) => {
        
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        if (e.target.dataset.background === 'yes'){
                backgroundOption = true;
                randomImage();
                localStorage.setItem("background_option",true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

let landingPage = document.querySelector(".landing-page");

let imagsArray = ["../images/images (1).jpg", "../images/images.jpg"  ,"../images/images (2).jpg", "../images/images (3).jpg", "../images/images (4).jpg", "../images/images (5).jpg", "../images/images (6).jpg", "../images/images (7).jpg"];



function randomImage(){

    if (backgroundOption === true){
        let randomNumber = Math.floor(Math.random() * imagsArray.length);
        backgroundInterval=setInterval(function () {
            randomNumber = Math.floor(Math.random() * imagsArray.length);
            landingPage.style.backgroundImage = 'url("' + imagsArray[randomNumber] + '")';
        }, 10000);
    }
}

// selector skills 
let ourSkills = document.querySelector(".skills");

window.onscroll = function (){
    
    let skillsOfestTop = ourSkills.offsetTop;

    let skillsOterHeight = ourSkills.offsetHeight;
    
    let windowHeight = this.innerHeight;
    
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOfestTop + skillsOterHeight - windowHeight)){
        let allSkills =document.querySelectorAll(".skill-box .skill-progress span");
            allSkills.forEach(skill => {
                skill.style.width = skill.dataset.progress;
            });
    }
}

// create popup with the Image 
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click',(e) =>{
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if (img.alt !== null){
            let imgHeading = document.createElement("h3");
            let imgTex = document.createTextNode(img.alt);
            imgHeading.appendChild(imgTex);
            popupBox.appendChild(imgHeading);
        }
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        let closeSpan = document.createElement("span");
        let closeButtonTex = document.createTextNode("X");
        closeSpan.appendChild(closeButtonTex);
        closeSpan.className = 'close-button';
        popupBox.appendChild(closeSpan);
    });
});


document.addEventListener("click",function(e){
    if (e.target.className === 'close-button'){
        e.target.parentNode.remove();
        document.querySelector(".popup-overay").remove();
    }
});

//select All bullets 

let allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet => {
    bullet.addEventListener("click",(e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
        
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span =>{
    span.addEventListener("click",(e)=>{
        
        if (span.dataset.display === 'block'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option",'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        //handelActive(e);
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
            
        });
        e.target.classList.add("active");
    });

});




document.querySelector(".reset-options").onclick = function (){
    //localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    window.location.reload();
};


// toggle menu 

let toggleB = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleB.onclick = function (e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};

document.addEventListener("click",(e)=>{
    if (e.target !== toggleB && e.target !== tLinks){
        if (tLinks.classList.contains("open")){
            toggleB.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

tLinks.onclick = function (e) {
    e.stopPropagation();
};