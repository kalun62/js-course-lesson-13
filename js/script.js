'use strict';

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let todoData = []

const todoSave = function() {
    localStorage.setItem('todo', JSON.stringify(todoData))
}

const todoLoad = function() {
    let result = JSON.parse(localStorage.getItem('todo'))

    if (result === null){
        result = []
    }

    return result
}

todoData = todoLoad()

const render = function(){
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''
    todoData.forEach(function(item, index){
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
       ' <div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
		'</div>'

        if(item.completed) {
            todoCompleted.append(li)
        } else{
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function(){
            item.completed = !item.completed
            todoSave()
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function(){
            todoData.splice(index, 1)
            todoSave()
            render()
        }) 
    })
}

todoControl.addEventListener('submit', function(event){
    event.preventDefault()

    const newTodo = {
        text: headerInput.value,
        completed: false
    }
    if(headerInput.value !== ''){
        todoData.push(newTodo)
        headerInput.value = ''
        render() 
    }
    todoSave()
})

render()