import React, { useEffect, useRef } from 'react';
import { Application, Assets, Container, Sprite } from 'pixi.js';

export const TileMapTest = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const init = async () => {
		if (!containerRef.current) return;
		const app = new Application();
		await app.init({ background: '#1099bb', resizeTo: containerRef.current });
		if (containerRef.current.childNodes.length > 0)
			containerRef.current.removeChild(containerRef.current.childNodes[0]);
		containerRef.current.appendChild(app.canvas);
		const container = new Container();
		app.stage.addChild(container);
		const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
		for (let i = 0; i < 25; i++) {
			const bunny = new Sprite(texture);
			bunny.x = (i % 5) * 40;
			bunny.y = Math.floor(i / 5) * 40;
			container.addChild(bunny);
		}
		container.x = app.screen.width / 2;
		container.y = app.screen.height / 2;
		container.pivot.x = container.width / 2;
		container.pivot.y = container.height / 2;
		app.ticker.add((time) => {
			container.rotation -= 0.01 * time.deltaTime;
		});
	};
	useEffect(() => {
		init();
	}, []);
	return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};
