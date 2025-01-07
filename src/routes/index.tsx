import {createFileRoute, Navigate} from '@tanstack/react-router'
import {useGetFloorsQuery} from "../features/floor/api/floorApi.ts";
import {LoadingOverlay} from "@mantine/core";

const RouteComponent = () => {
  const {data, isLoading} = useGetFloorsQuery(undefined, undefined);

  return (
      <>
        <LoadingOverlay visible={isLoading}/>
        {data && <Navigate to={`/floors/${data[0].sequence}`} />}
      </>
  )
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
})
