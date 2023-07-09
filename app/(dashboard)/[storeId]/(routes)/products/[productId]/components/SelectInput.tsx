import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface SelectInputProps {
  form: any;
  loading: boolean;
  items: any;
  text: string;
  formName: string;
}

const SelectInput = ({
  form,
  loading,
  items,
  text,
  formName,
}: SelectInputProps) => {
  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{text}</FormLabel>
          <Select disabled={loading} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="overflow-auto">
                <SelectValue
                  defaultValue={field.value}
                  placeholder={`Select a ${text}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
