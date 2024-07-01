import React, { useState } from 'react';
import { Alert, View, TextInput, Button, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { create } from './Create.js';
import { commonStyles } from './styles.js';

export function Remove() {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputId, setInputId] = useState('');

    const remove = async () => {
        try {
            const db = await create();
            const result = await db.runAsync(`DELETE FROM weights WHERE id = ?;`, [inputId]);

            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Weight removed',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
                setInputId('');
            } else {
                Alert.alert('Error', 'Error removing weight');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while removing the weight');
        }
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
            <Button title="Delete Weight" onPress={() => setModalVisible(true)} color={"#18392b"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Enter ID to DELETE</Text>
                        <TextInput
                            placeholder="ID"
                            value={inputId}
                            onChangeText={id => setInputId(id)}
                            style={commonStyles.input}
                            keyboardType="numeric"
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={remove}
                            >
                                <Text style={commonStyles.textStyle}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[commonStyles.button, commonStyles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={commonStyles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
