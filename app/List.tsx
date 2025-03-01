import React, {useCallback, useState, useRef, useMemo, useEffect} from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const STORAGE_KEY = "peygamberList"

const List = () => {
    const [peygamberList, setPeygamberList] = useState<{ name: string }[]>([])
    const [selectedPeygamber, setSelectedPeygamber] = useState<string | null>(null);
    const [vahiy, setVahiy] = useState('');
    const bottomSheetRef = useRef<BottomSheet>(null);

    const loadPeygamberList = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (data) {
                setPeygamberList(JSON.parse(data));
            }
        } catch (err) {
            console.error("Yükleme Hatası: ", err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPeygamberList();
        }, [])
    );

    const delPeygamber = async (name: string) => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            let list = data ? JSON.parse(data) : [];

            const updatedList = list.filter((item: { name: string }) => item.name !== name);

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

            setPeygamberList(updatedList);
        } catch (err) {
            console.error("Silme İşlemi Başarısız: ", err);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>Gönderilen Peygamberler</Text>
                <FlatList
                    data={peygamberList}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.listContainer}>
                            <Text style={styles.listText}>{item.name}</Text>

                            <TouchableOpacity
                                style={styles.vahiyButton}
                                onPress={() => {
                                    setSelectedPeygamber(item.name)
                                    bottomSheetRef.current?.expand()
                                }}
                            >
                                <Text style={styles.buttonText}>Vahiy Gönder</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.delButton}
                                onPress={() => delPeygamber(item.name)}
                            >
                                <Text style={styles.buttonText}>Peygamberlikten Men Et</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <BottomSheet
                index={-1}
                ref={bottomSheetRef}
                snapPoints={useMemo(() => ["30%"], [])}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
            >
                <BottomSheetView style={styles.sheetContainer}>
                    <Text style={styles.sheetTitle}>
                        {selectedPeygamber ? `${selectedPeygamber} adlı peygambere vahiy gönder` : "Vahiy Gönder"}
                    </Text>

                    <TextInput
                        style={styles.textinput}
                        placeholder="Vahiy giriniz"
                        value={vahiy}
                        onChangeText={setVahiy}
                    />

                    <TouchableOpacity
                        style={styles.inputButton}
                        onPress={() => {
                            if (selectedPeygamber) {
                                Alert.alert("Vahiy Gönderildi!", `${selectedPeygamber} adlı peygambere "${vahiy}" yazılı vahiy gönderildi!`)
                                setVahiy("");
                                bottomSheetRef.current?.close();
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Gönder</Text>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    listText: {
        fontSize: 18,
        flex: 1,
    },
    vahiyButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    delButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    sheetBackground: {
        backgroundColor: "#333",
        borderRadius: 20,
    },
    sheetContainer: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#222",
    },
    sheetTitle: {
        fontSize: 18,
        color: "white",
        marginBottom: 10,
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
    inputButton: {
        height: 40,
        width: "80%",
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
    }
});

export default List;