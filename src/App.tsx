import './App.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Header from "@/components/header.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import Match from "@/components/match.tsx";
import Pit from "@/components/pit.tsx";

function App() {
  return (
      <ThemeProvider
        defaultTheme={"system"}
        storageKey={"theme"}
      >
        <div>
            <Header />
            <main className={"container relative bottom"}>
                <Tabs defaultValue={"match"} className={"my-4"}>
                    <TabsList className={"w-full flex"}>
                        <TabsTrigger value={"match"} className={"flex-1"}>Match</TabsTrigger>
                        <TabsTrigger value={"pit"} className={"flex-1"}>Pit</TabsTrigger>
                    </TabsList>
                    <TabsContent value={"match"}>
                        <Match />
                    </TabsContent>
                    <TabsContent value={"pit"}>
                        <Pit />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
      </ThemeProvider>
  )
}

export default App
