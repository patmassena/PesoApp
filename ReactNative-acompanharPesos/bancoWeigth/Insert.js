import React, { useState } from 'react';
import { Alert, View, TextInput, Button, Modal, Text, TouchableOpacity } from 'react-native';
import { create } from './Create.js';
import { commonStyles } from './styles.js';

export function Insert() {
    const [weight, setWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const insertWeight = async () => {
        try {
            const db = await create();
            const currentDate = formatDate(new Date());
            const result = await db.runAsync(`INSERT INTO weights (weight, date) VALUES (?, ?);`, [weight, currentDate]);

            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Weight registered',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
                setWeight('');
                toggleModal();
            } else {
                Alert.alert('Error', 'Error registering weight');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while registering the weight');
        }
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
            <Button title="Insert Weight" onPress={toggleModal} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Enter Weight</Text>
                        <TextInput
                            placeholder="Weight"
                            value={weight}
                            onChangeText={setWeight}
                            style={commonStyles.input}
                            keyboardType="numeric"
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={insertWeight}
                                disabled={!weight}
                            >
                                <Text style={commonStyles.textStyle}>Save</Text>
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
