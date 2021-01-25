import React from 'react';
require('../styles/pagination.less');

function Pagination(props) {
	const { isDisabled, onNext, onPrev } = props;
	
	return (
		<div className="container">
			<button
				type='button'
				onClick={onPrev}
				className="btnPagination"
				disabled={isDisabled.previousButton}
			>
				Previous
			</button>
			
			<button
				type='button'
				onClick={onNext}
				className="btnPagination"
				disabled={isDisabled.nextButton}
			>
				Next
			</button>
		</div>
	);
}

export default React.memo(Pagination);
