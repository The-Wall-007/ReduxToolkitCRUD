import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createPost} from '../redux/slices/postSlice';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [showPost, setShowPost] = useState(false);

  const dispatch = useDispatch();

  const {loading, post} = useSelector(state => ({...state.app}));

  const handleSave = () => {
    dispatch(createPost({title, body}));
    setShowPost(true);
  };

  return (
    <View style={styles.container}>
      <Text>Create Post</Text>
      <View>
        <TextInput
          onChangeText={setTitle}
          value={title}
          style={styles.input}
          placeholder={'Enter Title'}
        />
        <TextInput
          onChangeText={setBody}
          value={body}
          style={styles.input}
          placeholder={'Enter Body'}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
      {showPost && (
        <View style={styles.postContainer}>
          <View>
            {loading && <Text>Loading...</Text>}
            {post.length > 0 && <Text>{post[0].title}</Text>}
            {post.length > 0 && <Text>{post[0].body}</Text>}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    marginVertical: 8,
  },
  postContainer: {
    borderWidth: 1,
    height: '30%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePost;
