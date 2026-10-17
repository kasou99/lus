window.LUS_X_NEWS = {
  "updatedAt": "2026-10-17T07:16:06.521Z",
  "items": [
    {
      "time": "15:14",
      "title": "APECホスト役中国 監視態勢徹底",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599115?source=rss",
      "publishedAt": "2026-10-17T06:14:42.000Z",
      "xQuery": "APECホスト役中国 監視態勢徹底"
    },
    {
      "time": "14:46",
      "title": "ローマ教皇 プーチン氏に停戦要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599108?source=rss",
      "publishedAt": "2026-10-17T05:46:19.000Z",
      "xQuery": "ローマ教皇 プーチン氏に停戦要請"
    },
    {
      "time": "14:53",
      "title": "「高市離れ」男性も加速 時事調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599110?source=rss",
      "publishedAt": "2026-10-17T05:53:03.000Z",
      "xQuery": "「高市離れ」男性も加速 時事調査"
    },
    {
      "time": "14:28",
      "title": "子ども食堂巡る投稿賛否 店主真意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599107?source=rss",
      "publishedAt": "2026-10-17T05:28:45.000Z",
      "xQuery": "子ども食堂巡る投稿賛否 店主真意"
    },
    {
      "time": "15:46",
      "title": "故人のサブスク解約で苦労 注意点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599119?source=rss",
      "publishedAt": "2026-10-17T06:46:31.000Z",
      "xQuery": "故人のサブスク解約で苦労 注意点"
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
