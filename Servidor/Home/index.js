const formCreate = document.querySelector("#form-create"); 
const createInput = document.querySelector("#create-input");
const formLogin = document.querySelector("#form-login"); 
const loginInput = document.querySelector("#login-input");
const notificacion = document.querySelector(".notification");

//logearUsuario

formLogin.addEventListener("submit", async e =>{
    e.preventDefault()
    const response = await fetch("http://localhost:3004/users", {method: "GET"});
    const users = await response.json()
    const user = users.find(user  => user.username === loginInput.value)

    if (!user) {
        notificacion.innerHTML="EL input del usuario no existe"
        notificacion.classList.add("show-notification")
        setTimeout(()  =>{
            notificacion.classList.remove("show-notification")
        }, 3000)
    } else {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "../Contactos/index.html";
    }
})

//Crear usuario

formCreate.addEventListener("submit", async e =>{
    e.preventDefault()
    const response = await fetch("http://localhost:3004/users", {method: "GET"});
    const users = await response.json()
    const user = users.find(user  => user.username === createInput.value)
    if (createInput.value === "") {
        notificacion.innerHTML="EL input del usuario no puede estar vacio"
        notificacion.classList.add("show-notification")
        setTimeout(()  =>{
            notificacion.classList.remove("show-notification")
        }, 3000)
    }else if(user){
        notificacion.innerHTML = "El usuario ya existe"
        notificacion.classList.add("show-notification")
        setTimeout(()  =>{
            notificacion.classList.remove("show-notification")
        }, 3000)
    }else{
    await fetch("http://localhost:3004/users", {
        method: "POST", 
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({username: createInput.value})
    });
    }
})