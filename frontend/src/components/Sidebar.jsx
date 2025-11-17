import YearSelect from "./YearSelect";
import CategorySelect from "./CategorySelect";

function Sidebar({ years, year, setYear, categories, setCategory, category }) {
  return (
    <>
      <h1>James Beard Award Semifinalists</h1>
      <p id="hide-mobile">
        This map shows semifinalist for the James Beard foundation's annual
        awards. Use the dropdown menus below to filter for an award year or a
        category.
      </p>
      <YearSelect years={years} year={year} setYear={setYear} />
      <CategorySelect
        categories={categories}
        setCategory={setCategory}
        category={category}
      />
    </>
  );
}

export default Sidebar;
