import YearSelect from "./YearSelect";
import CategorySelect from "./CategorySelect";

function Sidebar({ years, year, setYear, categories, setCategory, category }) {
  return (
    <>
      <h1>James Beard Award Semifinalists</h1>
      <p id="hide-mobile">
        This map shows semifinalists for the James Beard foundation's annual
        awards. Use the dropdown menus below to filter awards by year or
        category. Click on a point to learn about the award.
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
