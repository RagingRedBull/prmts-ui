import { createFileRoute } from '@tanstack/react-router'
import { ViewFloorPage } from '../../features/floor/user/page/ViewFloorPage.tsx'

export const Route = createFileRoute('/floors/$sequence')({
  component: ViewFloorPage,
})
