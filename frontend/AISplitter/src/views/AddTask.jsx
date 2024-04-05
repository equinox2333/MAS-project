import React, {useState, useRef} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyleSheet, View, TextInput, Button, Text, Image, TouchableOpacity,
} from "react-native";
import Modal from 'react-native-modal';

// import {CalendarList, DatePicker} from "react-native-common-date-picker";

import {formateDate} from "../../utils/common";


const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, // marginTop: 40,
  },
  formItem: {
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderColor: "gray",
    fontSize: 18,
    marginBottom: 15
  },
  btn: {
    width: 70, // 设置按钮宽度
    height: 30, // 设置按钮高度
    // lineHeight: 30,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14
    // marginTop: 5
  },
  formItemLable: {
    width: 80,
    fontSize: 16,
    color: 'grey'
  },
  formItemValue: {
    fontSize: 18
  },
  label: {
    fontSize: 16, marginBottom: 5,
  }, topBAr: {
    height: 40,
  }, input: {
    // borderBottomWidth: 1, borderColor: "gray",
  }, textArea: {
    height: 100, textAlignVertical: "top", borderRadius: 5,
    borderWidth: 1, borderColor: "gray",
    padding: 10
  }, date: {
    alignSelf: "left",
  }, navBox: {
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    flexDirection: "row",
  }, navBoxItem: {
    flex: 1,
    width: "33.33%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
// 用于控制组件显示/隐藏的state
  const [isDateShow, setIsDateShow] = useState(false);
  const handleSubmit = async () => {
    try {
      //   TODO: send to backend
      console.log("task created");
      //   navigation.navigate('');
    } catch (e) {
      console.error(e);
      //   alert(e);
    }
  };
  let dateFlagList = ['beginDate', 'endDate']
  let dateFlag = useRef(dateFlagList[0])

  const [date, setDate] = useState(new Date());

  const [beginDate, setBeginDate] = useState(formateDate(new Date()));
  const [endDate, setEndDate] = useState(formateDate(new Date()));

  const [remindingTime, setRemindingTime] = useState(formateDate(new Date()));

  let startDate = useRef(formateDate(new Date()))

  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setDate(currentDate);
    // setIsDateShow(false)


    if (dateFlag.current === dateFlagList[0]) {
      setBeginDate(formateDate(selectedDate))
    }
    if (dateFlag.current === dateFlagList[1]) {
      setEndDate(formateDate(selectedDate))
    }
    setIsDateShow(false)
  };

  // 日期选择器选择
  function datePickerConfirm(date) {
    console.log(`大脸猫`, dateFlagList[0], dateFlag)
    if (dateFlag.current === dateFlagList[0]) {
      setBeginDate(date)
    }
    if (dateFlag.current === dateFlagList[1]) {
      setEndDate(date)
    }
  }

  return (
    <>
      {/*TODO: 日历组件*/}
      {isDateShow && <DateTimePicker
        value={new Date()}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />}
      {/*<Modal*/}
      {/*  isVisible={isDateShow}*/}
      {/*  animationType={'fade'}*/}
      {/*  swipeDirection="fade" // Discard the drawer with swipe to left*/}
      {/*  useNativeDriver // Faster animation*/}
      {/*  hideModalContentWhileAnimating // Better performance, try with/without*/}
      {/*  propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)*/}
      {/*>*/}
      {/*<View*/}
      {/*  style={{height: '30vh', width: '100vw', position: 'fixed', bottom: -20, left: -20, backgroundColor: '#fff'}}*/}
      {/*>*/}
      {/*  <DatePicker*/}
      {/*    confirm={date => {*/}
      {/*      console.warn(date)*/}
      {/*      datePickerConfirm(date)*/}
      {/*      setIsDateShow(false)*/}
      {/*    }}*/}
      {/*    cancel={() => {*/}
      {/*      setIsDateShow(false)*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*</Modal>*/}

      {/*<DatePicker*/}
      {/*  confirm={date => {*/}
      {/*    console.warn(date)*/}
      {/*  }}*/}
      {/*/>*/}
      <View style={{position: "relative", textAlign: 'center', paddingTop: 10, paddingBottom: 10}}>
        <Text style={{...styles.label, textAlign: 'center', fontSize: 18, fontWeiht: 900}}> Add Task</Text>
        <TouchableOpacity onPress={() => {
          setIsDateShow(true)
        }} style={{position: "absolute", right: 10,}}>
          <Text style={{fontSize: 18, fontWeiht: 800}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container} testID='addTaskContainer'>
        <View style={{flexDirection: "row", alignItems: "center", ...styles.formItem}}>
          <Text style={styles.formItemLable}>Title:</Text>
          <TextInput
            style={{...styles.input, ...styles.formItemValue}}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>

        <View style={{flexDirection: "row", ...styles.formItem}}>

          <Text style={[styles.formItemLable]}>Time:</Text>
          <TouchableOpacity onPress={() => {
            setIsDateShow(true)
            dateFlag = dateFlagList[0]
          }}>
            <Text> {beginDate}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 15, marginRight: 15}}>to</Text>
          <TouchableOpacity onPress={() => {
            setIsDateShow(true)
            dateFlag = dateFlagList[1]
          }}>
            <Text> {endDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", ...styles.formItem}}>
          <Text style={styles.formItemLable}>Tag:</Text>
          <TextInput
            style={{...styles.input, ...styles.formItemValue}}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>

        <View style={{flexDirection: "row", alignItems: "center", ...styles.formItem}}>
          <Text style={styles.formItemLable}>Repeat:</Text>
          <TextInput
            style={{...styles.input, ...styles.formItemValue}}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>

        <View style={{flexDirection: "row", alignItems: "center", ...styles.formItem}}>
          <Text style={[styles.formItemLable, {width: 180}]}>Reminding Time:</Text>
          <TouchableOpacity onPress={() => {
            setIsDateShow(true)
          }}>
            <Text>{remindingTime}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => {
          }}>
            <Text style={styles.btn}>Subtasks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
          }}>
            <Text style={{alignItems: 'center', justifyContent: 'center', display: "flex", height: '100%'}}> AI *</Text>
          </TouchableOpacity>
        </View>


        <View style={{position: 'relative', marginTop: 10}}>
          <TextInput
            style={[styles.input, styles.textArea,]}
            value={content}
            onChangeText={setContent}
            placeholder="Free Text"
            multiline
          />
          <TouchableOpacity onPress={() => {
          }} style={{
            position: 'absolute',
            top: 5,
            right: 5,
            borderWidth: 0.5,
            borderRadius: 5,
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 5,
            paddingRight: 5,
            fontSize: 14
          }}>
            <Text>
              Extract
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </>
  )
    ;
};

export default AddTask;
