import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../redux/auth-reducer";
import {NavLink, Redirect} from "react-router-dom";

import s from "./login.module.css"
import loginBtnBackground from "../assets/img/iconLogin.png";


const LoginForm = ({handleSubmit, error, captchaUrl}) =>{

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{createField("email", "email", [required], Input, {type: "text"})}

				{createField("password", "password", [required], Input, {type: "password"})}

				{createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember Me")}

				{
					captchaUrl && <img src={captchaUrl} />
				}

				{
					captchaUrl && createField("Антибот", "captcha", [required], Input, {type: "text"})
				}

			</div>
			{ error && <div className={s.formSummaryError}>
				{error}
				</div>
			}
			<div>
				<button  className={`btn ${s.loginBtn}`} style={{
					backgroundImage: `url(${loginBtnBackground})`,
				}}></button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({
	// a unique name for the form
	form: 'login'
})(LoginForm);

const Login = (props) =>{
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};

	if (props.isAuth){
		return <Redirect to={"/Profile"} />
	}

	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
	</div>;
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		captchaUrl: state.auth.captchaUrl,
	}
};

const mapDispatchToProps = {
	login,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);