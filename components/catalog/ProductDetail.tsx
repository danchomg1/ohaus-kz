import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumbs, { type Crumb } from "@/components/layout/Breadcrumbs";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import PortableBody from "./PortableBody";
import type { ProductDetailData } from "@/sanity/lib/queries";

export default function ProductDetail({
  product,
  crumbs,
}: {
  product: NonNullable<ProductDetailData>;
  crumbs: Crumb[];
}) {
  const features = product.features ?? [];
  const specs = product.specs ?? [];
  const details = product.details ?? [];
  const documents = product.documents ?? [];
  const description = product.description ?? [];
  const hasDescription = description.length > 0;

  return (
    <Container>
      <Breadcrumbs items={crumbs} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery images={product.gallery ?? []} alt={product.name} />

        <div>
          {product.series ? (
            <span className="font-heading text-xs font-bold uppercase tracking-wide text-ohaus-red">
              {product.series}
            </span>
          ) : null}
          <h1 className="mt-2 font-heading text-2xl font-bold text-ohaus-ink sm:text-3xl">
            {product.name}
          </h1>

          {product.summary ? (
            <p className="mt-4 text-base leading-relaxed text-ohaus-muted">
              {product.summary}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/quote">Узнать цену</Button>
            <Button href="/contacts" variant="outline">
              Связаться
            </Button>
          </div>
        </div>
      </div>

      <ProductTabs
        productName={product.name}
        features={features}
        specs={specs}
        documents={documents}
        details={details}
        description={
          hasDescription ? <PortableBody value={description} /> : null
        }
      />

      <div className="pb-16" />
    </Container>
  );
}
