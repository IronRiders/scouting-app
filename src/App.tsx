import './App.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Header from "@/components/header.tsx";
import QrCode from "@/components/qr-code.tsx";

function App() {
  return (
      <ThemeProvider
        defaultTheme={"system"}
        storageKey={"theme"}
      >
        <div>
            <Header />
            <div className={"container relative"}>
                <div className={"m-4"}>
                    <QrCode />
                </div>
            </div>
        </div>
      </ThemeProvider>
  )
}

export default App
