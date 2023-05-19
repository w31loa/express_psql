const loginInp = document.getElementById('login-input')
const passwordInp = document.getElementById('pass-input')
const signInBtn = document.querySelector('.in-btn')



async function logJSONData() {
    // localStorage.clear()
    const response = await fetch("http://localhost:8080/api/users");
    const users = await response.json();
    // console.log(users)
    signInBtn.addEventListener('click', (event)=>{
        event.preventDefault()
        const login = loginInp.value
        const password = passwordInp.value
        // const body = {
        //     "login": login,
        //     "password": password
        // }
        // fetch('http://localhost:8000/api/users', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(body) 
        // })

        users.forEach((item)=>{
            if(item.login == login && item.password== password){
                location.replace("http://localhost:8080/teapot.html")
                document.querySelector('.error').style.display = 'none'
                localStorage.setItem('login', `${login}`)
            }else{
                document.querySelector('.error').style.display = 'block'
            }
        })
     

    })
  }

  logJSONData()
// console.log(users)
// location.replace("index.html")

if(localStorage.getItem('login') == 'manager'){
    document.getElementById('edit').disabled = 'true'
    document.getElementById('delete').disabled = 'true'
}
if(localStorage.getItem('login') == 'user'){
    document.getElementById('edit').disabled = 'true'
    document.getElementById('delete').disabled = 'true'
    document.getElementById('addMenuBtn').disabled = 'true'
}


