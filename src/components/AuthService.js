import decode from 'jwt-decode';
import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class AuthService {
	// Initializing important variables
	constructor() {
		// this.domain = 'http://localhost:8081/api'; // Local API server domain
		this.domain = 'http://34.229.17.37:8081/api'; // Live API server domain
		this.fetch = this.fetch.bind(this); // React binding stuff
		this.login = this.login.bind(this);
		this.getProfile = this.getProfile.bind(this);
	}

	login(UserId, Password, deviceWidth) {
		// Get a token from api server using the fetch api
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify({
				UserId,
				Password,
				deviceWidth
			})
		}).then((res) => {
			// console.log('resp     ' + JSON.stringify(res.result));
			if (res.success) {
				// console.log('res.token ' + res.result[0].token);
				this.setToken(res.result[0].token); // Setting the token in localStorage
				localStorage.setItem('success', res.success);
				localStorage.setItem('UserId', res.result[0].UserId);
				localStorage.setItem('UserType', res.result[0].UserType);
				localStorage.setItem('UserName', res.result[0].UserName);
			}
			return Promise.resolve(res);
		});
	}

	loggedIn() {
		// Checks if there is a saved token and it's still valid
		const token = this.getToken(); // GEtting token from localstorage
		return !!token && !this.isTokenExpired(token); // handwaiving here
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				// Checking if token is expired. N
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	}

	setToken(idToken) {
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken);
	}

	getToken() {
		// Retrieves the user token from localStorage
		return localStorage.getItem('id_token');
	}

	logout() {
		// Clear user token and profile data from localStorage
		if (this.getToken() != null) {
			this.sessionTimeout();
		}
		localStorage.removeItem('id_token');
		localStorage.clear();
	}

	getProfile() {
		// Using jwt-decode npm package to decode the token
		return decode(this.getToken());
	}

	sessionTimeout() {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="react-confirm-alert-body w-100">
						<h6 class="text-center mb-4 text-dark font-weight-bold">Session Timeout! Please Login</h6>
						<div class="text-center">
							<button class="btn btn-secondary" onClick={onClose}>
								Close
							</button>
						</div>
					</div>
				);
			},
			closeOnEscape: false,
			closeOnClickOutside: false
		});
	}

	fetch(url, options) {
		// performs api calls sending the required authentication headers
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*'
		};
		// Setting Authorization header
		// Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + this.getToken();
		}

		return fetch(url, {
			headers,
			...options
		})
			.then(this._checkStatus)
			.then((response) => response.json());
	}

	_checkStatus(response) {
		// raises an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) {
			// Success status lies between 200 to 300
			return response;
		} else {
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}
}
