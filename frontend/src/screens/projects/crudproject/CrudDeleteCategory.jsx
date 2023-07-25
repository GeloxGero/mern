import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useGetCrudCategoriesQuery } from "../../../slices/projectSlices/crudCategorySlice";
const CrudDeleteCategory = () => {
	const {
		data: categories,
		isLoading: categoriesLoading,
		isSuccess: categoriesSuccess,
		isError: categoriesIsError,
		error: categoriesError,
	} = useGetCrudCategoriesQuery();

	let content;

	if (categoriesLoading) content = <h1>Loading...</h1>;
	else {
		content = (
			<div className="items-container">
				<table>
					<thead>
						<tr className="item-table">
							<th>Category</th>
							<th>Quantity</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((category, index) => {
							return (
								<tr className="item-table" key={index}>
									<td className="single-item">{category.name}</td>
									<td className="single-item">{category.quantity}</td>
									<td className="single-item">
										<button>
											<h2>
												<FontAwesomeIcon icon={faDeleteLeft} />
											</h2>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
	return content;
};

export default CrudDeleteCategory;
