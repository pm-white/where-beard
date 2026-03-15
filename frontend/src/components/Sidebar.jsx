import SelectTemplate from "./SelectTemplate";

function Sidebar({ years, year, setYear, categories, setCategory, category }) {
  return (
    <>
      <h1>James Beard Award Semifinalists</h1>
      <p id="hide-mobile">
        This map shows semifinalists for the James Beard foundation's annual
        awards. Use the dropdown menus below to filter awards by year or
        category. Click on a point to learn about the award.
      </p>
      <SelectTemplate
        itemOptions={years}
        setItem={year}
        setFunction={setYear}
        label="Year"
      />
      <SelectTemplate
        itemOptions={categories}
        setItem={category}
        setFunction={setCategory}
        label="Category"
      />
    </>
  );
}

export default Sidebar;
