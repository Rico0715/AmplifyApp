import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetPostsButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MyTasks');
  };

  return (
    <Button title="Voir mes tâches" onPress={handlePress} />
  );
};

export default GetPostsButton;
