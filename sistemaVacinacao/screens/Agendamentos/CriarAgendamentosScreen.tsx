import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CriarAgendamentos'>;


const CriarAgendamentosScreen = ({ navigation }: Props) => {


  const [dataMarcada, setDataMarcada] = useState('');
  const [status, setStatus]  = useState('');
  const [observacoes, setObservacoess] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [saving, setSaving] = useState(false);
  const [unidade, setUnidade] = useState('');
  const [vacina, setVacina] = useState('');
  const [cidadao, setCidadao] = useState('');
  const [funcionario, setFncionario] = useState('');

  useFocusEffect(
    useCallback(() => {
      setDataMarcada('');
      setStatus('');
      setObservacoess('');
      setPrioridade('');
      setUnidade('');
      setVacina('');
      setCidadao('');
      setFncionario('');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/agendamentos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({dataMarcada, status, observacoes, prioridade, unidade: Number(unidade),vacina: Number(vacina),cidadao: Number(cidadao),funcionario: Number(funcionario)} ),
    });
    navigation.navigate('Agendamentos');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova vacina</Text>
      <Text style={styles.label}>Data Marcada</Text>
            <TextInput
              value={dataMarcada}
              placeholder="Formato: AAAA-MM-DD"
              placeholderTextColor="#999"
              onChangeText={setDataMarcada}
              style={styles.input}
            />
          <Text style={styles.label}>Status</Text>
            <Picker
                  selectedValue={status}
                  onValueChange={(value) => setStatus(value)}
                  style={styles.input}
              >
                  <Picker.Item label="Agendado" value="AGENDADO" />
                  <Picker.Item label="Concluído" value="CONCLUIDO" />
                  <Picker.Item label="Cancelado" value="CANCELADO" />
              </Picker>
            <Text style={styles.label}>Observações</Text>
            <TextInput
              value={observacoes}
              onChangeText={setObservacoess}
              style={styles.input}
            />
          <Text style={styles.label}>Prioridade</Text>
              <Picker
                  selectedValue={prioridade}
                  onValueChange={(value) => setPrioridade(value)}
                  style={styles.input}
              >
                  <Picker.Item label="Baixa" value="BAIXA" />
                  <Picker.Item label="Media" value="MEDIA" />
                  <Picker.Item label="Alta" value="ALTA" />
              </Picker>
            <Text style={styles.label}>Unidade Id</Text>
          <TextInput
              value={unidade}
              onChangeText={setUnidade}
              style={styles.input}
            />
          <Text style={styles.label}>Vacina Id</Text>
            <TextInput
            value={vacina}
            onChangeText={setVacina}
            style={styles.input}
            />
    
            <Text style={styles.label}>Cidadao Id</Text>
            <TextInput
            value={cidadao}
            onChangeText={setCidadao}
            style={styles.input}
            />
    
            <Text style={styles.label}>Funcionario Id</Text>
            <TextInput
            value={funcionario}
            onChangeText={setFncionario}
            style={styles.input}
            />
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Agendamentos')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffffff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center' },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});


export default CriarAgendamentosScreen;
