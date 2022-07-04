import React from "react";
import s from './users.module.css';
import userPhoto from '../../assets/img/im.png';
import {NavLink} from "react-router-dom";

const User = ({key, user, followingInProgress, follow, unfollow}) => {
	return (
		<div key={key}>
				<span>
					<div>
						<NavLink to={`/Profile/${user.id}`}>
							<img className={s.usersPhoto} src={ user.photos.small || userPhoto } />
						</NavLink>
					</div>

					<div>

						{ user.followed ?
							<button className={`btn ${s.btnUnFollow}`} disabled={followingInProgress.some(id => id === user.id)}
											onClick={ () => {
								unfollow(user.id);
							}}>Убрать из друзей</button>

							: <button className={`btn ${s.btnFollow}`} disabled={followingInProgress.some(id => id === user.id)}
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