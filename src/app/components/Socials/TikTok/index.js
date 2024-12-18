'use client'

import { useEffect } from 'react';
import Script from 'next/script';

const TikTokEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* TikTok Embed Code */}
      <blockquote
        className="tiktok-embed"
        cite="https://www.tiktok.com/@_brand_hub"
        data-unique-id="_brand_hub"
        data-embed-from="embed_page"
        data-embed-type="creator"
        style={{ maxWidth: '780px', minWidth: '288px' }}
      >
        <section>
          <a
            target="_blank"
            href="https://www.tiktok.com/@_brand_hub?refer=creator_embed"
            rel="noopener noreferrer"
          >
            @_brand_hub
          </a>
        </section>
      </blockquote>
      {/* Dynamically Load TikTok Embed Script */}
      <Script
        src="https://www.tiktok.com/embed.js"
        strategy="lazyOnload" // Ensures the script loads only on the client
      />
    </div>
  );
};

export default TikTokEmbed;
