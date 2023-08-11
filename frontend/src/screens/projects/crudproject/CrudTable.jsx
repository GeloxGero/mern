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
	const [tableData, setTableData] = useState(itemdata);
	const [modalData, setModalData] = useState(null);

	const [
		updateCrudItem,
		{ isSuccess: updateSuccess, isLoading: updateLoading },
	] = useUpdateCrudItemMutation();

	const [
		deleteCrudItem,
		{ isSuccess: deleteSuccess, isLoading: deleteLoading },
	] = useDeleteCrudItemMutation();

	//modal functions
	const handleOpenModal = (item) => setModalData(item);
	const handleCloseModal = () => setModalData(null);

	const handleChange = (method, updatedData) => {
		if (method === "UPDATE") {
			setTableData(() => {
				return itemdata.map((item) => {
					if (item._id === updatedData.id) {
						return { ...item, ...updatedData };
					}

					return item;
				});
			});
		} else if (method === "DELETE") {
			setTableData(() => {
				return itemdata.filter((item) => {
					return item._id !== updatedData._id;
				});
			});
		}
	};

	return (
		<TableContainer>
			<TableAttachment>
				<div></div>
				{tableData.map((item, index) => {
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
					{tableData.map((item, index) => {
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
				itemDataObject={{
					itemdata: modalData,
					updateItemMutation: {
						updateCrudItem,
						updateLoading,
						updateSuccess,
					},
					deleteItemMutation: {
						deleteCrudItem,
						deleteLoading,
						deleteSuccess,
					},
				}}
				isOpen={modalData !== null && modalData !== undefined}
				onClose={handleCloseModal}
				categoriesdata={categoriesdata}
				handleChange={handleChange}
			/>
		</TableContainer>
	);
};

export default CrudTable;
