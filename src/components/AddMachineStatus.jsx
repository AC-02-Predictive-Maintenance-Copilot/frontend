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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { containerVariants, itemVariants } from "@/components/MotionVariant";

// Zod validation schema
const formSchema = z.object({
  machineId: z.string().min(1, "Machine is required"),
  type: z.enum(["L", "M", "H"], {
    required_error: "Type is required",
  }),
  airTemperature: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Air temperature must be positive")
    .max(500, "Air temperature must be less than 500"),
  processTemperature: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Process temperature must be positive")
    .max(500, "Process temperature must be less than 500"),
  rotationalSpeed: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Rotational speed must be positive")
    .max(10000, "Rotational speed must be less than 10000"),
  torque: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Torque must be positive")
    .max(100, "Torque must be less than 100"),
  toolWear: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Tool wear must be positive")
    .max(300, "Tool wear must be less than 300"),
  target: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Target must be 0 or 1")
    .max(1, "Target must be 0 or 1"),
  failureType: z.string().optional(),
});

function AddMachineStatus({ onCreateStatus, machines = [], onStatusAdded }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineId: "",
      type: "",
      airTemperature: 0,
      processTemperature: 0,
      rotationalSpeed: 0,
      torque: 0,
      toolWear: 0,
      target: 0,
      failureType: "",
    },
  });

  const onSubmit = async (data) => {
    const promise = onCreateStatus(data);
    toast.promise(promise, {
      loading: "Adding machine status...",
      success: () => {
        form.reset();
        if (onStatusAdded) onStatusAdded();
        return "Machine status added successfully! ✅";
      },
      error: (err) => err?.message || "Failed to add machine status",
    });
    return promise;
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="w-full">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle>Machine Status Entry</CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription>
              Enter the operational status and sensor data for a machine
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Machine Selection */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="machineId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a machine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {machines.map((machine) => (
                            <SelectItem key={machine.id} value={machine.id}>
                              {machine.productId} - {machine.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Type */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="L">L (Low)</SelectItem>
                          <SelectItem value="M">M (Medium)</SelectItem>
                          <SelectItem value="H">H (High)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Quality variant: L (Low), M (Medium), H (High)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Air Temperature */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="airTemperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Air Temperature (K)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 288.2"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Process Temperature */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="processTemperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Process Temperature (K)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 390.7"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Rotational Speed */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="rotationalSpeed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rotational Speed (rpm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 1108"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Torque */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="torque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Torque (Nm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 30.3"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Tool Wear */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="toolWear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Wear (min)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Target */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0 (Normal)</SelectItem>
                            <SelectItem value="1">1 (Failure)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          0 = Normal operation, 1 = Failure detected
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              {/* Failure Type */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="failureType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Failure Type (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Power Failure, Heat Dissipation Failure"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Leave empty if no failure detected
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Machine Status"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AddMachineStatus;
