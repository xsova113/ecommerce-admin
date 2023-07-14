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
import { Box, Grid, GridItem, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValue = z.infer<typeof formSchema>;

const SizeForm = ({ initialData }: SizeFormProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SizeFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValue) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes`);

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
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast({ title: "Size deleted", position: "top", status: "success" });
    } catch (error) {
      toast({
        title:
          "Make sure you removed all products that's using this size first.",
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
                        placeholder="Size name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </GridItem>

            <GridItem>
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Size value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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

export default SizeForm;
