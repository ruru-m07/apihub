import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Button</Button>
      <ModeToggle />
    </main>
  );
}
