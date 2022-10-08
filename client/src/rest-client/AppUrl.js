class AppUrl {
    static baseUrl = `${process.env.REACT_APP_UPLOAD_URL}`

    static authSignin = this.baseUrl + '/auth/sign-in'
    static authSignup = this.baseUrl + '/auth/sign-up'
}

export default AppUrl