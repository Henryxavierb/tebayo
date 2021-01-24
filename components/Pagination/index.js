import React from 'react';

function Pagination(props) {
	const { isDisabled, onNext, onPrev } = props;
	
	return (
		<div>
			<button
				type='button'
				onClick={onPrev}
				disabled={isDisabled.previousButton}
			>
				Previous
			</button>
			
			<button
				type='button'
				onClick={onNext}
				disabled={isDisabled.nextButton}
			>
				Next
			</button>
		</div>
	);
}

export default React.memo(Pagination);
