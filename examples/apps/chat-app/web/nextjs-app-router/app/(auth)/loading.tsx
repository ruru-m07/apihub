import { CardWrapper } from "@/components/auth/card-wrapper";
import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel=""
        backButtonHref="/register"
      >
        <div className="w-full h-auto my-10 flex justify-center items-center">
          <Loader size={8} />
        </div>
      </CardWrapper>
    </>
  );
}
