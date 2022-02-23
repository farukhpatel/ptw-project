import React, { useState, useEffect } from "react";
function Array() {
  const [searchOptions, setSearchOptions] = useState([
    { name: "Raman" },
    { name: "Farukh" },
    { name: "Arun" },
  ]);
  const getIds = (id) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(id);
      }, 1000);
    });
  };
  const forLoop = () => {
    //for loop
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(i * 10 + 10);
    }
    for (let i = 0; i < arr.length; i++) {
      console.log("value", arr[i]);
    }
    for (const index in arr) {
      console.log("id async", arr[index]);
    }
    for (const value of arr) {
      if (value > 30) break; //in for loop we can use break , continue
      console.log("value", value);
    }

    (async () => {
      for (let value of arr) {
        //for loop compatible with async await
        let id = await getIds(value);
        console.log("id async", id);
      }
    })();
  };
  const forEachLoop = () => {
    // forEach
    const arr = [10, 20, 30, 40, 50];
    arr.forEach((v, i) => {
      console.log("value", v);
      console.log("i", i);
      // if(i==1) break; we can't use break in forEach it will through an error
    });

    //forEach also not compatible with asyn await
    arr.forEach(async (v, i) => {
      let id = await getIds(v);
      console.log("id", id);
    });
  };

  const copyArrayAndObject = () => {
    let arr = [1, 2, 3, 4, 5];
    let newArr = [...arr];
    newArr[0] = 100;
    console.log(arr); //1 2 3 4 5
    console.log(newArr); //100 2 3 4 5

    let arrOfAnObj = [{ name: "farukh" }, { name: "another" }];
    let newArrOfAnObj = [...arrOfAnObj];
    newArrOfAnObj[0].name = "new farukh";
    console.log(arrOfAnObj); //[{ name: "new farukh" }, { name: "another" }]
    console.log(newArrOfAnObj); //[{ name: "new farukh" }, { name: "another" }]
  };

  const someArrayMethods = () => {
    let arr = [1, 2, 3, 4, 5, 2];
    arr.indexOf(2); //1
    arr.lastIndexOf(2); //5
    arr.findIndex((v) => v === 2); //1
    arr.find((v) => v === 2); //2
    arr.includes(5); // true
    arr.some((v) => v === 2); //true
    arr.every((v) => v === 2); //false
    let filteredArr = arr.filter((v) => v >= 3); //3 4 5
    let mappedArr = arr.map((v) => v * 10); // 10 20 30 40 50 20
    let sumOfAllNumOfArr = arr.reduce((sum, value) => {
      return (sum += value);
    }, 0); //17
  };

  useEffect(() => {
    forLoop();
    forEachLoop();
    copyArrayAndObject();
    someArrayMethods();
    setSearchOptions(searchOptions?.map((v) => ({ ...v, state: true })));
  }, []);

  return (
    <>
      <h1>Array</h1>
      <input
        type="text"
        onChange={(e) => {
          setSearchOptions(
            searchOptions?.map((v) => {
              if (v?.name?.toLowerCase()?.includes(e.target.value)) {
                return { ...v, state: true };
              }
              return { ...v, state: false };
            })
          );
        }}
      />
      {searchOptions?.map((v, i) => {
        return v.state ? <li key={i}>{v?.name}</li> : null;
      })}
    </>
  );
}
export default Array;
