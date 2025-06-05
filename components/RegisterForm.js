import React from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { colors, font, sizes } from "../theme";

const RegisterForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: "", password: "", confirm: "" }}
    onSubmit={values => onSubmit(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={colors.textSecondary}
          onChangeText={handleChange("username")}
          onBlur={handleBlur("username")}
          value={values.username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor={colors.textSecondary}
          onChangeText={handleChange("confirm")}
          onBlur={handleBlur("confirm")}
          value={values.confirm}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background
  },
  title: {
    fontSize: 28,
    marginBottom: 28,
    textAlign: "center",
    fontFamily: font.bold,
    color: colors.primary,
    letterSpacing: 1
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.borderRadius,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.cardBg,
    color: colors.text,
    fontFamily: font.regular
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: font.bold
  }
});

export default RegisterForm;
