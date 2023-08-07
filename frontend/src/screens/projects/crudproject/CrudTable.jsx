import styled from "styled-components";

const TableContainer = styled.div`
	padding: 0;
	margin: 0;

	width: 800px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TableAttachment = styled.div`
	border-radius: 100px;

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
	border-collapse: collapse;

	th,
	td {
		height: 40px;
		padding: 8px;
		text-align: left;
	}

	th {
		color: #787a8d;
		font-weight: bolder;
	}

	td {
		color: #3f4259;
	}

	tr:hover {
		cursor: pointer;
	}

	tr:active {
		background-color: #000;
	}

	tr:nth-child(even) {
		background-color: #fff;
	}

	tr:nth-child(odd) {
		background-color: #f6f7fa;
	}
`;

const CrudTable = ({ data }) => {
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
							<tr key={index}>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{item.category.name}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</TableContainer>
	);
};

export default CrudTable;
