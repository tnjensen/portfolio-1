const links = document.querySelectorAll('nav a');
const menuBtn = document.querySelector('.menu-btn');
const projects = document.querySelector('.projects');
const url = 'https://noroff.tnjensen.com/portfolio/wp-json/wp/v2/posts?_embed&filter[orderby]=date&order=asc';
const corsEnabledUrl ="https://noroffcors.herokuapp.com/";
const loader = document.querySelector('.loader');
let postsPerPage = 0;
let postResult = [];

for(let i = 0; i < links.length; i++){
    if(links[i] == document.URL){
        links[i].classList.add('active');
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
                <a href="${results[i].meta._links_to}">Visit site</a>
                </div>`; 
        }
    }
    
}