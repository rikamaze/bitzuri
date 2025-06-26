import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WithdrawForm } from "@/components/fiat/withdraw-form";

export default function WithdrawPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Withdraw Fiat</CardTitle>
          <CardDescription>
            Transfer funds from your account to your bank account or other payment methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WithdrawForm />
        </CardContent>
      </Card>
    </div>
  );
} 