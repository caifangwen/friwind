import { createFileRoute } from '@tanstack/react-router'

import { ShowcasePage } from '#/components/showcase/showcase-page'

export const Route = createFileRoute('/components')({
  component: ComponentsRoute,
})

function ComponentsRoute() {
  return <ShowcasePage />
}
