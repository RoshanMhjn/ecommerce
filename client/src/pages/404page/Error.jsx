import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <img
            src="https://media.istockphoto.com/id/1207750534/photo/404-error-internet-page-not-found-hand-with-magnifier-concept-picture.jpg?b=1&s=612x612&w=0&k=20&c=LCa3sH4YETq54JMXnrVjl2iCQQNBj-DXrorIhu71NBI="
            alt="404 Error"
            className="mx-auto mb-6 w-1/2 h-auto object-contain"
          />
          <h1 className="text-6xl font-bold text-black">404</h1>
          <p className="mt-4 text-xl text-gray-600">
            Oops! The page you’re looking for doesn’t exist.
          </p>
          <p className="text-gray-500 mt-2">
            It might have been moved or deleted.
          </p>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-gray-800"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
      );
    </div>
  );
};

export default Error;
