import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import ProductCard from '@/components/ProductCard';
import useProductList from '@/hooks/useProductList';


export default function ProductsList() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;
  
  if (error) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Failed to fetch!</Text>
    </View>
  );

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