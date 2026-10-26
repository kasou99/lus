window.LUS_X_NEWS = {
  "updatedAt": "2026-10-26T00:48:17.980Z",
  "items": [
    {
      "time": "09:35",
      "title": "ブラジル大統領に現職ルラ氏再選",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600147?source=rss",
      "publishedAt": "2026-10-26T00:35:29.000Z",
      "xQuery": "ブラジル大統領に現職ルラ氏再選"
    },
    {
      "time": "08:22",
      "title": "平和賞マチャド氏 ベネズエラ帰国",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600141?source=rss",
      "publishedAt": "2026-10-25T23:22:57.000Z",
      "xQuery": "平和賞マチャド氏 ベネズエラ帰国"
    },
    {
      "time": "07:26",
      "title": "和菓子店主殺害 逮捕知り遺族号泣",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600132?source=rss",
      "publishedAt": "2026-10-25T22:26:53.000Z",
      "xQuery": "和菓子店主殺害 逮捕知り遺族号泣"
    },
    {
      "time": "09:27",
      "title": "新局面 漏洩被害者に迫る「脅威」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600145?source=rss",
      "publishedAt": "2026-10-26T00:27:36.000Z",
      "xQuery": "新局面 漏洩被害者に迫る「脅威」"
    },
    {
      "time": "08:50",
      "title": "電車が駅で140m過ぎて停車 戻らず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600144?source=rss",
      "publishedAt": "2026-10-25T23:50:31.000Z",
      "xQuery": "電車が駅で140m過ぎて停車 戻らず"
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
