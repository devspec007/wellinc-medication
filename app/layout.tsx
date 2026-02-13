import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Poppins } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Complete your medication intake",
  description: "Complete your medication intake",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // GTM Container ID
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MQPC44B2';
  
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        
        {/* Facebook Pixel - Dynamic based on sub5 parameter */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              // Get FB Pixel ID from sub5 parameter
              var urlParams = new URLSearchParams(window.location.search);
              var fbPixelId = urlParams.get('sub5');
              
              if (fbPixelId) {
                // Store FB Pixel ID in localStorage for future page views
                localStorage.setItem('fb_pixel_id', fbPixelId);
                fbq('init', fbPixelId);
                fbq('track', 'PageView');
              } else {
                // Check if we have a stored FB Pixel ID from previous visit
                var storedPixelId = localStorage.getItem('fb_pixel_id');
                if (storedPixelId) {
                  fbq('init', storedPixelId);
                  fbq('track', 'PageView');
                }
              }
            `,
          }}
        />
        
        <script type="text/javascript" src="https://www.qt3fqt8trk.com/scripts/main.js"></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof EF !== 'undefined' && typeof EF.click === 'function') {
                  
                  // DEVELOPMENT MODE: Check for test transaction_id in URL
                  var testTid = EF.urlParameter('test_tid');
                  if (testTid) {
                    handleTransactionId({ transaction_id: testTid });
                    return; // Skip real Everflow call in test mode
                  }
                  
                  // Helper function to handle transaction_id
                  function handleTransactionId(response) {
                    // Handle both string and object responses
                    var transactionId;
                    if (typeof response === 'string') {
                      // Response is just the transaction_id string
                      transactionId = response;
                    } else if (response && typeof response === 'object') {
                      // Response is an object with transaction_id property
                      transactionId = response.transaction_id || response.tid;
                    }
                    
                    if (transactionId) {
                      // Store in localStorage
                      localStorage.setItem('everflow_transaction_id', transactionId);
                      
                      // Send to backend
                      fetch('/api/everflow/store-transaction-id', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ transaction_id: transactionId })
                      })
                      .catch(function(err) {
                        console.error('[Everflow] Failed to store transaction_id on backend:', err);
                      });
                    }
                  }
                  
                  // Call EF.click - it may return a promise or use callback
                  var clickResult = EF.click({
                    offer_id: EF.urlParameter('oid'),
                    affiliate_id: EF.urlParameter('pub'),
                    sub1: EF.urlParameter('sub1'),
                    sub2: EF.urlParameter('sub2'),
                    sub3: EF.urlParameter('sub3'),
                    sub4: EF.urlParameter('sub4'),
                    sub5: EF.urlParameter('sub5'),
                    transaction_id: EF.urlParameter('tid'),
                  }, handleTransactionId); // Try callback as second parameter
                  
                  // Also handle as Promise in case callback doesn't work
                  if (clickResult && typeof clickResult.then === 'function') {
                    clickResult.then(function(response) {
                      handleTransactionId(response);
                    }).catch(function(err) {
                      console.error('[Everflow] Promise rejected:', err);
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${poppins.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
