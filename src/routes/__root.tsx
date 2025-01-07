import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout.tsx";
import { createTheme, LoadingOverlay, MantineColorsTuple, MantineProvider } from "@mantine/core";
import { useGetFloorsQuery } from "../features/floor/api/floorApi.ts";

const orange : MantineColorsTuple = [
    "#fff6e0",
    "#ffebca",
    "#ffd699",
    "#ffc063",
    "#ffad36",
    "#ffa118",
    "#ff9a04",
    "#e48600",
    "#cb7600",
    "#b16500"
]

const red : MantineColorsTuple = [
    "#ffe7e9",
    "#ffcfd1",
    "#ff9ca2",
    "#fd676f",
    "#fb3943",
    "#fa1c28",
    "#fb0819",
    "#e0000d",
    "#c8000a",
    "#af0005"
];

const theme = createTheme({
    colors: {
        'my-orange': orange,
        'my-red': red
    }
})

const Root = () => {
    const {isLoading} = useGetFloorsQuery(undefined, undefined);

    return (
        <MantineProvider theme={theme}>
            <LoadingOverlay visible={isLoading}/>
            <AppLayout>
                <Outlet/>
            </AppLayout>
        </MantineProvider>
    )
}

export const Route = createRootRoute({
    component: Root
})