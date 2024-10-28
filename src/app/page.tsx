import Container from "@/components/container";
import UploadForm from "@/components/upload-form";

export default function Home() {
  return (
    <Container className="gap-4 flex flex-col">
      <UploadForm />
    </Container>
  );
}
