import React, {useState, useRef} from "react";

import TabbarCmp from "../../components/Tabbar";

import Favorite from "./Favorite.jsx";
import AddTask from "./AddTask.jsx";
import Mine from "./Mine.jsx";

const HomeStack = ({navigation}) => {
  let [curTabbar, setCurTabbar] = useState(2);

  function onTabChange(e) {
    console.log(`onTabChange`, e);
    setCurTabbar(e);
  }

  return (
    <>
      {curTabbar === 0 && <Favorite/>}
      {curTabbar === 1 && <AddTask/>}
      {curTabbar === 2 && <Mine/>}
      <TabbarCmp onTabChange={onTabChange}/>
    </>
  );
};

export default HomeStack;
