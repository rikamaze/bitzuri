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
import { depositFiat } from "@/lib/api/fiatService";
import { useState } from "react";

const depositFormSchema = z.object({
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Please enter a valid amount",
  }),
  currency: z.string({
    required_error: "Please select a currency.",
  }),
  paymentMethod: z.string({
    required_error: "Please select a payment method.",
  }),
});

type DepositFormValues = z.infer<typeof depositFormSchema>;

const defaultValues: Partial<DepositFormValues> = {
  amount: "100.00",
};

export function DepositForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: DepositFormValues) {
    setIsLoading(true);
    try {
        const response = await depositFiat({
            ...data,
            amount: parseFloat(data.amount)
        });

        if (response.status === 'failed') {
            toast({
                title: "Deposit Failed",
                description: response.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Deposit Submitted",
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
                The amount you want to deposit.
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
                The currency you want to deposit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your preferred payment method.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
} 