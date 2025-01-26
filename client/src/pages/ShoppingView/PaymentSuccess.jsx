import { Button } from "@/components/ui/button"; // ShadCN button
import { CheckCircle } from "lucide-react"; // Lucide icon
import { useNavigate } from "react-router-dom"; // For navigation

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-green-500">
          <CheckCircle className="w-24 h-24 mx-auto" />
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          Your payment was successfully processed. Thank you for your purchase!
        </p>

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => navigate("/shop/listings")}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white hover:bg-green-700"
          >
            Go to Home
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={() => navigate("/shop/account")}
            className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white hover:bg-gray-700"
          >
            View Order Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
