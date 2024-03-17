import { ApplicationInfo, Version, bumpExportVersion } from "@/store/settings";

export function ExportData(data: any, version: number) {
  const lastVersion = ApplicationInfo().exportVersion;
  data.version = getNextVersion(lastVersion, version);
  downloadJSON(data, data.version);
  console.log(data);
}

const getNextVersion = (lastVersion: Version, add: number) => {
  let suffix = "";
  switch (add) {
    case 0:
      suffix = "-alpha" + Math.random().toString(36).substring(2, 5);
      break;
    case 1:
      lastVersion[2] += 1;
      break;
    case 2:
      lastVersion[1] += 1;
      break;
    case 3:
      lastVersion[0] += 1;
      break;
    default:
      break;
  }
  bumpExportVersion(lastVersion);
  return `v${lastVersion[0]}.${lastVersion[1]}.${lastVersion[2]}${suffix}`;
};

const downloadJSON = (data: Object, version: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  link.download = `Game_CMS-${version}.json`;
  link.click();
};
