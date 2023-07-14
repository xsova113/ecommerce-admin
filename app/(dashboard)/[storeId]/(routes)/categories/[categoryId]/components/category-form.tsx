"use client";

import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Box, Grid, GridItem, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValue = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: CategoryFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast({
        title: toastMessage,
        position: "bottom-right",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
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
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast({ title: "Category deleted", position: "top", status: "success" });
    } catch (error) {
      toast({
        title:
          "Make sure you removed all products that's using this category first.",
        status: "error",
        position: "bottom",
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
          <Grid templateColumns={"repeat(3, 1fr)"} gap={8}>
            <GridItem>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </GridItem>
            <GridItem>
              <FormField
                control={form.control}
                name="billboardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="overflow-auto">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a billboard"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </GridItem>
          </Grid>

          <Button className="btn mt-10 " disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default CategoryForm;
