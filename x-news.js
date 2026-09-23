window.LUS_X_NEWS = {
  "updatedAt": "2026-09-23T18:22:57.974Z",
  "items": [
    {
      "time": "21:25",
      "title": "日米首脳会談の目的は達成? 解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596299?source=rss",
      "publishedAt": "2026-09-23T12:25:13.000Z",
      "xQuery": "日米首脳会談の目的は達成? 解説"
    },
    {
      "time": "23:16",
      "title": "印旛沼 排水追い付かず堤防決壊か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596313?source=rss",
      "publishedAt": "2026-09-23T14:16:20.000Z",
      "xQuery": "印旛沼 排水追い付かず堤防決壊か"
    },
    {
      "time": "23:59",
      "title": "ANA機が空港に緊急着陸 乗客脱出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596316?source=rss",
      "publishedAt": "2026-09-23T14:59:25.000Z",
      "xQuery": "ANA機が空港に緊急着陸 乗客脱出"
    },
    {
      "time": "20:55",
      "title": "不明の6歳か 遺体は離島で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596296?source=rss",
      "publishedAt": "2026-09-23T11:55:12.000Z",
      "xQuery": "不明の6歳か 遺体は離島で発見"
    },
    {
      "time": "22:52",
      "title": "金利上昇 住宅の駆け込み購入も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596308?source=rss",
      "publishedAt": "2026-09-23T13:52:32.000Z",
      "xQuery": "金利上昇 住宅の駆け込み購入も"
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
