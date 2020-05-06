import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';

export default function CustomModal({ title, text, onCloseModal, onDoAction }) {

    return (
        <Modal 
            visible={ true } 
            transparent={ true } 
            animationType="fade"
            onRequestClose={ () => onCloseModal() }
        >
            <View style={ styles.container }>
                <View style={ styles.content }>

                    <Text style={ styles.title }>{ title }</Text>
                    <Text style={ styles.text }>{ text }</Text>

                    <View style={ styles.buttons }>

                        <TouchableOpacity 
                            style={[ styles.btn, styles.btnLeft ]}
                            onPress={ () => onCloseModal() }
                        >
                            <Text style={ styles.textBtn }>Não</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ styles.btn, styles.btnRight ]}
                            onPress={ () => onDoAction() }
                        >
                            <Text style={ styles.textBtn }>Sim</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>    
        </Modal>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 4,
        padding: 15
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'permanent-maker'
    },
    text: {
        textAlign: 'center',
        marginVertical: 15
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    btn: {
        borderRadius: 4,
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    btnLeft: {
        backgroundColor: 'gray',
        marginRight: 10
    },
    btnRight: {
        backgroundColor: '#1cdbb5',
        marginLeft: 10
    },
    textBtn: {
        fontFamily:'permanent-maker',
        color: '#fff', fontSize: 16
    }
});