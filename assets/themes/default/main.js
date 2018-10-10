$('html').click(function() {
    $('#chat-box').hide()
})

$('#chat-box').click(function(event) {
    event.stopPropagation()
})

$('#chat-toggle-btn').click(function(event) {
    event.stopPropagation()
    $('#chat-box').toggle()
})

function clickMe() {
    alert('Javascript works!')
}

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
