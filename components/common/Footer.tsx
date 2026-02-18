import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-6 text-center">
        <Separator />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Devtinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
