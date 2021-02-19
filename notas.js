const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');

let notas = [];

eventListeners();

function eventListeners(){
    formulario.addEventListener('submit',agregarTweet);

    //Cuando el Documento Este listo
    document.addEventListener('DOMContentLoaded',()=>{
        notas = JSON.parse(localStorage.getItem('tweets')) || [];//Si Marca Null(No hay Nada en el Array, se asigna un Array Vacio.)
        console.log(notas);

        crearHTML();
    })
}

function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#nota').value;
    
    //Validacion
    if(tweet === ''){
        mostrarError('No se ha ingresado una nota')
        return;
    }

    const tweetObj = {
        id:Date.now(),
        tweet,
    }
    //Añadir al Arreglo
    notas = [...notas,tweetObj];//Spread Operator

    //crear HTML
    crearHTML();

    //Reiniciar el Formulario
    formulario.reset();
}

//Muestra mensaje de error si no se carga nada en el formulario.
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la Alerta despues de 3 segundos.
    setTimeout( ()=>{
        mensajeError.remove();
    },3000);
}

function crearHTML(){

    limpiarHTML();

    if(notas.length > 0){
        notas.forEach( (nt) =>{
            //Agregar Boton de Eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota');
            btnEliminar.innerText = 'X'

            //Añadir Funcion de Eliminar
            btnEliminar.onclick = () =>{
                borrarNota(nt.id);
            }

            //Crea la Lista Abajo de Mis Tweets
            const li = document.createElement('LI');
            //Añadir texto
            li.innerText = nt.tweet;

            //Asignar boton
            li.appendChild(btnEliminar);

            //Insertar en HTML
            listaNotas.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(notas));
}



function limpiarHTML(){
    while(listaNotas.firstChild){
        listaNotas.removeChild(listaNotas.firstChild);
    }
}

//Elimina una Nota
function borrarNota(id){
    notas = notas.filter(nt => nt.id !== id);

    crearHTML();
}