window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T11:40:19.265Z",
  "items": [
    {
      "time": "17:58",
      "title": "農相に武部新氏「ワイルド」評",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598890?source=rss",
      "publishedAt": "2026-10-15T08:58:03.000Z",
      "xQuery": "農相に武部新氏「ワイルド」評"
    },
    {
      "time": "16:21",
      "title": "米の新報道官 弁護士経歴に疑念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598880?source=rss",
      "publishedAt": "2026-10-15T07:21:43.000Z",
      "xQuery": "米の新報道官 弁護士経歴に疑念"
    },
    {
      "time": "20:29",
      "title": "年金だけで暮らせず 毎日働く71歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598916?source=rss",
      "publishedAt": "2026-10-15T11:29:05.000Z",
      "xQuery": "年金だけで暮らせず 毎日働く71歳"
    },
    {
      "time": "18:15",
      "title": "麻生氏 簗氏の更迭「大変遺憾」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598898?source=rss",
      "publishedAt": "2026-10-15T09:15:09.000Z",
      "xQuery": "麻生氏 簗氏の更迭「大変遺憾」"
    },
    {
      "time": "18:58",
      "title": "バスと車衝突し73歳死亡 孫が重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598906?source=rss",
      "publishedAt": "2026-10-15T09:58:07.000Z",
      "xQuery": "バスと車衝突し73歳死亡 孫が重体"
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
