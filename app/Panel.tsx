import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    TextInput,
    Switch,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider"

const App = () => {

    const [peygamber, setPeygamber] = useState('')
    const [deprem, setDeprem] = useState('')
    const [peygamberList, setPeygamberList] = useState<{ name: string }[]>([])
    const STORAGE_KEY = "peygamberList"
    const [depremBuyukluk, setDepremBuyukluk] = useState(5.0)
    const [virus, setVirus] = useState('')
    const [gezegen, setGezegen] = useState('')
    const [evren, setEvren] = useState('')
    const [yildiz, setYildiz] = useState('')
    const [melek, setMelek] = useState('')
    const [cin, setCin] = useState('')

    const bottomSheetRefs = [
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
        useRef<BottomSheet>(null),
    ]

    const handleCloseAllSheets = () => {
        bottomSheetRefs.forEach(ref => ref.current?.close())
    }

    const handleOpenSheet = (index: number) => {
        handleCloseAllSheets()
        bottomSheetRefs[index].current?.expand()
    }

    const [switchValueYangin, setSwitchValueYangin] = useState(false)
    const [switchValueSel, setSwitchValueSel] = useState(false)
    const toggleSwitchYangin = (value: boolean | ((prevState: boolean) => boolean)) => {
        setSwitchValueYangin(value)
    }
    const toggleSwitchSel = (value: boolean | ((prevState: boolean) => boolean)) => {
        setSwitchValueSel(value)
    }

    const loadPeygamberList = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY)

            if (data) {
                setPeygamberList(JSON.parse(data))
            }
        } catch (err) {
            console.error("Yükleme Hatası: ", err)
        }
    }

    useEffect(() => {
        loadPeygamberList()
    }, [])

    const addPeygamber = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            const list = data ? JSON.parse(data) : [];

            if (peygamber.trim() === "") {
                Alert.alert("Lütfen bir isim giriniz!");
                return;
            }

            if (list.some((item: { name: string }) => item.name.toLowerCase() === peygamber.toLowerCase())) {
                Alert.alert("Bu kişi zaten peygamber!");
                return;
            }

            const newList = [...list, { name: peygamber }];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            setPeygamberList(newList);
            setPeygamber("");
            bottomSheetRefs[0].current?.close();

            Alert.alert("Peygamber Gönderildi!", `${peygamber} adındaki peygamber gönderildi!`);
        } catch (err) {
            console.error("Peygamber Ekleme İşleminde Sorun: ", err);
        }
    };


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <View>
                <Text style={styles.text}>
                    Genel Panel
                </Text>
                <View style={styles.line}></View>
            </View>

            <View style={styles.inputcontainer}>

                <Text style={styles.inputText}>
                    {switchValueYangin ? "Yangınlar Aktif" : "Yangınlar Kapalı"}
                </Text>

                <Switch
                    style={styles.switch}
                    onValueChange={toggleSwitchYangin}
                    value={switchValueYangin}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={switchValueYangin ? "red" : "#f4f3f4"}
                >

                </Switch>

                <Text style={styles.inputText}>
                    {switchValueSel ? "Seller Aktif" : "Seller Kapalı"}
                </Text>

                <Switch
                    style={styles.switch}
                    onValueChange={toggleSwitchSel}
                    value={switchValueSel}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={switchValueSel ? "blue" : "#f4f3f4"}
                >

                </Switch>
            </View>

            <TouchableWithoutFeedback onPress={handleCloseAllSheets}>

                <View style={styles.container}>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(0)}
                        >
                            <Text style={{ color: "white" }}>Peygamber Gönder</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(1)}
                        >
                            <Text style={{ color: "white" }}>Deprem Yarat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(2)}
                        >
                            <Text style={{ color: "white" }}>Virüs Gönder</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(3)}
                        >
                            <Text style={{ color: "white" }}>Melek Yarat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(4)}
                        >
                            <Text style={{ color: "white" }}>Cin Yarat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(5)}
                        >
                            <Text style={{ color: "white" }}>Yeni Evren Yarat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(6)}
                        >
                            <Text style={{ color: "white" }}>Yıldız Yarat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleOpenSheet(7)}
                        >
                            <Text style={{ color: "white" }}>Gezegen Yarat</Text>
                        </TouchableOpacity>

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
                                placeholder="Peygamber olacak kişinin ismini girin"
                                value={peygamber}
                                onChangeText={setPeygamber}
                            />
                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                        addPeygamber()
                                }}
                            >
                                <Text>Peygamber Gönder</Text>
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
                                placeholder="Deprem gönderilecek bölgeyi giriniz"
                                value={deprem}
                                onChangeText={setDeprem}
                            />

                            <Text style={styles.label}>Büyüklük: {depremBuyukluk.toFixed(1)}</Text>
                            <Slider
                                style={{width: "80%", height: 40}}
                                minimumValue={1.0}
                                maximumValue={10.0}
                                step={0.1}
                                value={depremBuyukluk}
                                onValueChange={setDepremBuyukluk}
                                minimumTrackTintColor="red"
                                maximumTrackTintColor="gray"
                                thumbTintColor="black"
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (deprem.trim() === "") {
                                        Alert.alert("Lütfen bir bölge giriniz!");
                                    } else {
                                        Alert.alert("Deprem Gönderildi!", `${deprem} bölgesine ${depremBuyukluk.toFixed(1)} büyüklüğünde deprem gönderildi!`);
                                        bottomSheetRefs[1].current?.close();
                                    }
                                }}
                            >
                                <Text>Deprem Yarat</Text>
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
                                placeholder="Virüs gönderilecek bölgeyi giriniz"
                                value={virus}
                                onChangeText={setVirus}
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (deprem.trim() === "") {
                                        Alert.alert("Lütfen bir bölge giriniz!");
                                    } else {
                                        Alert.alert("Virüs Gönderildi!", `${deprem} bölgesine virüs gönderildi!`);
                                        bottomSheetRefs[2].current?.close();
                                    }
                                }}
                            >
                                <Text>Virüs Gönder</Text>
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
                                placeholder="Melek için bir isim giriniz"
                                value={melek}
                                onChangeText={setMelek}
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (melek.trim() === "") {
                                        Alert.alert("Meleğe bir isim veriniz!");
                                    } else {
                                        Alert.alert("Melek Yaratıldı!", `${melek} ismindeki melek yaratıldı!`);
                                        bottomSheetRefs[3].current?.close();
                                    }
                                }}
                            >
                                <Text>Melek Yarat</Text>
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
                                placeholder="Cin için bir isim giriniz"
                                value={cin}
                                onChangeText={setCin}
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (cin.trim() === "") {
                                        Alert.alert("Cine bir isim veriniz!");
                                    } else {
                                        Alert.alert("Cin Yaratıldı!", `${cin} ismindeki cin yaratıldı!`);
                                        bottomSheetRefs[4].current?.close();
                                    }
                                }}
                            >
                                <Text>Cin Yarat</Text>
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
                                placeholder="Evren için bir isim giriniz"
                                value={evren}
                                onChangeText={setEvren}
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (evren.trim() === "") {
                                        Alert.alert("Evrene bir isim veriniz!");
                                    } else {
                                        Alert.alert("Yeni Evren Yaratıldı!", `${evren} ismindeki yeni evren yaratıldı!`);
                                        bottomSheetRefs[5].current?.close();
                                    }
                                }}
                            >
                                <Text>Evren Yarat</Text>
                            </TouchableOpacity>

                        </BottomSheetView>

                    </BottomSheet>

                    <BottomSheet
                        ref={bottomSheetRefs[6]}
                        index={-1}
                        snapPoints={useMemo(() => ["30%"], [])}
                        enablePanDownToClose={true}
                        backgroundStyle={styles.sheetBackground}
                    >

                        <BottomSheetView style={styles.contentContainer}>
                            <TextInput
                                style={styles.textinput}
                                placeholder="Yıldız için bir isim giriniz"
                                value={yildiz}
                                onChangeText={setYildiz}
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (yildiz.trim() === "") {
                                        Alert.alert("Yıldıza bir isim veriniz!");
                                    } else {
                                        Alert.alert("Yıldız Yaratıldı!", `${yildiz} ismindeki yıldız yaratıldı!`);
                                        bottomSheetRefs[6].current?.close();
                                    }
                                }}
                            >
                                <Text>Yıldız Yarat</Text>
                            </TouchableOpacity>

                        </BottomSheetView>

                    </BottomSheet>

                    <BottomSheet
                        ref={bottomSheetRefs[7]}
                        index={-1}
                        snapPoints={useMemo(() => ["30%"], [])}
                        enablePanDownToClose={true}
                        backgroundStyle={styles.sheetBackground}
                    >

                        <BottomSheetView style={styles.contentContainer}>
                            <TextInput
                                style={styles.textinput}
                                placeholder="Gezegen için bir isim giriniz"
                                value={gezegen}
                                onChangeText={setGezegen}
                            />

                            <TouchableOpacity
                                style={styles.inputbutton}
                                onPress={() => {
                                    if (gezegen.trim() === "") {
                                        Alert.alert("Gezegene bir isim veriniz!");
                                    } else {
                                        Alert.alert("Gezegen Yaratıldı!", `${gezegen} ismindeki gezegen yaratıldı!`);
                                        bottomSheetRefs[7].current?.close();
                                    }
                                }}
                            >
                                <Text>Gezegen Yarat</Text>
                            </TouchableOpacity>

                        </BottomSheetView>

                    </BottomSheet>

                </View>

            </TouchableWithoutFeedback>

        </GestureHandlerRootView>
    );

};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
        backgroundColor: Colors.dark.subtleFillSecondary,
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
        borderRadius: 20,
    },
    textinput: {
        height: 40,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
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
    text: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        padding: 10,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    line: {
        height: 1,
        width: "80%",
        backgroundColor: Colors.dark.solidFillDefault,
        marginLeft: "10%"
    },
    inputText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        padding: 10,
        textAlign: "left",
        backgroundColor: "#fff",
    },
    inputcontainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    switch: {
        transform: [{scale: 1.2}],
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        color: "black",
        textAlign: "center",
    }
});

export default App;