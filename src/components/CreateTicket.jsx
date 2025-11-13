import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Clock,
  Info,
} from "lucide-react";
import { createTicket } from "@/utils/api";

// Validasi data dengan Zod
const formSchema = z.object({
  problem: z
    .string()
    .min(1, "Problem is required")
    .min(5, "Problem must be at least 5 characters"),
  machine: z.string().min(1, "Machine ID is required"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level",
  }),
  detail: z
    .string()
    .min(1, "Detail is required")
    .min(10, "Detail must be at least 10 characters"),
});

// Kumpulan opsi prioritas serta design masing2
const PRIORITY_OPTIONS = [
  {
    value: "low",
    label: "Low",
    icon: Clock,
    description: "Can be scheduled for later",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    value: "medium",
    label: "Medium",
    icon: AlertCircle,
    description: "Needs attention soon",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  {
    value: "high",
    label: "High",
    icon: AlertTriangle,
    description: "Urgent, requires immediate action",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
];

const CreateTicket = ({ onTicketCreated }) => {
// Inisialisasi form dengan react-hook-form dan zodResolver
// Tidak perlu state management lagi karena sudah pake react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: "",
      machine: "",
      priority: "",
      detail: "",
    },
  });

  // Hitung persentase kelengkapan form buat progress bar ala2
  const formValues = form.watch();
  const formCompletion = React.useMemo(() => {
    const fields = ["problem", "machine", "priority", "detail"];
    const filledFields = fields.filter((field) => {
      const value = formValues[field];
      return value && value.toString().trim() !== "";
    }).length;
    return Math.round((filledFields / fields.length) * 100);
  }, [formValues]);

  const onSubmit = async (values) => {
    const promise = createTicket(values);

    toast.promise(promise, {
      loading: "Creating ticket...",
      success: (result) => {
        // Reset form setelah berhasil submit ticket
        setTimeout(() => {
          form.reset();
          if (onTicketCreated && result?.data) {
            onTicketCreated(result.data);
          }
        }, 1000);
        return "Ticket created successfully! 🎉";
      },
      error: (err) => {
        return err?.message || "Failed to create ticket. Please try again.";
      },
    });

    return promise;
  };


  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle>Ticket Information</CardTitle>
              <CardDescription>
                Fill in the details below to create a maintenance ticket
              </CardDescription>
            </div>
            {/* Progress bar dan Badge completionnya */}
            {formCompletion > 0 && formCompletion < 100 && (
              <Badge variant="outline" className="shrink-0">
                <Info className="w-3 h-3" />
                {formCompletion}% Complete
              </Badge>
            )}
            {formCompletion === 100 && (
              <Badge className="shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                Ready to Submit
              </Badge>
            )}
          </div>
          {formCompletion > 0 && formCompletion < 100 && (
            <div className="mt-4">
              <Progress value={formCompletion} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Problem */}
              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Problem <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief summary of the issue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Machine ID */}
              <FormField
                control={form.control}
                name="machine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Machine ID <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input machine ID here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Priority Level <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {PRIORITY_OPTIONS.map((priority, index) => {
                          const Icon = priority.icon;
                          const isSelected = field.value === priority.value;
                          return (
                            <motion.button
                              key={priority.value}
                              type="button"
                              onClick={() => field.onChange(priority.value)}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                delay: index * 0.1,
                                duration: 0.3 
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`
                                relative flex flex-col items-start gap-2 p-4 rounded-lg border-2 transition-all text-left
                                ${
                                  isSelected
                                    ? `${priority.borderColor} ${priority.bgColor}`
                                    : "border-border hover:border-muted-foreground/50 hover:bg-accent"
                                }
                                cursor-pointer
                              `}
                            >
                              <div className="flex items-center gap-2 w-full">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isSelected
                                      ? priority.color
                                      : "text-muted-foreground"
                                  }`}
                                />
                                <span
                                  className={`text-sm font-semibold ${
                                    isSelected ? priority.color : "text-foreground"
                                  }`}
                                >
                                  {priority.label}
                                </span>
                                {isSelected && (
                                  <CheckCircle2
                                    className={`w-4 h-4 ml-auto ${priority.color}`}
                                  />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {priority.description}
                              </p>
                            </motion.button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Detail */}
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Detail <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed information about the issue, including any error messages, symptoms, or relevant context..."
                        className="min-h-32 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {field.value.length} characters
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="space-y-3 pt-4">
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || formCompletion < 100}
                    className="flex-1"
                    size="lg"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Ticket...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Create Ticket
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
    </>
  );
};

export default CreateTicket;
