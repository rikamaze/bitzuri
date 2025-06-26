import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function FiatPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-green-500" />
              Deposit Fiat
            </CardTitle>
            <CardDescription>
              Add funds to your account from your bank account or other payment methods.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/fiat/deposit">
              <Button>Deposit Now</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownLeft className="h-5 w-5 text-red-500" />
              Withdraw Fiat
            </CardTitle>
            <CardDescription>
              Transfer funds from your account to your bank account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/fiat/withdraw">
              <Button>Withdraw Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 