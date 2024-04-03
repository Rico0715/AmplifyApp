import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { useAuthenticator} from "@aws-amplify/ui-react-native";


export default function SignOutButton() {
    const { signOut } = useAuthenticator();
    return (
      <View style={styles.container}>
          <Button title="Sign Out" onPress={signOut} />
      </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'left', 
    
  }
});
