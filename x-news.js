window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T03:12:13.944Z",
  "items": [
    {
      "time": "09:42",
      "title": "九州で非常に激しい雨 災害に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586666?source=rss",
      "publishedAt": "2026-07-04T00:42:11.000Z",
      "xQuery": "九州で非常に激しい雨 災害に警戒"
    },
    {
      "time": "11:55",
      "title": "ハメネイ師国葬 イラン葬儀の歴史",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586678?source=rss",
      "publishedAt": "2026-07-04T02:55:43.000Z",
      "xQuery": "ハメネイ師国葬 イラン葬儀の歴史"
    },
    {
      "time": "11:58",
      "title": "3党合流実現へ中道らに党名変更論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586682?source=rss",
      "publishedAt": "2026-07-04T02:58:37.000Z",
      "xQuery": "3党合流実現へ中道らに党名変更論"
    },
    {
      "time": "10:13",
      "title": "消費税減税 取りまとめ不透明に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586668?source=rss",
      "publishedAt": "2026-07-04T01:13:23.000Z",
      "xQuery": "消費税減税 取りまとめ不透明に"
    },
    {
      "time": "10:10",
      "title": "外食チェーン 異色コラボ増の背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586670?source=rss",
      "publishedAt": "2026-07-04T01:10:01.000Z",
      "xQuery": "外食チェーン 異色コラボ増の背景"
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
