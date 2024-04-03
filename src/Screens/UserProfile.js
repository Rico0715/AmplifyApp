import React from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { graphqlOperation} from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import GetPostsButton from './getPostsButton';
import MyTasksScreen from './MyTasksScreen';
import { useNavigation } from '@react-navigation/native';

Amplify.configure(awsmobile);

const CreateTodoForm = () => {
    const navigation = useNavigation(); // Utilisez useNavigation pour obtenir l'objet de navigation

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleCreateTodo() {
        try {
            if (!title || !description) {
                Alert.alert('Champs obligatoires', 'Veuillez remplir tous les champs.');
                return;
            }
            const user = await Auth.currentAuthenticatedUser();
            const owner = user.username;
            const input = {
                title: title,
                description: description,
                owner: owner
            };
            const result = await API.graphql(graphqlOperation(createPost, { input }));
            console.log('Tâche créée:', result.data.createPost);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
        }
    }

    const handleGoToMyTasks = () => {
        navigation.navigate('MyTasks'); // Naviguez vers MyTasksScreen lors de l'appui sur le bouton
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <TextInput
                style={styles.input}
                placeholder="Titre de la tâche"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description de la tâche"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateTodo}>
                <Text style={styles.buttonText}>Créer la tâche</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleGoToMyTasks}>
                <Text style={styles.buttonText}>Vos Taches</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 50,
        paddingBottom: 70 - 10, // Ajoutez un padding en bas pour éviter que le bouton ne soit masqué par le clavier
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    button: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default CreateTodoForm;
//return (
    //   <View style={styles.container}>
    //     <View style={styles.profileHeader}>
    //       <Image
    //         source={{ uri: 'https://imgs.search.brave.com/3csjQCtodFow2n0X6S-MBgIUtodyVpkg3k2dizzg0DM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cGhvdG9zLXByZW1p/dW0vcHJvZmlsLWhv/bW1lLWVsZWdhbnRf/MTAyNjcxLTM5NjMu/anBnP3NpemU9NjI2/JmV4dD1qcGc' }} // Insérer l'URL de l'image de profil
    //         style={styles.profileImage}
    //       />
    //       <View style={styles.profileInfo}>
    //         <Text style={styles.profileName}>John Doe</Text> 
    //         <Text style={styles.profileBio}>Software Engineer</Text> 
    //         <Text style={styles.profileStats}>Posts: 100 | Followers: 1000 | Following: 500</Text> 
    //       </View>
    //     </View>
        
    //   </View>
    // );