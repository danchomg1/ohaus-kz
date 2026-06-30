import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-6xl font-black text-ohaus-red">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ohaus-ink">
        Страница не найдена
      </h1>
      <p className="mt-2 max-w-md text-sm text-ohaus-muted">
        Возможно, страница была перемещена или больше не существует.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/">На главную</Button>
        <Button href="/products" variant="outline">
          В каталог
        </Button>
      </div>
    </Container>
  );
}
