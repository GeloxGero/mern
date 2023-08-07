import styled from "styled-components";

const CrudLoginModal = ({ data, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div>
			<p>This is the modal content</p>
			<button onClick={onClose}>Close Modal</button>
		</div>
	);
};

export default CrudLoginModal;
