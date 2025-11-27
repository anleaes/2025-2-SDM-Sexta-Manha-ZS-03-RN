import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Agendamentos'>;


export type Agendamentos = {
  id: number;
  dataMarcada: string;
  status: string;
  observacoes: string;
  prioridade: string;
  unidade: number;
  vacina: number;
  cidadao: number;
  funcionario: number;
};


const AgendamentosScreen = ({ navigation }: Props) => {


  const [agendamentos, setAgendamentos] = useState<Agendamentos[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchAgendamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/agendamentos/');
    const data = await response.json();
    setAgendamentos(data);
    setLoading(false);
  };


  useFocusEffect(
    useCallback(() => {
      fetchAgendamentos();
    }, [])
  );


  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/agendamentos/${id}/`, {
      method: 'DELETE',
    });
    setAgendamentos(prev => prev.filter(c => c.id !== id));
  };


  const renderItem = ({ item }: { item: Agendamentos }) => (
    <View style={styles.card}>
      <Text style={styles.dataMarcada}>Data Marcada: {item.dataMarcada}</Text>
      <Text style={styles.status}>Id: {item.id}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.observacoes}>Observações: {item.observacoes}</Text>
      <Text style={styles.prioridade}>Prioridade: {item.prioridade}</Text>
      <Text style={styles.unidade}>Unidade ID: {item.unidade}</Text>
      <Text style={styles.unidade}>Vacina ID: {item.vacina}</Text>
      <Text style={styles.unidade}>Cidadão ID: {item.cidadao}</Text>
      <Text style={styles.unidade}>Funcionario ID: {item.funcionario}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarAgendamentos', { agendamentos: item })}
      >
      <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
      <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CriarAgendamentos')}
    >
      <Ionicons name="add" size={28} color="#f0f0da"  />
    </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0da',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#59382d',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#59382d',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  dataMarcada: {
    fontSize: 18,
    fontWeight: '600',
    color: '#59382d',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  observacoes: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  prioridade: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  unidade: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#9ac6b1',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '500'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#8b8b72',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#c74e16',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    alignSelf: 'flex-end'
  },
});


export default AgendamentosScreen;
