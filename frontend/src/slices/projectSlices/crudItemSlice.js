import { apiSlice } from "../apiSlice";

const ITEM_URL = "/api/crud";

export const crudItemApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCrudItems: builder.query({
			query: () => ({
				url: `${ITEM_URL}/`,
			}),
			// transformResponse: (res) => {
			// 	const newData = res.map((item) => {
			// 		item.id = item._id;
			// 		return item;
			// 	});
			// },
		}),
		addCrudItem: builder.mutation({
			query: (newData) => ({
				url: `${ITEM_URL}/add`,
				method: "POST",
				body: { ...newData },
			}),
		}),
		updateCrudItem: builder.mutation({
			query: (updatedData) => ({
				url: `${ITEM_URL}/edit`,
				method: "PUT",
				body: { ...updatedData },
			}),
		}),
		deleteCrudItem: builder.mutation({
			query: ({ id }) => ({
				url: `${ITEM_URL}/delete`,
				method: "DELETE",
				body: { id },
			}),
		}),
	}),
});

export const {
	useGetCrudItemsQuery,
	useDeleteCrudItemMutation,
	useUpdateCrudItemMutation,
	useAddCrudItemMutation,
} = crudItemApiSlice;
