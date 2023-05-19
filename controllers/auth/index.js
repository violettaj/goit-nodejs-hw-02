const register = require('./register')
const login = require('./login')
const currentUser = require('./currentUser')
const logout = require('./logout')
const setAvatar = require('./updateAvatar')

module.exports = {
    register,
    login,
    currentUser,
    logout,
    setAvatar
}