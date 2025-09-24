import YearSelect from "./YearSelect";
import CategorySelect from "./CategorySelect";

function Sidebar({ categories, years, setCategory, category }) {
  return (
    <>
      <h1>James Beard Award Semifinalists</h1>
      <p>
        This map shows semifinalist for the James Beard foundation's annual
        awards. Use the dropdown menus below to filter for an award year or a
        category.
      </p>
      <YearSelect years={years} />
      <CategorySelect
        categories={categories}
        setCategory={setCategory}
        category={category}
      />
    </>
  );
}

export default Sidebar;
