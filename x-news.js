window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T10:22:50.242Z",
  "items": [
    {
      "time": "17:52",
      "title": "自民支持率が急落 消えた解散効果",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584979?source=rss",
      "publishedAt": "2026-06-20T08:52:20.000Z",
      "xQuery": "自民支持率が急落 消えた解散効果"
    },
    {
      "time": "18:56",
      "title": "ボリビアが非常事態宣言 経済混乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584986?source=rss",
      "publishedAt": "2026-06-20T09:56:03.000Z",
      "xQuery": "ボリビアが非常事態宣言 経済混乱"
    },
    {
      "time": "17:26",
      "title": "スーパーエルニーニョ襲来か 解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584974?source=rss",
      "publishedAt": "2026-06-20T08:26:04.000Z",
      "xQuery": "スーパーエルニーニョ襲来か 解説"
    },
    {
      "time": "18:06",
      "title": "駐車場ではねられ車の下敷き 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584980?source=rss",
      "publishedAt": "2026-06-20T09:06:06.000Z",
      "xQuery": "駐車場ではねられ車の下敷き 重体"
    },
    {
      "time": "17:38",
      "title": "フェルメール展 チケ「無理ゲー」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584978?source=rss",
      "publishedAt": "2026-06-20T08:38:26.000Z",
      "xQuery": "フェルメール展 チケ「無理ゲー」"
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
