window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T08:41:17.215Z",
  "items": [
    {
      "time": "17:13",
      "title": "旧統一教会の解散命令確定 最高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585372?source=rss",
      "publishedAt": "2026-06-23T08:13:51.000Z",
      "xQuery": "旧統一教会の解散命令確定 最高裁"
    },
    {
      "time": "16:54",
      "title": "片山氏 日米の円安対応は揺るがず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585367?source=rss",
      "publishedAt": "2026-06-23T07:54:40.000Z",
      "xQuery": "片山氏 日米の円安対応は揺るがず"
    },
    {
      "time": "15:48",
      "title": "沖縄戦追悼式 首相スピーチ中ヤジ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585353?source=rss",
      "publishedAt": "2026-06-23T06:48:08.000Z",
      "xQuery": "沖縄戦追悼式 首相スピーチ中ヤジ"
    },
    {
      "time": "17:02",
      "title": "KDDI 最大1422万件情報漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585365?source=rss",
      "publishedAt": "2026-06-23T08:02:59.000Z",
      "xQuery": "KDDI 最大1422万件情報漏えいか"
    },
    {
      "time": "17:32",
      "title": "小学校火災 焼き切れたコード発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585364?source=rss",
      "publishedAt": "2026-06-23T08:32:22.000Z",
      "xQuery": "小学校火災 焼き切れたコード発見"
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
