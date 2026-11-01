window.LUS_X_NEWS = {
  "updatedAt": "2026-11-01T06:37:07.253Z",
  "items": [
    {
      "time": "15:10",
      "title": "米国産ジャガイモ 国会論点に浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600947?source=rss",
      "publishedAt": "2026-11-01T06:10:45.000Z",
      "xQuery": "米国産ジャガイモ 国会論点に浮上"
    },
    {
      "time": "14:46",
      "title": "台風 小笠原諸島は影響長引く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600944?source=rss",
      "publishedAt": "2026-11-01T05:46:37.000Z",
      "xQuery": "台風 小笠原諸島は影響長引く恐れ"
    },
    {
      "time": "13:32",
      "title": "個人情報は必要? 企業の漏洩対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600932?source=rss",
      "publishedAt": "2026-11-01T04:32:45.000Z",
      "xQuery": "個人情報は必要? 企業の漏洩対策"
    },
    {
      "time": "13:16",
      "title": "兄の遺体遺棄疑い妹逮捕 父関与か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600930?source=rss",
      "publishedAt": "2026-11-01T04:16:07.000Z",
      "xQuery": "兄の遺体遺棄疑い妹逮捕 父関与か"
    },
    {
      "time": "15:29",
      "title": "「ドパ親」に頭を抱える家族 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600953?source=rss",
      "publishedAt": "2026-11-01T06:29:23.000Z",
      "xQuery": "「ドパ親」に頭を抱える家族 背景"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
