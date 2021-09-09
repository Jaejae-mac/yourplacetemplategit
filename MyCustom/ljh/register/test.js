var main_vue = new Vue({
    el: '#main_vue',
    data: {
        name: '',
        name_error: '',
        email: '',
        email_error: '',
        referee: '',
        nice_auth: '본인인증을 진행해 주세요.',
        nice_error: '',
        auth_info: false,
        password: '',
        password_error: '',
        confirm_password: '',
        confirm_password_error: '',
        register_path: -1,
        register_path_title: '',
        register_path_etc: '',
        nice_name: '',
        nice_birth: '',
        nice_phone: '',
        nice_gender: '',
        nice_national: '',
        agree_personal: false,
        agree_service: false,
        email_reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    },
    methods: {
        is_register: function () {
            if (this.nice_name === '') {
                return false
            }
            if (this.name === '' || this.name_error !== '') {
                return false
            }
            if (this.email === '' || this.email_reg.test(this.email) === false || this.email_error !== '') {
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
        },
        register: function () {
            if (this.is_register() === true) {
                $('.request').css('display', 'none')
                window.axios.post(api2_url + '/user/register', this.$data).then(function (response) {
                    hourplace_v2.log(api2_url + '/user/register', response.data)
                    if (response.data.error === '') {
                        if (response.data.result.coupon !== undefined) {
                            window.location.href = '/register/done?coupon_id=' + response.data.result.coupon.user_coupon_id
                        } else {
                            window.location.href = '/register/done'
                        }
                    } else {
                        $('.request').css('display', 'flex')
                        hourplace_v2.toast(response.data.error)
                    }
                }).catch(function (error) {
                    hourplace_v2.log('', error)
                    $('.request').css('display', 'flex')
                })
            }
        },
    },
    watch: {
        email: function (val, oldVal) {
            if ($.trim(this.email) === '') {
                main_vue.email_error = ''
            }
            if (this.email_reg.test(this.email)) {
                return window.axios.get(api2_url + '/user/email/' + this.email).then(function (response) {
                    hourplace_v2.log(api2_url + '/user/email/' + main_vue.email, response.data)
                    if (response.data.result.email === main_vue.email) {
                        if (response.data.result.use === 'Y') {
                            main_vue.email_error = ''
                        } else {
                            main_vue.email_error = '사용 중인 이메일 주소입니다.'
                        }
                    }
                })
            } else {
                this.email_error = ''
            }
        },
        name: function (val, oldVal) {
            if ($.trim(this.name) === '') {
                main_vue.name_error = ''
            } else {
                return window.axios.post(api2_url + '/guest/name', { name: this.name }).then(function (response) {
                    hourplace_v2.log(api2_url + '/guest/name', response.data)
                    if (response.data.result.name === main_vue.name) {
                        if (response.data.result.use === 'Y') {
                            main_vue.name_error = ''
                        } else {
                            main_vue.name_error = '사용 중인 닉네임 입니다.'
                        }
                    }
                })
            }
        },
        password: function (val, oldVal) {
            if (this.password.length > 7) {
                this.password_error = ''
            } else {
                this.password_error = '영문/숫자 조합 8-20자로 입력하세요'
            }
            if (this.password_error === '' && this.confirm_password.length > 0) {
                if (this.password === this.confirm_password) {
                    this.confirm_password_error = ''
                } else {
                    this.confirm_password_error = '비밀번호가 일치하지 않습니다.'
                }
            }
        },
        confirm_password: function (val, oldVal) {
            if (this.password_error === '' && this.password === this.confirm_password) {
                this.confirm_password_error = ''
            } else {
                this.confirm_password_error = '비밀번호가 일치하지 않습니다.'
            }
        },
    },
    mounted: function () {
        this.referee = hourplace_v2.getCookie('referee')
    },
})

function show_register_path_select() {
    $('body').addClass('modal-open')
    $('.register_path_select').show()
}

function close_register_path_select() {
    $('.register_path_select').hide()
    $('body').removeClass('modal-open')
}

function nice_error(error) {
    main_vue.nice_error = error
}

function nice_success(nice) {
    main_vue.phone = nice.nice_phone
    main_vue.nice_name = nice.nice_name
    main_vue.nice_birth = nice.nice_birth
    main_vue.nice_phone = nice.nice_phone
    main_vue.nice_gender = nice.nice_gender
    main_vue.nice_national = nice.nice_national
    main_vue.nice_auth = nice.nice_phone
}

function toggle_auth_info() {
    if ($('.auth_info').is(':visible')) {
        h_hide_popup('.auth_info')
        // $('.booking_type').hide()
    } else {
        h_show_popup('.auth_info')
        // $('.booking_type').show()
    }
}
