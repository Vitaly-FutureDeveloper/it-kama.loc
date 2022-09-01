import React from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {InjectedFormProps, reduxForm} from "redux-form";

import {createField, GetStringKeys, Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {login} from "../redux/auth-reducer";
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
})
//@ts-ignore
(LoginForm);
// todo: types for reduxforms



type LoginFormOwnProps = {
	captchaUrl:string | null,
};
type LoginFormValuesType = {
	email:string,
	password:string,
	rememberMe:boolean,
	captcha:string,
};
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;


type PropsType = {};

const LoginPage:React.FC<PropsType> = (props) =>{

	const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl);
	const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);
	const dispatch = useDispatch();

	const onSubmit = (formData:any) => {
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
	};

	if (isAuth){
		return <Redirect to={"/Profile"} />
	}

	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
	</div>;
};

export default LoginPage;

