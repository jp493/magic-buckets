import React from 'react';
import { removeToken } from "../services/tokenService";

const SignOutButton = props => {
  const logout = () => {
		removeToken();
		props.setUser(null);
		window.location.href = '/'
	};

return (
  <button
		className="btn btn-danger log"
    type="button"
    onClick={logout}
  >
    Log Out
  </button>
)};

export default SignOutButton;
