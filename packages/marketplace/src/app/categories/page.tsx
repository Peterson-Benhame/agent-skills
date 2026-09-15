import Link from 'next/link'

import { Breadcrumbs } from '../../components/Breadcrumbs'
import { JsonLd } from '../../components/JsonLd'
import { catalog, populatedCategories } from '../../lib/catalog'
import { buildPageMetadata } from '../../lib/seo/metadata'
import { breadcrumbSchema, collectionPageSchema, graph, organizationSchema } from '../../lib/seo/schema'
import { routes } from '../../lib/seo/urls'

const crumbs = [
  { name: 'Home', path: routes.home() },
  { name: 'Categories', path: routes.categories() },
]

export const metadata = buildPageMetadata({
  title: 'Categorias de Skills',
  description: `Todas as ${
    populatedCategories().length
  } categorias de skills para agentes de IA — arquitetura, segurança, qualidade, go-to-market e muito mais.`,
  path: routes.categories(),
})

export default function CategoriesPage() {
  const categories = populatedCategories()

  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          collectionPageSchema({
            name: 'Categorias de Agent Skills',
            description: 'Todas as categorias de skills para agentes de programação com IA publicadas no registro Agent Skills.',
            path: routes.categories(),
            items: categories.map((category) => ({ name: category.name, path: routes.category(category.id) })),
          }),
          breadcrumbSchema(crumbs),
        ])}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
            Categorias de skills para agentes de IA
          </h1>

          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
            As {catalog.stats.totalSkills} skills deste registro estão organizadas em {categories.length} categorias de
            acordo com o problema de engenharia que resolvem. Escolha uma categoria para ver todas as skills disponíveis,
            o que cada uma faz e quando utilizá-la.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="border border-gray-100 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm"
            >
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5">
                <Link
                  href={routes.category(category.id)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {category.name}
                </Link>
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                {category.description}
              </p>

              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {category.skillCount} {category.skillCount === 1 ? 'skill' : 'skills'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}