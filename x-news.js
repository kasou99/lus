window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T08:13:40.537Z",
  "items": [
    {
      "time": "13:30",
      "title": "婚姻・出生数前年上回る 1-4月期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585467?source=rss",
      "publishedAt": "2026-06-24T04:30:29.000Z",
      "xQuery": "婚姻・出生数前年上回る 1-4月期"
    },
    {
      "time": "16:03",
      "title": "7/6ハメネイ師国葬 2千万人参列へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585487?source=rss",
      "publishedAt": "2026-06-24T07:03:26.000Z",
      "xQuery": "7/6ハメネイ師国葬 2千万人参列へ"
    },
    {
      "time": "15:34",
      "title": "小学校火災 失火の容疑で捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585485?source=rss",
      "publishedAt": "2026-06-24T06:34:19.000Z",
      "xQuery": "小学校火災 失火の容疑で捜査"
    },
    {
      "time": "16:54",
      "title": "自転車追い抜き 新規定で別の違反",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585491?source=rss",
      "publishedAt": "2026-06-24T07:54:37.000Z",
      "xQuery": "自転車追い抜き 新規定で別の違反"
    },
    {
      "time": "16:31",
      "title": "若年層で変化「包丁キャンセル」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585489?source=rss",
      "publishedAt": "2026-06-24T07:31:10.000Z",
      "xQuery": "若年層で変化「包丁キャンセル」"
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
