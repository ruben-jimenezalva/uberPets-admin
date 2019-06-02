const TOKEN_KEY = 'Token';
const USER_INFO = 'InfoUser';
const USER_AUTHENTICATED = 'Autenticated';

const parse = JSON.parse;
const stringify = JSON.stringify;


/**
 * Verify that input is not null, empty or undefined
 * @param {String} str 
 */
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}


/**
 * Used to storage token and other data from user
 * these are stored in localStorage or sessionStorage
 */
const auth = {

    set(value, key, isLocalStorage) {
        if (isBlank(value)) {
            return null;
        }
    
        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }
    
        if (sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }
    
        return null;
    },

    /**
     * Returns data from storage
     * @param  {String} key Item to get from the storage
     * @return {String|Object}     Data from the storage
     */
    get(key) {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key)) || null;
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    },


    /**
     * Remove an item from the used storage
     * @param  {String} key [description]
     */
    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    },

    /**
     * Clear all app storage
     */
    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    },


    /**
     * Clear session
     */
    clearSession() {
        if (sessionStorage) {
            sessionStorage.clear();
        }
    },

    getToken(tokenKey = TOKEN_KEY) {
        return auth.get(tokenKey);
    },
    
    getUserInfo(userInfo = USER_INFO) {
        return auth.get(userInfo);
    },

    setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
        return auth.set(value, tokenKey, isLocalStorage);
    },

    setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
        return auth.set(value, userInfo, isLocalStorage);
    },

    // storage only for session
    enableAuthentication(){
        return auth.set(USER_AUTHENTICATED, USER_AUTHENTICATED, false);
    },

    isAuthenticated(){
        if(auth.get(USER_AUTHENTICATED) != null){
            console.log("está autenticado");
        }else{
            console.log("no está autenticado");
        }
        return (auth.get(USER_AUTHENTICATED) != null);
    },

}

export default auth;