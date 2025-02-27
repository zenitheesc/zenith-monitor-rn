import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Modal, Portal, Text, Provider } from 'react-native-paper';

export default function MenuScreen({ navigation }: { navigation: any }) {

    const [visible, setVisible] = useState(false); 
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const confirmLogout = () => {
        hideModal(); 
        navigation.reset({
            index: 0,
            routes: [{ name: '(login)/index' }],
        });
    };

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <Appbar.Header mode="center-aligned" elevated>
                    <Appbar.Content title="Menu" />
                </Appbar.Header>

                <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
                    <Button
                        mode="contained"
                        icon="logout"
                        onPress={showModal} 
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        uppercase={true}
                    >
                        Logout
                    </Button>
                </View>

                <Portal>
                    <Modal
                        visible={visible} 
                        onDismiss={hideModal} 
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Logout</Text>
                            <Text style={styles.modalMessage}>Você tem certeza que deseja sair?</Text>
                            <View style={styles.modalButtonsContainer}>
                                <Button
                                    mode="contained"
                                    onPress={hideModal} 
                                    style={styles.modalButton}
                                >
                                    Não
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={confirmLogout} 
                                    style={styles.modalButton}
                                >
                                    Sim
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 10,
        elevation: 0,
    },
    buttonContent: {
        height: 60,
        justifyContent: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    modalTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        color: 'black',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});