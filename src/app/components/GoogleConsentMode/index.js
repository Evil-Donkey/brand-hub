"use client";
import Script from "next/script";

const GoogleConsentMode = () => {
  return (
    <Script id="google-consent-mode" strategy="beforeInteractive">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
          dataLayer.push(arguments);
      }
      gtag("consent", "default", {
          ad_storage: "denied",
          ad_user_data: "denied", 
          ad_personalization: "denied",
          analytics_storage: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "granted",
          wait_for_update: 2000,
      });
      gtag("set", "ads_data_redaction", true);
      gtag("set", "url_passthrough", true);
      `}
    </Script>
  );
};

export default GoogleConsentMode;