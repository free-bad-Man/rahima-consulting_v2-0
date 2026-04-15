import Link from 'next/link';

type ServiceItem = {
  href: string;
  title: string;
  excerpt: string;
  price?: string;
};

type ServicesGridProps = {
  title?: string;
  subtitle?: string;
  items: ServiceItem[];
};

export function ServicesGrid({
  title,
  subtitle,
  items,
}: ServicesGridProps) {
  const featured = items.slice(0, 3);
  const regular = items.slice(3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
      {(title || subtitle) ? (
        <div className="mb-8 max-w-3xl">
          {title ? (
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-3 text-base leading-7 text-neutral-600">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        {featured.map((item) => (
          <article
            key={item.href}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {item.price ? (
              <p className="mb-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                {item.price}
              </p>
            ) : null}

            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {item.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Подробнее
              </Link>

              <Link
                href="/kontakty/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                Отправить фото
              </Link>
            </div>
          </article>
        ))}
      </div>

      {regular.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {regular.map((item) => (
            <article
              key={item.href}
              className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 transition hover:bg-white"
            >
              {item.price ? (
                <p className="text-sm font-semibold text-red-700">
                  {item.price}
                </p>
              ) : null}

              <h3 className="mt-2 text-lg font-bold tracking-tight text-neutral-950">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {item.excerpt}
              </p>

              <div className="mt-4">
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-neutral-950 transition hover:text-red-700"
                >
                  Смотреть услугу →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}