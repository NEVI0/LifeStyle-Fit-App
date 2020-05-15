import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Text, Modal, Picker } from 'react-native';

import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function FilterButton() {

	const [ visible, setVisible ] = useState(false);
	const [ trackType, setTrackType ] = useState(null);

    return (
		<>
			<View style={ styles.container }>
				<View style={[ styles.btn, styles.shadow ]}>
					<TouchableHighlight                
						underlayColor="#a0dd11"
						onPress={ () => setVisible(true) }
					>
						<View>
							<Entypo name="list" color="#fff" size={ 30 } />
						</View>
					</TouchableHighlight>
				</View>            
			</View>

			<Modal visible={ visible }  transparent={ true }  animationType="fade" onRequestClose={ () => setVisible(false) }>
				<View style={ styles.modalContainer }>
					<View style={ styles.modalContent }>

						<View style={ styles.header }>
							<Text style={ styles.title }>Filtro</Text>
							<TouchableOpacity style={ styles.headerBtn } onPress={ () => setVisible(false) }>
								<MaterialCommunityIcons name="window-close" size={ 25 } />
							</TouchableOpacity>
						</View>

						<View style={ styles.form }>

							<Text style={ styles.label }>Tipo</Text>

							<View style={ styles.control }>
								<Picker
									style={ styles.piker }
									selectedValue={ trackType }
									onValueChange={ (text) => setTrackType(text) }
								>
									<Picker.Item label="Caminhada" value="walking" />
									<Picker.Item label="Corrida" value="running" />
									<Picker.Item label="Ciclismo" value="cycling" />
								</Picker>
								<MaterialIcons name="equalizer" size={ 25 } style={ styles.icon } />
							</View>

						</View>

						<View style={ styles.buttons }>
							<TouchableOpacity style={[ styles.modalBtn, styles.colorOne ]}>
								<Text style={ styles.modalTextBtn }>Limpar</Text>
							</TouchableOpacity>

							<TouchableOpacity style={[ styles.modalBtn, styles.colorTwo ]}>
								<Text style={ styles.modalTextBtn }>Ok</Text>
							</TouchableOpacity>
						</View>

					</View>
				</View>
			</Modal>
		</>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 15,                                                    
        right: 15, 
    },
    shadow: {
        shadowColor: '#a0dd11',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btn: {
        backgroundColor: '#a0dd11',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 36,
        borderWidth: 3,
        borderColor: '#fff'
	},
	modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 4,
        padding: 15
	},
	header: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	title: {
		fontSize: 25,
		flex: 1,
		fontFamily: 'permanent-maker',
		color: '#a0dd11',
		marginLeft: 7
	},
	headerBtn: {
		marginTop: 5,
		marginRight: 7
	},
	form: {
		marginTop: 20
	},
	label: {
        fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 7
    },
    control: {
		marginBottom: 10,
		marginRight: 7,
        flexDirection: 'row'
    },
    piker: {
		flex: 1,
	},
    icon: {
        alignSelf: 'center',
        marginLeft: 5
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	modalBtn: {
		borderRadius: 4,
        paddingVertical: 7,
		paddingHorizontal: 15,
		marginRight: 7
	},
	colorOne: { backgroundColor: 'gray', marginRight: 5 },
	colorTwo: { backgroundColor: '#a0dd11', marginLeft: 5 },
	modalTextBtn: {
		fontFamily: 'permanent-maker',
		color: '#fff'
	}
});