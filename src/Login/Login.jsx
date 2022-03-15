import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";

import s from "../../src/components/common/FormsControls/FormsControls.module.css"


const LoginForm = (props) =>{
	const {handleSubmit, error} = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				{createField("email", "email", [required], Input, {type: "text"})}

				{createField("password", "password", [required], Input, {type: "password"})}

				{createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember Me")}
			</div>
			{ error && <div className={s.formSummaryError}>
				{error}
			</div>
			}
			<div>
				<button>Login</button>
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
		props.login(formData.email, formData.password, formData.rememberMe)
	};

	if (props.isAuth){
		return <Redirect to={"/Profile"} />
	}

	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit} />
	</div>;
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	}
};

const mapDispatchToProps = {
	login,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);