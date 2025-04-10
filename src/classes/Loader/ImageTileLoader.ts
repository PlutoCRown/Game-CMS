class ImageTileLoader {
  static TILE_SIZE = 16; // 统一管理 tile 大小

  private image: HTMLImageElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cols: number = 0;
  private rows: number = 0;
  length: number = 0;
  status: "loading" | "ready" | "error" = "loading";

  private loadPromise: Promise<void>;
  private resolveLoad!: () => void;
  private rejectLoad!: (reason?: any) => void;

  constructor(url: string) {
    this.image = new Image();
    this.image.crossOrigin = "anonymous"; // 允许跨域加载
    this.image.src = url;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    this.loadPromise = new Promise<void>((resolve, reject) => {
      this.resolveLoad = resolve;
      this.rejectLoad = reject;
    });

    this.image.onload = () => {
      if (
        this.image.width % ImageTileLoader.TILE_SIZE !== 0 ||
        this.image.height % ImageTileLoader.TILE_SIZE !== 0
      ) {
        this.status = "error";
        this.rejectLoad(new Error("Image dimensions must be multiples of 16"));
        return;
      }

      this.cols = this.image.width / ImageTileLoader.TILE_SIZE;
      this.rows = this.image.height / ImageTileLoader.TILE_SIZE;
      this.length = this.cols * this.rows;

      this.canvas.width = ImageTileLoader.TILE_SIZE;
      this.canvas.height = ImageTileLoader.TILE_SIZE;
      this.status = "ready";
      this.resolveLoad();
    };

    this.image.onerror = () => {
      this.status = "error";
      this.rejectLoad(new Error("Failed to load image"));
    };
  }

  ready(): Promise<void> {
    return this.loadPromise;
  }

  getTile(index: number): string | null {
    if (this.status !== "ready") return null;
    if (index < 0 || index >= this.length) return null;

    const col = index % this.cols;
    const row = Math.floor(index / this.cols);

    this.ctx.clearRect(
      0,
      0,
      ImageTileLoader.TILE_SIZE,
      ImageTileLoader.TILE_SIZE
    );
    this.ctx.drawImage(
      this.image,
      col * ImageTileLoader.TILE_SIZE,
      row * ImageTileLoader.TILE_SIZE,
      ImageTileLoader.TILE_SIZE,
      ImageTileLoader.TILE_SIZE,
      0,
      0,
      ImageTileLoader.TILE_SIZE,
      ImageTileLoader.TILE_SIZE
    );

    return this.canvas.toDataURL("image/png");
  }
}
