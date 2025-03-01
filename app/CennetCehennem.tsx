import {Text, View, StyleSheet, ScrollView, TextInput, Button, Alert, Animated, TouchableOpacity, Image} from 'react-native';
import { StatusBar } from "expo-status-bar";
import React, {useMemo, useRef, useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation } from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";

export default function CennetCehennem() {

    const [zebani, setZebani] = useState('0')
    const [melek, setMelek] = useState('0')
    const [erdogan, setErdogan] = useState('1')
    const [huri, setHuri] = useState('0')
    const [ates, setAtes] = useState('100')
    const [yas, setYas] = useState('9')


    const bottomSheetRefs = [
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null)
    ]

    const handleCloseAllSheets = () => {
        bottomSheetRefs.forEach(ref => ref.current?.close())
    }

    const handleOpenSheet = (index: number) => {
        handleCloseAllSheets()
        bottomSheetRefs[index].current?.expand()
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View>
                <Text style={styles.text}>
                    Cennet Cehennem Paneli
                </Text>
                <View style={styles.line}></View>
            </View>

            <View style={styles.durumContainer}>
                <Image
                style={styles.cehennetImage}
                source={require("../images/cehennet.jpg")}
                />
            </View>

            <View style={styles.durumContainer}>
                    <Text style={styles.durumText}>
                        Zebani Sayısı:
                        <Text style={{color: "red"}}>   {zebani}</Text>
                    </Text>

                    <Text style={styles.durumText}>
                        Melek Sayısı:
                        <Text style={{color: "red"}}>   {melek}</Text>
                    </Text>
            </View>
            <View style={styles.durumContainer}>
                <Text style={styles.durumText}>
                    Erdoğan Sayısı:
                    <Text style={{color: "red"}}>   {erdogan}</Text>
                </Text>

                <Text style={styles.durumText}>
                    Huri Sayısı:
                    <Text style={{color: "red"}}>   {huri}</Text>
                </Text>
            </View>
            <View style={styles.durumContainer}>
                <Text style={styles.durumText}>
                    Ateş Sıcaklığı:
                    <Text style={{color: "red"}}>   {ates}</Text>
                </Text>

                <Text style={styles.durumText}>
                    Huri Yaşı:
                    <Text style={{color: "red"}}>   {yas}</Text>
                </Text>
            </View>

            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleOpenSheet(0)}
                    >
                        <Text style={{ color: "white" }}>Zebani Sayısı</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleOpenSheet(1)}
                    >
                        <Text style={{ color: "white" }}>Melek Sayısı</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleOpenSheet(2)}
                    >
                        <Text style={{ color: "white" }}>Erdoğan Sayısı</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleOpenSheet(3)}
                    >
                        <Text style={{ color: "white" }}>Huri Sayısı</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleOpenSheet(4)}
                    >
                        <Text style={{ color: "white" }}>Ateş Sıcaklığı</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleOpenSheet(5)}
                    >
                        <Text style={{ color: "white" }}>Huri Yaşı</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BottomSheet
                ref={bottomSheetRefs[0]}
                index={-1}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >

                <BottomSheetView style={styles.contentContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Yeni Zebanı Sayısını Giriniz"
                        value={zebani}
                        onChangeText={setZebani}
                        inputMode="numeric"
                    />

                    <TouchableOpacity
                        style={styles.inputbutton}
                        onPress={() => {
                            if (zebani.trim() === "") {
                                Alert.alert("Lütfen bir sayı giriniz!");
                            } else {
                                Alert.alert("Zebani Sayısı Değiştirildi!", `Yeni zebani sayısı: ${zebani}!`);
                                bottomSheetRefs[0].current?.close();
                            }
                        }}
                    >
                        <Text>Zebani Sayısını Değiştir</Text>
                    </TouchableOpacity>

                </BottomSheetView>

            </BottomSheet>

            <BottomSheet
                ref={bottomSheetRefs[1]}
                index={-1}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >

                <BottomSheetView style={styles.contentContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Yeni Melek Sayısını Giriniz"
                        value={melek}
                        onChangeText={setMelek}
                        inputMode="numeric"
                    />

                    <TouchableOpacity
                        style={styles.inputbutton}
                        onPress={() => {
                            if (erdogan.trim() === "") {
                                Alert.alert("Lütfen bir sayı giriniz!");
                            } else {
                                Alert.alert("Melek Sayısı Değiştirildi!", `Yeni melek sayısı: ${melek}!`);
                                bottomSheetRefs[1].current?.close();
                            }
                        }}
                    >
                        <Text>Melek Sayısını Değiştir</Text>
                    </TouchableOpacity>

                </BottomSheetView>

            </BottomSheet>

            <BottomSheet
                ref={bottomSheetRefs[2]}
                index={-1}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >

                <BottomSheetView style={styles.contentContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Yeni Erdoğan Sayısını Giriniz"
                        value={erdogan}
                        onChangeText={setErdogan}
                        inputMode="numeric"
                    />

                    <TouchableOpacity
                        style={styles.inputbutton}
                        onPress={() => {
                            if (erdogan.trim() === "") {
                                Alert.alert("Lütfen bir sayı giriniz!");
                            } else {
                                Alert.alert("Erdoğan Sayısı Değiştirildi!", `Yeni erdoğan sayısı: ${erdogan}!`);
                                bottomSheetRefs[2].current?.close();
                            }
                        }}
                    >
                        <Text>Erdoğan Sayısını Değiştir</Text>
                    </TouchableOpacity>

                </BottomSheetView>

            </BottomSheet>

            <BottomSheet
                ref={bottomSheetRefs[3]}
                index={-1}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >

                <BottomSheetView style={styles.contentContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Yeni Huri Sayısını Giriniz"
                        value={huri}
                        onChangeText={setHuri}
                        inputMode="numeric"
                    />

                    <TouchableOpacity
                        style={styles.inputbutton}
                        onPress={() => {
                            if (huri.trim() === "") {
                                Alert.alert("Lütfen bir sayı giriniz!");
                            } else {
                                Alert.alert("Huri Sayısı Değiştirildi!", `Yeni huri sayısı: ${huri}!`);
                                bottomSheetRefs[3].current?.close();
                            }
                        }}
                    >
                        <Text>Huri Sayısını Değiştir</Text>
                    </TouchableOpacity>

                </BottomSheetView>

            </BottomSheet>

            <BottomSheet
                ref={bottomSheetRefs[4]}
                index={-1}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >

                <BottomSheetView style={styles.contentContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Yeni Ateş Sıcaklığını Giriniz"
                        value={ates}
                        onChangeText={setAtes}
                        inputMode="numeric"
                    />

                    <TouchableOpacity
                        style={styles.inputbutton}
                        onPress={() => {
                            if (ates.trim() === "") {
                                Alert.alert("Lütfen bir sayı giriniz!");
                            } else {
                                Alert.alert("Ateş Sıcaklığı Değiştirildi!", `Yeni ateş sıcaklığı: ${ates}!`);
                                bottomSheetRefs[0].current?.close();
                            }
                        }}
                    >
                        <Text>Ateş Sıcaklığını Değiştir</Text>
                    </TouchableOpacity>

                </BottomSheetView>

            </BottomSheet>

            <BottomSheet
                ref={bottomSheetRefs[5]}
                index={-1}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >

                <BottomSheetView style={styles.contentContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Yeni Huri Yaşını Giriniz"
                        value={yas}
                        onChangeText={setYas}
                        inputMode="numeric"
                    />

                    <TouchableOpacity
                        style={styles.inputbutton}
                        onPress={() => {
                            if (yas.trim() === "") {
                                Alert.alert("Lütfen bir sayı giriniz!");
                            } else {
                                Alert.alert("Hurişlerin Yaşı Değiştirildi!", `Yeni huri yaşı: ${yas}!`);
                                bottomSheetRefs[5].current?.close();
                            }
                        }}
                    >
                        <Text>Hurilerin Yaşını Değiştir</Text>
                    </TouchableOpacity>

                </BottomSheetView>

            </BottomSheet>


        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        padding: 10,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    durumContainer: {
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "flex-start",
        width: "100%"
    },
    imageContainet: {
        padding: 10,
        backgroundColor: '#fff',
        width: "100%"
    },
    line: {
        height: 1,
        width: "80%",
        backgroundColor: Colors.dark.solidFillDefault,
        marginLeft: "10%"
    },
    cehennetImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    inputDurum: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
    },
    durumText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        padding: 10,
        textAlign: "left",
        backgroundColor: "#fff",
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
    },
    button: {
        height: 50,
        width: "49%",
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 10,
    },
    sheetBackground: {
        backgroundColor: Colors.dark.solidFillDefault,
        borderRadius: 20
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
        backgroundColor: Colors.dark.subtleFillSecondary,
    },
    inputbutton: {
        height: 40,
        width: "80%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    textinput: {
        height: 40,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
    }
})