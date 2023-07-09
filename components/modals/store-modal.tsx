"use client";

import React, { useState } from "react";
import Modals from "../ui/Modals";
import { useStoreModal } from "@/hooks/use-store-modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const toast = useToast();
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        position: "top",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modals
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "This is required" })}
            placeContent={"E-Commerce"}
            focusBorderColor="black"
            disabled={loading}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Box display={"flex"} justifyContent={"end"} mt={6} mb={10} gap={2}>
          <Button
            type="button"
            variant={"outline"}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="bg-black"
            type="submit"
            disabled={loading}
            textColor={"white"}
            _hover={{ color: "white", bg: "gray.600" }}
          >
            Continue
          </Button>
        </Box>
      </form>
    </Modals>
  );
};

export default StoreModal;
