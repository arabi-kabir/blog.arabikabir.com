class AppUrl {
    static baseUrl = `${process.env.REACT_APP_UPLOAD_URL}`

    static authSignin = this.baseUrl + '/auth/sign-in'
    static authSignup = this.baseUrl + '/auth/sign-up'
    static validateToken = this.baseUrl + '/auth/validate-token'
    static myProfile = this.baseUrl + '/auth/user-profile'

    static post = this.baseUrl + '/post'
}

export default AppUrl