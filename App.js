import { useState, useEffect, Dimensions, useRef } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { firestore, MESSAGES, collection, addDoc, query, onSnapshot } from './firebase/Config';
import Constants from 'expo-constants';
import { converFirebaseTimestampToJS } from './helpers/Function';
import { orderBy, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES),orderBy('created','asc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: converFirebaseTimestampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

      return () => {
        unsubscribe()
      }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore,MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    })
    setNewMessage('')
    console.log('Message saved.')
  }

  const scrollViewRef = useRef();

  return (
    <View style={styles.container}>
      <ScrollView height='80%' ref={scrollViewRef}>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      <View style={styles.messageContainer}>
      <TextInput
        style={styles.input}
        onChangeText={text => setNewMessage(text)}
        value={newMessage} placeholder='Send message...' />
      <Button 
        title="Send"
        type="button" 
        onPress={() => {
          save()
          scrollViewRef.current.scrollToEnd({ animated: true })
        }}        
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '15%'
  }

});
