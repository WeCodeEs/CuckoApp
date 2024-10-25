// import { View, Text, StyleSheet } from 'react-native';

// export default function FavoritesScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Favorites</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { View } from "@/components/ui/view";
import { Clock, ChevronRight, CheckCircle, ShoppingBag } from 'lucide-react-native';

interface Pedido {
  id: number;
  platillos: number[];
  precioFinal: number;
  fecha: string;
  hora: string;
  estado: string;
}

const pedidos: Pedido[] = [
  {
    id: 1003,
    platillos: [1, 4],
    precioFinal: 150.00,
    fecha: '09 Oct 2024',
    hora: '3:16 PM',
    estado: 'En preparación',
  },
  {
    id: 1002,
    platillos: [3],
    precioFinal: 80.00,
    fecha: '09 Oct 2024',
    hora: '2:30 PM',
    estado: 'Listo',
  },
  {
    id: 1001,
    platillos: [1,4],
    precioFinal: 120.00,
    fecha: '08 Oct 2024',
    hora: '8:12 AM',
    estado: 'Entregado',
  },
];

const PedidoCard: React.FC<{ pedido: Pedido }> = ({ pedido }) => {
  const getBackgroundColor = () => {
    switch (pedido.estado) {
      case 'En preparación':
        return '#FFCA99';
      case 'Listo':
        return '#FFECAD';
      case 'Entregado':
        return '#DBFAE1';
      default:
        return '#F08080';
    }
  };

  const getTextColor = () => {
    switch (pedido.estado) {
      case 'En preparación':
        return '#E06C00';
      case 'Listo':
        return '#CC9C00';
      case 'Entregado':
        return '#13902A';
      default:
        return '#8B0000';
    }
  };

  return (
    <Box style={styles.card}>
      <View style={{ maxWidth: '68%'}}>
        <Heading style={styles.order} size='lg'>Pedido {pedido.id}</Heading>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={[styles.status_container, {backgroundColor: getBackgroundColor()}]}>
            {pedido.estado === 'En preparación' ? (
              <Clock size={14} color={getTextColor()} style={styles.icon}/>
            ) : pedido.estado === 'Listo' ? (
              <ShoppingBag size={14} color={getTextColor()} style={styles.icon}/>
            ) : (
              <CheckCircle size={14} color={getTextColor()} style={styles.icon}/>
            )}
            <Text size='sm' style={[styles.status, { color: getTextColor(), marginLeft: 6 }]}>
              {pedido.estado}
            </Text>
          </View>
        </View>
        <Text style={styles.date}>{pedido.fecha}</Text>
      </View>
      <View style={{height: 'auto', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '35%'}}>
        <ChevronRight size={30} color="#183542"/>
        <Heading size='lg' style={styles.price}>${pedido.precioFinal.toFixed(2)}</Heading>
      </View>
    </Box>
  );
};

const FavoritesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <VStack space={"lg"}>
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#49BCCE',
  },
  order: {
    color: "#183542",
    padding: 2,
    paddingLeft: 6, 
    fontWeight: 'normal',
  },
  icon: {
   marginVertical: 'auto',
   alignSelf: 'flex-start',
  },
  status_container: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 5, 
    paddingVertical: 2, 
    borderRadius: 20, 
    marginBottom: 18, 
    alignSelf: 'flex-start'
  },
  status: {
    borderRadius: 60,
    paddingRight: 2,
  },
  date: {
    paddingLeft: 6, 
    fontSize: 12,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    color: "#183542",
    borderWidth: 0, 
    borderColor: 'blue',
  },
});

export default FavoritesScreen;