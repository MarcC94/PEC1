const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');
const url = document.getElementById('URL');


//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(input){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input, 'Email is not valid');
    }
}

//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input);
        }
    });
}

//Check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }
}

//Check password match
function checkPasswordMatch(input1, input2){
    if(input1.value != input2.value){
        showError(input2, 'Password do not match');
    }
}

//Check age
function checkAge(input, min, max){
    if(input.value < min){
        showError(input, `${getFieldName(input)} must be at least ${min}`);
    } else if(input.value > max){
        showError(input, `${getFieldName(input)} must be less than ${max}`);
    } else{
        showSuccess(input);
    }
}

//Check url is valid
function checkUrl(input){
    const re = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input, 'URL is not valid');
    }
}

//Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit',function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2, age, url]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkAge(age, 0, 999);
    checkUrl(url);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});