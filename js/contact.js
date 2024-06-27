const nombre = document.getElementById("name")
const email = document.getElementById("email")
const telefono = document.getElementById("number")
const asunto = document.getElementById("subject")
const parrafo = document.getElementById("warnings")
const mensaje = document.getElementById("message")
const form = document.getElementById("form")
const jquery = jquery()


form.addEventListener("submit", e => {
    e.preventDefault()

    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    let regexTelefono = /^\d{10}$/
    parrafo.innerHTML = ""

    if (nombre.value.length < 3) {
        warnings += `Nombre no valido. Min 3 caract. <br>`
        entrar = true
    }
    if (!regexEmail.test(email.value)) {
        warnings += `Email no valido. <br>`
        entrar = true
    }
    if (!regexTelefono.test(telefono.value)) {
        warnings += `Numero no valido. 10 caract. <br>`
        entrar = true
    }

    if (asunto.value.length > 20 || asunto.value.length < 3) {
        warnings += `Asunto min 3 máx 20 caracteres. <br>`
        entrar = true
    }

    if (mensaje.value.length > 100 || mensaje.value.length < 3) {
        warnings += `Mensaje min 3 y máx 100 caracteres <br>`
        entrar = true
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    }
    else {
        const data = new FormData(e.target);
        fetch(e.target.action, {
            method: form.method,
            body: data,
            headers: {
                Accept: "application/json"
            }
        }).then(() => {
            alert("Gracias por contactarnos. En breve nos comunicaremos!")
            form.reset()
        })

    }
})

function cleanForm() {
    form.reset()
}

// log in


// $(document).on(function(){
//     $('#login').hide();
//     $('#open_close').onclick(function(){
//         $('#login').slideToggle();

//     });
// });


// serchForm


const searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
  
    loginForm.classList.remove('active');
    
}

// loginrobado

$(function () {
    $('#login').onclick(function () {
        $(this).next('#login-content').slideToggle();
        $(this).toggleClass('active');
    });
});

$(function(){
    $('#login').click(function(){
    $(this).next('#login-content').slideToggle();
    $(this).toggleClass('active');          
    });
 });