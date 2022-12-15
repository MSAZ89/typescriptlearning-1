import MainLayout from "./layouts/mainlayout";
import { useRef, useState } from "react";

//person object with constructor
class Person {
  name: string;
  age: number;
  notes: string;
  email: string;
  contacted: boolean;
  constructor(
    name: string,
    age: number,
    notes: string,
    email: string,
    contacted: boolean
  ) {
    this.name = name;
    this.age = age;
    this.notes = notes;
    this.email = email;
    this.contacted = contacted;
  }
}

const App = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [contacted, setContacted] = useState<boolean>(false);
  //stateful array to store people
  const [people, setPeople] = useState<Person[]>([]);

  const [columnCount, setColumnCount] = useState<number>(1);

  const addToPeople = () => {
    if (nameInputRef.current !== null && ageInputRef.current !== null) {
      if (
        nameInputRef.current.value !== "" &&
        ageInputRef.current.value !== ""
      ) {
        const name = nameInputRef.current.value;
        const age = parseInt(ageInputRef.current.value);
        const des = notesRef.current?.value || "";
        const email = emailRef.current?.value || "";
        //create new person object
        const person = new Person(name, age, des, email, contacted);
        //add person to people array
        setPeople([...people, person]);
        console.log(people);
      }
    }
  };

  const removeFromPeople = (index: number) => {
    //remove person from people array
    setPeople(people.filter((person, i) => i !== index));
  };

  //function to toggle contacted on a person index in the people array
  const toggleContacted = (index: number) => {
    //create a copy of the people array
    const peopleCopy = [...people];
    //toggle contacted on the person at index
    peopleCopy[index].contacted = !peopleCopy[index].contacted;
    //set the people array to the copy
    setPeople(peopleCopy);
  };

  return (
    <MainLayout>
      {/*BEGIN PERSONAL INFO*/}
      <div className="sm:flex gap-2">
        {/*name*/}
        <div className="sm:w-1/4">
          <label className="block mb-2 font-bold">Name</label>
          <input className="block mb-2 w-full" ref={nameInputRef} />
        </div>
        {/*email*/}
        <div className="sm:w-1/4">
          <label className="block mb-2 font-bold">Email</label>
          <input className="block mb-2 w-full" ref={emailRef} />
        </div>
        {/*age*/}
        <div className="sm:w-1/4">
          <label className="block mb-2 font-bold">Age</label>
          <input
            type="number"
            className="block mb-2 w-full"
            ref={ageInputRef}
          />
        </div>
        {/*contacted*/}
        <div className="sm:w-1/4">
          <label className="block mb-2 font-bold">Contacted</label>
          <input
            type="checkbox"
            className="block mb-2"
            checked={contacted}
            onChange={() => setContacted(!contacted)}
          />
        </div>
      </div>

      {/*Notes*/}
      <div>
        <label className="block mb-2 font-bold">Notes</label>
        <textarea
          rows={5}
          className="block mb-2 w-full p-2"
          ref={notesRef}
        ></textarea>
      </div>

      <div className="flex gap-8 items-center justify-between my-4 bg-slate-50 p-4">
        {/*Add to people button*/}
        <button
          className="bg-sky-500 p-2 rounded text-white h-10"
          onClick={() => addToPeople()}
        >
          Add to people
        </button>

        {/*select dropdown for column count*/}
        <div className="mt-4 flex gap-4">
          <label className="mb-2 font-bold">Column Count</label>
          <select
            className="mb-2 w-auto p-2"
            onChange={(e) => setColumnCount(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>

      <div className={"grid grid-cols-" + columnCount}>
        {/*People list*/}
        {people.map((person, index) => {
          return (
            <li
              key={index}
              className="bg-slate-50 list-decimal py-4 px-4 rounded m-1 flex gap-8 justify-between hover:bg-white transition-all
            group"
            >
              <div className="text-lg">
                <p className="font-bold">
                  {person.name}{" "}
                  <span className={"text-xs group-hover:text-md"}>
                    {person.contacted ? (
                      <>
                        <span className="mb-4 transition-all">
                          ✔️ Contacted
                        </span>{" "}
                      </>
                    ) : (
                      <span className="mb-4 transition-all">
                        ❌ No Contact Made
                      </span>
                    )}
                  </span>
                </p>
                <p className="font-light">
                  {person.email} - {person.age} years old
                </p>
                <p className="text-md font-light my-4 transition-all">
                  {person.notes}
                </p>
                <button
                  className="text-xs mb-2 font-bold transition-all bg-slate-900 text-white rounded py-1 px-3 group-hover:p-2"
                  onClick={() => toggleContacted(index)}
                >
                  {person.contacted ? "Mark Not Contacted" : "Mark Contacted"}
                </button>
              </div>
              <button
                onClick={() => removeFromPeople(index)}
                className="text-red-600 text-xs transition-all h-0"
              >
                Delete
              </button>
            </li>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default App;
