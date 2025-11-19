import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

//Buat skema validasi zod
const formSchema = z.object({
  name: z.string().min(3, "Machine name must be at least 3 characters"),
  productId: z.string().min(3, "Product ID must be at least 3 characters"),
});

function AddMachine({ onAddMachine, onMachineAdded }) {
  const onSubmit = async (data) => {
    const promise = onAddMachine(data);
    toast.promise(promise, {
      loading: "Adding machine...",
      success: () => {
        form.reset();
        onMachineAdded();
        return "Machine added successfully! ✅";
      },
      error: (err) => err?.message || "Failed to add machine",
    });
    return promise;
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      productId: "",
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add a New Machine</CardTitle>
        <CardDescription>
          Register a machine for tracking and maintenance{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Machine Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Machine Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter machine name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Machine ID */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Machine ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter machine ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex-1"
                  size="lg"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding Machine...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Add Machine
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={form.formState.isSubmitting}
                  size="lg"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddMachine;
