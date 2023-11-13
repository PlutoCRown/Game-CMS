export function exportAllData() {
  const data = localStorage.getItem("zustand-global-storage");
  const a = document.createElement("a");
  if (data) {
    a.href = URL.createObjectURL(
      new Blob([data], { type: "application/json;charset=utf-8" })
    );
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
