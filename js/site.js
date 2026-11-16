/* The AIMapper - small scripts: the menu button and the Scorecard. No libraries. */
(function () {
  // ---- Menu button (small screens) ----
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ---- Scorecard ----
  var form = document.getElementById("scorecard");
  if (!form) return;

  var AREAS = [
    "Customer questions & support",
    "Admin, data entry & paperwork",
    "Marketing & content",
    "Scheduling & bookings",
    "Reporting & spreadsheets",
    "Sales follow-up & quotes",
    "Invoicing & finance",
    null // Other (name your own)
  ];

  function esc(s) { return s.replace(/&/g, "&amp;"); }

  function pick(kind, label, i) {
    var html = '<div class="sc-group" role="group" aria-label="' + label + '"><span class="mono" aria-hidden="true">' + label + '</span><div class="pick">';
    for (var v = 1; v <= 3; v++) {
      html += '<label><input type="radio" name="' + kind + i + '" value="' + v + '" data-type="' + kind + '" aria-label="' + label + " " + v + '"><span>' + v + '</span></label>';
    }
    return html + '</div></div>';
  }

  AREAS.forEach(function (name, i) {
    var row = document.createElement("fieldset");
    row.className = "sc-row";
    row.dataset.index = i;
    var title = name
      ? esc(name)
      : '<input type="text" data-name aria-label="Other (name your own)" placeholder="Other (name your own)">';
    row.innerHTML =
      '<legend class="vh">' + (name ? esc(name) : "Other (name your own)") + '</legend>' +
      '<div class="sc-name"><span class="n">' + (i + 1) + '</span><span>' + title + '</span></div>' +
      '<div class="sc-controls">' +
        pick("time", "Time", i) +
        '<span class="sc-op" aria-hidden="true">&times;</span>' +
        pick("repeat", "Repeat", i) +
        '<span class="sc-op" aria-hidden="true">=</span>' +
        '<output class="sc-score" data-score aria-label="Score">&ndash;</output>' +
      '</div>';
    form.appendChild(row);
  });

  var topArea = document.getElementById("topArea");
  var topScore = document.getElementById("topScore");
  var tiers = document.querySelectorAll("#tiers li");

  function value(row, kind) {
    var el = row.querySelector('[data-type="' + kind + '"]:checked');
    return el ? +el.value : 0;
  }
  function rowName(row) {
    var input = row.querySelector("[data-name]");
    if (input) return input.value.trim() || "Other";
    return AREAS[row.dataset.index];
  }
  function tierIndex(score) { return score >= 7 ? 0 : score >= 4 ? 1 : 2; }

  function recalc() {
    var top = { score: 0, row: null };
    form.querySelectorAll("[data-index]").forEach(function (row) {
      var score = value(row, "time") * value(row, "repeat");
      row.querySelector("[data-score]").textContent = score || "–";
      row.classList.remove("is-top");
      if (score > top.score) top = { score: score, row: row };
    });
    tiers.forEach(function (li) { li.classList.remove("on"); });
    if (top.row) {
      top.row.classList.add("is-top");
      topArea.textContent = rowName(top.row);
      topArea.classList.remove("is-empty");
      topScore.innerHTML = top.score + "<small>out of 9</small>";
      tiers[tierIndex(top.score)].classList.add("on");
    } else {
      topArea.textContent = "–";
      topArea.classList.add("is-empty");
      topScore.innerHTML = "";
    }
  }
  form.addEventListener("change", recalc);
  form.addEventListener("input", recalc);
  recalc();

  // ---- Email step. Sends to the same form address as the current site. ----
  var ENDPOINT = "https://formspree.io/f/mrpglbov";
  var scForm = document.getElementById("scForm");
  var msg = document.getElementById("sendMsg");
  if (!scForm) return;

  scForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var emailEl = document.getElementById("email");
    var email = (emailEl.value || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "msg is-err";
      emailEl.focus();
      return;
    }
    var lines = [].map.call(form.querySelectorAll("[data-index]"), function (row) {
      return rowName(row) + ": " + (value(row, "time") * value(row, "repeat")) + "/9";
    }).join(" | ");
    var on = document.querySelector("#tiers li.on");
    scForm.querySelector('[name=top_area]').value = topArea.textContent;
    scForm.querySelector('[name=tier]').value = on ? on.textContent : "";
    scForm.querySelector('[name=scores]').value = lines;
    scForm.querySelector('[name=goal]').value = document.getElementById("outcome").value;

    var send = document.getElementById("sendBtn");
    send.disabled = true;
    msg.textContent = "Sending…";
    msg.className = "msg";
    fetch(ENDPOINT, { method: "POST", body: new FormData(scForm), headers: { "Accept": "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        msg.textContent = "Sent! Check your inbox for your scorecard.";
        msg.className = "msg is-ok";
        scForm.reset();
      })
      .catch(function () {
        msg.innerHTML = 'Couldn\'t send just now - <a href="AI-Opportunity-Scorecard.pdf" download>download the PDF</a> or email hello@theaimapper.com.';
        msg.className = "msg is-err";
      })
      .then(function () { send.disabled = false; });
  });
})();
