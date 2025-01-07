import { AppShell, Center, Image, NavLink, ScrollArea, Stack, Text } from "@mantine/core";
import { useGetFloorsQuery } from "../features/floor/api/floorApi.ts";
import { Floor } from "../features/floor/floor.ts";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
    const {data} = useGetFloorsQuery(undefined, undefined);

    return (
        <>
            <AppShell.Section>
                <Stack justify="center" align="center">
                    <Image src="/logo.png" h={150} w={150}/>
                    <Text
                        td="underline"
                        size="xl"
                        fw={550}
                        c="white">Floors</Text>
                </Stack>
            </AppShell.Section>
            <AppShell.Section grow my="md" component={ScrollArea}>
                <>
                    {data && data.map(((floor: Floor) => (
                        <NavLink
                            color="my-orange"
                            variant="filled"
                            key={floor.id}
                            label={
                                <Center>
                                    <Text c={"white"} fw={550}>{floor.sequence}F</Text>
                                </Center>
                        }
                            to={`/floors/${floor.sequence}`}
                            component={Link} />
                    )))}
                </>
            </AppShell.Section>
            <AppShell.Section>
                PRMTS App.
            </AppShell.Section>
        </>
    )
}