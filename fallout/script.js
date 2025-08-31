document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input, textarea").forEach((el, idx) => {
    // Skip file inputs
    if (el.type === "file") return;

    // Give inputs stable IDs if they don't have one
    if (!el.id) el.id = "field_" + idx;

    // Restore saved value
    const saved = localStorage.getItem(el.id);
    if (saved !== null) {
      if (el.type === "checkbox") {
        el.checked = saved === "true"; // checkboxes store boolean as string
      } else {
        el.value = saved;
      }
    }

    // Save on change
    el.addEventListener("input", () => {
      if (el.type === "checkbox") {
        localStorage.setItem(el.id, el.checked);
      } else {
        localStorage.setItem(el.id, el.value);
      }
    });

    // Also save checkbox changes on click (some browsers trigger input only on spacebar)
    if (el.type === "checkbox") {
      el.addEventListener("click", () => {
        localStorage.setItem(el.id, el.checked);
      });
    }
  });
});

// Export all values to JSON
function exportSheet() {
  let data = {};
  document.querySelectorAll("input, textarea").forEach(el => {
    if (el.type === "file") return; // skip file inputs
    if (el.type === "checkbox") {
      data[el.id] = el.checked;
    } else {
      data[el.id] = el.value;
    }
  });

  let charName = (data["field_1"] || "Unnamed").toString().replace(/\s+/g, "_");
  let filename = `ArcaneArcadeFalloutV2.1_${charName}.json`;

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// Import values from JSON
function importSheet(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const data = JSON.parse(e.target.result);
    for (let id in data) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.type === "checkbox") {
        el.checked = data[id];
        localStorage.setItem(id, data[id]);
      } else if (el.type !== "file") {
        el.value = data[id];
        localStorage.setItem(id, data[id]);
      }
    }
  };
  reader.readAsText(file);
}

// Reset all fields and clear localStorage
function resetSheet() {
  if (!confirm("Are you sure you want to reset the character sheet? This will erase all saved data.")) return;

  document.querySelectorAll("input, textarea").forEach(el => {
    if (el.type === "file") return;
    if (el.type === "checkbox") {
      el.checked = false;
      localStorage.removeItem(el.id);
    } else {
      el.value = "";
      localStorage.removeItem(el.id);
    }
  });
}
