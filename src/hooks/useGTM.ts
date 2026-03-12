export interface GTMEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const useGTM = () => {
  const pushEvent = (eventData: GTMEvent) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ...eventData,
        gtm_debug: true, // Marker for our research tool
        timestamp: new Date().toISOString(),
      });
      
      // Trigger a custom event for our UI monitor
      window.dispatchEvent(new CustomEvent('gtm_push', { detail: eventData }));
    }
  };

  const initGTM = (id: string) => {
    if (typeof window !== 'undefined' && !document.getElementById('gtm-script')) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');`;
      document.head.appendChild(script);
    }
  };

  return { pushEvent, initGTM };
};
