import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Sandbox } from './pages/Sandbox'
import { Ecommerce } from './pages/Ecommerce'
import { DataLayerMonitor } from './components/DataLayerMonitor'
import { useGTM } from './hooks/useGTM'
import { Docs } from './pages/Docs'
import './App.css'

type Page = 'home' | 'sandbox' | 'ecommerce' | 'docs';

function App() {
  const { pushEvent } = useGTM();
  const [currentPage, setCurrentPage] = useState<Page>('home');


  useEffect(() => {
    pushEvent({
      event: 'page_view',
      page_title: currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
      page_path: `/${currentPage}`
    });
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'sandbox': return <Sandbox />;
      case 'ecommerce': return <Ecommerce />;
      case 'docs': return <Docs />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-shell">
      <Navbar onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <DataLayerMonitor />
    </div>
  )
}

export default App
