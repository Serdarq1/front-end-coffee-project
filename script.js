let body = document.querySelector("body")
let navImg = document.querySelector(".nav-img-div")
let none = document.querySelector(".none")
let header = document.querySelector("header")
let main = document.querySelector("main")
let section = document.querySelector("section")
let article = document.querySelector("article")
let footer = document.querySelector("footer")
let bar = document.querySelector(".fa-solid")
let input = document.getElementById("number-of-products")
let companyFranchiseBtn = document.querySelector(".company-franchise-btn")


let observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show")
            entry.target.classList.add("left-to-right-after")
            entry.target.classList.add("right-to-left-after")
        }else{
            entry.target.classList.remove("show")
            entry.target.classList.remove("left-to-right-after")
            entry.target.classList.remove("right-to-left-after")

        }
    })
})


let hiddenElements = document.querySelectorAll(".hidden")
let leftToRight = document.querySelectorAll(".left-to-right-before")
let rightToLeft = document.querySelectorAll(".right-to-left-before")
hiddenElements.forEach((e1) => observer.observe(e1))
leftToRight.forEach((e1) => observer.observe(e1))
rightToLeft.forEach((e1) => observer.observe(e1))


navImg.addEventListener("click", function(){
    $(none).fadeToggle("fast");
    header.classList.toggle("none")
    main.classList.toggle("none")
    section.classList.toggle("none")
    article.classList.toggle("none")
    footer.classList.toggle("none")
    companyFranchiseBtn.classList.toggle("none")
})
