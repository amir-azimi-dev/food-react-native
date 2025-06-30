import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from ".";
import Archived from "./archived";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrdersTopbar = () => {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#fff" }}>
      <TabsLayout>
        <TabsLayout.Screen name="index" options={{ title: "Active" }} />
        <TabsLayout.Screen name="archived" options={{ title: "Archived" }} />
      </TabsLayout>
    </SafeAreaView>
  );
};

export default OrdersTopbar;