import { FlatList, View } from 'react-native';
import products from '@/../assets/data/products';
import ProductCard from '@/components/ProductCard';


export default function ProductsList() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard key={item.id} {...item} />}
      />
    </View>
  );
};