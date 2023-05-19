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
document.getElementById('exit').addEventListener('click', ()=>{
    location.replace('/')
})
if(localStorage.getItem('login') == 'manager'){
    document.getElementById('edit').disabled = 'true'
    document.getElementById('delete').disabled = 'true'
}
if(localStorage.getItem('login') == 'user'){
    document.getElementById('edit').disabled = 'true'
    document.getElementById('delete').disabled = 'true'
    document.getElementById('addMenuBtn').disabled = 'true'
}


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
    sendReq('GET', 'http://localhost:8080/api/position').then((data)=>{
        for(i in data){
            document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-clock_rate">${data[i].clock_rate}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-hourly_rate">${data[i].hourly_rate}</span>`
        }
    })
    selectedRowsId= []
}
 
renderUsers()

resetBtn.addEventListener('click',()=>{
    document.querySelector('.teapots').innerHTML = ''
    renderUsers()
})


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
    document.getElementById('UPDATE-clock').value=  document.querySelector('.selected').childNodes[2].textContent
    document.getElementById('UPDATE-hourly').value=  document.querySelector('.selected').childNodes[3].textContent

})

updateForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const id = document.querySelector('.selected').childNodes[0].textContent
    const title = document.getElementById('UPDATE-title').value
    const clock = document.getElementById('UPDATE-clock').value
    const hourly = document.getElementById('UPDATE-hourly').value
    if(title== '' || clock == '' || hourly == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('UPDATE-title').value = ''
        document.getElementById('UPDATE-clock').value = ''
        document.getElementById('UPDATE-hourly').value = ''
    }
    const body={
        'id': id,
        'position_name': title,
        'clock_rate': clock,
        'hourly_rate': hourly
    }
    sendReq('PUT', 'http://localhost:8080/api/position/update' , body)

    document.querySelector('.teapots').innerHTML = ''
    renderUsers()

})

addUserForm.addEventListener('submit', (event)=>{
    event.preventDefault()
   
    const title = document.getElementById('POST-title').value
    const clock = document.getElementById('POST-clock').value
    const hourly = document.getElementById('POST-hourly').value
    if(title== '' || clock == '' || hourly == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('POST-title').value = ''
        document.getElementById('POST-hourly').value = ''
        document.getElementById('POST-clock').value = ''
    }
    const body={
        'position_name': title,
        'clock_rate': clock,
        'hourly_rate': hourly
    }
    sendReq('POST', 'http://localhost:8080/api/position' , body).then(()=>{
        document.querySelector('.teapots').innerHTML = ''
        renderUsers()
    })


    
})


deliteBtn.addEventListener('click',()=>{
    selectedRowsId.forEach((item)=>{
        fetch(`http://localhost:8080/api/position/${item}`, {method: 'DELETE'}).then(()=>{
          
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
                by='position_name'
             
            }
                break;
            case 'Длительность смены':{
                by='clock_rate'
                
            }
                break;
            case 'Часовая ставка':{
                by='hourly_rate'
                
            }
                break;    
        
        
            default:
                break;
        }
        sendReq('GET', `http://localhost:8080/api/position/sort/${by}/${order}`).then((data)=>{

     
            for(i in data){
              
                document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-clock_rate">${data[i].clock_rate}</span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-hourly_rate">${data[i].hourly_rate}</span>`
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
               by='col-position_name'
            
           }
               break;
            case 'Длительность смены':{
               by='col-clock_rate'
               
           }
               break;
            case 'Часовая ставка':{
               by='col-hourly_rate'
               
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
                by='id'
           }
               break;
           case 'Название':{
               by='position_name'
            
           }
               break;
           case 'Длительность смены':{
               by='clock_rate'
               
           }
               break;
           case 'Часовая ставка':{
               by='hourly_rate'
               
           }
               break;    
        
            default:
                break;
        }
        if(searchCheck.checked){
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `http://localhost:8080/api/position/select/${by}/${searchProps.value}`).then((data)=>{
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-clock_rate">${data[i].clock_rate}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-hourly_rate">${data[i].hourly_rate}</span>`
                    }
            })
        }else{
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `http://localhost:8080/api/position/search/${by}/${searchProps.value}`).then((data)=>{
                console.log(data)
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-position_name">${data[i].position_name}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-clock_rate">${data[i].clock_rate}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-hourly_rate">${data[i].hourly_rate}</span>`
                    }
            })
        }

      
    })
})