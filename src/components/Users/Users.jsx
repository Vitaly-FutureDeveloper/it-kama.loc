import React from "react";
import s from './users.module.css';
import userPhoto from '../../assets/img/im.png';
import {NavLink} from "react-router-dom";
import * as axios from "axios";

const Users = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	const pages = [];
	for (let i = 1; i <= pagesCount; i++){
		pages.push(i);
	}

	return (
		<div>
		<ul className={s.paginationList}>
			{
				pages.map( (p) => {
					let currentPage = (props.currentPage === p) ? s.paginationList_item__active + ' ' : '';
					return <li className={currentPage + s.paginationList_item}
										 onClick={(e) => {props.onPageChanged(p)}} >{p}</li>
				})
			}
		</ul>
		{
			props.users.map( (u) => <div key={u.id}>

				<span>
					<div>
						<NavLink to={`/Profile/${u.id}`}>
							<img className={s.usersPhoto} src={ u.photos.small || userPhoto } />
						</NavLink>
					</div>
					<div>
						{u.followed ?
							<button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => {
								props.togglefollowingProgress(true, u.id);
								axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
									withCredentials: true,
									headers: {
										"API-KEY": "bbd368cb-cbd4-49df-b254-fdd056ac38e7"
									}
								}).then((response) => {
									if(response.data.resultCode === 0){
										props.unfollow(u.id);
									}
									props.togglefollowingProgress(false, u.id);
								}).catch((err) => {
									console.log(err);
								});

								}
							}>UNFollow</button>

							: <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => {
								props.togglefollowingProgress(true, u.id);
								debugger;
								axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
									headers: {
										"API-KEY": "bbd368cb-cbd4-49df-b254-fdd056ac38e7"
									},
									withCredentials: true,
								}).then((response) => {
									if(response.data.resultCode === 0){
										props.follow(u.id);
									}
									props.togglefollowingProgress(false, u.id);
								}).catch((err) => {
									console.log(err);
								});

								}
							}>Follow</button>
						}
					</div>
				</span>
				<span>
					<span>
						<div>{u.name}</div>
						<div>{u.status}</div>
					</span>
					<span>
						<div>{"u.location.city"}</div>
						<div>{"u.location.country"}</div>
					</span>
				</span>
			</div>)
		}
	</div>
	);

};

export default Users;