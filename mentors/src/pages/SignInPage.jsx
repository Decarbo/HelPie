import { SignIn } from "@clerk/clerk-react";


export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <SignIn
        redirectUrl="/mentor-dashboard"
        appearance={{
          // elements: {
          //   formButtonPrimary: "bg-white text-black hover:bg-gray-200",
          //   card: "bg-black border border-gray-800 shadow-lg",
          //   headerTitle: "text-white",
          //   headerSubtitle: "text-gray-400",
          //   formFieldLabel: "text-gray-300",
          //   formFieldInput: "bg-gray-900 text-white border border-gray-700",
          //   footerActionText: "text-gray-400",
          //   footerActionLink: "text-white hover:text-gray-300",
          // },
          // variables: {
          //   colorPrimary: "white",
          //   colorBackground: "black",
          //   colorText: "white",
          //   colorInputBackground: "#111",
          //   colorInputText: "white",
          // },
        }}
      />
    </div>
  );
}
