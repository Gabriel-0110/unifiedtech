'use client'
import { useEffect } from 'react'

export function CopilotWidget() {
  useEffect(() => {
    if (document.getElementById('Copilot_Embeddable_Widget')) return;
    const iframe = document.createElement('iframe');
    iframe.id = 'Copilot_Embeddable_Widget';
    iframe.src = 'https://copilotforservice-prod.azureedge.net/widget/index.html?dynamicsUrl=https://ggunifiedtech.crm.dynamics.com&override_features.ThirdPartyCRMConnector=false';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '24px';
    iframe.style.right = '24px';
    iframe.style.width = '400px';
    iframe.style.height = '600px';
    iframe.style.zIndex = '9999';
    iframe.style.border = 'none';
    iframe.setAttribute('title', 'Copilot Embeddable Widget');
    document.body.appendChild(iframe);
    return () => {
      const el = document.getElementById('Copilot_Embeddable_Widget');
      if (el) el.remove();
    };
  }, []);
  return null;
}

export default CopilotWidget;
