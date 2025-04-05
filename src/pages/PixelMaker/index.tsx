import { addPixelArt, usePixel } from "@/store/pixel";
import { imageDataToDataURL } from "@/util/image";
import { PlusOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Flex, Input, Modal, Slider } from "antd";
import React, { useMemo, useRef, useState } from "react";

export const PixelAssets = () => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState<string>("#000000");
  const [pixelSize, setPixelSize] = useState<number>(16);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff00");
  const [existingColors, setExistingColors] = useState<string[]>([]);

  const getPixelPosition = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    return { x, y };
  };

  const drawPixel = (x: number, y: number, color: string) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);

    const { x, y } = getPixelPosition(e);
    drawPixel(x, y, drawColor);
    if (!existingColors.includes(drawColor)) {
      setExistingColors([...existingColors, drawColor]);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing || !drawColor) return;
    const { x, y } = getPixelPosition(e);
    drawPixel(x, y, drawColor);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  const background = useMemo(() => {
    // 背景设置（如果你ReplaceBackground有透明度就会透出这一层
    const light = 0; // 亮色
    const dark = 255; // 暗色
    const opca = 64; // 透明度
    const back = [light, dark, dark, light].flatMap((i) => [i, i, i, opca]);
    const data = new ImageData(new Uint8ClampedArray(back), 2, 2);
    return imageDataToDataURL(data);
  }, []);
  const list = usePixel((s) => s.list);
  return (
    <div>
      <Modal
        forceRender
        title="像素编辑器"
        open={open}
        onCancel={() => setOpen(false)}
        width={1000}
        onOk={() => {
          setOpen(false);
          addPixelArt(canvasRef.current!.toDataURL());
        }}
      >
        <Flex>
          <div>
            <div>当前颜色</div>
            <ColorPicker
              value={drawColor}
              showText
              onChangeComplete={(v) => setDrawColor(v.toHexString())}
            />
            <div style={{ height: 20 }}></div>
            <div>画板上存在的颜色</div>
            <Flex wrap gap={4}>
              {existingColors.map((i) => (
                <div
                  onClick={() => setDrawColor(i)}
                  style={{ backgroundColor: i, width: 24, height: 24 }}
                ></div>
              ))}
            </Flex>
            <div style={{ height: 20 }}></div>
            <div>预览的背景色</div>

            <ColorPicker
              value={backgroundColor}
              showText
              onChange={(v) => setBackgroundColor(v.toHexString())}
            />
            <div style={{ height: 20 }}></div>
            <div>设置画布大小</div>
            <Input type="number" min={8} max={256} defaultValue={16} />
            <div style={{ height: 20 }}></div>
            <div>HUE旋转</div>
            <Slider defaultValue={0} min={0} max={360} />
            <Button>Apply</Button>
          </div>
          <div
            style={{
              width: pixelSize * 20 - 2,
              height: pixelSize * 20 - 1,
              border: "1px solid #000",
              marginLeft: 20,
              background: `url(${background})`,
              // 为什么这里对不齐
              backgroundSize: "39.8px 39.9px",
              imageRendering: "pixelated",
              backgroundPosition: "0px 0px",
            }}
          >
            <canvas
              width={pixelSize}
              height={pixelSize}
              style={{
                transform: "scale(20)",
                transformOrigin: "top left",
                imageRendering: "pixelated",
                backgroundColor,
              }}
              ref={canvasRef}
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </Flex>
      </Modal>
      <Flex gap={8} wrap>
        <Flex
          onClick={() => setOpen(true)}
          style={{
            width: 100,
            height: "calc(100px + 2em)",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          align="center"
          justify="center"
        >
          <PlusOutlined style={{ fontSize: 50 }} />
        </Flex>
        {list.map((i, index) => (
          <Flex
            vertical
            align="center"
            style={{ border: "1px solid #ccc", cursor: "pointer" }}
          >
            <img
              src={i}
              alt=""
              width={100}
              style={{ imageRendering: "pixelated" }}
            />
            <span>Untitle-{index}.png</span>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};
