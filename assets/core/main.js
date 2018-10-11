//========== CONTROLLER FUNCTIONS ==========

// sends post request to server to create
function controllerCreate(controller) {
    const formData = getFormData(`${controller}-new-form`)
    axios.post(`/${controller}`, formData).then((res) => {
        window.location.href = `/${controller}?_id=${res.data._id}`
    }).catch((error) => {
        console.error(error.message)
    })
}
//^^^^^^^^^^ CONTROLLER FUNCTIONS ^^^^^^^^^^

//========== HELPER FUCTIONS ==========

// formData helper function to return form data as a json object from form id
function getFormData(id) {
    const formElements = document.getElementById(id).elements;
    let result = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            result[formElements[i].name] = formElements[i].value;
    }
    return result
}
//^^^^^^^^^^ HELPER FUNCTIONS ^^^^^^^^^^

//========== CHAT ==========

// Open our socket for chat for each client
var socket = io()

// called when the server emits a message event
socket.on('message', function(data) {
    $('#chat-toggle-btn').css("border-style", "solid")
    $('#chat-toggle-btn').css("border-color", "white")
    setTimeout(function() {
        $('#chat-toggle-btn').css("border-style", "none")
    }, 1000)
    let row = $("<tr />").appendTo('#chat-messages')
    $("<td />", { text: data.screenName }).appendTo(row)
    $("<td />", { text: data.message }).appendTo(row)
    document.getElementById('chat-messages').scrollTop = 10000
})

function sendChatMessage() {
    let message = $('#chat-typed-message').val()
    socket.emit('message', message)
    $('#chat-typed-message').val('')
}

$('html').click(function() {
    $('#chat-box').hide()
})

$('#chat-box').click(function(event) {
    event.stopPropagation()
})

$('#chat-toggle-btn').click(function(event) {
    event.stopPropagation()
    axios.get('/chats').then((res) => {
        for (var i = 0; i < res.data.length; i++) {
            let row = $("<tr />").appendTo('#chat-messages')
            $("<td />", { text: res.data[i].screenName }).appendTo(row)
            $("<td />", { text: res.data[i].message }).appendTo(row)
        }
        document.getElementById('chat-messages').scrollTop = 10000
    })
    $('#chat-box').toggle()
})
//^^^^^^^^^^ CHAT ^^^^^^^^^^

//========== MEMBERS ==========

function membersRegister() {
    let tmz = Intl.DateTimeFormat().resolvedOptions().timeZone
    $('#timezone').val(tmz)
    const formElements = document.getElementById("registerForm").elements;
    let member = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            member[formElements[i].name] = formElements[i].value;
    }

    if(member['password'] != member['passwordConfirm']) {
        $("#registerFormPassword").val("")
        $("#registerFormConfirmPassword").val("")
        $("#registerFormPassword").addClass("is-invalid")
        $("#registerFormConfirmPassword").addClass("is-invalid")
        $("#registerFormConfirmPasswordInfo").text("Passwords must match!")
        return
    }

    axios.post("/members", member).then(function(res) {
        if(res.data.reasons) {
            for(var i = 0; i < res.data.reasons.length; i++) {
                if(res.data.reasons[i].includes("Screen")) {
                    $("#registerFormScreenName").addClass("is-invalid")
                    $("#registerFormScreenNameInfo").text(res.data.reasons[i])
                }
                if(res.data.reasons[i].includes("Email")) {
                    $("#registerFormEmail").addClass("is-invalid")
                    $("#registerFormEmailInfo").text(res.data.reasons[i])
                }
                if(res.data.reasons[i].includes("banned")) {
                    $("#registerFormConfirmPassword").addClass("is-invalid")
                    $("#registerFormConfirmPasswordInfo").text(res.data.reasons[i])
                }
            }
        } else {
            window.location.href = "/"
        }
    }).catch(e => { console.log(e) })
}

function membersLogin() {
    const formElements = document.getElementById("loginForm").elements;
    let member = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            member[formElements[i].name] = formElements[i].value;
    }

    axios.post("/members/login", member).then(function(res) {
        if(res.data.reason) {
            $("#loginPassword").val("")
            $("#loginInfo").text(res.data.reason)
            $("#loginInfo").show()
        } else {
            $("#loginInfo").hide()
            location.reload()
        }
    }).catch(e => { console.log(e) })
}

function membersLogout() {
    axios.post("/members/logout").then(function(res) {
        location.reload()
    }).catch(e => { console.log(e) })
}

function resetRegisterFields() {
    $("#registerFormPassword").removeClass("is-invalid")
    $("#registerFormConfirmPassword").removeClass("is-invalid")
    $("#registerFormConfirmPasswordInfo").text("")
    $("#registerFormEmail").removeClass("is-invalid")
    $("#registerFormEmailInfo").text("")
    $("#registerFormScreenName").removeClass("is-invalid")
    $("#registerFormScreenNameInfo").text("")
}
//^^^^^^^^^^ MEMBERS ^^^^^^^^^^
