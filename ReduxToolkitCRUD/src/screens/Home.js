import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from '../redux/slices/postSlice';

const Home = ({navigation}) => {
  const [id, setID] = useState('');

  const dispatch = useDispatch();

  const {loading, post, edit, body, title} = useSelector(state => ({
    ...state.app,
  }));

  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');

  useEffect(() => {
    setBodyText(body);
    setTitleText(title);
  }, [body, title]);

  const handleFetch = () => {
    if (id === '') Alert.alert('Please enter valid id');
    dispatch(getPost({id}));
    setID('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fetch the post</Text>
      </View>
      <TextInput onChangeText={setID} value={id} style={styles.input} />
      <View style={styles.buttonContainer}>
        <Button title="Get the post" onPress={handleFetch} />
        <Button
          title="Create new post"
          onPress={() => navigation.navigate('Create Post')}
        />
      </View>
      {post.length > 0 && (
        <View style={styles.postContainer}>
          <View>
            {loading && <Text>Loading...</Text>}
            {post.length > 0 && (
              <>
                {edit ? (
                  <>
                    <TextInput
                      onChangeText={setTitleText}
                      value={titleText}
                      style={styles.input}
                    />
                    <TextInput
                      onChangeText={setBodyText}
                      value={bodyText}
                      style={styles.input}
                    />
                  </>
                ) : (
                  <>
                    <Text>{post[0].title}</Text>
                    <Text>{post[0].body}</Text>
                  </>
                )}
              </>
            )}
          </View>

          {edit ? (
            <View style={[styles.buttonContainer, {width: '100%'}]}>
              <Button
                title="Save the post"
                onPress={() => {
                  dispatch(
                    updatePost({
                      id: post[0].id,
                      title: titleText,
                      body: bodyText,
                    }),
                  );
                  dispatch(
                    setEdit({
                      edit: false,
                    }),
                  );
                }}
              />
            </View>
          ) : (
            <View style={[styles.buttonContainer, {width: '100%'}]}>
              <Button
                title="Edit the post"
                onPress={() =>
                  dispatch(
                    setEdit({
                      edit: true,
                      body: post[0].body,
                      title: post[0].title,
                    }),
                  )
                }
              />
              <Button
                title="Delete the post"
                onPress={() => dispatch(deletePost({id: post[0].id}))}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  postContainer: {
    borderWidth: 1,
    height: '50%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
