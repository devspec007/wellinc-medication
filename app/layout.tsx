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
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        <script type="text/javascript" src="https://www.qt3fqt8trk.com/scripts/main.js"></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                console.log("EF", EF);
                console.log("EF.click", EF.click);
                console.log("EF.urlParameter", EF.urlParameter);
                console.log("EF.urlParameter('oid')", EF.urlParameter('oid'));
                console.log("EF.urlParameter('pub')", EF.urlParameter('pub'));
                console.log("EF.urlParameter('sub1')", EF.urlParameter('sub1'));
                console.log("EF.urlParameter('sub2')", EF.urlParameter('sub2'));
                console.log("EF.urlParameter('sub3')", EF.urlParameter('sub3'));
                if (typeof EF !== 'undefined' && typeof EF.click === 'function') {
                  
                  // DEVELOPMENT MODE: Check for test transaction_id in URL
                  var testTid = EF.urlParameter('test_tid');
                  if (testTid) {
                    console.log('[Everflow DEV MODE] Using test transaction_id:', testTid);
                    handleTransactionId({ transaction_id: testTid });
                    return; // Skip real Everflow call in test mode
                  }
                  
                  // Helper function to handle transaction_id
                  function handleTransactionId(response) {
                    console.log('[Everflow] Processing response:', response);
                    
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
                      console.log('[Everflow] Got transaction_id:', transactionId);
                      
                      // Store in localStorage
                      localStorage.setItem('everflow_transaction_id', transactionId);
                      console.log('[Everflow] Saved to localStorage');
                      
                      // Send to backend
                      fetch('/api/everflow/store-transaction-id', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ transaction_id: transactionId })
                      })
                      .then(function(res) {
                        if (res.ok) {
                          console.log('[Everflow] Transaction ID stored successfully on backend');
                        }
                      })
                      .catch(function(err) {
                        console.error('[Everflow] Failed to store transaction_id on backend:', err);
                      });
                    } else {
                      console.warn('[Everflow] No transaction_id in response');
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
                  
                  console.log('[Everflow] EF.click() called, result:', clickResult);
                  
                  // Also handle as Promise in case callback doesn't work
                  if (clickResult && typeof clickResult.then === 'function') {
                    console.log('[Everflow] EF.click() returned a Promise, waiting for response...');
                    clickResult.then(function(response) {
                      console.log('[Everflow] Promise resolved with:', response);
                      handleTransactionId(response);
                    }).catch(function(err) {
                      console.error('[Everflow] Promise rejected:', err);
                    });
                  }
                } else {
                  console.warn('Everflow SDK not loaded or EF.click not available');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${poppins.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
