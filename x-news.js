window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T17:43:06.194Z",
  "items": [
    {
      "time": "22:33",
      "title": "イスラエルとヒズボラ 停戦で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584891?source=rss",
      "publishedAt": "2026-06-19T13:33:32.000Z",
      "xQuery": "イスラエルとヒズボラ 停戦で合意"
    },
    {
      "time": "22:27",
      "title": "「副首都法案」自民が修正を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584890?source=rss",
      "publishedAt": "2026-06-19T13:27:50.000Z",
      "xQuery": "「副首都法案」自民が修正を検討"
    },
    {
      "time": "23:33",
      "title": "新幹線見合わせ受け 休憩列車実施",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584895?source=rss",
      "publishedAt": "2026-06-19T14:33:14.000Z",
      "xQuery": "新幹線見合わせ受け 休憩列車実施"
    },
    {
      "time": "20:02",
      "title": "都内小学校火事 校長ら会見で謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584876?source=rss",
      "publishedAt": "2026-06-19T11:02:34.000Z",
      "xQuery": "都内小学校火事 校長ら会見で謝罪"
    },
    {
      "time": "20:51",
      "title": "ホテルで高校生ら110人 食中毒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584880?source=rss",
      "publishedAt": "2026-06-19T11:51:56.000Z",
      "xQuery": "ホテルで高校生ら110人 食中毒"
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
