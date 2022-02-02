import * as PIXI from '../pixi';

export function MaskGraphics(canvas: any) {
  PIXI.__init__();
  const app = new PIXI.Application({
    view: canvas,
    width: canvas.width,
    height: canvas.height,
    antialias: true,
    resolution: window.devicePixelRatio,
  });
  document.body.appendChild(app.view);

  app.stage.interactive = true;

  const bg = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bg_rotate.jpg');

  bg.anchor.set(0.5);

  bg.x = app.screen.width / 2;
  bg.y = app.screen.height / 2;

  app.stage.addChild(bg);

  const container = new PIXI.Container();
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  // add a bunch of sprites
  const bgFront = PIXI.Sprite.from(
    'https://pixijs.io/examples/examples/assets/bg_scene_rotate.jpg',
  );
  bgFront.anchor.set(0.5);

  const light2 = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/light_rotate_2.png');
  light2.anchor.set(0.5);

  const light1 = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/light_rotate_1.png');
  light1.anchor.set(0.5);

  const panda = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/panda.png');
  panda.anchor.set(0.5);

  container.addChild(bgFront, light2, light1, panda);

  app.stage.addChild(container);

  // let's create a moving shape
  const thing = new PIXI.Graphics();
  app.stage.addChild(thing);
  thing.x = app.screen.width / 2;
  thing.y = app.screen.height / 2;
  thing.lineStyle(0);

  container.mask = thing;

  let count = 0;

  app.stage.on('touchstart', () => {
    if (!container.mask) {
      container.mask = thing;
    } else {
      container.mask = null;
    }
  });

//   const help = new PIXI.Text('Click or tap to turn masking on / off.', {
//     fontFamily: 'Arial',
//     fontSize: 12,
//     fontWeight: 'bold',
//     fill: 'white',
//   });
//   help.y = app.screen.height - 26;
//   help.x = 10;
//   app.stage.addChild(help);

  app.ticker.add(() => {
    bg.rotation += 0.01;
    bgFront.rotation -= 0.01;

    light1.rotation += 0.02;
    light2.rotation += 0.01;

    panda.scale.x = 1 + Math.sin(count) * 0.04;
    panda.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.1;

    thing.clear();

    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
    thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
    thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
    thing.rotation = count * 0.1;
  });
  return app;
}
