window.LUS_X_NEWS = {
  "updatedAt": "2026-07-27T03:13:28.025Z",
  "items": [
    {
      "time": "12:07",
      "title": "東日本 夜にかけ激しい雷雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589476?source=rss",
      "publishedAt": "2026-07-27T03:07:53.000Z",
      "xQuery": "東日本 夜にかけ激しい雷雨の恐れ"
    },
    {
      "time": "10:25",
      "title": "首相 支持率下落の原因分からない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589461?source=rss",
      "publishedAt": "2026-07-27T01:25:38.000Z",
      "xQuery": "首相 支持率下落の原因分からない"
    },
    {
      "time": "11:57",
      "title": "正面衝突 死亡の77歳が高速逆走か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589473?source=rss",
      "publishedAt": "2026-07-27T02:57:52.000Z",
      "xQuery": "正面衝突 死亡の77歳が高速逆走か"
    },
    {
      "time": "11:26",
      "title": "生活保護悪用 薬大量入手し若者に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589466?source=rss",
      "publishedAt": "2026-07-27T02:26:39.000Z",
      "xQuery": "生活保護悪用 薬大量入手し若者に"
    },
    {
      "time": "11:37",
      "title": "新幹線での包丁使用 JR東海見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589467?source=rss",
      "publishedAt": "2026-07-27T02:37:18.000Z",
      "xQuery": "新幹線での包丁使用 JR東海見解"
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
