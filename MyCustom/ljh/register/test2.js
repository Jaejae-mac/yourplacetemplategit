var name = '',
    name_error = '',
    email = '',
    email_error = '',
    referee = '',
    nice_auth = '본인인증을 진행해 주세요.',
    nice_error = '',
    auth_info = false,
    password = '',
    password_error = '',
    confirm_password = '',
    confirm_password_error = '',
    register_path = -1,
    register_path_title = '',
    register_path_etc = '',
    nice_name = '',
    nice_birth = '',
    nice_phone = '',
    nice_gender = '',
    nice_national = '',
    agree_personal = false,
    agree_service = false,
    email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

function register() {
    if (this.is_register == true) {

    }
}
function is_register() {
    if (this.nice_name === '') {
        return false
    }
    if (this.name === '' || this.name_error !== '') {
        return false
    }
    if (this.email === '' || this.email_reg.test(this.email) === false || this.email_error != '') {
        return false
    }
    if (this.password.length < 8) {
        return false
    }
    if (this.password !== this.confirm_password) {
        return false
    }
    if (this.register_path === -1) {
        return false
    }
    if (this.register_path === 99 && this.register_path_etc.length === 0) {
        return false
    }
    if (this.agree_service === false) {
        return false
    }
    if (this.agree_personal === false) {
        return false
    }
    return true
}
function h_show_popup(id) {
    if ($(id).css('display') === 'none') {
        $(id).removeClass('h_popup')
        $(id).show()
        $(id).on('click', function (event) {
            event.stopPropagation()
            return false
        })
        setTimeout(() => {
            $(id).addClass('h_popup')
        }, 300)
    } else {
        h_hide_popup(id)
    }
}

function h_hide_popup(id) {
    $(id).hide()
    $(id).removeClass('h_popup')
}
function toggle_auth_info() {
    if ($('auth_info').is(':visible')) {
        h_hide_popup('auth_info')
        // $('booking_type').hide()
    } else {
        h_show_popup('auth_info')
        // $('booking_type').show()
    }
}