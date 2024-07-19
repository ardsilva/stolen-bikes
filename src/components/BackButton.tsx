import { Button } from "@/components/ui/button";

function BackButton({ onClick }:any) {
  return (
    <Button variant={"default"} onClick={onClick}>Back</Button>
  );
}

export default BackButton;
