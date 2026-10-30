"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send `email` to your email provider before showing this message.
    toast.add({ title: "Thanks, you're on the list.", type: "success" });
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <label
        htmlFor="newsletter-email"
        className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="h-11 border-b border-input bg-transparent text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground"
      />
      <Button
        type="submit"
        size="lg"
        className="h-12 w-fit rounded-none px-7 text-[11px] uppercase tracking-[0.14em]"
      >
        Sign up
      </Button>
      <p className="text-[11px] text-muted-foreground">
        Unsubscribe in one click.
      </p>
    </form>
  );
}
