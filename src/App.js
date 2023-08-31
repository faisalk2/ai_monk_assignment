import { useState } from "react";
import "./App.css";
import Styles from "./component/style.module.css";
import Recursive from "./component/Recursive";
import { Button } from "react-bootstrap";

const initialData = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "new data" },
        { name: "child1-child2", data: "new data" },
      ],
    },
    {
      name: "child2",
      children: [
        { name: "child2-child1", data: "new data" },
        { name: "child2-child2", data: "new data" },
      ],
    },
  ],
};

function App() {
  const [data, setData] = useState(initialData);
  const [explore, setExplore] = useState(false);

  const handleExplore = () => {
    setExplore((pre) => !pre);
  };

  const handleData = (value) => {
    setData(value);
  };

  return (
    <div className="App">
      <Recursive
        name={data.name}
        data={data}
        handleData={(value) => handleData(value)}
      />
      <div className="mt-4">
        <Button variant="warning" onClick={handleExplore}>
          Explore
        </Button>

        {explore && (
          <div className={`m-4  ${Styles.Container}`}>
            {JSON.stringify(data)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
