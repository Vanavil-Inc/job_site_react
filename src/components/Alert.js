import React, { Component } from 'react';

export default class Alert extends Component {
	constructor() {
		super();
		this.state = {
			success: true
		};
		// this.sampleMethod = this.sampleMethod.bind(this);
	}

	enableMessageView() {
		this.setState({
			success: true
		});
		this.alertTimeout();
	}

	componentDidMount() {
		this.alertTimeout();
	}

	alertTimeout() {
		setTimeout(() => {
			this.setState({
				success: false
			});
		}, 4000);
	}

	render() {
		return (
			<div className={this.state.success ? 'd-block' : 'd-none'}>
				<div className={this.props.className}>
					<strong>{this.props.message} </strong>
				</div>
			</div>
		);
	}
}
