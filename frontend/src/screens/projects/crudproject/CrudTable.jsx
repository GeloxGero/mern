import styled from "styled-components";
import { useState } from "react";
import CrudTableModal from "./CrudTableModal";

const TableContainer = styled.div`
	padding: 0;
	margin: 0;
	border-radius: 10px;

	width: 800px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TableAttachment = styled.div`
	div {
		display: flex;
		align-items: center;
		color: #c9cedb;
		padding: 0 8px;
		height: 40px;
		width: 160px;
	}

	div:nth-child(even) {
		background-color: #6a758e;
	}

	div:nth-child(odd) {
		background-color: #79829a;
	}
`;

const Table = styled.table`
	width: 100%;
	border-spacing: 0;

	th,
	td {
		height: 40px;
		padding: 8px;
		text-align: left;

		border: none;
	}

	th {
		color: #787a8d;
		font-weight: bolder;
	}

	td {
		color: #3f4259;
	}

	td:hover {
		cursor: pointer;
	}

	tr:hover {
		border-bottom: solid 1px blue;
	}

	tr:hover td {
		background: #00341623;
	}

	tr:nth-child(even) {
		background-color: #fff;
	}

	tr:nth-child(odd) {
		background-color: #f6f7fa;
	}
`;

const CrudTable = ({ data }) => {
	const [openModal, setOpenModal] = useState(null);

	//modal functions
	const handleOpenModal = (index) => setOpenModal(index);
	const handleCloseModal = (index) => {
		console.log(openModal, "Running");
		setOpenModal(index + 1);
	};

	return (
		<TableContainer>
			<TableAttachment>
				<div></div>
				{data.map((item, index) => {
					return <div key={index}>{item.name}</div>;
				})}
			</TableAttachment>

			<Table>
				<thead>
					<tr>
						<th>Price</th>
						<th>Quantity</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => {
						return (
							<tr key={index} onClick={() => handleOpenModal(index)}>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{item.category.name}</td>
								<CrudTableModal
									isOpen={openModal === index}
									onClose={handleCloseModal}
									data={item}
								/>
							</tr>
						);
					})}

					{console.log(openModal)}
				</tbody>
			</Table>
		</TableContainer>
	);
};

export default CrudTable;
