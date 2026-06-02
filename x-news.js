window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T11:38:20.036Z",
  "items": [
    {
      "time": "20:33",
      "title": "台風 3日朝は関東や東海で大荒れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582708?source=rss",
      "publishedAt": "2026-06-02T11:33:38.000Z",
      "xQuery": "台風 3日朝は関東や東海で大荒れ"
    },
    {
      "time": "20:25",
      "title": "「線状降水帯」情報 発表に不具合",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582706?source=rss",
      "publishedAt": "2026-06-02T11:25:01.000Z",
      "xQuery": "「線状降水帯」情報 発表に不具合"
    },
    {
      "time": "20:16",
      "title": "補正予算案が判明 全額赤字国債で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582707?source=rss",
      "publishedAt": "2026-06-02T11:16:31.000Z",
      "xQuery": "補正予算案が判明 全額赤字国債で"
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
