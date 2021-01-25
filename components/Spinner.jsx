import React from 'react';
import {Spin} from "antd";

function Spinner({className}) {
	return (
		<div className={className}>
			<Spin/>
		</div>
	)
}

export default React.memo(Spinner);
