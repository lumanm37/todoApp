let todoArr=[
    {item:'Complete Todo App on Frontend Mentor',id:1,isComplete:false},
    {item:'Pick up groceries',id:2,isComplete:false},
    {item:'Read for 1 hour',id:3,isComplete:false},
    {item:'10 minutes meditation',id:4,isComplete:false},
    {item:'Jog around the park 3x',id:5,isComplete:false},
    {item:'complete online JavaSript course',id:6,isComplete:false}
]


const listContainer=document.getElementById('listContainer');
let itemLeft=document.getElementById('itemLeft');


const onPageLoad=()=>{
    const newEvent=new Event('click');
    // localStorage.removeItem('todoArr');
    // localStorage.clear();
    const allButton=document.querySelector('#allButton')
    if(localStorage.length){
        console.log('itemExist',localStorage.length);
        todoArr=JSON.parse(localStorage.getItem("todoArr"));
        console.log(todoArr);
        allButton.dispatchEvent(newEvent)
           
    }else{
        console.log('nothing exists')
        allButton.dispatchEvent(newEvent)
        // localStorage.setItem("todoArr", JSON.stringify(todoArr));
    }
}

const idGenerator=()=>{
    // sort,reassign and return length+1
    // or checkIf it includes an existing id;
}

const noOfUncompleted=()=>{
    let unCompleted=todoArr.filter(item =>item.isComplete===false)
    console.log(unCompleted.length)
    return unCompleted.length;
}

const onAdd=(event)=>{
    let newId=todoArr.length+1;
    const inputText=event.target.value; 
    if(inputText.trim().length>0){ //test trim
        const itemMade=makeItem(inputText,newId,false);
        listContainer.prepend(itemMade);
        event.target.value='';
        todoArr.push({item:inputText.trim(),id:newId,isComplete:false})
        console.log(todoArr)
        
        itemLeft.innerHTML=noOfUncompleted();
    }
}







const onCheckedAsCompleted=(event)=>{ ///think of the efficient way like the dark mode;
    //check item on page
    const bullet= event.target.parentElement
   const labelEle= event.target.parentElement.nextElementSibling
   bullet.classList.toggle('checkedTodo');
   labelEle.classList.toggle('done');

    //check item in array
   const id=labelEle.getAttribute('for')
   const item=labelEle.innerText
   const itemInd=todoArr.findIndex((ele) => ele.id===parseInt(id) &&ele.item===item);
   todoArr[itemInd].isComplete=(todoArr[itemInd].isComplete===true)?false:true;
   itemLeft.innerHTML=noOfUncompleted();
    
}

const onDelete=(event)=>{
    //delete on page
    let itemToDelete= event.target.parentElement
    listContainer.removeChild(itemToDelete);
    const item=event.target.previousSibling.innerText;
    
    //delete in array
    const id=itemToDelete.getAttribute('id')
    const itemInd=todoArr.findIndex((ele) => ele.id===parseInt(id) &&ele.item===item);
    todoArr.splice(itemInd,1)
    itemLeft.innerHTML=noOfUncompleted();
}

 
const onClearCompleted=()=>{
    let completedTasks=document.querySelectorAll('.checkedTodo')
    completedTasks.forEach(ele=>{
        listContainer.removeChild(ele.parentElement)
    })
    
    
    todoArr=todoArr.filter(item =>item.isComplete===false)

}

 

  

  
const onSort=(event)=>{
    document.querySelectorAll('.midBtns').forEach(item => {
        item.style='color:#9495A5'
    })
    event.target.style='color:#3A7CFD;'

     listContainer.innerHTML=''
    const val=(typeof(event.target.getAttribute)==='function')?event.target.getAttribute('id'):'all';
   
    todoArr.sort((a,b)=>(a.id>b.id) ? -1 : 1)
   
    todoArr.forEach((ele)=>{
        
        if(val==='completedButton'){
            // console.log(val);
            if(ele.isComplete===true){
                console.log('isComplete is true');
                const itemMade=makeItem(ele.item, ele.id ,ele.isComplete);
                listContainer.appendChild(itemMade);
            }
        }
        else if(val==='activeButton'){
            // console.log(val)
            if(ele.isComplete===false){
                const itemMade=makeItem(ele.item, ele.id ,ele.isComplete);
                listContainer.appendChild(itemMade); 
            }
        }
        else{
            // console.log(val)
            const itemMade=makeItem(ele.item, ele.id ,ele.isComplete);
            listContainer.appendChild(itemMade)
        }
       
    })

}
  

  
 
// manufacturer
// const onAddToList=(event)=>{
const makeItem=(item,id,isComplete)=>{
    // const inputText=event.target.value; 

    // if(inputText.length>0){
         let listEle=document.createElement('li');
        listEle.setAttribute('class','item');
        listEle.setAttribute('id',id);
    let spanEle=document.createElement('span');
        spanEle.setAttribute('class','bullet');
        
    let inputEle=document.createElement('input');
        inputEle.setAttribute('type','checkbox');    
        inputEle.setAttribute('class','checkB');    
        inputEle.setAttribute('id',id);

    let labelEle=document.createElement('label');
        labelEle.setAttribute('class','todo');
        if(isComplete===true){
            spanEle.classList.add('checkedTodo');
            labelEle.classList.add('done');
        }
        labelEle.setAttribute('for',id);
        labelEle.innerText=item;

    let imgEle=document.createElement('img');
        imgEle.setAttribute('class','delete');
        imgEle.setAttribute('src','images/icon-cross.svg');
    
    listEle.appendChild(spanEle).appendChild(inputEle)
    listEle.appendChild(labelEle)
    listEle.appendChild(imgEle);

    inputEle.addEventListener('click', onCheckedAsCompleted);
    imgEle.addEventListener('click',onDelete);

    return listEle;

    // listContainer.prepend(listEle)

   
    // event.target.value='';
    // }
   
}



















// listens for new tasks
document.querySelector('#inputText').addEventListener('change',onAdd)

//listens to bullet when checked ///test with input.checked.
document.querySelectorAll('.checkB').forEach(item => { //add to manufaturing
    item.addEventListener('click', onCheckedAsCompleted)
  })

//listens to delete icon  ///test with input.checked.
document.querySelectorAll('.delete').forEach(item => { //add to manufaturing
    item.addEventListener('click',onDelete)
})

// theme(sun/moon) button
document.querySelector('#modeBtn').addEventListener('click',function(){
    document.body.classList.toggle('dark')
})

// clear completed button
document.getElementById('clearButton').addEventListener('click',onClearCompleted)

// sortButtoms
document.getElementById('allButton').addEventListener('click',onSort)
document.getElementById('activeButton').addEventListener('click',onSort)
document.getElementById('completedButton').addEventListener('click',onSort)
window.addEventListener('load',onPageLoad);
window.addEventListener('beforeunload',function(){localStorage.setItem("todoArr", JSON.stringify(todoArr));});