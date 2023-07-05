import { useEffect, useState } from "react";

export default function Input({ inputs , className ,inputData}) {
  let [loginData, setLoginData] = useState({});

  function handleData(e) {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  }


  useEffect(() => {
    setLoginData({})
  }, [inputs]);


  return (
    <>
      {inputs.map((inp) => {
        function convertToValidKey(str) {
            // Convert the string to lowercase and split it by spaces
            const words = str.toLowerCase().split(" ");
          
            // Capitalize the first letter of each word except the first one
            const transformedWords = words.map((word, index) => {
              if (index === 0) {
                return word;
              }
              return word.charAt(0).toUpperCase() + word.slice(1);
            });
          
            // Join the transformed words using an empty string as a separator
            const validKey = transformedWords.join("");
          
            return validKey;
          }
        return (
          <input
            key={inp}
            className= {className}
            type={inp === "password" ? "password" : "text"}
            placeholder={`${inp}`}
            name={convertToValidKey(inp)}
            value={loginData[convertToValidKey(inp)] ? loginData[convertToValidKey(inp)] : ""}
            onChange={handleData}
          />
        );
      })}
    </>
  );
}
