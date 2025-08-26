type greetingProps = {
  name: string;
  age?: number;
};

function Greeting({ name, age }: greetingProps) {
  return (
    <>
      <p>
        Hello! {name}! You are {age} years old!
      </p>
      <p>The current time is {Date()}</p>
    </>
  );
}

export default Greeting;
