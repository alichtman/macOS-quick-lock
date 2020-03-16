import React, { Component, Fragment } from "react";
import "./CryptForm.css";

import FileHeader from "../components/FileHeader";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default class CryptForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: "",
			confirmPassword: "",
			displayError: false
		};
	}

	render() {
		const { fileName, onSubmit, onAbort, isDecryption } = this.props;
		const { password, confirmPassword, displayError } = this.state;

		let buttonIconPath, buttonText, errorMessage;
		if (isDecryption) {
			buttonIconPath = "./decryptIcon.png";
			buttonText = "Decrypt";
			errorMessage = "Error: Incorrect password";
		} else {
			buttonIconPath = "./encryptIcon.svg";
			buttonText = "Encrypt";
			errorMessage = "Error: Passwords don't match";
		}

		return (
			<Fragment>
				<FileHeader fileName={fileName} />
				<div className="formBody">
					<Input
						placeholder="Enter password"
						value={password}
						onChange={event =>
							this.setState({ password: event.target.value })
						}
					/>
					{!isDecryption ? (
						<Input
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={event =>
								this.setState({
									confirmPassword: event.target.value
								})
							}
							inErrorMode={displayError}
						/>
					) : null}
					{displayError ? (
						<span className="errorText">{errorMessage}</span>
					) : null}
					<div className="buttonsWrapper">
						<PrimaryButton
							onClick={() => {
								if (isDecryption) {
									onSubmit(password);
									// TODO: handleCrypt should return whether or not the password
									// was valid
								} else if (password === confirmPassword) {
									onSubmit(password);
								} else {
									this.setState({ displayError: true });
								}
							}}
						>
							<img
								className="primaryButtonIcon"
								src={buttonIconPath}
							/>
							<span className="primaryButtonText">
								{buttonText}
							</span>
						</PrimaryButton>
						<SecondaryButton onClick={onAbort}>
							<span className="abortButtonText">Abort</span>
						</SecondaryButton>
					</div>
				</div>
			</Fragment>
		);
	}
}

CryptForm.defaultProps = {
	isDecryption: false
};
