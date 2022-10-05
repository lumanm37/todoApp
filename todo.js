document.querySelector('#modeBtn').addEventListener('click',function(){
    document.body.classList.toggle('dark')
})

document.querySelectorAll('.checkB').forEach(item => {
    item.addEventListener('click', event => {
        event.target.parentElement.classList.toggle('checkedTodo')
        event.target.parentElement.nextElementSibling.classList.toggle('done')
    })
  })
