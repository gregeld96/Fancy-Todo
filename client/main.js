const baseUrl = 'http://localhost:4000'
let currentId = null;

$(document).ready(function() {
    authetication()
});

function authetication() {
    if(localStorage.token){
        $('#home-page').show()
        $('#login-form').hide()
        $('#register-form').hide()
        $('#create-form').hide()
        $('#edit-form').hide()
        $('.message').empty();
        fetchList()
    } else {
        $('#home-page').hide()
        $('#login-form').show()
        $('#register-form').hide()
        $('#create-form').hide()
        $('#edit-form').hide()
        $('.message').empty();
    }
}

function registerBtn() {
    $('.message').empty()
    $('#home-page').hide()
    $('#login-form').hide()
    $('#register-form').show()
    $('#create-form').hide()
    $('#edit-form').hide()
}

function addBtn (){
    $('#home-page').hide()
    $('#create-form').show()
    $('.message').empty();
}

function homeBtn (){
    $('#home-page').show()
    $('#create-form').hide()
    $('#edit-form').hide()
    $('.message').empty();
}

function logout() {
    localStorage.clear()
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
            //console.log(data.token)
            localStorage.setItem('token', data.token);
            authetication()
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
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
            $('.message').empty();
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
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
                <div class="row">
                    <div class="col-7">
                        <div style="cursor:pointer" class="list-group-item list-group-item-action" onclick="editTodo(${todo.id})">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${todo.title}</h5>
                                <small>${todo.status}</small>
                            </div>
                            <p class="mb-1">${todo.description}</p>
                            <small>Due date: ${todo.due_date}</small>
                        </div>
                    </div>
                    <div class="col-3">
                        <button onclick="remove(${todo.id})">
                            Delete
                        </button>
                    </div>
                </div>
                `)
            });
        })
        .fail(err => {
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
            `)
        })
}

function addSubmit () {
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
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
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
            due_date = $('#dueDate-edit').val(data.todo.due_date)
        })
        .fail(err => {
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
            `)
        })
}

function editSubmit () {
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
            console.log(data)
            authetication();
        })
        .fail(err => {
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
            `)
        })
}

function remove (id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            authetication()
        })
        .fail(err => {
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
            `)
        })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

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
                <p>${err.responseJSON.msg}</p>
            `)
        })
  }

  function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }