import React, { Component } from 'react'
import FCM, { FCMEvent } from 'react-native-fcm'
import {
  Text,
  View
} from 'react-native'

export default class App extends Component {
  componentDidMount() {
    FCM.requestPermissions() // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
      // store fcm token in your server
    })
    this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    })
    this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token) // fcm token may not be available on first load, catch it here
    })

    FCM.subscribeToTopic('/topics/foo-bar')
    FCM.unsubscribeFromTopic('/topics/foo-bar')
  }
  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe()
    this.notificationUnsubscribe()
  }

  render() {
    console.disableYellowBox = true
    return (
      <View style={ styles.container }>
        <Text style={ styles.welcome }>
          React Native
        </Text>
        <Text style={ styles.instructions }>
          Firebase Push Test
        </Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
}
