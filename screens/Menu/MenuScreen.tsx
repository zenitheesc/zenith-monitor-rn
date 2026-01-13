import React, { useState } from 'react';
import { StyleSheet, View, Linking, Alert } from 'react-native';
import { Appbar, Button, Modal, Portal, Text, Provider } from 'react-native-paper';
import config from '../../services/config';

export default function MenuScreen({ navigation }: { navigation: any }) {
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showLogoutModal = () => setLogoutVisible(true);
    const hideLogoutModal = () => setLogoutVisible(false);

    const GOOGLE_FORMS_URL = config.FormsFeedbackUrl;
    const showFeedbackModal = () => setFeedbackVisible(true);
    const hideFeedbackModal = () => {
        setFeedbackVisible(false);

        setIsSubmitting(false);
    };

    const confirmLogout = () => {
        hideLogoutModal();
        navigation.reset({
            index: 0,
            routes: [{ name: '(login)/index' }],
        });
    };

    const openGoogleForms = async () => {
        setIsSubmitting(true);
        try {
            if (!GOOGLE_FORMS_URL) {
                throw new Error('URL do formulário não configurada');
            }

            const canOpen = await Linking.canOpenURL(GOOGLE_FORMS_URL);

            if (canOpen) {
                await Linking.openURL(GOOGLE_FORMS_URL);
                hideFeedbackModal();
            } else {
                Alert.alert(
                    'Erro',
                    'Não foi possível abrir o formulário. Por favor, tente novamente mais tarde.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Erro ao abrir o formulário:', error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro ao tentar abrir o formulário.';
            Alert.alert('Erro', errorMessage, [{ text: 'OK' }]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <Appbar.Header mode="center-aligned" elevated>
                    <Appbar.Content title="Menu" />
                </Appbar.Header>

                <View style={styles.topButtonContainer}>
                    <Button
                        mode="contained"
                        icon="message-text-outline"
                        onPress={showFeedbackModal}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        uppercase={true}
                    >
                        Feedback
                    </Button>
                </View>

                <View style={styles.bottomButtonContainer}>
                    <Button
                        mode="contained"
                        icon="logout"
                        onPress={showLogoutModal}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        uppercase={true}
                    >
                        Logout
                    </Button>
                </View>

                {/* Modal de Logout */}
                <Portal>
                    <Modal
                        visible={logoutVisible}
                        onDismiss={hideLogoutModal}
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Logout</Text>
                            <Text style={styles.modalMessage}>
                                Você tem certeza que deseja sair?
                            </Text>
                            <View style={styles.modalButtonsContainer}>
                                <Button
                                    mode="outlined"
                                    onPress={hideLogoutModal}
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

                {/* Modal de Feedback */}
                <Portal>
                    <Modal
                        visible={feedbackVisible}
                        onDismiss={hideFeedbackModal}
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enviar Feedback</Text>
                            <Text style={styles.modalMessage}>
                                Você será redirecionado para um formulário onde poderá nos enviar
                                seu feedback.
                            </Text>
                            <View style={styles.modalButtonsContainer}>
                                <Button
                                    mode="outlined"
                                    onPress={hideFeedbackModal}
                                    style={styles.modalButton}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={openGoogleForms}
                                    style={styles.modalButton}
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    Abrir Formulário
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
    topButtonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    bottomButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
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
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});
