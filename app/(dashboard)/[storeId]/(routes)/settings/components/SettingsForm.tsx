"use client";

import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/Heading";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/use-origin";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  chakra,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValue = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValue) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Something went wrong",
        position: "top",
        status: "error",
      });
    } finally {
      setLoading(false);
      toast({
        title: `Store name updated to ${data.name}`,
        position: "top",
        status: "success",
      });
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.push("/");
    } catch (error) {
      toast({
        title: "Make sure you removed all products and categories first.",
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
      toast({ title: "Store deleted", position: "top", status: "success" });
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
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant={"destructive"}
          size={"icon"}
          disabled={loading}
          onClick={onOpen}
        >
          <Trash color="white" size={20} />
        </Button>
      </Box>

      <Separator className="my-4" />

      <chakra.form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Grid templateColumns={"repeat(3, 1fr)"} gap={8}>
          <GridItem>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                {...register("name", { required: "This field is required" })}
                id="name"
                type="text"
                disabled={loading}
                focusBorderColor="black"
                placeholder="Store name"
              />
              <FormErrorMessage>
                {errors.name && errors.name?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Button className="btn mt-10" disabled={loading} type="submit">
          Save changes
        </Button>
      </chakra.form>
      <div className="divider" />
      <ApiAlert
        title={"NEXT_PUBLIC_API_URL"}
        description={`${origin}/api/${params.storeId}`}
        variant={"public"}
      />
    </Box>
  );
};

export default SettingsForm;
