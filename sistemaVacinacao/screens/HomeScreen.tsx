import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'Home'>;


const HomeScreen = ({ navigation }: Props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor: '#f0f0da'}}>
    <Text style={{color: '#59382d',fontSize: 22,fontWeight: 'bold'}}>Bem-vindo(a) ao sistema de vacinação!!</Text>
  </View>
);


export default HomeScreen;