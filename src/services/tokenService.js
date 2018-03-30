export const setToken = token => {
  // set an item in local storage called "token" and set it equal to any value we pass to it
	localStorage.setItem("token", token) // return undefined
};

export const getToken = () => {
  // retrieve our token from local storage
	console.log('getToken', localStorage.getItem("token"))
	return localStorage.getItem("token")
};
export const removeToken = () => {
  // remove our token from local storage
	localStorage.removeItem("token") // return undefined
};
