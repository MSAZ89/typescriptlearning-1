import MainLayout from "./layouts/mainlayout";
import { useRef, useState } from "react";

//person object with constructor
class Person {
  name: string;
  age: number;
  notes: string;
  email: string;
  contacted: boolean = false;
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
        <textarea className="block mb-2 w-full p-2" ref={notesRef}></textarea>
      </div>

      {/*Add to people button*/}
      <button
        className="bg-sky-500 p-2 rounded text-white"
        onClick={() => addToPeople()}
      >
        Add to people
      </button>

      {/*People list*/}
      {people.map((person, index) => {
        return (
          <li
            key={index}
            className="bg-slate-50 list-decimal py-4 px-4 rounded my-2 flex gap-4 justify-between hover:bg-white transition-all hover:scale-105 hover:border hover:border-slate-300
            group"
          >
            <div className="text-lg">
              <p className="font-bold">
                {person.name}, {person.age}.
              </p>
              <p className={"text-sm group-hover:text-md"}>
                {person.contacted ? (
                  <span className="mb-4 transition-all">✔️ Contacted</span>
                ) : null}
              </p>
              <p className="text-md font-light my-2 transition-all group-hover:text-xl">
                {person.notes}
              </p>
            </div>
            <button
              onClick={() => removeFromPeople(index)}
              className="text-red-500 text-sm"
            >
              Delete ❌
            </button>
          </li>
        );
      })}
    </MainLayout>
  );
};

export default App;
