/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Pressable, TextInput} from 'react-native';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../aws-exports';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary, ImagePicker } from 'react-native-image-picker';
import Loader from "react-native-modal-loader";
/* import { StackActions } from '@react-navigation/native';
import Main from './Main'; */

import analytics, {firebase} from '@react-native-firebase/analytics';


const LoginPage = ({navigation}) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState({});
  const [showNextPageBtn, setShowNextPageBtn] = useState(false);
  const [gotImage, setGotImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item["label"]}</Text>
      </View>
    );
  };

const listTodos = `
  query list {
    listTodos {
      items {
        id firstname lastname gender age profileImage {
          bucket region key
        }
      }
    }
  }
`

const createTodo = `
  mutation create {
    createTodo(input: {
      firstname: "${firstname}"
      lastname: "${lastname}"
      gender: "${gender}"
      age: ${age}
      profileImage: {
        bucket: "${profileImage ? profileImage.file.bucket : ''}"
        region: "${profileImage ? profileImage.file.region : ''}"
        key: "${profileImage ? profileImage.file.key : ''}"
      }
    }) {
      id firstname lastname age profileImage {
        bucket region key
      } 
    }
  }
`

const deleteTodoDetails = `
  mutation create {
    deleteTodo(input: {id: "f4e9094d-49ff-45ed-b9f1-fe139b00fe62"}) {
      id
    }
  }
`

const updateTodoDetails = `
  mutation MyMutation {
    updateTodo(input: {id: "a057cb91-b799-4e37-8277-1f805afa88b6", firstname: "api2"}) {
      id
      firstname
      lastname
      age
    }
  }
`

const getTodoDetails = `
  query MyQuery {
    getTodo(id: "") {
      id
      firstname
      lastname
      age
    }
  }
`

const imageSelectHandler = async() => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  await launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      setSelectedImage(response.assets[0]);
      console.log(response.assets[0]);
    }
  });
  }

const handleSubmit = async() => {
  let imagedata;
  setShowNextPageBtn(false);
  setIsLoading(true);
  // Profile Image Upload
  const file = selectedImage;
  const response = await fetch(file.uri);
  const blob = await response.blob();
  const fileName = showTimeDate() + '__' + firstname + '_' + lastname;
  await Storage.put(fileName, blob, {
    contentType: file.type,
  }).then((result) => {
    const image = {
      file: {
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
        key: 'public/' + fileName,
      }
    }
    setProfileImage(image);
    imagedata = image;
    console.log(imagedata);
  })

  const createTodo2 = `
    mutation create {
      createTodo(input: {
        firstname: "${firstname}"
        lastname: "${lastname}"
        gender: "${gender}"
        age: ${age}
        profileImage: {
          bucket: "${imagedata.file.bucket}"
          region: "${imagedata.file.region}"
          key: "${imagedata.file.key}"
        }
      }) {
        id firstname lastname age profileImage {
          bucket region key
        } 
      }
    }
  `

  const createUser = await API.graphql(graphqlOperation(createTodo2));
  console.log(createUser.data);
  setId(createUser.data.createTodo.id);
  setShowNextPageBtn(true);
  setIsLoading(false);
}


const showTimeDate = () => {
  const date = new Date();
  const time = date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();
  const day = date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
  return(time + '_' + day);
}


const handleclick = async() => {
  const allTodos = await API.graphql(graphqlOperation(listTodos));
  /* allTodos.data.listTodos.items.map((todo) => {
    console.log(todo['id'] + ' ' + todo['firstname'] + ' ' + todo['lastname'] + ' ' + todo['gender'] + ' ' + todo['age']);
  }) */
  console.log(allTodos.data.listTodos.items);

  /* const deleteTodoResult = await API.graphql(graphqlOperation(deleteTodoDetails));
  console.log(deleteTodoResult); */

  /* const updateTodoResult = await API.graphql(graphqlOperation(updateTodoDetails));
  console.log(updateTodoResult); */

  /*const createUser = await API.graphql(graphqlOperation(createTodo));
  console.log(createUser); */
}

/* const showImage = async() => {
  const image = await Storage.get('public/Himanshi__1000000033.jpg');
  setGotImage(image);
  console.log(image);
} */

const handleNavigationClick = async() => {
  /* const pushAction = StackActions.push('Main');
  navigation.dispatch(pushAction); */
  navigation.navigate('Main');
  await analytics().logEvent('screen_change', {
    screen_name: 'Main',
  });
  await analytics().logScreenView({
    screen_name: 'Main',
  });

}

const handletestclick = async() => {
  await analytics().logEvent('button_click', {
    button_name: 'my_button',
  });
  console.log('Button clicked');
}

  return (
    <View style={styles.loginPageContainer}>
      {/* <Image source={{uri: 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg'}} style={styles.logo} /> */}
      <Image source={require("../assets/logos/shink5.jpg")} style={styles.logo} />
      <Text style={styles.tagline}>The Safer, Kinder, AI-Ascendant Dating App</Text>
      <View style={styles.Btns}>
        <Pressable style={styles.testBtn} onPress={handletestclick}>
          <Text style={styles.testBtnText}>Click</Text>
        </Pressable>
        <Pressable style={styles.nextPageBtn} onPress={handleNavigationClick}>
          <Text style={styles.nextPageBtnText}>Main</Text>
        </Pressable>
      </View>
      <Text style={styles.screenName}>Please enter your details.</Text>
      <TextInput style={styles.textInput} value={firstname} onChangeText={setFirstname} placeholder="Firstname" />
      <TextInput style={styles.textInput} value={lastname} onChangeText={setLastname} placeholder="Lastname" />
      <TextInput style={styles.textInput} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
      <Dropdown
        style={styles.textInput}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Gender"
        searchPlaceholder="Search..."
        value={gender}
        onChange={item => {
          setGender(item.value);
        }}
        renderItem={renderItem}
      />
      <View style={styles.selectImageContainer}>
        <Text style={styles.selectedImageName}>{selectedImage.uri ? selectedImage.uri : 'Upload Your Profile Image'}</Text>
        <Pressable onPress={imageSelectHandler} style={styles.imageUploadBtn}>
          <Text>Upload Image</Text>
        </Pressable>
      </View>
      <Pressable style={styles.fullLengthBtn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </Pressable>
      {showNextPageBtn ? (
        <View style={styles.userCreatedContainer}>
          <Text style={styles.userCreatedText}>User Created</Text>
          <Pressable style={styles.userCreatedBtn}>
            <Text style={styles.userCreatedBtnText} onPress={handleNavigationClick}>Next</Text>
          </Pressable>
        </View>
      ) : null}
      <Loader loading={isLoading} color="#A8F9AA" title="Creating User" />
    </View>
  );
};

const styles = StyleSheet.create({
  loginPageContainer: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    height: '100%',
    width: '100%',
    overflow: 'scroll',
  },

  logo: {
    marginTop: 30,
    width: 100,
    height: 100,
  },

  tagline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A8F9AA',
    textAlign: 'center',
    paddingHorizontal: 50,
    width: '90%'
  },

  textInput: {
    width: 340,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderStyle: 'solid',
  },

  fullLengthBtn: {
    width: 340,
    height: 50,
    backgroundColor: '#5DC8F7',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //testBtns
  Btns: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  testBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  testBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  nextPageBtn: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  nextPageBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  screenName: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.6,
  },

  dropdown: {
    margin: 16,
    height: 50,
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textItem: {
    flex: 1,
    fontSize: 16,
  },

  placeholderStyle: {
    fontSize: 14,
  },

  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectImageContainer: {
    width: 340,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageUploadBtn: {
    width: 150,
    height: 40,
    backgroundColor: 'rgba(93, 200, 247, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(93, 200, 247, 0.7)',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedImageName: {
    width: '55%',
    display: 'flex',
    fontSize: 14
  },

  userCreatedContainer: {
    width: 300,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    borderRadius: 10,
  },

  userCreatedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },

  userCreatedBtn: {
    width: 80,
    height: 30,
    backgroundColor: 'rgba(25, 110, 5, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(93, 200, 247, 0.7)',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userCreatedBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default LoginPage;