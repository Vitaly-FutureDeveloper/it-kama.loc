import React from "react";
import s from './users.module.css';
import userPhoto from '../../assets/img/im.png';
import {NavLink} from "react-router-dom";
import cn from "classnames";
import SpinHypnotic from "../common/spinners/SpinHypnotic";
import {UsersType} from "../../types/types";


type PropsType = {
	user:UsersType,
	followingInProgress:Array<number>,
	follow: (userId:number) => void,
	unfollow: (userId:number) => void,
};
const User:React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
	return (
		<div>
				<span>
					<div>
						<NavLink to={`/Profile/${user.id}`}>
							{user.photos ?
								<img className={s.usersPhoto} src={ user.photos.small || userPhoto } />
								:
								<SpinHypnotic />
							}
						</NavLink>
					</div>

					<div>

						{ user.followed ?

							<button className={cn('btn', s.btnUnFollow)} disabled={followingInProgress.some(id => id === user.id)}
											onClick={ () => {
								unfollow(user.id);
							}}>Убрать из друзей</button>

							:

							<button className={cn('btn', s.btnFollow)} disabled={followingInProgress.some(id => id === user.id)}
								onClick={ () => {
									follow(user.id);
								}}>В друзья</button>
						}

					</div>

				</span>
				<span>
					<span>
						<div>{user.name}</div>
						<div>{user.status}</div>
					</span>
					<span>
						<div>{"user.location.city"}</div>
						<div>{"user.location.country"}</div>
					</span>
				</span>
			</div>


	);

};

export default User;