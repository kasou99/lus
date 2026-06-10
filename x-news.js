window.LUS_X_NEWS = {
  "updatedAt": "2026-06-10T05:41:29.723Z",
  "items": [
    {
      "time": "13:18",
      "title": "日銀は利上げ継続を 元財務官指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583675?source=rss",
      "publishedAt": "2026-06-10T04:18:16.000Z",
      "xQuery": "日銀は利上げ継続を 元財務官指摘"
    },
    {
      "time": "13:20",
      "title": "デジタル教科書巡り 改正法が成立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583674?source=rss",
      "publishedAt": "2026-06-10T04:20:48.000Z",
      "xQuery": "デジタル教科書巡り 改正法が成立"
    },
    {
      "time": "13:40",
      "title": "北アイルランド反移民デモ 暴徒化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583678?source=rss",
      "publishedAt": "2026-06-10T04:40:34.000Z",
      "xQuery": "北アイルランド反移民デモ 暴徒化"
    },
    {
      "time": "13:02",
      "title": "出産中の女性盗撮疑い 書類送検へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583666?source=rss",
      "publishedAt": "2026-06-10T04:02:01.000Z",
      "xQuery": "出産中の女性盗撮疑い 書類送検へ"
    },
    {
      "time": "14:34",
      "title": "中国BYD会長「5年以内に世界一」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583687?source=rss",
      "publishedAt": "2026-06-10T05:34:22.000Z",
      "xQuery": "中国BYD会長「5年以内に世界一」"
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
