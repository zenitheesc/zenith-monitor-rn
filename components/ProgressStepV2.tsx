import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text } from 'react-native-paper';

function ProgressStepV2({ steps }: { steps: { name: string; icon: string }[] }) {
    return (
        <View
            style={{
                flexDirection: 'row',
            }}
        >
            <View style={styles.stepLineContainer}>
                <View style={styles.stepLine}></View>
            </View>
            <View
                style={{
                    flex: 1,
                    gap: 2,
                }}
            >
                {steps.map((step, i) => (
                    <View style={styles.stepContainer} key={`step-${i}`}>
                        <View style={styles.stepIndicator}>
                            <Text style={styles.stepIndicatorText}>
                                <Icon source={step.icon} color="white" size={20} />
                            </Text>
                        </View>
                        <View style={styles.step}>
                            <Text variant="bodyLarge">{step.name}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stepLineContainer: {
        width: 50,
        alignItems: 'center',
        paddingVertical: 25,
    },
    stepContainer: {
        flexDirection: 'row',
        minHeight: 50,
        position: 'relative',
    },
    stepLine: {
        width: 1,
        height: '100%',
        backgroundColor: 'black',
        zIndex: 1,
    },
    stepIndicator: {
        width: 50,
        alignItems: 'center',
        position: 'absolute',
        // top: 12.5,
        left: -50,
        zIndex: 99,
    },
    stepIndicatorText: {
        textAlign: 'center',
        aspectRatio: '1/1',
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#F28705',
        zIndex: 2,
    },
    step: {
        flex: 1,
        minHeight: 50,
        // height: 20,
        // padding: 15,
        paddingVertical: 2,
        paddingLeft: 5,
        // justifyContent: 'center',
    },
});

export default ProgressStepV2;
