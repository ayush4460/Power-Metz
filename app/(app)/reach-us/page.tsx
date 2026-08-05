import { Metadata } from "next";
import { ReachUsClient } from "./reach-us-client";

export const metadata: Metadata = {
  title: "Reach Us | PowerMetz",
  description: "Contact PowerMetz Energy for inquiries, partnerships, and support.",
};

export default function ReachUsPage() {
  return <ReachUsClient />;
}
