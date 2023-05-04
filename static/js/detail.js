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
    sendReq('GET', 'http://localhost:8080/api/detail').then((data)=>{
        for(i in data){
            document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-teapot">${data[i].teapot}</span>`
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

function teapotPrompt(){
    sendReq('GET', 'http://localhost:8080/api/teapot')
    .then((data)=>{

        for(i in data){
            document.getElementById('teapots-datalist').innerHTML+= `<option value="${data[i].id}" label="${data[i].title}"></option>`
            
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
teapotPrompt()
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
    document.getElementById('UPDATE-title').value=  document.querySelector('.selected').childNodes[1].textContent
    document.getElementById('UPDATE-teapot').value = document.querySelector('.selected').childNodes[2].textContent
    document.getElementById('UPDATE-workshop').value = document.querySelector('.selected').childNodes[3].textContent

})

updateForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const id = document.querySelector('.selected').childNodes[0].textContent
    const title = document.getElementById('UPDATE-title').value
    const teapot = document.getElementById('UPDATE-teapot').value
    const workshop = document.getElementById('UPDATE-workshop').value
    if(title== '' || teapot == '' || workshop == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('UPDATE-title').value = ''
        document.getElementById('UPDATE-teapot').value = ''
        document.getElementById('UPDATE-workshop').value = ''
    }
    const body={
        'id': id,
        'title': title,
        'teapot': teapot,
        'workshop': workshop
    }
    sendReq('PUT', 'http://localhost:8080/api/detail/update' , body)
    document.querySelector('.teapots').innerHTML = ''
    renderUsers()
})

addUserForm.addEventListener('submit', (event)=>{
    event.preventDefault()
   
    const title = document.getElementById('POST-title').value
    const teapot = document.getElementById('POST-teapot').value
    const workshop = document.getElementById('POST-workshop').value
    if(title== '' || teapot == '' || workshop == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('POST-title').value = ''
        document.getElementById('POST-teapot').value = ''
        document.getElementById('POST-workshop').value = ''
    }
    const body={
        'title': title,
        'teapot': teapot,
        'workshop': workshop
    }
    sendReq('POST', 'http://localhost:8080/api/detail' , body).then(()=>{
        document.querySelector('.teapots').innerHTML = ''
        renderUsers()
    })


    
})


deliteBtn.addEventListener('click',()=>{
    selectedRowsId.forEach((item)=>{
        fetch(`http://localhost:8080/api/workshop/${item}`, {method: 'DELETE'}).then(()=>{
          
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
            case 'Название':{
                by='title'
             
            }
                break;
            case 'Чайник':{
                by='teapot'
                
            }
                break;
            case 'Цех':{
                by='workshop'
                
            }
                break;    
        
        
            default:
                break;
        }
        sendReq('GET', `http://localhost:8080/api/detail/sort/${by}/${order}`).then((data)=>{

     
            for(i in data){
              
                document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-teapot">${data[i].teapot}</span>`
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
           case 'Название':{
               by='col-title'
            
           }
               break;
           case 'Чайник':{
               by='col-teapot'
               
           }
               break;
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
                by='detail.id'
           }
               break;
           case 'Название':{
               by='detail.title'
            
           }
               break;
           case 'Чайник':{
               by='teapot.title'
               
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
            sendReq('GET', `http://localhost:8080/api/detail/select/teapot.title/вите`).then((data)=>{
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-teapot">${data[i].teapot}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-workshop">${data[i].workshop}</span>`
                    }
            })
        }else{
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `http://localhost:8080/api/detail/search/${by}/${searchProps.value}`).then((data)=>{
                console.log(data)
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-teapot">${data[i].teapot}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-workshop">${data[i].workshop}</span>`
                    }
            })
        }

      
    })
})