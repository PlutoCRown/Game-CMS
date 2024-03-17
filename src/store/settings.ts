const _STORE_KEY = "gxms";

type ApplicationInfo = () => {
  applicationVersion: string;
  exportVersion: Version;
};

export type Version = [number, number, number, number];

export const ApplicationInfo: ApplicationInfo = () => {
  const res = localStorage.getItem(_STORE_KEY);
  if (!res) {
    localStorage.setItem(
      _STORE_KEY,
      JSON.stringify({
        applicationVersion: "0.0.1",
        exportVersion: [0, 0, 0, 0],
      })
    );
    return JSON.parse(localStorage.getItem(_STORE_KEY)!);
  }
  return JSON.parse(res);
};

export const bumpExportVersion = (version: Version) => {
  const info = ApplicationInfo();
  info.exportVersion = version;
  localStorage.setItem(_STORE_KEY, JSON.stringify(info));
};
