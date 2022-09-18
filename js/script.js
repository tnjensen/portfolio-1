const links = document.querySelectorAll('nav a');
const menuBtn = document.querySelector('.menu-btn');

for(let i = 0; i < links.length; i++){
    if(links[i] == document.URL){
        links[i].classList.add('active');
    }
}

menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('visible');
})