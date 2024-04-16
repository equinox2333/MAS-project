import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button, Input } from '@rneui/themed';

import { logout } from '@/services/user';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState( {username: 'placeholder',
                                    age: '20',
                                    gender: 'Female'})

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (key: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
    // TODO: send user profile to cloud
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Profile</Text>
        {!edit && <Button title="Edit" onPress={() =>{ setEdit(true); console.log(edit)}} />}
        {edit && <Button title="Finish" onPress={() =>{ setEdit(false); console.log(edit)}} />}
        {!edit && <View style={styles.list} >
          <View style={styles.item}>
            <Text style={styles.label}>Username: </Text>
            <Text> {user.username} </Text>
          </View>
          <View style={styles.item}> 
            <Text style={styles.label}>Age: </Text>
            <Text> {user.age} </Text>
          </View>
          <View style={styles.item}> 
            <Text style={styles.label}>Gender: </Text>
            <Text> {user.gender} </Text>
          </View>
          </View>}
          {edit && <View style={styles.list} >
          <View style={styles.item}>
            <Text style={styles.label}>Username: </Text>
            <Input
              placeholder='enter username'
              value={user.username}
              onChangeText={(value) => handleUserChange('username', value )}
            />
          </View>
          <View style={styles.item}> 
            <Text style={styles.label}>Age: </Text>
            <Input
              placeholder='enter age'
              value={user.age}
              onChangeText={(value) => handleUserChange('age', value )}
            />
          </View>
          <View style={styles.item}> 
            <Text style={styles.label}>Gender: </Text>
            <Input
              placeholder='enter gender'
              value={user.gender}
              onChangeText={(value) => handleUserChange('gender', value )}
            />
          </View>
          </View>}
        <View style={styles.footer}>
          <Button loading={loading} title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flexGrow: 1,
    padding: 20,
  },
  footer: {
    paddingHorizontal: 20,
  },
  loading: {
    marginVertical: 16,
    fontSize: 16,
    color: '#999',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loadingText: {
    marginLeft: 10,
    color: '#999',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#fff',
    height: 50,
    marginTop: 10,
  },
  item: {
    flex: 1,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  rowBack: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    height: 50,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  label: {
    width: 100,
  }
});
