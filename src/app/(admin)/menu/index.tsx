import { FlatList } from 'react-native';
import products from '@/../assets/data/products';
import ProductCard from '@/components/ProductCard';


export default function ProductsList() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard key={item.id} {...item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
};