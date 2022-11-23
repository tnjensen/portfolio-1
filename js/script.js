const links = document.querySelectorAll('nav a');
const menuBtn = document.querySelector('.menu-btn');
const projects = document.querySelector('.projects');
const url = 'https://noroff.tnjensen.com/portfolio/wp-json/wp/v2/posts?categories=3&_embed&filter[orderby]=date&order=asc';
const corsEnabledUrl ="https://noroffcors.herokuapp.com/";
const loader = document.querySelector('.loader');
const scrollElements = document.querySelectorAll('.js-scroll');
const scrollOffset = 100;
const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2022){
  year.innerHTML = `2022 - `+ date;
}else{
  year.innerHTML = date;
}

scrollElements.forEach((el) =>{
    el.style.opacity = 0
})

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
    
};
const displayScrollElement = (element) => {
        element.classList.add('scrolled');
}

const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
}
   
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
        displayScrollElement(el);
        } else {
        hideScrollElement(el);
        }
    })
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
})

window.onload = function showCurrent(){
    let home = links[0];
    home.classList.add('active');
    for(let i = 0; i < links.length; i++){
        links[i].addEventListener('click', function(){
            let current = document.getElementsByClassName('active');
            if(current.length > 0){
                current[0].className = current[0].className.replace(" active", "");
                home.classList.remove('active');
            }
            this.className += " active";
        })
    }
}

menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('visible');
})

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('.menu-btn')){
        menuBtn.classList.remove('visible');
    }
})

async function getProjects(){
    try{
        let response = await fetch(url);
        let results = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        createHTML(results);
        
    }
    catch(error){
        if(projects){
            projects.innerHTML = `Error: ` + error;
        }     
    }
}
getProjects();

function createHTML(results){ 
    for(let i = 0; i < results.length; i++){ 
        if(!results[i]){
            console.log('No results');
            break;
        }else{
            projects.innerHTML += `<div class="project-item">
                <h2>${results[i].title.rendered}</h2>
                <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                <p>${results[i].content.rendered}</p>
                <a href="${results[i].meta._links_to}" class="site-btn">Visit site</a>
                </div>`; 
        }
    }
    
}
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop()+175;
    $('nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}