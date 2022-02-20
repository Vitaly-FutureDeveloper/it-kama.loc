import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";

const LoginForm = (props) =>{
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name={"login"} validate={[required]} placeholder="login" component={Input} type="text"/>
			</div>
			<div>
				<Field name={"password"} validate={[required]} placeholder="password" component={Input} type="text"/>
			</div>
			<div>
				<Field name={"rememberMe"} component={"input"} type="checkbox"/> Remember me
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