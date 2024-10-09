import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            if (storedUsers !== null) {
                const users = JSON.parse(storedUsers);
                const user = users.find(user => user.email === email);
                if (user) {
                    if (user.password === password) {
                        alert("Đăng nhập thành công.");
                        navigation.navigate("Payments");
                    } else {
                        alert("Mật khẩu không đúng.");
                    }
                } else {
                    alert("Email không tồn tại.");
                }
            } else {
                alert("Không tìm thấy người dùng. Vui lòng đăng ký trước.");
            }
        } catch (error) {
            alert("Đăng nhập thất bại.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("./assets/DATA/Image20.png")} style={styles.imageLogin} />
            <Text style={styles.title}>Chào mừng!</Text>

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
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Image source={require("./assets/DATA/eye.png")} style={styles.icon} />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.signupText}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginTop: 30,
        textAlign: 'left',
        fontWeight: 'bold',
        marginLeft: 16,
        paddingBottom: 50,
    },
    inputContainer: {
        flexDirection: "row",
        margin: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: "gray",
        fontWeight: "bold",
    },
    icon: {
        marginRight: 10,
    },
    button: {
        margin: 20,
        padding: 15,
        alignItems: "center",
        backgroundColor: "#4630EB",
        borderRadius: 50,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    imageLogin: {
        width: "100%",
        height: 200,
        justifyContent: 'flex-start',
    },
    signupLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    signupText: {
        color: "#4630EB",
        fontWeight: "bold",
    },
});

export default Login;