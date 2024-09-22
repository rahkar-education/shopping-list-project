const addItem = document.querySelector('.form-input')
const addbtn = document.querySelector('.btn')
const itemList = document.querySelector('.items')
const deletBtns = document.querySelectorAll('.remove-item')
const clearBtn = document.querySelector('.btn-clear')
const itemFilter = document.getElementById('filter')
let newItemName = ''
let isEditeMode = false

function displayItems(){
    const ItemsFromStorage = getItemsFromStorage()
    ItemsFromStorage.forEach(item => addItemToDom(item))
    checkUI()
}


function onkeypress(e){
    newItemName = e.target.value
    
}
function addNewItem(e){
    e.preventDefault()
    if(newItemName ===''){
        alert('please add an item')
    }else{
        createNewItem(newItemName)
    }
    


}
function createNewItem(itemName){
    if(isEditeMode){
        const itemToEdit = itemList.querySelector('.edit-mode')
        deleteItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditeMode = false
    }else{
        if(checkIfItemExists(itemName)){
            alert('Item already exists!')
            checkUI()
            return
        }
    }
    addItemToDom(itemName)
    addItemToStorage(itemName)
    checkUI()

    addItem.value = ''
}

function addItemToDom(item){
    const newItem = document.createElement('li')

    const itembtn = document.createElement('button')
    itembtn.className = "remove-item btn-link text-red"

    const icon = document.createElement('i')
    icon.className = "fa-solid fa-xmark"

    newItem.innerText = item
    itembtn.appendChild(icon)
    newItem.appendChild(itembtn)
    itemList.appendChild(newItem)
}

function addItemToStorage(item){
    const ItemsFromStorage = getItemsFromStorage();

    

    ItemsFromStorage.push(item)

    localStorage.setItem('items', JSON.stringify(ItemsFromStorage))
}

function getItemsFromStorage(){
    let ItemsFromStorage;

    if(localStorage.getItem('items') === null){
        ItemsFromStorage = []
    }else{
        ItemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return ItemsFromStorage
}

function onclick(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        deleteItem(e.target.parentElement.parentElement)
    }else{
        setItemToEdite(e.target)
    }
}

function checkIfItemExists(item){
    const ItemsFromStorage  = getItemsFromStorage()
    return ItemsFromStorage.includes(item)
}

function setItemToEdite(item){
    isEditeMode = true
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))
    if(item.className !== "items"){
        item.classList.add('edit-mode')
        addbtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
        addbtn.style.backgroundColor = '#228B22'
        addItem.value = item.textContent
        newItemName = item.textContent
    }
}

function deleteItem(item){
    {
        if(confirm('Are you sure?')){
            item.remove()
            deleteItemFromStorage(item.textContent)
            checkUI()
        }
    }
}

function deleteItemFromStorage(item){
    let ItemsFromStorage = getItemsFromStorage()
    ItemsFromStorage = ItemsFromStorage.filter(i => i !== item)
    localStorage.setItem('items' , JSON.stringify(ItemsFromStorage))
}

function clearItems(){
    while(itemList.firstChild){
    itemList.firstChild.remove()
    }
    localStorage.removeItem('items')
    checkUI()
}
function checkUI(){
    addItem.value = ''
    const items = document.querySelectorAll('li')
    if(items.length === 0){
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    }else{
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
    addbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    addbtn.style.backgroundColor = '#333'
    isEditeMode = false
}

function filterItems(e){
    const items = document.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase()
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        }else{
            item.style.display = 'none'
        }
    })
}

function init(){
addItem.addEventListener('input' , onkeypress)
addbtn.addEventListener('click', addNewItem)
itemList.addEventListener('click', onclick)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)
checkUI()
}

init()