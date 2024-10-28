import Container from "./container";

export default function Header() {
  return (
    <div className="w-full h-20 dark:bg-slate-700 bg-slate-300">
      <Container className="flex items-center justify-between">
        <span className="text-xl text-slate-700 dark:text-slate-300">
          NextJS image placeholder generator
        </span>
      </Container>
    </div>
  );
}
