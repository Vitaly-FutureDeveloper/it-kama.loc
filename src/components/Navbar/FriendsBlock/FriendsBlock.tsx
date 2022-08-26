import React from "react";
import s from "./FriendsBlock.module.css";
import Friend from "./Friend/Friend";
import {FriendsType} from "../../../redux/sidebar-reducer";

type PropsType = {
	friends:Array<FriendsType>
};
const FriendsBlock:React.FC<PropsType> = ({friends}) => {
	const friendElements = friends.map((item) => <Friend key={item.id} name={item.name} />);

	return (
		<section className={s.FriendsBlock}>
			{friendElements}
		</section>
	);
};

export default FriendsBlock;