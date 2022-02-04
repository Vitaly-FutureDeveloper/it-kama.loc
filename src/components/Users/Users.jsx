import React from "react";
import s from './users.module.css';
import userPhoto from '../../assets/img/im.png';
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

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
							<button disabled={props.followingInProgress.some(id => id === u.id)}
											onClick={ () => {
								props.unfollow(u.id);
							}}>UNFollow</button>

							: <button disabled={props.followingInProgress.some(id => id === u.id)}
								onClick={ () => {
									props.follow(u.id);
								}}>Follow</button>
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