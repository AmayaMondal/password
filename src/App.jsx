import { useState, useCallback, useEffect, useRef } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  //useref hook
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!+-@#$%^&*()_+=-{}[]:;'<>,.?/";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); //index no of the string is generated eg:1/2/3/4 till 52
      pass += str.charAt(char); //str.characterat[1/2/3/4.....52] eg str.charAt(1)will give A
    }
    setpassword(pass);
  }, [length, numberallowed, charAllowed, setpassword]); //in usecallback hook we can pass a function and one or more than one dependencies in the form of array.The syntax for the hook is useCallback(function,[dependencies]).The function will be called only when the dependencies change.If we pass an empty array as dependencies,the function will be mounted only once.if there are no dependencies,the function will be called on every render.

  const copypasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3); //to select the text in the definied no in the input field
    window.navigator.clipboard.writeText(password);
  }, [password]); //copypassword to clipboard function is created using useCallback hook.It will copy the password to the clipboard when clicked on the copy button.The function is creared using useCallback hook to avoid unneccesary re-renders.The function takes password as a dependency so that it will be called only when the password changes.

  useEffect(() => {
    generatePassword();
  }, [length, numberallowed, charAllowed, generatePassword]); //useEffect hook is used to call the generatePassword function whenever the dependencies change. The dependencies are length,numberallowed,charAllowed and generatePassword. The generatePassword function is called only when the dependencies change

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center">
        <h1 className="text-white text-center py-3">Password generator</h1>
        <div className="flex  rounded-lg overflow-hidden mb-4 py-5 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full px-3 py-1 rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef} //attaching the ref to the input element
          />
          <button
            onClick={copypasswordtoClipboard}
            className="bg-cyan-950 rounded-lg px-3 py-0.5 shrink-0 "
          >
            Copy
          </button>
        </div>
        <div className="text-sm flex gap-x-2 ">
          <div className="flex items-center gap-x-1 mb-4">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label>Length={length}</label>
          </div>
          <div className="flex items-center gap-x-1 mb-4">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="input-number"
              onChange={(e) => {
                setnumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="input-number">Number</label>
          </div>
          <div className="flex items-center gap-x-1 mb-4">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterAllowed"
              onChange={(e) => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterAllowed">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
