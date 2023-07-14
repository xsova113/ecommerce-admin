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
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Box, Grid, GridItem, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string(),
});

type BillboardFormValue = z.infer<typeof formSchema>;

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast({ title: "Billboard deleted", position: "top", status: "success" });
    } catch (error) {
      toast({
        title:
          "Make sure you removed all categories using this billboard first.",
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    disabled={loading}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Grid templateColumns={"repeat(3, 1fr)"} gap={8}>
            <GridItem>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Label</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Billboard label"
                        {...field}
                      />
                    </FormControl>
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

export default BillboardForm;
