import React, {useState} from "react";
import s from './Paginator.module.css';
import cn from 'classnames';


type PropsType = {
	totalItemsCount:number,
	pageSize:number,
	currentPage?:number,
	onPageChanged?:(pageNumber:number)=>void,
	portionSize?:number,
};
const Paginator:React.FC<PropsType> = ({totalItemsCount,
																				 pageSize,
																				 currentPage,
																				 onPageChanged = (x) => x,
																				 portionSize=10}) => {

	const pagesCount = Math.ceil(totalItemsCount / pageSize);
	const pages:Array<number> = [];
	for (let i = 1; i <= pagesCount; i++){
		pages.push(i);
	}

	const portionCount = Math.ceil(pagesCount / portionSize);
	const [portionNumber, setPortionNumber] = useState(1);

	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	const rightPortionPageNumber = portionNumber * portionSize;

	const disabledBtnBefore = !(portionNumber > 1) // ? '' : true;
	const disabledBtnNext = !(portionCount > portionNumber) // ? '' : true;

	return (
		<div className={s.pagination}>

			<button className={s.paginationBtn + ' ' + s.paginationBtn_prev}
							onClick={() => setPortionNumber(portionNumber - 1)}
							disabled={disabledBtnBefore} >
			</button>

			<ul className={s.paginationList}>
				{
					pages
						.filter( (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
						.map( (p) => {
						return <li className={cn({[s.paginationList_item__active]: (currentPage === p)}, s.paginationList_item)}
											 onClick={(e) => {onPageChanged(p)}} >
										{ p }
									</li>
					})
				}
			</ul>

			<button className={s.paginationBtn + ' ' + s.paginationBtn_next}
							onClick={() => setPortionNumber(portionNumber + 1)}
							disabled={disabledBtnNext} >
			</button>

		</div>
	);

};

export default Paginator;