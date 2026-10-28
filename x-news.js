window.LUS_X_NEWS = {
  "updatedAt": "2026-10-28T08:37:56.475Z",
  "items": [
    {
      "time": "14:14",
      "title": "GMOへの「劇場型」攻撃 狙いは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600424?source=rss",
      "publishedAt": "2026-10-28T05:14:57.000Z",
      "xQuery": "GMOへの「劇場型」攻撃 狙いは"
    },
    {
      "time": "16:32",
      "title": "青森で初雪 八戸市民「早すぎ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600436?source=rss",
      "publishedAt": "2026-10-28T07:32:00.000Z",
      "xQuery": "青森で初雪 八戸市民「早すぎ」"
    },
    {
      "time": "16:55",
      "title": "呼吸器具抜き妻を殺害疑い 夫逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600442?source=rss",
      "publishedAt": "2026-10-28T07:55:45.000Z",
      "xQuery": "呼吸器具抜き妻を殺害疑い 夫逮捕"
    },
    {
      "time": "16:27",
      "title": "つるされた鉄の棒が直撃 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600437?source=rss",
      "publishedAt": "2026-10-28T07:27:07.000Z",
      "xQuery": "つるされた鉄の棒が直撃 意識不明"
    },
    {
      "time": "15:58",
      "title": "自ら車のタイヤ交換 走行中に脱落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600433?source=rss",
      "publishedAt": "2026-10-28T06:58:37.000Z",
      "xQuery": "自ら車のタイヤ交換 走行中に脱落"
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
