const baseUrl = 'http://localhost:4000'
let currentId = null;

$(document).ready(function() {
    authetication()
});

function authetication() {
    if(localStorage.token){
        $('#home-page').show()
        fetchList()
        $('#navbar').show()
        $('#login-form').hide()
        $('#register-form').hide()
        $('#create-form').hide()
        $('#edit-form').hide()
        $('#boredom-form').hide()
        $('.message').empty();
    } else {
        $('#login-form').show()
        $('#home-page').hide()
        $('#navbar').hide()
        $('#register-form').hide()
        $('#create-form').hide()
        $('#edit-form').hide()
        $('#boredom-form').hide()
        $('.message').empty();
    }
}

function registerBtn() {
    $('.message').empty()
    $('#register-form').show()
    $('#home-page').hide()
    $('#login-form').hide()
    $('#create-form').hide()
    $('#edit-form').hide()
    $('#boredom-form').hide()
    $('#navbar').hide()
}

function addBtn (){
    $('#create-form').show()
    $('#home-page').hide()
    $('#edit-form').hide()
    $('#boredom-form').hide()
    $('.message').empty();
}

function homeBtn (){
    $('#home-page').show()
    $('#create-form').hide()
    $('#edit-form').hide()
    $('#boredom-form').hide()
    $('.message').empty();
}

function logout() {
    localStorage.clear()
    sessionStorage.clear()
    authetication()
    signOut()
}

function login() {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    $.ajax({
        url: `${baseUrl}/login`,
        method: `POST`,
        data: {
            email,
            password
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token);
            authetication()
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p class=" text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
        .always(() => {
            email = $('#email-login').val()
            password = $('#password-login').val()
        })
}

function register (){
    event.preventDefault();
    let name = $('#fullname').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()

    $.ajax({
        url: `${baseUrl}/register`,
        method: "POST",
        data: {
            name,
            email,
            password
        }
    })
        .done(data => {
            authetication()
        })
        .fail(err => {
            //console.log(err)
            $('.message').empty();
            $('.message').append(`
                <p class="alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
        .always(() => {
            name = $('#fullname').val()
            email = $('#email-login').val()
            password = $('#password-login').val()
        })
}

function fetchList(){
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/`,
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            //console.log(data.todos)
            $('.list-group').empty();
            data.todos.forEach(todo => {
                $('.list-group').append(`
                <div class="row justify-content-center" data-todoid="${todo.id}">
                    <div class="col-7">
                        <div style="cursor:pointer" class="list-group-item list-group-item-action rounded-lg" onclick="editTodo(${todo.id})">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${todo.title}</h5>
                                <small>${todo.status}</small>
                            </div>
                            <p class="mb-1">${todo.description}</p>
                            <small>Due date: ${todo.due_date.substring(0,10)}</small>
                        </div>
                    </div>
                    <div class="col-1">
                        <img src="https://img.icons8.com/ios/20/000000/trash.png"  class="my-5" onclick="remove(${todo.id})" style="cursor: pointer;"/>
                    </div>
                </div>
                `)
            });
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
            `)
        })
}

function addSubmit (event) {
    event.preventDefault();
    let title = $('#title-add').val()
    let description = $('#description-add').val()
    let status = $('#status-add').val()
    let due_date = $('#dueDate-add').val()

    $.ajax({
        url: `${baseUrl}/todos/add`,
        method: 'POST',
        headers: {
            token: localStorage.token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(data => {
            //console.log(data)
            authetication();
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p class="text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
        .always(() => {
            title = $('#title-add').val()
            description = $('#description-add').val()
            status = $('#status-add').val()
            due_date = $('#dueDate-add').val()
        })
}

function editTodo(id){
    $('#home-page').hide()
    $('#edit-form').show()
    currentId = id;

    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: 'GET',
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            title = $('#title-edit').val(data.todo.title)
            description = $('#description-edit').val(data.todo.description)
            status = $('#status-edit').val(data.todo.status)
            due_date = $('#dueDate-edit').val(data.todo.due_date.substring(0,10))
        })
        .fail(err => {
            $('.message').append(`
                <p class="text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
}

function editSubmit (event) {
    event.preventDefault();
    let title = $('#title-edit').val()
    let description = $('#description-edit').val()
    let status = $('#status-edit').val()
    let due_date = $('#dueDate-edit').val()

    $.ajax({
        url: `${baseUrl}/todos/${currentId}`,
        method: 'PUT',
        headers: {
            token: localStorage.token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(data => {
            // console.log(data)
            homeBtn();
            replaceTodo(data);
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p class="text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
}

function remove (id) {
    bootbox.confirm("Do you really want to delete record?", function(result) {
        if(result){
            $.ajax({
                url: `${baseUrl}/todos/${id}`,
                method: 'DELETE',
                headers: {
                    token: localStorage.token
                }
            })
                .done(data => {
                    homeBtn();
                    removeTodo(id)
                })
                .fail(err => {
                    $('.message').append(`
                        <p class="alert alert-warning">${err.responseJSON.msg}</p>
                    `)
                })
        }
    })
    
}

function boredBtn(){
    $('#home-page').hide()
    $('#create-form').hide()
    $('#edit-form').hide()
    $('#boredom-form').show()

    $.ajax({
        url: `${baseUrl}/boredom/activity`,
        method: 'GET',
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            //console.log(data)
            title = $('#title-boredom').val(data.activity.type)
            description = $('#description-boredom').val(data.activity.activity)
            status = $('#status-boredom').val('pending')
            due_date = $('#dueDate-boredom').val(new Date().toISOString().slice(0,10))
        })
        .fail(err => {
            $('.message').append(`
                <p class="text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
}

function randomSubmit(event){
    event.preventDefault();
    $('#home-page').hide()
    $('#create-form').hide()
    $('#edit-form').hide()
    $('#boredom-form').show()
    let type = $('#type').val()

    $.ajax({
        url: `${baseUrl}/boredom/activity/${type}`,
        method: 'GET',
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            //console.log(data)
            title = $('#title-boredom').val(data.activity.type)
            description = $('#description-boredom').val(data.activity.activity)
            status = $('#status-boredom').val('pending')
            due_date = $('#dueDate-boredom').val(new Date().toISOString().slice(0,10))
        })
        .fail(err => {
            $('.message').append(`
                <p class="text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
}

function boredomSubmit (event) {
    event.preventDefault();
    let title = $('#title-boredom').val()
    let description = $('#description-boredom').val()
    let status = $('#status-boredom').val()
    let due_date = $('#dueDate-boredom').val()

    $.ajax({
        url: `${baseUrl}/todos/add`,
        method: 'POST',
        headers: {
            token: localStorage.token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(data => {
            //console.log(data)
            homeBtn();
            fetchList();
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p class="text-center alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
}

function onSignIn(googleUser) {

    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: `${baseUrl}/googlelogin`,
        method: 'POST',
        data: {
            id_token
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            authetication()
        })
        .fail(err => {
            $('.message').append(`
                <p class="alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function removeTodo(todoId){
    $(`div[data-todoid="${todoId}"]`).remove();
}

function replaceTodo(todo){
    // console.log(todo, currentId, '=======Replace')
    $(`div[data-todoid="${currentId}"]`).replaceWith(`
    <div class="row justify-content-center" data-todoid="${currentId}">
        <div class="col-7">
            <div style="cursor:pointer" class="list-group-item list-group-item-action rounded-lg" onclick="editTodo(${currentId})">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${todo.todo.title}</h5>
                    <small>${todo.todo.status}</small>
                </div>
                <p class="mb-1">${todo.todo.description}</p>
                <small>Due date: ${todo.todo.due_date}</small>
            </div>
        </div>
        <div class="col-1">
            <img src="https://img.icons8.com/ios/20/000000/trash.png"  class="my-5" onclick="remove(${currentId})" style="cursor: pointer;"/>
        </div>
    </div>
    `)
}