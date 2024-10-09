import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async () => {
    if (!username || username.length < 3) {
      alert("Tên người dùng phải có ít nhất 3 ký tự.");
      return;
    }
    if (!email || !validateEmail(email)) {
      alert("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    if (!password || password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (!agree) {
      alert("Bạn phải đồng ý với các điều khoản và điều kiện.");
      return;
    }

    const newUser = { username, email, password };
    try {
      let users = [];
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers !== null) {
        users = JSON.parse(storedUsers);
      }
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      alert("Đăng ký thành công!");
      // Clear the input fields
      setUsername("");
      setEmail("");
      setPassword("");
      setAgree(false);
      navigation.navigate("Home");
    } catch (error) {
      alert("Đăng ký thất bại.");
    }
  };

  handleExportAccount = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers !== null) {
        const users = JSON.parse(storedUsers);
        console.log(users);
      } else {
        alert("Không tìm thấy người dùng. Vui lòng đăng ký trước.");
      }
    } catch (error) {
      alert("Lỗi khi xuất dữ liệu.");
    }
  };

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollViewContainer}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("./assets/DATA/Image19.png")} style={styles.image} />
          <Text style={styles.title}>Rất vui được gặp bạn!</Text>
          <Text style={styles.subtitle}>Tạo tài khoản của bạn</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image source={require("./assets/DATA/codicon_account.png")} style={styles.icon} />
          <TextInput
            placeholder="Nhập tên người dùng của bạn"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require("./assets/DATA/Vector.png")} style={styles.icon} />
          <TextInput
            placeholder="Nhập địa chỉ email của bạn"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require("./assets/DATA/lock.png")} style={styles.icon} />
          <TextInput
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={require("./assets/DATA/eye.png")} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={agree}
            onValueChange={() => setAgree(!agree)}
            color={agree ? "#4630EB" : undefined}
          />
          <Text style={styles.checkboxText}>
            Tôi đồng ý với
            <TouchableOpacity>
              <Text style={styles.link}> Điều khoản & Điều kiện</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleExportAccount}
        >
          <Text style={styles.buttonText}>Xuất tài khoản</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  image: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "gray",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: 15,
    padding: 15,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    textAlign: "center",
    color: "gray",
  },
  link: {
    color: "#4630EB",
  },
  button: {
    margin: 20,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#4630EB",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollViewContainer: {
    height: 100,
  },
});

export default SignUp;