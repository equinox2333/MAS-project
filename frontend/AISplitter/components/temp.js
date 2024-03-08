import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateTask = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Date:</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
        style={styles.date}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
      />
      <Button title="Creat Task" onPress={handleSubmit} />

      {/* <Button
        onPress={() => navigation.navigate("Details")}
        title="Go to details"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
});

// import { View, Text, Button } from 'react-native';

// const HomeScreen = ({ navigation }) => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Home Screen</Text>
//     <Button
//       onPress={() => navigation.navigate('Details')}
//       title="Go to details"
//     />
//   </View>
// );

export default CreateTask;
