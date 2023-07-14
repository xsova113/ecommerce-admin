"use client";

import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Box, Grid, GridItem, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SelectInput from "./SelectInput";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  initialData: (Product & { images: Image[] }) | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValue = z.infer<typeof formSchema>;

const ProductForm = ({
  initialData,
  categories,
  sizes,
  colors,
}: ProductFormProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          price: 0,
          images: [],
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast({
        title: toastMessage,
        position: "bottom-right",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: error.message,
        position: "top",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast({ title: "product deleted", position: "top", status: "success" });
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box w={"full"}>
      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
        loading={loading}
      />
      <Box
        display={"flex"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            disabled={loading}
            onClick={onOpen}
          >
            <Trash color="white" size={20} />
          </Button>
        )}
      </Box>

      <div className="divider" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    onChange={(url) => {
                      field.onChange([...field.value, { url }]);
                    }}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Grid templateColumns={"repeat(3, 1fr)"} gap={8}>
            <GridItem>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Product name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </GridItem>

            <GridItem>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="9.99"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </GridItem>

            <GridItem>
              <SelectInput
                form={form}
                loading={loading}
                items={categories}
                text={"category"}
                formName={"categoryId"}
              />
            </GridItem>

            <GridItem>
              <SelectInput
                form={form}
                loading={loading}
                items={sizes}
                text={"size"}
                formName={"sizeId"}
              />
            </GridItem>

            <GridItem>
              <SelectInput
                form={form}
                loading={loading}
                items={colors}
                text={"color"}
                formName={"colorId"}
              />
            </GridItem>

            <GridItem>
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This product will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </GridItem>
            <GridItem>
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere in the store
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </GridItem>
          </Grid>

          <Button className="btn mt-10" disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default ProductForm;
