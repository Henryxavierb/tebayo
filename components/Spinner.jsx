import React from 'react';
import {Spin} from "antd";

function Spinner() {
	return (
		<div className="loader">
			<Spin/>
		</div>
	)
}

export default React.memo(Spinner);
