import React, {useState, useRef} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Drawer from "../../components/Drawer";
import Dropdown from "../../components/Dropdown";

import {copyObj} from "../../utils/common";

const FavoriteCmp = ({navigation}) => {
  const drawerRef = useRef();
  const DropdownRef = useRef();

  // 打开抽屉弹窗的函数
  function openDrawer() {
    drawerRef.current.toggleSideMenu();
  }

  // 打开下拉弹窗的函数
  function openDropdownRef(e) {
    // let {pageX, pageY} = e
    DropdownRef.current.toggleSideMenu();
  }


  function handleOpen(element) {
    element.isOpen = true;
    console.log("handleOpen", taskTree);
    setTaskTree(JSON.parse(JSON.stringify(taskTree)));
  }

  function handleClose(element) {
    element.isOpen = false;
    console.log("handleOpen", taskTree);
    setTaskTree(JSON.parse(JSON.stringify(taskTree)));
  }

  const [taskTree, setTaskTree] = useState([
    {isOpen: false, sub: [{isOpen: false, sub: [{isOpen: false}]}]},
    {isOpen: false, sub: [{isOpen: false, sub: [{isOpen: false}]}]},
  ]);

  const [menuList, setMenuList] = useState([
    {
      title: 'Sync from calendars',
      icon: require('../../assets/menu-svg/calendar.svg')
    },
    {
      title: 'Account',
      icon: require('../../assets/menu-svg/account.svg')
    },
    {
      title: 'Statisics',
      icon: require('../../assets/menu-svg/statics.svg')
    },
    {
      title: 'Theme',
      icon: require('../../assets/menu-svg/theme.svg')
    },
    {
      title: 'Feedback',
      icon: require('../../assets/menu-svg/feedback.svg')
    },
    {
      title: 'Setting',
      icon: require('../../assets/menu-svg/setting.svg')
    },
  ])

  const TreeNode = ({node, onToggle, onToggleComplete}) => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          alignItems: "center",
          paddingTop: 5,
          paddingBottom: 5,
          textDecorationLine: node.isComplete === true ? 'line-through' : '',
        }}>
          {node?.children?.length > 0 && (<>
            {!node.isOpen && (
              <TouchableOpacity onPress={() => onToggle(node)}>
                <Image source={require("../../assets/arrow-right.png")} style={{width: 17, height: 17}}/>
              </TouchableOpacity>
            )}
            {node.isOpen && (

              <TouchableOpacity onPress={() => onToggle(node)}>
                <Image source={require("../../assets/arrow-down.png")} style={{width: 17, height: 17}}/>
              </TouchableOpacity>
            )}
          </>)}
          {
            node.isComplete === true && (
              <TouchableOpacity onPress={() => {
                onToggleComplete(node)
              }} style={{marginLeft: 5}}>
                <Image source={require("../../assets/checkbox-checked.png")} style={{width: 20, height: 20}}/>
              </TouchableOpacity>)
          }
          {node.isComplete === false && (
            <TouchableOpacity onPress={() => {
              onToggleComplete(node)
            }} style={{marginLeft: 5}}>
              <Image source={require("../../assets/checkbox.png")}
                     style={{width: 20, height: 20}}/>
            </TouchableOpacity>)
          }
          <View style={{marginLeft: 10}}>
            <Text>{node.name}</Text>
          </View>
        </View>

        {node.children && (
          <View style={{display: node.isOpen ? "block" : "none", marginLeft: 30}}>
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} onToggle={onToggle} onToggleComplete={onToggleComplete}/>
            ))}
          </View>
        )}
      </View>
    );
  };

  const TreeList = ({data}) => {
    const [nodes, setNodes] = React.useState(data);

    const handleToggle = (node) => {
      console.log(`debugger1 `, node);
      node.isOpen = !node.isOpen;

      setNodes(copyObj(nodes))
    };

    const handleToggleComplete = (node) => {
      let flag = !node.isComplete;
      node.isComplete = flag
      if (node?.children?.length > 0) {
        node.children.forEach((item) => {
          item.isComplete = flag
          if (item?.children?.length > 0) {
            item.children.forEach((item2) => {
              item2.isComplete = flag
            })
          }
        })
      }
      setNodes(copyObj(nodes))
      console.log(`debugger2 `, nodes);
    };

    return (
      <View>
        {nodes.map((node) => (
          <TreeNode key={node.id} node={node} onToggle={handleToggle} onToggleComplete={handleToggleComplete}/>
        ))}
      </View>
    );
  };
  const treeData = [
    {
      id: 1,
      name: "Task1",
      isOpen: true,
      isComplete: true,
      children: [
        {
          id: 2,
          name: "SubTask1",
          isOpen: true,
          isComplete: true,
          children: [
            {
              id: 4,
              name: "SubTask1",
              isComplete: true,
            },
            {
              id: 5,
              name: "SubTask2",
              isComplete: true,
            },
          ],
        },
        {
          id: 3,
          name: "SubTask1",
          isOpen: true,
          isComplete: true,
          children: [
            {
              isComplete: true,
              id: 6,
              name: "SubTask1",
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
          height: 40,

        }}>
        <TouchableOpacity onPress={openDrawer}>
          <Image
            source={require("../../assets/user.png")}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openDropdownRef}>
          <Image
            source={require("../../assets/dot.png")}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View>
          <TreeList data={treeData}/>
        </View>
        {/*  抽屉弹窗  */}
        <Drawer ref={drawerRef}>
          <View
            style={{
              backgroundColor: "#232c56",
              height: "100vh",
              padding: 20,
              paddingTop: 50,
              // paddingLeft: 50,
              // paddingRight: 20,
              fontSize: 24,

            }}>
            {/*头像栏*/}
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flex: 1, flexDirection: "row", alignItems: 'center',}}>
                <Image source={require('../../assets/menu-svg/user.svg')} style={{width: 40, height: 40}}></Image>
                <Text style={{...styles.textWhite, fontSize: 16, marginLeft: 10}}>aabbcc@gmai.con</Text>
              </View>
              <View style={{flexDirection: "row", alignItems: 'center',}}>
                <Image source={require('../../assets/bell.png')}
                       style={{width: 20, height: 20, marginRight: 10}}></Image>
                <Image source={require('../../assets/setting.png')} style={{width: 20, height: 20}}></Image></View>
            </View>
            {/* 菜单列表 */}
            <View style={{...styles.listBox, marginTop: 20}}>
              {
                menuList.map((item, index) => {
                  return (
                    <View style={styles.listItem} key={index}>
                      <TouchableOpacity onPress={() => {
                      }}>
                        <View style={{...styles.listItemLeft}}>
                          <Image source={item.icon} style={{width: 20, height: 20}}></Image>
                          <Text style={[styles.text18, styles.textGray, {marginLeft: 10}]}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </Drawer>
        {/*  下拉弹窗  */}
        <Dropdown ref={DropdownRef}>
          <View
            style={{
              backgroundColor: "#fff",
              height: "30vh",
              width: "40vw",
              left: "40vw",
              top: "-20vh",
              padding: 20,
              borderRadius: 20,
            }}>
            <Text style={[styles.label, styles.text18]}>Share</Text>
            <Text style={[styles.label, styles.text18]}>Select</Text>
            <Text style={[styles.label, styles.text18]}>Sort</Text>
            <Text style={[styles.label, styles.text18]}>Expand All</Text>
            <Text style={[styles.label, styles.text18]}>View</Text>
          </View>
        </Dropdown>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  topBAr: {
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    // borderRadius: '20',
  },
  date: {
    alignSelf: "left",
  },
  navBox: {
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    flexDirection: "row",
  },
  navBoxItem: {
    flex: 1,
    width: "33.33%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  text24: {
    fontSize: 24
  },
  text18: {
    fontSize: 18
  },
  text16: {
    fontSize: 16
  },
  text14: {
    fontSize: 14
  },
  textWhite: {
    color: '#fff'
  },
  textGray: {
    color: '#ced1d9'
  },
  listBox: {
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default FavoriteCmp;
