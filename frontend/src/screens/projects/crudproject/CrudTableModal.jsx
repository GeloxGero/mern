import styled from "styled-components";

const CrudTableModal = ({ data, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<td>
			<p>This is the modal content</p>
			{console.log(onClose)}
			<button onClick={onClose}>Close Modal</button>
		</td>
	);
};

export default CrudTableModal;
