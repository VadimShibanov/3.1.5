const url = '/api/admin/'
const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}]

const showNavbarInfo = (user) => {
    document.getElementById("top-panel").innerHTML =
        `<h5>${user.username} with roles: ${user.rolesToString}</h5>`
}
fetch('api/user/')
    .then(response => response.json())
    .then(data => showNavbarInfo(data))
    .catch(error => console.log(error))

let usersInfo = ''
const showUsers = (users) => {
    const container = document.getElementById("tbody-admin")
    const arr = Array.from(users)
    arr.forEach(user => {
        usersInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${user.rolesToString}</td>
            <td class="text text-white">
                <a class="btnEdit btn btn-info">Edit</a>
            </td>
            <td class="text text-white">
                <a class="btnDelete btn btn-danger">Delete</a>
            </td>
        </tr>
        `
    })
    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}

let userInfo = ''
const showUser = (user) => {
    const container = document.getElementById("tbody-user-info")
    userInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${user.rolesToString}</td>
        </tr>`
    container.innerHTML = userInfo
}
fetch('api/user/')
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))


//Create user
const formNew = document.getElementById('formNewUser')
const name = document.getElementById('name')
const lastname = document.getElementById('lastname')
const age = document.getElementById('age')
const username = document.getElementById('username')
const password = document.getElementById('password')
const roles = document.getElementById('my_roles')
let option = ''

btnNewUser.addEventListener('click', () => {
    console.log('btnNewUser click')
    name.value = ''
    lastname.value = ''
    age.value = ''
    username.value = ''
    password.value = ''
    roles.innerHTML = `
        <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
        <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
        `
    option = 'newUser'
})

formNew.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('my_roles'))
    console.log(
        username.value, name.value, lastname.value, password.value, listRoles
    )
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            lastname: lastname.value,
            age: age.value,
            username: username.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    $('.nav-tabs a[href="#usersTable"]').tab('show')
})

// Edit modal
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('modalEdit')

const idEdit = document.getElementById('idEditUser')
const usernameEdit = document.getElementById('editUsername')
const nameEdit = document.getElementById('editName')
const lastnameEdit = document.getElementById('editLastname')
const passwordEdit = document.getElementById('editPassword')
const ageEdit = document.getElementById('editUserAge')
const rolesEdit = document.getElementById('editUserRoles')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            console.log("btnEditClick")
            handler(e)
        }
    })
}

let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idEdit.value = user.id
        usernameEdit.value = user.username
        nameEdit.value = user.name
        lastnameEdit.value = user.lastname
        ageEdit.value = user.age
        passwordEdit.value = ''
        rolesEdit.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('editUserRoles'))
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            username: usernameEdit.value,
            name: nameEdit.value,
            lastname: lastnameEdit.value,
            password: passwordEdit.value,
            age: ageEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

//Delete modal
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')

const idDelete = document.getElementById('idDeleteUser')
const usernameDelete = document.getElementById('usernameDeleteUser')
const nameDelete = document.getElementById('nameDeleteUser')
const ageDelete = document.getElementById('ageDeleteUser')
const lastnameDelete = document.getElementById('lastnameDeleteUser')
const rolesDelete = document.getElementById('deleteUserRoles')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        usernameDelete.value = user.username
        nameDelete.value = user.name
        ageDelete.value = user.age
        lastnameDelete.value = user.lastname
        rolesDelete.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show()
    }
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array
}

