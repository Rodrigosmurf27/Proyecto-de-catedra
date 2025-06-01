import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Formik } from "formik";

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={values => onSubmit(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={handleChange("username")}
          onBlur={handleBlur("username")}
          value={values.username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
          secureTextEntry
        />
        <Button title="Ingresar" onPress={handleSubmit} />
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: "center" },
  title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 16 }
});

export default LoginForm;
