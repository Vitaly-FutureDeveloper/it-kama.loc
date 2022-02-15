import React from "react";
import {Field, reduxForm} from "redux-form";
import handleSubmit from "redux-form/lib/handleSubmit";

const LoginForm = (props) =>{
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name={"login"} placeholder="login" component="input" type="text"/>
			</div>
			<div>
				<Field name={"password"} placeholder="password" component="input" type="text"/>
			</div>
			<div>
				<Field name={"rememberMe"} component="input" type="checkbox"/> Remember me
			</div>
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
		console.log(formData);
	};
	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit} />
	</div>;
}

export default Login;