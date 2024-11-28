import ComingSoon from "@/components/ComingSoon/ComingSoon";
import connectToDB from "@/services/mongoInit";
connectToDB()
export default function Home() {
  return (
    <ComingSoon />
  );
}
