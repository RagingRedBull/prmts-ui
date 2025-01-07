import { AppShell, Group, Text } from "@mantine/core"
import { ReactElement } from "react";
import { Navbar } from "./Navbar.tsx";
import classes from "../css/AppLayout.module.css"

interface AppLayoutProps {
    children: ReactElement | ReactElement[];
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <AppShell
            layout="alt"
            color="orange.2"
            header={ { height: 90 } }
            navbar={ { width: 160, breakpoint: 'sm' } }
            classNames={ {
                header: classes.header,
                navbar: classes.navbar
            } }
            padding="md"
            withBorder={ false }
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Text size="2.5em" fw={ 660 }>Fire Alarm Control Unit |</Text>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <Navbar/>
            </AppShell.Navbar>
            <AppShell.Main>
                { children }
            </AppShell.Main>
        </AppShell>
    )
}