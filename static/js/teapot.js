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
    sendReq('GET', 'api/teapot')
    .then((data)=>{

     
        for(i in data){
            document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-volume">${data[i].volume}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-power">${data[i].power}</span>`
            document.querySelector(`.row${i}`).innerHTML += `<span class="value col-material">${data[i].material}</span>`
            }
            selectedRowsId= []
    })
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
    document.getElementById('UPDATE-volume').value = document.querySelector('.selected').childNodes[2].textContent
    document.getElementById('UPDATE-power').value =  document.querySelector('.selected').childNodes[3].textContent
    document.getElementById('UPDATE-material').value =  document.querySelector('.selected').childNodes[4].textContent

})

updateForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const id = document.querySelector('.selected').childNodes[0].textContent
    const title = document.getElementById('UPDATE-title').value
    const volume = document.getElementById('UPDATE-volume').value
    const power = document.getElementById('UPDATE-power').value
    const material = document.getElementById('UPDATE-material').value
    if(title== '' || volume == '' || power== '' || material == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('UPDATE-title').value = ''
        document.getElementById('UPDATE-volume').value = ''
        document.getElementById('UPDATE-power').value = ''
        document.getElementById('UPDATE-material').value = ''
    }
    const body={
        'id': id,
        'title': title,
        'volume': volume,
        'power': power,
        'material': material
    }
    console.log(body)
    sendReq('PUT', 'api/teapot/update' , body)
    document.querySelector('.teapots').innerHTML = ''
    renderUsers()
   
})



addUserForm.addEventListener('submit', (event)=>{
    event.preventDefault()
   
    const title = document.getElementById('POST-title').value
    const volume = document.getElementById('POST-volume').value
    const power = document.getElementById('POST-power').value
    const material = document.getElementById('POST-material').value
    if(title== '' || volume == '' || power== '' || material == ''){
        alert("Вы вввели не все данные для добавление")
        return false
    }else{
        document.getElementById('POST-title').value = ''
        document.getElementById('POST-volume').value = ''
        document.getElementById('POST-power').value = ''
        document.getElementById('POST-material').value = ''
    }
    const body={
        'title': title,
        'volume': volume,
        'power': power,
        'material': material
    }
    sendReq('POST', 'api/teapot' , body).then(()=>{
        document.querySelector('.teapots').innerHTML = ''
        renderUsers()
       
    })

})


deliteBtn.addEventListener('click',()=>{
    selectedRowsId.forEach((item)=>{
        fetch(`api/teapot/${item}`, {method: 'DELETE'}).then(()=>{
          
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
            console.log(target.target.id)
            if(target.target.id =='sort-more'){
                order = 'desc'
            }
             if(target.target.id =='sort-less'){
                 order = 'asc'
            }
        console.log(item.parentNode.textContent)
        switch (item.parentNode.textContent) {
            case 'Id':{
                 by='id'
            }
                break;
            case 'Название':{
                by='title'
             
            }
                break;
            case 'Объём':{
                by='volume'
                
            }
                break;
            case 'Мощность':{
                by='power'
                
            }
                break;
            case 'Материал':{
                by='material'
                
            }
                break;

        
            default:
                break;
        }
        sendReq('GET', `api/teapot/sort/${by}/${order}`).then((data)=>{

     
            for(i in data){
              
                document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-volume">${data[i].volume}</span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-power">${data[i].power}</span>`
                document.querySelector(`.row${i}`).innerHTML += `<span class="value col-material">${data[i].material}</span>`
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
            case 'Объём':{
                by='col-volume'
                
            }
                break;
            case 'Мощность':{
                by='col-power'
                
            }
                break;
            case 'Материал':{
                by='col-material'
                
            }
                break;

        
            default:
                break;
        }
        const selectedCols = document.querySelectorAll(`.${by}`)
        console.log(document.querySelector(`.${by}`).textContent)
        console.log('поиск идет')
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
                by='title'
             
            }
                break;
            case 'Объём':{
                by='volume'
                
            }
                break;
            case 'Мощность':{
                by='power'
                
            }
                break;
            case 'Материал':{
                by='material'
                
            }
                break;

        
            default:
                break;
        }
        if(searchCheck.checked){
            console.log('чек чек')
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `api/teapot/select/${by}/${searchProps.value}`).then((data)=>{
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-volume">${data[i].volume}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-power">${data[i].power}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-material">${data[i].material}</span>`
                    }
            })
        }else{
            document.querySelector('.teapots').innerHTML = ''
            sendReq('GET', `api/teapot/search/${by}/${searchProps.value}`).then((data)=>{
                console.log(data)
                for(i in data){
                    document.querySelector('.teapots').innerHTML += `<p class= "row row${i} unselected"></p>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-id" id="${data[i].id}">${data[i].id}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-title">${data[i].title}<span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-volume">${data[i].volume}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-power">${data[i].power}</span>`
                    document.querySelector(`.row${i}`).innerHTML += `<span class="value col-material">${data[i].material}</span>`
                    }
            })
        }

      
    })
})