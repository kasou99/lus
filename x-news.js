window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T06:01:26.285Z",
  "items": [
    {
      "time": "14:26",
      "title": "熊本「何よりも水を」住民ら切実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590494?source=rss",
      "publishedAt": "2026-08-04T05:26:28.000Z",
      "xQuery": "熊本「何よりも水を」住民ら切実"
    },
    {
      "time": "12:20",
      "title": "倒壊カフェから生還 声震わせ再会",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590481?source=rss",
      "publishedAt": "2026-08-04T03:20:18.000Z",
      "xQuery": "倒壊カフェから生還 声震わせ再会"
    },
    {
      "time": "13:33",
      "title": "事故で胎児が被害 法整備巡る現状",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590470?source=rss",
      "publishedAt": "2026-08-04T04:33:36.000Z",
      "xQuery": "事故で胎児が被害 法整備巡る現状"
    },
    {
      "time": "14:06",
      "title": "八王子6人負傷事故 男を再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590491?source=rss",
      "publishedAt": "2026-08-04T05:06:46.000Z",
      "xQuery": "八王子6人負傷事故 男を再逮捕"
    },
    {
      "time": "12:52",
      "title": "グミ誤発注で「SOS」投稿 客続々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590487?source=rss",
      "publishedAt": "2026-08-04T03:52:19.000Z",
      "xQuery": "グミ誤発注で「SOS」投稿 客続々"
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
