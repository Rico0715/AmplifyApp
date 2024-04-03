
import * as React from 'react';
import { Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignOutButton from './src/SignOutButton';
import MyTasksScreen from './src/Screens/MyTasksScreen';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import awsExports from './src/aws-exports';

import CreateTodoForm from './src/Screens/UserProfile';
import GetPostsButton from './src/Screens/getPostsButton';
Amplify.configure(awsExports);

const Stack = createStackNavigator();


function App() {
  return (
    <Authenticator.Provider>
    <Authenticator>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" component={CreateTodoForm} options={{ title: 'Task List' }} />
          <Stack.Screen name="CreateTodo" component={CreateTodoForm} options={{ title: 'Create Task' }} />
          <Stack.Screen name="MyTasks" component={MyTasksScreen} options={{ title: 'My Tasks' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <SignOutButton />
    </Authenticator>
  </Authenticator.Provider>
  );
}

export default App;