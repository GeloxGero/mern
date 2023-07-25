import { apiSlice } from "../apiSlice";

const CATEGORY_URL = "/api/crudcategory";

export const crudCategoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCrudCategories: builder.query({
			query: () => ({
				url: `${CATEGORY_URL}/`,
			}),
		}),
		addCrudCategory: builder.mutation({
			query: (newData) => ({
				url: `${CATEGORY_URL}/add`,
				method: "POST",
				body: { ...newData },
			}),
		}),
		deleteCrudCategory: builder.mutation({
			query: ({ id }) => ({
				url: `${CATEGORY_URL}/delete`,
				method: "DELETE",
				body: { id },
			}),
		}),
	}),
});

export const {
	useGetCrudCategoriesQuery,
	useAddCrudCategoryMutation,
	useDeleteCrudCategoryMutation,
} = crudCategoryApiSlice;
