import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { create } from './Create.js';
import { commonStyles } from './styles.js';

export function Update() {
    const [updateId, setUpdateId] = useState('');
    const [updateWeight, setUpdateWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const update = async () => {
        try {
            const db = await create();
            const result = await db.runAsync(`UPDATE weights SET weight = ? WHERE id = ?;`, [updateWeight, updateId]);

            if (result.changes > 0) {
                Alert.alert('Success', 'Weight updated', [{ text: 'Ok' }], { cancelable: false });
                setUpdateId('');
                setUpdateWeight('');
                toggleModal();
            } else {
                Alert.alert('Error', 'Error updating weight');
            }
        } catch (error) {
            console.log('Error updating weight:', error);
            Alert.alert('Error', 'An error occurred while updating the weight');
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
            <Button title="Update Weight" onPress={toggleModal} color={"#18392b"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Enter ID to Update</Text>
                        <TextInput
                            placeholder="Enter ID"
                            value={updateId}
                            onChangeText={id => setUpdateId(id)}
                            style={commonStyles.input}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="New Weight"
                            value={updateWeight}
                            onChangeText={weight => setUpdateWeight(weight)}
                            style={commonStyles.input}
                            keyboardType="numeric"
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={update}
                                disabled={!updateWeight || !updateId}
                            >
                                <Text style={commonStyles.textStyle}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={[commonStyles.button, commonStyles.buttonClose]}>
                                <Text style={commonStyles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
