window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T01:35:44.003Z",
  "items": [
    {
      "time": "10:09",
      "title": "福岡・熊本 線状降水帯発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596688?source=rss",
      "publishedAt": "2026-09-27T01:09:30.000Z",
      "xQuery": "福岡・熊本 線状降水帯発生の恐れ"
    },
    {
      "time": "09:21",
      "title": "飲酒事故で子失い2年 判決に怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596683?source=rss",
      "publishedAt": "2026-09-27T00:21:27.000Z",
      "xQuery": "飲酒事故で子失い2年 判決に怒り"
    },
    {
      "time": "08:28",
      "title": "露外相 日本の常任理入りに反対",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596678?source=rss",
      "publishedAt": "2026-09-26T23:28:39.000Z",
      "xQuery": "露外相 日本の常任理入りに反対"
    },
    {
      "time": "07:22",
      "title": "プロバスケ選手逮捕 わいせつ疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596673?source=rss",
      "publishedAt": "2026-09-26T22:22:06.000Z",
      "xQuery": "プロバスケ選手逮捕 わいせつ疑い"
    },
    {
      "time": "09:50",
      "title": "タクシー会社の機転で 受け子逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596686?source=rss",
      "publishedAt": "2026-09-27T00:50:19.000Z",
      "xQuery": "タクシー会社の機転で 受け子逮捕"
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
