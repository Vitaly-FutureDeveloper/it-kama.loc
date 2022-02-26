import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";

import s from "../../src/components/common/FormsControls/FormsControls.module.css"

const LoginForm = (props) =>{
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name={"email"} validate={[required]} placeholder="email" component={Input} type="text"/>
			</div>
			<div>
				<Field name={"password"} validate={[required]} placeholder="password" component={Input} type="text"/>
			</div>
			<div>
				<Field name={"rememberMe"} component={"input"} type="checkbox"/> Remember me
			</div>
			{ props.error && <div className={s.formSummaryError}>
				{props.error}
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