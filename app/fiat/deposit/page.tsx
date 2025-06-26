import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DepositForm } from "@/components/fiat/deposit-form";

export default function DepositPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Deposit Fiat</CardTitle>
          <CardDescription>
            Add funds to your account from your bank account or other payment methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DepositForm />
        </CardContent>
      </Card>
    </div>
  );
} 