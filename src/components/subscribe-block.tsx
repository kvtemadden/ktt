"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const subscriberSchema = z.object({
  email: z.string().email(),
});

export const SubscribeBlock = () => {
  const form = useForm<z.infer<typeof subscriberSchema>>({
    resolver: zodResolver(subscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof subscriberSchema>) => {
    try {
      console.log(data);
      toast({
        title: "✅ Subscribed successfully!",
        description: "Thanks for subscribing! 🎉",
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-semibold">Subscribe to our newsletter</h2>

      <p className="max-w-[550px] opacity-70">
        Love reading my blog? Subscribe to my newsletter to get articles sent
        directly to your inbox.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-row flex-nowrap justify-center gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="w-80 rounded-lg border p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Subscribe</Button>
        </form>
      </Form>
    </div>
  );
};
