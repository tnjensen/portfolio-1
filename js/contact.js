const form = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const fullNameError = document.getElementById('fullName-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const subject = document.getElementById('subject');
const subjectError = document.getElementById('subject-error');
const message = document.getElementById('message');
const messageError = document.getElementById('message-error');
const restRoot = 'https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/portfolio/wp-json/';
const contactDetails = document.querySelector('.contact-form-details');

function validateForm(event){
    event.preventDefault();

    if(checkLength(fullName.value, 0)){
        fullNameError.style.display = 'none';
    }
    else{
        fullNameError.style.display = 'block';
    }
    if(validateEmail(email.value)){
        emailError.style.display = 'none';
    }
    else{
        emailError.style.display = 'block';
    }
    if(checkLength(subject.value, 15)){
        subjectError.style.display = 'none';
    }
    else{
        subjectError.style.display = 'block';
    }
    if(checkLength(message.value, 15)){
        messageError.style.display = 'none';
    }
    else{
        messageError.style.display = 'block';
    }
    handleSubmit();
}
form.addEventListener("submit", validateForm);

function checkLength(value, len){
    if(value.trim().length > len){
        return true;
    }
    else{
        return false;
    }
}
function validateEmail(email){
    const regEx = /^.+@.+$/;
    const patternMatches = regEx.test(email);
    return patternMatches; 
}

async function handleSubmit(event) {
  
    let data = JSON.stringify({
        "title": fullName.value,
        "excerpt": subject.value,
        "content": message.value,
        'status': 'publish',
        'meta': {
            'email': email.value,
        }
    });
    if(fullName.value && subject.value && message.value && email.value){
        let postUrl = restRoot + 'wp/v2/contacts';   
        let response = await fetch(postUrl, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy5ub3JvZmYudG5qZW5zZW4uY29tL3BvcnRmb2xpbyIsImlhdCI6MTY2NDE3ODYyNSwibmJmIjoxNjY0MTc4NjI1LCJleHAiOjE2NjQ3ODM0MjUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.XZJL1LnZvYcdT0n_9ILKTKrK8Cu64wE5mi1Dr9dE2a8'
            },
           body: data,  
        })
        .then(response => response.json())
        .then(response => alert('Message sent successfully'))
        .catch(error => console.log("Error: ", error))
    }
    
}
