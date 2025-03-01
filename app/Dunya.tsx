import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    TextInput,
    FlatList
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const STORAGE_KEY = "peygamberListesi";

const App = () => {
    const [peygamber, setPeygamber] = useState('');
    const [peygamberListesi, setPeygamberListesi] = useState<{ name: string }[]>([]);
    const bottomSheetRef = useRef<BottomSheet>(null);

    // 📌 **AsyncStorage'a listeyi kaydetme fonksiyonu**
    const savePeygamberListesi = async (list: { name: string }[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (error) {
            console.error("Kaydetme hatası:", error);
        }
    };

    // 📌 **AsyncStorage'dan listeyi yükleme fonksiyonu**
    const loadPeygamberListesi = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (data) {
                setPeygamberListesi(JSON.parse(data));
            }
        } catch (error) {
            console.error("Yükleme hatası:", error);
        }
    };

    // 📌 **Uygulama açıldığında kaydedilen verileri yükle**
    useEffect(() => {
        loadPeygamberListesi();
    }, []);

    // 📌 **Yeni peygamber ekleme fonksiyonu**
    const handlePeygamberEkle = async () => {
        if (peygamber.trim() === "") {
            Alert.alert("Lütfen bir isim giriniz!");
            return;
        }

        // 📌 **Aynı isim zaten eklenmiş mi kontrol et**
        if (peygamberListesi.some(item => item.name.toLowerCase() === peygamber.toLowerCase())) {
            Alert.alert("Bu isim zaten listede var!");
            return;
        }

        const yeniListe = [...peygamberListesi, { name: peygamber }];
        setPeygamberListesi(yeniListe);
        await savePeygamberListesi(yeniListe); // AsyncStorage'a kaydet
        Alert.alert(`${peygamber} adındaki peygamber gönderildi!`);
        setPeygamber(""); // TextInput'u sıfırla
        bottomSheetRef.current?.close();
    };

    // 📌 **Liste elemanını silme fonksiyonu**
    const handleSil = async (name: string) => {
        const yeniListe = peygamberListesi.filter(item => item.name !== name);
        setPeygamberListesi(yeniListe);
        await savePeygamberListesi(yeniListe); // AsyncStorage'a güncellenmiş listeyi kaydet
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => bottomSheetRef.current?.expand()}
                    >
                        <Text style={{ color: "white" }}>Peygamber Gönder</Text>
                    </TouchableOpacity>

                    <BottomSheet
                        ref={bottomSheetRef}
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
                            <TouchableOpacity style={styles.inputbutton} onPress={handlePeygamberEkle}>
                                <Text>Peygamber Gönder</Text>
                            </TouchableOpacity>
                        </BottomSheetView>
                    </BottomSheet>

                    {/* 📌 **Kaydedilen isimleri listele** */}
                    <View style={styles.listContainer}>
                        <Text style={styles.listTitle}>Gönderilen Peygamberler:</Text>
                        {peygamberListesi.length === 0 ? (
                            <Text style={styles.noData}>Henüz peygamber gönderilmedi.</Text>
                        ) : (
                            <FlatList
                                data={peygamberListesi}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <View style={styles.listItem}>
                                        <Text style={styles.listText}>- {item.name}</Text>
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => handleSil(item.name)}
                                        >
                                            <Text style={styles.deleteText}>Sil</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
    },
    button: {
        height: 50,
        width: "60%",
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    sheetBackground: {
        backgroundColor: "#ccc",
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
    listContainer: {
        marginTop: 20,
        width: "80%",
        alignItems: "center",
    },
    listTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    listText: {
        fontSize: 14,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
    },
    deleteText: {
        color: "white",
        fontWeight: "bold",
    },
    noData: {
        fontSize: 14,
        color: "gray",
    },
});

export default App;