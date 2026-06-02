window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T21:35:56.053Z",
  "items": [
    {
      "time": "05:53",
      "title": "和歌山県の古座川に氾濫特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582727?source=rss",
      "publishedAt": "2026-06-02T20:53:33.000Z",
      "xQuery": "和歌山県の古座川に氾濫特別警報"
    },
    {
      "time": "04:59",
      "title": "台風6号 和歌山県南部に上陸",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582725?source=rss",
      "publishedAt": "2026-06-02T19:59:07.000Z",
      "xQuery": "台風6号 和歌山県南部に上陸"
    },
    {
      "time": "05:27",
      "title": "台風6号 関東は朝から雨風ピーク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582726?source=rss",
      "publishedAt": "2026-06-02T20:27:11.000Z",
      "xQuery": "台風6号 関東は朝から雨風ピーク"
    },
    {
      "time": "23:46",
      "title": "東京などで線状降水帯発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582723?source=rss",
      "publishedAt": "2026-06-02T14:46:28.000Z",
      "xQuery": "東京などで線状降水帯発生の恐れ"
    },
    {
      "time": "06:32",
      "title": "セブン 全国2万店から過大徴収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582728?source=rss",
      "publishedAt": "2026-06-02T21:32:22.000Z",
      "xQuery": "セブン 全国2万店から過大徴収"
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
