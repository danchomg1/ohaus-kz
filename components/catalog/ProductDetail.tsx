import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGallery from "./ProductGallery";
import Breadcrumbs, { type Crumb } from "@/components/layout/Breadcrumbs";
import { type Product, productImageBase } from "@/lib/products";

type ProductDetailProps = {
  product: Product;
  crumbs: Crumb[];
};

export default function ProductDetail({ product, crumbs }: ProductDetailProps) {
  return (
    <Container>
      <Breadcrumbs items={crumbs} />

      <div className="grid grid-cols-1 gap-8 pb-16 lg:grid-cols-2">
        {/* Image gallery */}
        <ProductGallery base={productImageBase(product)} alt={product.name} />

        {/* Info */}
        <div>
          <span className="font-heading text-xs font-bold uppercase tracking-wide text-ohaus-red">
            {product.seriesLabel}
          </span>
          <h1 className="mt-2 font-heading text-2xl font-bold text-ohaus-ink sm:text-3xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-ohaus-muted">
            {product.summary}
          </p>

          {product.specs.length > 0 ? (
            <>
              <h2 className="mb-3 mt-8 font-heading text-lg font-bold text-ohaus-ink">
                Характеристики
              </h2>
              <dl className="divide-y divide-ohaus-line border-y border-ohaus-line">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 gap-4 py-3 text-sm"
                  >
                    <dt className="text-ohaus-muted">{spec.label}</dt>
                    <dd className="font-semibold text-ohaus-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/quote">Узнать цену</Button>
            <Button href="/contacts" variant="outline">
              Связаться
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
