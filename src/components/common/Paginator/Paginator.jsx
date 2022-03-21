import React from "react";
import s from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
	const pagesCount = Math.ceil(totalUsersCount / pageSize);
	const pages = [];
	for (let i = 1; i <= pagesCount; i++){
		pages.push(i);
	}

	return (
		<div>
		<ul className={s.paginationList}>
			{
				pages.map( (p) => {
					let currentPageClass = (currentPage === p) ? s.paginationList_item__active + ' ' : '';
					return <li className={currentPageClass + s.paginationList_item}
										 onClick={(e) => {onPageChanged(p)}} >
									{ p }
								</li>
				})
			}
		</ul>
	</div>
	);

};

export default Paginator;