let users;
const addBtn = document.getElementById('addMenuBtn')
const closeBtns = document.querySelectorAll('.x-icon')
const addUserForm = document.getElementById('addUserForm')
const updateForm = document.getElementById('updateForm')
const deliteBtn = document.getElementById('delete')
const ContentEl = document.querySelector('.teapots')
const sortMoreBtn = document.getElementById('sort-more')
const sortBtns = document.querySelectorAll('.sortBtn')
const resetBtn = document.getElementById('reset')
const searchBtns = document.querySelectorAll('.searchBtn')
const filtBtns = document.querySelectorAll('.filtBtn')
const editBtn = document.getElementById('edit')
const titleBtn = document.querySelector('.titleBtn')



let selectedRowsId = []

titleBtn.addEventListener('click', ()=>{
    if(  document.querySelector('.tables-selector').style.display = 'none'){
       
        document.querySelector('.tables-selector').style.display = 'block'
       
    }
  
})
document.addEventListener('click', (event)=>{
    if(event.target != document.querySelector('.titleBtn')){
        document.querySelector('.tables-selector').style.display = 'none'
    }
})



function sendReq(method, url , body = null){
    const headers = {
        'Content-Type': 'application/json'
    }

    if(method == 'PUT'){
        return fetch(url,{
            method: method,
            body: JSON.stringify(body),
            headers: headers
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            return data
        })
    }else  if(method!= 'POST'){
        return fetch(url)
        .then((res)=>{
                return res.json()
            })
        .then((data)=>{
                return data
            })
    }else if(method=='POST'){
        return fetch(url,{
            method: method,
            body: JSON.stringify(body),
            headers: headers
        })
        .then((res)=>{
                return res.json()
            })
        .then((data)=>{
                return data
            })
    }
}

const selectRows= ()=>{
    ContentEl.addEventListener('click', (event)=>{
    
        if(event.target.parentNode.classList.contains('selected')){
            document.querySelectorAll('.selected').forEach(item=>{
                selectedRowsId.pop((item.childNodes[0].id) )
              
            })
            event.target.parentNode.classList.remove('selected')
            event.target.parentNode.classList.add('unselected')
         
            
         
        }else if(event.target.parentNode.classList.contains('unselected')){
      
            event.target.parentNode.classList.remove('unselected')
        
            event.target.parentNode.classList.add('selected')
         
        }
        document.querySelectorAll('.selected').forEach(item=>{
            if(!selectedRowsId.includes(item.childNodes[0].id)){
                selectedRowsId.push((item.childNodes[0].id) )
            }
          
        })
       
    })
} 

selectRows()




function renderUsers(){
    sendReq('GET', 'http://localhost:8080/api/worker').then((data)=>{
        for(i in data){
            document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-surname">${data[i].surname}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-firstname">${data[i].firstname}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-patronymic">${data[i].patronymic}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-workshop">${data[i].workshop}</span>`
        }
    })
    selectedRowsId= []
}
 
renderUsers()

resetBtn.addEventListener('click',()=>{
    document.querySelector('.teapots').innerHTML = ''
    renderUsers()
})

// document.getElementById('teapots-datalist').innerHTML= '<option value="витёк"></option>'

function positionPrompt(){
    sendReq('GET', 'http://localhost:8080/api/position')
    .then((data)=>{

        for(i in data){
            document.getElementById('position-datalist').innerHTML+= `<option value="${data[i].id}" label="${data[i].position_name}"></option>`
            
            }
    })
}
function workshopPrompt(){
    sendReq('GET', 'http://localhost:8080/api/workshop')
    .then((data)=>{

    
        for(i in data){
            document.getElementById('workshop-datalist').innerHTML+= `<option value="${data[i].id}" label="${data[i].title}"></option>`
            }
    })
}
positionPrompt()
workshopPrompt()

addBtn.addEventListener('click', ()=>{
    document.querySelector('.addModal').style.display = 'block'
})

closeBtns.forEach((item)=>{
    item.addEventListener('click', ()=>{
        document.querySelector('.addModal').style.display = 'none'
        document.querySelector('.updateModal').style.display = 'none'
    })
})


editBtn.addEventListener('click', ()=>{
    if (selectedRowsId.length == 0){
     alert('Строка для изменения не выбрана')
     return
    }
    if (selectedRowsId.length > 1){
     alert('Можно изменить только одну строку')
     return
    }
    document.querySelector('.updateModal').style.display = 'block'
    document.getElementById('UPDATE-surname').value=  document.querySelector('.selected').childNodes[1].textContent
    document.getElementById('UPDATE-firstname').value=  document.querySelector('.selected').childNodes[2].textContent
    document.getElementById('UPDATE-patronymic').value=  document.querySelector('.selected').childNodes[3].textContent

})

updateForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const id = document.querySelector('.selected').childNodes[0].textContent
    const surname = document.getElementById('UPDATE-surname').value
    const firstname = document.getElementById('UPDATE-firstname').value
    const patronymic = document.getElementById('UPDATE-patronymic').value
    const position_id = document.getElementById('UPDATE-position').value
    const workshop_id = document.getElementById('UPDATE-workshop').value
    if(surname== '' || firstname == '' || patronymic == ''|| position_id == '' || workshop_id == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        const surname = document.getElementById('UPDATE-surname').value
        const firstname = document.getElementById('UPDATE-firstname').value
        const patronymic = document.getElementById('UPDATE-patronymic').value
        const position_id = document.getElementById('UPDATE-position').value
        const workshop_id = document.getElementById('UPDATE-workshop').value
    }
    const body={
        'id': id,
        'surname': surname,
        'firstname': firstname,
        'patronymic': patronymic,
        'position_id': position_id,
        'workshop_id': workshop_id
    }
    sendReq('PUT', 'http://localhost:8080/api/worker/update' , body)
    document.querySelector('.teapots').innerHTML = ''
    renderUsers()
})

addUserForm.addEventListener('submit', (event)=>{
    event.preventDefault()
   console.log('lal')
    const surname = document.getElementById('POST-surname').value
    const firstname = document.getElementById('POST-firstname').value
    const patronymic = document.getElementById('POST-patronymic').value
    const position_id = document.getElementById('POST-position').value
    const workshop_id = document.getElementById('POST-workshop').value
    if(surname== '' || firstname == '' || patronymic == ''|| position_id == '' || workshop_id == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('POST-surname').value = ''
        document.getElementById('POST-firstname').value = ''
        document.getElementById('POST-patronymic').value = ''
        document.getElementById('POST-position').value = ''
        document.getElementById('POST-workshop').value = ''
    }
    const body={
        'surname': surname,
        'firstname': firstname,
        'patronymic': patronymic,
        'position_id': position_id,
        'workshop_id': workshop_id
    }
    sendReq('POST', 'http://localhost:8080/api/worker' , body).then(()=>{
        document.querySelector('.teapots').innerHTML = ''
        renderUsers()
    })


    
})


deliteBtn.addEventListener('click',()=>{
    selectedRowsId.forEach((item)=>{
        fetch(`http://localhost:8080/api/worker/${item}`, {method: 'DELETE'}).then(()=>{
          
        })
    })
    document.querySelector('.teapots').innerHTML = ''
    renderUsers()

})




sortBtns.forEach((item)=>{
    item.addEventListener('click', (target)=>{
        document.querySelector('.teapots').innerHTML = ''
     
            let order 
            let by 
            if(target.target.id =='sort-more'){
                order = 'desc'
            }
             if(target.target.id =='sort-less'){
                 order = 'asc'
            }
        switch (item.parentNode.textContent) {
            case 'Id':{
                 by='id'
            }
                break;
            case 'Фамилия':{
                by='surname'
             
            }
                break;
            case 'Имя':{
                by='firstname'
                
            }
                break;
            case 'Отчество':{
                by='patronymic'
                
            }
            case 'Должность':{
                by='position_name'
                
            }
            case 'Цех':{
                by='workshop'
                
            }
                break;    
        
        
            default:
                break;
        }
        sendReq('GET', `http://localhost:8080/api/worker/sort/${by}/${order}`).then((data)=>{

     
            for(i in data){
              
                document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-surname">${data[i].surname}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-firstname">${data[i].firstname}</span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-patronymic">${data[i].patronymic}</span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}</span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-workshop">${data[i].workshop}</span>`
                }
    
        })
          
    })
})

searchBtns.forEach((item)=>{

    item.addEventListener('click', ()=>{
        const searchProps = document.getElementById('propsInput')
        const searchCheck = document.getElementById('propsCheck')
        if(searchProps.value == ''){
            alert("Введите параметры для поиска или фильтрации")
            return
        }
        let by 
        switch (item.parentNode.textContent) {
            case 'Id':{
                by='col-id'
           }
               break;
           case 'Фамилия':{
                by='col-surname'
            
           }
               break;
           case 'Имя':{
                by='col-firstname'               
           }
               break;
           case 'Отчество':{
                by='col-patronymic'
               
           }
           case 'Должность':{
                by='col-position_name'
               
           }
           case 'Цех':{
                by='col-workshop'
               
           }
               break;    
        
            default:
                break;
        }
        const selectedCols = document.querySelectorAll(`.${by}`)
        if(searchCheck.checked){
            selectedCols.forEach((item)=>{
                if(item.textContent == searchProps.value){
                    item.parentNode.classList.add('selected')
                }
            })
        }else{
            selectedCols.forEach((item)=>{
                if(item.textContent.includes(searchProps.value)){
                    item.parentNode.classList.add('selected')
                }
            })
        }
        
  
    })
})

filtBtns.forEach((item)=>{
    item.addEventListener('click', ()=>{
        const searchProps = document.getElementById('propsInput')
        const searchCheck = document.getElementById('propsCheck')
        if(searchProps.value == ''){
            alert("Введите параметры для поиска или фильтрации")
            return
        }
        let by 
        switch (item.parentNode.textContent) {
            case 'Id':{
                by='worker.id'
           }
               break;
           case 'Фамилия':{
               by='worker.surname'
            
           }
               break;
           case 'Имя':{
               by='worker.firstname'
               
           }
               break;
           case 'Отчество':{
               by='worker.patronymic'
               
           }
                 break;
           case 'Должность':{
               by='position.position_name'
               
           }
                 break;
           case 'Цех':{
               by='workshop.title'
               
           }
               break;  
        
            default:
                break;
        }
        if(searchCheck.checked){
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `http://localhost:8080/api/worker/select/${by}/${searchProps.value}`).then((data)=>{
                console.log(data)
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-surname">${data[i].surname}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-firstname">${data[i].firstname}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-patronymic">${data[i].patronymic}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-workshop">${data[i].workshop}</span>`
                    }
            })
        }else{
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `http://localhost:8080/api/worker/search/${by}/${searchProps.value}`).then((data)=>{
                console.log(data)
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-surname">${data[i].surname}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-firstname">${data[i].firstname}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-patronymic">${data[i].patronymic}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-workshop">${data[i].workshop}</span>`
                    }
            })
        }

      
    })
})