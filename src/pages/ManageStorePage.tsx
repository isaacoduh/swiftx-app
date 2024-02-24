import {
  useCreateMyStore,
  useGetMyStore,
  useUpdateMyStore,
} from "@/api/ManageRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageStoreForm from "@/forms/manage-store-form/ManageStoreForm";
const ManageStorePage = () => {
  const { createStore, isLoading: isCreateLoading } = useCreateMyStore();
  const { store } = useGetMyStore();
  const { updateStore, isLoading: isUpdateLoading } = useUpdateMyStore();
  // orders
  const isEditing = !!store;
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-store">Manage Store</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">5 active orders</h2>
        {/* map orders */}
      </TabsContent>
      <TabsContent value="manage-store">
        <ManageStoreForm
          store={store}
          onSave={isEditing ? updateStore : createStore}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageStorePage;
