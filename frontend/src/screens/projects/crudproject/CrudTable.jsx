import styled from "styled-components";
import { useState } from "react";
import CrudTableModal from "./CrudTableModal";
import {
	useUpdateCrudItemMutation,
	useDeleteCrudItemMutation,
} from "../../../slices/projectSlices/crudItemSlice";
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

	tr:hover td {
		background: #00341623;
	}

	tr:last-child {
		background-color: red;
	}

	tr:nth-child(even) {
		background-color: #fff;
	}

	tr:nth-child(odd) {
		background-color: #f6f7fa;
	}
`;

const CrudTable = ({ itemdata, categoriesdata }) => {
	const [updateCrudItem, { isSuccess: updateSuccess }] =
		useUpdateCrudItemMutation();

	const [deleteCrudItem, { isSuccess: deleteSuccess }] =
		useDeleteCrudItemMutation();

	const [modalData, setModalData] = useState(null);

	//modal functions
	const handleOpenModal = (itemdata) => setModalData(itemdata);
	const handleCloseModal = () => setModalData(null);

	return (
		<TableContainer>
			<TableAttachment>
				<div></div>
				{itemdata.map((item, index) => {
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
					{itemdata.map((item, index) => {
						return (
							<tr key={index} onClick={() => handleOpenModal(item)}>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{item.category.name}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<CrudTableModal
				itemdata={modalData}
				isOpen={modalData !== null && modalData !== undefined}
				onClose={handleCloseModal}
				categoriesdata={categoriesdata}
				handleUpdate={updateCrudItem}
				handleDelete={deleteCrudItem}
			/>
		</TableContainer>
	);
};

export default CrudTable;
