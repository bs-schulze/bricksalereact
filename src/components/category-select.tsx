import { Category } from "./types";

export function CategorySelect({
  categories,
}: {
  categories: Array<Category>;
}) {
  return (
    <select className="form-select mb-3" name="category_id">
      {categories.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        );
      })}
    </select>
  );
}
