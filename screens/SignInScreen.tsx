import React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { AuthTabScreenProps } from '../types';
import { useAppDispatch } from '../store/hooks';
import { signIn } from '../store/auth/slice';

export default function SignInScreen({ navigation }: AuthTabScreenProps<'SignIn'>) {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const dispatch = useAppDispatch()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>
      <View style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // backgroundColor: "red",
        width: '100%',
        padding: 20,
        marginTop: 20,
        elevation: 10
      }}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={({ nativeEvent: { text } }) => {
            setEmail(text)
          }}
        />

        <Text style={{ marginTop: 10 }}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}

          onChange={({ nativeEvent: { text } }) => {
            setPassword(text)
          }}
        />

        <View style={{
          marginTop: 10
        }}>
          <Button
            title="Login"
            onPress={() => {
              if (email !== undefined && password !== undefined) {
                dispatch(signIn({ email, password }))
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  title: {
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 24,
    textAlign: "center"
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flexGrow: 1,
    width: "100%"
  },
});
