import styles from "./index.module.css";
import { imageDataToDataURL } from "@/util/image";
import {
  Modal,
  Flex,
  ColorPicker,
  Input,
  Slider,
  Button,
  Popconfirm,
  Radio,
} from "antd";
import React, { FC, useMemo, useRef, useState } from "react";

type Props = {
  open: boolean;
  editing?: { data: string; filename?: string };
  onSave: (data: string, filename?: string) => void;
  onClose: () => void;
};
/**
 * TODO: ctx更好用
 * TODO: 00 opacity 直接就是 clearMode
 */
export const PixelEditor: FC<Props> = ({ open, editing, onSave, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState<string>("#000000");
  const [pixelSize, _setPixelSize] = useState<number>(16);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff00");
  const [existingColors, setExistingColors] = useState<string[]>([]);
  const { clearMode, color, opacity } = useMemo(() => {
    const hex = drawColor.padEnd(9, "f");
    const opacity = hex.slice(7);
    return {
      clearMode: hex.slice(7) === "00",
      color: hex.slice(0, 7),
      opacity: parseInt(opacity, 16) / 255,
    };
  }, [drawColor]);

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

  const drawPixel = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      if (clearMode) {
        ctx.clearRect(x, y, 1, 1);
        return;
      }
      console.log(color, opacity);
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fillRect(x, y, 1, 1);
    }
  };
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  };
  const _hueRotate = (deg: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.filter = `hue-rotate(${deg}deg)`;
      ctx.drawImage(canvasRef.current, 0, 0);
      ctx.filter = "none";
    }
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
    const hex = drawColor.padEnd(9, "f");
    if (!existingColors.includes(hex)) {
      setExistingColors([...existingColors, hex]);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing || !drawColor) return;
    const { x, y } = getPixelPosition(e);
    drawPixel(x, y);
  };

  const handleMouseUp = () => setIsDrawing(false);

  const background = useMemo(() => {
    // 背景设置（如果你ReplaceBackground有透明度就会透出这一层
    const light = 0; // 亮色
    const dark = 255; // 暗色
    const opca = 64; // 透明度
    const back = [light, dark, dark, light].flatMap((i) => [i, i, i, opca]);
    const data = new ImageData(new Uint8ClampedArray(back), 2, 2);
    return imageDataToDataURL(data);
  }, []);

  return (
    <Modal
      forceRender
      title="像素编辑器"
      open={open}
      onCancel={onClose}
      width={1000}
      onOk={() => {
        onSave(canvasRef.current!.toDataURL());
      }}
    >
      <Flex>
        <div>
          <div>当前颜色</div>
          <Flex align="center">
            <input
              type="color"
              value={drawColor.slice(0, 7)}
              onChange={(e) => setDrawColor(e.target.value)}
            />
            <ColorPicker
              value={drawColor}
              showText
              onChangeComplete={(v) => setDrawColor(v.toHexString())}
            />
          </Flex>
          <div style={{ height: 20 }}></div>
          <div>最近使用过的颜色</div>
          <Flex wrap gap={4}>
            <div
              className={styles.clearIcon}
              onClick={() => {
                setDrawColor("#ffffff00");
              }}
            ></div>
            {existingColors.map((i) => (
              <div
                key={i}
                onClick={() => setDrawColor(i)}
                className=""
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
          <div>设置画布大小[WIP]</div>
          <Input type="number" min={8} max={256} defaultValue={16} />
          <div style={{ height: 20 }}></div>
          <div>HUE旋转[WIP]</div>
          <Slider defaultValue={0} min={0} max={360} />
          <Button>Apply[WIP]</Button>
          <Popconfirm
            title="Are you sure?"
            description="Recipe will Lose ingredient or product! But you can still edit it."
            onConfirm={clearCanvas}
          >
            <Button>Clear</Button>
          </Popconfirm>
          <hr />
          <Button>Undo[WIP]</Button>
          <Button>Redo[WIP]</Button>
          <hr />
          <Radio>点击绘制[WIP]</Radio>
          <Radio defaultChecked>叠加透明度[WIP]</Radio>
          <Input placeholder="保存的文件名[WIP]" />
        </div>
        <div
          className={styles.editorContainer}
          style={{
            width: pixelSize * 20 - 2,
            height: pixelSize * 20 - 1,
            background: `url(${background})`,
            // 为什么这里对不齐
            backgroundSize: "39.8px 39.9px",
          }}
        >
          <canvas
            width={pixelSize}
            height={pixelSize}
            className={styles.canvas}
            style={{
              transform: "scale(20)",
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
  );
};
