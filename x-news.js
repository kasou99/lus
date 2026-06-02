window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T09:39:16.720Z",
  "items": [
    {
      "time": "18:16",
      "title": "台風接近 大雨エリア徐々に東へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582693?source=rss",
      "publishedAt": "2026-06-02T09:16:31.000Z",
      "xQuery": "台風接近 大雨エリア徐々に東へ"
    },
    {
      "time": "17:23",
      "title": "消費減税巡る報道 木原氏コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582683?source=rss",
      "publishedAt": "2026-06-02T08:23:57.000Z",
      "xQuery": "消費減税巡る報道 木原氏コメント"
    },
    {
      "time": "17:58",
      "title": "早紀江さん 滋さんに「ごめんね」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582690?source=rss",
      "publishedAt": "2026-06-02T08:58:44.000Z",
      "xQuery": "早紀江さん 滋さんに「ごめんね」"
    },
    {
      "time": "18:25",
      "title": "トラックに挟まれ 軽の運転手死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582691?source=rss",
      "publishedAt": "2026-06-02T09:25:22.000Z",
      "xQuery": "トラックに挟まれ 軽の運転手死亡"
    },
    {
      "time": "15:24",
      "title": "ゴミ袋買えない苦情相次ぎ 市調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582672?source=rss",
      "publishedAt": "2026-06-02T06:24:11.000Z",
      "xQuery": "ゴミ袋買えない苦情相次ぎ 市調査"
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
