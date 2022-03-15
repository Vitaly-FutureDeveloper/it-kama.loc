import React from "react";
import s from './users.module.css';
import userPhoto from '../../assets/img/im.png';
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, follow, unfollow}) => {
	return (
		<div>
				<span>
					<div>
						<NavLink to={`/Profile/${user.id}`}>
							<img className={s.usersPhoto} src={ user.photos.small || userPhoto } />
						</NavLink>
					</div>
					<div>
						{user.followed ?
							<button disabled={followingInProgress.some(id => id === user.id)}
											onClick={ () => {
								unfollow(user.id);
							}}>UNFollow</button>

							: <button disabled={followingInProgress.some(id => id === user.id)}
								onClick={ () => {
									follow(user.id);
								}}>Follow</button>
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