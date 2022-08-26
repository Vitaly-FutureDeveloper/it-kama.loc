import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import cn from "classnames";

import s from "./login.module.css"
import loginBtnBackground from "../assets/img/iconLogin.png";
import {AppStateType} from "../redux/redux-store";


const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType & LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) =>{

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{createField<LoginFormValuesTypeKeys>("email", "email", [required], Input, {type: "text"})}

				{createField<LoginFormValuesTypeKeys>("password", "password", [required], Input, {type: "password"})}

				{createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "Remember Me")}

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
				<button  className={cn('btn', s.loginBtn)}
								 style={{
					backgroundImage: `url(${loginBtnBackground})`,
				}}></button>
			</div>
		</form>
	);
};


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
	// a unique name for the form
	form: 'login'
})(LoginForm);


type MapStatePropsType = {
	isAuth:boolean,
	captchaUrl:string | null,
};
type MapDispatchPropsType = {
	login: (email:string, password:string, rememberMe:boolean, captcha:string) => void,
	logout: (email:string, password:string, rememberMe:boolean, captcha:string) => void,
};
type LoginFormOwnProps = {
	captchaUrl:string | null,
};
type LoginFormValuesType = {
	email:string,
	password:string,
	rememberMe:boolean,
	captcha:string,
};
type LoginFormValuesTypeKeys = Extract <keyof LoginFormValuesType, string>;


type PropsType = MapStatePropsType & MapDispatchPropsType;

const Login:React.FC<PropsType> = (props) =>{
	const onSubmit = (formData:any) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};

	if (props.isAuth){
		return <Redirect to={"/Profile"} />
	}

	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
	</div>;
};

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
	return {
		isAuth: state.auth.isAuth,
		captchaUrl: state.auth.captchaUrl,
	}
};

const mapDispatchToProps:MapDispatchPropsType = {
	login,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);