import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';

const MyTasksScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listPosts));
      const postsData = response.data.listPosts.items;
      setPosts(postsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map(post => (
        <View key={post.id} style={styles.taskContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
          <View style={styles.separator}></View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  taskContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
});

export default MyTasksScreen;
