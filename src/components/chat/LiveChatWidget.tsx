"use client";

import { useEffect } from "react";

export function LiveChatWidget() {
  useEffect(() => {
    // In dev, Fast Refresh can mount/unmount components multiple times.
    // Guard against re-injecting the widget (which can lead to duplicate icon registration warnings).
    if (
      typeof window !== "undefined" &&
      (window as any).__UT_OMNICHANNEL_LC_LOADED
    )
      return;

    // Check if the script is already loaded
    if (document.getElementById("Microsoft_Omnichannel_LCWidget")) {
      if (typeof window !== "undefined")
        (window as any).__UT_OMNICHANNEL_LC_LOADED = true;
      return;
    }

    // Create the script element
    const script = document.createElement("script");
    script.id = "Microsoft_Omnichannel_LCWidget";
    script.src =
      "https://oc-cdn-ocprod.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js";
    script.async = true;

    // Set data attributes
    script.setAttribute("data-app-id", "a5519381-7bf5-4740-a63c-b9af851ec4c1");
    script.setAttribute("data-lcw-version", "prod");
    script.setAttribute("data-org-id", "f5762356-ff92-f011-a700-6045bd073035");
    script.setAttribute(
      "data-org-url",
      "https://m-f5762356-ff92-f011-a700-6045bd073035.us.omnichannelengagementhub.com"
    );

    // Error handling - fallback to blob storage if CDN fails
    script.onerror = function (this: HTMLScriptElement) {
      this.parentNode?.removeChild(this);
      const fallbackScript = document.createElement("script");
      fallbackScript.src =
        "https://ocprodocprodnamgs.blob.core.windows.net/livechatwidget/scripts/LiveChatBootstrapper.js";
      fallbackScript.setAttribute("id", "Microsoft_Omnichannel_LCWidget");
      fallbackScript.setAttribute(
        "data-app-id",
        "a5519381-7bf5-4740-a63c-b9af851ec4c1"
      );
      fallbackScript.setAttribute("data-lcw-version", "prod");
      fallbackScript.setAttribute(
        "data-org-id",
        "f5762356-ff92-f011-a700-6045bd073035"
      );
      fallbackScript.setAttribute(
        "data-org-url",
        "https://m-f5762356-ff92-f011-a700-6045bd073035.us.omnichannelengagementhub.com"
      );
      document.body.appendChild(fallbackScript);
    };

    // Append script to body
    document.body.appendChild(script);
    if (typeof window !== "undefined")
      (window as any).__UT_OMNICHANNEL_LC_LOADED = true;

    // Note: We intentionally do NOT remove the script on cleanup.
    // Removing + re-adding during Fast Refresh can cause the widget to reinitialize and spam warnings.
    return;
  }, []);

  return null; // This component doesn't render anything visible
}

export default LiveChatWidget;
