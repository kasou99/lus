window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T05:49:52.274Z",
  "items": [
    {
      "time": "13:15",
      "title": "G7が成果文書を発表 結束を演出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584574?source=rss",
      "publishedAt": "2026-06-17T04:15:15.000Z",
      "xQuery": "G7が成果文書を発表 結束を演出"
    },
    {
      "time": "13:14",
      "title": "自衛隊巡る議員発言 立憲代表謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584578?source=rss",
      "publishedAt": "2026-06-17T04:14:32.000Z",
      "xQuery": "自衛隊巡る議員発言 立憲代表謝罪"
    },
    {
      "time": "11:33",
      "title": "未完成テーマパークが廃虚化 中国",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584560?source=rss",
      "publishedAt": "2026-06-17T02:33:50.000Z",
      "xQuery": "未完成テーマパークが廃虚化 中国"
    },
    {
      "time": "14:17",
      "title": "日産「キックス」6年ぶり全面改良",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584582?source=rss",
      "publishedAt": "2026-06-17T05:17:19.000Z",
      "xQuery": "日産「キックス」6年ぶり全面改良"
    },
    {
      "time": "11:30",
      "title": "地下銀行運営疑い 中国籍2人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584559?source=rss",
      "publishedAt": "2026-06-17T02:30:57.000Z",
      "xQuery": "地下銀行運営疑い 中国籍2人逮捕"
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
