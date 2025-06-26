"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { withdrawFiat } from "@/lib/api/fiatService";
import { useState } from "react";

const withdrawFormSchema = z.object({
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Please enter a valid amount",
  }),
  currency: z.string({
    required_error: "Please select a currency.",
  }),
  destination: z.string({
    required_error: "Please select a destination account.",
  }),
});

type WithdrawFormValues = z.infer<typeof withdrawFormSchema>;

const defaultValues: Partial<WithdrawFormValues> = {
  amount: "100.00",
};

export function WithdrawForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: WithdrawFormValues) {
    setIsLoading(true);
    try {
        const response = await withdrawFiat({
            ...data,
            currency: data.currency,
            paymentMethod: data.destination,
            amount: parseFloat(data.amount)
        });

        if (response.status === 'failed') {
            toast({
                title: "Withdrawal Failed",
                description: response.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Withdrawal Submitted",
                description: response.message,
            });
            form.reset();
        }
    } catch (error) {
        toast({
            title: "An unexpected error occurred",
            description: "Please try again later.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="100.00" {...field} />
              </FormControl>
              <FormDescription>
                The amount you want to withdraw.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The currency you want to withdraw.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* These would be populated from user's saved accounts */}
                  <SelectItem value="bank-1">Bank Account ending in 1234</SelectItem>
                  <SelectItem value="bank-2">Bank Account ending in 5678</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the destination for your funds.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>{isLoading ? "Processing..." : "Continue"}</Button>
      </form>
    </Form>
  );
} 